import { useState, useEffect } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";

import { Avatar } from "./Avatar.jsx";
import { RatingStars } from "./RatingStars.jsx";
import { colors } from "../../theme/colors.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { getSocket } from "../../lib/socket.js";
import {
  reviewQueryKeys,
  useReviewComments,
  useAddReviewComment,
} from "../../features/deliveryTracking/hooks/reviewHooks.js";
import { getErrorMessage } from "../../lib/errorMap.js";

function formatRelativeTime(isoString) {
  if (!isoString) return "";
  const then = new Date(isoString).getTime();
  const diffMs = Date.now() - then;
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(isoString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

function CommentRow({ comment }) {
  const isFarmer = comment.authorRole === "FARMER";
  return (
    <View className="flex-row items-start mt-3">
      <Avatar
        uri={comment.authorAvatarUrl}
        name={comment.authorName}
        size="xs"
        className="mr-2.5 mt-0.5"
      />
      <View className="flex-1 bg-cream rounded-xl2 px-3 py-2.5">
        <View className="flex-row items-center flex-wrap gap-1.5">
          <Text className="text-[12.5px] font-bold text-ink">
            {comment.authorName}
          </Text>
          {isFarmer ? (
            <View className="bg-primary-muted rounded-full px-1.5 py-[1px]">
              <Text className="text-[9.5px] font-bold text-primary uppercase tracking-wide">
                Farmer
              </Text>
            </View>
          ) : null}
          <Text className="text-[10.5px] text-ink-faint">
            · {formatRelativeTime(comment.createdAt)}
          </Text>
        </View>
        <Text className="text-[13px] text-ink mt-1 leading-[18px]">
          {comment.body}
        </Text>
      </View>
    </View>
  );
}

// A review card with an inline reply thread underneath — the buyer who
// wrote the review and the farmer it's about can reply to each other
// (like a public seller response you'd see on Amazon/Play Store),
// while anyone else browsing can read the thread but not post to it.
export function ReviewCard({ review, showListingTitle = false }) {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [draftReply, setDraftReply] = useState("");
  const queryClient = useQueryClient();

  const isParticipant =
    user?.id === review.buyerId || user?.id === review.farmerId;

  const comments = useReviewComments(review.id, { enabled: expanded });
  const addComment = useAddReviewComment();

  // Live updates: while this card's thread is open, join its room and
  // splice in any comment the other party posts — no polling, no manual
  // refresh. Deduped by id so it's harmless if the same comment also
  // arrives via the normal query-invalidation refetch (e.g. for the
  // author's own device).
  useEffect(() => {
    if (!expanded) return undefined;

    const socket = getSocket();

    function joinRoom() {
      socket.emit("review:join", review.id);
    }

    // Socket.IO room membership doesn't survive a reconnect (a new
    // connection is a blank slate server-side), so a dropped wifi
    // signal or the app backgrounding would otherwise silently stop
    // delivering live replies for this thread until it's collapsed and
    // reopened. Rejoining on every "connect" — including the very
    // first one — closes that gap.
    socket.on("connect", joinRoom);
    joinRoom(); // covers the case where the socket is already connected

    // A reconnect can also mean comments were posted while this device
    // was offline; the live push alone only covers what's sent after
    // we're back, so refetch once per reconnect to backfill anything
    // missed during the gap.
    function handleReconnect() {
      queryClient.invalidateQueries({
        queryKey: reviewQueryKeys.comments(review.id),
      });
    }
    socket.io.on("reconnect", handleReconnect);

    function handleNewComment(comment) {
      if (comment.reviewId !== review.id) return;
      queryClient.setQueryData(reviewQueryKeys.comments(review.id), (old) => {
        if (!old) return old;
        // Drop any optimistic placeholder for this same author — the
        // real comment just arrived (via the live socket push, possibly
        // before this device's own POST has resolved), so the temporary
        // entry from useAddReviewComment's onMutate is now redundant and
        // would otherwise show up as a brief visual duplicate.
        const withoutStaleOptimistic = old.filter(
          (existing) =>
            !(existing._isOptimistic && existing.authorId === comment.authorId),
        );
        if (
          withoutStaleOptimistic.some((existing) => existing.id === comment.id)
        ) {
          return withoutStaleOptimistic;
        }
        return [...withoutStaleOptimistic, comment];
      });
    }

    socket.on("review:comment:new", handleNewComment);

    return () => {
      socket.off("connect", joinRoom);
      socket.io.off("reconnect", handleReconnect);
      socket.off("review:comment:new", handleNewComment);
      socket.emit("review:leave", review.id);
    };
  }, [expanded, review.id, queryClient]);

  function handleToggleExpand() {
    setExpanded((current) => !current);
  }

  function handleSubmitReply() {
    const body = draftReply.trim();
    if (!body) return;
    const authorRole = user.id === review.buyerId ? "BUYER" : "FARMER";
    addComment.mutate(
      { reviewId: review.id, body, authorRole },
      { onSuccess: () => setDraftReply("") },
    );
  }

  const commentCount = comments.data?.length ?? review.commentCount ?? 0;

  return (
    <View className="bg-white rounded-2xl border border-line/50 p-4 mb-3">
      <View className="flex-row items-start">
        <Avatar
          uri={review.buyer?.avatarUrl}
          name={review.buyer?.name}
          size="sm"
          className="mr-3"
        />
        <View className="flex-1">
          <View className="flex-row items-center justify-between">
            <Text className="text-[14px] font-bold text-ink">
              {review.buyer?.name ?? "A buyer"}
            </Text>
            <Text className="text-[11px] text-ink-faint">
              {formatRelativeTime(review.createdAt)}
            </Text>
          </View>
          <View className="mt-1">
            <RatingStars rating={review.rating} size={13} />
          </View>
          {showListingTitle && review.listing ? (
            <Text className="text-[11.5px] text-ink-muted mt-1">
              On{" "}
              <Text className="font-semibold text-ink">
                {review.listing.title}
              </Text>
            </Text>
          ) : null}
        </View>
      </View>

      {review.comment ? (
        <Text className="text-[13.5px] text-ink mt-3 leading-[19px]">
          {review.comment}
        </Text>
      ) : null}

      <Pressable
        onPress={handleToggleExpand}
        hitSlop={8}
        className="flex-row items-center mt-3 pt-3 border-t border-line/50"
        accessibilityRole="button"
        accessibilityLabel={expanded ? "Hide replies" : "Show replies or reply"}
      >
        <Feather name="message-circle" size={13} color={colors.inkMuted} />
        <Text className="text-[12px] font-semibold text-ink-muted ml-1.5">
          {commentCount > 0
            ? `${commentCount} repl${commentCount === 1 ? "y" : "ies"}`
            : isParticipant
              ? "Reply"
              : "No replies yet"}
        </Text>
        <Feather
          name={expanded ? "chevron-up" : "chevron-down"}
          size={14}
          color={colors.inkFaint}
          style={{ marginLeft: 6 }}
        />
      </Pressable>

      {expanded ? (
        <View>
          {comments.isLoading ? (
            <Text className="text-[12px] text-ink-faint mt-3">
              Loading replies…
            </Text>
          ) : comments.isError ? (
            <Text className="text-[12px] text-danger mt-3">
              {getErrorMessage(comments.error)}
            </Text>
          ) : (
            (comments.data ?? []).map((comment) => (
              <CommentRow key={comment.id} comment={comment} />
            ))
          )}

          {isParticipant ? (
            <View className="flex-row items-end mt-3 gap-2">
              <TextInput
                value={draftReply}
                onChangeText={setDraftReply}
                placeholder={
                  user.id === review.buyerId
                    ? "Add to your review…"
                    : "Reply as the farmer…"
                }
                placeholderTextColor={colors.inkFaint}
                multiline
                maxLength={500}
                className="flex-1 rounded-xl2 bg-cream border border-line/50 px-3.5 py-2.5 text-[13px] text-ink max-h-[90px]"
                textAlignVertical="top"
              />
              <Pressable
                onPress={handleSubmitReply}
                disabled={!draftReply.trim() || addComment.isPending}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel="Send reply"
                className={`h-10 w-10 rounded-full items-center justify-center ${
                  draftReply.trim() ? "bg-primary" : "bg-line"
                }`}
              >
                <Feather name="arrow-up" size={17} color={colors.white} />
              </Pressable>
            </View>
          ) : null}

          {addComment.isError ? (
            <Text className="text-[11.5px] text-danger mt-2">
              {getErrorMessage(addComment.error)}
            </Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

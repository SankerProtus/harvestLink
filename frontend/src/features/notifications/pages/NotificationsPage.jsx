import { View, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "../../../components/ui/ScreenState.jsx";
import { colors } from "../../../theme/colors.js";
import { shadows } from "../../../theme/shadows.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import {
  useNotifications,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
} from "../hooks/notificationHooks.js";

const TYPE_STYLE = {
  ORDER_PLACED: {
    icon: "shopping-bag",
    bg: "bg-warning-muted",
    color: colors.warning,
  },
  ORDER_CONFIRMED: {
    icon: "check-circle",
    bg: "bg-info-muted",
    color: colors.info,
  },
  ORDER_IN_TRANSIT: {
    icon: "truck",
    bg: "bg-primary-muted",
    color: colors.primary,
  },
  ORDER_DELIVERED: {
    icon: "package",
    bg: "bg-success-muted",
    color: colors.success,
  },
  ORDER_CANCELLED: {
    icon: "x-circle",
    bg: "bg-danger-muted",
    color: colors.danger,
  },
  LISTING_INTEREST: {
    icon: "heart",
    bg: "bg-accent-light",
    color: colors.accent,
  },
  NEW_REVIEW: { icon: "star", bg: "bg-warning-muted", color: colors.warning },
};
const DEFAULT_TYPE_STYLE = {
  icon: "bell",
  bg: "bg-primary-muted",
  color: colors.primary,
};

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

function NotificationRow({ notification, onPress }) {
  const style = TYPE_STYLE[notification.type] ?? DEFAULT_TYPE_STYLE;

  return (
    <Pressable
      onPress={() => onPress(notification)}
      accessibilityRole="button"
      accessibilityLabel={notification.title}
      style={({ pressed }) => ({
        opacity: pressed ? 0.9 : 1,
        transform: [{ scale: pressed ? 0.985 : 1 }],
        ...shadows.card,
      })}
      className={`rounded-xl2 p-4 mb-3 border border-line/50 ${
        notification.isRead ? "bg-white" : "bg-primary-muted/30"
      }`}
    >
      <View className="flex-row items-start">
        <View
          className={`w-10 h-10 rounded-xl items-center justify-center mr-3 ${style.bg}`}
        >
          <Feather name={style.icon} size={17} color={style.color} />
        </View>
        <View className="flex-1">
          <View className="flex-row items-center justify-between">
            <Text
              className="text-[14px] font-extrabold text-ink flex-1 pr-2 tracking-[-0.2px]"
              numberOfLines={1}
            >
              {notification.title}
            </Text>
            {!notification.isRead ? (
              <View className="w-2 h-2 rounded-full bg-accent" />
            ) : null}
          </View>
          <Text
            className="text-[13px] text-ink-muted mt-1 leading-[18px]"
            numberOfLines={2}
          >
            {notification.body}
          </Text>
          <Text className="text-[11px] text-ink-faint mt-2 font-medium">
            {formatRelativeTime(notification.createdAt)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export function NotificationsPage() {
  const navigation = useNavigation();
  const notifications = useNotifications({ page: 1, limit: 50 });
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();

  function handlePressNotification(notification) {
    if (!notification.isRead) {
      markRead.mutate(notification.id);
    }
    if (notification.orderId) {
      navigation.navigate("OrderDetail", { orderId: notification.orderId });
    } else if (notification.listingId) {
      navigation.navigate("ListingDetail", {
        listingId: notification.listingId,
      });
    }
  }

  const results = notifications.data?.results ?? [];
  const unreadCount = results.filter((n) => !n.isRead).length;
  const hasUnread = unreadCount > 0;

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <ScreenHeader
        title="Notifications"
        subtitle={hasUnread ? `${unreadCount} unread` : "You're all caught up"}
        leftAction={
          <HeaderActionButton
            icon="arrow-left"
            size={20}
            accessibilityLabel="Go back"
            onPress={() => navigation.goBack()}
          />
        }
        rightAction={
          hasUnread ? (
            <Pressable
              onPress={() => markAllRead.mutate()}
              accessibilityRole="button"
              accessibilityLabel="Mark all as read"
              hitSlop={8}
              style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
              className="bg-white/15 rounded-full px-3 py-2 border border-white/20"
            >
              <Text className="text-white text-[11px] font-bold">
                Mark all read
              </Text>
            </Pressable>
          ) : null
        }
      />

      {notifications.isLoading ? (
        <LoadingState label="Loading notifications…" />
      ) : notifications.isError ? (
        <ErrorState
          title="Couldn't load notifications"
          message={getErrorMessage(notifications.error)}
          onRetry={() => notifications.refetch()}
        />
      ) : results.length === 0 ? (
        <EmptyState
          icon="bell"
          title="No notifications yet"
          description="Order updates, buyer interest, and reviews will show up here."
        />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 16,
            paddingBottom: 24,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <NotificationRow
              notification={item}
              onPress={handlePressNotification}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

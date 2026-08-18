import { View, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";
import { colors } from "../../../theme/colors.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import {
  useNotifications,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
} from "../hooks/notificationHooks.js";

const TYPE_ICON = {
  ORDER_PLACED: "shopping-bag",
  ORDER_CONFIRMED: "check-circle",
  ORDER_IN_TRANSIT: "truck",
  ORDER_DELIVERED: "package",
  ORDER_CANCELLED: "x-circle",
  LISTING_INTEREST: "heart",
  NEW_REVIEW: "star",
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
  const icon = TYPE_ICON[notification.type] ?? "bell";
  return (
    <Pressable
      onPress={() => onPress(notification)}
      accessibilityRole="button"
      accessibilityLabel={notification.title}
      style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
      className={`flex-row items-start px-5 py-4 border-b border-line/50 ${
        notification.isRead ? "bg-white" : "bg-primary/5"
      }`}
    >
      <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3 mt-0.5">
        <Feather name={icon} size={17} color={colors.primary} />
      </View>
      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          <Text
            className="text-[14.5px] font-bold text-ink flex-1 pr-2"
            numberOfLines={1}
          >
            {notification.title}
          </Text>
          {!notification.isRead ? (
            <View className="w-2 h-2 rounded-full bg-accent" />
          ) : null}
        </View>
        <Text className="text-[13px] text-ink-muted mt-0.5" numberOfLines={2}>
          {notification.body}
        </Text>
        <Text className="text-[11.5px] text-ink-muted/70 mt-1.5">
          {formatRelativeTime(notification.createdAt)}
        </Text>
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
  const hasUnread = results.some((n) => !n.isRead);

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <ScreenHeader
        title="Notifications"
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
            >
              <Text className="text-white text-[12.5px] font-semibold">
                Mark all read
              </Text>
            </Pressable>
          ) : null
        }
      />

      {notifications.isLoading ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-ink-muted">Loading notifications…</Text>
        </View>
      ) : notifications.isError ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-danger text-center" accessibilityRole="alert">
            {getErrorMessage(notifications.error)}
          </Text>
        </View>
      ) : results.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <View className="w-16 h-16 rounded-full bg-white border border-line/60 items-center justify-center mb-4 shadow-sm shadow-black/5">
            <Feather name="bell" size={26} color="#9CA3AF" />
          </View>
          <Text className="text-ink font-semibold text-center mb-1">
            No notifications yet
          </Text>
          <Text className="text-ink-muted text-sm text-center">
            Order updates, buyer interest, and reviews will show up here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
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

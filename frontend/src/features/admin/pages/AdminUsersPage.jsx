import { useMemo, useState } from "react";
import { View, FlatList, RefreshControl, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "../../../components/ui/AppText.jsx";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "../../../components/ui/Avatar.jsx";
import { Chip } from "../../../components/ui/Chip.jsx";
import { ErrorState } from "../../../components/ui/ScreenState.jsx";
import { TopBar } from "../../../components/ui/TopBar.jsx";
import { colors } from "../../../theme/colors.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import { useAdminUsers, useAdminOverview } from "../hooks/adminHooks.js";
import {
  EmptyNote,
  ListSkeleton,
  Row,
  SearchField,
  formatShortDate,
  humanize,
} from "../components/AdminUI.jsx";

const FILTERS = [
  { value: "ALL", label: "All" },
  { value: "FARMER", label: "Farmers" },
  { value: "BUYER", label: "Buyers" },
  { value: "SUSPENDED", label: "Suspended" },
];

function pillFor(u) {
  if (u.accountStatus === "SUSPENDED")
    return { label: "Suspended", tone: "danger" };
  if (u.accountStatus === "PENDING_VERIFICATION")
    return { label: "Unverified", tone: "warning" };
  if (u.verificationLevel >= 1) return { label: "Verified", tone: "success" };
  return null;
}

function matchesFilter(u, filter) {
  if (filter === "SUSPENDED") return u.accountStatus === "SUSPENDED";
  if (filter === "FARMER" || filter === "BUYER") return u.role === filter;
  return true;
}

export function AdminUsersPage() {
  const navigation = useNavigation();
  const users = useAdminUsers();
  const overview = useAdminOverview();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const indexed = useMemo(
    () =>
      (users.data ?? []).map((u) => ({
        u,
        text: `${u.fullName ?? ""} ${u.phone ?? ""}`.toLowerCase(),
      })),
    [users.data],
  );

  // Counts on the tabs, so "Suspended 1" is visible without tapping it.
  const counts = useMemo(() => {
    const result = {};
    for (const f of FILTERS) {
      result[f.value] = (users.data ?? []).filter((u) =>
        matchesFilter(u, f.value),
      ).length;
    }
    return result;
  }, [users.data]);

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return indexed
      .filter(
        ({ u, text }) => matchesFilter(u, filter) && (!q || text.includes(q)),
      )
      .map(({ u }) => u);
  }, [indexed, search, filter]);

  const total = overview.data?.counts?.users;
  const truncated = total != null && (users.data?.length ?? 0) < total;

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-surface">
      <TopBar
        title="Users"
        subtitle={total != null ? `${total} accounts` : undefined}
      />

      {/* One header block with explicit, even spacing:
          bar → 4px → search → 12px → tabs → 8px → list.
          (Before, the search field sat flush against the header and the tab
          row had no vertical padding, so its borders were clipped.) */}
      <View className="pt-1">
        <SearchField
          value={search}
          onChangeText={setSearch}
          placeholder="Search name or phone"
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 2,
          paddingBottom: 12,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {FILTERS.map((f) => (
          <Chip
            key={f.value}
            size="sm"
            label={
              users.data && counts[f.value] > 0 && f.value !== "ALL"
                ? `${f.label} ${counts[f.value]}`
                : f.label
            }
            isSelected={filter === f.value}
            onPress={() => setFilter(f.value)}
          />
        ))}
      </ScrollView>

      <View className="flex-1 border-t border-line/60">
        {users.isLoading ? (
          <ListSkeleton />
        ) : users.isError ? (
          <ErrorState
            message={getErrorMessage(users.error)}
            onRetry={() => users.refetch()}
          />
        ) : (
          <FlatList
            data={rows}
            keyExtractor={(u) => u.id}
            keyboardShouldPersistTaps="handled"
            initialNumToRender={12}
            windowSize={7}
            refreshControl={
              <RefreshControl
                refreshing={users.isRefetching && !users.isLoading}
                onRefresh={() => users.refetch()}
                tintColor={colors.primary}
                colors={[colors.primary]}
              />
            }
            renderItem={({ item: u }) => (
              <Row
                leading={
                  <Avatar uri={u.profileImageUrl} name={u.fullName} size="sm" />
                }
                title={u.fullName}
                subtitle={`${humanize(u.role)} · joined ${formatShortDate(u.createdAt)}`}
                pill={pillFor(u)}
                onPress={() =>
                  navigation.navigate("AdminUserDetail", { user: u })
                }
              />
            )}
            ListEmptyComponent={
              <EmptyNote
                icon="users"
                title="No matching accounts"
                body="Try a different name, number or filter."
              />
            }
            ListFooterComponent={
              truncated ? (
                <Text className="text-[12px] text-ink-muted text-center px-8 py-5">
                  Showing the {users.data.length} most recent accounts of{" "}
                  {total}. Search covers these only.
                </Text>
              ) : null
            }
            contentContainerStyle={{ paddingBottom: 24 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

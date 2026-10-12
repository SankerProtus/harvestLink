import { useMemo, useState } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import { Text } from "../../../components/ui/AppText.jsx";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "../../../components/ui/Avatar.jsx";
import { ErrorState } from "../../../components/ui/ScreenState.jsx";
import { colors } from "../../../theme/colors.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import { useAdminUsers, useAdminOverview } from "../hooks/adminHooks.js";
import {
  AdminScreen,
  EmptyNote,
  FilterChips,
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

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return indexed
      .filter(({ u, text }) => {
        if (filter === "SUSPENDED" && u.accountStatus !== "SUSPENDED")
          return false;
        if ((filter === "FARMER" || filter === "BUYER") && u.role !== filter)
          return false;
        return !q || text.includes(q);
      })
      .map(({ u }) => u);
  }, [indexed, search, filter]);

  const total = overview.data?.counts?.users;
  const truncated = total != null && (users.data?.length ?? 0) < total;

  return (
    <AdminScreen
      title="Users"
      subtitle={total != null ? `${total} accounts` : undefined}
    >
      <SearchField
        value={search}
        onChangeText={setSearch}
        placeholder="Search name or phone"
      />
      <FilterChips options={FILTERS} value={filter} onChange={setFilter} />
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
                Showing the {users.data.length} most recent accounts of {total}.
                Search covers these only.
              </Text>
            ) : null
          }
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}
    </AdminScreen>
  );
}

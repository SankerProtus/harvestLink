import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors.js";
import { useAuth } from "../context/AuthContext.jsx";
import { getTabsForRole } from "../navigation/tabConfig.js";
import { useAdminOverview } from "../features/admin/hooks/adminHooks.js";
import { AppTabBar } from "./AppTabBar.jsx";

const Tab = createBottomTabNavigator();

const ICONS = {
  home: { active: "home", inactive: "home-outline" },
  grid: { active: "grid", inactive: "grid-outline" },
  "add-circle": { active: "add-circle", inactive: "add-circle-outline" },
  storefront: { active: "storefront", inactive: "storefront-outline" },
  search: { active: "search", inactive: "search-outline" },
  receipt: { active: "receipt", inactive: "receipt-outline" },
  person: { active: "person", inactive: "person-outline" },
  speedometer: { active: "speedometer", inactive: "speedometer-outline" },
  "shield-checkmark": {
    active: "shield-checkmark",
    inactive: "shield-checkmark-outline",
  },
  people: { active: "people", inactive: "people-outline" },
  pulse: { active: "pulse", inactive: "pulse-outline" },
};

export function ProtectedTabNavigator() {
  const { user } = useAuth();
  const tabs = getTabsForRole(user?.role);

  const isAdmin = user?.role === "ADMIN";
  const overview = useAdminOverview({ enabled: isAdmin });
  const c = overview.data?.counts;
  const reviewBadge =
    isAdmin && c
      ? (c.pendingVerifications ?? 0) +
        (c.flaggedListings ?? 0) +
        (c.openDisputes ?? 0) +
        (c.underReviewDisputes ?? 0) +
        (c.openReports ?? 0)
      : 0;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <AppTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.inkMuted,
      }}
    >
      {tabs.map(({ name, label, icon, component }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarLabel: label,
            tabBarBadge:
              name === "Review" && reviewBadge > 0
                ? reviewBadge > 99
                  ? "99+"
                  : reviewBadge
                : undefined,
            tabBarIcon: ({ color, focused, size }) => (
              <Ionicons
                name={focused ? ICONS[icon].active : ICONS[icon].inactive}
                size={size}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

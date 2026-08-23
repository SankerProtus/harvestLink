import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors.js";
import { useAuth } from "../context/AuthContext.jsx";
import { getTabsForRole } from "../navigation/tabConfig.js";

const Tab = createBottomTabNavigator();

// Keyed by the `icon` value in tabConfig.js, not by route name — this is
// what lets both roles share the same handful of icon glyphs (e.g.
// "receipt" for Orders, "person" for Profile) while each role's Home,
// second, and third tabs point at role-specific glyphs.
const ICONS = {
  home: { active: "home", inactive: "home-outline" },
  grid: { active: "grid", inactive: "grid-outline" },
  "add-circle": { active: "add-circle", inactive: "add-circle-outline" },
  storefront: { active: "storefront", inactive: "storefront-outline" },
  search: { active: "search", inactive: "search-outline" },
  receipt: { active: "receipt", inactive: "receipt-outline" },
  person: { active: "person", inactive: "person-outline" },
};

function TabIcon({ iconKey, focused, color }) {
  const icons = ICONS[iconKey];
  const iconName = focused ? icons.active : icons.inactive;

  return (
    <View
      style={{
        width: 46,
        height: 30,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        // Fixed footprint regardless of focus state — only the background
        // color changes. Sizing the pill via padding (so it grows/shrinks
        // with content) let it exceed the fixed icon slot React Navigation
        // allocates in the tab bar, which clips anything taller than that
        // slot — that's what was cutting the pill off.
        backgroundColor: focused ? colors.primaryLight : "transparent",
      }}
    >
      <Ionicons name={iconName} size={22} color={color} />
    </View>
  );
}

const baseScreenOptions = {
  headerShown: false,
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.inkFaint,
  tabBarLabelStyle: {
    fontSize: 10,
    fontWeight: "700",
    marginTop: 2,
    marginBottom: Platform.OS === "ios" ? 0 : 4,
  },
  tabBarStyle: {
    height: Platform.OS === "ios" ? 84 : 72,
    paddingTop: 8,
    paddingBottom: Platform.OS === "ios" ? 24 : 10,
    paddingHorizontal: 8,
    borderTopWidth: 0,
    backgroundColor: colors.white,
    shadowColor: "#0F172A",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: -4 },
    elevation: 12,
  },
};

export function ProtectedTabNavigator() {
  const { user } = useAuth();
  const tabs = getTabsForRole(user?.role);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        ...baseScreenOptions,
        tabBarItemStyle: {
          // Evenly divides the bar across exactly this role's tab count —
          // every role always renders the same number of destinations, so
          // this stays visually balanced with no reserved-but-empty slots.
          flex: 1 / tabs.length,
        },
      }}
    >
      {tabs.map(({ name, label, icon, component }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarLabel: label,
            tabBarIconStyle: { marginTop: 2 },
            tabBarIcon: ({ color, focused }) => (
              <TabIcon iconKey={icon} focused={focused} color={color} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

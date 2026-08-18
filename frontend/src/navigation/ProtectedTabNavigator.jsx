import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors.js";
import { useAuth } from "../context/AuthContext.jsx";

import { BrowseListingsPage } from "../features/marketplace/pages/BrowseListingsPage.jsx";
import { MatchResultsPage } from "../features/buyerMatching/pages/MatchResultsPage.jsx";
import { MyListingsPage } from "../features/marketplace/pages/MyListingsPage.jsx";
import { MyOrdersPage } from "../features/deliveryTracking/pages/MyOrdersPage.jsx";
import { ProfilePage } from "../features/auth/pages/ProfilePage.jsx";

const Tab = createBottomTabNavigator();

const ICONS = {
  MyListings: { active: "grid", inactive: "grid-outline" },
  Marketplace: { active: "storefront", inactive: "storefront-outline" },
  MatchSearch: { active: "search", inactive: "search-outline" },
  MyOrders: { active: "receipt", inactive: "receipt-outline" },
  Profile: { active: "person", inactive: "person-outline" },
};

function TabIcon({ route, focused, color, size }) {
  const icons = ICONS[route.name];
  const iconName = focused ? icons.active : icons.inactive;

  return (
    <View
      className={`items-center justify-center ${focused ? "bg-primary-muted rounded-xl px-3 py-1" : ""}`}
    >
      <Ionicons name={iconName} size={focused ? size + 1 : size} color={color} />
    </View>
  );
}

const screenOptions = ({ route }) => ({
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
  tabBarIcon: ({ color, size, focused }) => (
    <TabIcon route={route} focused={focused} color={color} size={size} />
  ),
});

export function ProtectedTabNavigator() {
  const { user } = useAuth();
  const isFarmer = user?.role === "FARMER";

  return (
    <Tab.Navigator
      initialRouteName={isFarmer ? "MyListings" : "Marketplace"}
      screenOptions={screenOptions}
    >
      <Tab.Screen
        name="MyListings"
        component={MyListingsPage}
        options={{
          tabBarLabel: "Dashboard",
          tabBarButton: isFarmer ? undefined : () => null,
        }}
      />

      <Tab.Screen
        name="Marketplace"
        component={BrowseListingsPage}
        options={{
          tabBarLabel: "Market",
          tabBarButton: isFarmer ? () => null : undefined,
        }}
      />

      <Tab.Screen
        name="MatchSearch"
        component={MatchResultsPage}
        options={{ tabBarLabel: "Matches" }}
      />

      <Tab.Screen
        name="MyOrders"
        component={MyOrdersPage}
        options={{ tabBarLabel: "Orders" }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{ tabBarLabel: "Profile" }}
      />
    </Tab.Navigator>
  );
}

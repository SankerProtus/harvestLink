import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext.jsx";
import { getHasSeenOnboarding } from "../lib/onboardingStorage.js";
import { OnboardingPage } from "../features/onboarding/pages/OnboardingPage.jsx";
import { WelcomePage } from "../features/auth/pages/WelcomePage.jsx";
import { OtpVerifyPage } from "../features/auth/pages/OtpVerifyPage.jsx";
import { CompleteRegistrationPage } from "../features/auth/pages/CompleteRegistrationPage.jsx";
import { GoogleSignInScreen } from "../features/auth/pages/GoogleSignInScreen.jsx";
import { ProfilePage } from "../features/auth/pages/ProfilePage.jsx";
import { SessionsPage } from "../features/auth/pages/SessionsPage.jsx";
import { SyncDiagnosticsPage } from "../features/sync/pages/SyncDiagnosticsPage.jsx";

import { BrowseListingsPage } from "../features/marketplace/pages/BrowseListingsPage.jsx";
import { ListingDetailPage } from "../features/marketplace/pages/ListingDetailPage.jsx";
import { CreateListingPage } from "../features/marketplace/pages/CreateListingPage.jsx";
import { EditListingPage } from "../features/marketplace/pages/EditListingPage.jsx";
import { MyListingsPage } from "../features/marketplace/pages/MyListingsPage.jsx";

import { MatchResultsPage } from "../features/buyerMatching/pages/MatchResultsPage.jsx";
import { MatchDetailPage } from "../features/buyerMatching/pages/MatchDetailPage.jsx";

import { MyOrdersPage } from "../features/deliveryTracking/pages/MyOrdersPage.jsx";
import { OrderDetailPage } from "../features/deliveryTracking/pages/OrderDetailPage.jsx";

import { ListingInterestPage } from "../features/marketplace/pages/ListingInterestPage.jsx";
import { NotificationsPage } from "../features/notifications/pages/NotificationsPage.jsx";

import { ProtectedTabNavigator } from "./ProtectedTabNavigator.jsx";

const PublicStack = createNativeStackNavigator();
const ProtectedStack = createNativeStackNavigator();

function PublicNavigator() {
  return (
    <PublicStack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <PublicStack.Screen name="Welcome" component={WelcomePage} />
      <PublicStack.Screen name="OtpVerify" component={OtpVerifyPage} />
      <PublicStack.Screen
        name="CompleteRegistration"
        component={CompleteRegistrationPage}
      />
      <PublicStack.Screen name="GoogleSignIn" component={GoogleSignInScreen} />
      <PublicStack.Screen name="Marketplace" component={BrowseListingsPage} />
      <PublicStack.Screen name="ListingDetail" component={ListingDetailPage} />
      <PublicStack.Screen name="MatchSearch" component={MatchResultsPage} />
      <PublicStack.Screen name="MatchDetail" component={MatchDetailPage} />
    </PublicStack.Navigator>
  );
}

function ProtectedNavigator() {
  return (
    <ProtectedStack.Navigator
      initialRouteName="ProtectedTabs"
      screenOptions={{ headerShown: false }}
    >
      <ProtectedStack.Screen
        name="ProtectedTabs"
        component={ProtectedTabNavigator}
      />

      <ProtectedStack.Screen
        name="ListingDetail"
        component={ListingDetailPage}
      />
      <ProtectedStack.Screen
        name="Marketplace"
        component={BrowseListingsPage}
      />
      <ProtectedStack.Screen
        name="CreateListing"
        component={CreateListingPage}
      />
      <ProtectedStack.Screen name="EditListing" component={EditListingPage} />
      <ProtectedStack.Screen
        name="ListingInterest"
        component={ListingInterestPage}
      />
      <ProtectedStack.Screen name="MatchDetail" component={MatchDetailPage} />
      <ProtectedStack.Screen name="OrderDetail" component={OrderDetailPage} />
      <ProtectedStack.Screen
        name="Notifications"
        component={NotificationsPage}
      />
      <ProtectedStack.Screen name="Sessions" component={SessionsPage} />
      <ProtectedStack.Screen
        name="SyncDiagnostics"
        component={SyncDiagnosticsPage}
      />
    </ProtectedStack.Navigator>
  );
}

export function AppNavigator() {
  const { isAuthenticated, isInitializing } = useAuth();
  const [hasSeenOnboarding, setHasSeenOnboardingState] = useState(null);

  useEffect(() => {
    getHasSeenOnboarding().then(setHasSeenOnboardingState);
  }, []);

  if (isInitializing || hasSeenOnboarding === null) {
    return null;
  }

  if (!hasSeenOnboarding) {
    return (
      <OnboardingPage onComplete={() => setHasSeenOnboardingState(true)} />
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <ProtectedNavigator /> : <PublicNavigator />}
    </NavigationContainer>
  );
}

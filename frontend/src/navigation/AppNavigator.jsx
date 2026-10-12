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
import { SessionsPage } from "../features/auth/pages/SessionsPage.jsx";
import { VerifyPhonePage } from "../features/auth/pages/VerifyPhonePage.jsx";
import { SyncDiagnosticsPage } from "../features/sync/pages/SyncDiagnosticsPage.jsx";

import { BrowseListingsPage } from "../features/marketplace/pages/BrowseListingsPage.jsx";
import { ListingDetailPage } from "../features/marketplace/pages/ListingDetailPage.jsx";
import { CreateListingPage } from "../features/marketplace/pages/CreateListingPage.jsx";
import { EditListingPage } from "../features/marketplace/pages/EditListingPage.jsx";

import { MatchResultsPage } from "../features/buyerMatching/pages/MatchResultsPage.jsx";
import { MatchDetailPage } from "../features/buyerMatching/pages/MatchDetailPage.jsx";

import { OrderDetailPage } from "../features/deliveryTracking/pages/OrderDetailPage.jsx";
import { OpenDisputePage } from "../features/trust/pages/OpenDisputePage.jsx";
import { MyDisputesPage } from "../features/trust/pages/MyDisputesPage.jsx";
import { VerificationRequestPage } from "../features/trust/pages/VerificationRequestPage.jsx";
import { ReportUserPage } from "../features/trust/pages/ReportUserPage.jsx";
import { AdminModerationPage } from "../features/admin/pages/AdminModerationPage.jsx";
import { AdminDisputeDetailPage } from "../features/admin/pages/AdminDisputeDetailPage.jsx";
import { AdminUserDetailPage } from "../features/admin/pages/AdminUserDetailPage.jsx";

import { ListingInterestPage } from "../features/marketplace/pages/ListingInterestPage.jsx";
import { NotificationsPage } from "../features/notifications/pages/NotificationsPage.jsx";
import { FarmerProfilePage } from "../features/farmerProfile/pages/FarmerProfilePage.jsx";

import { BootScreen } from "../components/ui/BootScreen.jsx";

import { SavedListingsPage } from "../features/marketplace/pages/SavedListingsPage.jsx";
import { DeleteAccountPage } from "../features/auth/pages/DeleteAccountPage.jsx";

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
      <PublicStack.Screen name="FarmerProfile" component={FarmerProfilePage} />
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
        name="FarmerProfile"
        component={FarmerProfilePage}
      />
      <ProtectedStack.Screen
        name="MarketplaceBrowse"
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
      <ProtectedStack.Screen name="VerifyPhone" component={VerifyPhonePage} />
      <ProtectedStack.Screen
        name="SyncDiagnostics"
        component={SyncDiagnosticsPage}
      />
      <ProtectedStack.Screen name="OpenDispute" component={OpenDisputePage} />
      <ProtectedStack.Screen name="ReportUser" component={ReportUserPage} />
      <ProtectedStack.Screen name="MyDisputes" component={MyDisputesPage} />
      <ProtectedStack.Screen
        name="VerificationRequest"
        component={VerificationRequestPage}
      />
      <ProtectedStack.Screen
        name="SavedListings"
        component={SavedListingsPage}
      />
      <ProtectedStack.Screen
        name="AccountDelete"
        component={DeleteAccountPage}
      />
      <ProtectedStack.Screen
        name="AdminModeration"
        component={AdminModerationPage}
      />
      <ProtectedStack.Screen
        name="AdminDisputeDetail"
        component={AdminDisputeDetailPage}
      />
      <ProtectedStack.Screen
        name="AdminUserDetail"
        component={AdminUserDetailPage}
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
    return <BootScreen />;
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

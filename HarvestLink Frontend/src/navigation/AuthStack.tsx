import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Splash from "../screens/Splash";
import Onboarding1 from "../screens/onboarding/Onboarding1";
import Onboarding2 from "../screens/onboarding/Onboarding2";
import Onboarding3 from "../screens/onboarding/Onboarding3";
import RoleSelect from "../screens/auth/RoleSelect";
import FarmerSignUp from "../screens/auth/FarmerSignUp";
import BuyerSignUp from "../screens/auth/BuyerSignUp";
import Login from "../screens/auth/Login";
import OtpVerification from "../screens/auth/OtpVerification";

export type AuthStackParamList = {
  Splash: undefined;
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;
  RoleSelect: undefined;
  FarmerSignUp: undefined;
  BuyerSignUp: undefined;
  Login: undefined;
  OtpVerification: { phoneNumber: string };
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Onboarding1" component={Onboarding1} />
      <Stack.Screen name="Onboarding2" component={Onboarding2} />
      <Stack.Screen name="Onboarding3" component={Onboarding3} />
      <Stack.Screen name="RoleSelect" component={RoleSelect} />
      <Stack.Screen name="FarmerSignUp" component={FarmerSignUp} />
      <Stack.Screen name="BuyerSignUp" component={BuyerSignUp} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OtpVerification" component={OtpVerification} />
    </Stack.Navigator>
  );
}

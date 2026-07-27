import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthStack } from "./AuthStack";
import { MainStack } from "./MainStack";
import { useAuthStore } from "../store/useAuthStore";
import { subscribeToConnectivity } from "../db/sync";

export type RootStackParamList = {
  AuthFlow: undefined;
  MainTabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const isVerified = useAuthStore((s) => s.isVerified);

  useEffect(() => {
    const unsubscribe = subscribeToConnectivity();
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isVerified ? (
          <Stack.Screen name="MainTabs" component={MainStack} />
        ) : (
          <Stack.Screen name="AuthFlow" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

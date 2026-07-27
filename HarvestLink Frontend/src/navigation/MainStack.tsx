import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Marketplace from "../screens/marketplace/Marketplace";
import ProduceDetail from "../screens/marketplace/ProduceDetail";
import LogHarvest from "../screens/harvest/LogHarvest";
import DeliveryTracking from "../screens/delivery/DeliveryTracking";
import ProfileDashboard from "../screens/profile/ProfileDashboard";
import FarmProfileBuyerView from "../screens/profile/FarmProfileBuyerView";
import OrderConfirmation from "../screens/OrderConfirmation";

export type MainStackParamList = {
  Marketplace: undefined;
  ProduceDetail: { id: string };
  LogHarvest: undefined;
  Delivery: undefined;
  Profile: undefined;
  FarmProfileBuyerView: { farmId?: string };
  OrderConfirmation: { buyerId?: string };
  // "MyListings" reuses Marketplace filtered to the current farmer's own posts.
  // Swap in a dedicated screen later if the UX needs to diverge further.
  MyListings: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Marketplace">
      <Stack.Screen name="Marketplace" component={Marketplace} />
      <Stack.Screen name="ProduceDetail" component={ProduceDetail} />
      <Stack.Screen name="LogHarvest" component={LogHarvest} />
      <Stack.Screen name="Delivery" component={DeliveryTracking} />
      <Stack.Screen name="Profile" component={ProfileDashboard} />
      <Stack.Screen name="FarmProfileBuyerView" component={FarmProfileBuyerView} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmation} />
      <Stack.Screen name="MyListings" component={Marketplace} />
    </Stack.Navigator>
  );
}

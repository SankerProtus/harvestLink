import { FarmerHomePage } from "../features/home/pages/FarmerHomePage.jsx";
import { BuyerHomePage } from "../features/home/pages/BuyerHomePage.jsx";
import { BrowseListingsPage } from "../features/marketplace/pages/BrowseListingsPage.jsx";
import { MatchResultsPage } from "../features/buyerMatching/pages/MatchResultsPage.jsx";
import { MyListingsPage } from "../features/marketplace/pages/MyListingsPage.jsx";
import { CreateListingPage } from "../features/marketplace/pages/CreateListingPage.jsx";
import { MyOrdersPage } from "../features/deliveryTracking/pages/MyOrdersPage.jsx";
import { ProfilePage } from "../features/auth/pages/ProfilePage.jsx";

export const FARMER_TABS = [
  { name: "Home", label: "Home", icon: "home", component: FarmerHomePage },
  { name: "Listings", label: "Listings", icon: "grid", component: MyListingsPage },
  { name: "Sell", label: "Sell", icon: "add-circle", component: CreateListingPage },
  { name: "MyOrders", label: "Orders", icon: "receipt", component: MyOrdersPage },
  { name: "Profile", label: "Profile", icon: "person", component: ProfilePage },
];

export const BUYER_TABS = [
  { name: "Home", label: "Home", icon: "home", component: BuyerHomePage },
  { name: "Marketplace", label: "Market", icon: "storefront", component: BrowseListingsPage },
  { name: "MatchSearch", label: "Search", icon: "search", component: MatchResultsPage },
  { name: "MyOrders", label: "Orders", icon: "receipt", component: MyOrdersPage },
  { name: "Profile", label: "Profile", icon: "person", component: ProfilePage },
];

export function getTabsForRole(role) {
  return role === "FARMER" ? FARMER_TABS : BUYER_TABS;
}

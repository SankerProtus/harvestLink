# HarvestLink Mobile (Frontend)

React Native + NativeWind + Zustand + WatermelonDB frontend for the HarvestLink
CSM 366 project, matching the Figma UI design (`HarvestLink UI Design`, 14 screens).

## Setup

```bash
npm install
npx expo prebuild   # generates native android/ folder for WatermelonDB + Maps
npm run android
```

## Backend connection

`src/api/client.ts` points to `http://10.0.2.2:4000/api` by default — that's
the special IP the Android emulator uses to reach `localhost` on your dev
machine. Update `BASE_URL` once your teammate's Node/Express API has a real
host, or when testing on a physical device on the same Wi-Fi network (use
your machine's LAN IP instead).

## Screens implemented (all 14 from Figma)

| # | Screen | File |
|---|--------|------|
| 00 | Splash | `src/screens/Splash.tsx` |
| 01–03 | Onboarding | `src/screens/onboarding/Onboarding{1,2,3}.tsx` |
| 04 | Role Select | `src/screens/auth/RoleSelect.tsx` |
| 05A | Farmer Sign Up | `src/screens/auth/FarmerSignUp.tsx` |
| 05B | Buyer Sign Up | `src/screens/auth/BuyerSignUp.tsx` |
| 06 | Login | `src/screens/auth/Login.tsx` |
| 07 | OTP Verification | `src/screens/auth/OtpVerification.tsx` |
| 08 | Marketplace | `src/screens/marketplace/Marketplace.tsx` |
| 09 | Log Harvest | `src/screens/harvest/LogHarvest.tsx` |
| 10 | Produce Detail & Match | `src/screens/marketplace/ProduceDetail.tsx` |
| 11 | Delivery Tracking | `src/screens/delivery/DeliveryTracking.tsx` |
| 12 | Profile Dashboard | `src/screens/profile/ProfileDashboard.tsx` |
| 13 | Order Confirmation | `src/screens/OrderConfirmation.tsx` |
| 14 | Farm Profile (Buyer View) | `src/screens/profile/FarmProfileBuyerView.tsx` |

## Navigation

- `src/navigation/RootNavigator.tsx` — top-level switch. Watches
  `useAuthStore().isVerified`; renders `AuthStack` until OTP verification
  succeeds, then automatically swaps to `MainStack`. No manual navigation
  calls needed for that handoff — flipping `isVerified` via `verify()` in
  the auth store is enough.
- `src/navigation/AuthStack.tsx` — Splash → Onboarding → Role Select →
  Sign Up / Login → OTP.
- `src/navigation/MainStack.tsx` — Marketplace, Produce Detail, Log Harvest,
  Delivery, Profile, Farm Profile, Order Confirmation. Each screen renders
  its own `<BottomTabBar activeTab="..." />` at the bottom rather than using
  React Navigation's built-in tab navigator, to match the custom tab bar
  styling in the Figma file exactly.

## Offline-first data (WatermelonDB)

- `src/db/schema.ts` + `src/db/models/*` — mirrors the Prisma models your
  backend teammate is building (Harvest, Match, Delivery).
- `src/screens/harvest/LogHarvest.tsx` writes directly to WatermelonDB with
  `synced: false` and zero network calls — a farmer can log a harvest with
  no signal at all.
- `src/db/sync.ts` — `subscribeToConnectivity()` (called once in
  `RootNavigator`) watches `NetInfo` and calls `syncWithServer()` the moment
  a connection returns, pushing/pulling changes against
  `/api/sync/push` and `/api/sync/pull` on the backend.

## State (Zustand)

- `useAuthStore` — role, phone number, verified flag.
- `useMarketplaceStore` — produce listings (currently hardcoded to match the
  Figma sample data; swap for an API-backed fetch once the backend endpoint
  is ready).
- `useDeliveryStore` — matched buyers for a listing + live delivery status.

## Known placeholders to swap out

- `DeliveryTracking.tsx` renders a static "Map view" placeholder box.
  Replace with `react-native-maps`'s `<MapView />` once your Google Maps
  SDK API key is added to `app.json` / `AndroidManifest.xml`.
- Farm/produce photo `View` blocks are pale-green placeholders — swap for
  `<Image source={{ uri }} />` once photo upload/storage is wired up.
- `apiClient` calls (`/auth/...`, `/matches/...`, `/sync/...`) assume
  specific backend routes — confirm exact paths/payloads with your
  teammate (Sanker) building the Express API.

## Design tokens (from Figma)

See `tailwind.config.js` — primary green `#2F6B3C`, light green
`#E8F3E9`, text `#1A1A1A` / `#6B7280`, border `#D1D5DB`, card radius 12px,
input radius 8px.

import "dotenv/config";

import { Prisma, PrismaClient } from "../src/generated/client/index.js";

const prisma = new PrismaClient();

function decimal(value) {
  return new Prisma.Decimal(value);
}

// --- Images -----------------------------------------------------------

function placeholderImage(text, bgHex, size = "800x600") {
  const encoded = encodeURIComponent(text).replace(/%20/g, "+");
  return `https://placehold.co/${size}/${bgHex}/FFFFFF.png?text=${encoded}&font=roboto`;
}

const CROP_COLORS = {
  TOMATO: "C0392B",
  MAIZE: "D4A017",
  CASSAVA: "8B5E34",
  PLANTAIN: "7CB342",
  YAM: "A0743D",
  PEPPER: "B71C1C",
  ONION: "6A1B4D",
  RICE: "C9B458",
  GROUNDNUT: "B08968",
  COCOA: "4E342E",
};

function cropImages(cropType, label, count = 2) {
  const color = CROP_COLORS[cropType] ?? "2D7A3B";
  return Array.from({ length: count }, (_, i) =>
    placeholderImage(count > 1 ? `${label} ${i + 1}` : label, color),
  );
}

function avatarImage(name, bgHex) {
  return placeholderImage(name, bgHex, "300x300");
}

// --- Cleanup ------------------------------------------------------------
async function resetDatabase() {
  await prisma.review.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.savedListing.deleteMany();
  await prisma.listingInterest.deleteMany();
  await prisma.order.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.device.deleteMany();
  await prisma.oAuthAccount.deleteMany();
  await prisma.otpVerificationToken.deleteMany();
  await prisma.otpCode.deleteMany();
  await prisma.user.deleteMany();
}

async function main() {
  await resetDatabase();

  // --- Users --------------------------------------------------------
  const userSeeds = [
    {
      fullName: "Kwame Mensah",
      role: "FARMER",
      phone: "+233551000001",
      accountStatus: "ACTIVE",
      phoneVerifiedAt: new Date("2026-06-02T09:00:00Z"),
      lastLoginAt: new Date("2026-08-20T07:45:00Z"),
      profileImageUrl: avatarImage("Kwame", "2D7A3B"),
    },
    {
      fullName: "Abena Owusu",
      role: "FARMER",
      phone: "+233551000002",
      accountStatus: "ACTIVE",
      phoneVerifiedAt: new Date("2026-06-05T10:15:00Z"),
      lastLoginAt: new Date("2026-08-19T18:20:00Z"),
      profileImageUrl: avatarImage("Abena", "E8731B"),
    },
    {
      fullName: "Yaw Boateng",
      role: "FARMER",
      phone: "+233551000003",
      accountStatus: "ACTIVE",
      phoneVerifiedAt: new Date("2026-06-10T14:10:00Z"),
      lastLoginAt: new Date("2026-08-20T10:05:00Z"),
      profileImageUrl: null,
    },
    {
      fullName: "Afia Darko",
      role: "FARMER",
      phone: "+233551000004",
      accountStatus: "ACTIVE",
      phoneVerifiedAt: new Date("2026-06-15T08:00:00Z"),
      lastLoginAt: new Date("2026-08-18T09:15:00Z"),
      profileImageUrl: null,
    },
    {
      fullName: "Kofi Adjei",
      role: "FARMER",
      phone: "+233551000005",
      accountStatus: "ACTIVE",
      phoneVerifiedAt: new Date("2026-06-18T11:40:00Z"),
      lastLoginAt: new Date("2026-08-17T13:30:00Z"),
      profileImageUrl: null,
    },
    {
      fullName: "Ama Serwaa",
      role: "BUYER",
      phone: "+233551000011",
      accountStatus: "ACTIVE",
      phoneVerifiedAt: new Date("2026-06-03T11:30:00Z"),
      lastLoginAt: new Date("2026-08-20T08:30:00Z"),
      profileImageUrl: avatarImage("Ama", "3498DB"),
    },
    {
      fullName: "Kojo Asante",
      role: "BUYER",
      phone: "+233551000012",
      accountStatus: "ACTIVE",
      phoneVerifiedAt: new Date("2026-06-04T08:45:00Z"),
      lastLoginAt: new Date("2026-08-19T16:10:00Z"),
      profileImageUrl: null,
    },
    {
      fullName: "Esi Frimpong",
      role: "BUYER",
      phone: "+233551000013",
      accountStatus: "ACTIVE",
      phoneVerifiedAt: new Date("2026-06-06T13:05:00Z"),
      lastLoginAt: new Date("2026-08-20T06:55:00Z"),
      profileImageUrl: null,
    },
    {
      fullName: "Nana Yeboah",
      role: "BUYER",
      phone: "+233551000014",
      accountStatus: "ACTIVE",
      phoneVerifiedAt: new Date("2026-06-08T09:20:00Z"),
      lastLoginAt: new Date("2026-08-16T15:40:00Z"),
      profileImageUrl: null,
    },
    {
      fullName: "HarvestLink Admin",
      role: "ADMIN",
      phone: "+233551000099",
      accountStatus: "ACTIVE",
      phoneVerifiedAt: new Date("2026-06-01T09:00:00Z"),
      lastLoginAt: new Date("2026-08-20T09:10:00Z"),
      profileImageUrl: null,
    },
  ];

  const usersByName = {};
  for (const userData of userSeeds) {
    usersByName[userData.fullName] = await prisma.user.create({
      data: userData,
    });
  }

  await prisma.device.createMany({
    data: [
      {
        userId: usersByName["Kwame Mensah"].id,
        deviceId: "android-kwame-001",
        deviceName: "Kwame's Samsung A24",
        platform: "ANDROID",
        lastSeenAt: new Date("2026-08-20T07:50:00Z"),
      },
      {
        userId: usersByName["Abena Owusu"].id,
        deviceId: "android-abena-001",
        deviceName: "Abena's Tecno Spark",
        platform: "ANDROID",
        lastSeenAt: new Date("2026-08-19T18:25:00Z"),
      },
      {
        userId: usersByName["Ama Serwaa"].id,
        deviceId: "android-ama-001",
        deviceName: "Ama's Pixel",
        platform: "ANDROID",
        lastSeenAt: new Date("2026-08-20T08:35:00Z"),
      },
      {
        userId: usersByName["Kojo Asante"].id,
        deviceId: "web-kojo-001",
        deviceName: "Kojo's Chrome Browser",
        platform: "WEB",
        lastSeenAt: new Date("2026-08-19T16:12:00Z"),
      },
    ],
  });

  await prisma.oAuthAccount.create({
    data: {
      userId: usersByName["Ama Serwaa"].id,
      provider: "GOOGLE",
      providerAccountId: "google-ama-serwaa-001",
      email: "ama.serwaa@example.com",
    },
  });

  // --- Listings -------------------------------------------------------
  const listingSeeds = [
    {
      farmer: "Kwame Mensah",
      title: "Fresh Roma Tomatoes from Techiman",
      description:
        "Farm-picked Roma tomatoes, sorted for restaurant buyers and market traders. Harvested this morning and ready for same-day pickup.",
      cropType: "TOMATO",
      quantity: decimal("180.00"),
      quantityUnit: "CRATE",
      pricePerUnit: decimal("95.00"),
      location: "Techiman, Bono East",
      harvestDate: new Date("2026-08-19"),
      status: "ACTIVE",
    },
    {
      farmer: "Kwame Mensah",
      title: "Premium White Maize",
      description:
        "Dried white maize stored in clean sacks. Ideal for millers, poultry feed suppliers, and wholesale traders.",
      cropType: "MAIZE",
      quantity: decimal("220.00"),
      quantityUnit: "SACK",
      pricePerUnit: decimal("145.00"),
      location: "Kintampo, Bono East",
      harvestDate: new Date("2026-07-30"),
      status: "ACTIVE",
    },
    {
      farmer: "Kwame Mensah",
      title: "Sun-Dried Cassava Chips",
      description:
        "Peeled and sun-dried cassava chips, moisture-tested and bagged. Suitable for gari processors and starch millers.",
      cropType: "CASSAVA",
      quantity: decimal("300.00"),
      quantityUnit: "BAG",
      pricePerUnit: decimal("70.00"),
      location: "Techiman, Bono East",
      harvestDate: new Date("2026-08-05"),
      status: "ACTIVE",
    },
    {
      farmer: "Abena Owusu",
      title: "Large Green Plantain Bunches",
      description:
        "Fresh plantain bunches from a family farm. Excellent for food vendors, chop bars, and food distributors.",
      cropType: "PLANTAIN",
      quantity: decimal("95.00"),
      quantityUnit: "BUNCH",
      pricePerUnit: decimal("32.00"),
      location: "Bechem, Bono",
      harvestDate: new Date("2026-08-18"),
      status: "ACTIVE",
    },
    {
      farmer: "Abena Owusu",
      title: "Cured Yams for Bulk Buyers",
      description:
        "Well-cured yams packed for retail and chop bar buyers. Neat, mature tubers with consistent sizing.",
      cropType: "YAM",
      quantity: decimal("140.00"),
      quantityUnit: "SACK",
      pricePerUnit: decimal("120.00"),
      location: "Wenchi, Bono",
      harvestDate: new Date("2026-07-22"),
      status: "SOLD",
    },
    {
      farmer: "Abena Owusu",
      title: "Fresh Scotch Bonnet Peppers",
      description:
        "Bright, firm scotch bonnet peppers picked twice weekly. Popular with market traders and sauce producers.",
      cropType: "PEPPER",
      quantity: decimal("60.00"),
      quantityUnit: "CRATE",
      pricePerUnit: decimal("110.00"),
      location: "Bechem, Bono",
      harvestDate: new Date("2026-08-20"),
      status: "ACTIVE",
    },
    {
      farmer: "Yaw Boateng",
      title: "Dry Cocoa Beans - Fermented Batch",
      description:
        "Well-fermented and sun-dried cocoa beans from a cooperative farm. Moisture tested and bagged for export buyers.",
      cropType: "COCOA",
      quantity: decimal("60.00"),
      quantityUnit: "BAG",
      pricePerUnit: decimal("2450.00"),
      location: "Bekwai, Ashanti",
      harvestDate: new Date("2026-06-28"),
      status: "ACTIVE",
    },
    {
      farmer: "Yaw Boateng",
      title: "Red Onions from the North",
      description:
        "Firm red onions packed in nets and ready for retailers or food service distributors.",
      cropType: "ONION",
      quantity: decimal("210.00"),
      quantityUnit: "BAG",
      pricePerUnit: decimal("180.00"),
      location: "Ejura, Ashanti",
      harvestDate: new Date("2026-08-01"),
      status: "REMOVED",
    },
    {
      farmer: "Yaw Boateng",
      title: "Long Grain Local Rice",
      description:
        "Cleaned, de-stoned local rice ready for retail packaging or bulk wholesale.",
      cropType: "RICE",
      quantity: decimal("150.00"),
      quantityUnit: "BAG",
      pricePerUnit: decimal("310.00"),
      location: "Ejura, Ashanti",
      harvestDate: new Date("2026-07-10"),
      status: "ACTIVE",
    },
    {
      farmer: "Afia Darko",
      title: "Roasted Groundnuts - Bulk Sacks",
      description:
        "Hand-sorted groundnuts, lightly roasted and bagged. Good for snack producers and peanut butter makers.",
      cropType: "GROUNDNUT",
      quantity: decimal("80.00"),
      quantityUnit: "SACK",
      pricePerUnit: decimal("260.00"),
      location: "Mampong, Ashanti",
      harvestDate: new Date("2026-07-15"),
      status: "ACTIVE",
    },
    {
      farmer: "Afia Darko",
      title: "Sweet Plantain - Small Chop Grade",
      description:
        "Slightly riper bunches suited for kelewele and small-chop vendors who need ready-to-fry plantain.",
      cropType: "PLANTAIN",
      quantity: decimal("50.00"),
      quantityUnit: "BUNCH",
      pricePerUnit: decimal("28.00"),
      location: "Mampong, Ashanti",
      harvestDate: new Date("2026-08-17"),
      status: "ACTIVE",
    },
    {
      farmer: "Afia Darko",
      title: "Table Tomatoes - Market Grade",
      description:
        "Slightly smaller-grade tomatoes at a lower price point, ideal for market resale rather than restaurant supply.",
      cropType: "TOMATO",
      quantity: decimal("90.00"),
      quantityUnit: "CRATE",
      pricePerUnit: decimal("70.00"),
      location: "Mampong, Ashanti",
      harvestDate: new Date("2026-08-20"),
      status: "ACTIVE",
    },
    {
      farmer: "Kofi Adjei",
      title: "Yellow Maize for Feed Mills",
      description:
        "Bulk yellow maize dried to feed-mill spec moisture levels. Long-standing supply relationships with poultry farms in the region.",
      cropType: "MAIZE",
      quantity: decimal("400.00"),
      quantityUnit: "SACK",
      pricePerUnit: decimal("138.00"),
      location: "Ejura, Ashanti",
      harvestDate: new Date("2026-07-25"),
      status: "ACTIVE",
    },
    {
      farmer: "Kofi Adjei",
      title: "Fresh Cassava Tubers",
      description:
        "Freshly harvested cassava tubers, unpeeled, sold by the sack. Popular with gari and fufu processors buying in volume.",
      cropType: "CASSAVA",
      quantity: decimal("250.00"),
      quantityUnit: "SACK",
      pricePerUnit: decimal("55.00"),
      location: "Ejura, Ashanti",
      harvestDate: new Date("2026-08-12"),
      status: "ACTIVE",
    },
    {
      farmer: "Kofi Adjei",
      title: "White Yam - Export Grade",
      description:
        "Large, uniform white yam tubers graded for export-quality buyers. Carefully cured to extend shelf life during transport.",
      cropType: "YAM",
      quantity: decimal("100.00"),
      quantityUnit: "SACK",
      pricePerUnit: decimal("135.00"),
      location: "Ejura, Ashanti",
      harvestDate: new Date("2026-07-18"),
      status: "SOLD",
    },
  ];

  const listingsByTitle = {};
  for (const listingData of listingSeeds) {
    listingsByTitle[listingData.title] = await prisma.listing.create({
      data: {
        farmerId: usersByName[listingData.farmer].id,
        title: listingData.title,
        description: listingData.description,
        cropType: listingData.cropType,
        quantity: listingData.quantity,
        quantityUnit: listingData.quantityUnit,
        pricePerUnit: listingData.pricePerUnit,
        location: listingData.location,
        harvestDate: listingData.harvestDate,
        images: cropImages(listingData.cropType, listingData.title.split(" - ")[0]),
        status: listingData.status,
      },
    });
  }

  // --- Listing interest & saved listings -------------------------------
  const interestSeeds = [
    { listing: "Fresh Roma Tomatoes from Techiman", buyer: "Ama Serwaa" },
    { listing: "Fresh Roma Tomatoes from Techiman", buyer: "Nana Yeboah" },
    { listing: "Premium White Maize", buyer: "Kojo Asante" },
    { listing: "Dry Cocoa Beans - Fermented Batch", buyer: "Ama Serwaa" },
    { listing: "Fresh Scotch Bonnet Peppers", buyer: "Esi Frimpong" },
    { listing: "Long Grain Local Rice", buyer: "Kojo Asante" },
  ];
  for (const seed of interestSeeds) {
    await prisma.listingInterest.create({
      data: {
        listingId: listingsByTitle[seed.listing].id,
        buyerId: usersByName[seed.buyer].id,
      },
    });
  }

  const savedSeeds = [
    { listing: "Sweet Plantain - Small Chop Grade", buyer: "Esi Frimpong" },
    { listing: "Roasted Groundnuts - Bulk Sacks", buyer: "Nana Yeboah" },
    { listing: "Table Tomatoes - Market Grade", buyer: "Ama Serwaa" },
  ];
  for (const seed of savedSeeds) {
    await prisma.savedListing.create({
      data: {
        listingId: listingsByTitle[seed.listing].id,
        buyerId: usersByName[seed.buyer].id,
      },
    });
  }

  // --- Orders -----------------------------------------------------------
  // Covers every OrderStatus so the dashboard/status pills and order-
  // detail flows all have real cases, not just the happy path.
  const orderSeeds = [
    {
      listing: "Fresh Roma Tomatoes from Techiman",
      buyer: "Ama Serwaa",
      quantity: decimal("12.00"),
      pricePerUnitAtOrder: decimal("95.00"),
      status: "CONFIRMED",
    },
    {
      listing: "Premium White Maize",
      buyer: "Kojo Asante",
      quantity: decimal("18.00"),
      pricePerUnitAtOrder: decimal("145.00"),
      status: "PENDING",
    },
    {
      listing: "Large Green Plantain Bunches",
      buyer: "Esi Frimpong",
      quantity: decimal("8.00"),
      pricePerUnitAtOrder: decimal("32.00"),
      status: "IN_TRANSIT",
      latestLatitude: 7.3486,
      latestLongitude: -2.1259,
      locationReportedAt: new Date("2026-08-20T11:20:00Z"),
    },
    {
      listing: "Long Grain Local Rice",
      buyer: "Nana Yeboah",
      quantity: decimal("20.00"),
      pricePerUnitAtOrder: decimal("310.00"),
      status: "IN_TRANSIT",
      latestLatitude: 7.386,
      latestLongitude: -1.36,
      locationReportedAt: new Date("2026-08-20T09:05:00Z"),
    },
    {
      listing: "Red Onions from the North",
      buyer: "Kojo Asante",
      quantity: decimal("10.00"),
      pricePerUnitAtOrder: decimal("180.00"),
      status: "CANCELLED",
    },
    {
      listing: "Cured Yams for Bulk Buyers",
      buyer: "Ama Serwaa",
      quantity: decimal("14.00"),
      pricePerUnitAtOrder: decimal("120.00"),
      status: "DELIVERED",
    },
    // Additional delivered orders exist so real reviews/ratings can be
    // seeded below — a listing's rating is always a real aggregate of
    // Review rows tied to a DELIVERED order, never a hardcoded number.
    {
      listing: "Fresh Roma Tomatoes from Techiman",
      buyer: "Esi Frimpong",
      quantity: decimal("15.00"),
      pricePerUnitAtOrder: decimal("95.00"),
      status: "DELIVERED",
    },
    {
      listing: "Fresh Roma Tomatoes from Techiman",
      buyer: "Kojo Asante",
      quantity: decimal("9.00"),
      pricePerUnitAtOrder: decimal("95.00"),
      status: "DELIVERED",
    },
    {
      listing: "Dry Cocoa Beans - Fermented Batch",
      buyer: "Ama Serwaa",
      quantity: decimal("6.00"),
      pricePerUnitAtOrder: decimal("2450.00"),
      status: "DELIVERED",
    },
    {
      listing: "White Yam - Export Grade",
      buyer: "Nana Yeboah",
      quantity: decimal("22.00"),
      pricePerUnitAtOrder: decimal("135.00"),
      status: "DELIVERED",
    },
    {
      listing: "Roasted Groundnuts - Bulk Sacks",
      buyer: "Esi Frimpong",
      quantity: decimal("5.00"),
      pricePerUnitAtOrder: decimal("260.00"),
      status: "DELIVERED",
    },
  ];

  const ordersByKey = {};
  for (const orderData of orderSeeds) {
    const listing = listingsByTitle[orderData.listing];

    const order = await prisma.order.create({
      data: {
        listingId: listing.id,
        buyerId: usersByName[orderData.buyer].id,
        farmerId: listing.farmerId,
        quantity: orderData.quantity,
        pricePerUnitAtOrder: orderData.pricePerUnitAtOrder,
        status: orderData.status,
        latestLatitude: orderData.latestLatitude ?? null,
        latestLongitude: orderData.latestLongitude ?? null,
        locationReportedAt: orderData.locationReportedAt ?? null,
      },
    });
    ordersByKey[`${orderData.listing}|${orderData.buyer}`] = order;
  }

  // --- Reviews ------------------------------------------------------
  // One per DELIVERED order, submitted by the buyer.
  const reviewSeeds = [
    {
      orderKey: "Cured Yams for Bulk Buyers|Ama Serwaa",
      rating: 4,
      comment: "Good quality yams, a couple were smaller than expected.",
    },
    {
      orderKey: "Fresh Roma Tomatoes from Techiman|Esi Frimpong",
      rating: 5,
      comment: "Excellent quality, arrived fresh the same morning.",
    },
    {
      orderKey: "Fresh Roma Tomatoes from Techiman|Kojo Asante",
      rating: 4,
      comment: "Good produce overall, delivery ran a bit late.",
    },
    {
      orderKey: "Dry Cocoa Beans - Fermented Batch|Ama Serwaa",
      rating: 5,
      comment: "Reliable farmer — beans were well-dried and on time.",
    },
    {
      orderKey: "White Yam - Export Grade|Nana Yeboah",
      rating: 5,
      comment: "Exactly as described, great sizing consistency for resale.",
    },
    {
      orderKey: "Roasted Groundnuts - Bulk Sacks|Esi Frimpong",
      rating: 3,
      comment: "Decent batch, but a bit less roasted than I usually get.",
    },
  ];

  for (const reviewData of reviewSeeds) {
    const order = ordersByKey[reviewData.orderKey];
    await prisma.review.create({
      data: {
        orderId: order.id,
        farmerId: order.farmerId,
        buyerId: order.buyerId,
        rating: reviewData.rating,
        comment: reviewData.comment,
      },
    });
  }

  // --- Notifications ----------------------------------------------------
  // A realistic mix of read/unread notifications tied to the orders and
  // listings above, so the notifications feed and unread badge count
  // aren't empty on first login.
  const notificationSeeds = [
    {
      user: "Kwame Mensah",
      type: "ORDER_PLACED",
      title: "New order received",
      body: "Ama Serwaa placed an order for Fresh Roma Tomatoes from Techiman.",
      orderKey: "Fresh Roma Tomatoes from Techiman|Ama Serwaa",
      isRead: false,
    },
    {
      user: "Ama Serwaa",
      type: "ORDER_CONFIRMED",
      title: "Order confirmed",
      body: "Kwame Mensah confirmed your order for Fresh Roma Tomatoes from Techiman.",
      orderKey: "Fresh Roma Tomatoes from Techiman|Ama Serwaa",
      isRead: false,
    },
    {
      user: "Esi Frimpong",
      type: "ORDER_IN_TRANSIT",
      title: "Your delivery is on the way",
      body: "Large Green Plantain Bunches is in transit to your location.",
      orderKey: "Large Green Plantain Bunches|Esi Frimpong",
      isRead: false,
    },
    {
      user: "Nana Yeboah",
      type: "ORDER_IN_TRANSIT",
      title: "Your delivery is on the way",
      body: "Long Grain Local Rice is in transit to your location.",
      orderKey: "Long Grain Local Rice|Nana Yeboah",
      isRead: true,
    },
    {
      user: "Ama Serwaa",
      type: "ORDER_DELIVERED",
      title: "Delivery completed",
      body: "Your order of Cured Yams for Bulk Buyers has been delivered.",
      orderKey: "Cured Yams for Bulk Buyers|Ama Serwaa",
      isRead: true,
    },
    {
      user: "Kojo Asante",
      type: "ORDER_CANCELLED",
      title: "Order cancelled",
      body: "Your order for Red Onions from the North was cancelled.",
      orderKey: "Red Onions from the North|Kojo Asante",
      isRead: true,
    },
    {
      user: "Kwame Mensah",
      type: "LISTING_INTEREST",
      title: "Someone is interested in your listing",
      body: "Nana Yeboah expressed interest in Fresh Roma Tomatoes from Techiman.",
      listingKey: "Fresh Roma Tomatoes from Techiman",
      isRead: false,
    },
    {
      user: "Yaw Boateng",
      type: "LISTING_INTEREST",
      title: "Someone is interested in your listing",
      body: "Esi Frimpong expressed interest in Fresh Scotch Bonnet Peppers.",
      listingKey: "Fresh Scotch Bonnet Peppers",
      isRead: false,
    },
    {
      user: "Abena Owusu",
      type: "NEW_REVIEW",
      title: "You received a new review",
      body: "Ama Serwaa left a 4-star review on your Cured Yams for Bulk Buyers order.",
      orderKey: "Cured Yams for Bulk Buyers|Ama Serwaa",
      isRead: false,
    },
    {
      user: "Kwame Mensah",
      type: "NEW_REVIEW",
      title: "You received a new review",
      body: "Esi Frimpong left a 5-star review on your Fresh Roma Tomatoes from Techiman order.",
      orderKey: "Fresh Roma Tomatoes from Techiman|Esi Frimpong",
      isRead: true,
    },
  ];

  for (const notif of notificationSeeds) {
    const order = notif.orderKey ? ordersByKey[notif.orderKey] : null;
    const listing = notif.listingKey ? listingsByTitle[notif.listingKey] : null;

    await prisma.notification.create({
      data: {
        userId: usersByName[notif.user].id,
        type: notif.type,
        title: notif.title,
        body: notif.body,
        orderId: order?.id ?? null,
        listingId: listing?.id ?? order?.listingId ?? null,
        isRead: notif.isRead,
      },
    });
  }

  console.log("Seeded HarvestLink demo data successfully.");
  console.log(`  Users:      ${userSeeds.length}`);
  console.log(`  Listings:   ${listingSeeds.length}`);
  console.log(`  Orders:     ${orderSeeds.length}`);
  console.log(`  Reviews:    ${reviewSeeds.length}`);
  console.log(`  Notifications: ${notificationSeeds.length}`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
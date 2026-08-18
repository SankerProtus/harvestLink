import "dotenv/config";

import { Prisma, PrismaClient } from "../src/generated/client/index.js";

const prisma = new PrismaClient();

function decimal(value) {
  return new Prisma.Decimal(value);
}

async function main() {
  await prisma.order.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.device.deleteMany();
  await prisma.oAuthAccount.deleteMany();
  await prisma.otpVerificationToken.deleteMany();
  await prisma.otpCode.deleteMany();
  await prisma.user.deleteMany();

  const userSeeds = [
    {
      fullName: "Kwame Mensah",
      role: "FARMER",
      phone: "+233551234567",
      accountStatus: "ACTIVE",
      phoneVerifiedAt: new Date("2026-07-29T09:00:00Z"),
      lastLoginAt: new Date("2026-08-02T07:45:00Z"),
    },
    {
      fullName: "Abena Owusu",
      role: "FARMER",
      phone: "+233247112233",
      accountStatus: "ACTIVE",
      phoneVerifiedAt: new Date("2026-07-28T10:15:00Z"),
      lastLoginAt: new Date("2026-08-01T18:20:00Z"),
    },
    {
      fullName: "Yaw Boateng",
      role: "FARMER",
      phone: "+233201998877",
      accountStatus: "ACTIVE",
      phoneVerifiedAt: new Date("2026-07-30T14:10:00Z"),
      lastLoginAt: new Date("2026-08-02T10:05:00Z"),
    },
    {
      fullName: "Ama Serwaa",
      role: "BUYER",
      phone: "+233245551122",
      accountStatus: "ACTIVE",
      phoneVerifiedAt: new Date("2026-07-27T11:30:00Z"),
      lastLoginAt: new Date("2026-08-02T08:30:00Z"),
    },
    {
      fullName: "Kojo Asante",
      role: "BUYER",
      phone: "+233208883344",
      accountStatus: "ACTIVE",
      phoneVerifiedAt: new Date("2026-07-26T08:45:00Z"),
      lastLoginAt: new Date("2026-08-01T16:10:00Z"),
    },
    {
      fullName: "Esi Frimpong",
      role: "BUYER",
      phone: "+233273334455",
      accountStatus: "ACTIVE",
      phoneVerifiedAt: new Date("2026-07-31T13:05:00Z"),
      lastLoginAt: new Date("2026-08-02T06:55:00Z"),
    },
    {
      fullName: "HarvestLink Admin",
      role: "ADMIN",
      phone: "+233200000001",
      accountStatus: "ACTIVE",
      phoneVerifiedAt: new Date("2026-07-25T09:00:00Z"),
      lastLoginAt: new Date("2026-08-02T09:10:00Z"),
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
        lastSeenAt: new Date("2026-08-02T07:50:00Z"),
      },
      {
        userId: usersByName["Abena Owusu"].id,
        deviceId: "android-abena-001",
        deviceName: "Abena's Tecno Spark",
        platform: "ANDROID",
        lastSeenAt: new Date("2026-08-01T18:25:00Z"),
      },
      {
        userId: usersByName["Yaw Boateng"].id,
        deviceId: "ios-yaw-001",
        deviceName: "Yaw's iPhone",
        platform: "IOS",
        lastSeenAt: new Date("2026-08-02T10:07:00Z"),
      },
      {
        userId: usersByName["Ama Serwaa"].id,
        deviceId: "android-ama-001",
        deviceName: "Ama's Pixel",
        platform: "ANDROID",
        lastSeenAt: new Date("2026-08-02T08:35:00Z"),
      },
      {
        userId: usersByName["Kojo Asante"].id,
        deviceId: "web-kojo-001",
        deviceName: "Kojo's Chrome Browser",
        platform: "WEB",
        lastSeenAt: new Date("2026-08-01T16:12:00Z"),
      },
      {
        userId: usersByName["Esi Frimpong"].id,
        deviceId: "android-esi-001",
        deviceName: "Esi's Galaxy S23",
        platform: "ANDROID",
        lastSeenAt: new Date("2026-08-02T06:57:00Z"),
      },
      {
        userId: usersByName["HarvestLink Admin"].id,
        deviceId: "web-admin-001",
        deviceName: "Admin Dashboard",
        platform: "WEB",
        lastSeenAt: new Date("2026-08-02T09:12:00Z"),
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
      images: [
        "https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFRPTUFUT3xlbnwwfHwwfHx8MA%3D%3D",
      ],
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
      images: [
        "https://images.unsplash.com/photo-1623066798929-946425dbe1b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TUFJWkV8ZW58MHx8MHx8fDA%3D",
      ],
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
      location: "Aburi, Eastern Region",
      images: [
        "https://images.unsplash.com/photo-1617196038820-1f3c8e5b6f7a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UExBTlRBSU58ZW58MHx8MHx8fDA%3D",
      ],
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
      location: "Nkawkaw, Eastern Region",
      images: [
        "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1200&q=80",
      ],
      status: "SOLD",
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
      location: "Suhum, Eastern Region",
      images: [
        "https://images.unsplash.com/photo-1667900598245-6620cea1c04c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fENPQ09BfGVufDB8fDB8fHww",
      ],
      status: "ACTIVE",
    },
    {
      farmer: "Yaw Boateng",
      title: "Red Onions from Tamale",
      description:
        "Firm red onions packed in nets and ready for retailers or food service distributors.",
      cropType: "ONION",
      quantity: decimal("210.00"),
      quantityUnit: "BAG",
      pricePerUnit: decimal("180.00"),
      location: "Tamale, Northern Region",
      images: [
        "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      status: "REMOVED",
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
        images: listingData.images,
        status: listingData.status,
      },
    });
  }

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
      latestLatitude: 6.1985,
      latestLongitude: -0.6333,
      locationReportedAt: new Date("2026-08-02T11:20:00Z"),
    },
    {
      listing: "Dry Cocoa Beans - Fermented Batch",
      buyer: "Ama Serwaa",
      quantity: decimal("6.00"),
      pricePerUnitAtOrder: decimal("2450.00"),
      status: "DELIVERED",
    },
    {
      listing: "Red Onions from Tamale",
      buyer: "Kojo Asante",
      quantity: decimal("10.00"),
      pricePerUnitAtOrder: decimal("180.00"),
      status: "CANCELLED",
    },
    // Additional delivered orders exist so real reviews/ratings can be
    // seeded below — the rating shown on a listing is always a real
    // aggregate of Review rows tied to a DELIVERED order, never a
    // hardcoded number.
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
      listing: "Large Green Plantain Bunches",
      buyer: "Kojo Asante",
      quantity: decimal("10.00"),
      pricePerUnitAtOrder: decimal("32.00"),
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

  // Reviews — one per DELIVERED order, submitted by the buyer. These are
  // the only source of the rating/review-count shown on listings; no
  // rating is ever displayed for a farmer without real Review rows.
  const reviewSeeds = [
    {
      orderKey: "Dry Cocoa Beans - Fermented Batch|Ama Serwaa",
      rating: 5,
      comment: "Reliable farmer — beans were well-dried and on time.",
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
      orderKey: "Large Green Plantain Bunches|Kojo Asante",
      rating: 5,
      comment: "Great bunches, carefully packed for transport.",
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

  console.log("Seeded HarvestLink demo data successfully.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

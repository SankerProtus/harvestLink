import "dotenv/config";

import { Prisma, PrismaClient } from "../src/generated/client/index.js";

const prisma = new PrismaClient();

function decimal(value) {
  return new Prisma.Decimal(value);
}

function produceImage(seed, index = 1) {
  return `https://picsum.photos/seed/${seed}-${index}/900/700`;
}

function avatarImage(seed) {
  return `https://i.pravatar.cc/300?u=${seed}`;
}

function daysAgo(n, hour = 9, minute = 0) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  d.setUTCHours(hour, minute, 0, 0);
  return d;
}

async function main() {
  await prisma.notification.deleteMany();
  await prisma.review.deleteMany();
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

  // ─────────────────────────────────────────────────────────────
  // Users — 6 farmers spread across Ghana's growing regions, 5 buyers
  // covering the range of real HarvestLink customers (market trader,
  // restaurant procurement, wholesale distributor, chop bar owner,
  // exporter), and 1 admin.
  // ─────────────────────────────────────────────────────────────
  const userSeeds = [
    {
      fullName: "Kwame Mensah",
      role: "FARMER",
      phone: "+233551234567",
      accountStatus: "ACTIVE",
      phoneVerifiedAt: daysAgo(20, 9, 0),
      lastLoginAt: daysAgo(0, 7, 45),
      profileImageUrl: avatarImage("kwame-mensah"),
    },
    {
      fullName: "Abena Owusu",
      role: "FARMER",
      phone: "+233247112233",
      accountStatus: "ACTIVE",
      phoneVerifiedAt: daysAgo(21, 10, 15),
      lastLoginAt: daysAgo(1, 18, 20),
      profileImageUrl: avatarImage("abena-owusu"),
    },
    {
      fullName: "Yaw Boateng",
      role: "FARMER",
      phone: "+233201998877",
      accountStatus: "ACTIVE",
      phoneVerifiedAt: daysAgo(19, 14, 10),
      lastLoginAt: daysAgo(0, 10, 5),
      profileImageUrl: avatarImage("yaw-boateng"),
    },
    {
      fullName: "Adjoa Nyarko",
      role: "FARMER",
      phone: "+233541122334",
      accountStatus: "ACTIVE",
      phoneVerifiedAt: daysAgo(17, 8, 40),
      lastLoginAt: daysAgo(0, 6, 30),
      profileImageUrl: avatarImage("adjoa-nyarko"),
    },
    {
      fullName: "Salifu Mahama",
      role: "FARMER",
      phone: "+233268765432",
      accountStatus: "ACTIVE",
      phoneVerifiedAt: daysAgo(15, 11, 0),
      lastLoginAt: daysAgo(2, 9, 15),
      profileImageUrl: avatarImage("salifu-mahama"),
    },
    {
      fullName: "Comfort Asiedu",
      role: "FARMER",
      phone: "+233209988776",
      accountStatus: "ACTIVE",
      phoneVerifiedAt: daysAgo(12, 13, 20),
      lastLoginAt: daysAgo(1, 8, 0),
      profileImageUrl: avatarImage("comfort-asiedu"),
    },
    {
      fullName: "Ama Serwaa",
      role: "BUYER",
      phone: "+233245551122",
      accountStatus: "ACTIVE",
      phoneVerifiedAt: daysAgo(22, 11, 30),
      lastLoginAt: daysAgo(0, 8, 30),
      profileImageUrl: avatarImage("ama-serwaa"),
    },
    {
      fullName: "Kojo Asante",
      role: "BUYER",
      phone: "+233208883344",
      accountStatus: "ACTIVE",
      phoneVerifiedAt: daysAgo(23, 8, 45),
      lastLoginAt: daysAgo(1, 16, 10),
      profileImageUrl: avatarImage("kojo-asante"),
    },
    {
      fullName: "Esi Frimpong",
      role: "BUYER",
      phone: "+233273334455",
      accountStatus: "ACTIVE",
      phoneVerifiedAt: daysAgo(18, 13, 5),
      lastLoginAt: daysAgo(0, 6, 55),
      profileImageUrl: avatarImage("esi-frimpong"),
    },
    {
      fullName: "Fatima Alhassan",
      role: "BUYER",
      phone: "+233542211887",
      accountStatus: "ACTIVE",
      phoneVerifiedAt: daysAgo(14, 9, 50),
      lastLoginAt: daysAgo(0, 12, 40),
      profileImageUrl: avatarImage("fatima-alhassan"),
    },
    {
      fullName: "Nana Kwesi Appiah",
      role: "BUYER",
      phone: "+233276645129",
      accountStatus: "ACTIVE",
      phoneVerifiedAt: daysAgo(10, 15, 25),
      lastLoginAt: daysAgo(2, 17, 5),
      profileImageUrl: avatarImage("nana-kwesi-appiah"),
    },
    {
      fullName: "HarvestLink Admin",
      role: "ADMIN",
      phone: "+233200000001",
      accountStatus: "ACTIVE",
      phoneVerifiedAt: daysAgo(25, 9, 0),
      lastLoginAt: daysAgo(0, 9, 10),
      profileImageUrl: avatarImage("harvestlink-admin"),
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
        lastSeenAt: daysAgo(0, 7, 50),
      },
      {
        userId: usersByName["Abena Owusu"].id,
        deviceId: "android-abena-001",
        deviceName: "Abena's Tecno Spark",
        platform: "ANDROID",
        lastSeenAt: daysAgo(1, 18, 25),
      },
      {
        userId: usersByName["Yaw Boateng"].id,
        deviceId: "ios-yaw-001",
        deviceName: "Yaw's iPhone",
        platform: "IOS",
        lastSeenAt: daysAgo(0, 10, 7),
      },
      {
        userId: usersByName["Adjoa Nyarko"].id,
        deviceId: "android-adjoa-001",
        deviceName: "Adjoa's Infinix Hot",
        platform: "ANDROID",
        lastSeenAt: daysAgo(0, 6, 32),
      },
      {
        userId: usersByName["Salifu Mahama"].id,
        deviceId: "android-salifu-001",
        deviceName: "Salifu's Itel Vision",
        platform: "ANDROID",
        lastSeenAt: daysAgo(2, 9, 20),
      },
      {
        userId: usersByName["Comfort Asiedu"].id,
        deviceId: "ios-comfort-001",
        deviceName: "Comfort's iPhone SE",
        platform: "IOS",
        lastSeenAt: daysAgo(1, 8, 5),
      },
      {
        userId: usersByName["Ama Serwaa"].id,
        deviceId: "android-ama-001",
        deviceName: "Ama's Pixel",
        platform: "ANDROID",
        lastSeenAt: daysAgo(0, 8, 35),
      },
      {
        userId: usersByName["Kojo Asante"].id,
        deviceId: "web-kojo-001",
        deviceName: "Kojo's Chrome Browser",
        platform: "WEB",
        lastSeenAt: daysAgo(1, 16, 12),
      },
      {
        userId: usersByName["Esi Frimpong"].id,
        deviceId: "android-esi-001",
        deviceName: "Esi's Galaxy S23",
        platform: "ANDROID",
        lastSeenAt: daysAgo(0, 6, 57),
      },
      {
        userId: usersByName["Fatima Alhassan"].id,
        deviceId: "ios-fatima-001",
        deviceName: "Fatima's iPhone 13",
        platform: "IOS",
        lastSeenAt: daysAgo(0, 12, 42),
      },
      {
        userId: usersByName["Nana Kwesi Appiah"].id,
        deviceId: "web-nana-001",
        deviceName: "Nana's Office PC",
        platform: "WEB",
        lastSeenAt: daysAgo(2, 17, 8),
      },
      {
        userId: usersByName["HarvestLink Admin"].id,
        deviceId: "web-admin-001",
        deviceName: "Admin Dashboard",
        platform: "WEB",
        lastSeenAt: daysAgo(0, 9, 12),
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
  await prisma.oAuthAccount.create({
    data: {
      userId: usersByName["Nana Kwesi Appiah"].id,
      provider: "GOOGLE",
      providerAccountId: "google-nana-appiah-001",
      email: "nana.appiah@example.com",
    },
  });

  // ─────────────────────────────────────────────────────────────
  // Listings — every CropType represented at least once, spread across
  // six farmers and Ghana's growing regions, with realistic quantities,
  // pricing, and 2 photos per listing.
  // ─────────────────────────────────────────────────────────────
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
      images: [produceImage("tomato-techiman", 1), produceImage("tomato-techiman", 2)],
      status: "ACTIVE",
      harvestDate: daysAgo(1),
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
      images: [produceImage("maize-kintampo", 1), produceImage("maize-kintampo", 2)],
      status: "ACTIVE",
      harvestDate: daysAgo(6),
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
      images: [produceImage("plantain-aburi", 1), produceImage("plantain-aburi", 2)],
      status: "ACTIVE",
      harvestDate: daysAgo(2),
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
      images: [produceImage("yam-nkawkaw", 1), produceImage("yam-nkawkaw", 2)],
      status: "SOLD",
      harvestDate: daysAgo(14),
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
      images: [produceImage("cocoa-suhum", 1), produceImage("cocoa-suhum", 2)],
      status: "ACTIVE",
      harvestDate: daysAgo(9),
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
      images: [produceImage("onion-tamale", 1), produceImage("onion-tamale", 2)],
      status: "REMOVED",
      harvestDate: daysAgo(20),
    },
    {
      farmer: "Adjoa Nyarko",
      title: "Freshly Harvested Cassava Tubers",
      description:
        "Hand-dug cassava, washed and sorted the same day. Great for gari processors and fufu vendors.",
      cropType: "CASSAVA",
      quantity: decimal("160.00"),
      quantityUnit: "BASKET",
      pricePerUnit: decimal("48.00"),
      location: "Sunyani, Bono Region",
      images: [produceImage("cassava-sunyani", 1), produceImage("cassava-sunyani", 2)],
      status: "ACTIVE",
      harvestDate: daysAgo(0),
    },
    {
      farmer: "Adjoa Nyarko",
      title: "Hot Scotch Bonnet Peppers",
      description:
        "Bright, firm scotch bonnet peppers picked at peak ripeness. Packed same-day for freshness.",
      cropType: "PEPPER",
      quantity: decimal("55.00"),
      quantityUnit: "BASKET",
      pricePerUnit: decimal("110.00"),
      location: "Berekum, Bono Region",
      images: [produceImage("pepper-berekum", 1), produceImage("pepper-berekum", 2)],
      status: "ACTIVE",
      harvestDate: daysAgo(1),
    },
    {
      farmer: "Salifu Mahama",
      title: "Northern Long-Grain Rice",
      description:
        "Locally milled long-grain rice from the Wa irrigation scheme. Cleaned and bagged, low broken-grain rate.",
      cropType: "RICE",
      quantity: decimal("300.00"),
      quantityUnit: "BAG",
      pricePerUnit: decimal("310.00"),
      location: "Wa, Upper West Region",
      images: [produceImage("rice-wa", 1), produceImage("rice-wa", 2)],
      status: "ACTIVE",
      harvestDate: daysAgo(11),
    },
    {
      farmer: "Salifu Mahama",
      title: "Shelled Groundnuts - Bulk Bags",
      description:
        "Sun-dried, hand-shelled groundnuts ready for oil millers or roasters. Consistent kernel size, low moisture.",
      cropType: "GROUNDNUT",
      quantity: decimal("130.00"),
      quantityUnit: "BAG",
      pricePerUnit: decimal("260.00"),
      location: "Wa, Upper West Region",
      images: [produceImage("groundnut-wa", 1), produceImage("groundnut-wa", 2)],
      status: "ACTIVE",
      harvestDate: daysAgo(7),
    },
    {
      farmer: "Comfort Asiedu",
      title: "Yellow Dent Maize - Volta Belt",
      description:
        "Well-dried yellow maize from the Ho farming belt, stored off the ground to keep moisture and pests out.",
      cropType: "MAIZE",
      quantity: decimal("175.00"),
      quantityUnit: "SACK",
      pricePerUnit: decimal("150.00"),
      location: "Ho, Volta Region",
      images: [produceImage("maize-ho", 1), produceImage("maize-ho", 2)],
      status: "ACTIVE",
      harvestDate: daysAgo(4),
    },
    {
      farmer: "Comfort Asiedu",
      title: "Water Yam - Table Grade",
      description:
        "Table-grade water yam, medium tubers, ideal for households and restaurants that need consistent cooking size.",
      cropType: "YAM",
      quantity: decimal("85.00"),
      quantityUnit: "SACK",
      pricePerUnit: decimal("115.00"),
      location: "Kpando, Volta Region",
      images: [produceImage("yam-kpando", 1), produceImage("yam-kpando", 2)],
      status: "ACTIVE",
      harvestDate: daysAgo(3),
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
        images: listingData.images,
        status: listingData.status,
      },
    });
  }

  // ─────────────────────────────────────────────────────────────
  // Orders — every OrderStatus represented, spread across buyers so
  // "As buyer" / "As farmer" views on the Orders screen both have
  // pending, in-transit, delivered, and cancelled examples to show.
  // ─────────────────────────────────────────────────────────────
  const orderSeeds = [
    {
      listing: "Fresh Roma Tomatoes from Techiman",
      buyer: "Ama Serwaa",
      quantity: decimal("12.00"),
      pricePerUnitAtOrder: decimal("95.00"),
      status: "CONFIRMED",
      createdAt: daysAgo(2, 8, 0),
    },
    {
      listing: "Premium White Maize",
      buyer: "Kojo Asante",
      quantity: decimal("18.00"),
      pricePerUnitAtOrder: decimal("145.00"),
      status: "PENDING",
      createdAt: daysAgo(0, 9, 30),
    },
    {
      listing: "Large Green Plantain Bunches",
      buyer: "Esi Frimpong",
      quantity: decimal("8.00"),
      pricePerUnitAtOrder: decimal("32.00"),
      status: "IN_TRANSIT",
      createdAt: daysAgo(1, 7, 15),
      latestLatitude: 6.1985,
      latestLongitude: -0.6333,
      locationReportedAt: daysAgo(0, 11, 20),
    },
    {
      listing: "Dry Cocoa Beans - Fermented Batch",
      buyer: "Ama Serwaa",
      quantity: decimal("6.00"),
      pricePerUnitAtOrder: decimal("2450.00"),
      status: "DELIVERED",
      createdAt: daysAgo(8, 10, 0),
    },
    {
      listing: "Red Onions from Tamale",
      buyer: "Kojo Asante",
      quantity: decimal("10.00"),
      pricePerUnitAtOrder: decimal("180.00"),
      status: "CANCELLED",
      createdAt: daysAgo(15, 12, 0),
    },
    {
      listing: "Fresh Roma Tomatoes from Techiman",
      buyer: "Esi Frimpong",
      quantity: decimal("15.00"),
      pricePerUnitAtOrder: decimal("95.00"),
      status: "DELIVERED",
      createdAt: daysAgo(6, 9, 45),
    },
    {
      listing: "Fresh Roma Tomatoes from Techiman",
      buyer: "Kojo Asante",
      quantity: decimal("9.00"),
      pricePerUnitAtOrder: decimal("95.00"),
      status: "DELIVERED",
      createdAt: daysAgo(5, 14, 0),
    },
    {
      listing: "Large Green Plantain Bunches",
      buyer: "Kojo Asante",
      quantity: decimal("10.00"),
      pricePerUnitAtOrder: decimal("32.00"),
      status: "DELIVERED",
      createdAt: daysAgo(4, 16, 30),
    },
    {
      listing: "Freshly Harvested Cassava Tubers",
      buyer: "Fatima Alhassan",
      quantity: decimal("20.00"),
      pricePerUnitAtOrder: decimal("48.00"),
      status: "IN_TRANSIT",
      createdAt: daysAgo(1, 6, 40),
      latestLatitude: 7.3399,
      latestLongitude: -2.3268,
      locationReportedAt: daysAgo(0, 10, 5),
    },
    {
      listing: "Hot Scotch Bonnet Peppers",
      buyer: "Fatima Alhassan",
      quantity: decimal("14.00"),
      pricePerUnitAtOrder: decimal("110.00"),
      status: "CONFIRMED",
      createdAt: daysAgo(0, 13, 10),
    },
    {
      listing: "Northern Long-Grain Rice",
      buyer: "Nana Kwesi Appiah",
      quantity: decimal("40.00"),
      pricePerUnitAtOrder: decimal("310.00"),
      status: "DELIVERED",
      createdAt: daysAgo(9, 8, 20),
    },
    {
      listing: "Shelled Groundnuts - Bulk Bags",
      buyer: "Nana Kwesi Appiah",
      quantity: decimal("25.00"),
      pricePerUnitAtOrder: decimal("260.00"),
      status: "PENDING",
      createdAt: daysAgo(0, 15, 50),
    },
    {
      listing: "Yellow Dent Maize - Volta Belt",
      buyer: "Esi Frimpong",
      quantity: decimal("22.00"),
      pricePerUnitAtOrder: decimal("150.00"),
      status: "DELIVERED",
      createdAt: daysAgo(3, 9, 0),
    },
    {
      listing: "Water Yam - Table Grade",
      buyer: "Ama Serwaa",
      quantity: decimal("11.00"),
      pricePerUnitAtOrder: decimal("115.00"),
      status: "CANCELLED",
      createdAt: daysAgo(2, 17, 40),
    },
  ];

  const ordersByKey = {};
  const notificationSeeds = [];

  for (const orderData of orderSeeds) {
    const listing = listingsByTitle[orderData.listing];
    const buyer = usersByName[orderData.buyer];

    const order = await prisma.order.create({
      data: {
        listingId: listing.id,
        buyerId: buyer.id,
        farmerId: listing.farmerId,
        quantity: orderData.quantity,
        pricePerUnitAtOrder: orderData.pricePerUnitAtOrder,
        status: orderData.status,
        latestLatitude: orderData.latestLatitude ?? null,
        latestLongitude: orderData.latestLongitude ?? null,
        locationReportedAt: orderData.locationReportedAt ?? null,
        createdAt: orderData.createdAt,
      },
    });
    ordersByKey[`${orderData.listing}|${orderData.buyer}`] = order;

    // Every order notifies the farmer it was placed on.
    notificationSeeds.push({
      userId: order.farmerId,
      type: "ORDER_PLACED",
      title: "New order received",
      body: `${buyer.fullName} ordered ${orderData.quantity} of "${listing.title}".`,
      orderId: order.id,
      listingId: listing.id,
      isRead: orderData.status !== "PENDING",
      createdAt: orderData.createdAt,
    });

    // Status-specific follow-up notifications to the buyer, mirroring
    // what the (unpublished) domain events would fire in production.
    if (["CONFIRMED", "IN_TRANSIT", "DELIVERED", "CANCELLED"].includes(orderData.status)) {
      const followUps = {
        CONFIRMED: {
          type: "ORDER_CONFIRMED",
          title: "Order confirmed",
          body: `Your order for "${listing.title}" was confirmed by the farmer.`,
          offsetHours: 3,
        },
        IN_TRANSIT: {
          type: "ORDER_IN_TRANSIT",
          title: "Order is on its way",
          body: `Your order for "${listing.title}" is now in transit.`,
          offsetHours: 20,
        },
        DELIVERED: {
          type: "ORDER_DELIVERED",
          title: "Order delivered",
          body: `Your order for "${listing.title}" has been delivered.`,
          offsetHours: 48,
        },
        CANCELLED: {
          type: "ORDER_CANCELLED",
          title: "Order cancelled",
          body: `Your order for "${listing.title}" was cancelled.`,
          offsetHours: 5,
        },
      }[orderData.status];

      const followUpDate = new Date(orderData.createdAt);
      followUpDate.setUTCHours(followUpDate.getUTCHours() + followUps.offsetHours);

      notificationSeeds.push({
        userId: buyer.id,
        type: followUps.type,
        title: followUps.title,
        body: followUps.body,
        orderId: order.id,
        listingId: listing.id,
        isRead: orderData.status !== "IN_TRANSIT" && orderData.status !== "CONFIRMED",
        createdAt: followUpDate,
      });
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Reviews — one per DELIVERED order, submitted by the buyer. These are
  // the only source of the rating/review-count shown on listings.
  // ─────────────────────────────────────────────────────────────
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
    {
      orderKey: "Northern Long-Grain Rice|Nana Kwesi Appiah",
      rating: 4,
      comment: "Clean rice, very low broken-grain rate. Will order again.",
    },
    {
      orderKey: "Yellow Dent Maize - Volta Belt|Esi Frimpong",
      rating: 3,
      comment: "Decent maize, a few sacks had more moisture than expected.",
    },
  ];

  for (const reviewData of reviewSeeds) {
    const order = ordersByKey[reviewData.orderKey];
    const review = await prisma.review.create({
      data: {
        orderId: order.id,
        farmerId: order.farmerId,
        buyerId: order.buyerId,
        rating: reviewData.rating,
        comment: reviewData.comment,
      },
    });

    const listing = Object.values(listingsByTitle).find(
      (l) => l.id === order.listingId,
    );
    notificationSeeds.push({
      userId: review.farmerId,
      type: "NEW_REVIEW",
      title: "New review on your order",
      body: `You received a ${review.rating}-star review for "${listing.title}".`,
      orderId: order.id,
      listingId: listing.id,
      isRead: true,
      createdAt: new Date(order.createdAt.getTime() + 1000 * 60 * 60 * 60),
    });
  }

  // ─────────────────────────────────────────────────────────────
  // Listing interest — buyers signalling interest to the farmer,
  // separate from the private SavedListing bookmark below.
  // ─────────────────────────────────────────────────────────────
  const interestSeeds = [
    { listing: "Premium White Maize", buyer: "Esi Frimpong" },
    { listing: "Premium White Maize", buyer: "Fatima Alhassan" },
    { listing: "Freshly Harvested Cassava Tubers", buyer: "Ama Serwaa" },
    { listing: "Hot Scotch Bonnet Peppers", buyer: "Nana Kwesi Appiah" },
    { listing: "Northern Long-Grain Rice", buyer: "Kojo Asante" },
    { listing: "Shelled Groundnuts - Bulk Bags", buyer: "Esi Frimpong" },
    { listing: "Yellow Dent Maize - Volta Belt", buyer: "Fatima Alhassan" },
    { listing: "Water Yam - Table Grade", buyer: "Kojo Asante" },
  ];

  for (const interestData of interestSeeds) {
    const listing = listingsByTitle[interestData.listing];
    const buyer = usersByName[interestData.buyer];

    await prisma.listingInterest.create({
      data: { listingId: listing.id, buyerId: buyer.id },
    });

    notificationSeeds.push({
      userId: listing.farmerId,
      type: "LISTING_INTEREST",
      title: "A buyer is interested",
      body: `${buyer.fullName} expressed interest in "${listing.title}".`,
      listingId: listing.id,
      isRead: false,
      createdAt: daysAgo(Math.floor(Math.random() * 3), 12, 0),
    });
  }

  // ─────────────────────────────────────────────────────────────
  // Saved listings — private buyer bookmarks, no notifications fire
  // for these (silent by design, per the schema).
  // ─────────────────────────────────────────────────────────────
  const savedListingSeeds = [
    { listing: "Dry Cocoa Beans - Fermented Batch", buyer: "Ama Serwaa" },
    { listing: "Northern Long-Grain Rice", buyer: "Nana Kwesi Appiah" },
    { listing: "Hot Scotch Bonnet Peppers", buyer: "Fatima Alhassan" },
    { listing: "Premium White Maize", buyer: "Kojo Asante" },
    { listing: "Water Yam - Table Grade", buyer: "Esi Frimpong" },
    { listing: "Shelled Groundnuts - Bulk Bags", buyer: "Fatima Alhassan" },
  ];

  for (const savedData of savedListingSeeds) {
    await prisma.savedListing.create({
      data: {
        listingId: listingsByTitle[savedData.listing].id,
        buyerId: usersByName[savedData.buyer].id,
      },
    });
  }

  await prisma.notification.createMany({ data: notificationSeeds });

  console.log(
    `Seeded HarvestLink demo data successfully: ${Object.keys(usersByName).length} users, ${Object.keys(listingsByTitle).length} listings, ${orderSeeds.length} orders, ${reviewSeeds.length} reviews, ${interestSeeds.length} listing interests, ${savedListingSeeds.length} saved listings, ${notificationSeeds.length} notifications.`,
  );
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
import { PrismaClient } from "../src/generated/client/index.js";

const prisma = new PrismaClient();

const IDS = {
  farmers: [
    "10000000-0000-4000-8000-000000000001",
    "10000000-0000-4000-8000-000000000002",
    "10000000-0000-4000-8000-000000000003",
    "10000000-0000-4000-8000-000000000004",
    "10000000-0000-4000-8000-000000000005",
  ],

  buyers: [
    "20000000-0000-4000-8000-000000000001",
    "20000000-0000-4000-8000-000000000002",
    "20000000-0000-4000-8000-000000000003",
  ],

  listings: [
    "30000000-0000-4000-8000-000000000001",
    "30000000-0000-4000-8000-000000000002",
    "30000000-0000-4000-8000-000000000003",
    "30000000-0000-4000-8000-000000000004",
    "30000000-0000-4000-8000-000000000005",
    "30000000-0000-4000-8000-000000000006",
    "30000000-0000-4000-8000-000000000007",
    "30000000-0000-4000-8000-000000000008",
    "30000000-0000-4000-8000-000000000009",
    "30000000-0000-4000-8000-000000000010",
    "30000000-0000-4000-8000-000000000011",
    "30000000-0000-4000-8000-000000000012",
  ],

  orders: [
    "40000000-0000-4000-8000-000000000001",
    "40000000-0000-4000-8000-000000000002",
    "40000000-0000-4000-8000-000000000003",
    "40000000-0000-4000-8000-000000000004",
    "40000000-0000-4000-8000-000000000005",
    "40000000-0000-4000-8000-000000000006",
    "50000000-0000-4000-8000-000000000001",
    "50000000-0000-4000-8000-000000000002",
    "50000000-0000-4000-8000-000000000003",
  ],
};

/*
|--------------------------------------------------------------------------
| IMAGE DATA
|--------------------------------------------------------------------------
|
*/

const IMG = {
  tomatoes: [
    "https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dG9tYXRvZXN8ZW58MHx8MHx8fDA%3D",
    "https://plus.unsplash.com/premium_photo-1661811820259-2575b82101bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9tYXRvZXN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG9tYXRvZXN8ZW58MHx8MHx8fDA%3D",
  ],

  maize: [
    "https://images.unsplash.com/photo-1634467524884-897d0af5e104?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFpemV8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1623066798929-946425dbe1b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFpemV8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1651667343153-6dc318e27e41?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFpemV8ZW58MHx8MHx8fDA%3D",
  ],

  peppers: [
    "https://images.unsplash.com/photo-1669863347362-1630fe821708?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBlcHBlcnN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1585159079680-8dec029b76ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBlcHBlcnN8ZW58MHx8MHx8fDA%3D",
    "https://unsplash.com/photos/red-and-yellow-bell-peppers-y46uWYq65hU",
    "https://images.unsplash.com/photo-1567539549213-cc1697632146?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVwcGVyc3xlbnwwfHwwfHx8MA%3D%3D",
  ],

  plantain: [
    "https://images.unsplash.com/reserve/RNm0KceQ4Gbpb0xldOe7_DSC_0679_2.JPG?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGxhbnRhaW58ZW58MHx8MHx8fDA%3D",
    "https://unsplash.com/photos/a-bunch-of-green-bananas-hanging-from-a-tree-Uuyjgd6OEJ8",
    "https://images.unsplash.com/photo-1527546712175-827fa4321096?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGxhbnRhaW58ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1464918877125-24db0dc393cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGxhbnRhaW58ZW58MHx8MHx8fDA%3D",
  ],

  cassava: [
    "https://images.unsplash.com/photo-1757283961570-682154747d9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2Fzc2F2YXxlbnwwfHwwfHx8MA%3D%3D",
    "https://unsplash.com/photos/pile-of-freshly-harvested-cassava-roots-sixDoAtyVwo",
    "https://plus.unsplash.com/premium_photo-1725467479101-556af13a7220?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2Fzc2F2YXxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1764143914716-3524db64940e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhc3NhdmF8ZW58MHx8MHx8fDA%3D5",
  ],

  onions: [
    "https://plus.unsplash.com/premium_photo-1668076517573-fa01307d87ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8b25pb25zfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b25pb25zfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8b25pb25zfGVufDB8fDB8fHww",
  ],

  rice: [
    "https://images.unsplash.com/photo-1686820740687-426a7b9b2043?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmljZXxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmljZXxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1635562985686-4f8bb9c0d3bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmljZXxlbnwwfHwwfHx8MA%3D%3D",
  ],

  yam: [
    "https://images.unsplash.com/photo-1730815048561-45df6f7f331d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eWFtfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1783553642630-792e38bf992a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8eWFtfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1617130094141-532436117aa1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8eWFtfGVufDB8fDB8fHww",
  ],

  groundnuts: [
    "https://plus.unsplash.com/premium_photo-1726072356924-e29e8999df09?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z3JvdW5kbnV0c3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1784043436684-1bfbfb72a8e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3JvdW5kbnV0c3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1766392005180-db5ea965d655?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdyb3VuZG51dHN8ZW58MHx8MHx8fDA%3D",
  ],

  cocoa: [
    "https://images.unsplash.com/photo-1493925410384-84f842e616fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29jb2F8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1545567724-9b16e57c906d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvY29hfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1573710661345-610f790e1218?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29jb2F8ZW58MHx8MHx8fDA%3D",
  ],

  vegetables: [
    "https://images.unsplash.com/photo-1533321942807-08e4008b2025?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHZlZ2V0YWJsZXN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHZlZ2V0YWJsZXN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1557844352-761f2565b576?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHZlZ2V0YWJsZXN8ZW58MHx8MHx8fDA%3D",
  ],

  farm: [
    "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhcm18ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1529313780224-1a12b68bed16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZhcm18ZW58MHx8MHx8fDA%3D",
    "https://plus.unsplash.com/premium_photo-1661962692059-55d5a4319814?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmFybXxlbnwwfHwwfHx8MA%3D%3D",
  ],

  farmer1:
    "https://images.unsplash.com/photo-1533128248137-4e6e9e8c5f89?auto=format&fit=crop&w=300&q=80",

  farmer2:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",

  farmer3:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",

  farmer4:
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",

  farmer5:
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",

  buyer1:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",

  buyer2:
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",

  buyer3:
    "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=300&q=80",
};

const now = new Date("2026-08-23T05:30:00.000Z");

const daysAgo = (days) =>
  new Date(now.getTime() - days * 86400000);

const farmers = [
  {
    id: IDS.farmers[0],
    fullName: "Kwame Asare",
    phone: "+233241000101",
    profileImageUrl: IMG.farmer1,
    lastLoginAt: daysAgo(1),
  },
  {
    id: IDS.farmers[1],
    fullName: "Abena Owusu",
    phone: "+233242000202",
    profileImageUrl: IMG.farmer2,
    lastLoginAt: daysAgo(2),
  },
  {
    id: IDS.farmers[2],
    fullName: "Kofi Mensah",
    phone: "+233243000303",
    profileImageUrl: IMG.farmer3,
    lastLoginAt: daysAgo(1),
  },
  {
    id: IDS.farmers[3],
    fullName: "Yaw Boateng",
    phone: "+233244000404",
    profileImageUrl: IMG.farmer4,
    lastLoginAt: daysAgo(4),
  },
  {
    id: IDS.farmers[4],
    fullName: "Akosua Frimpong",
    phone: "+233245000505",
    profileImageUrl: IMG.farmer5,
    lastLoginAt: daysAgo(3),
  },
];

const buyers = [
  {
    id: IDS.buyers[0],
    fullName: "Ama Mensima",
    phone: "+233501100101",
    profileImageUrl: IMG.buyer1,
    lastLoginAt: daysAgo(1),
  },
  {
    id: IDS.buyers[1],
    fullName: "Daniel Ofori",
    phone: "+233502200202",
    profileImageUrl: IMG.buyer2,
    lastLoginAt: daysAgo(2),
  },
  {
    id: IDS.buyers[2],
    fullName: "Kojo Antwi",
    phone: "+233503300303",
    profileImageUrl: IMG.buyer3,
    lastLoginAt: daysAgo(1),
  },
];

const listingData = [
  {
    id: IDS.listings[0],
    farmerId: IDS.farmers[0],
    title: "Fresh Garden Tomatoes - Grade A",
    description:
      "Firm, freshly harvested tomatoes suitable for supermarkets, restaurants and bulk resellers. Carefully sorted and packed.",
    cropType: "TOMATO",
    quantity: 85,
    quantityUnit: "CRATE",
    pricePerUnit: 95,
    location: "Techiman, Bono East",
    harvestDate: daysAgo(2),
    images: IMG.tomatoes,
  },

  {
    id: IDS.listings[1],
    farmerId: IDS.farmers[0],
    title: "Premium Yellow Maize",
    description:
      "Clean, dry yellow maize from the 2026 harvest. Ideal for poultry feed processors and wholesalers.",
    cropType: "MAIZE",
    quantity: 120,
    quantityUnit: "BAG",
    pricePerUnit: 430,
    location: "Techiman, Bono East",
    harvestDate: daysAgo(14),
    images: IMG.maize,
  },

  {
    id: IDS.listings[2],
    farmerId: IDS.farmers[0],
    title: "Fresh Green Pepper",
    description:
      "Crisp green peppers harvested this week. Consistent size with low spoilage and ready for immediate collection.",
    cropType: "PEPPER",
    quantity: 48,
    quantityUnit: "BASKET",
    pricePerUnit: 155,
    location: "Wenchi, Bono",
    harvestDate: daysAgo(1),
    images: IMG.peppers,
  },

  {
    id: IDS.listings[3],
    farmerId: IDS.farmers[1],
    title: "Sweet Plantain Bunches",
    description:
      "Mature plantain harvested at the right stage for traders and food businesses. Bulk orders welcome.",
    cropType: "PLANTAIN",
    quantity: 65,
    quantityUnit: "BUNCH",
    pricePerUnit: 42,
    location: "Kumasi, Ashanti",
    harvestDate: daysAgo(3),
    images: IMG.plantain,
  },

  {
    id: IDS.listings[4],
    farmerId: IDS.farmers[1],
    title: "Fresh Cassava Tubers",
    description:
      "Large, healthy cassava tubers suitable for gari, starch and fresh market processing.",
    cropType: "CASSAVA",
    quantity: 240,
    quantityUnit: "SACK",
    pricePerUnit: 175,
    location: "Ejura, Ashanti",
    harvestDate: daysAgo(5),
    images: IMG.cassava,
  },

  {
    id: IDS.listings[5],
    farmerId: IDS.farmers[1],
    title: "Red Onions - Sorted",
    description:
      "Well-cured red onions, sorted by size and packed for wholesale distribution.",
    cropType: "ONION",
    quantity: 70,
    quantityUnit: "BAG",
    pricePerUnit: 360,
    location: "Kumasi, Ashanti",
    harvestDate: daysAgo(9),
    images: IMG.onions,
  },

  {
    id: IDS.listings[6],
    farmerId: IDS.farmers[2],
    title: "Long Grain Local Rice",
    description:
      "Locally grown long-grain rice, cleaned and ready for bulk buyers. Consistent quality across the lot.",
    cropType: "RICE",
    quantity: 95,
    quantityUnit: "SACK",
    pricePerUnit: 520,
    location: "Tamale, Northern",
    harvestDate: daysAgo(20),
    images: IMG.rice,
  },

  {
    id: IDS.listings[7],
    farmerId: IDS.farmers[2],
    title: "Fresh Cocoyam & Yam Mix",
    description:
      "Freshly harvested tubers for market traders, chop bars and food processors.",
    cropType: "YAM",
    quantity: 180,
    quantityUnit: "PIECE",
    pricePerUnit: 18,
    location: "Tamale, Northern",
    harvestDate: daysAgo(4),
    images: IMG.yam,
  },

  {
    id: IDS.listings[8],
    farmerId: IDS.farmers[2],
    title: "Shelled Groundnuts",
    description:
      "Clean, dry shelled groundnuts with excellent colour and low foreign matter.",
    cropType: "GROUNDNUT",
    quantity: 75,
    quantityUnit: "SACK",
    pricePerUnit: 680,
    location: "Bolgatanga, Upper East",
    harvestDate: daysAgo(18),
    images: IMG.groundnuts,
  },

  {
    id: IDS.listings[9],
    farmerId: IDS.farmers[3],
    title: "Premium Cocoa Beans",
    description:
      "Carefully fermented and dried cocoa beans from a smallholder farm. Suitable for specialty and bulk buyers.",
    cropType: "COCOA",
    quantity: 55,
    quantityUnit: "SACK",
    pricePerUnit: 1850,
    location: "Bibiani, Western North",
    harvestDate: daysAgo(25),
    images: IMG.cocoa,
  },

  {
    id: IDS.listings[10],
    farmerId: IDS.farmers[4],
    title: "Fresh Roma Tomatoes",
    description:
      "Firm Roma tomatoes with attractive colour, ideal for restaurants, caterers and retail stores.",
    cropType: "TOMATO",
    quantity: 60,
    quantityUnit: "CRATE",
    pricePerUnit: 110,
    location: "Akim Oda, Eastern",
    harvestDate: daysAgo(2),
    images: IMG.tomatoes,
  },

  {
    id: IDS.listings[11],
    farmerId: IDS.farmers[4],
    title: "Premium White Maize",
    description:
      "Clean white maize with good grain quality. Available for immediate wholesale pickup.",
    cropType: "MAIZE",
    quantity: 90,
    quantityUnit: "BAG",
    pricePerUnit: 450,
    location: "Koforidua, Eastern",
    harvestDate: daysAgo(11),
    images: IMG.maize,
  },
];

const orderData = [
  {
    id: IDS.orders[0],
    listingId: IDS.listings[0],
    buyerId: IDS.buyers[0],
    farmerId: IDS.farmers[0],
    quantity: 10,
    pricePerUnitAtOrder: 95,
    status: "DELIVERED",
    latestLatitude: 7.5898,
    latestLongitude: -1.9365,
    locationReportedAt: daysAgo(2),
    createdAt: daysAgo(8),
  },

  {
    id: IDS.orders[1],
    listingId: IDS.listings[3],
    buyerId: IDS.buyers[1],
    farmerId: IDS.farmers[1],
    quantity: 12,
    pricePerUnitAtOrder: 42,
    status: "IN_TRANSIT",
    latestLatitude: 6.6885,
    latestLongitude: -1.6244,
    locationReportedAt: daysAgo(0.2),
    createdAt: daysAgo(3),
  },

  {
    id: IDS.orders[2],
    listingId: IDS.listings[6],
    buyerId: IDS.buyers[2],
    farmerId: IDS.farmers[2],
    quantity: 20,
    pricePerUnitAtOrder: 520,
    status: "CONFIRMED",
    latestLatitude: null,
    latestLongitude: null,
    locationReportedAt: null,
    createdAt: daysAgo(1),
  },

  {
    id: IDS.orders[3],
    listingId: IDS.listings[1],
    buyerId: IDS.buyers[0],
    farmerId: IDS.farmers[0],
    quantity: 8,
    pricePerUnitAtOrder: 430,
    status: "PENDING",
    latestLatitude: null,
    latestLongitude: null,
    locationReportedAt: null,
    createdAt: daysAgo(0.3),
  },

  {
    id: IDS.orders[4],
    listingId: IDS.listings[9],
    buyerId: IDS.buyers[1],
    farmerId: IDS.farmers[3],
    quantity: 5,
    pricePerUnitAtOrder: 1850,
    status: "DELIVERED",
    latestLatitude: 6.9389,
    latestLongitude: -2.4856,
    locationReportedAt: daysAgo(9),
    createdAt: daysAgo(16),
  },

  {
    id: IDS.orders[5],
    listingId: IDS.listings[10],
    buyerId: IDS.buyers[2],
    farmerId: IDS.farmers[4],
    quantity: 15,
    pricePerUnitAtOrder: 110,
    status: "CANCELLED",
    latestLatitude: null,
    latestLongitude: null,
    locationReportedAt: null,
    createdAt: daysAgo(12),
  },
];

async function upsertUser(user, role) {
  return prisma.user.upsert({
    where: {
      id: user.id,
    },

    update: {
      fullName: user.fullName,
      phone: user.phone,
      phoneVerifiedAt: daysAgo(30),
      accountStatus: "ACTIVE",
      profileImageUrl: user.profileImageUrl,
      lastLoginAt: user.lastLoginAt,
    },

    create: {
      id: user.id,
      fullName: user.fullName,
      role,
      phone: user.phone,
      phoneVerifiedAt: daysAgo(30),
      accountStatus: "ACTIVE",
      profileImageUrl: user.profileImageUrl,
      lastLoginAt: user.lastLoginAt,
      createdAt: daysAgo(45),
    },
  });
}

async function main() {
  console.log("🌱 Seeding HarvestLink demo data...");

  /*
   * Remove only the deterministic demo records.
   */

  await prisma.notification.deleteMany({
    where: {
      userId: {
        in: [...IDS.farmers, ...IDS.buyers],
      },
    },
  });

  await prisma.review.deleteMany({
    where: {
      orderId: {
        in: IDS.orders,
      },
    },
  });

  await prisma.savedListing.deleteMany({
    where: {
      buyerId: {
        in: IDS.buyers,
      },
    },
  });

  await prisma.listingInterest.deleteMany({
    where: {
      buyerId: {
        in: IDS.buyers,
      },
    },
  });

  await prisma.order.deleteMany({
    where: {
      id: {
        in: IDS.orders,
      },
    },
  });

  await prisma.listing.deleteMany({
    where: {
      id: {
        in: IDS.listings,
      },
    },
  });

  /*
   * USERS
   */

  for (const farmer of farmers) {
    await upsertUser(farmer, "FARMER");
  }

  for (const buyer of buyers) {
    await upsertUser(buyer, "BUYER");
  }

  /*
   * LISTINGS
   */

  for (let i = 0; i < listingData.length; i++) {
    const listing = listingData[i];

    await prisma.listing.create({
      data: {
        ...listing,
        status: "ACTIVE",
        createdAt: daysAgo(25 - i),
      },
    });
  }

  /*
   * ORDERS
   */

  for (const order of orderData) {
    await prisma.order.create({
      data: order,
    });
  }

  /*
   * REVIEWS
   */

  await prisma.review.createMany({
    data: [
      {
        orderId: IDS.orders[0],
        farmerId: IDS.farmers[0],
        buyerId: IDS.buyers[0],
        rating: 5,
        comment:
          "Excellent tomatoes. Fresh, well sorted and delivered exactly as agreed.",
        createdAt: daysAgo(1),
      },

      {
        orderId: IDS.orders[4],
        farmerId: IDS.farmers[3],
        buyerId: IDS.buyers[1],
        rating: 4,
        comment:
          "Good cocoa beans and professional communication. Will order again.",
        createdAt: daysAgo(5),
      },
    ],
  });

  /*
   * EXTRA COMPLETED ORDERS
   */

  await prisma.order.createMany({
    data: [
      {
        id: IDS.orders[6],
        listingId: IDS.listings[4],
        buyerId: IDS.buyers[0],
        farmerId: IDS.farmers[1],
        quantity: 6,
        pricePerUnitAtOrder: 175,
        status: "DELIVERED",
        createdAt: daysAgo(20),
      },

      {
        id: IDS.orders[7],
        listingId: IDS.listings[7],
        buyerId: IDS.buyers[1],
        farmerId: IDS.farmers[2],
        quantity: 30,
        pricePerUnitAtOrder: 18,
        status: "DELIVERED",
        createdAt: daysAgo(18),
      },

      {
        id: IDS.orders[8],
        listingId: IDS.listings[11],
        buyerId: IDS.buyers[2],
        farmerId: IDS.farmers[4],
        quantity: 10,
        pricePerUnitAtOrder: 450,
        status: "DELIVERED",
        createdAt: daysAgo(14),
      },
    ],
  });

  /*
   * MORE REVIEWS
   */

  await prisma.review.createMany({
    data: [
      {
        orderId: IDS.orders[6],
        farmerId: IDS.farmers[1],
        buyerId: IDS.buyers[0],
        rating: 5,
        comment:
          "Very fresh cassava and the quantity was accurate.",
        createdAt: daysAgo(12),
      },

      {
        orderId: IDS.orders[7],
        farmerId: IDS.farmers[2],
        buyerId: IDS.buyers[1],
        rating: 5,
        comment:
          "Great quality and quick coordination for pickup.",
        createdAt: daysAgo(10),
      },

      {
        orderId: IDS.orders[8],
        farmerId: IDS.farmers[4],
        buyerId: IDS.buyers[2],
        rating: 4,
        comment:
          "Good maize quality and neatly prepared for collection.",
        createdAt: daysAgo(8),
      },
    ],
  });

  /*
   * SAVED LISTINGS
   */

  await prisma.savedListing.createMany({
    data: [
      {
        buyerId: IDS.buyers[0],
        listingId: IDS.listings[1],
        createdAt: daysAgo(2),
      },

      {
        buyerId: IDS.buyers[0],
        listingId: IDS.listings[4],
        createdAt: daysAgo(4),
      },

      {
        buyerId: IDS.buyers[0],
        listingId: IDS.listings[9],
        createdAt: daysAgo(1),
      },

      {
        buyerId: IDS.buyers[1],
        listingId: IDS.listings[0],
        createdAt: daysAgo(3),
      },

      {
        buyerId: IDS.buyers[1],
        listingId: IDS.listings[6],
        createdAt: daysAgo(2),
      },

      {
        buyerId: IDS.buyers[2],
        listingId: IDS.listings[3],
        createdAt: daysAgo(1),
      },

      {
        buyerId: IDS.buyers[2],
        listingId: IDS.listings[10],
        createdAt: daysAgo(5),
      },
    ],
  });

  /*
   * LISTING INTERESTS
   */

  await prisma.listingInterest.createMany({
    data: [
      {
        buyerId: IDS.buyers[0],
        listingId: IDS.listings[1],
        createdAt: daysAgo(1),
      },

      {
        buyerId: IDS.buyers[1],
        listingId: IDS.listings[1],
        createdAt: daysAgo(2),
      },

      {
        buyerId: IDS.buyers[2],
        listingId: IDS.listings[1],
        createdAt: daysAgo(0.5),
      },

      {
        buyerId: IDS.buyers[1],
        listingId: IDS.listings[0],
        createdAt: daysAgo(3),
      },

      {
        buyerId: IDS.buyers[2],
        listingId: IDS.listings[4],
        createdAt: daysAgo(2),
      },

      {
        buyerId: IDS.buyers[0],
        listingId: IDS.listings[9],
        createdAt: daysAgo(1),
      },
    ],
  });

  /*
   * NOTIFICATIONS
   */

  await prisma.notification.createMany({
    data: [
      {
        userId: IDS.farmers[0],
        type: "LISTING_INTEREST",
        title: "New interest in your maize listing",
        body:
          "Ama Mensima is interested in your Premium Yellow Maize listing.",
        listingId: IDS.listings[1],
        isRead: false,
        createdAt: daysAgo(0.2),
      },

      {
        userId: IDS.farmers[0],
        type: "LISTING_INTEREST",
        title: "Another buyer is interested",
        body:
          "Daniel Ofori has expressed interest in your Premium Yellow Maize.",
        listingId: IDS.listings[1],
        isRead: true,
        createdAt: daysAgo(1.5),
      },

      {
        userId: IDS.farmers[0],
        type: "ORDER_PLACED",
        title: "New order received",
        body:
          "Ama Mensima placed an order for 8 bags of Premium Yellow Maize.",
        orderId: IDS.orders[3],
        listingId: IDS.listings[1],
        isRead: false,
        createdAt: daysAgo(0.3),
      },

      {
        userId: IDS.farmers[1],
        type: "ORDER_CONFIRMED",
        title: "Order confirmed",
        body:
          "Your plantain order has been confirmed and is being prepared.",
        orderId: IDS.orders[1],
        listingId: IDS.listings[3],
        isRead: false,
        createdAt: daysAgo(2.5),
      },

      {
        userId: IDS.farmers[3],
        type: "NEW_REVIEW",
        title: "You received a new review",
        body:
          "Daniel Ofori rated your cocoa beans 4 stars.",
        orderId: IDS.orders[4],
        isRead: true,
        createdAt: daysAgo(5),
      },

      {
        userId: IDS.buyers[0],
        type: "ORDER_DELIVERED",
        title: "Order delivered",
        body:
          "Your tomato order has been delivered successfully.",
        orderId: IDS.orders[0],
        listingId: IDS.listings[0],
        isRead: false,
        createdAt: daysAgo(1.8),
      },

      {
        userId: IDS.buyers[0],
        type: "ORDER_PLACED",
        title: "Order placed",
        body:
          "Your order for 8 bags of Premium Yellow Maize is pending farmer confirmation.",
        orderId: IDS.orders[3],
        listingId: IDS.listings[1],
        isRead: false,
        createdAt: daysAgo(0.3),
      },

      {
        userId: IDS.buyers[1],
        type: "ORDER_IN_TRANSIT",
        title: "Your order is on the way",
        body:
          "Your plantain order is currently in transit.",
        orderId: IDS.orders[1],
        listingId: IDS.listings[3],
        isRead: false,
        createdAt: daysAgo(0.1),
      },

      {
        userId: IDS.buyers[1],
        type: "NEW_REVIEW",
        title: "Thanks for your review",
        body:
          "Your cocoa order has been completed and reviewed.",
        orderId: IDS.orders[4],
        isRead: true,
        createdAt: daysAgo(5),
      },

      {
        userId: IDS.buyers[2],
        type: "ORDER_CONFIRMED",
        title: "Order confirmed",
        body:
          "Your local rice order has been confirmed by the farmer.",
        orderId: IDS.orders[2],
        listingId: IDS.listings[6],
        isRead: false,
        createdAt: daysAgo(0.9),
      },
    ],
  });

  console.log("✅ Demo data seeded successfully.");
  console.log("");
  console.log("Farmers:");

  for (const farmer of farmers) {
    console.log(
      `  ${farmer.fullName} — ${farmer.phone}`
    );
  }

  console.log("");
  console.log("Buyers:");

  for (const buyer of buyers) {
    console.log(
      `  ${buyer.fullName} — ${buyer.phone}`
    );
  }

  console.log("");
  console.log(
    "Created: 12 listings with 5 images each, 9 orders, 5 reviews, 7 saved listings, 6 interests and 10 notifications."
  );

  console.log("");
  console.log(
    "The first image in every listing.images array is the cover photo."
  );
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
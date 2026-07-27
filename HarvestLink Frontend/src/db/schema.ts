import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "harvests",
      columns: [
        { name: "crop_type", type: "string" },
        { name: "quantity_kg", type: "number" },
        { name: "price_per_kg", type: "number" },
        { name: "farm_location", type: "string" },
        { name: "available_from", type: "number" },
        { name: "synced", type: "boolean" },
        { name: "created_at", type: "number" },
      ],
    }),
    tableSchema({
      name: "matches",
      columns: [
        { name: "harvest_id", type: "string", isIndexed: true },
        { name: "buyer_name", type: "string" },
        { name: "distance_km", type: "number" },
        { name: "status", type: "string" }, // pending | matched | confirmed
        { name: "synced", type: "boolean" },
      ],
    }),
    tableSchema({
      name: "deliveries",
      columns: [
        { name: "match_id", type: "string", isIndexed: true },
        { name: "driver_name", type: "string" },
        { name: "vehicle", type: "string" },
        { name: "status", type: "string" },
        { name: "eta", type: "number" },
        { name: "synced", type: "boolean" },
      ],
    }),
  ],
});

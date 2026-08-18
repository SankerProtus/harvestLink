import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "listings",
      columns: [
        {
          name: "remote_id",
          type: "string",
          isOptional: true,
          isIndexed: true,
        },
        { name: "farmer_id", type: "string", isIndexed: true },
        { name: "title", type: "string" },
        { name: "description", type: "string", isOptional: true },
        { name: "crop_type", type: "string", isIndexed: true },
        { name: "quantity", type: "number" },
        { name: "quantity_unit", type: "string" },
        { name: "price_per_unit", type: "number" },
        { name: "location", type: "string" },
        { name: "images_json", type: "string" }, // JSON-encoded array of URL strings
        { name: "status", type: "string", isIndexed: true },
        { name: "remote_created_at", type: "string", isOptional: true }, // ISO string, mirrors backend createdAt
        { name: "remote_updated_at", type: "string", isOptional: true }, // ISO string, mirrors backend updatedAt
        // Sync metadata — not a business field.
        { name: "sync_status", type: "string", isIndexed: true }, // 'synced' | 'pending' | 'syncing' | 'failed'
        { name: "created_at", type: "number" }, // WatermelonDB standard local timestamp
        { name: "updated_at", type: "number" }, // WatermelonDB standard local timestamp
      ],
    }),
    tableSchema({
      name: "pending_sync_operations",
      columns: [
        { name: "operation_type", type: "string", isIndexed: true }, // e.g. 'CREATE_LISTING'
        { name: "entity_type", type: "string" }, // 'listing'
        { name: "entity_local_id", type: "string", isIndexed: true }, // local WatermelonDB id of the affected listings row
        { name: "payload_json", type: "string" }, // JSON-encoded request payload
        { name: "sync_status", type: "string", isIndexed: true }, // 'pending' | 'syncing' | 'failed'
        { name: "retry_count", type: "number" },
        { name: "last_error", type: "string", isOptional: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
  ],
});

import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import { schema } from "./schema.js";
import { migrations } from "./migrations.js";
import Listing from "./models/Listing.js";
import PendingSyncOperation from "./models/PendingSynuOperation.js";

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  jsi: true,
});

const database = new Database({
  adapter,
  modelClasses: [Listing, PendingSyncOperation],
});

export default database;

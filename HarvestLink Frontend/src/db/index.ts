import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import schema from "./schema";
import Harvest from "./models/Harvest";
import Match from "./models/Match";
import Delivery from "./models/Delivery";

// SQLiteAdapter requires native modules — it is not available in Expo Go.
// We gracefully fall back to null so the rest of the UI can still load
// and be previewed. A full dev build (expo run:android / expo run:ios)
// is needed for the database to work at runtime.
let database: Database | null = null;

try {
  const adapter = new SQLiteAdapter({
    schema,
    jsi: false, // jsi:true also requires a native build; keep false for safety
  });

  database = new Database({
    adapter,
    modelClasses: [Harvest, Match, Delivery],
  });
} catch (e) {
  console.warn(
    "[HarvestLink] WatermelonDB SQLite unavailable (Expo Go?). " +
      "Database features disabled. Use `expo run:android` or `expo run:ios` for a full build.",
    e
  );
}

export { database };

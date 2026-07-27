import { Model } from "@nozbe/watermelondb";
import { field, relation } from "@nozbe/watermelondb/decorators";

export default class Delivery extends Model {
  static table = "deliveries";
  static associations = {
    matches: { type: "belongs_to" as const, key: "match_id" },
  };

  @field("match_id") matchId!: string;
  @field("driver_name") driverName!: string;
  @field("vehicle") vehicle!: string;
  @field("status") status!: string;
  @field("eta") eta!: number;
  @field("synced") synced!: boolean;

  @relation("matches", "match_id") match: any;
}

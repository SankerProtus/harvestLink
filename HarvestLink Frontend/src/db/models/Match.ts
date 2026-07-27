import { Model } from "@nozbe/watermelondb";
import { field, relation } from "@nozbe/watermelondb/decorators";

export default class Match extends Model {
  static table = "matches";
  static associations = {
    harvests: { type: "belongs_to" as const, key: "harvest_id" },
  };

  @field("harvest_id") harvestId!: string;
  @field("buyer_name") buyerName!: string;
  @field("distance_km") distanceKm!: number;
  @field("status") status!: "pending" | "matched" | "confirmed";
  @field("synced") synced!: boolean;

  @relation("harvests", "harvest_id") harvest: any;
}

import { Model } from "@nozbe/watermelondb";
import { field, date, readonly } from "@nozbe/watermelondb/decorators";

export default class Harvest extends Model {
  static table = "harvests";

  @field("crop_type") cropType!: string;
  @field("quantity_kg") quantityKg!: number;
  @field("price_per_kg") pricePerKg!: number;
  @field("farm_location") farmLocation!: string;
  @field("available_from") availableFrom!: number;
  @field("synced") synced!: boolean;
  @readonly @date("created_at") createdAt!: number;
}

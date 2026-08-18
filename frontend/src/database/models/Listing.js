import { Model } from "@nozbe/watermelondb";
import { field, date } from "@nozbe/watermelondb/decorators";

export default class Listing extends Model {
  static table = "listings";

  @field("remote_id") remoteId;
  @field("farmer_id") farmerId;
  @field("title") title;
  @field("description") description;
  @field("crop_type") cropType;
  @field("quantity") quantity;
  @field("quantity_unit") quantityUnit;
  @field("price_per_unit") pricePerUnit;
  @field("location") location;
  @field("images_json") imagesJson;
  @field("status") status;
  @field("sync_status") syncStatus;
  @field("remote_created_at") remoteCreatedAt;
  @field("remote_updated_at") remoteUpdatedAt;

  @date("created_at") createdAt;
  @date("updated_at") updatedAt;
}

import { Model } from "@nozbe/watermelondb";
import { field, date } from "@nozbe/watermelondb/decorators";


export default class PendingSyncOperation extends Model {
  static table = "pending_sync_operations";

  @field("operation_type") operationType;
  @field("entity_type") entityType;
  @field("entity_local_id") entityLocalId;
  @field("payload_json") payloadJson;
  @field("sync_status") syncStatus;
  @field("retry_count") retryCount;
  @field("last_error") lastError;

  @date("created_at") createdAt;
  @date("updated_at") updatedAt;
}

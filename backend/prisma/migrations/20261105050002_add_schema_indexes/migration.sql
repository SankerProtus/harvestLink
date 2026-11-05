CREATE INDEX "audit_logs_createdAt_idx" ON "audit_logs"("createdAt");
CREATE INDEX "escrows_status_idx" ON "escrows"("status");
CREATE INDEX "idempotency_keys_userId_idx" ON "idempotency_keys"("userId");
CREATE INDEX "outbox_events_aggregateType_aggregateId_idx" ON "outbox_events"("aggregateType", "aggregateId");
CREATE INDEX "outbox_events_eventType_createdAt_idx" ON "outbox_events"("eventType", "createdAt");

import {
  parseOrThrow,
  createOrderSchema,
  orderIdParamSchema,
  updateOrderStatusSchema,
  reportLocationSchema,
  orderListQuerySchema,
} from "./deliveryTracking.validators.js";

import {
  createOrder as createOrderService,
  updateOrderStatus as updateOrderStatusService,
  reportLocation as reportLocationService,
  getOrder as getOrderService,
  listMyOrdersAsBuyer as listMyOrdersAsBuyerService,
  listMyOrdersAsFarmer as listMyOrdersAsFarmerService,
  getFarmerSummary as getFarmerSummaryService
} from "./deliveryTracking.service.js";

function sendSuccess(res, statusCode, data) {
  return res.status(statusCode).json({ success: true, data });
}

export async function createOrder(req, res, next) {
  try {
    const input = parseOrThrow(createOrderSchema, req.body);
    const result = await createOrderService({ ...input, buyerId: req.user.id });
    return sendSuccess(res, 201, result);
  } catch (err) {
    next(err);
  }
}

export async function updateOrderStatus(req, res, next) {
  try {
    const params = parseOrThrow(orderIdParamSchema, req.params);
    const input = parseOrThrow(updateOrderStatusSchema, req.body);
    const result = await updateOrderStatusService({
      orderId: params.orderId,
      userId: req.user.id,
      newStatus: input.status,
    });
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}

export async function reportLocation(req, res, next) {
  try {
    const params = parseOrThrow(orderIdParamSchema, req.params);
    const input = parseOrThrow(reportLocationSchema, req.body);
    const result = await reportLocationService({
      orderId: params.orderId,
      userId: req.user.id,
      latitude: input.latitude,
      longitude: input.longitude,
    });
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}

export async function getOrder(req, res, next) {
  try {
    const params = parseOrThrow(orderIdParamSchema, req.params);
    const result = await getOrderService({
      orderId: params.orderId,
      userId: req.user.id,
    });
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}

export async function listMyOrdersAsBuyer(req, res, next) {
  try {
    const filters = parseOrThrow(orderListQuerySchema, req.query);
    const result = await listMyOrdersAsBuyerService({
      buyerId: req.user.id,
      filters,
    });
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}

export async function listMyOrdersAsFarmer(req, res, next) {
  try {
    const filters = parseOrThrow(orderListQuerySchema, req.query);
    const result = await listMyOrdersAsFarmerService({
      farmerId: req.user.id,
      filters,
    });
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}

export async function getMyFarmerSummary(req, res, next) {
  try {
    const data = await getFarmerSummaryService({ farmerId: req.user.id });
    return sendSuccess(res, 200, data);
  } catch (err) {
    next(err);
  }
}
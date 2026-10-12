import { apiClient } from "./client.js";

export function createOrder(payload) {
  return apiClient.post("/delivery-tracking/orders", payload);
}

export function getOrder(orderId) {
  return apiClient.get(`/delivery-tracking/orders/${orderId}`);
}

export function updateOrderStatus(orderId, status) {
  return apiClient.patch(`/delivery-tracking/orders/${orderId}/status`, {
    status,
  });
}

export function reportLocation(orderId, { latitude, longitude }) {
  return apiClient.post(`/delivery-tracking/orders/${orderId}/location`, {
    latitude,
    longitude,
  });
}

export function getMyOrdersAsBuyer(filters) {
  return apiClient.get("/delivery-tracking/orders/mine/buyer", {
    params: filters,
  });
}

export function getMyOrdersAsFarmer(filters) {
  return apiClient.get("/delivery-tracking/orders/mine/farmer", {
    params: filters,
  });
}

export function getFarmerSummary() {
  return apiClient.get("/delivery-tracking/orders/mine/farmer/summary");
}

import { jest } from "@jest/globals";
// export function createMockReq(overrides = {}) {
//   return {
//     body: {},
//     params: {},
//     query: {},
//     user: undefined,
//     ip: "127.0.0.1",
//     ...overrides,
//   };
// }

export function mockRequest({
  body = {},
  params = {},
  query = {},
  user = null,
  ip = "127.0.0.1",
} = {}) {
  return { body, params, query, user, ip };
}

export function mockResponse() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
}

export function mockNext() {
  return jest.fn();
}

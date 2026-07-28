# HarvestLink Backend — API Testing Reference

# Authentication Module

## 1. Request OTP

**Endpoint:** `POST /api/auth/otp/request`
**Authentication Required:** Public
**Headers:**
```
Content-Type: application/json
```
**Path Parameters:** None
**Query Parameters:** None

**JSON Request Body:**
```json
{
  "phone": "+233241234567",
  "purpose": "REGISTRATION"
}
```
`purpose` must be one of: `REGISTRATION`, `LOGIN`, `CHANGE_PHONE`.

**Example Successful Response (200):**
```json
{
  "success": true,
  "data": {
    "phone": "+233241234567",
    "purpose": "REGISTRATION",
    "expiresAt": "2026-07-22T10:15:00.000Z",
    "resendAvailableAt": "2026-07-22T10:11:00.000Z"
  }
}
```

**Common Error Responses:**
- `422` Validation Error (bad phone format/purpose)
- `409` `MARKETPLACE...` n/a — `AUTH_PHONE_ALREADY_REGISTERED` (only if `purpose: REGISTRATION` and phone already has an account)
- `429` `RATE_LIMIT_EXCEEDED` (hourly request cap exceeded)
- `429` `AUTH_OTP_REQUEST_COOLDOWN` (resend attempted before cooldown window elapses)
- `503` `AUTH_OTP_DELIVERY_FAILED` (SMS provider failure after retries)

**Validation Notes:**
```
phone:
- required
- accepts local format 0XXXXXXXXX or E.164 +233XXXXXXXXX
- normalized to +233XXXXXXXXX before validation
- must match /^\+233\d{9}$/ after normalization

purpose:
- required
- enum: REGISTRATION | LOGIN | CHANGE_PHONE
```

---

## 2. Verify OTP

**Endpoint:** `POST /api/auth/otp/verify`
**Authentication Required:** Public
**Headers:**
```
Content-Type: application/json
```
**Path Parameters:** None
**Query Parameters:** None

**JSON Request Body:**
```json
{
  "phone": "+233241234567",
  "code": "483921",
  "purpose": "REGISTRATION"
}
```

**Example Successful Response (200):**
```json
{
  "success": true,
  "data": {
    "verificationToken": "3f7a2b10-9c3e-4a1f-8b2e-1d4f6a9c0e11",
    "phone": "+233241234567",
    "purpose": "REGISTRATION",
    "expiresAt": "2026-07-22T10:20:00.000Z"
  }
}
```
`verificationToken` is required by `register`/`login`/`changePhoneNumber` as `otpVerificationToken`.

**Common Error Responses:**
- `422` Validation Error
- `400` `AUTH_INVALID_OTP` (no active OTP found, or code doesn't match)
- `400` `AUTH_OTP_EXPIRED`
- `429` `AUTH_OTP_MAX_ATTEMPTS_EXCEEDED`

**Validation Notes:**
```
phone: same rules as above
code:
- required
- exactly 6 digits (numeric only)
purpose: required, same enum as above
```

---

## 3. Resend OTP

**Endpoint:** `POST /api/auth/otp/resend`
**Authentication Required:** Public
**Headers:**
```
Content-Type: application/json
```
**Path Parameters:** None
**Query Parameters:** None

**JSON Request Body:**
```json
{
  "phone": "+233241234567",
  "purpose": "REGISTRATION"
}
```

**Example Successful Response (200):** identical shape to Request OTP's response.

**Common Error Responses:**
- `422` Validation Error
- `429` `AUTH_OTP_REQUEST_COOLDOWN`
- `429` `RATE_LIMIT_EXCEEDED` (max resends per hour)
- `503` `AUTH_OTP_DELIVERY_FAILED`

**Validation Notes:** identical to Request OTP.

---

## 4. Register (Phone/OTP)

**Endpoint:** `POST /api/auth/register`
**Authentication Required:** Public
**Headers:**
```
Content-Type: application/json
```
**Path Parameters:** None
**Query Parameters:** None

**JSON Request Body (minimal):**
```json
{
  "phone": "+233241234567",
  "fullName": "Kwame Mensah",
  "role": "FARMER",
  "otpVerificationToken": "3f7a2b10-9c3e-4a1f-8b2e-1d4f6a9c0e11"
}
```

**JSON Request Body (with device info):**
```json
{
  "phone": "+233241234567",
  "fullName": "Kwame Mensah",
  "role": "FARMER",
  "otpVerificationToken": "3f7a2b10-9c3e-4a1f-8b2e-1d4f6a9c0e11",
  "device": {
    "deviceId": "device-a1b2c3",
    "deviceName": "Kwame's Tecno Spark",
    "platform": "ANDROID",
    "pushToken": "fcm-token-example-abc123"
  }
}
```

**Example Successful Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "b3e1f9a0-1234-4c56-8d9e-abcdef123456",
      "fullName": "Kwame Mensah",
      "role": "FARMER"
    },
    "accessToken": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresAt": "2026-07-22T10:30:00.000Z"
    },
    "refreshToken": {
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresAt": "2026-08-21T10:15:00.000Z"
    },
    "isNewUser": true
  }
}
```

**Common Error Responses:**
- `422` Validation Error
- `401` `AUTH_INVALID_VERIFICATION_TOKEN`
- `401` `AUTH_VERIFICATION_TOKEN_EXPIRED`
- `409` `AUTH_PHONE_ALREADY_REGISTERED`

**Validation Notes:**
```
phone: required, same rules as above
fullName: required, 2–120 characters (trimmed)
role: required, enum: FARMER | BUYER  (ADMIN not selectable via public registration)
otpVerificationToken: required, UUID
device: optional
  device.deviceId: required if device present, 1–255 chars
  device.deviceName: optional, 1–255 chars
  device.platform: required if device present, enum: ANDROID | IOS | WEB
  device.pushToken: optional
Request is .strict() — no other fields accepted.
```

---

## 5. Login (Phone/OTP)

**Endpoint:** `POST /api/auth/login`
**Authentication Required:** Public
**Headers:**
```
Content-Type: application/json
```
**Path Parameters:** None
**Query Parameters:** None

**JSON Request Body (minimal):**
```json
{
  "phone": "+233241234567",
  "otpVerificationToken": "9a1c2e3f-4b5d-6a7c-8e9f-0a1b2c3d4e5f"
}
```

**JSON Request Body (with device info):**
```json
{
  "phone": "+233241234567",
  "otpVerificationToken": "9a1c2e3f-4b5d-6a7c-8e9f-0a1b2c3d4e5f",
  "device": {
    "deviceId": "device-a1b2c3",
    "platform": "ANDROID"
  }
}
```

**Example Successful Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "b3e1f9a0-1234-4c56-8d9e-abcdef123456",
      "fullName": "Kwame Mensah",
      "role": "FARMER"
    },
    "accessToken": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresAt": "2026-07-22T10:30:00.000Z"
    },
    "refreshToken": {
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresAt": "2026-08-21T10:15:00.000Z"
    },
    "isNewUser": false
  }
}
```

**Common Error Responses:**
- `422` Validation Error
- `401` `AUTH_INVALID_VERIFICATION_TOKEN`
- `401` `AUTH_VERIFICATION_TOKEN_EXPIRED`
- `404` `NOT_FOUND` (no account for this phone number)
- `403` `AUTH_ACCOUNT_SUSPENDED`

**Validation Notes:**
```
phone: required
otpVerificationToken: required, UUID
device: optional (same shape as Register)
Request is .strict().
```

---

## 6. Refresh Token

**Endpoint:** `POST /api/auth/refresh`
**Authentication Required:** Public (token itself is the credential)
**Headers:**
```
Content-Type: application/json
```
**Path Parameters:** None
**Query Parameters:** None

**JSON Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiM2UxZjlhMC0xMjM0LTRjNTYtOGQ5ZS1hYmNkZWYxMjM0NTYiLCJmYW1pbHkiOiI4YTJiM2M0ZC01ZTZmLTdhOGItOWMwZC0xZTJmM2E0YjVjNmQiLCJ0eXBlIjoicmVmcmVzaCJ9.signatureExample"
}
```

**Example Successful Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresAt": "2026-07-22T10:45:00.000Z"
    },
    "refreshToken": {
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresAt": "2026-08-21T10:30:00.000Z"
    }
  }
}
```
Note: no `user` object is included in the refresh response by design (kept minimal for a high-frequency endpoint).

**Common Error Responses:**
- `422` Validation Error
- `401` `AUTH_INVALID_REFRESH_TOKEN`
- `401` `AUTH_REFRESH_TOKEN_EXPIRED`
- `401` `AUTH_REFRESH_TOKEN_REUSE_DETECTED` (entire session family revoked — treat as a signal of token theft)
- `403` `AUTH_ACCOUNT_SUSPENDED`

**Validation Notes:**
```
refreshToken:
- required
- minimum 20 characters
```

---

## 7. Logout (Single Device)

**Endpoint:** `POST /api/auth/logout`
**Authentication Required:** Bearer Token Required
**Headers:**
```
Content-Type: application/json
Authorization: Bearer <access_token>
```
**Path Parameters:** None
**Query Parameters:** None

**JSON Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Example Successful Response (200):**
```json
{
  "success": true,
  "data": {
    "success": true
  }
}
```

**Common Error Responses:**
- `422` Validation Error
- `401` Missing/invalid/expired access token (from `authMiddleware`)
- `401` `AUTH_INVALID_REFRESH_TOKEN`

**Validation Notes:**
```
refreshToken: required, minimum 20 characters
allDevices: optional boolean, defaults to false
```

---

## 8. Logout (All Devices)

**Endpoint:** `POST /api/auth/logout`
**Authentication Required:** Bearer Token Required
**Headers:**
```
Content-Type: application/json
Authorization: Bearer <access_token>
```
**Path Parameters:** None
**Query Parameters:** None

**JSON Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "allDevices": true
}
```

**Example Successful Response (200):** identical shape to single-device logout.

**Common Error Responses:** identical to single-device logout.

**Validation Notes:** same schema as Logout — this is the same endpoint with `allDevices: true`, not a separate route.

---

## 9. List Sessions

**Endpoint:** `GET /api/auth/sessions`
**Authentication Required:** Bearer Token Required
**Headers:**
```
Authorization: Bearer <access_token>
```
**Path Parameters:** None
**Query Parameters:** None
**Request Body:** None

**Example Successful Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "8a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
      "device": {
        "id": "e5f6a7b8-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
        "deviceId": "device-a1b2c3",
        "deviceName": "Kwame's Tecno Spark",
        "platform": "ANDROID",
        "lastSeenAt": "2026-07-22T09:00:00.000Z"
      },
      "issuedAt": "2026-07-20T08:00:00.000Z",
      "expiresAt": "2026-08-19T08:00:00.000Z",
      "isRevoked": false
    }
  ]
}
```

**Common Error Responses:**
- `401` Missing/invalid/expired access token

**Validation Notes:** No request body or query parameters accepted.

---

## 10. Revoke Session

**Endpoint:** `DELETE /api/auth/sessions/:sessionId`
**Authentication Required:** Bearer Token Required
**Headers:**
```
Authorization: Bearer <access_token>
```
**Path Parameters:**
```json
{
  "sessionId": "8a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d"
}
```
**Query Parameters:** None
**Request Body:** None

**Example Successful Response:** `204 No Content` (empty body)

**Common Error Responses:**
- `422` Validation Error (malformed `sessionId`, not a UUID)
- `401` Missing/invalid/expired access token
- `404` `NOT_FOUND` (session doesn't belong to the caller, or doesn't exist)

**Validation Notes:**
```
sessionId (path param):
- required
- must be a valid UUID
```

---

## 11. Google Sign-In

**Endpoint:** `POST /api/auth/google/signin`
**Authentication Required:** Public
**Headers:**
```
Content-Type: application/json
```
**Path Parameters:** None
**Query Parameters:** None

**JSON Request Body (existing account — role not needed):**
```json
{
  "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjEyMzQ1NiJ9.googleIdTokenPayloadExample.signature"
}
```

**JSON Request Body (first-time sign-in — role required):**
```json
{
  "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjEyMzQ1NiJ9.googleIdTokenPayloadExample.signature",
  "role": "BUYER",
  "device": {
    "deviceId": "device-x9y8z7",
    "platform": "IOS"
  }
}
```

**Example Successful Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "c4f2a1b0-5678-4d9e-a0b1-cdef01234567",
      "fullName": "Ama Boateng",
      "role": "BUYER"
    },
    "accessToken": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresAt": "2026-07-22T10:30:00.000Z"
    },
    "refreshToken": {
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresAt": "2026-08-21T10:15:00.000Z"
    },
    "isNewUser": true
  }
}
```

**Common Error Responses:**
- `422` Validation Error
- `400` `BAD_REQUEST` (role missing on first-time sign-in)
- `404` `NOT_FOUND` (linked account missing — edge case)
- `403` `AUTH_ACCOUNT_SUSPENDED`
- `401` Google token verification failure (invalid/expired Google ID token — surfaces as an unhandled Google-library error unless separately caught; see architectural notes from prior review)

**Validation Notes:**
```
idToken: required, minimum 20 characters
role: optional (required in practice for first-time sign-in), enum: FARMER | BUYER
device: optional, same shape as Register/Login
```

---

## 12. Link Google Account

**Endpoint:** `POST /api/auth/google/link`
**Authentication Required:** Bearer Token Required
**Headers:**
```
Content-Type: application/json
Authorization: Bearer <access_token>
```
**Path Parameters:** None
**Query Parameters:** None

**JSON Request Body:**
```json
{
  "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjEyMzQ1NiJ9.googleIdTokenPayloadExample.signature"
}
```

**Example Successful Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "d1e2f3a4-b5c6-7d8e-9f0a-1b2c3d4e5f6a",
    "provider": "GOOGLE",
    "email": "ama.boateng@gmail.com",
    "linkedAt": "2026-07-22T10:00:00.000Z"
  }
}
```

**Common Error Responses:**
- `422` Validation Error
- `401` Missing/invalid/expired access token
- `409` `AUTH_GOOGLE_ACCOUNT_ALREADY_LINKED`

**Validation Notes:**
```
idToken: required, minimum 20 characters
```

---

## 13. Change Phone Number

**Endpoint:** `PATCH /api/auth/phone`
**Authentication Required:** Bearer Token Required
**Headers:**
```
Content-Type: application/json
Authorization: Bearer <access_token>
```
**Path Parameters:** None
**Query Parameters:** None

**JSON Request Body:**
```json
{
  "newPhone": "+233551234567",
  "otpVerificationToken": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d"
}
```
Note: the OTP verification token here must come from a `verifyOtp` call made with `purpose: CHANGE_PHONE` against `newPhone`.

**Example Successful Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "b3e1f9a0-1234-4c56-8d9e-abcdef123456",
    "fullName": "Kwame Mensah",
    "role": "FARMER",
    "phone": "+233551234567",
    "phoneVerifiedAt": "2026-07-22T10:05:00.000Z",
    "accountStatus": "ACTIVE",
    "lastLoginAt": "2026-07-22T09:00:00.000Z",
    "createdAt": "2026-06-01T12:00:00.000Z"
  }
}
```

**Common Error Responses:**
- `422` Validation Error
- `401` Missing/invalid/expired access token
- `401` `AUTH_INVALID_VERIFICATION_TOKEN`
- `401` `AUTH_VERIFICATION_TOKEN_EXPIRED`
- `409` `AUTH_PHONE_ALREADY_REGISTERED`

**Validation Notes:**
```
newPhone: required, same phone rules as elsewhere
otpVerificationToken: required, UUID
```

---

## 14. Get Profile

**Endpoint:** `GET /api/auth/profile`
**Authentication Required:** Bearer Token Required
**Headers:**
```
Authorization: Bearer <access_token>
```
**Path Parameters:** None
**Query Parameters:** None
**Request Body:** None

**Example Successful Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "b3e1f9a0-1234-4c56-8d9e-abcdef123456",
    "fullName": "Kwame Mensah",
    "role": "FARMER",
    "phone": "+233241234567",
    "phoneVerifiedAt": "2026-06-01T12:05:00.000Z",
    "accountStatus": "ACTIVE",
    "lastLoginAt": "2026-07-22T09:00:00.000Z",
    "createdAt": "2026-06-01T12:00:00.000Z"
  }
}
```

**Common Error Responses:**
- `401` Missing/invalid/expired access token
- `404` `NOT_FOUND` (edge case — user deleted after token issued)

**Validation Notes:** No request body or query parameters accepted.

---

# Marketplace Module

## 1. Search / Browse Listings

**Endpoint:** `GET /api/marketplace/listings`
**Authentication Required:** Public
**Headers:** None required
**Path Parameters:** None

**Query Parameters:**
```
cropType    optional  enum: TOMATO | MAIZE | CASSAVA | PLANTAIN | YAM | PEPPER | ONION | RICE | GROUNDNUT | COCOA
quantityUnit optional enum: KILOGRAM | BAG | CRATE | SACK | BUNCH | PIECE | BASKET
location    optional  string, max 120 chars
minPrice    optional  positive number
maxPrice    optional  positive number (must be >= minPrice if both provided)
page        optional  integer >= 1, default 1
limit       optional  integer 1–100, default 20
```
**Request Body:** None

**Minimal request:**
```
GET /api/marketplace/listings
```

**Fully populated request:**
```
GET /api/marketplace/listings?cropType=TOMATO&quantityUnit=CRATE&location=Techiman&minPrice=50&maxPrice=500&page=1&limit=10
```

**Pagination example:**
```
GET /api/marketplace/listings?page=2&limit=20
```

**Filter example (crop + location only):**
```
GET /api/marketplace/listings?cropType=MAIZE&location=Sunyani
```

**Example Successful Response (200):**
```json
{
  "success": true,
  "data": {
    "results": [
      {
        "id": "f1e2d3c4-b5a6-4978-8c9d-0e1f2a3b4c5d",
        "farmerId": "b3e1f9a0-1234-4c56-8d9e-abcdef123456",
        "title": "Fresh Tomatoes - Farm Gate",
        "description": "Ripe Roma tomatoes, harvested this week.",
        "cropType": "TOMATO",
        "quantity": 25,
        "quantityUnit": "CRATE",
        "pricePerUnit": 120.5,
        "location": "Techiman, Bono East",
        "images": ["https://cdn.example.com/listings/tomato1.jpg"],
        "status": "ACTIVE",
        "createdAt": "2026-07-20T08:00:00.000Z",
        "updatedAt": "2026-07-20T08:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPages": 1
    }
  }
}
```

**Common Error Responses:**
- `422` Validation Error (bad enum value, maxPrice < minPrice, limit out of range)

**Validation Notes:**
```
cropType, quantityUnit: must match the fixed enum exactly (case-sensitive)
location: max 120 characters
minPrice / maxPrice: must be > 0; maxPrice must be >= minPrice
page: integer, minimum 1
limit: integer, 1–100
Request query object is .strict() — unknown query keys are rejected.
```

---

## 2. Get Single Listing

**Endpoint:** `GET /api/marketplace/listings/:listingId`
**Authentication Required:** Public
**Headers:** None required
**Path Parameters:**
```json
{
  "listingId": "f1e2d3c4-b5a6-4978-8c9d-0e1f2a3b4c5d"
}
```
**Query Parameters:** None
**Request Body:** None

**Example Successful Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "f1e2d3c4-b5a6-4978-8c9d-0e1f2a3b4c5d",
    "farmerId": "b3e1f9a0-1234-4c56-8d9e-abcdef123456",
    "title": "Fresh Tomatoes - Farm Gate",
    "description": "Ripe Roma tomatoes, harvested this week.",
    "cropType": "TOMATO",
    "quantity": 25,
    "quantityUnit": "CRATE",
    "pricePerUnit": 120.5,
    "location": "Techiman, Bono East",
    "images": ["https://cdn.example.com/listings/tomato1.jpg"],
    "status": "ACTIVE",
    "createdAt": "2026-07-20T08:00:00.000Z",
    "updatedAt": "2026-07-20T08:00:00.000Z"
  }
}
```

**Common Error Responses:**
- `422` Validation Error (malformed `listingId`)
- `404` `MARKETPLACE_LISTING_NOT_FOUND`

**Validation Notes:**
```
listingId (path param): required, must be a valid UUID
```

---

## 3. Get My Listings

**Endpoint:** `GET /api/marketplace/listings/mine`
**Authentication Required:** Bearer Token Required
**Headers:**
```
Authorization: Bearer <access_token>
```
**Path Parameters:** None
**Query Parameters:** None
**Request Body:** None

**Example Successful Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "f1e2d3c4-b5a6-4978-8c9d-0e1f2a3b4c5d",
      "farmerId": "b3e1f9a0-1234-4c56-8d9e-abcdef123456",
      "title": "Fresh Tomatoes - Farm Gate",
      "description": "Ripe Roma tomatoes, harvested this week.",
      "cropType": "TOMATO",
      "quantity": 25,
      "quantityUnit": "CRATE",
      "pricePerUnit": 120.5,
      "location": "Techiman, Bono East",
      "images": ["https://cdn.example.com/listings/tomato1.jpg"],
      "status": "ACTIVE",
      "createdAt": "2026-07-20T08:00:00.000Z",
      "updatedAt": "2026-07-20T08:00:00.000Z"
    }
  ]
}
```

**Common Error Responses:**
- `401` Missing/invalid/expired access token

**Validation Notes:** No request body or query parameters accepted. Route is registered before `:listingId` so `/mine` is never captured as a listing ID.

---

## 4. Create Listing

**Endpoint:** `POST /api/marketplace/listings`
**Authentication Required:** Bearer Token Required
**Headers:**
```
Content-Type: application/json
Authorization: Bearer <access_token>
```
**Path Parameters:** None
**Query Parameters:** None

**JSON Request Body (minimal — required fields only):**
```json
{
  "title": "Fresh Tomatoes - Farm Gate",
  "cropType": "TOMATO",
  "quantity": 25,
  "quantityUnit": "CRATE",
  "pricePerUnit": 120.50,
  "location": "Techiman, Bono East"
}
```

**JSON Request Body (fully populated):**
```json
{
  "title": "Fresh Tomatoes - Farm Gate",
  "description": "Ripe Roma tomatoes, harvested this week. Available for pickup or delivery within Techiman.",
  "cropType": "TOMATO",
  "quantity": 25,
  "quantityUnit": "CRATE",
  "pricePerUnit": 120.50,
  "location": "Techiman, Bono East",
  "images": [
    "https://cdn.example.com/listings/tomato1.jpg",
    "https://cdn.example.com/listings/tomato2.jpg"
  ]
}
```
`farmerId` is **never** sent in the request body — it is taken from the authenticated user's token.

**Example Successful Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "f1e2d3c4-b5a6-4978-8c9d-0e1f2a3b4c5d",
    "farmerId": "b3e1f9a0-1234-4c56-8d9e-abcdef123456",
    "title": "Fresh Tomatoes - Farm Gate",
    "description": "Ripe Roma tomatoes, harvested this week. Available for pickup or delivery within Techiman.",
    "cropType": "TOMATO",
    "quantity": 25,
    "quantityUnit": "CRATE",
    "pricePerUnit": 120.5,
    "location": "Techiman, Bono East",
    "images": [
      "https://cdn.example.com/listings/tomato1.jpg",
      "https://cdn.example.com/listings/tomato2.jpg"
    ],
    "status": "ACTIVE",
    "createdAt": "2026-07-22T09:00:00.000Z",
    "updatedAt": "2026-07-22T09:00:00.000Z"
  }
}
```

**Common Error Responses:**
- `422` Validation Error
- `401` Missing/invalid/expired access token
- `409` `MARKETPLACE_DUPLICATE_LISTING` (same farmer + same title already has an ACTIVE listing)

**Validation Notes:**
```
title: required, trimmed, 3–100 characters
description: optional, max 1000 characters
cropType: required, fixed enum (see list above)
quantity: required, number > 0, max 100000
quantityUnit: required, fixed enum (see list above)
pricePerUnit: required, number > 0, max 1,000,000
location: required, trimmed, max 120 characters
images: optional array of valid URLs, maximum 5
Request body is .strict() — farmerId, status, or any other field is rejected if sent.
```

---

## 5. Update Listing

**Endpoint:** `PATCH /api/marketplace/listings/:listingId`
**Authentication Required:** Bearer Token Required
**Headers:**
```
Content-Type: application/json
Authorization: Bearer <access_token>
```
**Path Parameters:**
```json
{
  "listingId": "f1e2d3c4-b5a6-4978-8c9d-0e1f2a3b4c5d"
}
```
**Query Parameters:** None

**JSON Request Body (partial update example):**
```json
{
  "pricePerUnit": 110.00,
  "description": "Price reduced — limited stock remaining."
}
```

**Example Successful Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "f1e2d3c4-b5a6-4978-8c9d-0e1f2a3b4c5d",
    "farmerId": "b3e1f9a0-1234-4c56-8d9e-abcdef123456",
    "title": "Fresh Tomatoes - Farm Gate",
    "description": "Price reduced — limited stock remaining.",
    "cropType": "TOMATO",
    "quantity": 25,
    "quantityUnit": "CRATE",
    "pricePerUnit": 110,
    "location": "Techiman, Bono East",
    "images": ["https://cdn.example.com/listings/tomato1.jpg"],
    "status": "ACTIVE",
    "createdAt": "2026-07-20T08:00:00.000Z",
    "updatedAt": "2026-07-22T09:30:00.000Z"
  }
}
```

**Common Error Responses:**
- `422` Validation Error
- `401` Missing/invalid/expired access token
- `404` `MARKETPLACE_LISTING_NOT_FOUND`
- `403` `MARKETPLACE_UNAUTHORIZED_LISTING_ACCESS` (caller is not the listing owner)
- `409` `MARKETPLACE_LISTING_ALREADY_SOLD` (listing status is SOLD)
- `409` `MARKETPLACE_LISTING_UNAVAILABLE` (listing status is REMOVED)

**Validation Notes:**
```
All fields optional; same per-field rules as Create Listing when present.
Request body is .strict().
If "quantity" is set to exactly 0 in this request, the listing automatically
transitions to status SOLD as part of this same call.
```

---

## 6. Update Listing Quantity

**Endpoint:** `PATCH /api/marketplace/listings/:listingId/quantity`
**Authentication Required:** Bearer Token Required
**Headers:**
```
Content-Type: application/json
Authorization: Bearer <access_token>
```
**Path Parameters:**
```json
{
  "listingId": "f1e2d3c4-b5a6-4978-8c9d-0e1f2a3b4c5d"
}
```
**Query Parameters:** None

**JSON Request Body:**
```json
{
  "quantity": 10
}
```

**Example Successful Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "f1e2d3c4-b5a6-4978-8c9d-0e1f2a3b4c5d",
    "farmerId": "b3e1f9a0-1234-4c56-8d9e-abcdef123456",
    "title": "Fresh Tomatoes - Farm Gate",
    "description": "Ripe Roma tomatoes, harvested this week.",
    "cropType": "TOMATO",
    "quantity": 10,
    "quantityUnit": "CRATE",
    "pricePerUnit": 120.5,
    "location": "Techiman, Bono East",
    "images": ["https://cdn.example.com/listings/tomato1.jpg"],
    "status": "ACTIVE",
    "createdAt": "2026-07-20T08:00:00.000Z",
    "updatedAt": "2026-07-22T09:45:00.000Z"
  }
}
```

**Common Error Responses:**
- `422` Validation Error
- `401` Missing/invalid/expired access token
- `404` `MARKETPLACE_LISTING_NOT_FOUND`
- `403` `MARKETPLACE_UNAUTHORIZED_LISTING_ACCESS`
- `409` `MARKETPLACE_LISTING_ALREADY_SOLD`
- `409` `MARKETPLACE_LISTING_UNAVAILABLE`

**Validation Notes:**
```
quantity: required, number > 0, max 100000
```
> **Implementation caveat worth knowing before testing:** the business rule (as designed in `marketplace.service.js`) supports setting quantity to exactly `0` to automatically mark a listing `SOLD`. However, `updateListingQuantitySchema`'s current Zod rule requires the value to be strictly greater than zero (`.positive()`), which means **a request body of `{ "quantity": 0 }` will currently be rejected at validation with a 422 error before it ever reaches that business logic.** In practice, testers can still trigger the zero-quantity/SOLD path through the general **Update Listing** endpoint (`PATCH /listings/:listingId`), whose `quantitySchema` has this same `.positive()` constraint — so today, neither endpoint's validator actually permits submitting `0` directly. This is a genuine validator/business-rule inconsistency in the existing code, documented here for testing awareness only; no source file has been modified as part of this request.

---

## 7. Change Listing Status

**Endpoint:** `PATCH /api/marketplace/listings/:listingId/status`
**Authentication Required:** Bearer Token Required
**Headers:**
```
Content-Type: application/json
Authorization: Bearer <access_token>
```
**Path Parameters:**
```json
{
  "listingId": "f1e2d3c4-b5a6-4978-8c9d-0e1f2a3b4c5d"
}
```
**Query Parameters:** None

**JSON Request Body (remove a listing):**
```json
{
  "status": "REMOVED"
}
```

**JSON Request Body (mark as sold):**
```json
{
  "status": "SOLD"
}
```

**Example Successful Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "f1e2d3c4-b5a6-4978-8c9d-0e1f2a3b4c5d",
    "farmerId": "b3e1f9a0-1234-4c56-8d9e-abcdef123456",
    "title": "Fresh Tomatoes - Farm Gate",
    "description": "Ripe Roma tomatoes, harvested this week.",
    "cropType": "TOMATO",
    "quantity": 10,
    "quantityUnit": "CRATE",
    "pricePerUnit": 120.5,
    "location": "Techiman, Bono East",
    "images": ["https://cdn.example.com/listings/tomato1.jpg"],
    "status": "REMOVED",
    "createdAt": "2026-07-20T08:00:00.000Z",
    "updatedAt": "2026-07-22T10:00:00.000Z"
  }
}
```

**Common Error Responses:**
- `422` Validation Error (status not one of ACTIVE/SOLD/REMOVED)
- `401` Missing/invalid/expired access token
- `404` `MARKETPLACE_LISTING_NOT_FOUND`
- `403` `MARKETPLACE_UNAUTHORIZED_LISTING_ACCESS`
- `409` `MARKETPLACE_INVALID_STATUS_TRANSITION` (only ACTIVE→REMOVED and ACTIVE→SOLD are permitted; e.g. attempting ACTIVE→ACTIVE, SOLD→anything, or REMOVED→anything returns this error)

**Validation Notes:**
```
status: required, enum: ACTIVE | SOLD | REMOVED (schema accepts all three values,
        but the service layer only permits transitioning FROM "ACTIVE" TO
        "SOLD" or "REMOVED" — submitting "ACTIVE" itself, or any transition
        starting from a listing already SOLD or REMOVED, is rejected with
        409 MARKETPLACE_INVALID_STATUS_TRANSITION)
```

---

# Buyer Matching Module

> **Architecture note:** Buyer Matching is strictly read-only. It never writes to `Listing` and has no entity of its own — it queries Marketplace's existing `Listing` table directly (a data-level relationship, not a code-level import into Marketplace's repository or service). No domain-specific error classes exist for this module; its only failure mode is request validation.

## 1. Search Matches

**Endpoint:** `GET /api/buyer-matching/matches`
**Authentication Required:** Public
**Purpose:** Finds Marketplace listings matching a buyer's crop, quantity, and (optionally) location/price requirements. Deterministic rule-based filtering — no AI/ML, no similarity scoring, no numeric match score exposed.
**Headers:** None required
**Path Parameters:** None

**Query Parameters:**
```
cropType               required  enum: TOMATO | MAIZE | CASSAVA | PLANTAIN | YAM | PEPPER | ONION | RICE | GROUNDNUT | COCOA
requestedQuantity       required  number > 0
requestedQuantityUnit   required  enum: KILOGRAM | BAG | CRATE | SACK | BUNCH | PIECE | BASKET
location                optional  string, max 120 chars (substring match, case-insensitive)
maxPrice                optional  positive number
page                    optional  integer >= 1, default 1
limit                   optional  integer 1–100, default 20
```
**Request Body:** None

**Minimal request:**
```
GET /api/buyer-matching/matches?cropType=MAIZE&requestedQuantity=20&requestedQuantityUnit=BAG
```

**Fully populated request:**
```
GET /api/buyer-matching/matches?cropType=TOMATO&requestedQuantity=15&requestedQuantityUnit=&location=Techiman&maxPrice=150&page=1&limit=10
```

**Pagination example:**
```
GET /api/buyer-matching/matches?cropType=CASSAVA&requestedQuantity=5&requestedQuantityUnit=SACK&page=2&limit=20
```

**Filter example (with location, no price cap):**
```
GET /api/buyer-matching/matches?cropType=ONION&requestedQuantity=3&requestedQuantityUnit=BAG&location=Sunyani
```

**Example Successful Response (200):**
```json
{
  "success": true,
  "data": {
    "results": [
      {
        "id": "f1e2d3c4-b5a6-4978-8c9d-0e1f2a3b4c5d",
        "farmerId": "b3e1f9a0-1234-4c56-8d9e-abcdef123456",
        "title": "Fresh Tomatoes - Farm Gate",
        "description": "Ripe Roma tomatoes, harvested this week.",
        "cropType": "TOMATO",
        "quantity": 25,
        "quantityUnit": "CRATE",
        "pricePerUnit": 120.5,
        "location": "Techiman, Bono East",
        "images": ["https://cdn.example.com/listings/tomato1.jpg"],
        "status": "ACTIVE",
        "createdAt": "2026-07-20T08:00:00.000Z",
        "updatedAt": "2026-07-20T08:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPages": 1
    }
  }
}
```
Zero matches is a valid, non-error outcome — `results: []`, `pagination.total: 0`.

**Common Error Responses:**
- `422` Validation Error (missing required field, bad enum value, maxPrice/quantity not positive, limit out of range)

**Validation Notes:**
```
cropType: required, fixed enum (case-sensitive)
requestedQuantity: required, number, minimum > 0
requestedQuantityUnit: required, fixed enum — must exactly match a listing's
                        quantityUnit for that listing to be eligible; no
                        unit conversion is performed
location: optional, max 120 characters, substring match
maxPrice: optional, positive number
page: integer, minimum 1
limit: integer, 1–100
Query object is .strict() — unknown query keys are rejected.
```

**Business Rule Notes:**
```
- Only listings with status ACTIVE are ever eligible — SOLD and REMOVED
  listings never appear, with no override or exception.
- A listing is eligible only if its quantityUnit exactly matches
  requestedQuantityUnit AND its available quantity >= requestedQuantity.
- Results are ordered by: location match (when a location filter was
  supplied), then lowest price, then newest listing first. Crop type is
  enforced as a hard filter, not a ranking signal (non-matching crops
  are excluded, not ranked lower).
- No ETA, no distance/proximity calculation, no transaction-history
  input — deferred to a future version pending geographic coordinates
  and an Order/Transaction data model (now partially addressed by
  Delivery Tracking's Order entity, but not yet wired back into
  Buyer Matching's ranking logic).
```

---

# Delivery Tracking Module

> **Architecture notes:**
> - Delivery Tracking owns the `Order` entity and its lifecycle exclusively.
> - Marketplace remains the **sole owner of listing inventory**. Delivery Tracking never writes to `Listing` directly — order confirmation and cancellation invoke Marketplace's own service functions (`confirmListingReservation`, `releaseListingReservation`), which perform the actual quantity decrement/restoration and the `ACTIVE`⇄`SOLD` transition.
> - The farmer is the delivery "driver" — there is no separate Driver entity, role, or authentication flow. Every location update and forward status transition is performed by the farmer who owns the order.
> - GPS tracking is REST-polling only: the farmer POSTs their current coordinates; the buyer or farmer retrieves the latest reported location via GET. No websockets, no push notifications, no route optimization, no ETA field, no distance/geospatial calculation.
> - This cross-module workflow (Marketplace inventory update + Order status update) is **not** wrapped in a single distributed transaction — a known, documented MVP tradeoff, not a defect.

## 1. Create Order

**Endpoint:** `POST /api/delivery-tracking/orders`
**Authentication Required:** Bearer Token Required
**Purpose:** A buyer creates a new order against a Marketplace listing. This does **not** touch listing inventory — the order starts in `PENDING` and inventory is only reserved when the farmer confirms it (see Update Order Status below).
**Headers:**
```
Content-Type: application/json
Authorization: Bearer <access_token>
```
**Path Parameters:** None
**Query Parameters:** None

**JSON Request Body:**
```json
{
  "listingId": "f1e2d3c4-b5a6-4978-8c9d-0e1f2a3b4c5d",
  "quantity": 10
}
```
`buyerId` is never sent in the request body — it is taken from the authenticated user's token. `farmerId` and `pricePerUnitAtOrder` are derived server-side from the referenced listing at creation time (the price is snapshotted so a later listing price change never retroactively alters this order).

**Example Successful Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
    "listingId": "f1e2d3c4-b5a6-4978-8c9d-0e1f2a3b4c5d",
    "buyerId": "c4f2a1b0-5678-4d9e-a0b1-cdef01234567",
    "farmerId": "b3e1f9a0-1234-4c56-8d9e-abcdef123456",
    "quantity": 10,
    "pricePerUnitAtOrder": 120.5,
    "status": "PENDING",
    "latitude": null,
    "longitude": null,
    "locationReportedAt": null,
    "createdAt": "2026-07-22T11:00:00.000Z",
    "updatedAt": "2026-07-22T11:00:00.000Z"
  }
}
```

**Common Error Responses:**
- `422` Validation Error
- `401` Missing/invalid/expired access token
- `404` `MARKETPLACE_LISTING_NOT_FOUND`

**Validation Notes:**
```
listingId: required, UUID
quantity: required, number > 0, maximum bounded by ORDER_CONFIG.MAX_QUANTITY
          (mirrors Marketplace's LISTING_CONFIG.MAX_QUANTITY)
Request body is .strict().
```

**Business Rule Notes:**
```
- Listing status and available quantity are NOT checked at order creation
  time — only at confirmation (PENDING → CONFIRMED). A PENDING order can
  exist against a listing that later turns out to be SOLD, REMOVED, or
  short on stock; that surfaces as an error only when the farmer attempts
  to confirm it.
- No check currently prevents a farmer from ordering their own listing.
```

---

## 2. Get Order

**Endpoint:** `GET /api/delivery-tracking/orders/:orderId`
**Authentication Required:** Bearer Token Required
**Purpose:** Retrieves a single order. Accessible only to its buyer or farmer.
**Headers:**
```
Authorization: Bearer <access_token>
```
**Path Parameters:**
```json
{
  "orderId": "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d"
}
```
**Query Parameters:** None
**Request Body:** None

**Example Successful Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
    "listingId": "f1e2d3c4-b5a6-4978-8c9d-0e1f2a3b4c5d",
    "buyerId": "c4f2a1b0-5678-4d9e-a0b1-cdef01234567",
    "farmerId": "b3e1f9a0-1234-4c56-8d9e-abcdef123456",
    "quantity": 10,
    "pricePerUnitAtOrder": 120.5,
    "status": "IN_TRANSIT",
    "latitude": 7.5647,
    "longitude": -2.0117,
    "locationReportedAt": "2026-07-23T09:15:00.000Z",
    "createdAt": "2026-07-22T11:00:00.000Z",
    "updatedAt": "2026-07-23T09:15:00.000Z"
  }
}
```

**Common Error Responses:**
- `422` Validation Error (malformed `orderId`)
- `401` Missing/invalid/expired access token
- `404` `DELIVERY_ORDER_NOT_FOUND`
- `403` `DELIVERY_UNAUTHORIZED_ORDER_ACCESS` (caller is neither the buyer nor the farmer on this order)

**Validation Notes:**
```
orderId (path param): required, must be a valid UUID
```

---

## 3. Update Order Status

**Endpoint:** `PATCH /api/delivery-tracking/orders/:orderId/status`
**Authentication Required:** Bearer Token Required
**Purpose:** Advances or cancels an order's lifecycle. This is the endpoint that triggers Marketplace inventory changes.
**Headers:**
```
Content-Type: application/json
Authorization: Bearer <access_token>
```
**Path Parameters:**
```json
{
  "orderId": "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d"
}
```
**Query Parameters:** None

**JSON Request Body (farmer confirms an order):**
```json
{
  "status": "CONFIRMED"
}
```

**JSON Request Body (farmer begins delivery):**
```json
{
  "status": "IN_TRANSIT"
}
```

**JSON Request Body (farmer marks delivered):**
```json
{
  "status": "DELIVERED"
}
```

**JSON Request Body (buyer or farmer cancels):**
```json
{
  "status": "CANCELLED"
}
```

**Example Successful Response (200) — confirming an order:**
```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
    "listingId": "f1e2d3c4-b5a6-4978-8c9d-0e1f2a3b4c5d",
    "buyerId": "c4f2a1b0-5678-4d9e-a0b1-cdef01234567",
    "farmerId": "b3e1f9a0-1234-4c56-8d9e-abcdef123456",
    "quantity": 10,
    "pricePerUnitAtOrder": 120.5,
    "status": "CONFIRMED",
    "latitude": null,
    "longitude": null,
    "locationReportedAt": null,
    "createdAt": "2026-07-22T11:00:00.000Z",
    "updatedAt": "2026-07-22T14:00:00.000Z"
  }
}
```

**Common Error Responses:**
- `422` Validation Error (status not one of the five valid values)
- `401` Missing/invalid/expired access token
- `404` `DELIVERY_ORDER_NOT_FOUND`
- `403` `DELIVERY_UNAUTHORIZED_ORDER_ACCESS` (see actor rules below)
- `409` `DELIVERY_INVALID_STATUS_TRANSITION` (any transition not explicitly listed below)
- `409` `MARKETPLACE_INSUFFICIENT_LISTING_QUANTITY` (confirming an order, but the listing no longer has enough available quantity)
- `409` `MARKETPLACE_LISTING_ALREADY_SOLD` / `MARKETPLACE_LISTING_UNAVAILABLE` (confirming an order against a listing that is no longer ACTIVE)

**Validation Notes:**
```
status: required, enum: PENDING | CONFIRMED | IN_TRANSIT | DELIVERED | CANCELLED
        (schema accepts all five; the service layer restricts which
        transitions are actually legal — see below)
Request body is .strict().
```

**Business Rule Notes — allowed transitions only:**
```
PENDING    → CONFIRMED    farmer only   triggers Marketplace confirmListingReservation
                                         (verifies stock, decrements quantity,
                                         auto-transitions listing to SOLD if it
                                         reaches zero)
CONFIRMED  → IN_TRANSIT    farmer only   no inventory effect
IN_TRANSIT → DELIVERED     farmer only   no inventory effect
PENDING    → CANCELLED     buyer or farmer   no inventory effect (nothing was
                                              ever reserved)
CONFIRMED  → CANCELLED     buyer or farmer   triggers Marketplace
                                              releaseListingReservation
                                              (restores quantity, reactivates
                                              listing to ACTIVE if it was SOLD)
IN_TRANSIT → CANCELLED     buyer or farmer   same as above

Any other transition — including skipping a stage, PENDING→PENDING-style
self-transitions, or any transition attempted from DELIVERED or CANCELLED
(both terminal) — returns 409 DELIVERY_INVALID_STATUS_TRANSITION.
```

---

## 4. Report Delivery Location

**Endpoint:** `POST /api/delivery-tracking/orders/:orderId/location`
**Authentication Required:** Bearer Token Required
**Purpose:** The farmer reports their current GPS coordinates for an in-progress delivery. REST polling model — no push/websocket delivery.
**Headers:**
```
Content-Type: application/json
Authorization: Bearer <access_token>
```
**Path Parameters:**
```json
{
  "orderId": "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d"
}
```
**Query Parameters:** None

**JSON Request Body:**
```json
{
  "latitude": 7.5647,
  "longitude": -2.0117
}
```

**Example Successful Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
    "listingId": "f1e2d3c4-b5a6-4978-8c9d-0e1f2a3b4c5d",
    "buyerId": "c4f2a1b0-5678-4d9e-a0b1-cdef01234567",
    "farmerId": "b3e1f9a0-1234-4c56-8d9e-abcdef123456",
    "quantity": 10,
    "pricePerUnitAtOrder": 120.5,
    "status": "IN_TRANSIT",
    "latitude": 7.5647,
    "longitude": -2.0117,
    "locationReportedAt": "2026-07-23T09:15:00.000Z",
    "createdAt": "2026-07-22T11:00:00.000Z",
    "updatedAt": "2026-07-23T09:15:00.000Z"
  }
}
```

**Common Error Responses:**
- `422` Validation Error (latitude/longitude out of range or missing)
- `401` Missing/invalid/expired access token
- `404` `DELIVERY_ORDER_NOT_FOUND`
- `403` `DELIVERY_UNAUTHORIZED_ORDER_ACCESS` (caller is not the order's farmer — only the farmer may report location, not the buyer)
- `409` `DELIVERY_LOCATION_REPORTING_NOT_ALLOWED` (order is not currently `IN_TRANSIT`)

**Validation Notes:**
```
latitude: required, number, between GPS_CONFIG.LATITUDE_MIN (-90) and
          GPS_CONFIG.LATITUDE_MAX (90)
longitude: required, number, between GPS_CONFIG.LONGITUDE_MIN (-180) and
           GPS_CONFIG.LONGITUDE_MAX (180)
Request body is .strict().
```

**Business Rule Notes:**
```
- Only the order's farmer may report location — the buyer can read it
  (via Get Order or the list endpoints) but never write it.
- Location can only be reported while the order is IN_TRANSIT. Attempting
  to report location on a PENDING, CONFIRMED, DELIVERED, or CANCELLED
  order returns 409 DELIVERY_LOCATION_REPORTING_NOT_ALLOWED.
- Only the single latest coordinate pair is stored — there is no location
  history table. Each new report overwrites the previous one.
- No ETA is calculated or returned anywhere in this response.
```

---

## 5. List My Orders (as Buyer)

**Endpoint:** `GET /api/delivery-tracking/orders/mine/buyer`
**Authentication Required:** Bearer Token Required
**Purpose:** Lists the authenticated user's orders in the buyer role.
**Headers:**
```
Authorization: Bearer <access_token>
```
**Path Parameters:** None

**Query Parameters:**
```
status  optional  enum: PENDING | CONFIRMED | IN_TRANSIT | DELIVERED | CANCELLED
page    optional  integer >= 1, default 1
limit   optional  integer 1–100, default 20
```
**Request Body:** None

**Minimal request:**
```
GET /api/delivery-tracking/orders/mine/buyer
```

**Filtered + paginated request:**
```
GET /api/delivery-tracking/orders/mine/buyer?status=IN_TRANSIT&page=1&limit=10
```

**Example Successful Response (200):**
```json
{
  "success": true,
  "data": {
    "results": [
      {
        "id": "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
        "listingId": "f1e2d3c4-b5a6-4978-8c9d-0e1f2a3b4c5d",
        "buyerId": "c4f2a1b0-5678-4d9e-a0b1-cdef01234567",
        "farmerId": "b3e1f9a0-1234-4c56-8d9e-abcdef123456",
        "quantity": 10,
        "pricePerUnitAtOrder": 120.5,
        "status": "IN_TRANSIT",
        "latitude": 7.5647,
        "longitude": -2.0117,
        "locationReportedAt": "2026-07-23T09:15:00.000Z",
        "createdAt": "2026-07-22T11:00:00.000Z",
        "updatedAt": "2026-07-23T09:15:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPages": 1
    }
  }
}
```

**Common Error Responses:**
- `422` Validation Error
- `401` Missing/invalid/expired access token

**Validation Notes:**
```
status: optional, must be one of the five ORDER_STATUS values if provided
page: integer, minimum 1
limit: integer, 1–100
Query object is .strict().
Always scoped to the authenticated user as buyer — there is no way to
list another user's orders via this endpoint.
```

---

## 6. List My Orders (as Farmer)

**Endpoint:** `GET /api/delivery-tracking/orders/mine/farmer`
**Authentication Required:** Bearer Token Required
**Purpose:** Lists the authenticated user's orders in the farmer role.
**Headers:**
```
Authorization: Bearer <access_token>
```
**Path Parameters:** None

**Query Parameters:** identical shape to List My Orders (as Buyer):
```
status  optional  enum: PENDING | CONFIRMED | IN_TRANSIT | DELIVERED | CANCELLED
page    optional  integer >= 1, default 1
limit   optional  integer 1–100, default 20
```
**Request Body:** None

**Example request:**
```
GET /api/delivery-tracking/orders/mine/farmer?status=PENDING
```

**Example Successful Response (200):** identical shape to List My Orders (as Buyer), scoped to orders where the caller is the farmer rather than the buyer.

**Common Error Responses:**
- `422` Validation Error
- `401` Missing/invalid/expired access token

**Validation Notes:** identical to List My Orders (as Buyer). This is a separate endpoint (not a role toggle on the buyer endpoint) — a user who is both a buyer and a farmer must call both endpoints separately to see both sets of orders.

---

*End of reference. Generated directly from the implemented routes, controllers, validators, and mappers across all four frozen modules (Auth, Marketplace, Buyer Matching, Delivery Tracking) — no fields, endpoints, or business rules were inferred or invented.*

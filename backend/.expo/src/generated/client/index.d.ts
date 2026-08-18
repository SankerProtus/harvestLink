
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model OAuthAccount
 * 
 */
export type OAuthAccount = $Result.DefaultSelection<Prisma.$OAuthAccountPayload>
/**
 * Model Device
 * 
 */
export type Device = $Result.DefaultSelection<Prisma.$DevicePayload>
/**
 * Model RefreshToken
 * 
 */
export type RefreshToken = $Result.DefaultSelection<Prisma.$RefreshTokenPayload>
/**
 * Model OtpCode
 * 
 */
export type OtpCode = $Result.DefaultSelection<Prisma.$OtpCodePayload>
/**
 * Model OtpVerificationToken
 * 
 */
export type OtpVerificationToken = $Result.DefaultSelection<Prisma.$OtpVerificationTokenPayload>
/**
 * Model Listing
 * 
 */
export type Listing = $Result.DefaultSelection<Prisma.$ListingPayload>
/**
 * Model ListingInterest
 * 
 */
export type ListingInterest = $Result.DefaultSelection<Prisma.$ListingInterestPayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model Review
 * 
 */
export type Review = $Result.DefaultSelection<Prisma.$ReviewPayload>
/**
 * Model SavedListing
 * 
 */
export type SavedListing = $Result.DefaultSelection<Prisma.$SavedListingPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  FARMER: 'FARMER',
  BUYER: 'BUYER',
  ADMIN: 'ADMIN'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const AccountStatus: {
  PENDING_VERIFICATION: 'PENDING_VERIFICATION',
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  DELETED: 'DELETED'
};

export type AccountStatus = (typeof AccountStatus)[keyof typeof AccountStatus]


export const OtpPurpose: {
  REGISTRATION: 'REGISTRATION',
  LOGIN: 'LOGIN',
  CHANGE_PHONE: 'CHANGE_PHONE'
};

export type OtpPurpose = (typeof OtpPurpose)[keyof typeof OtpPurpose]


export const DevicePlatform: {
  ANDROID: 'ANDROID',
  IOS: 'IOS',
  WEB: 'WEB'
};

export type DevicePlatform = (typeof DevicePlatform)[keyof typeof DevicePlatform]


export const OAuthProvider: {
  GOOGLE: 'GOOGLE'
};

export type OAuthProvider = (typeof OAuthProvider)[keyof typeof OAuthProvider]


export const CropType: {
  TOMATO: 'TOMATO',
  MAIZE: 'MAIZE',
  CASSAVA: 'CASSAVA',
  PLANTAIN: 'PLANTAIN',
  YAM: 'YAM',
  PEPPER: 'PEPPER',
  ONION: 'ONION',
  RICE: 'RICE',
  GROUNDNUT: 'GROUNDNUT',
  COCOA: 'COCOA'
};

export type CropType = (typeof CropType)[keyof typeof CropType]


export const QuantityUnit: {
  KILOGRAM: 'KILOGRAM',
  BAG: 'BAG',
  CRATE: 'CRATE',
  SACK: 'SACK',
  BUNCH: 'BUNCH',
  PIECE: 'PIECE',
  BASKET: 'BASKET'
};

export type QuantityUnit = (typeof QuantityUnit)[keyof typeof QuantityUnit]


export const ListingStatus: {
  ACTIVE: 'ACTIVE',
  SOLD: 'SOLD',
  REMOVED: 'REMOVED'
};

export type ListingStatus = (typeof ListingStatus)[keyof typeof ListingStatus]


export const OrderStatus: {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  IN_TRANSIT: 'IN_TRANSIT',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED'
};

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]


export const NotificationType: {
  ORDER_PLACED: 'ORDER_PLACED',
  ORDER_CONFIRMED: 'ORDER_CONFIRMED',
  ORDER_IN_TRANSIT: 'ORDER_IN_TRANSIT',
  ORDER_DELIVERED: 'ORDER_DELIVERED',
  ORDER_CANCELLED: 'ORDER_CANCELLED',
  LISTING_INTEREST: 'LISTING_INTEREST',
  NEW_REVIEW: 'NEW_REVIEW'
};

export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type AccountStatus = $Enums.AccountStatus

export const AccountStatus: typeof $Enums.AccountStatus

export type OtpPurpose = $Enums.OtpPurpose

export const OtpPurpose: typeof $Enums.OtpPurpose

export type DevicePlatform = $Enums.DevicePlatform

export const DevicePlatform: typeof $Enums.DevicePlatform

export type OAuthProvider = $Enums.OAuthProvider

export const OAuthProvider: typeof $Enums.OAuthProvider

export type CropType = $Enums.CropType

export const CropType: typeof $Enums.CropType

export type QuantityUnit = $Enums.QuantityUnit

export const QuantityUnit: typeof $Enums.QuantityUnit

export type ListingStatus = $Enums.ListingStatus

export const ListingStatus: typeof $Enums.ListingStatus

export type OrderStatus = $Enums.OrderStatus

export const OrderStatus: typeof $Enums.OrderStatus

export type NotificationType = $Enums.NotificationType

export const NotificationType: typeof $Enums.NotificationType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.oAuthAccount`: Exposes CRUD operations for the **OAuthAccount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OAuthAccounts
    * const oAuthAccounts = await prisma.oAuthAccount.findMany()
    * ```
    */
  get oAuthAccount(): Prisma.OAuthAccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.device`: Exposes CRUD operations for the **Device** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Devices
    * const devices = await prisma.device.findMany()
    * ```
    */
  get device(): Prisma.DeviceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RefreshTokens
    * const refreshTokens = await prisma.refreshToken.findMany()
    * ```
    */
  get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.otpCode`: Exposes CRUD operations for the **OtpCode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OtpCodes
    * const otpCodes = await prisma.otpCode.findMany()
    * ```
    */
  get otpCode(): Prisma.OtpCodeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.otpVerificationToken`: Exposes CRUD operations for the **OtpVerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OtpVerificationTokens
    * const otpVerificationTokens = await prisma.otpVerificationToken.findMany()
    * ```
    */
  get otpVerificationToken(): Prisma.OtpVerificationTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.listing`: Exposes CRUD operations for the **Listing** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Listings
    * const listings = await prisma.listing.findMany()
    * ```
    */
  get listing(): Prisma.ListingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.listingInterest`: Exposes CRUD operations for the **ListingInterest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ListingInterests
    * const listingInterests = await prisma.listingInterest.findMany()
    * ```
    */
  get listingInterest(): Prisma.ListingInterestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.review`: Exposes CRUD operations for the **Review** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.review.findMany()
    * ```
    */
  get review(): Prisma.ReviewDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.savedListing`: Exposes CRUD operations for the **SavedListing** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SavedListings
    * const savedListings = await prisma.savedListing.findMany()
    * ```
    */
  get savedListing(): Prisma.SavedListingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    OAuthAccount: 'OAuthAccount',
    Device: 'Device',
    RefreshToken: 'RefreshToken',
    OtpCode: 'OtpCode',
    OtpVerificationToken: 'OtpVerificationToken',
    Listing: 'Listing',
    ListingInterest: 'ListingInterest',
    Order: 'Order',
    Review: 'Review',
    SavedListing: 'SavedListing',
    Notification: 'Notification'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "oAuthAccount" | "device" | "refreshToken" | "otpCode" | "otpVerificationToken" | "listing" | "listingInterest" | "order" | "review" | "savedListing" | "notification"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      OAuthAccount: {
        payload: Prisma.$OAuthAccountPayload<ExtArgs>
        fields: Prisma.OAuthAccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OAuthAccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OAuthAccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccountPayload>
          }
          findFirst: {
            args: Prisma.OAuthAccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OAuthAccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccountPayload>
          }
          findMany: {
            args: Prisma.OAuthAccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccountPayload>[]
          }
          create: {
            args: Prisma.OAuthAccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccountPayload>
          }
          createMany: {
            args: Prisma.OAuthAccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OAuthAccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccountPayload>[]
          }
          delete: {
            args: Prisma.OAuthAccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccountPayload>
          }
          update: {
            args: Prisma.OAuthAccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccountPayload>
          }
          deleteMany: {
            args: Prisma.OAuthAccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OAuthAccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OAuthAccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccountPayload>[]
          }
          upsert: {
            args: Prisma.OAuthAccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccountPayload>
          }
          aggregate: {
            args: Prisma.OAuthAccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOAuthAccount>
          }
          groupBy: {
            args: Prisma.OAuthAccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<OAuthAccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.OAuthAccountCountArgs<ExtArgs>
            result: $Utils.Optional<OAuthAccountCountAggregateOutputType> | number
          }
        }
      }
      Device: {
        payload: Prisma.$DevicePayload<ExtArgs>
        fields: Prisma.DeviceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeviceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeviceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          findFirst: {
            args: Prisma.DeviceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeviceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          findMany: {
            args: Prisma.DeviceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>[]
          }
          create: {
            args: Prisma.DeviceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          createMany: {
            args: Prisma.DeviceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DeviceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>[]
          }
          delete: {
            args: Prisma.DeviceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          update: {
            args: Prisma.DeviceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          deleteMany: {
            args: Prisma.DeviceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DeviceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DeviceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>[]
          }
          upsert: {
            args: Prisma.DeviceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          aggregate: {
            args: Prisma.DeviceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDevice>
          }
          groupBy: {
            args: Prisma.DeviceGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeviceGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeviceCountArgs<ExtArgs>
            result: $Utils.Optional<DeviceCountAggregateOutputType> | number
          }
        }
      }
      RefreshToken: {
        payload: Prisma.$RefreshTokenPayload<ExtArgs>
        fields: Prisma.RefreshTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findFirst: {
            args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findMany: {
            args: Prisma.RefreshTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          create: {
            args: Prisma.RefreshTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          createMany: {
            args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          delete: {
            args: Prisma.RefreshTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          update: {
            args: Prisma.RefreshTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          deleteMany: {
            args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RefreshTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          upsert: {
            args: Prisma.RefreshTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          aggregate: {
            args: Prisma.RefreshTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefreshToken>
          }
          groupBy: {
            args: Prisma.RefreshTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefreshTokenCountArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenCountAggregateOutputType> | number
          }
        }
      }
      OtpCode: {
        payload: Prisma.$OtpCodePayload<ExtArgs>
        fields: Prisma.OtpCodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OtpCodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OtpCodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>
          }
          findFirst: {
            args: Prisma.OtpCodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OtpCodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>
          }
          findMany: {
            args: Prisma.OtpCodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>[]
          }
          create: {
            args: Prisma.OtpCodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>
          }
          createMany: {
            args: Prisma.OtpCodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OtpCodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>[]
          }
          delete: {
            args: Prisma.OtpCodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>
          }
          update: {
            args: Prisma.OtpCodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>
          }
          deleteMany: {
            args: Prisma.OtpCodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OtpCodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OtpCodeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>[]
          }
          upsert: {
            args: Prisma.OtpCodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>
          }
          aggregate: {
            args: Prisma.OtpCodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOtpCode>
          }
          groupBy: {
            args: Prisma.OtpCodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<OtpCodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.OtpCodeCountArgs<ExtArgs>
            result: $Utils.Optional<OtpCodeCountAggregateOutputType> | number
          }
        }
      }
      OtpVerificationToken: {
        payload: Prisma.$OtpVerificationTokenPayload<ExtArgs>
        fields: Prisma.OtpVerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OtpVerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpVerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OtpVerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpVerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.OtpVerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpVerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OtpVerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpVerificationTokenPayload>
          }
          findMany: {
            args: Prisma.OtpVerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpVerificationTokenPayload>[]
          }
          create: {
            args: Prisma.OtpVerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpVerificationTokenPayload>
          }
          createMany: {
            args: Prisma.OtpVerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OtpVerificationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpVerificationTokenPayload>[]
          }
          delete: {
            args: Prisma.OtpVerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpVerificationTokenPayload>
          }
          update: {
            args: Prisma.OtpVerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpVerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.OtpVerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OtpVerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OtpVerificationTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpVerificationTokenPayload>[]
          }
          upsert: {
            args: Prisma.OtpVerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpVerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.OtpVerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOtpVerificationToken>
          }
          groupBy: {
            args: Prisma.OtpVerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<OtpVerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.OtpVerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<OtpVerificationTokenCountAggregateOutputType> | number
          }
        }
      }
      Listing: {
        payload: Prisma.$ListingPayload<ExtArgs>
        fields: Prisma.ListingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ListingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ListingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          findFirst: {
            args: Prisma.ListingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ListingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          findMany: {
            args: Prisma.ListingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>[]
          }
          create: {
            args: Prisma.ListingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          createMany: {
            args: Prisma.ListingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ListingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>[]
          }
          delete: {
            args: Prisma.ListingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          update: {
            args: Prisma.ListingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          deleteMany: {
            args: Prisma.ListingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ListingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ListingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>[]
          }
          upsert: {
            args: Prisma.ListingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          aggregate: {
            args: Prisma.ListingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateListing>
          }
          groupBy: {
            args: Prisma.ListingGroupByArgs<ExtArgs>
            result: $Utils.Optional<ListingGroupByOutputType>[]
          }
          count: {
            args: Prisma.ListingCountArgs<ExtArgs>
            result: $Utils.Optional<ListingCountAggregateOutputType> | number
          }
        }
      }
      ListingInterest: {
        payload: Prisma.$ListingInterestPayload<ExtArgs>
        fields: Prisma.ListingInterestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ListingInterestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingInterestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ListingInterestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingInterestPayload>
          }
          findFirst: {
            args: Prisma.ListingInterestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingInterestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ListingInterestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingInterestPayload>
          }
          findMany: {
            args: Prisma.ListingInterestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingInterestPayload>[]
          }
          create: {
            args: Prisma.ListingInterestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingInterestPayload>
          }
          createMany: {
            args: Prisma.ListingInterestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ListingInterestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingInterestPayload>[]
          }
          delete: {
            args: Prisma.ListingInterestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingInterestPayload>
          }
          update: {
            args: Prisma.ListingInterestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingInterestPayload>
          }
          deleteMany: {
            args: Prisma.ListingInterestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ListingInterestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ListingInterestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingInterestPayload>[]
          }
          upsert: {
            args: Prisma.ListingInterestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingInterestPayload>
          }
          aggregate: {
            args: Prisma.ListingInterestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateListingInterest>
          }
          groupBy: {
            args: Prisma.ListingInterestGroupByArgs<ExtArgs>
            result: $Utils.Optional<ListingInterestGroupByOutputType>[]
          }
          count: {
            args: Prisma.ListingInterestCountArgs<ExtArgs>
            result: $Utils.Optional<ListingInterestCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      Review: {
        payload: Prisma.$ReviewPayload<ExtArgs>
        fields: Prisma.ReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findFirst: {
            args: Prisma.ReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findMany: {
            args: Prisma.ReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          create: {
            args: Prisma.ReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          createMany: {
            args: Prisma.ReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          delete: {
            args: Prisma.ReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          update: {
            args: Prisma.ReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          deleteMany: {
            args: Prisma.ReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReviewUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          upsert: {
            args: Prisma.ReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          aggregate: {
            args: Prisma.ReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReview>
          }
          groupBy: {
            args: Prisma.ReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReviewCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewCountAggregateOutputType> | number
          }
        }
      }
      SavedListing: {
        payload: Prisma.$SavedListingPayload<ExtArgs>
        fields: Prisma.SavedListingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SavedListingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedListingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SavedListingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedListingPayload>
          }
          findFirst: {
            args: Prisma.SavedListingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedListingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SavedListingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedListingPayload>
          }
          findMany: {
            args: Prisma.SavedListingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedListingPayload>[]
          }
          create: {
            args: Prisma.SavedListingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedListingPayload>
          }
          createMany: {
            args: Prisma.SavedListingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SavedListingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedListingPayload>[]
          }
          delete: {
            args: Prisma.SavedListingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedListingPayload>
          }
          update: {
            args: Prisma.SavedListingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedListingPayload>
          }
          deleteMany: {
            args: Prisma.SavedListingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SavedListingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SavedListingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedListingPayload>[]
          }
          upsert: {
            args: Prisma.SavedListingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedListingPayload>
          }
          aggregate: {
            args: Prisma.SavedListingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSavedListing>
          }
          groupBy: {
            args: Prisma.SavedListingGroupByArgs<ExtArgs>
            result: $Utils.Optional<SavedListingGroupByOutputType>[]
          }
          count: {
            args: Prisma.SavedListingCountArgs<ExtArgs>
            result: $Utils.Optional<SavedListingCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    oAuthAccount?: OAuthAccountOmit
    device?: DeviceOmit
    refreshToken?: RefreshTokenOmit
    otpCode?: OtpCodeOmit
    otpVerificationToken?: OtpVerificationTokenOmit
    listing?: ListingOmit
    listingInterest?: ListingInterestOmit
    order?: OrderOmit
    review?: ReviewOmit
    savedListing?: SavedListingOmit
    notification?: NotificationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    listings: number
    buyerOrders: number
    farmerOrders: number
    expressedInterests: number
    refreshTokens: number
    devices: number
    oauthAccounts: number
    reviewsGiven: number
    reviewsReceived: number
    savedListings: number
    notifications: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listings?: boolean | UserCountOutputTypeCountListingsArgs
    buyerOrders?: boolean | UserCountOutputTypeCountBuyerOrdersArgs
    farmerOrders?: boolean | UserCountOutputTypeCountFarmerOrdersArgs
    expressedInterests?: boolean | UserCountOutputTypeCountExpressedInterestsArgs
    refreshTokens?: boolean | UserCountOutputTypeCountRefreshTokensArgs
    devices?: boolean | UserCountOutputTypeCountDevicesArgs
    oauthAccounts?: boolean | UserCountOutputTypeCountOauthAccountsArgs
    reviewsGiven?: boolean | UserCountOutputTypeCountReviewsGivenArgs
    reviewsReceived?: boolean | UserCountOutputTypeCountReviewsReceivedArgs
    savedListings?: boolean | UserCountOutputTypeCountSavedListingsArgs
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountListingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListingWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBuyerOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFarmerOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountExpressedInterestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListingInterestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRefreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDevicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeviceWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOauthAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthAccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReviewsGivenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReviewsReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSavedListingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SavedListingWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }


  /**
   * Count Type DeviceCountOutputType
   */

  export type DeviceCountOutputType = {
    refreshTokens: number
  }

  export type DeviceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    refreshTokens?: boolean | DeviceCountOutputTypeCountRefreshTokensArgs
  }

  // Custom InputTypes
  /**
   * DeviceCountOutputType without action
   */
  export type DeviceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceCountOutputType
     */
    select?: DeviceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DeviceCountOutputType without action
   */
  export type DeviceCountOutputTypeCountRefreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
  }


  /**
   * Count Type OtpCodeCountOutputType
   */

  export type OtpCodeCountOutputType = {
    verificationTokens: number
  }

  export type OtpCodeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    verificationTokens?: boolean | OtpCodeCountOutputTypeCountVerificationTokensArgs
  }

  // Custom InputTypes
  /**
   * OtpCodeCountOutputType without action
   */
  export type OtpCodeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCodeCountOutputType
     */
    select?: OtpCodeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OtpCodeCountOutputType without action
   */
  export type OtpCodeCountOutputTypeCountVerificationTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OtpVerificationTokenWhereInput
  }


  /**
   * Count Type ListingCountOutputType
   */

  export type ListingCountOutputType = {
    orders: number
    interests: number
    savedBy: number
  }

  export type ListingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | ListingCountOutputTypeCountOrdersArgs
    interests?: boolean | ListingCountOutputTypeCountInterestsArgs
    savedBy?: boolean | ListingCountOutputTypeCountSavedByArgs
  }

  // Custom InputTypes
  /**
   * ListingCountOutputType without action
   */
  export type ListingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingCountOutputType
     */
    select?: ListingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ListingCountOutputType without action
   */
  export type ListingCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }

  /**
   * ListingCountOutputType without action
   */
  export type ListingCountOutputTypeCountInterestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListingInterestWhereInput
  }

  /**
   * ListingCountOutputType without action
   */
  export type ListingCountOutputTypeCountSavedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SavedListingWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    fullName: string | null
    role: $Enums.UserRole | null
    phone: string | null
    phoneVerifiedAt: Date | null
    accountStatus: $Enums.AccountStatus | null
    profileImageUrl: string | null
    lastLoginAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    fullName: string | null
    role: $Enums.UserRole | null
    phone: string | null
    phoneVerifiedAt: Date | null
    accountStatus: $Enums.AccountStatus | null
    profileImageUrl: string | null
    lastLoginAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    fullName: number
    role: number
    phone: number
    phoneVerifiedAt: number
    accountStatus: number
    profileImageUrl: number
    lastLoginAt: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    fullName?: true
    role?: true
    phone?: true
    phoneVerifiedAt?: true
    accountStatus?: true
    profileImageUrl?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    fullName?: true
    role?: true
    phone?: true
    phoneVerifiedAt?: true
    accountStatus?: true
    profileImageUrl?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    fullName?: true
    role?: true
    phone?: true
    phoneVerifiedAt?: true
    accountStatus?: true
    profileImageUrl?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    fullName: string
    role: $Enums.UserRole
    phone: string | null
    phoneVerifiedAt: Date | null
    accountStatus: $Enums.AccountStatus
    profileImageUrl: string | null
    lastLoginAt: Date | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    role?: boolean
    phone?: boolean
    phoneVerifiedAt?: boolean
    accountStatus?: boolean
    profileImageUrl?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    listings?: boolean | User$listingsArgs<ExtArgs>
    buyerOrders?: boolean | User$buyerOrdersArgs<ExtArgs>
    farmerOrders?: boolean | User$farmerOrdersArgs<ExtArgs>
    expressedInterests?: boolean | User$expressedInterestsArgs<ExtArgs>
    refreshTokens?: boolean | User$refreshTokensArgs<ExtArgs>
    devices?: boolean | User$devicesArgs<ExtArgs>
    oauthAccounts?: boolean | User$oauthAccountsArgs<ExtArgs>
    reviewsGiven?: boolean | User$reviewsGivenArgs<ExtArgs>
    reviewsReceived?: boolean | User$reviewsReceivedArgs<ExtArgs>
    savedListings?: boolean | User$savedListingsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    role?: boolean
    phone?: boolean
    phoneVerifiedAt?: boolean
    accountStatus?: boolean
    profileImageUrl?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    role?: boolean
    phone?: boolean
    phoneVerifiedAt?: boolean
    accountStatus?: boolean
    profileImageUrl?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    fullName?: boolean
    role?: boolean
    phone?: boolean
    phoneVerifiedAt?: boolean
    accountStatus?: boolean
    profileImageUrl?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fullName" | "role" | "phone" | "phoneVerifiedAt" | "accountStatus" | "profileImageUrl" | "lastLoginAt" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listings?: boolean | User$listingsArgs<ExtArgs>
    buyerOrders?: boolean | User$buyerOrdersArgs<ExtArgs>
    farmerOrders?: boolean | User$farmerOrdersArgs<ExtArgs>
    expressedInterests?: boolean | User$expressedInterestsArgs<ExtArgs>
    refreshTokens?: boolean | User$refreshTokensArgs<ExtArgs>
    devices?: boolean | User$devicesArgs<ExtArgs>
    oauthAccounts?: boolean | User$oauthAccountsArgs<ExtArgs>
    reviewsGiven?: boolean | User$reviewsGivenArgs<ExtArgs>
    reviewsReceived?: boolean | User$reviewsReceivedArgs<ExtArgs>
    savedListings?: boolean | User$savedListingsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      listings: Prisma.$ListingPayload<ExtArgs>[]
      buyerOrders: Prisma.$OrderPayload<ExtArgs>[]
      farmerOrders: Prisma.$OrderPayload<ExtArgs>[]
      expressedInterests: Prisma.$ListingInterestPayload<ExtArgs>[]
      refreshTokens: Prisma.$RefreshTokenPayload<ExtArgs>[]
      devices: Prisma.$DevicePayload<ExtArgs>[]
      oauthAccounts: Prisma.$OAuthAccountPayload<ExtArgs>[]
      reviewsGiven: Prisma.$ReviewPayload<ExtArgs>[]
      reviewsReceived: Prisma.$ReviewPayload<ExtArgs>[]
      savedListings: Prisma.$SavedListingPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fullName: string
      role: $Enums.UserRole
      phone: string | null
      phoneVerifiedAt: Date | null
      accountStatus: $Enums.AccountStatus
      profileImageUrl: string | null
      lastLoginAt: Date | null
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    listings<T extends User$listingsArgs<ExtArgs> = {}>(args?: Subset<T, User$listingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    buyerOrders<T extends User$buyerOrdersArgs<ExtArgs> = {}>(args?: Subset<T, User$buyerOrdersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    farmerOrders<T extends User$farmerOrdersArgs<ExtArgs> = {}>(args?: Subset<T, User$farmerOrdersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    expressedInterests<T extends User$expressedInterestsArgs<ExtArgs> = {}>(args?: Subset<T, User$expressedInterestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingInterestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    refreshTokens<T extends User$refreshTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$refreshTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    devices<T extends User$devicesArgs<ExtArgs> = {}>(args?: Subset<T, User$devicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    oauthAccounts<T extends User$oauthAccountsArgs<ExtArgs> = {}>(args?: Subset<T, User$oauthAccountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviewsGiven<T extends User$reviewsGivenArgs<ExtArgs> = {}>(args?: Subset<T, User$reviewsGivenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviewsReceived<T extends User$reviewsReceivedArgs<ExtArgs> = {}>(args?: Subset<T, User$reviewsReceivedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    savedListings<T extends User$savedListingsArgs<ExtArgs> = {}>(args?: Subset<T, User$savedListingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly fullName: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly phone: FieldRef<"User", 'String'>
    readonly phoneVerifiedAt: FieldRef<"User", 'DateTime'>
    readonly accountStatus: FieldRef<"User", 'AccountStatus'>
    readonly profileImageUrl: FieldRef<"User", 'String'>
    readonly lastLoginAt: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly deletedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.listings
   */
  export type User$listingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    where?: ListingWhereInput
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    cursor?: ListingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * User.buyerOrders
   */
  export type User$buyerOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * User.farmerOrders
   */
  export type User$farmerOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * User.expressedInterests
   */
  export type User$expressedInterestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingInterest
     */
    select?: ListingInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListingInterest
     */
    omit?: ListingInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInterestInclude<ExtArgs> | null
    where?: ListingInterestWhereInput
    orderBy?: ListingInterestOrderByWithRelationInput | ListingInterestOrderByWithRelationInput[]
    cursor?: ListingInterestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ListingInterestScalarFieldEnum | ListingInterestScalarFieldEnum[]
  }

  /**
   * User.refreshTokens
   */
  export type User$refreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    cursor?: RefreshTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * User.devices
   */
  export type User$devicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    where?: DeviceWhereInput
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    cursor?: DeviceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[]
  }

  /**
   * User.oauthAccounts
   */
  export type User$oauthAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccount
     */
    select?: OAuthAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccount
     */
    omit?: OAuthAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccountInclude<ExtArgs> | null
    where?: OAuthAccountWhereInput
    orderBy?: OAuthAccountOrderByWithRelationInput | OAuthAccountOrderByWithRelationInput[]
    cursor?: OAuthAccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OAuthAccountScalarFieldEnum | OAuthAccountScalarFieldEnum[]
  }

  /**
   * User.reviewsGiven
   */
  export type User$reviewsGivenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * User.reviewsReceived
   */
  export type User$reviewsReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * User.savedListings
   */
  export type User$savedListingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedListing
     */
    select?: SavedListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedListing
     */
    omit?: SavedListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedListingInclude<ExtArgs> | null
    where?: SavedListingWhereInput
    orderBy?: SavedListingOrderByWithRelationInput | SavedListingOrderByWithRelationInput[]
    cursor?: SavedListingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SavedListingScalarFieldEnum | SavedListingScalarFieldEnum[]
  }

  /**
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model OAuthAccount
   */

  export type AggregateOAuthAccount = {
    _count: OAuthAccountCountAggregateOutputType | null
    _min: OAuthAccountMinAggregateOutputType | null
    _max: OAuthAccountMaxAggregateOutputType | null
  }

  export type OAuthAccountMinAggregateOutputType = {
    id: string | null
    provider: $Enums.OAuthProvider | null
    providerAccountId: string | null
    email: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OAuthAccountMaxAggregateOutputType = {
    id: string | null
    provider: $Enums.OAuthProvider | null
    providerAccountId: string | null
    email: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OAuthAccountCountAggregateOutputType = {
    id: number
    provider: number
    providerAccountId: number
    email: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OAuthAccountMinAggregateInputType = {
    id?: true
    provider?: true
    providerAccountId?: true
    email?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OAuthAccountMaxAggregateInputType = {
    id?: true
    provider?: true
    providerAccountId?: true
    email?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OAuthAccountCountAggregateInputType = {
    id?: true
    provider?: true
    providerAccountId?: true
    email?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OAuthAccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthAccount to aggregate.
     */
    where?: OAuthAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthAccounts to fetch.
     */
    orderBy?: OAuthAccountOrderByWithRelationInput | OAuthAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OAuthAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OAuthAccounts
    **/
    _count?: true | OAuthAccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OAuthAccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OAuthAccountMaxAggregateInputType
  }

  export type GetOAuthAccountAggregateType<T extends OAuthAccountAggregateArgs> = {
        [P in keyof T & keyof AggregateOAuthAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOAuthAccount[P]>
      : GetScalarType<T[P], AggregateOAuthAccount[P]>
  }




  export type OAuthAccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthAccountWhereInput
    orderBy?: OAuthAccountOrderByWithAggregationInput | OAuthAccountOrderByWithAggregationInput[]
    by: OAuthAccountScalarFieldEnum[] | OAuthAccountScalarFieldEnum
    having?: OAuthAccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OAuthAccountCountAggregateInputType | true
    _min?: OAuthAccountMinAggregateInputType
    _max?: OAuthAccountMaxAggregateInputType
  }

  export type OAuthAccountGroupByOutputType = {
    id: string
    provider: $Enums.OAuthProvider
    providerAccountId: string
    email: string | null
    userId: string
    createdAt: Date
    updatedAt: Date
    _count: OAuthAccountCountAggregateOutputType | null
    _min: OAuthAccountMinAggregateOutputType | null
    _max: OAuthAccountMaxAggregateOutputType | null
  }

  type GetOAuthAccountGroupByPayload<T extends OAuthAccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OAuthAccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OAuthAccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OAuthAccountGroupByOutputType[P]>
            : GetScalarType<T[P], OAuthAccountGroupByOutputType[P]>
        }
      >
    >


  export type OAuthAccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    providerAccountId?: boolean
    email?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthAccount"]>

  export type OAuthAccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    providerAccountId?: boolean
    email?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthAccount"]>

  export type OAuthAccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    providerAccountId?: boolean
    email?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthAccount"]>

  export type OAuthAccountSelectScalar = {
    id?: boolean
    provider?: boolean
    providerAccountId?: boolean
    email?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OAuthAccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "provider" | "providerAccountId" | "email" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["oAuthAccount"]>
  export type OAuthAccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OAuthAccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OAuthAccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $OAuthAccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OAuthAccount"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      provider: $Enums.OAuthProvider
      providerAccountId: string
      email: string | null
      userId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["oAuthAccount"]>
    composites: {}
  }

  type OAuthAccountGetPayload<S extends boolean | null | undefined | OAuthAccountDefaultArgs> = $Result.GetResult<Prisma.$OAuthAccountPayload, S>

  type OAuthAccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OAuthAccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OAuthAccountCountAggregateInputType | true
    }

  export interface OAuthAccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OAuthAccount'], meta: { name: 'OAuthAccount' } }
    /**
     * Find zero or one OAuthAccount that matches the filter.
     * @param {OAuthAccountFindUniqueArgs} args - Arguments to find a OAuthAccount
     * @example
     * // Get one OAuthAccount
     * const oAuthAccount = await prisma.oAuthAccount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OAuthAccountFindUniqueArgs>(args: SelectSubset<T, OAuthAccountFindUniqueArgs<ExtArgs>>): Prisma__OAuthAccountClient<$Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OAuthAccount that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OAuthAccountFindUniqueOrThrowArgs} args - Arguments to find a OAuthAccount
     * @example
     * // Get one OAuthAccount
     * const oAuthAccount = await prisma.oAuthAccount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OAuthAccountFindUniqueOrThrowArgs>(args: SelectSubset<T, OAuthAccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OAuthAccountClient<$Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OAuthAccount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAccountFindFirstArgs} args - Arguments to find a OAuthAccount
     * @example
     * // Get one OAuthAccount
     * const oAuthAccount = await prisma.oAuthAccount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OAuthAccountFindFirstArgs>(args?: SelectSubset<T, OAuthAccountFindFirstArgs<ExtArgs>>): Prisma__OAuthAccountClient<$Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OAuthAccount that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAccountFindFirstOrThrowArgs} args - Arguments to find a OAuthAccount
     * @example
     * // Get one OAuthAccount
     * const oAuthAccount = await prisma.oAuthAccount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OAuthAccountFindFirstOrThrowArgs>(args?: SelectSubset<T, OAuthAccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__OAuthAccountClient<$Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OAuthAccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OAuthAccounts
     * const oAuthAccounts = await prisma.oAuthAccount.findMany()
     * 
     * // Get first 10 OAuthAccounts
     * const oAuthAccounts = await prisma.oAuthAccount.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const oAuthAccountWithIdOnly = await prisma.oAuthAccount.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OAuthAccountFindManyArgs>(args?: SelectSubset<T, OAuthAccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OAuthAccount.
     * @param {OAuthAccountCreateArgs} args - Arguments to create a OAuthAccount.
     * @example
     * // Create one OAuthAccount
     * const OAuthAccount = await prisma.oAuthAccount.create({
     *   data: {
     *     // ... data to create a OAuthAccount
     *   }
     * })
     * 
     */
    create<T extends OAuthAccountCreateArgs>(args: SelectSubset<T, OAuthAccountCreateArgs<ExtArgs>>): Prisma__OAuthAccountClient<$Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OAuthAccounts.
     * @param {OAuthAccountCreateManyArgs} args - Arguments to create many OAuthAccounts.
     * @example
     * // Create many OAuthAccounts
     * const oAuthAccount = await prisma.oAuthAccount.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OAuthAccountCreateManyArgs>(args?: SelectSubset<T, OAuthAccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OAuthAccounts and returns the data saved in the database.
     * @param {OAuthAccountCreateManyAndReturnArgs} args - Arguments to create many OAuthAccounts.
     * @example
     * // Create many OAuthAccounts
     * const oAuthAccount = await prisma.oAuthAccount.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OAuthAccounts and only return the `id`
     * const oAuthAccountWithIdOnly = await prisma.oAuthAccount.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OAuthAccountCreateManyAndReturnArgs>(args?: SelectSubset<T, OAuthAccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OAuthAccount.
     * @param {OAuthAccountDeleteArgs} args - Arguments to delete one OAuthAccount.
     * @example
     * // Delete one OAuthAccount
     * const OAuthAccount = await prisma.oAuthAccount.delete({
     *   where: {
     *     // ... filter to delete one OAuthAccount
     *   }
     * })
     * 
     */
    delete<T extends OAuthAccountDeleteArgs>(args: SelectSubset<T, OAuthAccountDeleteArgs<ExtArgs>>): Prisma__OAuthAccountClient<$Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OAuthAccount.
     * @param {OAuthAccountUpdateArgs} args - Arguments to update one OAuthAccount.
     * @example
     * // Update one OAuthAccount
     * const oAuthAccount = await prisma.oAuthAccount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OAuthAccountUpdateArgs>(args: SelectSubset<T, OAuthAccountUpdateArgs<ExtArgs>>): Prisma__OAuthAccountClient<$Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OAuthAccounts.
     * @param {OAuthAccountDeleteManyArgs} args - Arguments to filter OAuthAccounts to delete.
     * @example
     * // Delete a few OAuthAccounts
     * const { count } = await prisma.oAuthAccount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OAuthAccountDeleteManyArgs>(args?: SelectSubset<T, OAuthAccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OAuthAccounts
     * const oAuthAccount = await prisma.oAuthAccount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OAuthAccountUpdateManyArgs>(args: SelectSubset<T, OAuthAccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthAccounts and returns the data updated in the database.
     * @param {OAuthAccountUpdateManyAndReturnArgs} args - Arguments to update many OAuthAccounts.
     * @example
     * // Update many OAuthAccounts
     * const oAuthAccount = await prisma.oAuthAccount.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OAuthAccounts and only return the `id`
     * const oAuthAccountWithIdOnly = await prisma.oAuthAccount.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OAuthAccountUpdateManyAndReturnArgs>(args: SelectSubset<T, OAuthAccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OAuthAccount.
     * @param {OAuthAccountUpsertArgs} args - Arguments to update or create a OAuthAccount.
     * @example
     * // Update or create a OAuthAccount
     * const oAuthAccount = await prisma.oAuthAccount.upsert({
     *   create: {
     *     // ... data to create a OAuthAccount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OAuthAccount we want to update
     *   }
     * })
     */
    upsert<T extends OAuthAccountUpsertArgs>(args: SelectSubset<T, OAuthAccountUpsertArgs<ExtArgs>>): Prisma__OAuthAccountClient<$Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OAuthAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAccountCountArgs} args - Arguments to filter OAuthAccounts to count.
     * @example
     * // Count the number of OAuthAccounts
     * const count = await prisma.oAuthAccount.count({
     *   where: {
     *     // ... the filter for the OAuthAccounts we want to count
     *   }
     * })
    **/
    count<T extends OAuthAccountCountArgs>(
      args?: Subset<T, OAuthAccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OAuthAccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OAuthAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OAuthAccountAggregateArgs>(args: Subset<T, OAuthAccountAggregateArgs>): Prisma.PrismaPromise<GetOAuthAccountAggregateType<T>>

    /**
     * Group by OAuthAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OAuthAccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OAuthAccountGroupByArgs['orderBy'] }
        : { orderBy?: OAuthAccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OAuthAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOAuthAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OAuthAccount model
   */
  readonly fields: OAuthAccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OAuthAccount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OAuthAccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OAuthAccount model
   */
  interface OAuthAccountFieldRefs {
    readonly id: FieldRef<"OAuthAccount", 'String'>
    readonly provider: FieldRef<"OAuthAccount", 'OAuthProvider'>
    readonly providerAccountId: FieldRef<"OAuthAccount", 'String'>
    readonly email: FieldRef<"OAuthAccount", 'String'>
    readonly userId: FieldRef<"OAuthAccount", 'String'>
    readonly createdAt: FieldRef<"OAuthAccount", 'DateTime'>
    readonly updatedAt: FieldRef<"OAuthAccount", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OAuthAccount findUnique
   */
  export type OAuthAccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccount
     */
    select?: OAuthAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccount
     */
    omit?: OAuthAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccountInclude<ExtArgs> | null
    /**
     * Filter, which OAuthAccount to fetch.
     */
    where: OAuthAccountWhereUniqueInput
  }

  /**
   * OAuthAccount findUniqueOrThrow
   */
  export type OAuthAccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccount
     */
    select?: OAuthAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccount
     */
    omit?: OAuthAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccountInclude<ExtArgs> | null
    /**
     * Filter, which OAuthAccount to fetch.
     */
    where: OAuthAccountWhereUniqueInput
  }

  /**
   * OAuthAccount findFirst
   */
  export type OAuthAccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccount
     */
    select?: OAuthAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccount
     */
    omit?: OAuthAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccountInclude<ExtArgs> | null
    /**
     * Filter, which OAuthAccount to fetch.
     */
    where?: OAuthAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthAccounts to fetch.
     */
    orderBy?: OAuthAccountOrderByWithRelationInput | OAuthAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthAccounts.
     */
    cursor?: OAuthAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthAccounts.
     */
    distinct?: OAuthAccountScalarFieldEnum | OAuthAccountScalarFieldEnum[]
  }

  /**
   * OAuthAccount findFirstOrThrow
   */
  export type OAuthAccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccount
     */
    select?: OAuthAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccount
     */
    omit?: OAuthAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccountInclude<ExtArgs> | null
    /**
     * Filter, which OAuthAccount to fetch.
     */
    where?: OAuthAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthAccounts to fetch.
     */
    orderBy?: OAuthAccountOrderByWithRelationInput | OAuthAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthAccounts.
     */
    cursor?: OAuthAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthAccounts.
     */
    distinct?: OAuthAccountScalarFieldEnum | OAuthAccountScalarFieldEnum[]
  }

  /**
   * OAuthAccount findMany
   */
  export type OAuthAccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccount
     */
    select?: OAuthAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccount
     */
    omit?: OAuthAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccountInclude<ExtArgs> | null
    /**
     * Filter, which OAuthAccounts to fetch.
     */
    where?: OAuthAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthAccounts to fetch.
     */
    orderBy?: OAuthAccountOrderByWithRelationInput | OAuthAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OAuthAccounts.
     */
    cursor?: OAuthAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthAccounts.
     */
    skip?: number
    distinct?: OAuthAccountScalarFieldEnum | OAuthAccountScalarFieldEnum[]
  }

  /**
   * OAuthAccount create
   */
  export type OAuthAccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccount
     */
    select?: OAuthAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccount
     */
    omit?: OAuthAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccountInclude<ExtArgs> | null
    /**
     * The data needed to create a OAuthAccount.
     */
    data: XOR<OAuthAccountCreateInput, OAuthAccountUncheckedCreateInput>
  }

  /**
   * OAuthAccount createMany
   */
  export type OAuthAccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OAuthAccounts.
     */
    data: OAuthAccountCreateManyInput | OAuthAccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OAuthAccount createManyAndReturn
   */
  export type OAuthAccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccount
     */
    select?: OAuthAccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccount
     */
    omit?: OAuthAccountOmit<ExtArgs> | null
    /**
     * The data used to create many OAuthAccounts.
     */
    data: OAuthAccountCreateManyInput | OAuthAccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OAuthAccount update
   */
  export type OAuthAccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccount
     */
    select?: OAuthAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccount
     */
    omit?: OAuthAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccountInclude<ExtArgs> | null
    /**
     * The data needed to update a OAuthAccount.
     */
    data: XOR<OAuthAccountUpdateInput, OAuthAccountUncheckedUpdateInput>
    /**
     * Choose, which OAuthAccount to update.
     */
    where: OAuthAccountWhereUniqueInput
  }

  /**
   * OAuthAccount updateMany
   */
  export type OAuthAccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OAuthAccounts.
     */
    data: XOR<OAuthAccountUpdateManyMutationInput, OAuthAccountUncheckedUpdateManyInput>
    /**
     * Filter which OAuthAccounts to update
     */
    where?: OAuthAccountWhereInput
    /**
     * Limit how many OAuthAccounts to update.
     */
    limit?: number
  }

  /**
   * OAuthAccount updateManyAndReturn
   */
  export type OAuthAccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccount
     */
    select?: OAuthAccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccount
     */
    omit?: OAuthAccountOmit<ExtArgs> | null
    /**
     * The data used to update OAuthAccounts.
     */
    data: XOR<OAuthAccountUpdateManyMutationInput, OAuthAccountUncheckedUpdateManyInput>
    /**
     * Filter which OAuthAccounts to update
     */
    where?: OAuthAccountWhereInput
    /**
     * Limit how many OAuthAccounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OAuthAccount upsert
   */
  export type OAuthAccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccount
     */
    select?: OAuthAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccount
     */
    omit?: OAuthAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccountInclude<ExtArgs> | null
    /**
     * The filter to search for the OAuthAccount to update in case it exists.
     */
    where: OAuthAccountWhereUniqueInput
    /**
     * In case the OAuthAccount found by the `where` argument doesn't exist, create a new OAuthAccount with this data.
     */
    create: XOR<OAuthAccountCreateInput, OAuthAccountUncheckedCreateInput>
    /**
     * In case the OAuthAccount was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OAuthAccountUpdateInput, OAuthAccountUncheckedUpdateInput>
  }

  /**
   * OAuthAccount delete
   */
  export type OAuthAccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccount
     */
    select?: OAuthAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccount
     */
    omit?: OAuthAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccountInclude<ExtArgs> | null
    /**
     * Filter which OAuthAccount to delete.
     */
    where: OAuthAccountWhereUniqueInput
  }

  /**
   * OAuthAccount deleteMany
   */
  export type OAuthAccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthAccounts to delete
     */
    where?: OAuthAccountWhereInput
    /**
     * Limit how many OAuthAccounts to delete.
     */
    limit?: number
  }

  /**
   * OAuthAccount without action
   */
  export type OAuthAccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccount
     */
    select?: OAuthAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccount
     */
    omit?: OAuthAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccountInclude<ExtArgs> | null
  }


  /**
   * Model Device
   */

  export type AggregateDevice = {
    _count: DeviceCountAggregateOutputType | null
    _min: DeviceMinAggregateOutputType | null
    _max: DeviceMaxAggregateOutputType | null
  }

  export type DeviceMinAggregateOutputType = {
    id: string | null
    deviceId: string | null
    deviceName: string | null
    platform: $Enums.DevicePlatform | null
    pushToken: string | null
    lastSeenAt: Date | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DeviceMaxAggregateOutputType = {
    id: string | null
    deviceId: string | null
    deviceName: string | null
    platform: $Enums.DevicePlatform | null
    pushToken: string | null
    lastSeenAt: Date | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DeviceCountAggregateOutputType = {
    id: number
    deviceId: number
    deviceName: number
    platform: number
    pushToken: number
    lastSeenAt: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DeviceMinAggregateInputType = {
    id?: true
    deviceId?: true
    deviceName?: true
    platform?: true
    pushToken?: true
    lastSeenAt?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DeviceMaxAggregateInputType = {
    id?: true
    deviceId?: true
    deviceName?: true
    platform?: true
    pushToken?: true
    lastSeenAt?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DeviceCountAggregateInputType = {
    id?: true
    deviceId?: true
    deviceName?: true
    platform?: true
    pushToken?: true
    lastSeenAt?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DeviceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Device to aggregate.
     */
    where?: DeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devices to fetch.
     */
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Devices
    **/
    _count?: true | DeviceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeviceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeviceMaxAggregateInputType
  }

  export type GetDeviceAggregateType<T extends DeviceAggregateArgs> = {
        [P in keyof T & keyof AggregateDevice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDevice[P]>
      : GetScalarType<T[P], AggregateDevice[P]>
  }




  export type DeviceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeviceWhereInput
    orderBy?: DeviceOrderByWithAggregationInput | DeviceOrderByWithAggregationInput[]
    by: DeviceScalarFieldEnum[] | DeviceScalarFieldEnum
    having?: DeviceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeviceCountAggregateInputType | true
    _min?: DeviceMinAggregateInputType
    _max?: DeviceMaxAggregateInputType
  }

  export type DeviceGroupByOutputType = {
    id: string
    deviceId: string
    deviceName: string | null
    platform: $Enums.DevicePlatform
    pushToken: string | null
    lastSeenAt: Date | null
    userId: string
    createdAt: Date
    updatedAt: Date
    _count: DeviceCountAggregateOutputType | null
    _min: DeviceMinAggregateOutputType | null
    _max: DeviceMaxAggregateOutputType | null
  }

  type GetDeviceGroupByPayload<T extends DeviceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeviceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeviceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeviceGroupByOutputType[P]>
            : GetScalarType<T[P], DeviceGroupByOutputType[P]>
        }
      >
    >


  export type DeviceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deviceId?: boolean
    deviceName?: boolean
    platform?: boolean
    pushToken?: boolean
    lastSeenAt?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    refreshTokens?: boolean | Device$refreshTokensArgs<ExtArgs>
    _count?: boolean | DeviceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["device"]>

  export type DeviceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deviceId?: boolean
    deviceName?: boolean
    platform?: boolean
    pushToken?: boolean
    lastSeenAt?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["device"]>

  export type DeviceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deviceId?: boolean
    deviceName?: boolean
    platform?: boolean
    pushToken?: boolean
    lastSeenAt?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["device"]>

  export type DeviceSelectScalar = {
    id?: boolean
    deviceId?: boolean
    deviceName?: boolean
    platform?: boolean
    pushToken?: boolean
    lastSeenAt?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DeviceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "deviceId" | "deviceName" | "platform" | "pushToken" | "lastSeenAt" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["device"]>
  export type DeviceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    refreshTokens?: boolean | Device$refreshTokensArgs<ExtArgs>
    _count?: boolean | DeviceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DeviceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DeviceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DevicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Device"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      refreshTokens: Prisma.$RefreshTokenPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      deviceId: string
      deviceName: string | null
      platform: $Enums.DevicePlatform
      pushToken: string | null
      lastSeenAt: Date | null
      userId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["device"]>
    composites: {}
  }

  type DeviceGetPayload<S extends boolean | null | undefined | DeviceDefaultArgs> = $Result.GetResult<Prisma.$DevicePayload, S>

  type DeviceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DeviceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DeviceCountAggregateInputType | true
    }

  export interface DeviceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Device'], meta: { name: 'Device' } }
    /**
     * Find zero or one Device that matches the filter.
     * @param {DeviceFindUniqueArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeviceFindUniqueArgs>(args: SelectSubset<T, DeviceFindUniqueArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Device that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DeviceFindUniqueOrThrowArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeviceFindUniqueOrThrowArgs>(args: SelectSubset<T, DeviceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Device that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceFindFirstArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeviceFindFirstArgs>(args?: SelectSubset<T, DeviceFindFirstArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Device that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceFindFirstOrThrowArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeviceFindFirstOrThrowArgs>(args?: SelectSubset<T, DeviceFindFirstOrThrowArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Devices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Devices
     * const devices = await prisma.device.findMany()
     * 
     * // Get first 10 Devices
     * const devices = await prisma.device.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deviceWithIdOnly = await prisma.device.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DeviceFindManyArgs>(args?: SelectSubset<T, DeviceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Device.
     * @param {DeviceCreateArgs} args - Arguments to create a Device.
     * @example
     * // Create one Device
     * const Device = await prisma.device.create({
     *   data: {
     *     // ... data to create a Device
     *   }
     * })
     * 
     */
    create<T extends DeviceCreateArgs>(args: SelectSubset<T, DeviceCreateArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Devices.
     * @param {DeviceCreateManyArgs} args - Arguments to create many Devices.
     * @example
     * // Create many Devices
     * const device = await prisma.device.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DeviceCreateManyArgs>(args?: SelectSubset<T, DeviceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Devices and returns the data saved in the database.
     * @param {DeviceCreateManyAndReturnArgs} args - Arguments to create many Devices.
     * @example
     * // Create many Devices
     * const device = await prisma.device.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Devices and only return the `id`
     * const deviceWithIdOnly = await prisma.device.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DeviceCreateManyAndReturnArgs>(args?: SelectSubset<T, DeviceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Device.
     * @param {DeviceDeleteArgs} args - Arguments to delete one Device.
     * @example
     * // Delete one Device
     * const Device = await prisma.device.delete({
     *   where: {
     *     // ... filter to delete one Device
     *   }
     * })
     * 
     */
    delete<T extends DeviceDeleteArgs>(args: SelectSubset<T, DeviceDeleteArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Device.
     * @param {DeviceUpdateArgs} args - Arguments to update one Device.
     * @example
     * // Update one Device
     * const device = await prisma.device.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DeviceUpdateArgs>(args: SelectSubset<T, DeviceUpdateArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Devices.
     * @param {DeviceDeleteManyArgs} args - Arguments to filter Devices to delete.
     * @example
     * // Delete a few Devices
     * const { count } = await prisma.device.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DeviceDeleteManyArgs>(args?: SelectSubset<T, DeviceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Devices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Devices
     * const device = await prisma.device.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DeviceUpdateManyArgs>(args: SelectSubset<T, DeviceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Devices and returns the data updated in the database.
     * @param {DeviceUpdateManyAndReturnArgs} args - Arguments to update many Devices.
     * @example
     * // Update many Devices
     * const device = await prisma.device.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Devices and only return the `id`
     * const deviceWithIdOnly = await prisma.device.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DeviceUpdateManyAndReturnArgs>(args: SelectSubset<T, DeviceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Device.
     * @param {DeviceUpsertArgs} args - Arguments to update or create a Device.
     * @example
     * // Update or create a Device
     * const device = await prisma.device.upsert({
     *   create: {
     *     // ... data to create a Device
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Device we want to update
     *   }
     * })
     */
    upsert<T extends DeviceUpsertArgs>(args: SelectSubset<T, DeviceUpsertArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Devices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceCountArgs} args - Arguments to filter Devices to count.
     * @example
     * // Count the number of Devices
     * const count = await prisma.device.count({
     *   where: {
     *     // ... the filter for the Devices we want to count
     *   }
     * })
    **/
    count<T extends DeviceCountArgs>(
      args?: Subset<T, DeviceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeviceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Device.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DeviceAggregateArgs>(args: Subset<T, DeviceAggregateArgs>): Prisma.PrismaPromise<GetDeviceAggregateType<T>>

    /**
     * Group by Device.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DeviceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeviceGroupByArgs['orderBy'] }
        : { orderBy?: DeviceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DeviceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeviceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Device model
   */
  readonly fields: DeviceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Device.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeviceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    refreshTokens<T extends Device$refreshTokensArgs<ExtArgs> = {}>(args?: Subset<T, Device$refreshTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Device model
   */
  interface DeviceFieldRefs {
    readonly id: FieldRef<"Device", 'String'>
    readonly deviceId: FieldRef<"Device", 'String'>
    readonly deviceName: FieldRef<"Device", 'String'>
    readonly platform: FieldRef<"Device", 'DevicePlatform'>
    readonly pushToken: FieldRef<"Device", 'String'>
    readonly lastSeenAt: FieldRef<"Device", 'DateTime'>
    readonly userId: FieldRef<"Device", 'String'>
    readonly createdAt: FieldRef<"Device", 'DateTime'>
    readonly updatedAt: FieldRef<"Device", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Device findUnique
   */
  export type DeviceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Device to fetch.
     */
    where: DeviceWhereUniqueInput
  }

  /**
   * Device findUniqueOrThrow
   */
  export type DeviceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Device to fetch.
     */
    where: DeviceWhereUniqueInput
  }

  /**
   * Device findFirst
   */
  export type DeviceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Device to fetch.
     */
    where?: DeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devices to fetch.
     */
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Devices.
     */
    cursor?: DeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Devices.
     */
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[]
  }

  /**
   * Device findFirstOrThrow
   */
  export type DeviceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Device to fetch.
     */
    where?: DeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devices to fetch.
     */
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Devices.
     */
    cursor?: DeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Devices.
     */
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[]
  }

  /**
   * Device findMany
   */
  export type DeviceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Devices to fetch.
     */
    where?: DeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devices to fetch.
     */
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Devices.
     */
    cursor?: DeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devices.
     */
    skip?: number
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[]
  }

  /**
   * Device create
   */
  export type DeviceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * The data needed to create a Device.
     */
    data: XOR<DeviceCreateInput, DeviceUncheckedCreateInput>
  }

  /**
   * Device createMany
   */
  export type DeviceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Devices.
     */
    data: DeviceCreateManyInput | DeviceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Device createManyAndReturn
   */
  export type DeviceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * The data used to create many Devices.
     */
    data: DeviceCreateManyInput | DeviceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Device update
   */
  export type DeviceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * The data needed to update a Device.
     */
    data: XOR<DeviceUpdateInput, DeviceUncheckedUpdateInput>
    /**
     * Choose, which Device to update.
     */
    where: DeviceWhereUniqueInput
  }

  /**
   * Device updateMany
   */
  export type DeviceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Devices.
     */
    data: XOR<DeviceUpdateManyMutationInput, DeviceUncheckedUpdateManyInput>
    /**
     * Filter which Devices to update
     */
    where?: DeviceWhereInput
    /**
     * Limit how many Devices to update.
     */
    limit?: number
  }

  /**
   * Device updateManyAndReturn
   */
  export type DeviceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * The data used to update Devices.
     */
    data: XOR<DeviceUpdateManyMutationInput, DeviceUncheckedUpdateManyInput>
    /**
     * Filter which Devices to update
     */
    where?: DeviceWhereInput
    /**
     * Limit how many Devices to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Device upsert
   */
  export type DeviceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * The filter to search for the Device to update in case it exists.
     */
    where: DeviceWhereUniqueInput
    /**
     * In case the Device found by the `where` argument doesn't exist, create a new Device with this data.
     */
    create: XOR<DeviceCreateInput, DeviceUncheckedCreateInput>
    /**
     * In case the Device was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeviceUpdateInput, DeviceUncheckedUpdateInput>
  }

  /**
   * Device delete
   */
  export type DeviceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter which Device to delete.
     */
    where: DeviceWhereUniqueInput
  }

  /**
   * Device deleteMany
   */
  export type DeviceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Devices to delete
     */
    where?: DeviceWhereInput
    /**
     * Limit how many Devices to delete.
     */
    limit?: number
  }

  /**
   * Device.refreshTokens
   */
  export type Device$refreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    cursor?: RefreshTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * Device without action
   */
  export type DeviceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
  }


  /**
   * Model RefreshToken
   */

  export type AggregateRefreshToken = {
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  export type RefreshTokenMinAggregateOutputType = {
    id: string | null
    tokenHash: string | null
    family: string | null
    userId: string | null
    deviceId: string | null
    issuedAt: Date | null
    expiresAt: Date | null
    revokedAt: Date | null
    revokedReason: string | null
    createdAt: Date | null
  }

  export type RefreshTokenMaxAggregateOutputType = {
    id: string | null
    tokenHash: string | null
    family: string | null
    userId: string | null
    deviceId: string | null
    issuedAt: Date | null
    expiresAt: Date | null
    revokedAt: Date | null
    revokedReason: string | null
    createdAt: Date | null
  }

  export type RefreshTokenCountAggregateOutputType = {
    id: number
    tokenHash: number
    family: number
    userId: number
    deviceId: number
    issuedAt: number
    expiresAt: number
    revokedAt: number
    revokedReason: number
    createdAt: number
    _all: number
  }


  export type RefreshTokenMinAggregateInputType = {
    id?: true
    tokenHash?: true
    family?: true
    userId?: true
    deviceId?: true
    issuedAt?: true
    expiresAt?: true
    revokedAt?: true
    revokedReason?: true
    createdAt?: true
  }

  export type RefreshTokenMaxAggregateInputType = {
    id?: true
    tokenHash?: true
    family?: true
    userId?: true
    deviceId?: true
    issuedAt?: true
    expiresAt?: true
    revokedAt?: true
    revokedReason?: true
    createdAt?: true
  }

  export type RefreshTokenCountAggregateInputType = {
    id?: true
    tokenHash?: true
    family?: true
    userId?: true
    deviceId?: true
    issuedAt?: true
    expiresAt?: true
    revokedAt?: true
    revokedReason?: true
    createdAt?: true
    _all?: true
  }

  export type RefreshTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshToken to aggregate.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RefreshTokens
    **/
    _count?: true | RefreshTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefreshTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type GetRefreshTokenAggregateType<T extends RefreshTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateRefreshToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefreshToken[P]>
      : GetScalarType<T[P], AggregateRefreshToken[P]>
  }




  export type RefreshTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithAggregationInput | RefreshTokenOrderByWithAggregationInput[]
    by: RefreshTokenScalarFieldEnum[] | RefreshTokenScalarFieldEnum
    having?: RefreshTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefreshTokenCountAggregateInputType | true
    _min?: RefreshTokenMinAggregateInputType
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type RefreshTokenGroupByOutputType = {
    id: string
    tokenHash: string
    family: string
    userId: string
    deviceId: string | null
    issuedAt: Date
    expiresAt: Date
    revokedAt: Date | null
    revokedReason: string | null
    createdAt: Date
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  type GetRefreshTokenGroupByPayload<T extends RefreshTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefreshTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefreshTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
            : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
        }
      >
    >


  export type RefreshTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tokenHash?: boolean
    family?: boolean
    userId?: boolean
    deviceId?: boolean
    issuedAt?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    revokedReason?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    device?: boolean | RefreshToken$deviceArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tokenHash?: boolean
    family?: boolean
    userId?: boolean
    deviceId?: boolean
    issuedAt?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    revokedReason?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    device?: boolean | RefreshToken$deviceArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tokenHash?: boolean
    family?: boolean
    userId?: boolean
    deviceId?: boolean
    issuedAt?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    revokedReason?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    device?: boolean | RefreshToken$deviceArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectScalar = {
    id?: boolean
    tokenHash?: boolean
    family?: boolean
    userId?: boolean
    deviceId?: boolean
    issuedAt?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    revokedReason?: boolean
    createdAt?: boolean
  }

  export type RefreshTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tokenHash" | "family" | "userId" | "deviceId" | "issuedAt" | "expiresAt" | "revokedAt" | "revokedReason" | "createdAt", ExtArgs["result"]["refreshToken"]>
  export type RefreshTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    device?: boolean | RefreshToken$deviceArgs<ExtArgs>
  }
  export type RefreshTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    device?: boolean | RefreshToken$deviceArgs<ExtArgs>
  }
  export type RefreshTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    device?: boolean | RefreshToken$deviceArgs<ExtArgs>
  }

  export type $RefreshTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RefreshToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      device: Prisma.$DevicePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tokenHash: string
      family: string
      userId: string
      deviceId: string | null
      issuedAt: Date
      expiresAt: Date
      revokedAt: Date | null
      revokedReason: string | null
      createdAt: Date
    }, ExtArgs["result"]["refreshToken"]>
    composites: {}
  }

  type RefreshTokenGetPayload<S extends boolean | null | undefined | RefreshTokenDefaultArgs> = $Result.GetResult<Prisma.$RefreshTokenPayload, S>

  type RefreshTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RefreshTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RefreshTokenCountAggregateInputType | true
    }

  export interface RefreshTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RefreshToken'], meta: { name: 'RefreshToken' } }
    /**
     * Find zero or one RefreshToken that matches the filter.
     * @param {RefreshTokenFindUniqueArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefreshTokenFindUniqueArgs>(args: SelectSubset<T, RefreshTokenFindUniqueArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RefreshToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RefreshTokenFindUniqueOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefreshTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, RefreshTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefreshTokenFindFirstArgs>(args?: SelectSubset<T, RefreshTokenFindFirstArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefreshTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, RefreshTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany()
     * 
     * // Get first 10 RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefreshTokenFindManyArgs>(args?: SelectSubset<T, RefreshTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RefreshToken.
     * @param {RefreshTokenCreateArgs} args - Arguments to create a RefreshToken.
     * @example
     * // Create one RefreshToken
     * const RefreshToken = await prisma.refreshToken.create({
     *   data: {
     *     // ... data to create a RefreshToken
     *   }
     * })
     * 
     */
    create<T extends RefreshTokenCreateArgs>(args: SelectSubset<T, RefreshTokenCreateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RefreshTokens.
     * @param {RefreshTokenCreateManyArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefreshTokenCreateManyArgs>(args?: SelectSubset<T, RefreshTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RefreshTokens and returns the data saved in the database.
     * @param {RefreshTokenCreateManyAndReturnArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RefreshTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, RefreshTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RefreshToken.
     * @param {RefreshTokenDeleteArgs} args - Arguments to delete one RefreshToken.
     * @example
     * // Delete one RefreshToken
     * const RefreshToken = await prisma.refreshToken.delete({
     *   where: {
     *     // ... filter to delete one RefreshToken
     *   }
     * })
     * 
     */
    delete<T extends RefreshTokenDeleteArgs>(args: SelectSubset<T, RefreshTokenDeleteArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RefreshToken.
     * @param {RefreshTokenUpdateArgs} args - Arguments to update one RefreshToken.
     * @example
     * // Update one RefreshToken
     * const refreshToken = await prisma.refreshToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefreshTokenUpdateArgs>(args: SelectSubset<T, RefreshTokenUpdateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RefreshTokens.
     * @param {RefreshTokenDeleteManyArgs} args - Arguments to filter RefreshTokens to delete.
     * @example
     * // Delete a few RefreshTokens
     * const { count } = await prisma.refreshToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefreshTokenDeleteManyArgs>(args?: SelectSubset<T, RefreshTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefreshTokenUpdateManyArgs>(args: SelectSubset<T, RefreshTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens and returns the data updated in the database.
     * @param {RefreshTokenUpdateManyAndReturnArgs} args - Arguments to update many RefreshTokens.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RefreshTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, RefreshTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RefreshToken.
     * @param {RefreshTokenUpsertArgs} args - Arguments to update or create a RefreshToken.
     * @example
     * // Update or create a RefreshToken
     * const refreshToken = await prisma.refreshToken.upsert({
     *   create: {
     *     // ... data to create a RefreshToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefreshToken we want to update
     *   }
     * })
     */
    upsert<T extends RefreshTokenUpsertArgs>(args: SelectSubset<T, RefreshTokenUpsertArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenCountArgs} args - Arguments to filter RefreshTokens to count.
     * @example
     * // Count the number of RefreshTokens
     * const count = await prisma.refreshToken.count({
     *   where: {
     *     // ... the filter for the RefreshTokens we want to count
     *   }
     * })
    **/
    count<T extends RefreshTokenCountArgs>(
      args?: Subset<T, RefreshTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefreshTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RefreshTokenAggregateArgs>(args: Subset<T, RefreshTokenAggregateArgs>): Prisma.PrismaPromise<GetRefreshTokenAggregateType<T>>

    /**
     * Group by RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RefreshTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefreshTokenGroupByArgs['orderBy'] }
        : { orderBy?: RefreshTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RefreshTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefreshTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RefreshToken model
   */
  readonly fields: RefreshTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefreshToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefreshTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    device<T extends RefreshToken$deviceArgs<ExtArgs> = {}>(args?: Subset<T, RefreshToken$deviceArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RefreshToken model
   */
  interface RefreshTokenFieldRefs {
    readonly id: FieldRef<"RefreshToken", 'String'>
    readonly tokenHash: FieldRef<"RefreshToken", 'String'>
    readonly family: FieldRef<"RefreshToken", 'String'>
    readonly userId: FieldRef<"RefreshToken", 'String'>
    readonly deviceId: FieldRef<"RefreshToken", 'String'>
    readonly issuedAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly expiresAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly revokedAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly revokedReason: FieldRef<"RefreshToken", 'String'>
    readonly createdAt: FieldRef<"RefreshToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RefreshToken findUnique
   */
  export type RefreshTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findUniqueOrThrow
   */
  export type RefreshTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findFirst
   */
  export type RefreshTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findFirstOrThrow
   */
  export type RefreshTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findMany
   */
  export type RefreshTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken create
   */
  export type RefreshTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a RefreshToken.
     */
    data: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
  }

  /**
   * RefreshToken createMany
   */
  export type RefreshTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefreshToken createManyAndReturn
   */
  export type RefreshTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken update
   */
  export type RefreshTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a RefreshToken.
     */
    data: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
    /**
     * Choose, which RefreshToken to update.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken updateMany
   */
  export type RefreshTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
  }

  /**
   * RefreshToken updateManyAndReturn
   */
  export type RefreshTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken upsert
   */
  export type RefreshTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the RefreshToken to update in case it exists.
     */
    where: RefreshTokenWhereUniqueInput
    /**
     * In case the RefreshToken found by the `where` argument doesn't exist, create a new RefreshToken with this data.
     */
    create: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
    /**
     * In case the RefreshToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
  }

  /**
   * RefreshToken delete
   */
  export type RefreshTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter which RefreshToken to delete.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken deleteMany
   */
  export type RefreshTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshTokens to delete
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to delete.
     */
    limit?: number
  }

  /**
   * RefreshToken.device
   */
  export type RefreshToken$deviceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    where?: DeviceWhereInput
  }

  /**
   * RefreshToken without action
   */
  export type RefreshTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
  }


  /**
   * Model OtpCode
   */

  export type AggregateOtpCode = {
    _count: OtpCodeCountAggregateOutputType | null
    _avg: OtpCodeAvgAggregateOutputType | null
    _sum: OtpCodeSumAggregateOutputType | null
    _min: OtpCodeMinAggregateOutputType | null
    _max: OtpCodeMaxAggregateOutputType | null
  }

  export type OtpCodeAvgAggregateOutputType = {
    attempts: number | null
  }

  export type OtpCodeSumAggregateOutputType = {
    attempts: number | null
  }

  export type OtpCodeMinAggregateOutputType = {
    id: string | null
    phone: string | null
    purpose: $Enums.OtpPurpose | null
    codeHash: string | null
    attempts: number | null
    expiresAt: Date | null
    consumedAt: Date | null
    requestIp: string | null
    createdAt: Date | null
  }

  export type OtpCodeMaxAggregateOutputType = {
    id: string | null
    phone: string | null
    purpose: $Enums.OtpPurpose | null
    codeHash: string | null
    attempts: number | null
    expiresAt: Date | null
    consumedAt: Date | null
    requestIp: string | null
    createdAt: Date | null
  }

  export type OtpCodeCountAggregateOutputType = {
    id: number
    phone: number
    purpose: number
    codeHash: number
    attempts: number
    expiresAt: number
    consumedAt: number
    requestIp: number
    createdAt: number
    _all: number
  }


  export type OtpCodeAvgAggregateInputType = {
    attempts?: true
  }

  export type OtpCodeSumAggregateInputType = {
    attempts?: true
  }

  export type OtpCodeMinAggregateInputType = {
    id?: true
    phone?: true
    purpose?: true
    codeHash?: true
    attempts?: true
    expiresAt?: true
    consumedAt?: true
    requestIp?: true
    createdAt?: true
  }

  export type OtpCodeMaxAggregateInputType = {
    id?: true
    phone?: true
    purpose?: true
    codeHash?: true
    attempts?: true
    expiresAt?: true
    consumedAt?: true
    requestIp?: true
    createdAt?: true
  }

  export type OtpCodeCountAggregateInputType = {
    id?: true
    phone?: true
    purpose?: true
    codeHash?: true
    attempts?: true
    expiresAt?: true
    consumedAt?: true
    requestIp?: true
    createdAt?: true
    _all?: true
  }

  export type OtpCodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OtpCode to aggregate.
     */
    where?: OtpCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpCodes to fetch.
     */
    orderBy?: OtpCodeOrderByWithRelationInput | OtpCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OtpCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OtpCodes
    **/
    _count?: true | OtpCodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OtpCodeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OtpCodeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OtpCodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OtpCodeMaxAggregateInputType
  }

  export type GetOtpCodeAggregateType<T extends OtpCodeAggregateArgs> = {
        [P in keyof T & keyof AggregateOtpCode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOtpCode[P]>
      : GetScalarType<T[P], AggregateOtpCode[P]>
  }




  export type OtpCodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OtpCodeWhereInput
    orderBy?: OtpCodeOrderByWithAggregationInput | OtpCodeOrderByWithAggregationInput[]
    by: OtpCodeScalarFieldEnum[] | OtpCodeScalarFieldEnum
    having?: OtpCodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OtpCodeCountAggregateInputType | true
    _avg?: OtpCodeAvgAggregateInputType
    _sum?: OtpCodeSumAggregateInputType
    _min?: OtpCodeMinAggregateInputType
    _max?: OtpCodeMaxAggregateInputType
  }

  export type OtpCodeGroupByOutputType = {
    id: string
    phone: string
    purpose: $Enums.OtpPurpose
    codeHash: string
    attempts: number
    expiresAt: Date
    consumedAt: Date | null
    requestIp: string | null
    createdAt: Date
    _count: OtpCodeCountAggregateOutputType | null
    _avg: OtpCodeAvgAggregateOutputType | null
    _sum: OtpCodeSumAggregateOutputType | null
    _min: OtpCodeMinAggregateOutputType | null
    _max: OtpCodeMaxAggregateOutputType | null
  }

  type GetOtpCodeGroupByPayload<T extends OtpCodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OtpCodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OtpCodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OtpCodeGroupByOutputType[P]>
            : GetScalarType<T[P], OtpCodeGroupByOutputType[P]>
        }
      >
    >


  export type OtpCodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phone?: boolean
    purpose?: boolean
    codeHash?: boolean
    attempts?: boolean
    expiresAt?: boolean
    consumedAt?: boolean
    requestIp?: boolean
    createdAt?: boolean
    verificationTokens?: boolean | OtpCode$verificationTokensArgs<ExtArgs>
    _count?: boolean | OtpCodeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["otpCode"]>

  export type OtpCodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phone?: boolean
    purpose?: boolean
    codeHash?: boolean
    attempts?: boolean
    expiresAt?: boolean
    consumedAt?: boolean
    requestIp?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["otpCode"]>

  export type OtpCodeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phone?: boolean
    purpose?: boolean
    codeHash?: boolean
    attempts?: boolean
    expiresAt?: boolean
    consumedAt?: boolean
    requestIp?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["otpCode"]>

  export type OtpCodeSelectScalar = {
    id?: boolean
    phone?: boolean
    purpose?: boolean
    codeHash?: boolean
    attempts?: boolean
    expiresAt?: boolean
    consumedAt?: boolean
    requestIp?: boolean
    createdAt?: boolean
  }

  export type OtpCodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "phone" | "purpose" | "codeHash" | "attempts" | "expiresAt" | "consumedAt" | "requestIp" | "createdAt", ExtArgs["result"]["otpCode"]>
  export type OtpCodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    verificationTokens?: boolean | OtpCode$verificationTokensArgs<ExtArgs>
    _count?: boolean | OtpCodeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OtpCodeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type OtpCodeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OtpCodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OtpCode"
    objects: {
      verificationTokens: Prisma.$OtpVerificationTokenPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      phone: string
      purpose: $Enums.OtpPurpose
      codeHash: string
      attempts: number
      expiresAt: Date
      consumedAt: Date | null
      requestIp: string | null
      createdAt: Date
    }, ExtArgs["result"]["otpCode"]>
    composites: {}
  }

  type OtpCodeGetPayload<S extends boolean | null | undefined | OtpCodeDefaultArgs> = $Result.GetResult<Prisma.$OtpCodePayload, S>

  type OtpCodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OtpCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OtpCodeCountAggregateInputType | true
    }

  export interface OtpCodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OtpCode'], meta: { name: 'OtpCode' } }
    /**
     * Find zero or one OtpCode that matches the filter.
     * @param {OtpCodeFindUniqueArgs} args - Arguments to find a OtpCode
     * @example
     * // Get one OtpCode
     * const otpCode = await prisma.otpCode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OtpCodeFindUniqueArgs>(args: SelectSubset<T, OtpCodeFindUniqueArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OtpCode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OtpCodeFindUniqueOrThrowArgs} args - Arguments to find a OtpCode
     * @example
     * // Get one OtpCode
     * const otpCode = await prisma.otpCode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OtpCodeFindUniqueOrThrowArgs>(args: SelectSubset<T, OtpCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OtpCode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeFindFirstArgs} args - Arguments to find a OtpCode
     * @example
     * // Get one OtpCode
     * const otpCode = await prisma.otpCode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OtpCodeFindFirstArgs>(args?: SelectSubset<T, OtpCodeFindFirstArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OtpCode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeFindFirstOrThrowArgs} args - Arguments to find a OtpCode
     * @example
     * // Get one OtpCode
     * const otpCode = await prisma.otpCode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OtpCodeFindFirstOrThrowArgs>(args?: SelectSubset<T, OtpCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OtpCodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OtpCodes
     * const otpCodes = await prisma.otpCode.findMany()
     * 
     * // Get first 10 OtpCodes
     * const otpCodes = await prisma.otpCode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const otpCodeWithIdOnly = await prisma.otpCode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OtpCodeFindManyArgs>(args?: SelectSubset<T, OtpCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OtpCode.
     * @param {OtpCodeCreateArgs} args - Arguments to create a OtpCode.
     * @example
     * // Create one OtpCode
     * const OtpCode = await prisma.otpCode.create({
     *   data: {
     *     // ... data to create a OtpCode
     *   }
     * })
     * 
     */
    create<T extends OtpCodeCreateArgs>(args: SelectSubset<T, OtpCodeCreateArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OtpCodes.
     * @param {OtpCodeCreateManyArgs} args - Arguments to create many OtpCodes.
     * @example
     * // Create many OtpCodes
     * const otpCode = await prisma.otpCode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OtpCodeCreateManyArgs>(args?: SelectSubset<T, OtpCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OtpCodes and returns the data saved in the database.
     * @param {OtpCodeCreateManyAndReturnArgs} args - Arguments to create many OtpCodes.
     * @example
     * // Create many OtpCodes
     * const otpCode = await prisma.otpCode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OtpCodes and only return the `id`
     * const otpCodeWithIdOnly = await prisma.otpCode.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OtpCodeCreateManyAndReturnArgs>(args?: SelectSubset<T, OtpCodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OtpCode.
     * @param {OtpCodeDeleteArgs} args - Arguments to delete one OtpCode.
     * @example
     * // Delete one OtpCode
     * const OtpCode = await prisma.otpCode.delete({
     *   where: {
     *     // ... filter to delete one OtpCode
     *   }
     * })
     * 
     */
    delete<T extends OtpCodeDeleteArgs>(args: SelectSubset<T, OtpCodeDeleteArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OtpCode.
     * @param {OtpCodeUpdateArgs} args - Arguments to update one OtpCode.
     * @example
     * // Update one OtpCode
     * const otpCode = await prisma.otpCode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OtpCodeUpdateArgs>(args: SelectSubset<T, OtpCodeUpdateArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OtpCodes.
     * @param {OtpCodeDeleteManyArgs} args - Arguments to filter OtpCodes to delete.
     * @example
     * // Delete a few OtpCodes
     * const { count } = await prisma.otpCode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OtpCodeDeleteManyArgs>(args?: SelectSubset<T, OtpCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OtpCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OtpCodes
     * const otpCode = await prisma.otpCode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OtpCodeUpdateManyArgs>(args: SelectSubset<T, OtpCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OtpCodes and returns the data updated in the database.
     * @param {OtpCodeUpdateManyAndReturnArgs} args - Arguments to update many OtpCodes.
     * @example
     * // Update many OtpCodes
     * const otpCode = await prisma.otpCode.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OtpCodes and only return the `id`
     * const otpCodeWithIdOnly = await prisma.otpCode.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OtpCodeUpdateManyAndReturnArgs>(args: SelectSubset<T, OtpCodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OtpCode.
     * @param {OtpCodeUpsertArgs} args - Arguments to update or create a OtpCode.
     * @example
     * // Update or create a OtpCode
     * const otpCode = await prisma.otpCode.upsert({
     *   create: {
     *     // ... data to create a OtpCode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OtpCode we want to update
     *   }
     * })
     */
    upsert<T extends OtpCodeUpsertArgs>(args: SelectSubset<T, OtpCodeUpsertArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OtpCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeCountArgs} args - Arguments to filter OtpCodes to count.
     * @example
     * // Count the number of OtpCodes
     * const count = await prisma.otpCode.count({
     *   where: {
     *     // ... the filter for the OtpCodes we want to count
     *   }
     * })
    **/
    count<T extends OtpCodeCountArgs>(
      args?: Subset<T, OtpCodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OtpCodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OtpCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OtpCodeAggregateArgs>(args: Subset<T, OtpCodeAggregateArgs>): Prisma.PrismaPromise<GetOtpCodeAggregateType<T>>

    /**
     * Group by OtpCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OtpCodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OtpCodeGroupByArgs['orderBy'] }
        : { orderBy?: OtpCodeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OtpCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOtpCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OtpCode model
   */
  readonly fields: OtpCodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OtpCode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OtpCodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    verificationTokens<T extends OtpCode$verificationTokensArgs<ExtArgs> = {}>(args?: Subset<T, OtpCode$verificationTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpVerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OtpCode model
   */
  interface OtpCodeFieldRefs {
    readonly id: FieldRef<"OtpCode", 'String'>
    readonly phone: FieldRef<"OtpCode", 'String'>
    readonly purpose: FieldRef<"OtpCode", 'OtpPurpose'>
    readonly codeHash: FieldRef<"OtpCode", 'String'>
    readonly attempts: FieldRef<"OtpCode", 'Int'>
    readonly expiresAt: FieldRef<"OtpCode", 'DateTime'>
    readonly consumedAt: FieldRef<"OtpCode", 'DateTime'>
    readonly requestIp: FieldRef<"OtpCode", 'String'>
    readonly createdAt: FieldRef<"OtpCode", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OtpCode findUnique
   */
  export type OtpCodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpCodeInclude<ExtArgs> | null
    /**
     * Filter, which OtpCode to fetch.
     */
    where: OtpCodeWhereUniqueInput
  }

  /**
   * OtpCode findUniqueOrThrow
   */
  export type OtpCodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpCodeInclude<ExtArgs> | null
    /**
     * Filter, which OtpCode to fetch.
     */
    where: OtpCodeWhereUniqueInput
  }

  /**
   * OtpCode findFirst
   */
  export type OtpCodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpCodeInclude<ExtArgs> | null
    /**
     * Filter, which OtpCode to fetch.
     */
    where?: OtpCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpCodes to fetch.
     */
    orderBy?: OtpCodeOrderByWithRelationInput | OtpCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OtpCodes.
     */
    cursor?: OtpCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OtpCodes.
     */
    distinct?: OtpCodeScalarFieldEnum | OtpCodeScalarFieldEnum[]
  }

  /**
   * OtpCode findFirstOrThrow
   */
  export type OtpCodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpCodeInclude<ExtArgs> | null
    /**
     * Filter, which OtpCode to fetch.
     */
    where?: OtpCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpCodes to fetch.
     */
    orderBy?: OtpCodeOrderByWithRelationInput | OtpCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OtpCodes.
     */
    cursor?: OtpCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OtpCodes.
     */
    distinct?: OtpCodeScalarFieldEnum | OtpCodeScalarFieldEnum[]
  }

  /**
   * OtpCode findMany
   */
  export type OtpCodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpCodeInclude<ExtArgs> | null
    /**
     * Filter, which OtpCodes to fetch.
     */
    where?: OtpCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpCodes to fetch.
     */
    orderBy?: OtpCodeOrderByWithRelationInput | OtpCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OtpCodes.
     */
    cursor?: OtpCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpCodes.
     */
    skip?: number
    distinct?: OtpCodeScalarFieldEnum | OtpCodeScalarFieldEnum[]
  }

  /**
   * OtpCode create
   */
  export type OtpCodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpCodeInclude<ExtArgs> | null
    /**
     * The data needed to create a OtpCode.
     */
    data: XOR<OtpCodeCreateInput, OtpCodeUncheckedCreateInput>
  }

  /**
   * OtpCode createMany
   */
  export type OtpCodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OtpCodes.
     */
    data: OtpCodeCreateManyInput | OtpCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OtpCode createManyAndReturn
   */
  export type OtpCodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * The data used to create many OtpCodes.
     */
    data: OtpCodeCreateManyInput | OtpCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OtpCode update
   */
  export type OtpCodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpCodeInclude<ExtArgs> | null
    /**
     * The data needed to update a OtpCode.
     */
    data: XOR<OtpCodeUpdateInput, OtpCodeUncheckedUpdateInput>
    /**
     * Choose, which OtpCode to update.
     */
    where: OtpCodeWhereUniqueInput
  }

  /**
   * OtpCode updateMany
   */
  export type OtpCodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OtpCodes.
     */
    data: XOR<OtpCodeUpdateManyMutationInput, OtpCodeUncheckedUpdateManyInput>
    /**
     * Filter which OtpCodes to update
     */
    where?: OtpCodeWhereInput
    /**
     * Limit how many OtpCodes to update.
     */
    limit?: number
  }

  /**
   * OtpCode updateManyAndReturn
   */
  export type OtpCodeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * The data used to update OtpCodes.
     */
    data: XOR<OtpCodeUpdateManyMutationInput, OtpCodeUncheckedUpdateManyInput>
    /**
     * Filter which OtpCodes to update
     */
    where?: OtpCodeWhereInput
    /**
     * Limit how many OtpCodes to update.
     */
    limit?: number
  }

  /**
   * OtpCode upsert
   */
  export type OtpCodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpCodeInclude<ExtArgs> | null
    /**
     * The filter to search for the OtpCode to update in case it exists.
     */
    where: OtpCodeWhereUniqueInput
    /**
     * In case the OtpCode found by the `where` argument doesn't exist, create a new OtpCode with this data.
     */
    create: XOR<OtpCodeCreateInput, OtpCodeUncheckedCreateInput>
    /**
     * In case the OtpCode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OtpCodeUpdateInput, OtpCodeUncheckedUpdateInput>
  }

  /**
   * OtpCode delete
   */
  export type OtpCodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpCodeInclude<ExtArgs> | null
    /**
     * Filter which OtpCode to delete.
     */
    where: OtpCodeWhereUniqueInput
  }

  /**
   * OtpCode deleteMany
   */
  export type OtpCodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OtpCodes to delete
     */
    where?: OtpCodeWhereInput
    /**
     * Limit how many OtpCodes to delete.
     */
    limit?: number
  }

  /**
   * OtpCode.verificationTokens
   */
  export type OtpCode$verificationTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerificationToken
     */
    select?: OtpVerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerificationToken
     */
    omit?: OtpVerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpVerificationTokenInclude<ExtArgs> | null
    where?: OtpVerificationTokenWhereInput
    orderBy?: OtpVerificationTokenOrderByWithRelationInput | OtpVerificationTokenOrderByWithRelationInput[]
    cursor?: OtpVerificationTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OtpVerificationTokenScalarFieldEnum | OtpVerificationTokenScalarFieldEnum[]
  }

  /**
   * OtpCode without action
   */
  export type OtpCodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpCodeInclude<ExtArgs> | null
  }


  /**
   * Model OtpVerificationToken
   */

  export type AggregateOtpVerificationToken = {
    _count: OtpVerificationTokenCountAggregateOutputType | null
    _min: OtpVerificationTokenMinAggregateOutputType | null
    _max: OtpVerificationTokenMaxAggregateOutputType | null
  }

  export type OtpVerificationTokenMinAggregateOutputType = {
    id: string | null
    phone: string | null
    purpose: $Enums.OtpPurpose | null
    otpCodeId: string | null
    expiresAt: Date | null
    consumedAt: Date | null
    createdAt: Date | null
  }

  export type OtpVerificationTokenMaxAggregateOutputType = {
    id: string | null
    phone: string | null
    purpose: $Enums.OtpPurpose | null
    otpCodeId: string | null
    expiresAt: Date | null
    consumedAt: Date | null
    createdAt: Date | null
  }

  export type OtpVerificationTokenCountAggregateOutputType = {
    id: number
    phone: number
    purpose: number
    otpCodeId: number
    expiresAt: number
    consumedAt: number
    createdAt: number
    _all: number
  }


  export type OtpVerificationTokenMinAggregateInputType = {
    id?: true
    phone?: true
    purpose?: true
    otpCodeId?: true
    expiresAt?: true
    consumedAt?: true
    createdAt?: true
  }

  export type OtpVerificationTokenMaxAggregateInputType = {
    id?: true
    phone?: true
    purpose?: true
    otpCodeId?: true
    expiresAt?: true
    consumedAt?: true
    createdAt?: true
  }

  export type OtpVerificationTokenCountAggregateInputType = {
    id?: true
    phone?: true
    purpose?: true
    otpCodeId?: true
    expiresAt?: true
    consumedAt?: true
    createdAt?: true
    _all?: true
  }

  export type OtpVerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OtpVerificationToken to aggregate.
     */
    where?: OtpVerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpVerificationTokens to fetch.
     */
    orderBy?: OtpVerificationTokenOrderByWithRelationInput | OtpVerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OtpVerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpVerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpVerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OtpVerificationTokens
    **/
    _count?: true | OtpVerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OtpVerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OtpVerificationTokenMaxAggregateInputType
  }

  export type GetOtpVerificationTokenAggregateType<T extends OtpVerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateOtpVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOtpVerificationToken[P]>
      : GetScalarType<T[P], AggregateOtpVerificationToken[P]>
  }




  export type OtpVerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OtpVerificationTokenWhereInput
    orderBy?: OtpVerificationTokenOrderByWithAggregationInput | OtpVerificationTokenOrderByWithAggregationInput[]
    by: OtpVerificationTokenScalarFieldEnum[] | OtpVerificationTokenScalarFieldEnum
    having?: OtpVerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OtpVerificationTokenCountAggregateInputType | true
    _min?: OtpVerificationTokenMinAggregateInputType
    _max?: OtpVerificationTokenMaxAggregateInputType
  }

  export type OtpVerificationTokenGroupByOutputType = {
    id: string
    phone: string
    purpose: $Enums.OtpPurpose
    otpCodeId: string
    expiresAt: Date
    consumedAt: Date | null
    createdAt: Date
    _count: OtpVerificationTokenCountAggregateOutputType | null
    _min: OtpVerificationTokenMinAggregateOutputType | null
    _max: OtpVerificationTokenMaxAggregateOutputType | null
  }

  type GetOtpVerificationTokenGroupByPayload<T extends OtpVerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OtpVerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OtpVerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OtpVerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], OtpVerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type OtpVerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phone?: boolean
    purpose?: boolean
    otpCodeId?: boolean
    expiresAt?: boolean
    consumedAt?: boolean
    createdAt?: boolean
    otpCode?: boolean | OtpCodeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["otpVerificationToken"]>

  export type OtpVerificationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phone?: boolean
    purpose?: boolean
    otpCodeId?: boolean
    expiresAt?: boolean
    consumedAt?: boolean
    createdAt?: boolean
    otpCode?: boolean | OtpCodeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["otpVerificationToken"]>

  export type OtpVerificationTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phone?: boolean
    purpose?: boolean
    otpCodeId?: boolean
    expiresAt?: boolean
    consumedAt?: boolean
    createdAt?: boolean
    otpCode?: boolean | OtpCodeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["otpVerificationToken"]>

  export type OtpVerificationTokenSelectScalar = {
    id?: boolean
    phone?: boolean
    purpose?: boolean
    otpCodeId?: boolean
    expiresAt?: boolean
    consumedAt?: boolean
    createdAt?: boolean
  }

  export type OtpVerificationTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "phone" | "purpose" | "otpCodeId" | "expiresAt" | "consumedAt" | "createdAt", ExtArgs["result"]["otpVerificationToken"]>
  export type OtpVerificationTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    otpCode?: boolean | OtpCodeDefaultArgs<ExtArgs>
  }
  export type OtpVerificationTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    otpCode?: boolean | OtpCodeDefaultArgs<ExtArgs>
  }
  export type OtpVerificationTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    otpCode?: boolean | OtpCodeDefaultArgs<ExtArgs>
  }

  export type $OtpVerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OtpVerificationToken"
    objects: {
      otpCode: Prisma.$OtpCodePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      phone: string
      purpose: $Enums.OtpPurpose
      otpCodeId: string
      expiresAt: Date
      consumedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["otpVerificationToken"]>
    composites: {}
  }

  type OtpVerificationTokenGetPayload<S extends boolean | null | undefined | OtpVerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$OtpVerificationTokenPayload, S>

  type OtpVerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OtpVerificationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OtpVerificationTokenCountAggregateInputType | true
    }

  export interface OtpVerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OtpVerificationToken'], meta: { name: 'OtpVerificationToken' } }
    /**
     * Find zero or one OtpVerificationToken that matches the filter.
     * @param {OtpVerificationTokenFindUniqueArgs} args - Arguments to find a OtpVerificationToken
     * @example
     * // Get one OtpVerificationToken
     * const otpVerificationToken = await prisma.otpVerificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OtpVerificationTokenFindUniqueArgs>(args: SelectSubset<T, OtpVerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__OtpVerificationTokenClient<$Result.GetResult<Prisma.$OtpVerificationTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OtpVerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OtpVerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a OtpVerificationToken
     * @example
     * // Get one OtpVerificationToken
     * const otpVerificationToken = await prisma.otpVerificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OtpVerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, OtpVerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OtpVerificationTokenClient<$Result.GetResult<Prisma.$OtpVerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OtpVerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpVerificationTokenFindFirstArgs} args - Arguments to find a OtpVerificationToken
     * @example
     * // Get one OtpVerificationToken
     * const otpVerificationToken = await prisma.otpVerificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OtpVerificationTokenFindFirstArgs>(args?: SelectSubset<T, OtpVerificationTokenFindFirstArgs<ExtArgs>>): Prisma__OtpVerificationTokenClient<$Result.GetResult<Prisma.$OtpVerificationTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OtpVerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpVerificationTokenFindFirstOrThrowArgs} args - Arguments to find a OtpVerificationToken
     * @example
     * // Get one OtpVerificationToken
     * const otpVerificationToken = await prisma.otpVerificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OtpVerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, OtpVerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__OtpVerificationTokenClient<$Result.GetResult<Prisma.$OtpVerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OtpVerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpVerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OtpVerificationTokens
     * const otpVerificationTokens = await prisma.otpVerificationToken.findMany()
     * 
     * // Get first 10 OtpVerificationTokens
     * const otpVerificationTokens = await prisma.otpVerificationToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const otpVerificationTokenWithIdOnly = await prisma.otpVerificationToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OtpVerificationTokenFindManyArgs>(args?: SelectSubset<T, OtpVerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpVerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OtpVerificationToken.
     * @param {OtpVerificationTokenCreateArgs} args - Arguments to create a OtpVerificationToken.
     * @example
     * // Create one OtpVerificationToken
     * const OtpVerificationToken = await prisma.otpVerificationToken.create({
     *   data: {
     *     // ... data to create a OtpVerificationToken
     *   }
     * })
     * 
     */
    create<T extends OtpVerificationTokenCreateArgs>(args: SelectSubset<T, OtpVerificationTokenCreateArgs<ExtArgs>>): Prisma__OtpVerificationTokenClient<$Result.GetResult<Prisma.$OtpVerificationTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OtpVerificationTokens.
     * @param {OtpVerificationTokenCreateManyArgs} args - Arguments to create many OtpVerificationTokens.
     * @example
     * // Create many OtpVerificationTokens
     * const otpVerificationToken = await prisma.otpVerificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OtpVerificationTokenCreateManyArgs>(args?: SelectSubset<T, OtpVerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OtpVerificationTokens and returns the data saved in the database.
     * @param {OtpVerificationTokenCreateManyAndReturnArgs} args - Arguments to create many OtpVerificationTokens.
     * @example
     * // Create many OtpVerificationTokens
     * const otpVerificationToken = await prisma.otpVerificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OtpVerificationTokens and only return the `id`
     * const otpVerificationTokenWithIdOnly = await prisma.otpVerificationToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OtpVerificationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, OtpVerificationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpVerificationTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OtpVerificationToken.
     * @param {OtpVerificationTokenDeleteArgs} args - Arguments to delete one OtpVerificationToken.
     * @example
     * // Delete one OtpVerificationToken
     * const OtpVerificationToken = await prisma.otpVerificationToken.delete({
     *   where: {
     *     // ... filter to delete one OtpVerificationToken
     *   }
     * })
     * 
     */
    delete<T extends OtpVerificationTokenDeleteArgs>(args: SelectSubset<T, OtpVerificationTokenDeleteArgs<ExtArgs>>): Prisma__OtpVerificationTokenClient<$Result.GetResult<Prisma.$OtpVerificationTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OtpVerificationToken.
     * @param {OtpVerificationTokenUpdateArgs} args - Arguments to update one OtpVerificationToken.
     * @example
     * // Update one OtpVerificationToken
     * const otpVerificationToken = await prisma.otpVerificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OtpVerificationTokenUpdateArgs>(args: SelectSubset<T, OtpVerificationTokenUpdateArgs<ExtArgs>>): Prisma__OtpVerificationTokenClient<$Result.GetResult<Prisma.$OtpVerificationTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OtpVerificationTokens.
     * @param {OtpVerificationTokenDeleteManyArgs} args - Arguments to filter OtpVerificationTokens to delete.
     * @example
     * // Delete a few OtpVerificationTokens
     * const { count } = await prisma.otpVerificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OtpVerificationTokenDeleteManyArgs>(args?: SelectSubset<T, OtpVerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OtpVerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpVerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OtpVerificationTokens
     * const otpVerificationToken = await prisma.otpVerificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OtpVerificationTokenUpdateManyArgs>(args: SelectSubset<T, OtpVerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OtpVerificationTokens and returns the data updated in the database.
     * @param {OtpVerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many OtpVerificationTokens.
     * @example
     * // Update many OtpVerificationTokens
     * const otpVerificationToken = await prisma.otpVerificationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OtpVerificationTokens and only return the `id`
     * const otpVerificationTokenWithIdOnly = await prisma.otpVerificationToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OtpVerificationTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, OtpVerificationTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpVerificationTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OtpVerificationToken.
     * @param {OtpVerificationTokenUpsertArgs} args - Arguments to update or create a OtpVerificationToken.
     * @example
     * // Update or create a OtpVerificationToken
     * const otpVerificationToken = await prisma.otpVerificationToken.upsert({
     *   create: {
     *     // ... data to create a OtpVerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OtpVerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends OtpVerificationTokenUpsertArgs>(args: SelectSubset<T, OtpVerificationTokenUpsertArgs<ExtArgs>>): Prisma__OtpVerificationTokenClient<$Result.GetResult<Prisma.$OtpVerificationTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OtpVerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpVerificationTokenCountArgs} args - Arguments to filter OtpVerificationTokens to count.
     * @example
     * // Count the number of OtpVerificationTokens
     * const count = await prisma.otpVerificationToken.count({
     *   where: {
     *     // ... the filter for the OtpVerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends OtpVerificationTokenCountArgs>(
      args?: Subset<T, OtpVerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OtpVerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OtpVerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpVerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OtpVerificationTokenAggregateArgs>(args: Subset<T, OtpVerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetOtpVerificationTokenAggregateType<T>>

    /**
     * Group by OtpVerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpVerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OtpVerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OtpVerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: OtpVerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OtpVerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOtpVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OtpVerificationToken model
   */
  readonly fields: OtpVerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OtpVerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OtpVerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    otpCode<T extends OtpCodeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OtpCodeDefaultArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OtpVerificationToken model
   */
  interface OtpVerificationTokenFieldRefs {
    readonly id: FieldRef<"OtpVerificationToken", 'String'>
    readonly phone: FieldRef<"OtpVerificationToken", 'String'>
    readonly purpose: FieldRef<"OtpVerificationToken", 'OtpPurpose'>
    readonly otpCodeId: FieldRef<"OtpVerificationToken", 'String'>
    readonly expiresAt: FieldRef<"OtpVerificationToken", 'DateTime'>
    readonly consumedAt: FieldRef<"OtpVerificationToken", 'DateTime'>
    readonly createdAt: FieldRef<"OtpVerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OtpVerificationToken findUnique
   */
  export type OtpVerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerificationToken
     */
    select?: OtpVerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerificationToken
     */
    omit?: OtpVerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpVerificationTokenInclude<ExtArgs> | null
    /**
     * Filter, which OtpVerificationToken to fetch.
     */
    where: OtpVerificationTokenWhereUniqueInput
  }

  /**
   * OtpVerificationToken findUniqueOrThrow
   */
  export type OtpVerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerificationToken
     */
    select?: OtpVerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerificationToken
     */
    omit?: OtpVerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpVerificationTokenInclude<ExtArgs> | null
    /**
     * Filter, which OtpVerificationToken to fetch.
     */
    where: OtpVerificationTokenWhereUniqueInput
  }

  /**
   * OtpVerificationToken findFirst
   */
  export type OtpVerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerificationToken
     */
    select?: OtpVerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerificationToken
     */
    omit?: OtpVerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpVerificationTokenInclude<ExtArgs> | null
    /**
     * Filter, which OtpVerificationToken to fetch.
     */
    where?: OtpVerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpVerificationTokens to fetch.
     */
    orderBy?: OtpVerificationTokenOrderByWithRelationInput | OtpVerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OtpVerificationTokens.
     */
    cursor?: OtpVerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpVerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpVerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OtpVerificationTokens.
     */
    distinct?: OtpVerificationTokenScalarFieldEnum | OtpVerificationTokenScalarFieldEnum[]
  }

  /**
   * OtpVerificationToken findFirstOrThrow
   */
  export type OtpVerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerificationToken
     */
    select?: OtpVerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerificationToken
     */
    omit?: OtpVerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpVerificationTokenInclude<ExtArgs> | null
    /**
     * Filter, which OtpVerificationToken to fetch.
     */
    where?: OtpVerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpVerificationTokens to fetch.
     */
    orderBy?: OtpVerificationTokenOrderByWithRelationInput | OtpVerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OtpVerificationTokens.
     */
    cursor?: OtpVerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpVerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpVerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OtpVerificationTokens.
     */
    distinct?: OtpVerificationTokenScalarFieldEnum | OtpVerificationTokenScalarFieldEnum[]
  }

  /**
   * OtpVerificationToken findMany
   */
  export type OtpVerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerificationToken
     */
    select?: OtpVerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerificationToken
     */
    omit?: OtpVerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpVerificationTokenInclude<ExtArgs> | null
    /**
     * Filter, which OtpVerificationTokens to fetch.
     */
    where?: OtpVerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpVerificationTokens to fetch.
     */
    orderBy?: OtpVerificationTokenOrderByWithRelationInput | OtpVerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OtpVerificationTokens.
     */
    cursor?: OtpVerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpVerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpVerificationTokens.
     */
    skip?: number
    distinct?: OtpVerificationTokenScalarFieldEnum | OtpVerificationTokenScalarFieldEnum[]
  }

  /**
   * OtpVerificationToken create
   */
  export type OtpVerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerificationToken
     */
    select?: OtpVerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerificationToken
     */
    omit?: OtpVerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpVerificationTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a OtpVerificationToken.
     */
    data: XOR<OtpVerificationTokenCreateInput, OtpVerificationTokenUncheckedCreateInput>
  }

  /**
   * OtpVerificationToken createMany
   */
  export type OtpVerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OtpVerificationTokens.
     */
    data: OtpVerificationTokenCreateManyInput | OtpVerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OtpVerificationToken createManyAndReturn
   */
  export type OtpVerificationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerificationToken
     */
    select?: OtpVerificationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerificationToken
     */
    omit?: OtpVerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to create many OtpVerificationTokens.
     */
    data: OtpVerificationTokenCreateManyInput | OtpVerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpVerificationTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OtpVerificationToken update
   */
  export type OtpVerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerificationToken
     */
    select?: OtpVerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerificationToken
     */
    omit?: OtpVerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpVerificationTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a OtpVerificationToken.
     */
    data: XOR<OtpVerificationTokenUpdateInput, OtpVerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which OtpVerificationToken to update.
     */
    where: OtpVerificationTokenWhereUniqueInput
  }

  /**
   * OtpVerificationToken updateMany
   */
  export type OtpVerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OtpVerificationTokens.
     */
    data: XOR<OtpVerificationTokenUpdateManyMutationInput, OtpVerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which OtpVerificationTokens to update
     */
    where?: OtpVerificationTokenWhereInput
    /**
     * Limit how many OtpVerificationTokens to update.
     */
    limit?: number
  }

  /**
   * OtpVerificationToken updateManyAndReturn
   */
  export type OtpVerificationTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerificationToken
     */
    select?: OtpVerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerificationToken
     */
    omit?: OtpVerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to update OtpVerificationTokens.
     */
    data: XOR<OtpVerificationTokenUpdateManyMutationInput, OtpVerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which OtpVerificationTokens to update
     */
    where?: OtpVerificationTokenWhereInput
    /**
     * Limit how many OtpVerificationTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpVerificationTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OtpVerificationToken upsert
   */
  export type OtpVerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerificationToken
     */
    select?: OtpVerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerificationToken
     */
    omit?: OtpVerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpVerificationTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the OtpVerificationToken to update in case it exists.
     */
    where: OtpVerificationTokenWhereUniqueInput
    /**
     * In case the OtpVerificationToken found by the `where` argument doesn't exist, create a new OtpVerificationToken with this data.
     */
    create: XOR<OtpVerificationTokenCreateInput, OtpVerificationTokenUncheckedCreateInput>
    /**
     * In case the OtpVerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OtpVerificationTokenUpdateInput, OtpVerificationTokenUncheckedUpdateInput>
  }

  /**
   * OtpVerificationToken delete
   */
  export type OtpVerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerificationToken
     */
    select?: OtpVerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerificationToken
     */
    omit?: OtpVerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpVerificationTokenInclude<ExtArgs> | null
    /**
     * Filter which OtpVerificationToken to delete.
     */
    where: OtpVerificationTokenWhereUniqueInput
  }

  /**
   * OtpVerificationToken deleteMany
   */
  export type OtpVerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OtpVerificationTokens to delete
     */
    where?: OtpVerificationTokenWhereInput
    /**
     * Limit how many OtpVerificationTokens to delete.
     */
    limit?: number
  }

  /**
   * OtpVerificationToken without action
   */
  export type OtpVerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerificationToken
     */
    select?: OtpVerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerificationToken
     */
    omit?: OtpVerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpVerificationTokenInclude<ExtArgs> | null
  }


  /**
   * Model Listing
   */

  export type AggregateListing = {
    _count: ListingCountAggregateOutputType | null
    _avg: ListingAvgAggregateOutputType | null
    _sum: ListingSumAggregateOutputType | null
    _min: ListingMinAggregateOutputType | null
    _max: ListingMaxAggregateOutputType | null
  }

  export type ListingAvgAggregateOutputType = {
    quantity: Decimal | null
    pricePerUnit: Decimal | null
  }

  export type ListingSumAggregateOutputType = {
    quantity: Decimal | null
    pricePerUnit: Decimal | null
  }

  export type ListingMinAggregateOutputType = {
    id: string | null
    farmerId: string | null
    title: string | null
    description: string | null
    cropType: $Enums.CropType | null
    quantity: Decimal | null
    quantityUnit: $Enums.QuantityUnit | null
    pricePerUnit: Decimal | null
    location: string | null
    harvestDate: Date | null
    status: $Enums.ListingStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ListingMaxAggregateOutputType = {
    id: string | null
    farmerId: string | null
    title: string | null
    description: string | null
    cropType: $Enums.CropType | null
    quantity: Decimal | null
    quantityUnit: $Enums.QuantityUnit | null
    pricePerUnit: Decimal | null
    location: string | null
    harvestDate: Date | null
    status: $Enums.ListingStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ListingCountAggregateOutputType = {
    id: number
    farmerId: number
    title: number
    description: number
    cropType: number
    quantity: number
    quantityUnit: number
    pricePerUnit: number
    location: number
    harvestDate: number
    images: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ListingAvgAggregateInputType = {
    quantity?: true
    pricePerUnit?: true
  }

  export type ListingSumAggregateInputType = {
    quantity?: true
    pricePerUnit?: true
  }

  export type ListingMinAggregateInputType = {
    id?: true
    farmerId?: true
    title?: true
    description?: true
    cropType?: true
    quantity?: true
    quantityUnit?: true
    pricePerUnit?: true
    location?: true
    harvestDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ListingMaxAggregateInputType = {
    id?: true
    farmerId?: true
    title?: true
    description?: true
    cropType?: true
    quantity?: true
    quantityUnit?: true
    pricePerUnit?: true
    location?: true
    harvestDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ListingCountAggregateInputType = {
    id?: true
    farmerId?: true
    title?: true
    description?: true
    cropType?: true
    quantity?: true
    quantityUnit?: true
    pricePerUnit?: true
    location?: true
    harvestDate?: true
    images?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ListingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Listing to aggregate.
     */
    where?: ListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Listings to fetch.
     */
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Listings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Listings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Listings
    **/
    _count?: true | ListingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ListingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ListingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ListingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ListingMaxAggregateInputType
  }

  export type GetListingAggregateType<T extends ListingAggregateArgs> = {
        [P in keyof T & keyof AggregateListing]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateListing[P]>
      : GetScalarType<T[P], AggregateListing[P]>
  }




  export type ListingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListingWhereInput
    orderBy?: ListingOrderByWithAggregationInput | ListingOrderByWithAggregationInput[]
    by: ListingScalarFieldEnum[] | ListingScalarFieldEnum
    having?: ListingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ListingCountAggregateInputType | true
    _avg?: ListingAvgAggregateInputType
    _sum?: ListingSumAggregateInputType
    _min?: ListingMinAggregateInputType
    _max?: ListingMaxAggregateInputType
  }

  export type ListingGroupByOutputType = {
    id: string
    farmerId: string
    title: string
    description: string | null
    cropType: $Enums.CropType
    quantity: Decimal
    quantityUnit: $Enums.QuantityUnit
    pricePerUnit: Decimal
    location: string
    harvestDate: Date | null
    images: string[]
    status: $Enums.ListingStatus
    createdAt: Date
    updatedAt: Date
    _count: ListingCountAggregateOutputType | null
    _avg: ListingAvgAggregateOutputType | null
    _sum: ListingSumAggregateOutputType | null
    _min: ListingMinAggregateOutputType | null
    _max: ListingMaxAggregateOutputType | null
  }

  type GetListingGroupByPayload<T extends ListingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ListingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ListingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ListingGroupByOutputType[P]>
            : GetScalarType<T[P], ListingGroupByOutputType[P]>
        }
      >
    >


  export type ListingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    farmerId?: boolean
    title?: boolean
    description?: boolean
    cropType?: boolean
    quantity?: boolean
    quantityUnit?: boolean
    pricePerUnit?: boolean
    location?: boolean
    harvestDate?: boolean
    images?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    farmer?: boolean | UserDefaultArgs<ExtArgs>
    orders?: boolean | Listing$ordersArgs<ExtArgs>
    interests?: boolean | Listing$interestsArgs<ExtArgs>
    savedBy?: boolean | Listing$savedByArgs<ExtArgs>
    _count?: boolean | ListingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listing"]>

  export type ListingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    farmerId?: boolean
    title?: boolean
    description?: boolean
    cropType?: boolean
    quantity?: boolean
    quantityUnit?: boolean
    pricePerUnit?: boolean
    location?: boolean
    harvestDate?: boolean
    images?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    farmer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listing"]>

  export type ListingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    farmerId?: boolean
    title?: boolean
    description?: boolean
    cropType?: boolean
    quantity?: boolean
    quantityUnit?: boolean
    pricePerUnit?: boolean
    location?: boolean
    harvestDate?: boolean
    images?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    farmer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listing"]>

  export type ListingSelectScalar = {
    id?: boolean
    farmerId?: boolean
    title?: boolean
    description?: boolean
    cropType?: boolean
    quantity?: boolean
    quantityUnit?: boolean
    pricePerUnit?: boolean
    location?: boolean
    harvestDate?: boolean
    images?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ListingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "farmerId" | "title" | "description" | "cropType" | "quantity" | "quantityUnit" | "pricePerUnit" | "location" | "harvestDate" | "images" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["listing"]>
  export type ListingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farmer?: boolean | UserDefaultArgs<ExtArgs>
    orders?: boolean | Listing$ordersArgs<ExtArgs>
    interests?: boolean | Listing$interestsArgs<ExtArgs>
    savedBy?: boolean | Listing$savedByArgs<ExtArgs>
    _count?: boolean | ListingCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ListingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farmer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ListingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farmer?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ListingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Listing"
    objects: {
      farmer: Prisma.$UserPayload<ExtArgs>
      orders: Prisma.$OrderPayload<ExtArgs>[]
      interests: Prisma.$ListingInterestPayload<ExtArgs>[]
      savedBy: Prisma.$SavedListingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      farmerId: string
      title: string
      description: string | null
      cropType: $Enums.CropType
      quantity: Prisma.Decimal
      quantityUnit: $Enums.QuantityUnit
      pricePerUnit: Prisma.Decimal
      location: string
      harvestDate: Date | null
      images: string[]
      status: $Enums.ListingStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["listing"]>
    composites: {}
  }

  type ListingGetPayload<S extends boolean | null | undefined | ListingDefaultArgs> = $Result.GetResult<Prisma.$ListingPayload, S>

  type ListingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ListingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ListingCountAggregateInputType | true
    }

  export interface ListingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Listing'], meta: { name: 'Listing' } }
    /**
     * Find zero or one Listing that matches the filter.
     * @param {ListingFindUniqueArgs} args - Arguments to find a Listing
     * @example
     * // Get one Listing
     * const listing = await prisma.listing.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ListingFindUniqueArgs>(args: SelectSubset<T, ListingFindUniqueArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Listing that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ListingFindUniqueOrThrowArgs} args - Arguments to find a Listing
     * @example
     * // Get one Listing
     * const listing = await prisma.listing.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ListingFindUniqueOrThrowArgs>(args: SelectSubset<T, ListingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Listing that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingFindFirstArgs} args - Arguments to find a Listing
     * @example
     * // Get one Listing
     * const listing = await prisma.listing.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ListingFindFirstArgs>(args?: SelectSubset<T, ListingFindFirstArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Listing that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingFindFirstOrThrowArgs} args - Arguments to find a Listing
     * @example
     * // Get one Listing
     * const listing = await prisma.listing.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ListingFindFirstOrThrowArgs>(args?: SelectSubset<T, ListingFindFirstOrThrowArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Listings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Listings
     * const listings = await prisma.listing.findMany()
     * 
     * // Get first 10 Listings
     * const listings = await prisma.listing.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const listingWithIdOnly = await prisma.listing.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ListingFindManyArgs>(args?: SelectSubset<T, ListingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Listing.
     * @param {ListingCreateArgs} args - Arguments to create a Listing.
     * @example
     * // Create one Listing
     * const Listing = await prisma.listing.create({
     *   data: {
     *     // ... data to create a Listing
     *   }
     * })
     * 
     */
    create<T extends ListingCreateArgs>(args: SelectSubset<T, ListingCreateArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Listings.
     * @param {ListingCreateManyArgs} args - Arguments to create many Listings.
     * @example
     * // Create many Listings
     * const listing = await prisma.listing.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ListingCreateManyArgs>(args?: SelectSubset<T, ListingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Listings and returns the data saved in the database.
     * @param {ListingCreateManyAndReturnArgs} args - Arguments to create many Listings.
     * @example
     * // Create many Listings
     * const listing = await prisma.listing.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Listings and only return the `id`
     * const listingWithIdOnly = await prisma.listing.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ListingCreateManyAndReturnArgs>(args?: SelectSubset<T, ListingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Listing.
     * @param {ListingDeleteArgs} args - Arguments to delete one Listing.
     * @example
     * // Delete one Listing
     * const Listing = await prisma.listing.delete({
     *   where: {
     *     // ... filter to delete one Listing
     *   }
     * })
     * 
     */
    delete<T extends ListingDeleteArgs>(args: SelectSubset<T, ListingDeleteArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Listing.
     * @param {ListingUpdateArgs} args - Arguments to update one Listing.
     * @example
     * // Update one Listing
     * const listing = await prisma.listing.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ListingUpdateArgs>(args: SelectSubset<T, ListingUpdateArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Listings.
     * @param {ListingDeleteManyArgs} args - Arguments to filter Listings to delete.
     * @example
     * // Delete a few Listings
     * const { count } = await prisma.listing.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ListingDeleteManyArgs>(args?: SelectSubset<T, ListingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Listings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Listings
     * const listing = await prisma.listing.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ListingUpdateManyArgs>(args: SelectSubset<T, ListingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Listings and returns the data updated in the database.
     * @param {ListingUpdateManyAndReturnArgs} args - Arguments to update many Listings.
     * @example
     * // Update many Listings
     * const listing = await prisma.listing.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Listings and only return the `id`
     * const listingWithIdOnly = await prisma.listing.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ListingUpdateManyAndReturnArgs>(args: SelectSubset<T, ListingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Listing.
     * @param {ListingUpsertArgs} args - Arguments to update or create a Listing.
     * @example
     * // Update or create a Listing
     * const listing = await prisma.listing.upsert({
     *   create: {
     *     // ... data to create a Listing
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Listing we want to update
     *   }
     * })
     */
    upsert<T extends ListingUpsertArgs>(args: SelectSubset<T, ListingUpsertArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Listings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingCountArgs} args - Arguments to filter Listings to count.
     * @example
     * // Count the number of Listings
     * const count = await prisma.listing.count({
     *   where: {
     *     // ... the filter for the Listings we want to count
     *   }
     * })
    **/
    count<T extends ListingCountArgs>(
      args?: Subset<T, ListingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ListingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Listing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ListingAggregateArgs>(args: Subset<T, ListingAggregateArgs>): Prisma.PrismaPromise<GetListingAggregateType<T>>

    /**
     * Group by Listing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ListingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ListingGroupByArgs['orderBy'] }
        : { orderBy?: ListingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ListingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetListingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Listing model
   */
  readonly fields: ListingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Listing.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ListingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    farmer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    orders<T extends Listing$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Listing$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    interests<T extends Listing$interestsArgs<ExtArgs> = {}>(args?: Subset<T, Listing$interestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingInterestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    savedBy<T extends Listing$savedByArgs<ExtArgs> = {}>(args?: Subset<T, Listing$savedByArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Listing model
   */
  interface ListingFieldRefs {
    readonly id: FieldRef<"Listing", 'String'>
    readonly farmerId: FieldRef<"Listing", 'String'>
    readonly title: FieldRef<"Listing", 'String'>
    readonly description: FieldRef<"Listing", 'String'>
    readonly cropType: FieldRef<"Listing", 'CropType'>
    readonly quantity: FieldRef<"Listing", 'Decimal'>
    readonly quantityUnit: FieldRef<"Listing", 'QuantityUnit'>
    readonly pricePerUnit: FieldRef<"Listing", 'Decimal'>
    readonly location: FieldRef<"Listing", 'String'>
    readonly harvestDate: FieldRef<"Listing", 'DateTime'>
    readonly images: FieldRef<"Listing", 'String[]'>
    readonly status: FieldRef<"Listing", 'ListingStatus'>
    readonly createdAt: FieldRef<"Listing", 'DateTime'>
    readonly updatedAt: FieldRef<"Listing", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Listing findUnique
   */
  export type ListingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listing to fetch.
     */
    where: ListingWhereUniqueInput
  }

  /**
   * Listing findUniqueOrThrow
   */
  export type ListingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listing to fetch.
     */
    where: ListingWhereUniqueInput
  }

  /**
   * Listing findFirst
   */
  export type ListingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listing to fetch.
     */
    where?: ListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Listings to fetch.
     */
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Listings.
     */
    cursor?: ListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Listings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Listings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Listings.
     */
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * Listing findFirstOrThrow
   */
  export type ListingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listing to fetch.
     */
    where?: ListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Listings to fetch.
     */
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Listings.
     */
    cursor?: ListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Listings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Listings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Listings.
     */
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * Listing findMany
   */
  export type ListingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listings to fetch.
     */
    where?: ListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Listings to fetch.
     */
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Listings.
     */
    cursor?: ListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Listings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Listings.
     */
    skip?: number
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * Listing create
   */
  export type ListingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * The data needed to create a Listing.
     */
    data: XOR<ListingCreateInput, ListingUncheckedCreateInput>
  }

  /**
   * Listing createMany
   */
  export type ListingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Listings.
     */
    data: ListingCreateManyInput | ListingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Listing createManyAndReturn
   */
  export type ListingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * The data used to create many Listings.
     */
    data: ListingCreateManyInput | ListingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Listing update
   */
  export type ListingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * The data needed to update a Listing.
     */
    data: XOR<ListingUpdateInput, ListingUncheckedUpdateInput>
    /**
     * Choose, which Listing to update.
     */
    where: ListingWhereUniqueInput
  }

  /**
   * Listing updateMany
   */
  export type ListingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Listings.
     */
    data: XOR<ListingUpdateManyMutationInput, ListingUncheckedUpdateManyInput>
    /**
     * Filter which Listings to update
     */
    where?: ListingWhereInput
    /**
     * Limit how many Listings to update.
     */
    limit?: number
  }

  /**
   * Listing updateManyAndReturn
   */
  export type ListingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * The data used to update Listings.
     */
    data: XOR<ListingUpdateManyMutationInput, ListingUncheckedUpdateManyInput>
    /**
     * Filter which Listings to update
     */
    where?: ListingWhereInput
    /**
     * Limit how many Listings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Listing upsert
   */
  export type ListingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * The filter to search for the Listing to update in case it exists.
     */
    where: ListingWhereUniqueInput
    /**
     * In case the Listing found by the `where` argument doesn't exist, create a new Listing with this data.
     */
    create: XOR<ListingCreateInput, ListingUncheckedCreateInput>
    /**
     * In case the Listing was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ListingUpdateInput, ListingUncheckedUpdateInput>
  }

  /**
   * Listing delete
   */
  export type ListingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter which Listing to delete.
     */
    where: ListingWhereUniqueInput
  }

  /**
   * Listing deleteMany
   */
  export type ListingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Listings to delete
     */
    where?: ListingWhereInput
    /**
     * Limit how many Listings to delete.
     */
    limit?: number
  }

  /**
   * Listing.orders
   */
  export type Listing$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Listing.interests
   */
  export type Listing$interestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingInterest
     */
    select?: ListingInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListingInterest
     */
    omit?: ListingInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInterestInclude<ExtArgs> | null
    where?: ListingInterestWhereInput
    orderBy?: ListingInterestOrderByWithRelationInput | ListingInterestOrderByWithRelationInput[]
    cursor?: ListingInterestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ListingInterestScalarFieldEnum | ListingInterestScalarFieldEnum[]
  }

  /**
   * Listing.savedBy
   */
  export type Listing$savedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedListing
     */
    select?: SavedListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedListing
     */
    omit?: SavedListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedListingInclude<ExtArgs> | null
    where?: SavedListingWhereInput
    orderBy?: SavedListingOrderByWithRelationInput | SavedListingOrderByWithRelationInput[]
    cursor?: SavedListingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SavedListingScalarFieldEnum | SavedListingScalarFieldEnum[]
  }

  /**
   * Listing without action
   */
  export type ListingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
  }


  /**
   * Model ListingInterest
   */

  export type AggregateListingInterest = {
    _count: ListingInterestCountAggregateOutputType | null
    _min: ListingInterestMinAggregateOutputType | null
    _max: ListingInterestMaxAggregateOutputType | null
  }

  export type ListingInterestMinAggregateOutputType = {
    id: string | null
    listingId: string | null
    buyerId: string | null
    createdAt: Date | null
  }

  export type ListingInterestMaxAggregateOutputType = {
    id: string | null
    listingId: string | null
    buyerId: string | null
    createdAt: Date | null
  }

  export type ListingInterestCountAggregateOutputType = {
    id: number
    listingId: number
    buyerId: number
    createdAt: number
    _all: number
  }


  export type ListingInterestMinAggregateInputType = {
    id?: true
    listingId?: true
    buyerId?: true
    createdAt?: true
  }

  export type ListingInterestMaxAggregateInputType = {
    id?: true
    listingId?: true
    buyerId?: true
    createdAt?: true
  }

  export type ListingInterestCountAggregateInputType = {
    id?: true
    listingId?: true
    buyerId?: true
    createdAt?: true
    _all?: true
  }

  export type ListingInterestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ListingInterest to aggregate.
     */
    where?: ListingInterestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListingInterests to fetch.
     */
    orderBy?: ListingInterestOrderByWithRelationInput | ListingInterestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ListingInterestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListingInterests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListingInterests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ListingInterests
    **/
    _count?: true | ListingInterestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ListingInterestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ListingInterestMaxAggregateInputType
  }

  export type GetListingInterestAggregateType<T extends ListingInterestAggregateArgs> = {
        [P in keyof T & keyof AggregateListingInterest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateListingInterest[P]>
      : GetScalarType<T[P], AggregateListingInterest[P]>
  }




  export type ListingInterestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListingInterestWhereInput
    orderBy?: ListingInterestOrderByWithAggregationInput | ListingInterestOrderByWithAggregationInput[]
    by: ListingInterestScalarFieldEnum[] | ListingInterestScalarFieldEnum
    having?: ListingInterestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ListingInterestCountAggregateInputType | true
    _min?: ListingInterestMinAggregateInputType
    _max?: ListingInterestMaxAggregateInputType
  }

  export type ListingInterestGroupByOutputType = {
    id: string
    listingId: string
    buyerId: string
    createdAt: Date
    _count: ListingInterestCountAggregateOutputType | null
    _min: ListingInterestMinAggregateOutputType | null
    _max: ListingInterestMaxAggregateOutputType | null
  }

  type GetListingInterestGroupByPayload<T extends ListingInterestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ListingInterestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ListingInterestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ListingInterestGroupByOutputType[P]>
            : GetScalarType<T[P], ListingInterestGroupByOutputType[P]>
        }
      >
    >


  export type ListingInterestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    listingId?: boolean
    buyerId?: boolean
    createdAt?: boolean
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listingInterest"]>

  export type ListingInterestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    listingId?: boolean
    buyerId?: boolean
    createdAt?: boolean
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listingInterest"]>

  export type ListingInterestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    listingId?: boolean
    buyerId?: boolean
    createdAt?: boolean
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listingInterest"]>

  export type ListingInterestSelectScalar = {
    id?: boolean
    listingId?: boolean
    buyerId?: boolean
    createdAt?: boolean
  }

  export type ListingInterestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "listingId" | "buyerId" | "createdAt", ExtArgs["result"]["listingInterest"]>
  export type ListingInterestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ListingInterestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ListingInterestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ListingInterestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ListingInterest"
    objects: {
      listing: Prisma.$ListingPayload<ExtArgs>
      buyer: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      listingId: string
      buyerId: string
      createdAt: Date
    }, ExtArgs["result"]["listingInterest"]>
    composites: {}
  }

  type ListingInterestGetPayload<S extends boolean | null | undefined | ListingInterestDefaultArgs> = $Result.GetResult<Prisma.$ListingInterestPayload, S>

  type ListingInterestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ListingInterestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ListingInterestCountAggregateInputType | true
    }

  export interface ListingInterestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ListingInterest'], meta: { name: 'ListingInterest' } }
    /**
     * Find zero or one ListingInterest that matches the filter.
     * @param {ListingInterestFindUniqueArgs} args - Arguments to find a ListingInterest
     * @example
     * // Get one ListingInterest
     * const listingInterest = await prisma.listingInterest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ListingInterestFindUniqueArgs>(args: SelectSubset<T, ListingInterestFindUniqueArgs<ExtArgs>>): Prisma__ListingInterestClient<$Result.GetResult<Prisma.$ListingInterestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ListingInterest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ListingInterestFindUniqueOrThrowArgs} args - Arguments to find a ListingInterest
     * @example
     * // Get one ListingInterest
     * const listingInterest = await prisma.listingInterest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ListingInterestFindUniqueOrThrowArgs>(args: SelectSubset<T, ListingInterestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ListingInterestClient<$Result.GetResult<Prisma.$ListingInterestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ListingInterest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingInterestFindFirstArgs} args - Arguments to find a ListingInterest
     * @example
     * // Get one ListingInterest
     * const listingInterest = await prisma.listingInterest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ListingInterestFindFirstArgs>(args?: SelectSubset<T, ListingInterestFindFirstArgs<ExtArgs>>): Prisma__ListingInterestClient<$Result.GetResult<Prisma.$ListingInterestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ListingInterest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingInterestFindFirstOrThrowArgs} args - Arguments to find a ListingInterest
     * @example
     * // Get one ListingInterest
     * const listingInterest = await prisma.listingInterest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ListingInterestFindFirstOrThrowArgs>(args?: SelectSubset<T, ListingInterestFindFirstOrThrowArgs<ExtArgs>>): Prisma__ListingInterestClient<$Result.GetResult<Prisma.$ListingInterestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ListingInterests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingInterestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ListingInterests
     * const listingInterests = await prisma.listingInterest.findMany()
     * 
     * // Get first 10 ListingInterests
     * const listingInterests = await prisma.listingInterest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const listingInterestWithIdOnly = await prisma.listingInterest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ListingInterestFindManyArgs>(args?: SelectSubset<T, ListingInterestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingInterestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ListingInterest.
     * @param {ListingInterestCreateArgs} args - Arguments to create a ListingInterest.
     * @example
     * // Create one ListingInterest
     * const ListingInterest = await prisma.listingInterest.create({
     *   data: {
     *     // ... data to create a ListingInterest
     *   }
     * })
     * 
     */
    create<T extends ListingInterestCreateArgs>(args: SelectSubset<T, ListingInterestCreateArgs<ExtArgs>>): Prisma__ListingInterestClient<$Result.GetResult<Prisma.$ListingInterestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ListingInterests.
     * @param {ListingInterestCreateManyArgs} args - Arguments to create many ListingInterests.
     * @example
     * // Create many ListingInterests
     * const listingInterest = await prisma.listingInterest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ListingInterestCreateManyArgs>(args?: SelectSubset<T, ListingInterestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ListingInterests and returns the data saved in the database.
     * @param {ListingInterestCreateManyAndReturnArgs} args - Arguments to create many ListingInterests.
     * @example
     * // Create many ListingInterests
     * const listingInterest = await prisma.listingInterest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ListingInterests and only return the `id`
     * const listingInterestWithIdOnly = await prisma.listingInterest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ListingInterestCreateManyAndReturnArgs>(args?: SelectSubset<T, ListingInterestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingInterestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ListingInterest.
     * @param {ListingInterestDeleteArgs} args - Arguments to delete one ListingInterest.
     * @example
     * // Delete one ListingInterest
     * const ListingInterest = await prisma.listingInterest.delete({
     *   where: {
     *     // ... filter to delete one ListingInterest
     *   }
     * })
     * 
     */
    delete<T extends ListingInterestDeleteArgs>(args: SelectSubset<T, ListingInterestDeleteArgs<ExtArgs>>): Prisma__ListingInterestClient<$Result.GetResult<Prisma.$ListingInterestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ListingInterest.
     * @param {ListingInterestUpdateArgs} args - Arguments to update one ListingInterest.
     * @example
     * // Update one ListingInterest
     * const listingInterest = await prisma.listingInterest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ListingInterestUpdateArgs>(args: SelectSubset<T, ListingInterestUpdateArgs<ExtArgs>>): Prisma__ListingInterestClient<$Result.GetResult<Prisma.$ListingInterestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ListingInterests.
     * @param {ListingInterestDeleteManyArgs} args - Arguments to filter ListingInterests to delete.
     * @example
     * // Delete a few ListingInterests
     * const { count } = await prisma.listingInterest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ListingInterestDeleteManyArgs>(args?: SelectSubset<T, ListingInterestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ListingInterests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingInterestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ListingInterests
     * const listingInterest = await prisma.listingInterest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ListingInterestUpdateManyArgs>(args: SelectSubset<T, ListingInterestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ListingInterests and returns the data updated in the database.
     * @param {ListingInterestUpdateManyAndReturnArgs} args - Arguments to update many ListingInterests.
     * @example
     * // Update many ListingInterests
     * const listingInterest = await prisma.listingInterest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ListingInterests and only return the `id`
     * const listingInterestWithIdOnly = await prisma.listingInterest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ListingInterestUpdateManyAndReturnArgs>(args: SelectSubset<T, ListingInterestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingInterestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ListingInterest.
     * @param {ListingInterestUpsertArgs} args - Arguments to update or create a ListingInterest.
     * @example
     * // Update or create a ListingInterest
     * const listingInterest = await prisma.listingInterest.upsert({
     *   create: {
     *     // ... data to create a ListingInterest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ListingInterest we want to update
     *   }
     * })
     */
    upsert<T extends ListingInterestUpsertArgs>(args: SelectSubset<T, ListingInterestUpsertArgs<ExtArgs>>): Prisma__ListingInterestClient<$Result.GetResult<Prisma.$ListingInterestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ListingInterests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingInterestCountArgs} args - Arguments to filter ListingInterests to count.
     * @example
     * // Count the number of ListingInterests
     * const count = await prisma.listingInterest.count({
     *   where: {
     *     // ... the filter for the ListingInterests we want to count
     *   }
     * })
    **/
    count<T extends ListingInterestCountArgs>(
      args?: Subset<T, ListingInterestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ListingInterestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ListingInterest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingInterestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ListingInterestAggregateArgs>(args: Subset<T, ListingInterestAggregateArgs>): Prisma.PrismaPromise<GetListingInterestAggregateType<T>>

    /**
     * Group by ListingInterest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingInterestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ListingInterestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ListingInterestGroupByArgs['orderBy'] }
        : { orderBy?: ListingInterestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ListingInterestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetListingInterestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ListingInterest model
   */
  readonly fields: ListingInterestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ListingInterest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ListingInterestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    listing<T extends ListingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ListingDefaultArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    buyer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ListingInterest model
   */
  interface ListingInterestFieldRefs {
    readonly id: FieldRef<"ListingInterest", 'String'>
    readonly listingId: FieldRef<"ListingInterest", 'String'>
    readonly buyerId: FieldRef<"ListingInterest", 'String'>
    readonly createdAt: FieldRef<"ListingInterest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ListingInterest findUnique
   */
  export type ListingInterestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingInterest
     */
    select?: ListingInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListingInterest
     */
    omit?: ListingInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInterestInclude<ExtArgs> | null
    /**
     * Filter, which ListingInterest to fetch.
     */
    where: ListingInterestWhereUniqueInput
  }

  /**
   * ListingInterest findUniqueOrThrow
   */
  export type ListingInterestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingInterest
     */
    select?: ListingInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListingInterest
     */
    omit?: ListingInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInterestInclude<ExtArgs> | null
    /**
     * Filter, which ListingInterest to fetch.
     */
    where: ListingInterestWhereUniqueInput
  }

  /**
   * ListingInterest findFirst
   */
  export type ListingInterestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingInterest
     */
    select?: ListingInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListingInterest
     */
    omit?: ListingInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInterestInclude<ExtArgs> | null
    /**
     * Filter, which ListingInterest to fetch.
     */
    where?: ListingInterestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListingInterests to fetch.
     */
    orderBy?: ListingInterestOrderByWithRelationInput | ListingInterestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ListingInterests.
     */
    cursor?: ListingInterestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListingInterests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListingInterests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ListingInterests.
     */
    distinct?: ListingInterestScalarFieldEnum | ListingInterestScalarFieldEnum[]
  }

  /**
   * ListingInterest findFirstOrThrow
   */
  export type ListingInterestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingInterest
     */
    select?: ListingInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListingInterest
     */
    omit?: ListingInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInterestInclude<ExtArgs> | null
    /**
     * Filter, which ListingInterest to fetch.
     */
    where?: ListingInterestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListingInterests to fetch.
     */
    orderBy?: ListingInterestOrderByWithRelationInput | ListingInterestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ListingInterests.
     */
    cursor?: ListingInterestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListingInterests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListingInterests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ListingInterests.
     */
    distinct?: ListingInterestScalarFieldEnum | ListingInterestScalarFieldEnum[]
  }

  /**
   * ListingInterest findMany
   */
  export type ListingInterestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingInterest
     */
    select?: ListingInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListingInterest
     */
    omit?: ListingInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInterestInclude<ExtArgs> | null
    /**
     * Filter, which ListingInterests to fetch.
     */
    where?: ListingInterestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListingInterests to fetch.
     */
    orderBy?: ListingInterestOrderByWithRelationInput | ListingInterestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ListingInterests.
     */
    cursor?: ListingInterestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListingInterests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListingInterests.
     */
    skip?: number
    distinct?: ListingInterestScalarFieldEnum | ListingInterestScalarFieldEnum[]
  }

  /**
   * ListingInterest create
   */
  export type ListingInterestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingInterest
     */
    select?: ListingInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListingInterest
     */
    omit?: ListingInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInterestInclude<ExtArgs> | null
    /**
     * The data needed to create a ListingInterest.
     */
    data: XOR<ListingInterestCreateInput, ListingInterestUncheckedCreateInput>
  }

  /**
   * ListingInterest createMany
   */
  export type ListingInterestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ListingInterests.
     */
    data: ListingInterestCreateManyInput | ListingInterestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ListingInterest createManyAndReturn
   */
  export type ListingInterestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingInterest
     */
    select?: ListingInterestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ListingInterest
     */
    omit?: ListingInterestOmit<ExtArgs> | null
    /**
     * The data used to create many ListingInterests.
     */
    data: ListingInterestCreateManyInput | ListingInterestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInterestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ListingInterest update
   */
  export type ListingInterestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingInterest
     */
    select?: ListingInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListingInterest
     */
    omit?: ListingInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInterestInclude<ExtArgs> | null
    /**
     * The data needed to update a ListingInterest.
     */
    data: XOR<ListingInterestUpdateInput, ListingInterestUncheckedUpdateInput>
    /**
     * Choose, which ListingInterest to update.
     */
    where: ListingInterestWhereUniqueInput
  }

  /**
   * ListingInterest updateMany
   */
  export type ListingInterestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ListingInterests.
     */
    data: XOR<ListingInterestUpdateManyMutationInput, ListingInterestUncheckedUpdateManyInput>
    /**
     * Filter which ListingInterests to update
     */
    where?: ListingInterestWhereInput
    /**
     * Limit how many ListingInterests to update.
     */
    limit?: number
  }

  /**
   * ListingInterest updateManyAndReturn
   */
  export type ListingInterestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingInterest
     */
    select?: ListingInterestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ListingInterest
     */
    omit?: ListingInterestOmit<ExtArgs> | null
    /**
     * The data used to update ListingInterests.
     */
    data: XOR<ListingInterestUpdateManyMutationInput, ListingInterestUncheckedUpdateManyInput>
    /**
     * Filter which ListingInterests to update
     */
    where?: ListingInterestWhereInput
    /**
     * Limit how many ListingInterests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInterestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ListingInterest upsert
   */
  export type ListingInterestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingInterest
     */
    select?: ListingInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListingInterest
     */
    omit?: ListingInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInterestInclude<ExtArgs> | null
    /**
     * The filter to search for the ListingInterest to update in case it exists.
     */
    where: ListingInterestWhereUniqueInput
    /**
     * In case the ListingInterest found by the `where` argument doesn't exist, create a new ListingInterest with this data.
     */
    create: XOR<ListingInterestCreateInput, ListingInterestUncheckedCreateInput>
    /**
     * In case the ListingInterest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ListingInterestUpdateInput, ListingInterestUncheckedUpdateInput>
  }

  /**
   * ListingInterest delete
   */
  export type ListingInterestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingInterest
     */
    select?: ListingInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListingInterest
     */
    omit?: ListingInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInterestInclude<ExtArgs> | null
    /**
     * Filter which ListingInterest to delete.
     */
    where: ListingInterestWhereUniqueInput
  }

  /**
   * ListingInterest deleteMany
   */
  export type ListingInterestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ListingInterests to delete
     */
    where?: ListingInterestWhereInput
    /**
     * Limit how many ListingInterests to delete.
     */
    limit?: number
  }

  /**
   * ListingInterest without action
   */
  export type ListingInterestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingInterest
     */
    select?: ListingInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListingInterest
     */
    omit?: ListingInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInterestInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    quantity: Decimal | null
    pricePerUnitAtOrder: Decimal | null
    latestLatitude: number | null
    latestLongitude: number | null
  }

  export type OrderSumAggregateOutputType = {
    quantity: Decimal | null
    pricePerUnitAtOrder: Decimal | null
    latestLatitude: number | null
    latestLongitude: number | null
  }

  export type OrderMinAggregateOutputType = {
    id: string | null
    listingId: string | null
    buyerId: string | null
    farmerId: string | null
    quantity: Decimal | null
    pricePerUnitAtOrder: Decimal | null
    status: $Enums.OrderStatus | null
    latestLatitude: number | null
    latestLongitude: number | null
    locationReportedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderMaxAggregateOutputType = {
    id: string | null
    listingId: string | null
    buyerId: string | null
    farmerId: string | null
    quantity: Decimal | null
    pricePerUnitAtOrder: Decimal | null
    status: $Enums.OrderStatus | null
    latestLatitude: number | null
    latestLongitude: number | null
    locationReportedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    listingId: number
    buyerId: number
    farmerId: number
    quantity: number
    pricePerUnitAtOrder: number
    status: number
    latestLatitude: number
    latestLongitude: number
    locationReportedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    quantity?: true
    pricePerUnitAtOrder?: true
    latestLatitude?: true
    latestLongitude?: true
  }

  export type OrderSumAggregateInputType = {
    quantity?: true
    pricePerUnitAtOrder?: true
    latestLatitude?: true
    latestLongitude?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    listingId?: true
    buyerId?: true
    farmerId?: true
    quantity?: true
    pricePerUnitAtOrder?: true
    status?: true
    latestLatitude?: true
    latestLongitude?: true
    locationReportedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    listingId?: true
    buyerId?: true
    farmerId?: true
    quantity?: true
    pricePerUnitAtOrder?: true
    status?: true
    latestLatitude?: true
    latestLongitude?: true
    locationReportedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    listingId?: true
    buyerId?: true
    farmerId?: true
    quantity?: true
    pricePerUnitAtOrder?: true
    status?: true
    latestLatitude?: true
    latestLongitude?: true
    locationReportedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: string
    listingId: string
    buyerId: string
    farmerId: string
    quantity: Decimal
    pricePerUnitAtOrder: Decimal
    status: $Enums.OrderStatus
    latestLatitude: number | null
    latestLongitude: number | null
    locationReportedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    listingId?: boolean
    buyerId?: boolean
    farmerId?: boolean
    quantity?: boolean
    pricePerUnitAtOrder?: boolean
    status?: boolean
    latestLatitude?: boolean
    latestLongitude?: boolean
    locationReportedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
    farmer?: boolean | UserDefaultArgs<ExtArgs>
    review?: boolean | Order$reviewArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    listingId?: boolean
    buyerId?: boolean
    farmerId?: boolean
    quantity?: boolean
    pricePerUnitAtOrder?: boolean
    status?: boolean
    latestLatitude?: boolean
    latestLongitude?: boolean
    locationReportedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
    farmer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    listingId?: boolean
    buyerId?: boolean
    farmerId?: boolean
    quantity?: boolean
    pricePerUnitAtOrder?: boolean
    status?: boolean
    latestLatitude?: boolean
    latestLongitude?: boolean
    locationReportedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
    farmer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectScalar = {
    id?: boolean
    listingId?: boolean
    buyerId?: boolean
    farmerId?: boolean
    quantity?: boolean
    pricePerUnitAtOrder?: boolean
    status?: boolean
    latestLatitude?: boolean
    latestLongitude?: boolean
    locationReportedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "listingId" | "buyerId" | "farmerId" | "quantity" | "pricePerUnitAtOrder" | "status" | "latestLatitude" | "latestLongitude" | "locationReportedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["order"]>
  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
    farmer?: boolean | UserDefaultArgs<ExtArgs>
    review?: boolean | Order$reviewArgs<ExtArgs>
  }
  export type OrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
    farmer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
    farmer?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      listing: Prisma.$ListingPayload<ExtArgs>
      buyer: Prisma.$UserPayload<ExtArgs>
      farmer: Prisma.$UserPayload<ExtArgs>
      review: Prisma.$ReviewPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      listingId: string
      buyerId: string
      farmerId: string
      quantity: Prisma.Decimal
      pricePerUnitAtOrder: Prisma.Decimal
      status: $Enums.OrderStatus
      latestLatitude: number | null
      latestLongitude: number | null
      locationReportedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders and returns the data updated in the database.
     * @param {OrderUpdateManyAndReturnArgs} args - Arguments to update many Orders.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    listing<T extends ListingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ListingDefaultArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    buyer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    farmer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    review<T extends Order$reviewArgs<ExtArgs> = {}>(args?: Subset<T, Order$reviewArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'String'>
    readonly listingId: FieldRef<"Order", 'String'>
    readonly buyerId: FieldRef<"Order", 'String'>
    readonly farmerId: FieldRef<"Order", 'String'>
    readonly quantity: FieldRef<"Order", 'Decimal'>
    readonly pricePerUnitAtOrder: FieldRef<"Order", 'Decimal'>
    readonly status: FieldRef<"Order", 'OrderStatus'>
    readonly latestLatitude: FieldRef<"Order", 'Float'>
    readonly latestLongitude: FieldRef<"Order", 'Float'>
    readonly locationReportedAt: FieldRef<"Order", 'DateTime'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
    readonly updatedAt: FieldRef<"Order", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order updateManyAndReturn
   */
  export type OrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to delete.
     */
    limit?: number
  }

  /**
   * Order.review
   */
  export type Order$reviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model Review
   */

  export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  export type ReviewAvgAggregateOutputType = {
    rating: number | null
  }

  export type ReviewSumAggregateOutputType = {
    rating: number | null
  }

  export type ReviewMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    farmerId: string | null
    buyerId: string | null
    rating: number | null
    comment: string | null
    createdAt: Date | null
  }

  export type ReviewMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    farmerId: string | null
    buyerId: string | null
    rating: number | null
    comment: string | null
    createdAt: Date | null
  }

  export type ReviewCountAggregateOutputType = {
    id: number
    orderId: number
    farmerId: number
    buyerId: number
    rating: number
    comment: number
    createdAt: number
    _all: number
  }


  export type ReviewAvgAggregateInputType = {
    rating?: true
  }

  export type ReviewSumAggregateInputType = {
    rating?: true
  }

  export type ReviewMinAggregateInputType = {
    id?: true
    orderId?: true
    farmerId?: true
    buyerId?: true
    rating?: true
    comment?: true
    createdAt?: true
  }

  export type ReviewMaxAggregateInputType = {
    id?: true
    orderId?: true
    farmerId?: true
    buyerId?: true
    rating?: true
    comment?: true
    createdAt?: true
  }

  export type ReviewCountAggregateInputType = {
    id?: true
    orderId?: true
    farmerId?: true
    buyerId?: true
    rating?: true
    comment?: true
    createdAt?: true
    _all?: true
  }

  export type ReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Review to aggregate.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reviews
    **/
    _count?: true | ReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewMaxAggregateInputType
  }

  export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReview[P]>
      : GetScalarType<T[P], AggregateReview[P]>
  }




  export type ReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithAggregationInput | ReviewOrderByWithAggregationInput[]
    by: ReviewScalarFieldEnum[] | ReviewScalarFieldEnum
    having?: ReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewCountAggregateInputType | true
    _avg?: ReviewAvgAggregateInputType
    _sum?: ReviewSumAggregateInputType
    _min?: ReviewMinAggregateInputType
    _max?: ReviewMaxAggregateInputType
  }

  export type ReviewGroupByOutputType = {
    id: string
    orderId: string
    farmerId: string
    buyerId: string
    rating: number
    comment: string | null
    createdAt: Date
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  type GetReviewGroupByPayload<T extends ReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewGroupByOutputType[P]>
        }
      >
    >


  export type ReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    farmerId?: boolean
    buyerId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    farmer?: boolean | UserDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    farmerId?: boolean
    buyerId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    farmer?: boolean | UserDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    farmerId?: boolean
    buyerId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    farmer?: boolean | UserDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectScalar = {
    id?: boolean
    orderId?: boolean
    farmerId?: boolean
    buyerId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
  }

  export type ReviewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "farmerId" | "buyerId" | "rating" | "comment" | "createdAt", ExtArgs["result"]["review"]>
  export type ReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    farmer?: boolean | UserDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReviewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    farmer?: boolean | UserDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReviewIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    farmer?: boolean | UserDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Review"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
      farmer: Prisma.$UserPayload<ExtArgs>
      buyer: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      farmerId: string
      buyerId: string
      rating: number
      comment: string | null
      createdAt: Date
    }, ExtArgs["result"]["review"]>
    composites: {}
  }

  type ReviewGetPayload<S extends boolean | null | undefined | ReviewDefaultArgs> = $Result.GetResult<Prisma.$ReviewPayload, S>

  type ReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReviewCountAggregateInputType | true
    }

  export interface ReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Review'], meta: { name: 'Review' } }
    /**
     * Find zero or one Review that matches the filter.
     * @param {ReviewFindUniqueArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReviewFindUniqueArgs>(args: SelectSubset<T, ReviewFindUniqueArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Review that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReviewFindUniqueOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, ReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReviewFindFirstArgs>(args?: SelectSubset<T, ReviewFindFirstArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, ReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.review.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.review.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewWithIdOnly = await prisma.review.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReviewFindManyArgs>(args?: SelectSubset<T, ReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Review.
     * @param {ReviewCreateArgs} args - Arguments to create a Review.
     * @example
     * // Create one Review
     * const Review = await prisma.review.create({
     *   data: {
     *     // ... data to create a Review
     *   }
     * })
     * 
     */
    create<T extends ReviewCreateArgs>(args: SelectSubset<T, ReviewCreateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reviews.
     * @param {ReviewCreateManyArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReviewCreateManyArgs>(args?: SelectSubset<T, ReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reviews and returns the data saved in the database.
     * @param {ReviewCreateManyAndReturnArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reviews and only return the `id`
     * const reviewWithIdOnly = await prisma.review.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReviewCreateManyAndReturnArgs>(args?: SelectSubset<T, ReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Review.
     * @param {ReviewDeleteArgs} args - Arguments to delete one Review.
     * @example
     * // Delete one Review
     * const Review = await prisma.review.delete({
     *   where: {
     *     // ... filter to delete one Review
     *   }
     * })
     * 
     */
    delete<T extends ReviewDeleteArgs>(args: SelectSubset<T, ReviewDeleteArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Review.
     * @param {ReviewUpdateArgs} args - Arguments to update one Review.
     * @example
     * // Update one Review
     * const review = await prisma.review.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReviewUpdateArgs>(args: SelectSubset<T, ReviewUpdateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reviews.
     * @param {ReviewDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.review.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReviewDeleteManyArgs>(args?: SelectSubset<T, ReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReviewUpdateManyArgs>(args: SelectSubset<T, ReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews and returns the data updated in the database.
     * @param {ReviewUpdateManyAndReturnArgs} args - Arguments to update many Reviews.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reviews and only return the `id`
     * const reviewWithIdOnly = await prisma.review.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReviewUpdateManyAndReturnArgs>(args: SelectSubset<T, ReviewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Review.
     * @param {ReviewUpsertArgs} args - Arguments to update or create a Review.
     * @example
     * // Update or create a Review
     * const review = await prisma.review.upsert({
     *   create: {
     *     // ... data to create a Review
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Review we want to update
     *   }
     * })
     */
    upsert<T extends ReviewUpsertArgs>(args: SelectSubset<T, ReviewUpsertArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.review.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends ReviewCountArgs>(
      args?: Subset<T, ReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewAggregateArgs>(args: Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>

    /**
     * Group by Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewGroupByArgs['orderBy'] }
        : { orderBy?: ReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Review model
   */
  readonly fields: ReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Review.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    farmer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    buyer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Review model
   */
  interface ReviewFieldRefs {
    readonly id: FieldRef<"Review", 'String'>
    readonly orderId: FieldRef<"Review", 'String'>
    readonly farmerId: FieldRef<"Review", 'String'>
    readonly buyerId: FieldRef<"Review", 'String'>
    readonly rating: FieldRef<"Review", 'Int'>
    readonly comment: FieldRef<"Review", 'String'>
    readonly createdAt: FieldRef<"Review", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Review findUnique
   */
  export type ReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findUniqueOrThrow
   */
  export type ReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findFirst
   */
  export type ReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findFirstOrThrow
   */
  export type ReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findMany
   */
  export type ReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Reviews to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review create
   */
  export type ReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a Review.
     */
    data: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
  }

  /**
   * Review createMany
   */
  export type ReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Review createManyAndReturn
   */
  export type ReviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Review update
   */
  export type ReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a Review.
     */
    data: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
    /**
     * Choose, which Review to update.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review updateMany
   */
  export type ReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to update.
     */
    limit?: number
  }

  /**
   * Review updateManyAndReturn
   */
  export type ReviewUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Review upsert
   */
  export type ReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the Review to update in case it exists.
     */
    where: ReviewWhereUniqueInput
    /**
     * In case the Review found by the `where` argument doesn't exist, create a new Review with this data.
     */
    create: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
    /**
     * In case the Review was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
  }

  /**
   * Review delete
   */
  export type ReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter which Review to delete.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review deleteMany
   */
  export type ReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reviews to delete
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to delete.
     */
    limit?: number
  }

  /**
   * Review without action
   */
  export type ReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
  }


  /**
   * Model SavedListing
   */

  export type AggregateSavedListing = {
    _count: SavedListingCountAggregateOutputType | null
    _min: SavedListingMinAggregateOutputType | null
    _max: SavedListingMaxAggregateOutputType | null
  }

  export type SavedListingMinAggregateOutputType = {
    id: string | null
    listingId: string | null
    buyerId: string | null
    createdAt: Date | null
  }

  export type SavedListingMaxAggregateOutputType = {
    id: string | null
    listingId: string | null
    buyerId: string | null
    createdAt: Date | null
  }

  export type SavedListingCountAggregateOutputType = {
    id: number
    listingId: number
    buyerId: number
    createdAt: number
    _all: number
  }


  export type SavedListingMinAggregateInputType = {
    id?: true
    listingId?: true
    buyerId?: true
    createdAt?: true
  }

  export type SavedListingMaxAggregateInputType = {
    id?: true
    listingId?: true
    buyerId?: true
    createdAt?: true
  }

  export type SavedListingCountAggregateInputType = {
    id?: true
    listingId?: true
    buyerId?: true
    createdAt?: true
    _all?: true
  }

  export type SavedListingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SavedListing to aggregate.
     */
    where?: SavedListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedListings to fetch.
     */
    orderBy?: SavedListingOrderByWithRelationInput | SavedListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SavedListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SavedListings
    **/
    _count?: true | SavedListingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SavedListingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SavedListingMaxAggregateInputType
  }

  export type GetSavedListingAggregateType<T extends SavedListingAggregateArgs> = {
        [P in keyof T & keyof AggregateSavedListing]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSavedListing[P]>
      : GetScalarType<T[P], AggregateSavedListing[P]>
  }




  export type SavedListingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SavedListingWhereInput
    orderBy?: SavedListingOrderByWithAggregationInput | SavedListingOrderByWithAggregationInput[]
    by: SavedListingScalarFieldEnum[] | SavedListingScalarFieldEnum
    having?: SavedListingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SavedListingCountAggregateInputType | true
    _min?: SavedListingMinAggregateInputType
    _max?: SavedListingMaxAggregateInputType
  }

  export type SavedListingGroupByOutputType = {
    id: string
    listingId: string
    buyerId: string
    createdAt: Date
    _count: SavedListingCountAggregateOutputType | null
    _min: SavedListingMinAggregateOutputType | null
    _max: SavedListingMaxAggregateOutputType | null
  }

  type GetSavedListingGroupByPayload<T extends SavedListingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SavedListingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SavedListingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SavedListingGroupByOutputType[P]>
            : GetScalarType<T[P], SavedListingGroupByOutputType[P]>
        }
      >
    >


  export type SavedListingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    listingId?: boolean
    buyerId?: boolean
    createdAt?: boolean
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["savedListing"]>

  export type SavedListingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    listingId?: boolean
    buyerId?: boolean
    createdAt?: boolean
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["savedListing"]>

  export type SavedListingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    listingId?: boolean
    buyerId?: boolean
    createdAt?: boolean
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["savedListing"]>

  export type SavedListingSelectScalar = {
    id?: boolean
    listingId?: boolean
    buyerId?: boolean
    createdAt?: boolean
  }

  export type SavedListingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "listingId" | "buyerId" | "createdAt", ExtArgs["result"]["savedListing"]>
  export type SavedListingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SavedListingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SavedListingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SavedListingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SavedListing"
    objects: {
      listing: Prisma.$ListingPayload<ExtArgs>
      buyer: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      listingId: string
      buyerId: string
      createdAt: Date
    }, ExtArgs["result"]["savedListing"]>
    composites: {}
  }

  type SavedListingGetPayload<S extends boolean | null | undefined | SavedListingDefaultArgs> = $Result.GetResult<Prisma.$SavedListingPayload, S>

  type SavedListingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SavedListingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SavedListingCountAggregateInputType | true
    }

  export interface SavedListingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SavedListing'], meta: { name: 'SavedListing' } }
    /**
     * Find zero or one SavedListing that matches the filter.
     * @param {SavedListingFindUniqueArgs} args - Arguments to find a SavedListing
     * @example
     * // Get one SavedListing
     * const savedListing = await prisma.savedListing.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SavedListingFindUniqueArgs>(args: SelectSubset<T, SavedListingFindUniqueArgs<ExtArgs>>): Prisma__SavedListingClient<$Result.GetResult<Prisma.$SavedListingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SavedListing that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SavedListingFindUniqueOrThrowArgs} args - Arguments to find a SavedListing
     * @example
     * // Get one SavedListing
     * const savedListing = await prisma.savedListing.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SavedListingFindUniqueOrThrowArgs>(args: SelectSubset<T, SavedListingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SavedListingClient<$Result.GetResult<Prisma.$SavedListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SavedListing that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedListingFindFirstArgs} args - Arguments to find a SavedListing
     * @example
     * // Get one SavedListing
     * const savedListing = await prisma.savedListing.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SavedListingFindFirstArgs>(args?: SelectSubset<T, SavedListingFindFirstArgs<ExtArgs>>): Prisma__SavedListingClient<$Result.GetResult<Prisma.$SavedListingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SavedListing that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedListingFindFirstOrThrowArgs} args - Arguments to find a SavedListing
     * @example
     * // Get one SavedListing
     * const savedListing = await prisma.savedListing.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SavedListingFindFirstOrThrowArgs>(args?: SelectSubset<T, SavedListingFindFirstOrThrowArgs<ExtArgs>>): Prisma__SavedListingClient<$Result.GetResult<Prisma.$SavedListingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SavedListings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedListingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SavedListings
     * const savedListings = await prisma.savedListing.findMany()
     * 
     * // Get first 10 SavedListings
     * const savedListings = await prisma.savedListing.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const savedListingWithIdOnly = await prisma.savedListing.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SavedListingFindManyArgs>(args?: SelectSubset<T, SavedListingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SavedListing.
     * @param {SavedListingCreateArgs} args - Arguments to create a SavedListing.
     * @example
     * // Create one SavedListing
     * const SavedListing = await prisma.savedListing.create({
     *   data: {
     *     // ... data to create a SavedListing
     *   }
     * })
     * 
     */
    create<T extends SavedListingCreateArgs>(args: SelectSubset<T, SavedListingCreateArgs<ExtArgs>>): Prisma__SavedListingClient<$Result.GetResult<Prisma.$SavedListingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SavedListings.
     * @param {SavedListingCreateManyArgs} args - Arguments to create many SavedListings.
     * @example
     * // Create many SavedListings
     * const savedListing = await prisma.savedListing.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SavedListingCreateManyArgs>(args?: SelectSubset<T, SavedListingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SavedListings and returns the data saved in the database.
     * @param {SavedListingCreateManyAndReturnArgs} args - Arguments to create many SavedListings.
     * @example
     * // Create many SavedListings
     * const savedListing = await prisma.savedListing.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SavedListings and only return the `id`
     * const savedListingWithIdOnly = await prisma.savedListing.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SavedListingCreateManyAndReturnArgs>(args?: SelectSubset<T, SavedListingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedListingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SavedListing.
     * @param {SavedListingDeleteArgs} args - Arguments to delete one SavedListing.
     * @example
     * // Delete one SavedListing
     * const SavedListing = await prisma.savedListing.delete({
     *   where: {
     *     // ... filter to delete one SavedListing
     *   }
     * })
     * 
     */
    delete<T extends SavedListingDeleteArgs>(args: SelectSubset<T, SavedListingDeleteArgs<ExtArgs>>): Prisma__SavedListingClient<$Result.GetResult<Prisma.$SavedListingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SavedListing.
     * @param {SavedListingUpdateArgs} args - Arguments to update one SavedListing.
     * @example
     * // Update one SavedListing
     * const savedListing = await prisma.savedListing.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SavedListingUpdateArgs>(args: SelectSubset<T, SavedListingUpdateArgs<ExtArgs>>): Prisma__SavedListingClient<$Result.GetResult<Prisma.$SavedListingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SavedListings.
     * @param {SavedListingDeleteManyArgs} args - Arguments to filter SavedListings to delete.
     * @example
     * // Delete a few SavedListings
     * const { count } = await prisma.savedListing.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SavedListingDeleteManyArgs>(args?: SelectSubset<T, SavedListingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SavedListings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedListingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SavedListings
     * const savedListing = await prisma.savedListing.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SavedListingUpdateManyArgs>(args: SelectSubset<T, SavedListingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SavedListings and returns the data updated in the database.
     * @param {SavedListingUpdateManyAndReturnArgs} args - Arguments to update many SavedListings.
     * @example
     * // Update many SavedListings
     * const savedListing = await prisma.savedListing.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SavedListings and only return the `id`
     * const savedListingWithIdOnly = await prisma.savedListing.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SavedListingUpdateManyAndReturnArgs>(args: SelectSubset<T, SavedListingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedListingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SavedListing.
     * @param {SavedListingUpsertArgs} args - Arguments to update or create a SavedListing.
     * @example
     * // Update or create a SavedListing
     * const savedListing = await prisma.savedListing.upsert({
     *   create: {
     *     // ... data to create a SavedListing
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SavedListing we want to update
     *   }
     * })
     */
    upsert<T extends SavedListingUpsertArgs>(args: SelectSubset<T, SavedListingUpsertArgs<ExtArgs>>): Prisma__SavedListingClient<$Result.GetResult<Prisma.$SavedListingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SavedListings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedListingCountArgs} args - Arguments to filter SavedListings to count.
     * @example
     * // Count the number of SavedListings
     * const count = await prisma.savedListing.count({
     *   where: {
     *     // ... the filter for the SavedListings we want to count
     *   }
     * })
    **/
    count<T extends SavedListingCountArgs>(
      args?: Subset<T, SavedListingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SavedListingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SavedListing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedListingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SavedListingAggregateArgs>(args: Subset<T, SavedListingAggregateArgs>): Prisma.PrismaPromise<GetSavedListingAggregateType<T>>

    /**
     * Group by SavedListing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedListingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SavedListingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SavedListingGroupByArgs['orderBy'] }
        : { orderBy?: SavedListingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SavedListingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSavedListingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SavedListing model
   */
  readonly fields: SavedListingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SavedListing.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SavedListingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    listing<T extends ListingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ListingDefaultArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    buyer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SavedListing model
   */
  interface SavedListingFieldRefs {
    readonly id: FieldRef<"SavedListing", 'String'>
    readonly listingId: FieldRef<"SavedListing", 'String'>
    readonly buyerId: FieldRef<"SavedListing", 'String'>
    readonly createdAt: FieldRef<"SavedListing", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SavedListing findUnique
   */
  export type SavedListingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedListing
     */
    select?: SavedListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedListing
     */
    omit?: SavedListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedListingInclude<ExtArgs> | null
    /**
     * Filter, which SavedListing to fetch.
     */
    where: SavedListingWhereUniqueInput
  }

  /**
   * SavedListing findUniqueOrThrow
   */
  export type SavedListingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedListing
     */
    select?: SavedListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedListing
     */
    omit?: SavedListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedListingInclude<ExtArgs> | null
    /**
     * Filter, which SavedListing to fetch.
     */
    where: SavedListingWhereUniqueInput
  }

  /**
   * SavedListing findFirst
   */
  export type SavedListingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedListing
     */
    select?: SavedListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedListing
     */
    omit?: SavedListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedListingInclude<ExtArgs> | null
    /**
     * Filter, which SavedListing to fetch.
     */
    where?: SavedListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedListings to fetch.
     */
    orderBy?: SavedListingOrderByWithRelationInput | SavedListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SavedListings.
     */
    cursor?: SavedListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SavedListings.
     */
    distinct?: SavedListingScalarFieldEnum | SavedListingScalarFieldEnum[]
  }

  /**
   * SavedListing findFirstOrThrow
   */
  export type SavedListingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedListing
     */
    select?: SavedListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedListing
     */
    omit?: SavedListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedListingInclude<ExtArgs> | null
    /**
     * Filter, which SavedListing to fetch.
     */
    where?: SavedListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedListings to fetch.
     */
    orderBy?: SavedListingOrderByWithRelationInput | SavedListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SavedListings.
     */
    cursor?: SavedListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SavedListings.
     */
    distinct?: SavedListingScalarFieldEnum | SavedListingScalarFieldEnum[]
  }

  /**
   * SavedListing findMany
   */
  export type SavedListingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedListing
     */
    select?: SavedListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedListing
     */
    omit?: SavedListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedListingInclude<ExtArgs> | null
    /**
     * Filter, which SavedListings to fetch.
     */
    where?: SavedListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedListings to fetch.
     */
    orderBy?: SavedListingOrderByWithRelationInput | SavedListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SavedListings.
     */
    cursor?: SavedListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedListings.
     */
    skip?: number
    distinct?: SavedListingScalarFieldEnum | SavedListingScalarFieldEnum[]
  }

  /**
   * SavedListing create
   */
  export type SavedListingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedListing
     */
    select?: SavedListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedListing
     */
    omit?: SavedListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedListingInclude<ExtArgs> | null
    /**
     * The data needed to create a SavedListing.
     */
    data: XOR<SavedListingCreateInput, SavedListingUncheckedCreateInput>
  }

  /**
   * SavedListing createMany
   */
  export type SavedListingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SavedListings.
     */
    data: SavedListingCreateManyInput | SavedListingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SavedListing createManyAndReturn
   */
  export type SavedListingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedListing
     */
    select?: SavedListingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SavedListing
     */
    omit?: SavedListingOmit<ExtArgs> | null
    /**
     * The data used to create many SavedListings.
     */
    data: SavedListingCreateManyInput | SavedListingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedListingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SavedListing update
   */
  export type SavedListingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedListing
     */
    select?: SavedListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedListing
     */
    omit?: SavedListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedListingInclude<ExtArgs> | null
    /**
     * The data needed to update a SavedListing.
     */
    data: XOR<SavedListingUpdateInput, SavedListingUncheckedUpdateInput>
    /**
     * Choose, which SavedListing to update.
     */
    where: SavedListingWhereUniqueInput
  }

  /**
   * SavedListing updateMany
   */
  export type SavedListingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SavedListings.
     */
    data: XOR<SavedListingUpdateManyMutationInput, SavedListingUncheckedUpdateManyInput>
    /**
     * Filter which SavedListings to update
     */
    where?: SavedListingWhereInput
    /**
     * Limit how many SavedListings to update.
     */
    limit?: number
  }

  /**
   * SavedListing updateManyAndReturn
   */
  export type SavedListingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedListing
     */
    select?: SavedListingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SavedListing
     */
    omit?: SavedListingOmit<ExtArgs> | null
    /**
     * The data used to update SavedListings.
     */
    data: XOR<SavedListingUpdateManyMutationInput, SavedListingUncheckedUpdateManyInput>
    /**
     * Filter which SavedListings to update
     */
    where?: SavedListingWhereInput
    /**
     * Limit how many SavedListings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedListingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SavedListing upsert
   */
  export type SavedListingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedListing
     */
    select?: SavedListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedListing
     */
    omit?: SavedListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedListingInclude<ExtArgs> | null
    /**
     * The filter to search for the SavedListing to update in case it exists.
     */
    where: SavedListingWhereUniqueInput
    /**
     * In case the SavedListing found by the `where` argument doesn't exist, create a new SavedListing with this data.
     */
    create: XOR<SavedListingCreateInput, SavedListingUncheckedCreateInput>
    /**
     * In case the SavedListing was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SavedListingUpdateInput, SavedListingUncheckedUpdateInput>
  }

  /**
   * SavedListing delete
   */
  export type SavedListingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedListing
     */
    select?: SavedListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedListing
     */
    omit?: SavedListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedListingInclude<ExtArgs> | null
    /**
     * Filter which SavedListing to delete.
     */
    where: SavedListingWhereUniqueInput
  }

  /**
   * SavedListing deleteMany
   */
  export type SavedListingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SavedListings to delete
     */
    where?: SavedListingWhereInput
    /**
     * Limit how many SavedListings to delete.
     */
    limit?: number
  }

  /**
   * SavedListing without action
   */
  export type SavedListingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedListing
     */
    select?: SavedListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedListing
     */
    omit?: SavedListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedListingInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: $Enums.NotificationType | null
    title: string | null
    body: string | null
    orderId: string | null
    listingId: string | null
    isRead: boolean | null
    createdAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: $Enums.NotificationType | null
    title: string | null
    body: string | null
    orderId: string | null
    listingId: string | null
    isRead: boolean | null
    createdAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    title: number
    body: number
    orderId: number
    listingId: number
    isRead: number
    createdAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    title?: true
    body?: true
    orderId?: true
    listingId?: true
    isRead?: true
    createdAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    title?: true
    body?: true
    orderId?: true
    listingId?: true
    isRead?: true
    createdAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    title?: true
    body?: true
    orderId?: true
    listingId?: true
    isRead?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    userId: string
    type: $Enums.NotificationType
    title: string
    body: string
    orderId: string | null
    listingId: string | null
    isRead: boolean
    createdAt: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    title?: boolean
    body?: boolean
    orderId?: boolean
    listingId?: boolean
    isRead?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    title?: boolean
    body?: boolean
    orderId?: boolean
    listingId?: boolean
    isRead?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    title?: boolean
    body?: boolean
    orderId?: boolean
    listingId?: boolean
    isRead?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    title?: boolean
    body?: boolean
    orderId?: boolean
    listingId?: boolean
    isRead?: boolean
    createdAt?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "title" | "body" | "orderId" | "listingId" | "isRead" | "createdAt", ExtArgs["result"]["notification"]>
  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: $Enums.NotificationType
      title: string
      body: string
      orderId: string | null
      listingId: string | null
      isRead: boolean
      createdAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly userId: FieldRef<"Notification", 'String'>
    readonly type: FieldRef<"Notification", 'NotificationType'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly body: FieldRef<"Notification", 'String'>
    readonly orderId: FieldRef<"Notification", 'String'>
    readonly listingId: FieldRef<"Notification", 'String'>
    readonly isRead: FieldRef<"Notification", 'Boolean'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    fullName: 'fullName',
    role: 'role',
    phone: 'phone',
    phoneVerifiedAt: 'phoneVerifiedAt',
    accountStatus: 'accountStatus',
    profileImageUrl: 'profileImageUrl',
    lastLoginAt: 'lastLoginAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const OAuthAccountScalarFieldEnum: {
    id: 'id',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    email: 'email',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OAuthAccountScalarFieldEnum = (typeof OAuthAccountScalarFieldEnum)[keyof typeof OAuthAccountScalarFieldEnum]


  export const DeviceScalarFieldEnum: {
    id: 'id',
    deviceId: 'deviceId',
    deviceName: 'deviceName',
    platform: 'platform',
    pushToken: 'pushToken',
    lastSeenAt: 'lastSeenAt',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DeviceScalarFieldEnum = (typeof DeviceScalarFieldEnum)[keyof typeof DeviceScalarFieldEnum]


  export const RefreshTokenScalarFieldEnum: {
    id: 'id',
    tokenHash: 'tokenHash',
    family: 'family',
    userId: 'userId',
    deviceId: 'deviceId',
    issuedAt: 'issuedAt',
    expiresAt: 'expiresAt',
    revokedAt: 'revokedAt',
    revokedReason: 'revokedReason',
    createdAt: 'createdAt'
  };

  export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum]


  export const OtpCodeScalarFieldEnum: {
    id: 'id',
    phone: 'phone',
    purpose: 'purpose',
    codeHash: 'codeHash',
    attempts: 'attempts',
    expiresAt: 'expiresAt',
    consumedAt: 'consumedAt',
    requestIp: 'requestIp',
    createdAt: 'createdAt'
  };

  export type OtpCodeScalarFieldEnum = (typeof OtpCodeScalarFieldEnum)[keyof typeof OtpCodeScalarFieldEnum]


  export const OtpVerificationTokenScalarFieldEnum: {
    id: 'id',
    phone: 'phone',
    purpose: 'purpose',
    otpCodeId: 'otpCodeId',
    expiresAt: 'expiresAt',
    consumedAt: 'consumedAt',
    createdAt: 'createdAt'
  };

  export type OtpVerificationTokenScalarFieldEnum = (typeof OtpVerificationTokenScalarFieldEnum)[keyof typeof OtpVerificationTokenScalarFieldEnum]


  export const ListingScalarFieldEnum: {
    id: 'id',
    farmerId: 'farmerId',
    title: 'title',
    description: 'description',
    cropType: 'cropType',
    quantity: 'quantity',
    quantityUnit: 'quantityUnit',
    pricePerUnit: 'pricePerUnit',
    location: 'location',
    harvestDate: 'harvestDate',
    images: 'images',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ListingScalarFieldEnum = (typeof ListingScalarFieldEnum)[keyof typeof ListingScalarFieldEnum]


  export const ListingInterestScalarFieldEnum: {
    id: 'id',
    listingId: 'listingId',
    buyerId: 'buyerId',
    createdAt: 'createdAt'
  };

  export type ListingInterestScalarFieldEnum = (typeof ListingInterestScalarFieldEnum)[keyof typeof ListingInterestScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    id: 'id',
    listingId: 'listingId',
    buyerId: 'buyerId',
    farmerId: 'farmerId',
    quantity: 'quantity',
    pricePerUnitAtOrder: 'pricePerUnitAtOrder',
    status: 'status',
    latestLatitude: 'latestLatitude',
    latestLongitude: 'latestLongitude',
    locationReportedAt: 'locationReportedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const ReviewScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    farmerId: 'farmerId',
    buyerId: 'buyerId',
    rating: 'rating',
    comment: 'comment',
    createdAt: 'createdAt'
  };

  export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum]


  export const SavedListingScalarFieldEnum: {
    id: 'id',
    listingId: 'listingId',
    buyerId: 'buyerId',
    createdAt: 'createdAt'
  };

  export type SavedListingScalarFieldEnum = (typeof SavedListingScalarFieldEnum)[keyof typeof SavedListingScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    title: 'title',
    body: 'body',
    orderId: 'orderId',
    listingId: 'listingId',
    isRead: 'isRead',
    createdAt: 'createdAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'AccountStatus'
   */
  export type EnumAccountStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccountStatus'>
    


  /**
   * Reference to a field of type 'AccountStatus[]'
   */
  export type ListEnumAccountStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccountStatus[]'>
    


  /**
   * Reference to a field of type 'OAuthProvider'
   */
  export type EnumOAuthProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OAuthProvider'>
    


  /**
   * Reference to a field of type 'OAuthProvider[]'
   */
  export type ListEnumOAuthProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OAuthProvider[]'>
    


  /**
   * Reference to a field of type 'DevicePlatform'
   */
  export type EnumDevicePlatformFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DevicePlatform'>
    


  /**
   * Reference to a field of type 'DevicePlatform[]'
   */
  export type ListEnumDevicePlatformFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DevicePlatform[]'>
    


  /**
   * Reference to a field of type 'OtpPurpose'
   */
  export type EnumOtpPurposeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OtpPurpose'>
    


  /**
   * Reference to a field of type 'OtpPurpose[]'
   */
  export type ListEnumOtpPurposeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OtpPurpose[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'CropType'
   */
  export type EnumCropTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CropType'>
    


  /**
   * Reference to a field of type 'CropType[]'
   */
  export type ListEnumCropTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CropType[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'QuantityUnit'
   */
  export type EnumQuantityUnitFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuantityUnit'>
    


  /**
   * Reference to a field of type 'QuantityUnit[]'
   */
  export type ListEnumQuantityUnitFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuantityUnit[]'>
    


  /**
   * Reference to a field of type 'ListingStatus'
   */
  export type EnumListingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ListingStatus'>
    


  /**
   * Reference to a field of type 'ListingStatus[]'
   */
  export type ListEnumListingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ListingStatus[]'>
    


  /**
   * Reference to a field of type 'OrderStatus'
   */
  export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus'>
    


  /**
   * Reference to a field of type 'OrderStatus[]'
   */
  export type ListEnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'NotificationType'
   */
  export type EnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType'>
    


  /**
   * Reference to a field of type 'NotificationType[]'
   */
  export type ListEnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: UuidFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    phone?: StringNullableFilter<"User"> | string | null
    phoneVerifiedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    accountStatus?: EnumAccountStatusFilter<"User"> | $Enums.AccountStatus
    profileImageUrl?: StringNullableFilter<"User"> | string | null
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    listings?: ListingListRelationFilter
    buyerOrders?: OrderListRelationFilter
    farmerOrders?: OrderListRelationFilter
    expressedInterests?: ListingInterestListRelationFilter
    refreshTokens?: RefreshTokenListRelationFilter
    devices?: DeviceListRelationFilter
    oauthAccounts?: OAuthAccountListRelationFilter
    reviewsGiven?: ReviewListRelationFilter
    reviewsReceived?: ReviewListRelationFilter
    savedListings?: SavedListingListRelationFilter
    notifications?: NotificationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    phone?: SortOrderInput | SortOrder
    phoneVerifiedAt?: SortOrderInput | SortOrder
    accountStatus?: SortOrder
    profileImageUrl?: SortOrderInput | SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    listings?: ListingOrderByRelationAggregateInput
    buyerOrders?: OrderOrderByRelationAggregateInput
    farmerOrders?: OrderOrderByRelationAggregateInput
    expressedInterests?: ListingInterestOrderByRelationAggregateInput
    refreshTokens?: RefreshTokenOrderByRelationAggregateInput
    devices?: DeviceOrderByRelationAggregateInput
    oauthAccounts?: OAuthAccountOrderByRelationAggregateInput
    reviewsGiven?: ReviewOrderByRelationAggregateInput
    reviewsReceived?: ReviewOrderByRelationAggregateInput
    savedListings?: SavedListingOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    phone?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    fullName?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    phoneVerifiedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    accountStatus?: EnumAccountStatusFilter<"User"> | $Enums.AccountStatus
    profileImageUrl?: StringNullableFilter<"User"> | string | null
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    listings?: ListingListRelationFilter
    buyerOrders?: OrderListRelationFilter
    farmerOrders?: OrderListRelationFilter
    expressedInterests?: ListingInterestListRelationFilter
    refreshTokens?: RefreshTokenListRelationFilter
    devices?: DeviceListRelationFilter
    oauthAccounts?: OAuthAccountListRelationFilter
    reviewsGiven?: ReviewListRelationFilter
    reviewsReceived?: ReviewListRelationFilter
    savedListings?: SavedListingListRelationFilter
    notifications?: NotificationListRelationFilter
  }, "id" | "phone">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    phone?: SortOrderInput | SortOrder
    phoneVerifiedAt?: SortOrderInput | SortOrder
    accountStatus?: SortOrder
    profileImageUrl?: SortOrderInput | SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"User"> | string
    fullName?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    phoneVerifiedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    accountStatus?: EnumAccountStatusWithAggregatesFilter<"User"> | $Enums.AccountStatus
    profileImageUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type OAuthAccountWhereInput = {
    AND?: OAuthAccountWhereInput | OAuthAccountWhereInput[]
    OR?: OAuthAccountWhereInput[]
    NOT?: OAuthAccountWhereInput | OAuthAccountWhereInput[]
    id?: UuidFilter<"OAuthAccount"> | string
    provider?: EnumOAuthProviderFilter<"OAuthAccount"> | $Enums.OAuthProvider
    providerAccountId?: StringFilter<"OAuthAccount"> | string
    email?: StringNullableFilter<"OAuthAccount"> | string | null
    userId?: UuidFilter<"OAuthAccount"> | string
    createdAt?: DateTimeFilter<"OAuthAccount"> | Date | string
    updatedAt?: DateTimeFilter<"OAuthAccount"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type OAuthAccountOrderByWithRelationInput = {
    id?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    email?: SortOrderInput | SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type OAuthAccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerAccountId?: OAuthAccountProviderProviderAccountIdCompoundUniqueInput
    AND?: OAuthAccountWhereInput | OAuthAccountWhereInput[]
    OR?: OAuthAccountWhereInput[]
    NOT?: OAuthAccountWhereInput | OAuthAccountWhereInput[]
    provider?: EnumOAuthProviderFilter<"OAuthAccount"> | $Enums.OAuthProvider
    providerAccountId?: StringFilter<"OAuthAccount"> | string
    email?: StringNullableFilter<"OAuthAccount"> | string | null
    userId?: UuidFilter<"OAuthAccount"> | string
    createdAt?: DateTimeFilter<"OAuthAccount"> | Date | string
    updatedAt?: DateTimeFilter<"OAuthAccount"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerAccountId">

  export type OAuthAccountOrderByWithAggregationInput = {
    id?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    email?: SortOrderInput | SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OAuthAccountCountOrderByAggregateInput
    _max?: OAuthAccountMaxOrderByAggregateInput
    _min?: OAuthAccountMinOrderByAggregateInput
  }

  export type OAuthAccountScalarWhereWithAggregatesInput = {
    AND?: OAuthAccountScalarWhereWithAggregatesInput | OAuthAccountScalarWhereWithAggregatesInput[]
    OR?: OAuthAccountScalarWhereWithAggregatesInput[]
    NOT?: OAuthAccountScalarWhereWithAggregatesInput | OAuthAccountScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"OAuthAccount"> | string
    provider?: EnumOAuthProviderWithAggregatesFilter<"OAuthAccount"> | $Enums.OAuthProvider
    providerAccountId?: StringWithAggregatesFilter<"OAuthAccount"> | string
    email?: StringNullableWithAggregatesFilter<"OAuthAccount"> | string | null
    userId?: UuidWithAggregatesFilter<"OAuthAccount"> | string
    createdAt?: DateTimeWithAggregatesFilter<"OAuthAccount"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"OAuthAccount"> | Date | string
  }

  export type DeviceWhereInput = {
    AND?: DeviceWhereInput | DeviceWhereInput[]
    OR?: DeviceWhereInput[]
    NOT?: DeviceWhereInput | DeviceWhereInput[]
    id?: UuidFilter<"Device"> | string
    deviceId?: StringFilter<"Device"> | string
    deviceName?: StringNullableFilter<"Device"> | string | null
    platform?: EnumDevicePlatformFilter<"Device"> | $Enums.DevicePlatform
    pushToken?: StringNullableFilter<"Device"> | string | null
    lastSeenAt?: DateTimeNullableFilter<"Device"> | Date | string | null
    userId?: UuidFilter<"Device"> | string
    createdAt?: DateTimeFilter<"Device"> | Date | string
    updatedAt?: DateTimeFilter<"Device"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    refreshTokens?: RefreshTokenListRelationFilter
  }

  export type DeviceOrderByWithRelationInput = {
    id?: SortOrder
    deviceId?: SortOrder
    deviceName?: SortOrderInput | SortOrder
    platform?: SortOrder
    pushToken?: SortOrderInput | SortOrder
    lastSeenAt?: SortOrderInput | SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    refreshTokens?: RefreshTokenOrderByRelationAggregateInput
  }

  export type DeviceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_deviceId?: DeviceUserIdDeviceIdCompoundUniqueInput
    AND?: DeviceWhereInput | DeviceWhereInput[]
    OR?: DeviceWhereInput[]
    NOT?: DeviceWhereInput | DeviceWhereInput[]
    deviceId?: StringFilter<"Device"> | string
    deviceName?: StringNullableFilter<"Device"> | string | null
    platform?: EnumDevicePlatformFilter<"Device"> | $Enums.DevicePlatform
    pushToken?: StringNullableFilter<"Device"> | string | null
    lastSeenAt?: DateTimeNullableFilter<"Device"> | Date | string | null
    userId?: UuidFilter<"Device"> | string
    createdAt?: DateTimeFilter<"Device"> | Date | string
    updatedAt?: DateTimeFilter<"Device"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    refreshTokens?: RefreshTokenListRelationFilter
  }, "id" | "userId_deviceId">

  export type DeviceOrderByWithAggregationInput = {
    id?: SortOrder
    deviceId?: SortOrder
    deviceName?: SortOrderInput | SortOrder
    platform?: SortOrder
    pushToken?: SortOrderInput | SortOrder
    lastSeenAt?: SortOrderInput | SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DeviceCountOrderByAggregateInput
    _max?: DeviceMaxOrderByAggregateInput
    _min?: DeviceMinOrderByAggregateInput
  }

  export type DeviceScalarWhereWithAggregatesInput = {
    AND?: DeviceScalarWhereWithAggregatesInput | DeviceScalarWhereWithAggregatesInput[]
    OR?: DeviceScalarWhereWithAggregatesInput[]
    NOT?: DeviceScalarWhereWithAggregatesInput | DeviceScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Device"> | string
    deviceId?: StringWithAggregatesFilter<"Device"> | string
    deviceName?: StringNullableWithAggregatesFilter<"Device"> | string | null
    platform?: EnumDevicePlatformWithAggregatesFilter<"Device"> | $Enums.DevicePlatform
    pushToken?: StringNullableWithAggregatesFilter<"Device"> | string | null
    lastSeenAt?: DateTimeNullableWithAggregatesFilter<"Device"> | Date | string | null
    userId?: UuidWithAggregatesFilter<"Device"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Device"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Device"> | Date | string
  }

  export type RefreshTokenWhereInput = {
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    id?: UuidFilter<"RefreshToken"> | string
    tokenHash?: StringFilter<"RefreshToken"> | string
    family?: UuidFilter<"RefreshToken"> | string
    userId?: UuidFilter<"RefreshToken"> | string
    deviceId?: UuidNullableFilter<"RefreshToken"> | string | null
    issuedAt?: DateTimeFilter<"RefreshToken"> | Date | string
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    revokedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    revokedReason?: StringNullableFilter<"RefreshToken"> | string | null
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    device?: XOR<DeviceNullableScalarRelationFilter, DeviceWhereInput> | null
  }

  export type RefreshTokenOrderByWithRelationInput = {
    id?: SortOrder
    tokenHash?: SortOrder
    family?: SortOrder
    userId?: SortOrder
    deviceId?: SortOrderInput | SortOrder
    issuedAt?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    revokedReason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    device?: DeviceOrderByWithRelationInput
  }

  export type RefreshTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tokenHash?: string
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    family?: UuidFilter<"RefreshToken"> | string
    userId?: UuidFilter<"RefreshToken"> | string
    deviceId?: UuidNullableFilter<"RefreshToken"> | string | null
    issuedAt?: DateTimeFilter<"RefreshToken"> | Date | string
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    revokedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    revokedReason?: StringNullableFilter<"RefreshToken"> | string | null
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    device?: XOR<DeviceNullableScalarRelationFilter, DeviceWhereInput> | null
  }, "id" | "tokenHash">

  export type RefreshTokenOrderByWithAggregationInput = {
    id?: SortOrder
    tokenHash?: SortOrder
    family?: SortOrder
    userId?: SortOrder
    deviceId?: SortOrderInput | SortOrder
    issuedAt?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    revokedReason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: RefreshTokenCountOrderByAggregateInput
    _max?: RefreshTokenMaxOrderByAggregateInput
    _min?: RefreshTokenMinOrderByAggregateInput
  }

  export type RefreshTokenScalarWhereWithAggregatesInput = {
    AND?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    OR?: RefreshTokenScalarWhereWithAggregatesInput[]
    NOT?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"RefreshToken"> | string
    tokenHash?: StringWithAggregatesFilter<"RefreshToken"> | string
    family?: UuidWithAggregatesFilter<"RefreshToken"> | string
    userId?: UuidWithAggregatesFilter<"RefreshToken"> | string
    deviceId?: UuidNullableWithAggregatesFilter<"RefreshToken"> | string | null
    issuedAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    expiresAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    revokedAt?: DateTimeNullableWithAggregatesFilter<"RefreshToken"> | Date | string | null
    revokedReason?: StringNullableWithAggregatesFilter<"RefreshToken"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
  }

  export type OtpCodeWhereInput = {
    AND?: OtpCodeWhereInput | OtpCodeWhereInput[]
    OR?: OtpCodeWhereInput[]
    NOT?: OtpCodeWhereInput | OtpCodeWhereInput[]
    id?: UuidFilter<"OtpCode"> | string
    phone?: StringFilter<"OtpCode"> | string
    purpose?: EnumOtpPurposeFilter<"OtpCode"> | $Enums.OtpPurpose
    codeHash?: StringFilter<"OtpCode"> | string
    attempts?: IntFilter<"OtpCode"> | number
    expiresAt?: DateTimeFilter<"OtpCode"> | Date | string
    consumedAt?: DateTimeNullableFilter<"OtpCode"> | Date | string | null
    requestIp?: StringNullableFilter<"OtpCode"> | string | null
    createdAt?: DateTimeFilter<"OtpCode"> | Date | string
    verificationTokens?: OtpVerificationTokenListRelationFilter
  }

  export type OtpCodeOrderByWithRelationInput = {
    id?: SortOrder
    phone?: SortOrder
    purpose?: SortOrder
    codeHash?: SortOrder
    attempts?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrderInput | SortOrder
    requestIp?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    verificationTokens?: OtpVerificationTokenOrderByRelationAggregateInput
  }

  export type OtpCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OtpCodeWhereInput | OtpCodeWhereInput[]
    OR?: OtpCodeWhereInput[]
    NOT?: OtpCodeWhereInput | OtpCodeWhereInput[]
    phone?: StringFilter<"OtpCode"> | string
    purpose?: EnumOtpPurposeFilter<"OtpCode"> | $Enums.OtpPurpose
    codeHash?: StringFilter<"OtpCode"> | string
    attempts?: IntFilter<"OtpCode"> | number
    expiresAt?: DateTimeFilter<"OtpCode"> | Date | string
    consumedAt?: DateTimeNullableFilter<"OtpCode"> | Date | string | null
    requestIp?: StringNullableFilter<"OtpCode"> | string | null
    createdAt?: DateTimeFilter<"OtpCode"> | Date | string
    verificationTokens?: OtpVerificationTokenListRelationFilter
  }, "id">

  export type OtpCodeOrderByWithAggregationInput = {
    id?: SortOrder
    phone?: SortOrder
    purpose?: SortOrder
    codeHash?: SortOrder
    attempts?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrderInput | SortOrder
    requestIp?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: OtpCodeCountOrderByAggregateInput
    _avg?: OtpCodeAvgOrderByAggregateInput
    _max?: OtpCodeMaxOrderByAggregateInput
    _min?: OtpCodeMinOrderByAggregateInput
    _sum?: OtpCodeSumOrderByAggregateInput
  }

  export type OtpCodeScalarWhereWithAggregatesInput = {
    AND?: OtpCodeScalarWhereWithAggregatesInput | OtpCodeScalarWhereWithAggregatesInput[]
    OR?: OtpCodeScalarWhereWithAggregatesInput[]
    NOT?: OtpCodeScalarWhereWithAggregatesInput | OtpCodeScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"OtpCode"> | string
    phone?: StringWithAggregatesFilter<"OtpCode"> | string
    purpose?: EnumOtpPurposeWithAggregatesFilter<"OtpCode"> | $Enums.OtpPurpose
    codeHash?: StringWithAggregatesFilter<"OtpCode"> | string
    attempts?: IntWithAggregatesFilter<"OtpCode"> | number
    expiresAt?: DateTimeWithAggregatesFilter<"OtpCode"> | Date | string
    consumedAt?: DateTimeNullableWithAggregatesFilter<"OtpCode"> | Date | string | null
    requestIp?: StringNullableWithAggregatesFilter<"OtpCode"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"OtpCode"> | Date | string
  }

  export type OtpVerificationTokenWhereInput = {
    AND?: OtpVerificationTokenWhereInput | OtpVerificationTokenWhereInput[]
    OR?: OtpVerificationTokenWhereInput[]
    NOT?: OtpVerificationTokenWhereInput | OtpVerificationTokenWhereInput[]
    id?: UuidFilter<"OtpVerificationToken"> | string
    phone?: StringFilter<"OtpVerificationToken"> | string
    purpose?: EnumOtpPurposeFilter<"OtpVerificationToken"> | $Enums.OtpPurpose
    otpCodeId?: UuidFilter<"OtpVerificationToken"> | string
    expiresAt?: DateTimeFilter<"OtpVerificationToken"> | Date | string
    consumedAt?: DateTimeNullableFilter<"OtpVerificationToken"> | Date | string | null
    createdAt?: DateTimeFilter<"OtpVerificationToken"> | Date | string
    otpCode?: XOR<OtpCodeScalarRelationFilter, OtpCodeWhereInput>
  }

  export type OtpVerificationTokenOrderByWithRelationInput = {
    id?: SortOrder
    phone?: SortOrder
    purpose?: SortOrder
    otpCodeId?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    otpCode?: OtpCodeOrderByWithRelationInput
  }

  export type OtpVerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OtpVerificationTokenWhereInput | OtpVerificationTokenWhereInput[]
    OR?: OtpVerificationTokenWhereInput[]
    NOT?: OtpVerificationTokenWhereInput | OtpVerificationTokenWhereInput[]
    phone?: StringFilter<"OtpVerificationToken"> | string
    purpose?: EnumOtpPurposeFilter<"OtpVerificationToken"> | $Enums.OtpPurpose
    otpCodeId?: UuidFilter<"OtpVerificationToken"> | string
    expiresAt?: DateTimeFilter<"OtpVerificationToken"> | Date | string
    consumedAt?: DateTimeNullableFilter<"OtpVerificationToken"> | Date | string | null
    createdAt?: DateTimeFilter<"OtpVerificationToken"> | Date | string
    otpCode?: XOR<OtpCodeScalarRelationFilter, OtpCodeWhereInput>
  }, "id">

  export type OtpVerificationTokenOrderByWithAggregationInput = {
    id?: SortOrder
    phone?: SortOrder
    purpose?: SortOrder
    otpCodeId?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: OtpVerificationTokenCountOrderByAggregateInput
    _max?: OtpVerificationTokenMaxOrderByAggregateInput
    _min?: OtpVerificationTokenMinOrderByAggregateInput
  }

  export type OtpVerificationTokenScalarWhereWithAggregatesInput = {
    AND?: OtpVerificationTokenScalarWhereWithAggregatesInput | OtpVerificationTokenScalarWhereWithAggregatesInput[]
    OR?: OtpVerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: OtpVerificationTokenScalarWhereWithAggregatesInput | OtpVerificationTokenScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"OtpVerificationToken"> | string
    phone?: StringWithAggregatesFilter<"OtpVerificationToken"> | string
    purpose?: EnumOtpPurposeWithAggregatesFilter<"OtpVerificationToken"> | $Enums.OtpPurpose
    otpCodeId?: UuidWithAggregatesFilter<"OtpVerificationToken"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"OtpVerificationToken"> | Date | string
    consumedAt?: DateTimeNullableWithAggregatesFilter<"OtpVerificationToken"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"OtpVerificationToken"> | Date | string
  }

  export type ListingWhereInput = {
    AND?: ListingWhereInput | ListingWhereInput[]
    OR?: ListingWhereInput[]
    NOT?: ListingWhereInput | ListingWhereInput[]
    id?: UuidFilter<"Listing"> | string
    farmerId?: UuidFilter<"Listing"> | string
    title?: StringFilter<"Listing"> | string
    description?: StringNullableFilter<"Listing"> | string | null
    cropType?: EnumCropTypeFilter<"Listing"> | $Enums.CropType
    quantity?: DecimalFilter<"Listing"> | Decimal | DecimalJsLike | number | string
    quantityUnit?: EnumQuantityUnitFilter<"Listing"> | $Enums.QuantityUnit
    pricePerUnit?: DecimalFilter<"Listing"> | Decimal | DecimalJsLike | number | string
    location?: StringFilter<"Listing"> | string
    harvestDate?: DateTimeNullableFilter<"Listing"> | Date | string | null
    images?: StringNullableListFilter<"Listing">
    status?: EnumListingStatusFilter<"Listing"> | $Enums.ListingStatus
    createdAt?: DateTimeFilter<"Listing"> | Date | string
    updatedAt?: DateTimeFilter<"Listing"> | Date | string
    farmer?: XOR<UserScalarRelationFilter, UserWhereInput>
    orders?: OrderListRelationFilter
    interests?: ListingInterestListRelationFilter
    savedBy?: SavedListingListRelationFilter
  }

  export type ListingOrderByWithRelationInput = {
    id?: SortOrder
    farmerId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    cropType?: SortOrder
    quantity?: SortOrder
    quantityUnit?: SortOrder
    pricePerUnit?: SortOrder
    location?: SortOrder
    harvestDate?: SortOrderInput | SortOrder
    images?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    farmer?: UserOrderByWithRelationInput
    orders?: OrderOrderByRelationAggregateInput
    interests?: ListingInterestOrderByRelationAggregateInput
    savedBy?: SavedListingOrderByRelationAggregateInput
  }

  export type ListingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ListingWhereInput | ListingWhereInput[]
    OR?: ListingWhereInput[]
    NOT?: ListingWhereInput | ListingWhereInput[]
    farmerId?: UuidFilter<"Listing"> | string
    title?: StringFilter<"Listing"> | string
    description?: StringNullableFilter<"Listing"> | string | null
    cropType?: EnumCropTypeFilter<"Listing"> | $Enums.CropType
    quantity?: DecimalFilter<"Listing"> | Decimal | DecimalJsLike | number | string
    quantityUnit?: EnumQuantityUnitFilter<"Listing"> | $Enums.QuantityUnit
    pricePerUnit?: DecimalFilter<"Listing"> | Decimal | DecimalJsLike | number | string
    location?: StringFilter<"Listing"> | string
    harvestDate?: DateTimeNullableFilter<"Listing"> | Date | string | null
    images?: StringNullableListFilter<"Listing">
    status?: EnumListingStatusFilter<"Listing"> | $Enums.ListingStatus
    createdAt?: DateTimeFilter<"Listing"> | Date | string
    updatedAt?: DateTimeFilter<"Listing"> | Date | string
    farmer?: XOR<UserScalarRelationFilter, UserWhereInput>
    orders?: OrderListRelationFilter
    interests?: ListingInterestListRelationFilter
    savedBy?: SavedListingListRelationFilter
  }, "id">

  export type ListingOrderByWithAggregationInput = {
    id?: SortOrder
    farmerId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    cropType?: SortOrder
    quantity?: SortOrder
    quantityUnit?: SortOrder
    pricePerUnit?: SortOrder
    location?: SortOrder
    harvestDate?: SortOrderInput | SortOrder
    images?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ListingCountOrderByAggregateInput
    _avg?: ListingAvgOrderByAggregateInput
    _max?: ListingMaxOrderByAggregateInput
    _min?: ListingMinOrderByAggregateInput
    _sum?: ListingSumOrderByAggregateInput
  }

  export type ListingScalarWhereWithAggregatesInput = {
    AND?: ListingScalarWhereWithAggregatesInput | ListingScalarWhereWithAggregatesInput[]
    OR?: ListingScalarWhereWithAggregatesInput[]
    NOT?: ListingScalarWhereWithAggregatesInput | ListingScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Listing"> | string
    farmerId?: UuidWithAggregatesFilter<"Listing"> | string
    title?: StringWithAggregatesFilter<"Listing"> | string
    description?: StringNullableWithAggregatesFilter<"Listing"> | string | null
    cropType?: EnumCropTypeWithAggregatesFilter<"Listing"> | $Enums.CropType
    quantity?: DecimalWithAggregatesFilter<"Listing"> | Decimal | DecimalJsLike | number | string
    quantityUnit?: EnumQuantityUnitWithAggregatesFilter<"Listing"> | $Enums.QuantityUnit
    pricePerUnit?: DecimalWithAggregatesFilter<"Listing"> | Decimal | DecimalJsLike | number | string
    location?: StringWithAggregatesFilter<"Listing"> | string
    harvestDate?: DateTimeNullableWithAggregatesFilter<"Listing"> | Date | string | null
    images?: StringNullableListFilter<"Listing">
    status?: EnumListingStatusWithAggregatesFilter<"Listing"> | $Enums.ListingStatus
    createdAt?: DateTimeWithAggregatesFilter<"Listing"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Listing"> | Date | string
  }

  export type ListingInterestWhereInput = {
    AND?: ListingInterestWhereInput | ListingInterestWhereInput[]
    OR?: ListingInterestWhereInput[]
    NOT?: ListingInterestWhereInput | ListingInterestWhereInput[]
    id?: UuidFilter<"ListingInterest"> | string
    listingId?: UuidFilter<"ListingInterest"> | string
    buyerId?: UuidFilter<"ListingInterest"> | string
    createdAt?: DateTimeFilter<"ListingInterest"> | Date | string
    listing?: XOR<ListingScalarRelationFilter, ListingWhereInput>
    buyer?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ListingInterestOrderByWithRelationInput = {
    id?: SortOrder
    listingId?: SortOrder
    buyerId?: SortOrder
    createdAt?: SortOrder
    listing?: ListingOrderByWithRelationInput
    buyer?: UserOrderByWithRelationInput
  }

  export type ListingInterestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    listingId_buyerId?: ListingInterestListingIdBuyerIdCompoundUniqueInput
    AND?: ListingInterestWhereInput | ListingInterestWhereInput[]
    OR?: ListingInterestWhereInput[]
    NOT?: ListingInterestWhereInput | ListingInterestWhereInput[]
    listingId?: UuidFilter<"ListingInterest"> | string
    buyerId?: UuidFilter<"ListingInterest"> | string
    createdAt?: DateTimeFilter<"ListingInterest"> | Date | string
    listing?: XOR<ListingScalarRelationFilter, ListingWhereInput>
    buyer?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "listingId_buyerId">

  export type ListingInterestOrderByWithAggregationInput = {
    id?: SortOrder
    listingId?: SortOrder
    buyerId?: SortOrder
    createdAt?: SortOrder
    _count?: ListingInterestCountOrderByAggregateInput
    _max?: ListingInterestMaxOrderByAggregateInput
    _min?: ListingInterestMinOrderByAggregateInput
  }

  export type ListingInterestScalarWhereWithAggregatesInput = {
    AND?: ListingInterestScalarWhereWithAggregatesInput | ListingInterestScalarWhereWithAggregatesInput[]
    OR?: ListingInterestScalarWhereWithAggregatesInput[]
    NOT?: ListingInterestScalarWhereWithAggregatesInput | ListingInterestScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ListingInterest"> | string
    listingId?: UuidWithAggregatesFilter<"ListingInterest"> | string
    buyerId?: UuidWithAggregatesFilter<"ListingInterest"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ListingInterest"> | Date | string
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: UuidFilter<"Order"> | string
    listingId?: UuidFilter<"Order"> | string
    buyerId?: UuidFilter<"Order"> | string
    farmerId?: UuidFilter<"Order"> | string
    quantity?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    latestLatitude?: FloatNullableFilter<"Order"> | number | null
    latestLongitude?: FloatNullableFilter<"Order"> | number | null
    locationReportedAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    listing?: XOR<ListingScalarRelationFilter, ListingWhereInput>
    buyer?: XOR<UserScalarRelationFilter, UserWhereInput>
    farmer?: XOR<UserScalarRelationFilter, UserWhereInput>
    review?: XOR<ReviewNullableScalarRelationFilter, ReviewWhereInput> | null
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    listingId?: SortOrder
    buyerId?: SortOrder
    farmerId?: SortOrder
    quantity?: SortOrder
    pricePerUnitAtOrder?: SortOrder
    status?: SortOrder
    latestLatitude?: SortOrderInput | SortOrder
    latestLongitude?: SortOrderInput | SortOrder
    locationReportedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    listing?: ListingOrderByWithRelationInput
    buyer?: UserOrderByWithRelationInput
    farmer?: UserOrderByWithRelationInput
    review?: ReviewOrderByWithRelationInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    listingId?: UuidFilter<"Order"> | string
    buyerId?: UuidFilter<"Order"> | string
    farmerId?: UuidFilter<"Order"> | string
    quantity?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    latestLatitude?: FloatNullableFilter<"Order"> | number | null
    latestLongitude?: FloatNullableFilter<"Order"> | number | null
    locationReportedAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    listing?: XOR<ListingScalarRelationFilter, ListingWhereInput>
    buyer?: XOR<UserScalarRelationFilter, UserWhereInput>
    farmer?: XOR<UserScalarRelationFilter, UserWhereInput>
    review?: XOR<ReviewNullableScalarRelationFilter, ReviewWhereInput> | null
  }, "id">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    listingId?: SortOrder
    buyerId?: SortOrder
    farmerId?: SortOrder
    quantity?: SortOrder
    pricePerUnitAtOrder?: SortOrder
    status?: SortOrder
    latestLatitude?: SortOrderInput | SortOrder
    latestLongitude?: SortOrderInput | SortOrder
    locationReportedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Order"> | string
    listingId?: UuidWithAggregatesFilter<"Order"> | string
    buyerId?: UuidWithAggregatesFilter<"Order"> | string
    farmerId?: UuidWithAggregatesFilter<"Order"> | string
    quantity?: DecimalWithAggregatesFilter<"Order"> | Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder?: DecimalWithAggregatesFilter<"Order"> | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusWithAggregatesFilter<"Order"> | $Enums.OrderStatus
    latestLatitude?: FloatNullableWithAggregatesFilter<"Order"> | number | null
    latestLongitude?: FloatNullableWithAggregatesFilter<"Order"> | number | null
    locationReportedAt?: DateTimeNullableWithAggregatesFilter<"Order"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
  }

  export type ReviewWhereInput = {
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    id?: UuidFilter<"Review"> | string
    orderId?: UuidFilter<"Review"> | string
    farmerId?: UuidFilter<"Review"> | string
    buyerId?: UuidFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringNullableFilter<"Review"> | string | null
    createdAt?: DateTimeFilter<"Review"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    farmer?: XOR<UserScalarRelationFilter, UserWhereInput>
    buyer?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ReviewOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    farmerId?: SortOrder
    buyerId?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    order?: OrderOrderByWithRelationInput
    farmer?: UserOrderByWithRelationInput
    buyer?: UserOrderByWithRelationInput
  }

  export type ReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    orderId?: string
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    farmerId?: UuidFilter<"Review"> | string
    buyerId?: UuidFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringNullableFilter<"Review"> | string | null
    createdAt?: DateTimeFilter<"Review"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    farmer?: XOR<UserScalarRelationFilter, UserWhereInput>
    buyer?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "orderId">

  export type ReviewOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    farmerId?: SortOrder
    buyerId?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ReviewCountOrderByAggregateInput
    _avg?: ReviewAvgOrderByAggregateInput
    _max?: ReviewMaxOrderByAggregateInput
    _min?: ReviewMinOrderByAggregateInput
    _sum?: ReviewSumOrderByAggregateInput
  }

  export type ReviewScalarWhereWithAggregatesInput = {
    AND?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    OR?: ReviewScalarWhereWithAggregatesInput[]
    NOT?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Review"> | string
    orderId?: UuidWithAggregatesFilter<"Review"> | string
    farmerId?: UuidWithAggregatesFilter<"Review"> | string
    buyerId?: UuidWithAggregatesFilter<"Review"> | string
    rating?: IntWithAggregatesFilter<"Review"> | number
    comment?: StringNullableWithAggregatesFilter<"Review"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
  }

  export type SavedListingWhereInput = {
    AND?: SavedListingWhereInput | SavedListingWhereInput[]
    OR?: SavedListingWhereInput[]
    NOT?: SavedListingWhereInput | SavedListingWhereInput[]
    id?: UuidFilter<"SavedListing"> | string
    listingId?: UuidFilter<"SavedListing"> | string
    buyerId?: UuidFilter<"SavedListing"> | string
    createdAt?: DateTimeFilter<"SavedListing"> | Date | string
    listing?: XOR<ListingScalarRelationFilter, ListingWhereInput>
    buyer?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SavedListingOrderByWithRelationInput = {
    id?: SortOrder
    listingId?: SortOrder
    buyerId?: SortOrder
    createdAt?: SortOrder
    listing?: ListingOrderByWithRelationInput
    buyer?: UserOrderByWithRelationInput
  }

  export type SavedListingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    buyerId_listingId?: SavedListingBuyerIdListingIdCompoundUniqueInput
    AND?: SavedListingWhereInput | SavedListingWhereInput[]
    OR?: SavedListingWhereInput[]
    NOT?: SavedListingWhereInput | SavedListingWhereInput[]
    listingId?: UuidFilter<"SavedListing"> | string
    buyerId?: UuidFilter<"SavedListing"> | string
    createdAt?: DateTimeFilter<"SavedListing"> | Date | string
    listing?: XOR<ListingScalarRelationFilter, ListingWhereInput>
    buyer?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "buyerId_listingId">

  export type SavedListingOrderByWithAggregationInput = {
    id?: SortOrder
    listingId?: SortOrder
    buyerId?: SortOrder
    createdAt?: SortOrder
    _count?: SavedListingCountOrderByAggregateInput
    _max?: SavedListingMaxOrderByAggregateInput
    _min?: SavedListingMinOrderByAggregateInput
  }

  export type SavedListingScalarWhereWithAggregatesInput = {
    AND?: SavedListingScalarWhereWithAggregatesInput | SavedListingScalarWhereWithAggregatesInput[]
    OR?: SavedListingScalarWhereWithAggregatesInput[]
    NOT?: SavedListingScalarWhereWithAggregatesInput | SavedListingScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"SavedListing"> | string
    listingId?: UuidWithAggregatesFilter<"SavedListing"> | string
    buyerId?: UuidWithAggregatesFilter<"SavedListing"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SavedListing"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: UuidFilter<"Notification"> | string
    userId?: UuidFilter<"Notification"> | string
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    title?: StringFilter<"Notification"> | string
    body?: StringFilter<"Notification"> | string
    orderId?: UuidNullableFilter<"Notification"> | string | null
    listingId?: UuidNullableFilter<"Notification"> | string | null
    isRead?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrder
    orderId?: SortOrderInput | SortOrder
    listingId?: SortOrderInput | SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    userId?: UuidFilter<"Notification"> | string
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    title?: StringFilter<"Notification"> | string
    body?: StringFilter<"Notification"> | string
    orderId?: UuidNullableFilter<"Notification"> | string | null
    listingId?: UuidNullableFilter<"Notification"> | string | null
    isRead?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrder
    orderId?: SortOrderInput | SortOrder
    listingId?: SortOrderInput | SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Notification"> | string
    userId?: UuidWithAggregatesFilter<"Notification"> | string
    type?: EnumNotificationTypeWithAggregatesFilter<"Notification"> | $Enums.NotificationType
    title?: StringWithAggregatesFilter<"Notification"> | string
    body?: StringWithAggregatesFilter<"Notification"> | string
    orderId?: UuidNullableWithAggregatesFilter<"Notification"> | string | null
    listingId?: UuidNullableWithAggregatesFilter<"Notification"> | string | null
    isRead?: BoolWithAggregatesFilter<"Notification"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    fullName: string
    role: $Enums.UserRole
    phone?: string | null
    phoneVerifiedAt?: Date | string | null
    accountStatus?: $Enums.AccountStatus
    profileImageUrl?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    listings?: ListingCreateNestedManyWithoutFarmerInput
    buyerOrders?: OrderCreateNestedManyWithoutBuyerInput
    farmerOrders?: OrderCreateNestedManyWithoutFarmerInput
    expressedInterests?: ListingInterestCreateNestedManyWithoutBuyerInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    devices?: DeviceCreateNestedManyWithoutUserInput
    oauthAccounts?: OAuthAccountCreateNestedManyWithoutUserInput
    reviewsGiven?: ReviewCreateNestedManyWithoutBuyerInput
    reviewsReceived?: ReviewCreateNestedManyWithoutFarmerInput
    savedListings?: SavedListingCreateNestedManyWithoutBuyerInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    fullName: string
    role: $Enums.UserRole
    phone?: string | null
    phoneVerifiedAt?: Date | string | null
    accountStatus?: $Enums.AccountStatus
    profileImageUrl?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    listings?: ListingUncheckedCreateNestedManyWithoutFarmerInput
    buyerOrders?: OrderUncheckedCreateNestedManyWithoutBuyerInput
    farmerOrders?: OrderUncheckedCreateNestedManyWithoutFarmerInput
    expressedInterests?: ListingInterestUncheckedCreateNestedManyWithoutBuyerInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    devices?: DeviceUncheckedCreateNestedManyWithoutUserInput
    oauthAccounts?: OAuthAccountUncheckedCreateNestedManyWithoutUserInput
    reviewsGiven?: ReviewUncheckedCreateNestedManyWithoutBuyerInput
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutFarmerInput
    savedListings?: SavedListingUncheckedCreateNestedManyWithoutBuyerInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accountStatus?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    listings?: ListingUpdateManyWithoutFarmerNestedInput
    buyerOrders?: OrderUpdateManyWithoutBuyerNestedInput
    farmerOrders?: OrderUpdateManyWithoutFarmerNestedInput
    expressedInterests?: ListingInterestUpdateManyWithoutBuyerNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    devices?: DeviceUpdateManyWithoutUserNestedInput
    oauthAccounts?: OAuthAccountUpdateManyWithoutUserNestedInput
    reviewsGiven?: ReviewUpdateManyWithoutBuyerNestedInput
    reviewsReceived?: ReviewUpdateManyWithoutFarmerNestedInput
    savedListings?: SavedListingUpdateManyWithoutBuyerNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accountStatus?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    listings?: ListingUncheckedUpdateManyWithoutFarmerNestedInput
    buyerOrders?: OrderUncheckedUpdateManyWithoutBuyerNestedInput
    farmerOrders?: OrderUncheckedUpdateManyWithoutFarmerNestedInput
    expressedInterests?: ListingInterestUncheckedUpdateManyWithoutBuyerNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    devices?: DeviceUncheckedUpdateManyWithoutUserNestedInput
    oauthAccounts?: OAuthAccountUncheckedUpdateManyWithoutUserNestedInput
    reviewsGiven?: ReviewUncheckedUpdateManyWithoutBuyerNestedInput
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutFarmerNestedInput
    savedListings?: SavedListingUncheckedUpdateManyWithoutBuyerNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    fullName: string
    role: $Enums.UserRole
    phone?: string | null
    phoneVerifiedAt?: Date | string | null
    accountStatus?: $Enums.AccountStatus
    profileImageUrl?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accountStatus?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accountStatus?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OAuthAccountCreateInput = {
    id?: string
    provider: $Enums.OAuthProvider
    providerAccountId: string
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutOauthAccountsInput
  }

  export type OAuthAccountUncheckedCreateInput = {
    id?: string
    provider: $Enums.OAuthProvider
    providerAccountId: string
    email?: string | null
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OAuthAccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumOAuthProviderFieldUpdateOperationsInput | $Enums.OAuthProvider
    providerAccountId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOauthAccountsNestedInput
  }

  export type OAuthAccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumOAuthProviderFieldUpdateOperationsInput | $Enums.OAuthProvider
    providerAccountId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthAccountCreateManyInput = {
    id?: string
    provider: $Enums.OAuthProvider
    providerAccountId: string
    email?: string | null
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OAuthAccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumOAuthProviderFieldUpdateOperationsInput | $Enums.OAuthProvider
    providerAccountId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthAccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumOAuthProviderFieldUpdateOperationsInput | $Enums.OAuthProvider
    providerAccountId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceCreateInput = {
    id?: string
    deviceId: string
    deviceName?: string | null
    platform: $Enums.DevicePlatform
    pushToken?: string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDevicesInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutDeviceInput
  }

  export type DeviceUncheckedCreateInput = {
    id?: string
    deviceId: string
    deviceName?: string | null
    platform: $Enums.DevicePlatform
    pushToken?: string | null
    lastSeenAt?: Date | string | null
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutDeviceInput
  }

  export type DeviceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    deviceName?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: EnumDevicePlatformFieldUpdateOperationsInput | $Enums.DevicePlatform
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDevicesNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    deviceName?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: EnumDevicePlatformFieldUpdateOperationsInput | $Enums.DevicePlatform
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceCreateManyInput = {
    id?: string
    deviceId: string
    deviceName?: string | null
    platform: $Enums.DevicePlatform
    pushToken?: string | null
    lastSeenAt?: Date | string | null
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeviceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    deviceName?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: EnumDevicePlatformFieldUpdateOperationsInput | $Enums.DevicePlatform
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    deviceName?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: EnumDevicePlatformFieldUpdateOperationsInput | $Enums.DevicePlatform
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateInput = {
    id?: string
    tokenHash: string
    family: string
    issuedAt?: Date | string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    revokedReason?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutRefreshTokensInput
    device?: DeviceCreateNestedOneWithoutRefreshTokensInput
  }

  export type RefreshTokenUncheckedCreateInput = {
    id?: string
    tokenHash: string
    family: string
    userId: string
    deviceId?: string | null
    issuedAt?: Date | string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    revokedReason?: string | null
    createdAt?: Date | string
  }

  export type RefreshTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    family?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRefreshTokensNestedInput
    device?: DeviceUpdateOneWithoutRefreshTokensNestedInput
  }

  export type RefreshTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    family?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateManyInput = {
    id?: string
    tokenHash: string
    family: string
    userId: string
    deviceId?: string | null
    issuedAt?: Date | string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    revokedReason?: string | null
    createdAt?: Date | string
  }

  export type RefreshTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    family?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    family?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpCodeCreateInput = {
    id?: string
    phone: string
    purpose: $Enums.OtpPurpose
    codeHash: string
    attempts?: number
    expiresAt: Date | string
    consumedAt?: Date | string | null
    requestIp?: string | null
    createdAt?: Date | string
    verificationTokens?: OtpVerificationTokenCreateNestedManyWithoutOtpCodeInput
  }

  export type OtpCodeUncheckedCreateInput = {
    id?: string
    phone: string
    purpose: $Enums.OtpPurpose
    codeHash: string
    attempts?: number
    expiresAt: Date | string
    consumedAt?: Date | string | null
    requestIp?: string | null
    createdAt?: Date | string
    verificationTokens?: OtpVerificationTokenUncheckedCreateNestedManyWithoutOtpCodeInput
  }

  export type OtpCodeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    purpose?: EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose
    codeHash?: StringFieldUpdateOperationsInput | string
    attempts?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestIp?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationTokens?: OtpVerificationTokenUpdateManyWithoutOtpCodeNestedInput
  }

  export type OtpCodeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    purpose?: EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose
    codeHash?: StringFieldUpdateOperationsInput | string
    attempts?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestIp?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationTokens?: OtpVerificationTokenUncheckedUpdateManyWithoutOtpCodeNestedInput
  }

  export type OtpCodeCreateManyInput = {
    id?: string
    phone: string
    purpose: $Enums.OtpPurpose
    codeHash: string
    attempts?: number
    expiresAt: Date | string
    consumedAt?: Date | string | null
    requestIp?: string | null
    createdAt?: Date | string
  }

  export type OtpCodeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    purpose?: EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose
    codeHash?: StringFieldUpdateOperationsInput | string
    attempts?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestIp?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpCodeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    purpose?: EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose
    codeHash?: StringFieldUpdateOperationsInput | string
    attempts?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestIp?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpVerificationTokenCreateInput = {
    id?: string
    phone: string
    purpose: $Enums.OtpPurpose
    expiresAt: Date | string
    consumedAt?: Date | string | null
    createdAt?: Date | string
    otpCode: OtpCodeCreateNestedOneWithoutVerificationTokensInput
  }

  export type OtpVerificationTokenUncheckedCreateInput = {
    id?: string
    phone: string
    purpose: $Enums.OtpPurpose
    otpCodeId: string
    expiresAt: Date | string
    consumedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type OtpVerificationTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    purpose?: EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    otpCode?: OtpCodeUpdateOneRequiredWithoutVerificationTokensNestedInput
  }

  export type OtpVerificationTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    purpose?: EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose
    otpCodeId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpVerificationTokenCreateManyInput = {
    id?: string
    phone: string
    purpose: $Enums.OtpPurpose
    otpCodeId: string
    expiresAt: Date | string
    consumedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type OtpVerificationTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    purpose?: EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpVerificationTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    purpose?: EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose
    otpCodeId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingCreateInput = {
    id?: string
    title: string
    description?: string | null
    cropType: $Enums.CropType
    quantity: Decimal | DecimalJsLike | number | string
    quantityUnit: $Enums.QuantityUnit
    pricePerUnit: Decimal | DecimalJsLike | number | string
    location: string
    harvestDate?: Date | string | null
    images?: ListingCreateimagesInput | string[]
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    farmer: UserCreateNestedOneWithoutListingsInput
    orders?: OrderCreateNestedManyWithoutListingInput
    interests?: ListingInterestCreateNestedManyWithoutListingInput
    savedBy?: SavedListingCreateNestedManyWithoutListingInput
  }

  export type ListingUncheckedCreateInput = {
    id?: string
    farmerId: string
    title: string
    description?: string | null
    cropType: $Enums.CropType
    quantity: Decimal | DecimalJsLike | number | string
    quantityUnit: $Enums.QuantityUnit
    pricePerUnit: Decimal | DecimalJsLike | number | string
    location: string
    harvestDate?: Date | string | null
    images?: ListingCreateimagesInput | string[]
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutListingInput
    interests?: ListingInterestUncheckedCreateNestedManyWithoutListingInput
    savedBy?: SavedListingUncheckedCreateNestedManyWithoutListingInput
  }

  export type ListingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cropType?: EnumCropTypeFieldUpdateOperationsInput | $Enums.CropType
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantityUnit?: EnumQuantityUnitFieldUpdateOperationsInput | $Enums.QuantityUnit
    pricePerUnit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    location?: StringFieldUpdateOperationsInput | string
    harvestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    images?: ListingUpdateimagesInput | string[]
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farmer?: UserUpdateOneRequiredWithoutListingsNestedInput
    orders?: OrderUpdateManyWithoutListingNestedInput
    interests?: ListingInterestUpdateManyWithoutListingNestedInput
    savedBy?: SavedListingUpdateManyWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    farmerId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cropType?: EnumCropTypeFieldUpdateOperationsInput | $Enums.CropType
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantityUnit?: EnumQuantityUnitFieldUpdateOperationsInput | $Enums.QuantityUnit
    pricePerUnit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    location?: StringFieldUpdateOperationsInput | string
    harvestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    images?: ListingUpdateimagesInput | string[]
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutListingNestedInput
    interests?: ListingInterestUncheckedUpdateManyWithoutListingNestedInput
    savedBy?: SavedListingUncheckedUpdateManyWithoutListingNestedInput
  }

  export type ListingCreateManyInput = {
    id?: string
    farmerId: string
    title: string
    description?: string | null
    cropType: $Enums.CropType
    quantity: Decimal | DecimalJsLike | number | string
    quantityUnit: $Enums.QuantityUnit
    pricePerUnit: Decimal | DecimalJsLike | number | string
    location: string
    harvestDate?: Date | string | null
    images?: ListingCreateimagesInput | string[]
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ListingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cropType?: EnumCropTypeFieldUpdateOperationsInput | $Enums.CropType
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantityUnit?: EnumQuantityUnitFieldUpdateOperationsInput | $Enums.QuantityUnit
    pricePerUnit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    location?: StringFieldUpdateOperationsInput | string
    harvestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    images?: ListingUpdateimagesInput | string[]
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    farmerId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cropType?: EnumCropTypeFieldUpdateOperationsInput | $Enums.CropType
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantityUnit?: EnumQuantityUnitFieldUpdateOperationsInput | $Enums.QuantityUnit
    pricePerUnit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    location?: StringFieldUpdateOperationsInput | string
    harvestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    images?: ListingUpdateimagesInput | string[]
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingInterestCreateInput = {
    id?: string
    createdAt?: Date | string
    listing: ListingCreateNestedOneWithoutInterestsInput
    buyer: UserCreateNestedOneWithoutExpressedInterestsInput
  }

  export type ListingInterestUncheckedCreateInput = {
    id?: string
    listingId: string
    buyerId: string
    createdAt?: Date | string
  }

  export type ListingInterestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listing?: ListingUpdateOneRequiredWithoutInterestsNestedInput
    buyer?: UserUpdateOneRequiredWithoutExpressedInterestsNestedInput
  }

  export type ListingInterestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingInterestCreateManyInput = {
    id?: string
    listingId: string
    buyerId: string
    createdAt?: Date | string
  }

  export type ListingInterestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingInterestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateInput = {
    id?: string
    quantity: Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder: Decimal | DecimalJsLike | number | string
    status?: $Enums.OrderStatus
    latestLatitude?: number | null
    latestLongitude?: number | null
    locationReportedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    listing: ListingCreateNestedOneWithoutOrdersInput
    buyer: UserCreateNestedOneWithoutBuyerOrdersInput
    farmer: UserCreateNestedOneWithoutFarmerOrdersInput
    review?: ReviewCreateNestedOneWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    id?: string
    listingId: string
    buyerId: string
    farmerId: string
    quantity: Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder: Decimal | DecimalJsLike | number | string
    status?: $Enums.OrderStatus
    latestLatitude?: number | null
    latestLongitude?: number | null
    locationReportedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    review?: ReviewUncheckedCreateNestedOneWithoutOrderInput
  }

  export type OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    latestLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    latestLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    locationReportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listing?: ListingUpdateOneRequiredWithoutOrdersNestedInput
    buyer?: UserUpdateOneRequiredWithoutBuyerOrdersNestedInput
    farmer?: UserUpdateOneRequiredWithoutFarmerOrdersNestedInput
    review?: ReviewUpdateOneWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    farmerId?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    latestLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    latestLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    locationReportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    review?: ReviewUncheckedUpdateOneWithoutOrderNestedInput
  }

  export type OrderCreateManyInput = {
    id?: string
    listingId: string
    buyerId: string
    farmerId: string
    quantity: Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder: Decimal | DecimalJsLike | number | string
    status?: $Enums.OrderStatus
    latestLatitude?: number | null
    latestLongitude?: number | null
    locationReportedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    latestLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    latestLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    locationReportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    farmerId?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    latestLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    latestLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    locationReportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    order: OrderCreateNestedOneWithoutReviewInput
    farmer: UserCreateNestedOneWithoutReviewsReceivedInput
    buyer: UserCreateNestedOneWithoutReviewsGivenInput
  }

  export type ReviewUncheckedCreateInput = {
    id?: string
    orderId: string
    farmerId: string
    buyerId: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type ReviewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutReviewNestedInput
    farmer?: UserUpdateOneRequiredWithoutReviewsReceivedNestedInput
    buyer?: UserUpdateOneRequiredWithoutReviewsGivenNestedInput
  }

  export type ReviewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    farmerId?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateManyInput = {
    id?: string
    orderId: string
    farmerId: string
    buyerId: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type ReviewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    farmerId?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedListingCreateInput = {
    id?: string
    createdAt?: Date | string
    listing: ListingCreateNestedOneWithoutSavedByInput
    buyer: UserCreateNestedOneWithoutSavedListingsInput
  }

  export type SavedListingUncheckedCreateInput = {
    id?: string
    listingId: string
    buyerId: string
    createdAt?: Date | string
  }

  export type SavedListingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listing?: ListingUpdateOneRequiredWithoutSavedByNestedInput
    buyer?: UserUpdateOneRequiredWithoutSavedListingsNestedInput
  }

  export type SavedListingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedListingCreateManyInput = {
    id?: string
    listingId: string
    buyerId: string
    createdAt?: Date | string
  }

  export type SavedListingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedListingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    type: $Enums.NotificationType
    title: string
    body: string
    orderId?: string | null
    listingId?: string | null
    isRead?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    userId: string
    type: $Enums.NotificationType
    title: string
    body: string
    orderId?: string | null
    listingId?: string | null
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    listingId?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    listingId?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    userId: string
    type: $Enums.NotificationType
    title: string
    body: string
    orderId?: string | null
    listingId?: string | null
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    listingId?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    listingId?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumAccountStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountStatus | EnumAccountStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AccountStatus[] | ListEnumAccountStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountStatus[] | ListEnumAccountStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountStatusFilter<$PrismaModel> | $Enums.AccountStatus
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ListingListRelationFilter = {
    every?: ListingWhereInput
    some?: ListingWhereInput
    none?: ListingWhereInput
  }

  export type OrderListRelationFilter = {
    every?: OrderWhereInput
    some?: OrderWhereInput
    none?: OrderWhereInput
  }

  export type ListingInterestListRelationFilter = {
    every?: ListingInterestWhereInput
    some?: ListingInterestWhereInput
    none?: ListingInterestWhereInput
  }

  export type RefreshTokenListRelationFilter = {
    every?: RefreshTokenWhereInput
    some?: RefreshTokenWhereInput
    none?: RefreshTokenWhereInput
  }

  export type DeviceListRelationFilter = {
    every?: DeviceWhereInput
    some?: DeviceWhereInput
    none?: DeviceWhereInput
  }

  export type OAuthAccountListRelationFilter = {
    every?: OAuthAccountWhereInput
    some?: OAuthAccountWhereInput
    none?: OAuthAccountWhereInput
  }

  export type ReviewListRelationFilter = {
    every?: ReviewWhereInput
    some?: ReviewWhereInput
    none?: ReviewWhereInput
  }

  export type SavedListingListRelationFilter = {
    every?: SavedListingWhereInput
    some?: SavedListingWhereInput
    none?: SavedListingWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ListingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ListingInterestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RefreshTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DeviceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OAuthAccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SavedListingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    phone?: SortOrder
    phoneVerifiedAt?: SortOrder
    accountStatus?: SortOrder
    profileImageUrl?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    phone?: SortOrder
    phoneVerifiedAt?: SortOrder
    accountStatus?: SortOrder
    profileImageUrl?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    phone?: SortOrder
    phoneVerifiedAt?: SortOrder
    accountStatus?: SortOrder
    profileImageUrl?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumAccountStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountStatus | EnumAccountStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AccountStatus[] | ListEnumAccountStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountStatus[] | ListEnumAccountStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountStatusWithAggregatesFilter<$PrismaModel> | $Enums.AccountStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAccountStatusFilter<$PrismaModel>
    _max?: NestedEnumAccountStatusFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumOAuthProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.OAuthProvider | EnumOAuthProviderFieldRefInput<$PrismaModel>
    in?: $Enums.OAuthProvider[] | ListEnumOAuthProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.OAuthProvider[] | ListEnumOAuthProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumOAuthProviderFilter<$PrismaModel> | $Enums.OAuthProvider
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type OAuthAccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: $Enums.OAuthProvider
    providerAccountId: string
  }

  export type OAuthAccountCountOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    email?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OAuthAccountMaxOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    email?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OAuthAccountMinOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    email?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumOAuthProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OAuthProvider | EnumOAuthProviderFieldRefInput<$PrismaModel>
    in?: $Enums.OAuthProvider[] | ListEnumOAuthProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.OAuthProvider[] | ListEnumOAuthProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumOAuthProviderWithAggregatesFilter<$PrismaModel> | $Enums.OAuthProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOAuthProviderFilter<$PrismaModel>
    _max?: NestedEnumOAuthProviderFilter<$PrismaModel>
  }

  export type EnumDevicePlatformFilter<$PrismaModel = never> = {
    equals?: $Enums.DevicePlatform | EnumDevicePlatformFieldRefInput<$PrismaModel>
    in?: $Enums.DevicePlatform[] | ListEnumDevicePlatformFieldRefInput<$PrismaModel>
    notIn?: $Enums.DevicePlatform[] | ListEnumDevicePlatformFieldRefInput<$PrismaModel>
    not?: NestedEnumDevicePlatformFilter<$PrismaModel> | $Enums.DevicePlatform
  }

  export type DeviceUserIdDeviceIdCompoundUniqueInput = {
    userId: string
    deviceId: string
  }

  export type DeviceCountOrderByAggregateInput = {
    id?: SortOrder
    deviceId?: SortOrder
    deviceName?: SortOrder
    platform?: SortOrder
    pushToken?: SortOrder
    lastSeenAt?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeviceMaxOrderByAggregateInput = {
    id?: SortOrder
    deviceId?: SortOrder
    deviceName?: SortOrder
    platform?: SortOrder
    pushToken?: SortOrder
    lastSeenAt?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeviceMinOrderByAggregateInput = {
    id?: SortOrder
    deviceId?: SortOrder
    deviceName?: SortOrder
    platform?: SortOrder
    pushToken?: SortOrder
    lastSeenAt?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumDevicePlatformWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DevicePlatform | EnumDevicePlatformFieldRefInput<$PrismaModel>
    in?: $Enums.DevicePlatform[] | ListEnumDevicePlatformFieldRefInput<$PrismaModel>
    notIn?: $Enums.DevicePlatform[] | ListEnumDevicePlatformFieldRefInput<$PrismaModel>
    not?: NestedEnumDevicePlatformWithAggregatesFilter<$PrismaModel> | $Enums.DevicePlatform
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDevicePlatformFilter<$PrismaModel>
    _max?: NestedEnumDevicePlatformFilter<$PrismaModel>
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type DeviceNullableScalarRelationFilter = {
    is?: DeviceWhereInput | null
    isNot?: DeviceWhereInput | null
  }

  export type RefreshTokenCountOrderByAggregateInput = {
    id?: SortOrder
    tokenHash?: SortOrder
    family?: SortOrder
    userId?: SortOrder
    deviceId?: SortOrder
    issuedAt?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    revokedReason?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    tokenHash?: SortOrder
    family?: SortOrder
    userId?: SortOrder
    deviceId?: SortOrder
    issuedAt?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    revokedReason?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshTokenMinOrderByAggregateInput = {
    id?: SortOrder
    tokenHash?: SortOrder
    family?: SortOrder
    userId?: SortOrder
    deviceId?: SortOrder
    issuedAt?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    revokedReason?: SortOrder
    createdAt?: SortOrder
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumOtpPurposeFilter<$PrismaModel = never> = {
    equals?: $Enums.OtpPurpose | EnumOtpPurposeFieldRefInput<$PrismaModel>
    in?: $Enums.OtpPurpose[] | ListEnumOtpPurposeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OtpPurpose[] | ListEnumOtpPurposeFieldRefInput<$PrismaModel>
    not?: NestedEnumOtpPurposeFilter<$PrismaModel> | $Enums.OtpPurpose
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type OtpVerificationTokenListRelationFilter = {
    every?: OtpVerificationTokenWhereInput
    some?: OtpVerificationTokenWhereInput
    none?: OtpVerificationTokenWhereInput
  }

  export type OtpVerificationTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OtpCodeCountOrderByAggregateInput = {
    id?: SortOrder
    phone?: SortOrder
    purpose?: SortOrder
    codeHash?: SortOrder
    attempts?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrder
    requestIp?: SortOrder
    createdAt?: SortOrder
  }

  export type OtpCodeAvgOrderByAggregateInput = {
    attempts?: SortOrder
  }

  export type OtpCodeMaxOrderByAggregateInput = {
    id?: SortOrder
    phone?: SortOrder
    purpose?: SortOrder
    codeHash?: SortOrder
    attempts?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrder
    requestIp?: SortOrder
    createdAt?: SortOrder
  }

  export type OtpCodeMinOrderByAggregateInput = {
    id?: SortOrder
    phone?: SortOrder
    purpose?: SortOrder
    codeHash?: SortOrder
    attempts?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrder
    requestIp?: SortOrder
    createdAt?: SortOrder
  }

  export type OtpCodeSumOrderByAggregateInput = {
    attempts?: SortOrder
  }

  export type EnumOtpPurposeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OtpPurpose | EnumOtpPurposeFieldRefInput<$PrismaModel>
    in?: $Enums.OtpPurpose[] | ListEnumOtpPurposeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OtpPurpose[] | ListEnumOtpPurposeFieldRefInput<$PrismaModel>
    not?: NestedEnumOtpPurposeWithAggregatesFilter<$PrismaModel> | $Enums.OtpPurpose
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOtpPurposeFilter<$PrismaModel>
    _max?: NestedEnumOtpPurposeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type OtpCodeScalarRelationFilter = {
    is?: OtpCodeWhereInput
    isNot?: OtpCodeWhereInput
  }

  export type OtpVerificationTokenCountOrderByAggregateInput = {
    id?: SortOrder
    phone?: SortOrder
    purpose?: SortOrder
    otpCodeId?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type OtpVerificationTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    phone?: SortOrder
    purpose?: SortOrder
    otpCodeId?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type OtpVerificationTokenMinOrderByAggregateInput = {
    id?: SortOrder
    phone?: SortOrder
    purpose?: SortOrder
    otpCodeId?: SortOrder
    expiresAt?: SortOrder
    consumedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumCropTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CropType | EnumCropTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CropType[] | ListEnumCropTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CropType[] | ListEnumCropTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCropTypeFilter<$PrismaModel> | $Enums.CropType
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type EnumQuantityUnitFilter<$PrismaModel = never> = {
    equals?: $Enums.QuantityUnit | EnumQuantityUnitFieldRefInput<$PrismaModel>
    in?: $Enums.QuantityUnit[] | ListEnumQuantityUnitFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuantityUnit[] | ListEnumQuantityUnitFieldRefInput<$PrismaModel>
    not?: NestedEnumQuantityUnitFilter<$PrismaModel> | $Enums.QuantityUnit
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EnumListingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ListingStatus | EnumListingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ListingStatus[] | ListEnumListingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ListingStatus[] | ListEnumListingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumListingStatusFilter<$PrismaModel> | $Enums.ListingStatus
  }

  export type ListingCountOrderByAggregateInput = {
    id?: SortOrder
    farmerId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    cropType?: SortOrder
    quantity?: SortOrder
    quantityUnit?: SortOrder
    pricePerUnit?: SortOrder
    location?: SortOrder
    harvestDate?: SortOrder
    images?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ListingAvgOrderByAggregateInput = {
    quantity?: SortOrder
    pricePerUnit?: SortOrder
  }

  export type ListingMaxOrderByAggregateInput = {
    id?: SortOrder
    farmerId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    cropType?: SortOrder
    quantity?: SortOrder
    quantityUnit?: SortOrder
    pricePerUnit?: SortOrder
    location?: SortOrder
    harvestDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ListingMinOrderByAggregateInput = {
    id?: SortOrder
    farmerId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    cropType?: SortOrder
    quantity?: SortOrder
    quantityUnit?: SortOrder
    pricePerUnit?: SortOrder
    location?: SortOrder
    harvestDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ListingSumOrderByAggregateInput = {
    quantity?: SortOrder
    pricePerUnit?: SortOrder
  }

  export type EnumCropTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CropType | EnumCropTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CropType[] | ListEnumCropTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CropType[] | ListEnumCropTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCropTypeWithAggregatesFilter<$PrismaModel> | $Enums.CropType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCropTypeFilter<$PrismaModel>
    _max?: NestedEnumCropTypeFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumQuantityUnitWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuantityUnit | EnumQuantityUnitFieldRefInput<$PrismaModel>
    in?: $Enums.QuantityUnit[] | ListEnumQuantityUnitFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuantityUnit[] | ListEnumQuantityUnitFieldRefInput<$PrismaModel>
    not?: NestedEnumQuantityUnitWithAggregatesFilter<$PrismaModel> | $Enums.QuantityUnit
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQuantityUnitFilter<$PrismaModel>
    _max?: NestedEnumQuantityUnitFilter<$PrismaModel>
  }

  export type EnumListingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ListingStatus | EnumListingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ListingStatus[] | ListEnumListingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ListingStatus[] | ListEnumListingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumListingStatusWithAggregatesFilter<$PrismaModel> | $Enums.ListingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumListingStatusFilter<$PrismaModel>
    _max?: NestedEnumListingStatusFilter<$PrismaModel>
  }

  export type ListingScalarRelationFilter = {
    is?: ListingWhereInput
    isNot?: ListingWhereInput
  }

  export type ListingInterestListingIdBuyerIdCompoundUniqueInput = {
    listingId: string
    buyerId: string
  }

  export type ListingInterestCountOrderByAggregateInput = {
    id?: SortOrder
    listingId?: SortOrder
    buyerId?: SortOrder
    createdAt?: SortOrder
  }

  export type ListingInterestMaxOrderByAggregateInput = {
    id?: SortOrder
    listingId?: SortOrder
    buyerId?: SortOrder
    createdAt?: SortOrder
  }

  export type ListingInterestMinOrderByAggregateInput = {
    id?: SortOrder
    listingId?: SortOrder
    buyerId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ReviewNullableScalarRelationFilter = {
    is?: ReviewWhereInput | null
    isNot?: ReviewWhereInput | null
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    listingId?: SortOrder
    buyerId?: SortOrder
    farmerId?: SortOrder
    quantity?: SortOrder
    pricePerUnitAtOrder?: SortOrder
    status?: SortOrder
    latestLatitude?: SortOrder
    latestLongitude?: SortOrder
    locationReportedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    quantity?: SortOrder
    pricePerUnitAtOrder?: SortOrder
    latestLatitude?: SortOrder
    latestLongitude?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    listingId?: SortOrder
    buyerId?: SortOrder
    farmerId?: SortOrder
    quantity?: SortOrder
    pricePerUnitAtOrder?: SortOrder
    status?: SortOrder
    latestLatitude?: SortOrder
    latestLongitude?: SortOrder
    locationReportedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    listingId?: SortOrder
    buyerId?: SortOrder
    farmerId?: SortOrder
    quantity?: SortOrder
    pricePerUnitAtOrder?: SortOrder
    status?: SortOrder
    latestLatitude?: SortOrder
    latestLongitude?: SortOrder
    locationReportedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    quantity?: SortOrder
    pricePerUnitAtOrder?: SortOrder
    latestLatitude?: SortOrder
    latestLongitude?: SortOrder
  }

  export type EnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type OrderScalarRelationFilter = {
    is?: OrderWhereInput
    isNot?: OrderWhereInput
  }

  export type ReviewCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    farmerId?: SortOrder
    buyerId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type ReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    farmerId?: SortOrder
    buyerId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    farmerId?: SortOrder
    buyerId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type SavedListingBuyerIdListingIdCompoundUniqueInput = {
    buyerId: string
    listingId: string
  }

  export type SavedListingCountOrderByAggregateInput = {
    id?: SortOrder
    listingId?: SortOrder
    buyerId?: SortOrder
    createdAt?: SortOrder
  }

  export type SavedListingMaxOrderByAggregateInput = {
    id?: SortOrder
    listingId?: SortOrder
    buyerId?: SortOrder
    createdAt?: SortOrder
  }

  export type SavedListingMinOrderByAggregateInput = {
    id?: SortOrder
    listingId?: SortOrder
    buyerId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrder
    orderId?: SortOrder
    listingId?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrder
    orderId?: SortOrder
    listingId?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrder
    orderId?: SortOrder
    listingId?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationTypeFilter<$PrismaModel>
    _max?: NestedEnumNotificationTypeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ListingCreateNestedManyWithoutFarmerInput = {
    create?: XOR<ListingCreateWithoutFarmerInput, ListingUncheckedCreateWithoutFarmerInput> | ListingCreateWithoutFarmerInput[] | ListingUncheckedCreateWithoutFarmerInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutFarmerInput | ListingCreateOrConnectWithoutFarmerInput[]
    createMany?: ListingCreateManyFarmerInputEnvelope
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
  }

  export type OrderCreateNestedManyWithoutBuyerInput = {
    create?: XOR<OrderCreateWithoutBuyerInput, OrderUncheckedCreateWithoutBuyerInput> | OrderCreateWithoutBuyerInput[] | OrderUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutBuyerInput | OrderCreateOrConnectWithoutBuyerInput[]
    createMany?: OrderCreateManyBuyerInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type OrderCreateNestedManyWithoutFarmerInput = {
    create?: XOR<OrderCreateWithoutFarmerInput, OrderUncheckedCreateWithoutFarmerInput> | OrderCreateWithoutFarmerInput[] | OrderUncheckedCreateWithoutFarmerInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutFarmerInput | OrderCreateOrConnectWithoutFarmerInput[]
    createMany?: OrderCreateManyFarmerInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type ListingInterestCreateNestedManyWithoutBuyerInput = {
    create?: XOR<ListingInterestCreateWithoutBuyerInput, ListingInterestUncheckedCreateWithoutBuyerInput> | ListingInterestCreateWithoutBuyerInput[] | ListingInterestUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: ListingInterestCreateOrConnectWithoutBuyerInput | ListingInterestCreateOrConnectWithoutBuyerInput[]
    createMany?: ListingInterestCreateManyBuyerInputEnvelope
    connect?: ListingInterestWhereUniqueInput | ListingInterestWhereUniqueInput[]
  }

  export type RefreshTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type DeviceCreateNestedManyWithoutUserInput = {
    create?: XOR<DeviceCreateWithoutUserInput, DeviceUncheckedCreateWithoutUserInput> | DeviceCreateWithoutUserInput[] | DeviceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DeviceCreateOrConnectWithoutUserInput | DeviceCreateOrConnectWithoutUserInput[]
    createMany?: DeviceCreateManyUserInputEnvelope
    connect?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
  }

  export type OAuthAccountCreateNestedManyWithoutUserInput = {
    create?: XOR<OAuthAccountCreateWithoutUserInput, OAuthAccountUncheckedCreateWithoutUserInput> | OAuthAccountCreateWithoutUserInput[] | OAuthAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthAccountCreateOrConnectWithoutUserInput | OAuthAccountCreateOrConnectWithoutUserInput[]
    createMany?: OAuthAccountCreateManyUserInputEnvelope
    connect?: OAuthAccountWhereUniqueInput | OAuthAccountWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutBuyerInput = {
    create?: XOR<ReviewCreateWithoutBuyerInput, ReviewUncheckedCreateWithoutBuyerInput> | ReviewCreateWithoutBuyerInput[] | ReviewUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutBuyerInput | ReviewCreateOrConnectWithoutBuyerInput[]
    createMany?: ReviewCreateManyBuyerInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutFarmerInput = {
    create?: XOR<ReviewCreateWithoutFarmerInput, ReviewUncheckedCreateWithoutFarmerInput> | ReviewCreateWithoutFarmerInput[] | ReviewUncheckedCreateWithoutFarmerInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutFarmerInput | ReviewCreateOrConnectWithoutFarmerInput[]
    createMany?: ReviewCreateManyFarmerInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type SavedListingCreateNestedManyWithoutBuyerInput = {
    create?: XOR<SavedListingCreateWithoutBuyerInput, SavedListingUncheckedCreateWithoutBuyerInput> | SavedListingCreateWithoutBuyerInput[] | SavedListingUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: SavedListingCreateOrConnectWithoutBuyerInput | SavedListingCreateOrConnectWithoutBuyerInput[]
    createMany?: SavedListingCreateManyBuyerInputEnvelope
    connect?: SavedListingWhereUniqueInput | SavedListingWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type ListingUncheckedCreateNestedManyWithoutFarmerInput = {
    create?: XOR<ListingCreateWithoutFarmerInput, ListingUncheckedCreateWithoutFarmerInput> | ListingCreateWithoutFarmerInput[] | ListingUncheckedCreateWithoutFarmerInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutFarmerInput | ListingCreateOrConnectWithoutFarmerInput[]
    createMany?: ListingCreateManyFarmerInputEnvelope
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutBuyerInput = {
    create?: XOR<OrderCreateWithoutBuyerInput, OrderUncheckedCreateWithoutBuyerInput> | OrderCreateWithoutBuyerInput[] | OrderUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutBuyerInput | OrderCreateOrConnectWithoutBuyerInput[]
    createMany?: OrderCreateManyBuyerInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutFarmerInput = {
    create?: XOR<OrderCreateWithoutFarmerInput, OrderUncheckedCreateWithoutFarmerInput> | OrderCreateWithoutFarmerInput[] | OrderUncheckedCreateWithoutFarmerInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutFarmerInput | OrderCreateOrConnectWithoutFarmerInput[]
    createMany?: OrderCreateManyFarmerInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type ListingInterestUncheckedCreateNestedManyWithoutBuyerInput = {
    create?: XOR<ListingInterestCreateWithoutBuyerInput, ListingInterestUncheckedCreateWithoutBuyerInput> | ListingInterestCreateWithoutBuyerInput[] | ListingInterestUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: ListingInterestCreateOrConnectWithoutBuyerInput | ListingInterestCreateOrConnectWithoutBuyerInput[]
    createMany?: ListingInterestCreateManyBuyerInputEnvelope
    connect?: ListingInterestWhereUniqueInput | ListingInterestWhereUniqueInput[]
  }

  export type RefreshTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type DeviceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DeviceCreateWithoutUserInput, DeviceUncheckedCreateWithoutUserInput> | DeviceCreateWithoutUserInput[] | DeviceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DeviceCreateOrConnectWithoutUserInput | DeviceCreateOrConnectWithoutUserInput[]
    createMany?: DeviceCreateManyUserInputEnvelope
    connect?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
  }

  export type OAuthAccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OAuthAccountCreateWithoutUserInput, OAuthAccountUncheckedCreateWithoutUserInput> | OAuthAccountCreateWithoutUserInput[] | OAuthAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthAccountCreateOrConnectWithoutUserInput | OAuthAccountCreateOrConnectWithoutUserInput[]
    createMany?: OAuthAccountCreateManyUserInputEnvelope
    connect?: OAuthAccountWhereUniqueInput | OAuthAccountWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutBuyerInput = {
    create?: XOR<ReviewCreateWithoutBuyerInput, ReviewUncheckedCreateWithoutBuyerInput> | ReviewCreateWithoutBuyerInput[] | ReviewUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutBuyerInput | ReviewCreateOrConnectWithoutBuyerInput[]
    createMany?: ReviewCreateManyBuyerInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutFarmerInput = {
    create?: XOR<ReviewCreateWithoutFarmerInput, ReviewUncheckedCreateWithoutFarmerInput> | ReviewCreateWithoutFarmerInput[] | ReviewUncheckedCreateWithoutFarmerInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutFarmerInput | ReviewCreateOrConnectWithoutFarmerInput[]
    createMany?: ReviewCreateManyFarmerInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type SavedListingUncheckedCreateNestedManyWithoutBuyerInput = {
    create?: XOR<SavedListingCreateWithoutBuyerInput, SavedListingUncheckedCreateWithoutBuyerInput> | SavedListingCreateWithoutBuyerInput[] | SavedListingUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: SavedListingCreateOrConnectWithoutBuyerInput | SavedListingCreateOrConnectWithoutBuyerInput[]
    createMany?: SavedListingCreateManyBuyerInputEnvelope
    connect?: SavedListingWhereUniqueInput | SavedListingWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumAccountStatusFieldUpdateOperationsInput = {
    set?: $Enums.AccountStatus
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ListingUpdateManyWithoutFarmerNestedInput = {
    create?: XOR<ListingCreateWithoutFarmerInput, ListingUncheckedCreateWithoutFarmerInput> | ListingCreateWithoutFarmerInput[] | ListingUncheckedCreateWithoutFarmerInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutFarmerInput | ListingCreateOrConnectWithoutFarmerInput[]
    upsert?: ListingUpsertWithWhereUniqueWithoutFarmerInput | ListingUpsertWithWhereUniqueWithoutFarmerInput[]
    createMany?: ListingCreateManyFarmerInputEnvelope
    set?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    disconnect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    delete?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    update?: ListingUpdateWithWhereUniqueWithoutFarmerInput | ListingUpdateWithWhereUniqueWithoutFarmerInput[]
    updateMany?: ListingUpdateManyWithWhereWithoutFarmerInput | ListingUpdateManyWithWhereWithoutFarmerInput[]
    deleteMany?: ListingScalarWhereInput | ListingScalarWhereInput[]
  }

  export type OrderUpdateManyWithoutBuyerNestedInput = {
    create?: XOR<OrderCreateWithoutBuyerInput, OrderUncheckedCreateWithoutBuyerInput> | OrderCreateWithoutBuyerInput[] | OrderUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutBuyerInput | OrderCreateOrConnectWithoutBuyerInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutBuyerInput | OrderUpsertWithWhereUniqueWithoutBuyerInput[]
    createMany?: OrderCreateManyBuyerInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutBuyerInput | OrderUpdateWithWhereUniqueWithoutBuyerInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutBuyerInput | OrderUpdateManyWithWhereWithoutBuyerInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type OrderUpdateManyWithoutFarmerNestedInput = {
    create?: XOR<OrderCreateWithoutFarmerInput, OrderUncheckedCreateWithoutFarmerInput> | OrderCreateWithoutFarmerInput[] | OrderUncheckedCreateWithoutFarmerInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutFarmerInput | OrderCreateOrConnectWithoutFarmerInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutFarmerInput | OrderUpsertWithWhereUniqueWithoutFarmerInput[]
    createMany?: OrderCreateManyFarmerInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutFarmerInput | OrderUpdateWithWhereUniqueWithoutFarmerInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutFarmerInput | OrderUpdateManyWithWhereWithoutFarmerInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type ListingInterestUpdateManyWithoutBuyerNestedInput = {
    create?: XOR<ListingInterestCreateWithoutBuyerInput, ListingInterestUncheckedCreateWithoutBuyerInput> | ListingInterestCreateWithoutBuyerInput[] | ListingInterestUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: ListingInterestCreateOrConnectWithoutBuyerInput | ListingInterestCreateOrConnectWithoutBuyerInput[]
    upsert?: ListingInterestUpsertWithWhereUniqueWithoutBuyerInput | ListingInterestUpsertWithWhereUniqueWithoutBuyerInput[]
    createMany?: ListingInterestCreateManyBuyerInputEnvelope
    set?: ListingInterestWhereUniqueInput | ListingInterestWhereUniqueInput[]
    disconnect?: ListingInterestWhereUniqueInput | ListingInterestWhereUniqueInput[]
    delete?: ListingInterestWhereUniqueInput | ListingInterestWhereUniqueInput[]
    connect?: ListingInterestWhereUniqueInput | ListingInterestWhereUniqueInput[]
    update?: ListingInterestUpdateWithWhereUniqueWithoutBuyerInput | ListingInterestUpdateWithWhereUniqueWithoutBuyerInput[]
    updateMany?: ListingInterestUpdateManyWithWhereWithoutBuyerInput | ListingInterestUpdateManyWithWhereWithoutBuyerInput[]
    deleteMany?: ListingInterestScalarWhereInput | ListingInterestScalarWhereInput[]
  }

  export type RefreshTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type DeviceUpdateManyWithoutUserNestedInput = {
    create?: XOR<DeviceCreateWithoutUserInput, DeviceUncheckedCreateWithoutUserInput> | DeviceCreateWithoutUserInput[] | DeviceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DeviceCreateOrConnectWithoutUserInput | DeviceCreateOrConnectWithoutUserInput[]
    upsert?: DeviceUpsertWithWhereUniqueWithoutUserInput | DeviceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DeviceCreateManyUserInputEnvelope
    set?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    disconnect?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    delete?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    connect?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    update?: DeviceUpdateWithWhereUniqueWithoutUserInput | DeviceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DeviceUpdateManyWithWhereWithoutUserInput | DeviceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DeviceScalarWhereInput | DeviceScalarWhereInput[]
  }

  export type OAuthAccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<OAuthAccountCreateWithoutUserInput, OAuthAccountUncheckedCreateWithoutUserInput> | OAuthAccountCreateWithoutUserInput[] | OAuthAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthAccountCreateOrConnectWithoutUserInput | OAuthAccountCreateOrConnectWithoutUserInput[]
    upsert?: OAuthAccountUpsertWithWhereUniqueWithoutUserInput | OAuthAccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OAuthAccountCreateManyUserInputEnvelope
    set?: OAuthAccountWhereUniqueInput | OAuthAccountWhereUniqueInput[]
    disconnect?: OAuthAccountWhereUniqueInput | OAuthAccountWhereUniqueInput[]
    delete?: OAuthAccountWhereUniqueInput | OAuthAccountWhereUniqueInput[]
    connect?: OAuthAccountWhereUniqueInput | OAuthAccountWhereUniqueInput[]
    update?: OAuthAccountUpdateWithWhereUniqueWithoutUserInput | OAuthAccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OAuthAccountUpdateManyWithWhereWithoutUserInput | OAuthAccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OAuthAccountScalarWhereInput | OAuthAccountScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutBuyerNestedInput = {
    create?: XOR<ReviewCreateWithoutBuyerInput, ReviewUncheckedCreateWithoutBuyerInput> | ReviewCreateWithoutBuyerInput[] | ReviewUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutBuyerInput | ReviewCreateOrConnectWithoutBuyerInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutBuyerInput | ReviewUpsertWithWhereUniqueWithoutBuyerInput[]
    createMany?: ReviewCreateManyBuyerInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutBuyerInput | ReviewUpdateWithWhereUniqueWithoutBuyerInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutBuyerInput | ReviewUpdateManyWithWhereWithoutBuyerInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutFarmerNestedInput = {
    create?: XOR<ReviewCreateWithoutFarmerInput, ReviewUncheckedCreateWithoutFarmerInput> | ReviewCreateWithoutFarmerInput[] | ReviewUncheckedCreateWithoutFarmerInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutFarmerInput | ReviewCreateOrConnectWithoutFarmerInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutFarmerInput | ReviewUpsertWithWhereUniqueWithoutFarmerInput[]
    createMany?: ReviewCreateManyFarmerInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutFarmerInput | ReviewUpdateWithWhereUniqueWithoutFarmerInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutFarmerInput | ReviewUpdateManyWithWhereWithoutFarmerInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type SavedListingUpdateManyWithoutBuyerNestedInput = {
    create?: XOR<SavedListingCreateWithoutBuyerInput, SavedListingUncheckedCreateWithoutBuyerInput> | SavedListingCreateWithoutBuyerInput[] | SavedListingUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: SavedListingCreateOrConnectWithoutBuyerInput | SavedListingCreateOrConnectWithoutBuyerInput[]
    upsert?: SavedListingUpsertWithWhereUniqueWithoutBuyerInput | SavedListingUpsertWithWhereUniqueWithoutBuyerInput[]
    createMany?: SavedListingCreateManyBuyerInputEnvelope
    set?: SavedListingWhereUniqueInput | SavedListingWhereUniqueInput[]
    disconnect?: SavedListingWhereUniqueInput | SavedListingWhereUniqueInput[]
    delete?: SavedListingWhereUniqueInput | SavedListingWhereUniqueInput[]
    connect?: SavedListingWhereUniqueInput | SavedListingWhereUniqueInput[]
    update?: SavedListingUpdateWithWhereUniqueWithoutBuyerInput | SavedListingUpdateWithWhereUniqueWithoutBuyerInput[]
    updateMany?: SavedListingUpdateManyWithWhereWithoutBuyerInput | SavedListingUpdateManyWithWhereWithoutBuyerInput[]
    deleteMany?: SavedListingScalarWhereInput | SavedListingScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type ListingUncheckedUpdateManyWithoutFarmerNestedInput = {
    create?: XOR<ListingCreateWithoutFarmerInput, ListingUncheckedCreateWithoutFarmerInput> | ListingCreateWithoutFarmerInput[] | ListingUncheckedCreateWithoutFarmerInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutFarmerInput | ListingCreateOrConnectWithoutFarmerInput[]
    upsert?: ListingUpsertWithWhereUniqueWithoutFarmerInput | ListingUpsertWithWhereUniqueWithoutFarmerInput[]
    createMany?: ListingCreateManyFarmerInputEnvelope
    set?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    disconnect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    delete?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    update?: ListingUpdateWithWhereUniqueWithoutFarmerInput | ListingUpdateWithWhereUniqueWithoutFarmerInput[]
    updateMany?: ListingUpdateManyWithWhereWithoutFarmerInput | ListingUpdateManyWithWhereWithoutFarmerInput[]
    deleteMany?: ListingScalarWhereInput | ListingScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutBuyerNestedInput = {
    create?: XOR<OrderCreateWithoutBuyerInput, OrderUncheckedCreateWithoutBuyerInput> | OrderCreateWithoutBuyerInput[] | OrderUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutBuyerInput | OrderCreateOrConnectWithoutBuyerInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutBuyerInput | OrderUpsertWithWhereUniqueWithoutBuyerInput[]
    createMany?: OrderCreateManyBuyerInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutBuyerInput | OrderUpdateWithWhereUniqueWithoutBuyerInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutBuyerInput | OrderUpdateManyWithWhereWithoutBuyerInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutFarmerNestedInput = {
    create?: XOR<OrderCreateWithoutFarmerInput, OrderUncheckedCreateWithoutFarmerInput> | OrderCreateWithoutFarmerInput[] | OrderUncheckedCreateWithoutFarmerInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutFarmerInput | OrderCreateOrConnectWithoutFarmerInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutFarmerInput | OrderUpsertWithWhereUniqueWithoutFarmerInput[]
    createMany?: OrderCreateManyFarmerInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutFarmerInput | OrderUpdateWithWhereUniqueWithoutFarmerInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutFarmerInput | OrderUpdateManyWithWhereWithoutFarmerInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type ListingInterestUncheckedUpdateManyWithoutBuyerNestedInput = {
    create?: XOR<ListingInterestCreateWithoutBuyerInput, ListingInterestUncheckedCreateWithoutBuyerInput> | ListingInterestCreateWithoutBuyerInput[] | ListingInterestUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: ListingInterestCreateOrConnectWithoutBuyerInput | ListingInterestCreateOrConnectWithoutBuyerInput[]
    upsert?: ListingInterestUpsertWithWhereUniqueWithoutBuyerInput | ListingInterestUpsertWithWhereUniqueWithoutBuyerInput[]
    createMany?: ListingInterestCreateManyBuyerInputEnvelope
    set?: ListingInterestWhereUniqueInput | ListingInterestWhereUniqueInput[]
    disconnect?: ListingInterestWhereUniqueInput | ListingInterestWhereUniqueInput[]
    delete?: ListingInterestWhereUniqueInput | ListingInterestWhereUniqueInput[]
    connect?: ListingInterestWhereUniqueInput | ListingInterestWhereUniqueInput[]
    update?: ListingInterestUpdateWithWhereUniqueWithoutBuyerInput | ListingInterestUpdateWithWhereUniqueWithoutBuyerInput[]
    updateMany?: ListingInterestUpdateManyWithWhereWithoutBuyerInput | ListingInterestUpdateManyWithWhereWithoutBuyerInput[]
    deleteMany?: ListingInterestScalarWhereInput | ListingInterestScalarWhereInput[]
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type DeviceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DeviceCreateWithoutUserInput, DeviceUncheckedCreateWithoutUserInput> | DeviceCreateWithoutUserInput[] | DeviceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DeviceCreateOrConnectWithoutUserInput | DeviceCreateOrConnectWithoutUserInput[]
    upsert?: DeviceUpsertWithWhereUniqueWithoutUserInput | DeviceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DeviceCreateManyUserInputEnvelope
    set?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    disconnect?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    delete?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    connect?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    update?: DeviceUpdateWithWhereUniqueWithoutUserInput | DeviceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DeviceUpdateManyWithWhereWithoutUserInput | DeviceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DeviceScalarWhereInput | DeviceScalarWhereInput[]
  }

  export type OAuthAccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OAuthAccountCreateWithoutUserInput, OAuthAccountUncheckedCreateWithoutUserInput> | OAuthAccountCreateWithoutUserInput[] | OAuthAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthAccountCreateOrConnectWithoutUserInput | OAuthAccountCreateOrConnectWithoutUserInput[]
    upsert?: OAuthAccountUpsertWithWhereUniqueWithoutUserInput | OAuthAccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OAuthAccountCreateManyUserInputEnvelope
    set?: OAuthAccountWhereUniqueInput | OAuthAccountWhereUniqueInput[]
    disconnect?: OAuthAccountWhereUniqueInput | OAuthAccountWhereUniqueInput[]
    delete?: OAuthAccountWhereUniqueInput | OAuthAccountWhereUniqueInput[]
    connect?: OAuthAccountWhereUniqueInput | OAuthAccountWhereUniqueInput[]
    update?: OAuthAccountUpdateWithWhereUniqueWithoutUserInput | OAuthAccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OAuthAccountUpdateManyWithWhereWithoutUserInput | OAuthAccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OAuthAccountScalarWhereInput | OAuthAccountScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutBuyerNestedInput = {
    create?: XOR<ReviewCreateWithoutBuyerInput, ReviewUncheckedCreateWithoutBuyerInput> | ReviewCreateWithoutBuyerInput[] | ReviewUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutBuyerInput | ReviewCreateOrConnectWithoutBuyerInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutBuyerInput | ReviewUpsertWithWhereUniqueWithoutBuyerInput[]
    createMany?: ReviewCreateManyBuyerInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutBuyerInput | ReviewUpdateWithWhereUniqueWithoutBuyerInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutBuyerInput | ReviewUpdateManyWithWhereWithoutBuyerInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutFarmerNestedInput = {
    create?: XOR<ReviewCreateWithoutFarmerInput, ReviewUncheckedCreateWithoutFarmerInput> | ReviewCreateWithoutFarmerInput[] | ReviewUncheckedCreateWithoutFarmerInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutFarmerInput | ReviewCreateOrConnectWithoutFarmerInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutFarmerInput | ReviewUpsertWithWhereUniqueWithoutFarmerInput[]
    createMany?: ReviewCreateManyFarmerInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutFarmerInput | ReviewUpdateWithWhereUniqueWithoutFarmerInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutFarmerInput | ReviewUpdateManyWithWhereWithoutFarmerInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type SavedListingUncheckedUpdateManyWithoutBuyerNestedInput = {
    create?: XOR<SavedListingCreateWithoutBuyerInput, SavedListingUncheckedCreateWithoutBuyerInput> | SavedListingCreateWithoutBuyerInput[] | SavedListingUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: SavedListingCreateOrConnectWithoutBuyerInput | SavedListingCreateOrConnectWithoutBuyerInput[]
    upsert?: SavedListingUpsertWithWhereUniqueWithoutBuyerInput | SavedListingUpsertWithWhereUniqueWithoutBuyerInput[]
    createMany?: SavedListingCreateManyBuyerInputEnvelope
    set?: SavedListingWhereUniqueInput | SavedListingWhereUniqueInput[]
    disconnect?: SavedListingWhereUniqueInput | SavedListingWhereUniqueInput[]
    delete?: SavedListingWhereUniqueInput | SavedListingWhereUniqueInput[]
    connect?: SavedListingWhereUniqueInput | SavedListingWhereUniqueInput[]
    update?: SavedListingUpdateWithWhereUniqueWithoutBuyerInput | SavedListingUpdateWithWhereUniqueWithoutBuyerInput[]
    updateMany?: SavedListingUpdateManyWithWhereWithoutBuyerInput | SavedListingUpdateManyWithWhereWithoutBuyerInput[]
    deleteMany?: SavedListingScalarWhereInput | SavedListingScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutOauthAccountsInput = {
    create?: XOR<UserCreateWithoutOauthAccountsInput, UserUncheckedCreateWithoutOauthAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOauthAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumOAuthProviderFieldUpdateOperationsInput = {
    set?: $Enums.OAuthProvider
  }

  export type UserUpdateOneRequiredWithoutOauthAccountsNestedInput = {
    create?: XOR<UserCreateWithoutOauthAccountsInput, UserUncheckedCreateWithoutOauthAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOauthAccountsInput
    upsert?: UserUpsertWithoutOauthAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOauthAccountsInput, UserUpdateWithoutOauthAccountsInput>, UserUncheckedUpdateWithoutOauthAccountsInput>
  }

  export type UserCreateNestedOneWithoutDevicesInput = {
    create?: XOR<UserCreateWithoutDevicesInput, UserUncheckedCreateWithoutDevicesInput>
    connectOrCreate?: UserCreateOrConnectWithoutDevicesInput
    connect?: UserWhereUniqueInput
  }

  export type RefreshTokenCreateNestedManyWithoutDeviceInput = {
    create?: XOR<RefreshTokenCreateWithoutDeviceInput, RefreshTokenUncheckedCreateWithoutDeviceInput> | RefreshTokenCreateWithoutDeviceInput[] | RefreshTokenUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutDeviceInput | RefreshTokenCreateOrConnectWithoutDeviceInput[]
    createMany?: RefreshTokenCreateManyDeviceInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type RefreshTokenUncheckedCreateNestedManyWithoutDeviceInput = {
    create?: XOR<RefreshTokenCreateWithoutDeviceInput, RefreshTokenUncheckedCreateWithoutDeviceInput> | RefreshTokenCreateWithoutDeviceInput[] | RefreshTokenUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutDeviceInput | RefreshTokenCreateOrConnectWithoutDeviceInput[]
    createMany?: RefreshTokenCreateManyDeviceInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type EnumDevicePlatformFieldUpdateOperationsInput = {
    set?: $Enums.DevicePlatform
  }

  export type UserUpdateOneRequiredWithoutDevicesNestedInput = {
    create?: XOR<UserCreateWithoutDevicesInput, UserUncheckedCreateWithoutDevicesInput>
    connectOrCreate?: UserCreateOrConnectWithoutDevicesInput
    upsert?: UserUpsertWithoutDevicesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDevicesInput, UserUpdateWithoutDevicesInput>, UserUncheckedUpdateWithoutDevicesInput>
  }

  export type RefreshTokenUpdateManyWithoutDeviceNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutDeviceInput, RefreshTokenUncheckedCreateWithoutDeviceInput> | RefreshTokenCreateWithoutDeviceInput[] | RefreshTokenUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutDeviceInput | RefreshTokenCreateOrConnectWithoutDeviceInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutDeviceInput | RefreshTokenUpsertWithWhereUniqueWithoutDeviceInput[]
    createMany?: RefreshTokenCreateManyDeviceInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutDeviceInput | RefreshTokenUpdateWithWhereUniqueWithoutDeviceInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutDeviceInput | RefreshTokenUpdateManyWithWhereWithoutDeviceInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type RefreshTokenUncheckedUpdateManyWithoutDeviceNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutDeviceInput, RefreshTokenUncheckedCreateWithoutDeviceInput> | RefreshTokenCreateWithoutDeviceInput[] | RefreshTokenUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutDeviceInput | RefreshTokenCreateOrConnectWithoutDeviceInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutDeviceInput | RefreshTokenUpsertWithWhereUniqueWithoutDeviceInput[]
    createMany?: RefreshTokenCreateManyDeviceInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutDeviceInput | RefreshTokenUpdateWithWhereUniqueWithoutDeviceInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutDeviceInput | RefreshTokenUpdateManyWithWhereWithoutDeviceInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutRefreshTokensInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput
    connect?: UserWhereUniqueInput
  }

  export type DeviceCreateNestedOneWithoutRefreshTokensInput = {
    create?: XOR<DeviceCreateWithoutRefreshTokensInput, DeviceUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: DeviceCreateOrConnectWithoutRefreshTokensInput
    connect?: DeviceWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRefreshTokensNestedInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput
    upsert?: UserUpsertWithoutRefreshTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRefreshTokensInput, UserUpdateWithoutRefreshTokensInput>, UserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type DeviceUpdateOneWithoutRefreshTokensNestedInput = {
    create?: XOR<DeviceCreateWithoutRefreshTokensInput, DeviceUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: DeviceCreateOrConnectWithoutRefreshTokensInput
    upsert?: DeviceUpsertWithoutRefreshTokensInput
    disconnect?: DeviceWhereInput | boolean
    delete?: DeviceWhereInput | boolean
    connect?: DeviceWhereUniqueInput
    update?: XOR<XOR<DeviceUpdateToOneWithWhereWithoutRefreshTokensInput, DeviceUpdateWithoutRefreshTokensInput>, DeviceUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type OtpVerificationTokenCreateNestedManyWithoutOtpCodeInput = {
    create?: XOR<OtpVerificationTokenCreateWithoutOtpCodeInput, OtpVerificationTokenUncheckedCreateWithoutOtpCodeInput> | OtpVerificationTokenCreateWithoutOtpCodeInput[] | OtpVerificationTokenUncheckedCreateWithoutOtpCodeInput[]
    connectOrCreate?: OtpVerificationTokenCreateOrConnectWithoutOtpCodeInput | OtpVerificationTokenCreateOrConnectWithoutOtpCodeInput[]
    createMany?: OtpVerificationTokenCreateManyOtpCodeInputEnvelope
    connect?: OtpVerificationTokenWhereUniqueInput | OtpVerificationTokenWhereUniqueInput[]
  }

  export type OtpVerificationTokenUncheckedCreateNestedManyWithoutOtpCodeInput = {
    create?: XOR<OtpVerificationTokenCreateWithoutOtpCodeInput, OtpVerificationTokenUncheckedCreateWithoutOtpCodeInput> | OtpVerificationTokenCreateWithoutOtpCodeInput[] | OtpVerificationTokenUncheckedCreateWithoutOtpCodeInput[]
    connectOrCreate?: OtpVerificationTokenCreateOrConnectWithoutOtpCodeInput | OtpVerificationTokenCreateOrConnectWithoutOtpCodeInput[]
    createMany?: OtpVerificationTokenCreateManyOtpCodeInputEnvelope
    connect?: OtpVerificationTokenWhereUniqueInput | OtpVerificationTokenWhereUniqueInput[]
  }

  export type EnumOtpPurposeFieldUpdateOperationsInput = {
    set?: $Enums.OtpPurpose
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type OtpVerificationTokenUpdateManyWithoutOtpCodeNestedInput = {
    create?: XOR<OtpVerificationTokenCreateWithoutOtpCodeInput, OtpVerificationTokenUncheckedCreateWithoutOtpCodeInput> | OtpVerificationTokenCreateWithoutOtpCodeInput[] | OtpVerificationTokenUncheckedCreateWithoutOtpCodeInput[]
    connectOrCreate?: OtpVerificationTokenCreateOrConnectWithoutOtpCodeInput | OtpVerificationTokenCreateOrConnectWithoutOtpCodeInput[]
    upsert?: OtpVerificationTokenUpsertWithWhereUniqueWithoutOtpCodeInput | OtpVerificationTokenUpsertWithWhereUniqueWithoutOtpCodeInput[]
    createMany?: OtpVerificationTokenCreateManyOtpCodeInputEnvelope
    set?: OtpVerificationTokenWhereUniqueInput | OtpVerificationTokenWhereUniqueInput[]
    disconnect?: OtpVerificationTokenWhereUniqueInput | OtpVerificationTokenWhereUniqueInput[]
    delete?: OtpVerificationTokenWhereUniqueInput | OtpVerificationTokenWhereUniqueInput[]
    connect?: OtpVerificationTokenWhereUniqueInput | OtpVerificationTokenWhereUniqueInput[]
    update?: OtpVerificationTokenUpdateWithWhereUniqueWithoutOtpCodeInput | OtpVerificationTokenUpdateWithWhereUniqueWithoutOtpCodeInput[]
    updateMany?: OtpVerificationTokenUpdateManyWithWhereWithoutOtpCodeInput | OtpVerificationTokenUpdateManyWithWhereWithoutOtpCodeInput[]
    deleteMany?: OtpVerificationTokenScalarWhereInput | OtpVerificationTokenScalarWhereInput[]
  }

  export type OtpVerificationTokenUncheckedUpdateManyWithoutOtpCodeNestedInput = {
    create?: XOR<OtpVerificationTokenCreateWithoutOtpCodeInput, OtpVerificationTokenUncheckedCreateWithoutOtpCodeInput> | OtpVerificationTokenCreateWithoutOtpCodeInput[] | OtpVerificationTokenUncheckedCreateWithoutOtpCodeInput[]
    connectOrCreate?: OtpVerificationTokenCreateOrConnectWithoutOtpCodeInput | OtpVerificationTokenCreateOrConnectWithoutOtpCodeInput[]
    upsert?: OtpVerificationTokenUpsertWithWhereUniqueWithoutOtpCodeInput | OtpVerificationTokenUpsertWithWhereUniqueWithoutOtpCodeInput[]
    createMany?: OtpVerificationTokenCreateManyOtpCodeInputEnvelope
    set?: OtpVerificationTokenWhereUniqueInput | OtpVerificationTokenWhereUniqueInput[]
    disconnect?: OtpVerificationTokenWhereUniqueInput | OtpVerificationTokenWhereUniqueInput[]
    delete?: OtpVerificationTokenWhereUniqueInput | OtpVerificationTokenWhereUniqueInput[]
    connect?: OtpVerificationTokenWhereUniqueInput | OtpVerificationTokenWhereUniqueInput[]
    update?: OtpVerificationTokenUpdateWithWhereUniqueWithoutOtpCodeInput | OtpVerificationTokenUpdateWithWhereUniqueWithoutOtpCodeInput[]
    updateMany?: OtpVerificationTokenUpdateManyWithWhereWithoutOtpCodeInput | OtpVerificationTokenUpdateManyWithWhereWithoutOtpCodeInput[]
    deleteMany?: OtpVerificationTokenScalarWhereInput | OtpVerificationTokenScalarWhereInput[]
  }

  export type OtpCodeCreateNestedOneWithoutVerificationTokensInput = {
    create?: XOR<OtpCodeCreateWithoutVerificationTokensInput, OtpCodeUncheckedCreateWithoutVerificationTokensInput>
    connectOrCreate?: OtpCodeCreateOrConnectWithoutVerificationTokensInput
    connect?: OtpCodeWhereUniqueInput
  }

  export type OtpCodeUpdateOneRequiredWithoutVerificationTokensNestedInput = {
    create?: XOR<OtpCodeCreateWithoutVerificationTokensInput, OtpCodeUncheckedCreateWithoutVerificationTokensInput>
    connectOrCreate?: OtpCodeCreateOrConnectWithoutVerificationTokensInput
    upsert?: OtpCodeUpsertWithoutVerificationTokensInput
    connect?: OtpCodeWhereUniqueInput
    update?: XOR<XOR<OtpCodeUpdateToOneWithWhereWithoutVerificationTokensInput, OtpCodeUpdateWithoutVerificationTokensInput>, OtpCodeUncheckedUpdateWithoutVerificationTokensInput>
  }

  export type ListingCreateimagesInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutListingsInput = {
    create?: XOR<UserCreateWithoutListingsInput, UserUncheckedCreateWithoutListingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutListingsInput
    connect?: UserWhereUniqueInput
  }

  export type OrderCreateNestedManyWithoutListingInput = {
    create?: XOR<OrderCreateWithoutListingInput, OrderUncheckedCreateWithoutListingInput> | OrderCreateWithoutListingInput[] | OrderUncheckedCreateWithoutListingInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutListingInput | OrderCreateOrConnectWithoutListingInput[]
    createMany?: OrderCreateManyListingInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type ListingInterestCreateNestedManyWithoutListingInput = {
    create?: XOR<ListingInterestCreateWithoutListingInput, ListingInterestUncheckedCreateWithoutListingInput> | ListingInterestCreateWithoutListingInput[] | ListingInterestUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ListingInterestCreateOrConnectWithoutListingInput | ListingInterestCreateOrConnectWithoutListingInput[]
    createMany?: ListingInterestCreateManyListingInputEnvelope
    connect?: ListingInterestWhereUniqueInput | ListingInterestWhereUniqueInput[]
  }

  export type SavedListingCreateNestedManyWithoutListingInput = {
    create?: XOR<SavedListingCreateWithoutListingInput, SavedListingUncheckedCreateWithoutListingInput> | SavedListingCreateWithoutListingInput[] | SavedListingUncheckedCreateWithoutListingInput[]
    connectOrCreate?: SavedListingCreateOrConnectWithoutListingInput | SavedListingCreateOrConnectWithoutListingInput[]
    createMany?: SavedListingCreateManyListingInputEnvelope
    connect?: SavedListingWhereUniqueInput | SavedListingWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutListingInput = {
    create?: XOR<OrderCreateWithoutListingInput, OrderUncheckedCreateWithoutListingInput> | OrderCreateWithoutListingInput[] | OrderUncheckedCreateWithoutListingInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutListingInput | OrderCreateOrConnectWithoutListingInput[]
    createMany?: OrderCreateManyListingInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type ListingInterestUncheckedCreateNestedManyWithoutListingInput = {
    create?: XOR<ListingInterestCreateWithoutListingInput, ListingInterestUncheckedCreateWithoutListingInput> | ListingInterestCreateWithoutListingInput[] | ListingInterestUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ListingInterestCreateOrConnectWithoutListingInput | ListingInterestCreateOrConnectWithoutListingInput[]
    createMany?: ListingInterestCreateManyListingInputEnvelope
    connect?: ListingInterestWhereUniqueInput | ListingInterestWhereUniqueInput[]
  }

  export type SavedListingUncheckedCreateNestedManyWithoutListingInput = {
    create?: XOR<SavedListingCreateWithoutListingInput, SavedListingUncheckedCreateWithoutListingInput> | SavedListingCreateWithoutListingInput[] | SavedListingUncheckedCreateWithoutListingInput[]
    connectOrCreate?: SavedListingCreateOrConnectWithoutListingInput | SavedListingCreateOrConnectWithoutListingInput[]
    createMany?: SavedListingCreateManyListingInputEnvelope
    connect?: SavedListingWhereUniqueInput | SavedListingWhereUniqueInput[]
  }

  export type EnumCropTypeFieldUpdateOperationsInput = {
    set?: $Enums.CropType
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumQuantityUnitFieldUpdateOperationsInput = {
    set?: $Enums.QuantityUnit
  }

  export type ListingUpdateimagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumListingStatusFieldUpdateOperationsInput = {
    set?: $Enums.ListingStatus
  }

  export type UserUpdateOneRequiredWithoutListingsNestedInput = {
    create?: XOR<UserCreateWithoutListingsInput, UserUncheckedCreateWithoutListingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutListingsInput
    upsert?: UserUpsertWithoutListingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutListingsInput, UserUpdateWithoutListingsInput>, UserUncheckedUpdateWithoutListingsInput>
  }

  export type OrderUpdateManyWithoutListingNestedInput = {
    create?: XOR<OrderCreateWithoutListingInput, OrderUncheckedCreateWithoutListingInput> | OrderCreateWithoutListingInput[] | OrderUncheckedCreateWithoutListingInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutListingInput | OrderCreateOrConnectWithoutListingInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutListingInput | OrderUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: OrderCreateManyListingInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutListingInput | OrderUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutListingInput | OrderUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type ListingInterestUpdateManyWithoutListingNestedInput = {
    create?: XOR<ListingInterestCreateWithoutListingInput, ListingInterestUncheckedCreateWithoutListingInput> | ListingInterestCreateWithoutListingInput[] | ListingInterestUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ListingInterestCreateOrConnectWithoutListingInput | ListingInterestCreateOrConnectWithoutListingInput[]
    upsert?: ListingInterestUpsertWithWhereUniqueWithoutListingInput | ListingInterestUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: ListingInterestCreateManyListingInputEnvelope
    set?: ListingInterestWhereUniqueInput | ListingInterestWhereUniqueInput[]
    disconnect?: ListingInterestWhereUniqueInput | ListingInterestWhereUniqueInput[]
    delete?: ListingInterestWhereUniqueInput | ListingInterestWhereUniqueInput[]
    connect?: ListingInterestWhereUniqueInput | ListingInterestWhereUniqueInput[]
    update?: ListingInterestUpdateWithWhereUniqueWithoutListingInput | ListingInterestUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: ListingInterestUpdateManyWithWhereWithoutListingInput | ListingInterestUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: ListingInterestScalarWhereInput | ListingInterestScalarWhereInput[]
  }

  export type SavedListingUpdateManyWithoutListingNestedInput = {
    create?: XOR<SavedListingCreateWithoutListingInput, SavedListingUncheckedCreateWithoutListingInput> | SavedListingCreateWithoutListingInput[] | SavedListingUncheckedCreateWithoutListingInput[]
    connectOrCreate?: SavedListingCreateOrConnectWithoutListingInput | SavedListingCreateOrConnectWithoutListingInput[]
    upsert?: SavedListingUpsertWithWhereUniqueWithoutListingInput | SavedListingUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: SavedListingCreateManyListingInputEnvelope
    set?: SavedListingWhereUniqueInput | SavedListingWhereUniqueInput[]
    disconnect?: SavedListingWhereUniqueInput | SavedListingWhereUniqueInput[]
    delete?: SavedListingWhereUniqueInput | SavedListingWhereUniqueInput[]
    connect?: SavedListingWhereUniqueInput | SavedListingWhereUniqueInput[]
    update?: SavedListingUpdateWithWhereUniqueWithoutListingInput | SavedListingUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: SavedListingUpdateManyWithWhereWithoutListingInput | SavedListingUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: SavedListingScalarWhereInput | SavedListingScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutListingNestedInput = {
    create?: XOR<OrderCreateWithoutListingInput, OrderUncheckedCreateWithoutListingInput> | OrderCreateWithoutListingInput[] | OrderUncheckedCreateWithoutListingInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutListingInput | OrderCreateOrConnectWithoutListingInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutListingInput | OrderUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: OrderCreateManyListingInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutListingInput | OrderUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutListingInput | OrderUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type ListingInterestUncheckedUpdateManyWithoutListingNestedInput = {
    create?: XOR<ListingInterestCreateWithoutListingInput, ListingInterestUncheckedCreateWithoutListingInput> | ListingInterestCreateWithoutListingInput[] | ListingInterestUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ListingInterestCreateOrConnectWithoutListingInput | ListingInterestCreateOrConnectWithoutListingInput[]
    upsert?: ListingInterestUpsertWithWhereUniqueWithoutListingInput | ListingInterestUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: ListingInterestCreateManyListingInputEnvelope
    set?: ListingInterestWhereUniqueInput | ListingInterestWhereUniqueInput[]
    disconnect?: ListingInterestWhereUniqueInput | ListingInterestWhereUniqueInput[]
    delete?: ListingInterestWhereUniqueInput | ListingInterestWhereUniqueInput[]
    connect?: ListingInterestWhereUniqueInput | ListingInterestWhereUniqueInput[]
    update?: ListingInterestUpdateWithWhereUniqueWithoutListingInput | ListingInterestUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: ListingInterestUpdateManyWithWhereWithoutListingInput | ListingInterestUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: ListingInterestScalarWhereInput | ListingInterestScalarWhereInput[]
  }

  export type SavedListingUncheckedUpdateManyWithoutListingNestedInput = {
    create?: XOR<SavedListingCreateWithoutListingInput, SavedListingUncheckedCreateWithoutListingInput> | SavedListingCreateWithoutListingInput[] | SavedListingUncheckedCreateWithoutListingInput[]
    connectOrCreate?: SavedListingCreateOrConnectWithoutListingInput | SavedListingCreateOrConnectWithoutListingInput[]
    upsert?: SavedListingUpsertWithWhereUniqueWithoutListingInput | SavedListingUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: SavedListingCreateManyListingInputEnvelope
    set?: SavedListingWhereUniqueInput | SavedListingWhereUniqueInput[]
    disconnect?: SavedListingWhereUniqueInput | SavedListingWhereUniqueInput[]
    delete?: SavedListingWhereUniqueInput | SavedListingWhereUniqueInput[]
    connect?: SavedListingWhereUniqueInput | SavedListingWhereUniqueInput[]
    update?: SavedListingUpdateWithWhereUniqueWithoutListingInput | SavedListingUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: SavedListingUpdateManyWithWhereWithoutListingInput | SavedListingUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: SavedListingScalarWhereInput | SavedListingScalarWhereInput[]
  }

  export type ListingCreateNestedOneWithoutInterestsInput = {
    create?: XOR<ListingCreateWithoutInterestsInput, ListingUncheckedCreateWithoutInterestsInput>
    connectOrCreate?: ListingCreateOrConnectWithoutInterestsInput
    connect?: ListingWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutExpressedInterestsInput = {
    create?: XOR<UserCreateWithoutExpressedInterestsInput, UserUncheckedCreateWithoutExpressedInterestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutExpressedInterestsInput
    connect?: UserWhereUniqueInput
  }

  export type ListingUpdateOneRequiredWithoutInterestsNestedInput = {
    create?: XOR<ListingCreateWithoutInterestsInput, ListingUncheckedCreateWithoutInterestsInput>
    connectOrCreate?: ListingCreateOrConnectWithoutInterestsInput
    upsert?: ListingUpsertWithoutInterestsInput
    connect?: ListingWhereUniqueInput
    update?: XOR<XOR<ListingUpdateToOneWithWhereWithoutInterestsInput, ListingUpdateWithoutInterestsInput>, ListingUncheckedUpdateWithoutInterestsInput>
  }

  export type UserUpdateOneRequiredWithoutExpressedInterestsNestedInput = {
    create?: XOR<UserCreateWithoutExpressedInterestsInput, UserUncheckedCreateWithoutExpressedInterestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutExpressedInterestsInput
    upsert?: UserUpsertWithoutExpressedInterestsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutExpressedInterestsInput, UserUpdateWithoutExpressedInterestsInput>, UserUncheckedUpdateWithoutExpressedInterestsInput>
  }

  export type ListingCreateNestedOneWithoutOrdersInput = {
    create?: XOR<ListingCreateWithoutOrdersInput, ListingUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: ListingCreateOrConnectWithoutOrdersInput
    connect?: ListingWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutBuyerOrdersInput = {
    create?: XOR<UserCreateWithoutBuyerOrdersInput, UserUncheckedCreateWithoutBuyerOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutBuyerOrdersInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFarmerOrdersInput = {
    create?: XOR<UserCreateWithoutFarmerOrdersInput, UserUncheckedCreateWithoutFarmerOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutFarmerOrdersInput
    connect?: UserWhereUniqueInput
  }

  export type ReviewCreateNestedOneWithoutOrderInput = {
    create?: XOR<ReviewCreateWithoutOrderInput, ReviewUncheckedCreateWithoutOrderInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutOrderInput
    connect?: ReviewWhereUniqueInput
  }

  export type ReviewUncheckedCreateNestedOneWithoutOrderInput = {
    create?: XOR<ReviewCreateWithoutOrderInput, ReviewUncheckedCreateWithoutOrderInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutOrderInput
    connect?: ReviewWhereUniqueInput
  }

  export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ListingUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<ListingCreateWithoutOrdersInput, ListingUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: ListingCreateOrConnectWithoutOrdersInput
    upsert?: ListingUpsertWithoutOrdersInput
    connect?: ListingWhereUniqueInput
    update?: XOR<XOR<ListingUpdateToOneWithWhereWithoutOrdersInput, ListingUpdateWithoutOrdersInput>, ListingUncheckedUpdateWithoutOrdersInput>
  }

  export type UserUpdateOneRequiredWithoutBuyerOrdersNestedInput = {
    create?: XOR<UserCreateWithoutBuyerOrdersInput, UserUncheckedCreateWithoutBuyerOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutBuyerOrdersInput
    upsert?: UserUpsertWithoutBuyerOrdersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBuyerOrdersInput, UserUpdateWithoutBuyerOrdersInput>, UserUncheckedUpdateWithoutBuyerOrdersInput>
  }

  export type UserUpdateOneRequiredWithoutFarmerOrdersNestedInput = {
    create?: XOR<UserCreateWithoutFarmerOrdersInput, UserUncheckedCreateWithoutFarmerOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutFarmerOrdersInput
    upsert?: UserUpsertWithoutFarmerOrdersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFarmerOrdersInput, UserUpdateWithoutFarmerOrdersInput>, UserUncheckedUpdateWithoutFarmerOrdersInput>
  }

  export type ReviewUpdateOneWithoutOrderNestedInput = {
    create?: XOR<ReviewCreateWithoutOrderInput, ReviewUncheckedCreateWithoutOrderInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutOrderInput
    upsert?: ReviewUpsertWithoutOrderInput
    disconnect?: ReviewWhereInput | boolean
    delete?: ReviewWhereInput | boolean
    connect?: ReviewWhereUniqueInput
    update?: XOR<XOR<ReviewUpdateToOneWithWhereWithoutOrderInput, ReviewUpdateWithoutOrderInput>, ReviewUncheckedUpdateWithoutOrderInput>
  }

  export type ReviewUncheckedUpdateOneWithoutOrderNestedInput = {
    create?: XOR<ReviewCreateWithoutOrderInput, ReviewUncheckedCreateWithoutOrderInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutOrderInput
    upsert?: ReviewUpsertWithoutOrderInput
    disconnect?: ReviewWhereInput | boolean
    delete?: ReviewWhereInput | boolean
    connect?: ReviewWhereUniqueInput
    update?: XOR<XOR<ReviewUpdateToOneWithWhereWithoutOrderInput, ReviewUpdateWithoutOrderInput>, ReviewUncheckedUpdateWithoutOrderInput>
  }

  export type OrderCreateNestedOneWithoutReviewInput = {
    create?: XOR<OrderCreateWithoutReviewInput, OrderUncheckedCreateWithoutReviewInput>
    connectOrCreate?: OrderCreateOrConnectWithoutReviewInput
    connect?: OrderWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReviewsReceivedInput = {
    create?: XOR<UserCreateWithoutReviewsReceivedInput, UserUncheckedCreateWithoutReviewsReceivedInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsReceivedInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReviewsGivenInput = {
    create?: XOR<UserCreateWithoutReviewsGivenInput, UserUncheckedCreateWithoutReviewsGivenInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsGivenInput
    connect?: UserWhereUniqueInput
  }

  export type OrderUpdateOneRequiredWithoutReviewNestedInput = {
    create?: XOR<OrderCreateWithoutReviewInput, OrderUncheckedCreateWithoutReviewInput>
    connectOrCreate?: OrderCreateOrConnectWithoutReviewInput
    upsert?: OrderUpsertWithoutReviewInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutReviewInput, OrderUpdateWithoutReviewInput>, OrderUncheckedUpdateWithoutReviewInput>
  }

  export type UserUpdateOneRequiredWithoutReviewsReceivedNestedInput = {
    create?: XOR<UserCreateWithoutReviewsReceivedInput, UserUncheckedCreateWithoutReviewsReceivedInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsReceivedInput
    upsert?: UserUpsertWithoutReviewsReceivedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReviewsReceivedInput, UserUpdateWithoutReviewsReceivedInput>, UserUncheckedUpdateWithoutReviewsReceivedInput>
  }

  export type UserUpdateOneRequiredWithoutReviewsGivenNestedInput = {
    create?: XOR<UserCreateWithoutReviewsGivenInput, UserUncheckedCreateWithoutReviewsGivenInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsGivenInput
    upsert?: UserUpsertWithoutReviewsGivenInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReviewsGivenInput, UserUpdateWithoutReviewsGivenInput>, UserUncheckedUpdateWithoutReviewsGivenInput>
  }

  export type ListingCreateNestedOneWithoutSavedByInput = {
    create?: XOR<ListingCreateWithoutSavedByInput, ListingUncheckedCreateWithoutSavedByInput>
    connectOrCreate?: ListingCreateOrConnectWithoutSavedByInput
    connect?: ListingWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSavedListingsInput = {
    create?: XOR<UserCreateWithoutSavedListingsInput, UserUncheckedCreateWithoutSavedListingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSavedListingsInput
    connect?: UserWhereUniqueInput
  }

  export type ListingUpdateOneRequiredWithoutSavedByNestedInput = {
    create?: XOR<ListingCreateWithoutSavedByInput, ListingUncheckedCreateWithoutSavedByInput>
    connectOrCreate?: ListingCreateOrConnectWithoutSavedByInput
    upsert?: ListingUpsertWithoutSavedByInput
    connect?: ListingWhereUniqueInput
    update?: XOR<XOR<ListingUpdateToOneWithWhereWithoutSavedByInput, ListingUpdateWithoutSavedByInput>, ListingUncheckedUpdateWithoutSavedByInput>
  }

  export type UserUpdateOneRequiredWithoutSavedListingsNestedInput = {
    create?: XOR<UserCreateWithoutSavedListingsInput, UserUncheckedCreateWithoutSavedListingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSavedListingsInput
    upsert?: UserUpsertWithoutSavedListingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSavedListingsInput, UserUpdateWithoutSavedListingsInput>, UserUncheckedUpdateWithoutSavedListingsInput>
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumNotificationTypeFieldUpdateOperationsInput = {
    set?: $Enums.NotificationType
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumAccountStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountStatus | EnumAccountStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AccountStatus[] | ListEnumAccountStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountStatus[] | ListEnumAccountStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountStatusFilter<$PrismaModel> | $Enums.AccountStatus
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumAccountStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountStatus | EnumAccountStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AccountStatus[] | ListEnumAccountStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountStatus[] | ListEnumAccountStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountStatusWithAggregatesFilter<$PrismaModel> | $Enums.AccountStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAccountStatusFilter<$PrismaModel>
    _max?: NestedEnumAccountStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumOAuthProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.OAuthProvider | EnumOAuthProviderFieldRefInput<$PrismaModel>
    in?: $Enums.OAuthProvider[] | ListEnumOAuthProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.OAuthProvider[] | ListEnumOAuthProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumOAuthProviderFilter<$PrismaModel> | $Enums.OAuthProvider
  }

  export type NestedEnumOAuthProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OAuthProvider | EnumOAuthProviderFieldRefInput<$PrismaModel>
    in?: $Enums.OAuthProvider[] | ListEnumOAuthProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.OAuthProvider[] | ListEnumOAuthProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumOAuthProviderWithAggregatesFilter<$PrismaModel> | $Enums.OAuthProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOAuthProviderFilter<$PrismaModel>
    _max?: NestedEnumOAuthProviderFilter<$PrismaModel>
  }

  export type NestedEnumDevicePlatformFilter<$PrismaModel = never> = {
    equals?: $Enums.DevicePlatform | EnumDevicePlatformFieldRefInput<$PrismaModel>
    in?: $Enums.DevicePlatform[] | ListEnumDevicePlatformFieldRefInput<$PrismaModel>
    notIn?: $Enums.DevicePlatform[] | ListEnumDevicePlatformFieldRefInput<$PrismaModel>
    not?: NestedEnumDevicePlatformFilter<$PrismaModel> | $Enums.DevicePlatform
  }

  export type NestedEnumDevicePlatformWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DevicePlatform | EnumDevicePlatformFieldRefInput<$PrismaModel>
    in?: $Enums.DevicePlatform[] | ListEnumDevicePlatformFieldRefInput<$PrismaModel>
    notIn?: $Enums.DevicePlatform[] | ListEnumDevicePlatformFieldRefInput<$PrismaModel>
    not?: NestedEnumDevicePlatformWithAggregatesFilter<$PrismaModel> | $Enums.DevicePlatform
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDevicePlatformFilter<$PrismaModel>
    _max?: NestedEnumDevicePlatformFilter<$PrismaModel>
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumOtpPurposeFilter<$PrismaModel = never> = {
    equals?: $Enums.OtpPurpose | EnumOtpPurposeFieldRefInput<$PrismaModel>
    in?: $Enums.OtpPurpose[] | ListEnumOtpPurposeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OtpPurpose[] | ListEnumOtpPurposeFieldRefInput<$PrismaModel>
    not?: NestedEnumOtpPurposeFilter<$PrismaModel> | $Enums.OtpPurpose
  }

  export type NestedEnumOtpPurposeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OtpPurpose | EnumOtpPurposeFieldRefInput<$PrismaModel>
    in?: $Enums.OtpPurpose[] | ListEnumOtpPurposeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OtpPurpose[] | ListEnumOtpPurposeFieldRefInput<$PrismaModel>
    not?: NestedEnumOtpPurposeWithAggregatesFilter<$PrismaModel> | $Enums.OtpPurpose
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOtpPurposeFilter<$PrismaModel>
    _max?: NestedEnumOtpPurposeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumCropTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CropType | EnumCropTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CropType[] | ListEnumCropTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CropType[] | ListEnumCropTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCropTypeFilter<$PrismaModel> | $Enums.CropType
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumQuantityUnitFilter<$PrismaModel = never> = {
    equals?: $Enums.QuantityUnit | EnumQuantityUnitFieldRefInput<$PrismaModel>
    in?: $Enums.QuantityUnit[] | ListEnumQuantityUnitFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuantityUnit[] | ListEnumQuantityUnitFieldRefInput<$PrismaModel>
    not?: NestedEnumQuantityUnitFilter<$PrismaModel> | $Enums.QuantityUnit
  }

  export type NestedEnumListingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ListingStatus | EnumListingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ListingStatus[] | ListEnumListingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ListingStatus[] | ListEnumListingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumListingStatusFilter<$PrismaModel> | $Enums.ListingStatus
  }

  export type NestedEnumCropTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CropType | EnumCropTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CropType[] | ListEnumCropTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CropType[] | ListEnumCropTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCropTypeWithAggregatesFilter<$PrismaModel> | $Enums.CropType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCropTypeFilter<$PrismaModel>
    _max?: NestedEnumCropTypeFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumQuantityUnitWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuantityUnit | EnumQuantityUnitFieldRefInput<$PrismaModel>
    in?: $Enums.QuantityUnit[] | ListEnumQuantityUnitFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuantityUnit[] | ListEnumQuantityUnitFieldRefInput<$PrismaModel>
    not?: NestedEnumQuantityUnitWithAggregatesFilter<$PrismaModel> | $Enums.QuantityUnit
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQuantityUnitFilter<$PrismaModel>
    _max?: NestedEnumQuantityUnitFilter<$PrismaModel>
  }

  export type NestedEnumListingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ListingStatus | EnumListingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ListingStatus[] | ListEnumListingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ListingStatus[] | ListEnumListingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumListingStatusWithAggregatesFilter<$PrismaModel> | $Enums.ListingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumListingStatusFilter<$PrismaModel>
    _max?: NestedEnumListingStatusFilter<$PrismaModel>
  }

  export type NestedEnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationTypeFilter<$PrismaModel>
    _max?: NestedEnumNotificationTypeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ListingCreateWithoutFarmerInput = {
    id?: string
    title: string
    description?: string | null
    cropType: $Enums.CropType
    quantity: Decimal | DecimalJsLike | number | string
    quantityUnit: $Enums.QuantityUnit
    pricePerUnit: Decimal | DecimalJsLike | number | string
    location: string
    harvestDate?: Date | string | null
    images?: ListingCreateimagesInput | string[]
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderCreateNestedManyWithoutListingInput
    interests?: ListingInterestCreateNestedManyWithoutListingInput
    savedBy?: SavedListingCreateNestedManyWithoutListingInput
  }

  export type ListingUncheckedCreateWithoutFarmerInput = {
    id?: string
    title: string
    description?: string | null
    cropType: $Enums.CropType
    quantity: Decimal | DecimalJsLike | number | string
    quantityUnit: $Enums.QuantityUnit
    pricePerUnit: Decimal | DecimalJsLike | number | string
    location: string
    harvestDate?: Date | string | null
    images?: ListingCreateimagesInput | string[]
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutListingInput
    interests?: ListingInterestUncheckedCreateNestedManyWithoutListingInput
    savedBy?: SavedListingUncheckedCreateNestedManyWithoutListingInput
  }

  export type ListingCreateOrConnectWithoutFarmerInput = {
    where: ListingWhereUniqueInput
    create: XOR<ListingCreateWithoutFarmerInput, ListingUncheckedCreateWithoutFarmerInput>
  }

  export type ListingCreateManyFarmerInputEnvelope = {
    data: ListingCreateManyFarmerInput | ListingCreateManyFarmerInput[]
    skipDuplicates?: boolean
  }

  export type OrderCreateWithoutBuyerInput = {
    id?: string
    quantity: Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder: Decimal | DecimalJsLike | number | string
    status?: $Enums.OrderStatus
    latestLatitude?: number | null
    latestLongitude?: number | null
    locationReportedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    listing: ListingCreateNestedOneWithoutOrdersInput
    farmer: UserCreateNestedOneWithoutFarmerOrdersInput
    review?: ReviewCreateNestedOneWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutBuyerInput = {
    id?: string
    listingId: string
    farmerId: string
    quantity: Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder: Decimal | DecimalJsLike | number | string
    status?: $Enums.OrderStatus
    latestLatitude?: number | null
    latestLongitude?: number | null
    locationReportedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    review?: ReviewUncheckedCreateNestedOneWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutBuyerInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutBuyerInput, OrderUncheckedCreateWithoutBuyerInput>
  }

  export type OrderCreateManyBuyerInputEnvelope = {
    data: OrderCreateManyBuyerInput | OrderCreateManyBuyerInput[]
    skipDuplicates?: boolean
  }

  export type OrderCreateWithoutFarmerInput = {
    id?: string
    quantity: Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder: Decimal | DecimalJsLike | number | string
    status?: $Enums.OrderStatus
    latestLatitude?: number | null
    latestLongitude?: number | null
    locationReportedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    listing: ListingCreateNestedOneWithoutOrdersInput
    buyer: UserCreateNestedOneWithoutBuyerOrdersInput
    review?: ReviewCreateNestedOneWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutFarmerInput = {
    id?: string
    listingId: string
    buyerId: string
    quantity: Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder: Decimal | DecimalJsLike | number | string
    status?: $Enums.OrderStatus
    latestLatitude?: number | null
    latestLongitude?: number | null
    locationReportedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    review?: ReviewUncheckedCreateNestedOneWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutFarmerInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutFarmerInput, OrderUncheckedCreateWithoutFarmerInput>
  }

  export type OrderCreateManyFarmerInputEnvelope = {
    data: OrderCreateManyFarmerInput | OrderCreateManyFarmerInput[]
    skipDuplicates?: boolean
  }

  export type ListingInterestCreateWithoutBuyerInput = {
    id?: string
    createdAt?: Date | string
    listing: ListingCreateNestedOneWithoutInterestsInput
  }

  export type ListingInterestUncheckedCreateWithoutBuyerInput = {
    id?: string
    listingId: string
    createdAt?: Date | string
  }

  export type ListingInterestCreateOrConnectWithoutBuyerInput = {
    where: ListingInterestWhereUniqueInput
    create: XOR<ListingInterestCreateWithoutBuyerInput, ListingInterestUncheckedCreateWithoutBuyerInput>
  }

  export type ListingInterestCreateManyBuyerInputEnvelope = {
    data: ListingInterestCreateManyBuyerInput | ListingInterestCreateManyBuyerInput[]
    skipDuplicates?: boolean
  }

  export type RefreshTokenCreateWithoutUserInput = {
    id?: string
    tokenHash: string
    family: string
    issuedAt?: Date | string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    revokedReason?: string | null
    createdAt?: Date | string
    device?: DeviceCreateNestedOneWithoutRefreshTokensInput
  }

  export type RefreshTokenUncheckedCreateWithoutUserInput = {
    id?: string
    tokenHash: string
    family: string
    deviceId?: string | null
    issuedAt?: Date | string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    revokedReason?: string | null
    createdAt?: Date | string
  }

  export type RefreshTokenCreateOrConnectWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenCreateManyUserInputEnvelope = {
    data: RefreshTokenCreateManyUserInput | RefreshTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DeviceCreateWithoutUserInput = {
    id?: string
    deviceId: string
    deviceName?: string | null
    platform: $Enums.DevicePlatform
    pushToken?: string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenCreateNestedManyWithoutDeviceInput
  }

  export type DeviceUncheckedCreateWithoutUserInput = {
    id?: string
    deviceId: string
    deviceName?: string | null
    platform: $Enums.DevicePlatform
    pushToken?: string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutDeviceInput
  }

  export type DeviceCreateOrConnectWithoutUserInput = {
    where: DeviceWhereUniqueInput
    create: XOR<DeviceCreateWithoutUserInput, DeviceUncheckedCreateWithoutUserInput>
  }

  export type DeviceCreateManyUserInputEnvelope = {
    data: DeviceCreateManyUserInput | DeviceCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OAuthAccountCreateWithoutUserInput = {
    id?: string
    provider: $Enums.OAuthProvider
    providerAccountId: string
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OAuthAccountUncheckedCreateWithoutUserInput = {
    id?: string
    provider: $Enums.OAuthProvider
    providerAccountId: string
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OAuthAccountCreateOrConnectWithoutUserInput = {
    where: OAuthAccountWhereUniqueInput
    create: XOR<OAuthAccountCreateWithoutUserInput, OAuthAccountUncheckedCreateWithoutUserInput>
  }

  export type OAuthAccountCreateManyUserInputEnvelope = {
    data: OAuthAccountCreateManyUserInput | OAuthAccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutBuyerInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    order: OrderCreateNestedOneWithoutReviewInput
    farmer: UserCreateNestedOneWithoutReviewsReceivedInput
  }

  export type ReviewUncheckedCreateWithoutBuyerInput = {
    id?: string
    orderId: string
    farmerId: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutBuyerInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutBuyerInput, ReviewUncheckedCreateWithoutBuyerInput>
  }

  export type ReviewCreateManyBuyerInputEnvelope = {
    data: ReviewCreateManyBuyerInput | ReviewCreateManyBuyerInput[]
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutFarmerInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    order: OrderCreateNestedOneWithoutReviewInput
    buyer: UserCreateNestedOneWithoutReviewsGivenInput
  }

  export type ReviewUncheckedCreateWithoutFarmerInput = {
    id?: string
    orderId: string
    buyerId: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutFarmerInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutFarmerInput, ReviewUncheckedCreateWithoutFarmerInput>
  }

  export type ReviewCreateManyFarmerInputEnvelope = {
    data: ReviewCreateManyFarmerInput | ReviewCreateManyFarmerInput[]
    skipDuplicates?: boolean
  }

  export type SavedListingCreateWithoutBuyerInput = {
    id?: string
    createdAt?: Date | string
    listing: ListingCreateNestedOneWithoutSavedByInput
  }

  export type SavedListingUncheckedCreateWithoutBuyerInput = {
    id?: string
    listingId: string
    createdAt?: Date | string
  }

  export type SavedListingCreateOrConnectWithoutBuyerInput = {
    where: SavedListingWhereUniqueInput
    create: XOR<SavedListingCreateWithoutBuyerInput, SavedListingUncheckedCreateWithoutBuyerInput>
  }

  export type SavedListingCreateManyBuyerInputEnvelope = {
    data: SavedListingCreateManyBuyerInput | SavedListingCreateManyBuyerInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutUserInput = {
    id?: string
    type: $Enums.NotificationType
    title: string
    body: string
    orderId?: string | null
    listingId?: string | null
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: string
    type: $Enums.NotificationType
    title: string
    body: string
    orderId?: string | null
    listingId?: string | null
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ListingUpsertWithWhereUniqueWithoutFarmerInput = {
    where: ListingWhereUniqueInput
    update: XOR<ListingUpdateWithoutFarmerInput, ListingUncheckedUpdateWithoutFarmerInput>
    create: XOR<ListingCreateWithoutFarmerInput, ListingUncheckedCreateWithoutFarmerInput>
  }

  export type ListingUpdateWithWhereUniqueWithoutFarmerInput = {
    where: ListingWhereUniqueInput
    data: XOR<ListingUpdateWithoutFarmerInput, ListingUncheckedUpdateWithoutFarmerInput>
  }

  export type ListingUpdateManyWithWhereWithoutFarmerInput = {
    where: ListingScalarWhereInput
    data: XOR<ListingUpdateManyMutationInput, ListingUncheckedUpdateManyWithoutFarmerInput>
  }

  export type ListingScalarWhereInput = {
    AND?: ListingScalarWhereInput | ListingScalarWhereInput[]
    OR?: ListingScalarWhereInput[]
    NOT?: ListingScalarWhereInput | ListingScalarWhereInput[]
    id?: UuidFilter<"Listing"> | string
    farmerId?: UuidFilter<"Listing"> | string
    title?: StringFilter<"Listing"> | string
    description?: StringNullableFilter<"Listing"> | string | null
    cropType?: EnumCropTypeFilter<"Listing"> | $Enums.CropType
    quantity?: DecimalFilter<"Listing"> | Decimal | DecimalJsLike | number | string
    quantityUnit?: EnumQuantityUnitFilter<"Listing"> | $Enums.QuantityUnit
    pricePerUnit?: DecimalFilter<"Listing"> | Decimal | DecimalJsLike | number | string
    location?: StringFilter<"Listing"> | string
    harvestDate?: DateTimeNullableFilter<"Listing"> | Date | string | null
    images?: StringNullableListFilter<"Listing">
    status?: EnumListingStatusFilter<"Listing"> | $Enums.ListingStatus
    createdAt?: DateTimeFilter<"Listing"> | Date | string
    updatedAt?: DateTimeFilter<"Listing"> | Date | string
  }

  export type OrderUpsertWithWhereUniqueWithoutBuyerInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutBuyerInput, OrderUncheckedUpdateWithoutBuyerInput>
    create: XOR<OrderCreateWithoutBuyerInput, OrderUncheckedCreateWithoutBuyerInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutBuyerInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutBuyerInput, OrderUncheckedUpdateWithoutBuyerInput>
  }

  export type OrderUpdateManyWithWhereWithoutBuyerInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutBuyerInput>
  }

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[]
    OR?: OrderScalarWhereInput[]
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[]
    id?: UuidFilter<"Order"> | string
    listingId?: UuidFilter<"Order"> | string
    buyerId?: UuidFilter<"Order"> | string
    farmerId?: UuidFilter<"Order"> | string
    quantity?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    latestLatitude?: FloatNullableFilter<"Order"> | number | null
    latestLongitude?: FloatNullableFilter<"Order"> | number | null
    locationReportedAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
  }

  export type OrderUpsertWithWhereUniqueWithoutFarmerInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutFarmerInput, OrderUncheckedUpdateWithoutFarmerInput>
    create: XOR<OrderCreateWithoutFarmerInput, OrderUncheckedCreateWithoutFarmerInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutFarmerInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutFarmerInput, OrderUncheckedUpdateWithoutFarmerInput>
  }

  export type OrderUpdateManyWithWhereWithoutFarmerInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutFarmerInput>
  }

  export type ListingInterestUpsertWithWhereUniqueWithoutBuyerInput = {
    where: ListingInterestWhereUniqueInput
    update: XOR<ListingInterestUpdateWithoutBuyerInput, ListingInterestUncheckedUpdateWithoutBuyerInput>
    create: XOR<ListingInterestCreateWithoutBuyerInput, ListingInterestUncheckedCreateWithoutBuyerInput>
  }

  export type ListingInterestUpdateWithWhereUniqueWithoutBuyerInput = {
    where: ListingInterestWhereUniqueInput
    data: XOR<ListingInterestUpdateWithoutBuyerInput, ListingInterestUncheckedUpdateWithoutBuyerInput>
  }

  export type ListingInterestUpdateManyWithWhereWithoutBuyerInput = {
    where: ListingInterestScalarWhereInput
    data: XOR<ListingInterestUpdateManyMutationInput, ListingInterestUncheckedUpdateManyWithoutBuyerInput>
  }

  export type ListingInterestScalarWhereInput = {
    AND?: ListingInterestScalarWhereInput | ListingInterestScalarWhereInput[]
    OR?: ListingInterestScalarWhereInput[]
    NOT?: ListingInterestScalarWhereInput | ListingInterestScalarWhereInput[]
    id?: UuidFilter<"ListingInterest"> | string
    listingId?: UuidFilter<"ListingInterest"> | string
    buyerId?: UuidFilter<"ListingInterest"> | string
    createdAt?: DateTimeFilter<"ListingInterest"> | Date | string
  }

  export type RefreshTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    update: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    data: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
  }

  export type RefreshTokenUpdateManyWithWhereWithoutUserInput = {
    where: RefreshTokenScalarWhereInput
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type RefreshTokenScalarWhereInput = {
    AND?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    OR?: RefreshTokenScalarWhereInput[]
    NOT?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    id?: UuidFilter<"RefreshToken"> | string
    tokenHash?: StringFilter<"RefreshToken"> | string
    family?: UuidFilter<"RefreshToken"> | string
    userId?: UuidFilter<"RefreshToken"> | string
    deviceId?: UuidNullableFilter<"RefreshToken"> | string | null
    issuedAt?: DateTimeFilter<"RefreshToken"> | Date | string
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    revokedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    revokedReason?: StringNullableFilter<"RefreshToken"> | string | null
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
  }

  export type DeviceUpsertWithWhereUniqueWithoutUserInput = {
    where: DeviceWhereUniqueInput
    update: XOR<DeviceUpdateWithoutUserInput, DeviceUncheckedUpdateWithoutUserInput>
    create: XOR<DeviceCreateWithoutUserInput, DeviceUncheckedCreateWithoutUserInput>
  }

  export type DeviceUpdateWithWhereUniqueWithoutUserInput = {
    where: DeviceWhereUniqueInput
    data: XOR<DeviceUpdateWithoutUserInput, DeviceUncheckedUpdateWithoutUserInput>
  }

  export type DeviceUpdateManyWithWhereWithoutUserInput = {
    where: DeviceScalarWhereInput
    data: XOR<DeviceUpdateManyMutationInput, DeviceUncheckedUpdateManyWithoutUserInput>
  }

  export type DeviceScalarWhereInput = {
    AND?: DeviceScalarWhereInput | DeviceScalarWhereInput[]
    OR?: DeviceScalarWhereInput[]
    NOT?: DeviceScalarWhereInput | DeviceScalarWhereInput[]
    id?: UuidFilter<"Device"> | string
    deviceId?: StringFilter<"Device"> | string
    deviceName?: StringNullableFilter<"Device"> | string | null
    platform?: EnumDevicePlatformFilter<"Device"> | $Enums.DevicePlatform
    pushToken?: StringNullableFilter<"Device"> | string | null
    lastSeenAt?: DateTimeNullableFilter<"Device"> | Date | string | null
    userId?: UuidFilter<"Device"> | string
    createdAt?: DateTimeFilter<"Device"> | Date | string
    updatedAt?: DateTimeFilter<"Device"> | Date | string
  }

  export type OAuthAccountUpsertWithWhereUniqueWithoutUserInput = {
    where: OAuthAccountWhereUniqueInput
    update: XOR<OAuthAccountUpdateWithoutUserInput, OAuthAccountUncheckedUpdateWithoutUserInput>
    create: XOR<OAuthAccountCreateWithoutUserInput, OAuthAccountUncheckedCreateWithoutUserInput>
  }

  export type OAuthAccountUpdateWithWhereUniqueWithoutUserInput = {
    where: OAuthAccountWhereUniqueInput
    data: XOR<OAuthAccountUpdateWithoutUserInput, OAuthAccountUncheckedUpdateWithoutUserInput>
  }

  export type OAuthAccountUpdateManyWithWhereWithoutUserInput = {
    where: OAuthAccountScalarWhereInput
    data: XOR<OAuthAccountUpdateManyMutationInput, OAuthAccountUncheckedUpdateManyWithoutUserInput>
  }

  export type OAuthAccountScalarWhereInput = {
    AND?: OAuthAccountScalarWhereInput | OAuthAccountScalarWhereInput[]
    OR?: OAuthAccountScalarWhereInput[]
    NOT?: OAuthAccountScalarWhereInput | OAuthAccountScalarWhereInput[]
    id?: UuidFilter<"OAuthAccount"> | string
    provider?: EnumOAuthProviderFilter<"OAuthAccount"> | $Enums.OAuthProvider
    providerAccountId?: StringFilter<"OAuthAccount"> | string
    email?: StringNullableFilter<"OAuthAccount"> | string | null
    userId?: UuidFilter<"OAuthAccount"> | string
    createdAt?: DateTimeFilter<"OAuthAccount"> | Date | string
    updatedAt?: DateTimeFilter<"OAuthAccount"> | Date | string
  }

  export type ReviewUpsertWithWhereUniqueWithoutBuyerInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutBuyerInput, ReviewUncheckedUpdateWithoutBuyerInput>
    create: XOR<ReviewCreateWithoutBuyerInput, ReviewUncheckedCreateWithoutBuyerInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutBuyerInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutBuyerInput, ReviewUncheckedUpdateWithoutBuyerInput>
  }

  export type ReviewUpdateManyWithWhereWithoutBuyerInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutBuyerInput>
  }

  export type ReviewScalarWhereInput = {
    AND?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    OR?: ReviewScalarWhereInput[]
    NOT?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    id?: UuidFilter<"Review"> | string
    orderId?: UuidFilter<"Review"> | string
    farmerId?: UuidFilter<"Review"> | string
    buyerId?: UuidFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringNullableFilter<"Review"> | string | null
    createdAt?: DateTimeFilter<"Review"> | Date | string
  }

  export type ReviewUpsertWithWhereUniqueWithoutFarmerInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutFarmerInput, ReviewUncheckedUpdateWithoutFarmerInput>
    create: XOR<ReviewCreateWithoutFarmerInput, ReviewUncheckedCreateWithoutFarmerInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutFarmerInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutFarmerInput, ReviewUncheckedUpdateWithoutFarmerInput>
  }

  export type ReviewUpdateManyWithWhereWithoutFarmerInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutFarmerInput>
  }

  export type SavedListingUpsertWithWhereUniqueWithoutBuyerInput = {
    where: SavedListingWhereUniqueInput
    update: XOR<SavedListingUpdateWithoutBuyerInput, SavedListingUncheckedUpdateWithoutBuyerInput>
    create: XOR<SavedListingCreateWithoutBuyerInput, SavedListingUncheckedCreateWithoutBuyerInput>
  }

  export type SavedListingUpdateWithWhereUniqueWithoutBuyerInput = {
    where: SavedListingWhereUniqueInput
    data: XOR<SavedListingUpdateWithoutBuyerInput, SavedListingUncheckedUpdateWithoutBuyerInput>
  }

  export type SavedListingUpdateManyWithWhereWithoutBuyerInput = {
    where: SavedListingScalarWhereInput
    data: XOR<SavedListingUpdateManyMutationInput, SavedListingUncheckedUpdateManyWithoutBuyerInput>
  }

  export type SavedListingScalarWhereInput = {
    AND?: SavedListingScalarWhereInput | SavedListingScalarWhereInput[]
    OR?: SavedListingScalarWhereInput[]
    NOT?: SavedListingScalarWhereInput | SavedListingScalarWhereInput[]
    id?: UuidFilter<"SavedListing"> | string
    listingId?: UuidFilter<"SavedListing"> | string
    buyerId?: UuidFilter<"SavedListing"> | string
    createdAt?: DateTimeFilter<"SavedListing"> | Date | string
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: UuidFilter<"Notification"> | string
    userId?: UuidFilter<"Notification"> | string
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    title?: StringFilter<"Notification"> | string
    body?: StringFilter<"Notification"> | string
    orderId?: UuidNullableFilter<"Notification"> | string | null
    listingId?: UuidNullableFilter<"Notification"> | string | null
    isRead?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type UserCreateWithoutOauthAccountsInput = {
    id?: string
    fullName: string
    role: $Enums.UserRole
    phone?: string | null
    phoneVerifiedAt?: Date | string | null
    accountStatus?: $Enums.AccountStatus
    profileImageUrl?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    listings?: ListingCreateNestedManyWithoutFarmerInput
    buyerOrders?: OrderCreateNestedManyWithoutBuyerInput
    farmerOrders?: OrderCreateNestedManyWithoutFarmerInput
    expressedInterests?: ListingInterestCreateNestedManyWithoutBuyerInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    devices?: DeviceCreateNestedManyWithoutUserInput
    reviewsGiven?: ReviewCreateNestedManyWithoutBuyerInput
    reviewsReceived?: ReviewCreateNestedManyWithoutFarmerInput
    savedListings?: SavedListingCreateNestedManyWithoutBuyerInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOauthAccountsInput = {
    id?: string
    fullName: string
    role: $Enums.UserRole
    phone?: string | null
    phoneVerifiedAt?: Date | string | null
    accountStatus?: $Enums.AccountStatus
    profileImageUrl?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    listings?: ListingUncheckedCreateNestedManyWithoutFarmerInput
    buyerOrders?: OrderUncheckedCreateNestedManyWithoutBuyerInput
    farmerOrders?: OrderUncheckedCreateNestedManyWithoutFarmerInput
    expressedInterests?: ListingInterestUncheckedCreateNestedManyWithoutBuyerInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    devices?: DeviceUncheckedCreateNestedManyWithoutUserInput
    reviewsGiven?: ReviewUncheckedCreateNestedManyWithoutBuyerInput
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutFarmerInput
    savedListings?: SavedListingUncheckedCreateNestedManyWithoutBuyerInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOauthAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOauthAccountsInput, UserUncheckedCreateWithoutOauthAccountsInput>
  }

  export type UserUpsertWithoutOauthAccountsInput = {
    update: XOR<UserUpdateWithoutOauthAccountsInput, UserUncheckedUpdateWithoutOauthAccountsInput>
    create: XOR<UserCreateWithoutOauthAccountsInput, UserUncheckedCreateWithoutOauthAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOauthAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOauthAccountsInput, UserUncheckedUpdateWithoutOauthAccountsInput>
  }

  export type UserUpdateWithoutOauthAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accountStatus?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    listings?: ListingUpdateManyWithoutFarmerNestedInput
    buyerOrders?: OrderUpdateManyWithoutBuyerNestedInput
    farmerOrders?: OrderUpdateManyWithoutFarmerNestedInput
    expressedInterests?: ListingInterestUpdateManyWithoutBuyerNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    devices?: DeviceUpdateManyWithoutUserNestedInput
    reviewsGiven?: ReviewUpdateManyWithoutBuyerNestedInput
    reviewsReceived?: ReviewUpdateManyWithoutFarmerNestedInput
    savedListings?: SavedListingUpdateManyWithoutBuyerNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOauthAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accountStatus?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    listings?: ListingUncheckedUpdateManyWithoutFarmerNestedInput
    buyerOrders?: OrderUncheckedUpdateManyWithoutBuyerNestedInput
    farmerOrders?: OrderUncheckedUpdateManyWithoutFarmerNestedInput
    expressedInterests?: ListingInterestUncheckedUpdateManyWithoutBuyerNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    devices?: DeviceUncheckedUpdateManyWithoutUserNestedInput
    reviewsGiven?: ReviewUncheckedUpdateManyWithoutBuyerNestedInput
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutFarmerNestedInput
    savedListings?: SavedListingUncheckedUpdateManyWithoutBuyerNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutDevicesInput = {
    id?: string
    fullName: string
    role: $Enums.UserRole
    phone?: string | null
    phoneVerifiedAt?: Date | string | null
    accountStatus?: $Enums.AccountStatus
    profileImageUrl?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    listings?: ListingCreateNestedManyWithoutFarmerInput
    buyerOrders?: OrderCreateNestedManyWithoutBuyerInput
    farmerOrders?: OrderCreateNestedManyWithoutFarmerInput
    expressedInterests?: ListingInterestCreateNestedManyWithoutBuyerInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    oauthAccounts?: OAuthAccountCreateNestedManyWithoutUserInput
    reviewsGiven?: ReviewCreateNestedManyWithoutBuyerInput
    reviewsReceived?: ReviewCreateNestedManyWithoutFarmerInput
    savedListings?: SavedListingCreateNestedManyWithoutBuyerInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDevicesInput = {
    id?: string
    fullName: string
    role: $Enums.UserRole
    phone?: string | null
    phoneVerifiedAt?: Date | string | null
    accountStatus?: $Enums.AccountStatus
    profileImageUrl?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    listings?: ListingUncheckedCreateNestedManyWithoutFarmerInput
    buyerOrders?: OrderUncheckedCreateNestedManyWithoutBuyerInput
    farmerOrders?: OrderUncheckedCreateNestedManyWithoutFarmerInput
    expressedInterests?: ListingInterestUncheckedCreateNestedManyWithoutBuyerInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    oauthAccounts?: OAuthAccountUncheckedCreateNestedManyWithoutUserInput
    reviewsGiven?: ReviewUncheckedCreateNestedManyWithoutBuyerInput
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutFarmerInput
    savedListings?: SavedListingUncheckedCreateNestedManyWithoutBuyerInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDevicesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDevicesInput, UserUncheckedCreateWithoutDevicesInput>
  }

  export type RefreshTokenCreateWithoutDeviceInput = {
    id?: string
    tokenHash: string
    family: string
    issuedAt?: Date | string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    revokedReason?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutRefreshTokensInput
  }

  export type RefreshTokenUncheckedCreateWithoutDeviceInput = {
    id?: string
    tokenHash: string
    family: string
    userId: string
    issuedAt?: Date | string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    revokedReason?: string | null
    createdAt?: Date | string
  }

  export type RefreshTokenCreateOrConnectWithoutDeviceInput = {
    where: RefreshTokenWhereUniqueInput
    create: XOR<RefreshTokenCreateWithoutDeviceInput, RefreshTokenUncheckedCreateWithoutDeviceInput>
  }

  export type RefreshTokenCreateManyDeviceInputEnvelope = {
    data: RefreshTokenCreateManyDeviceInput | RefreshTokenCreateManyDeviceInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutDevicesInput = {
    update: XOR<UserUpdateWithoutDevicesInput, UserUncheckedUpdateWithoutDevicesInput>
    create: XOR<UserCreateWithoutDevicesInput, UserUncheckedCreateWithoutDevicesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDevicesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDevicesInput, UserUncheckedUpdateWithoutDevicesInput>
  }

  export type UserUpdateWithoutDevicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accountStatus?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    listings?: ListingUpdateManyWithoutFarmerNestedInput
    buyerOrders?: OrderUpdateManyWithoutBuyerNestedInput
    farmerOrders?: OrderUpdateManyWithoutFarmerNestedInput
    expressedInterests?: ListingInterestUpdateManyWithoutBuyerNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    oauthAccounts?: OAuthAccountUpdateManyWithoutUserNestedInput
    reviewsGiven?: ReviewUpdateManyWithoutBuyerNestedInput
    reviewsReceived?: ReviewUpdateManyWithoutFarmerNestedInput
    savedListings?: SavedListingUpdateManyWithoutBuyerNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDevicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accountStatus?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    listings?: ListingUncheckedUpdateManyWithoutFarmerNestedInput
    buyerOrders?: OrderUncheckedUpdateManyWithoutBuyerNestedInput
    farmerOrders?: OrderUncheckedUpdateManyWithoutFarmerNestedInput
    expressedInterests?: ListingInterestUncheckedUpdateManyWithoutBuyerNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    oauthAccounts?: OAuthAccountUncheckedUpdateManyWithoutUserNestedInput
    reviewsGiven?: ReviewUncheckedUpdateManyWithoutBuyerNestedInput
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutFarmerNestedInput
    savedListings?: SavedListingUncheckedUpdateManyWithoutBuyerNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RefreshTokenUpsertWithWhereUniqueWithoutDeviceInput = {
    where: RefreshTokenWhereUniqueInput
    update: XOR<RefreshTokenUpdateWithoutDeviceInput, RefreshTokenUncheckedUpdateWithoutDeviceInput>
    create: XOR<RefreshTokenCreateWithoutDeviceInput, RefreshTokenUncheckedCreateWithoutDeviceInput>
  }

  export type RefreshTokenUpdateWithWhereUniqueWithoutDeviceInput = {
    where: RefreshTokenWhereUniqueInput
    data: XOR<RefreshTokenUpdateWithoutDeviceInput, RefreshTokenUncheckedUpdateWithoutDeviceInput>
  }

  export type RefreshTokenUpdateManyWithWhereWithoutDeviceInput = {
    where: RefreshTokenScalarWhereInput
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyWithoutDeviceInput>
  }

  export type UserCreateWithoutRefreshTokensInput = {
    id?: string
    fullName: string
    role: $Enums.UserRole
    phone?: string | null
    phoneVerifiedAt?: Date | string | null
    accountStatus?: $Enums.AccountStatus
    profileImageUrl?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    listings?: ListingCreateNestedManyWithoutFarmerInput
    buyerOrders?: OrderCreateNestedManyWithoutBuyerInput
    farmerOrders?: OrderCreateNestedManyWithoutFarmerInput
    expressedInterests?: ListingInterestCreateNestedManyWithoutBuyerInput
    devices?: DeviceCreateNestedManyWithoutUserInput
    oauthAccounts?: OAuthAccountCreateNestedManyWithoutUserInput
    reviewsGiven?: ReviewCreateNestedManyWithoutBuyerInput
    reviewsReceived?: ReviewCreateNestedManyWithoutFarmerInput
    savedListings?: SavedListingCreateNestedManyWithoutBuyerInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRefreshTokensInput = {
    id?: string
    fullName: string
    role: $Enums.UserRole
    phone?: string | null
    phoneVerifiedAt?: Date | string | null
    accountStatus?: $Enums.AccountStatus
    profileImageUrl?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    listings?: ListingUncheckedCreateNestedManyWithoutFarmerInput
    buyerOrders?: OrderUncheckedCreateNestedManyWithoutBuyerInput
    farmerOrders?: OrderUncheckedCreateNestedManyWithoutFarmerInput
    expressedInterests?: ListingInterestUncheckedCreateNestedManyWithoutBuyerInput
    devices?: DeviceUncheckedCreateNestedManyWithoutUserInput
    oauthAccounts?: OAuthAccountUncheckedCreateNestedManyWithoutUserInput
    reviewsGiven?: ReviewUncheckedCreateNestedManyWithoutBuyerInput
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutFarmerInput
    savedListings?: SavedListingUncheckedCreateNestedManyWithoutBuyerInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRefreshTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
  }

  export type DeviceCreateWithoutRefreshTokensInput = {
    id?: string
    deviceId: string
    deviceName?: string | null
    platform: $Enums.DevicePlatform
    pushToken?: string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDevicesInput
  }

  export type DeviceUncheckedCreateWithoutRefreshTokensInput = {
    id?: string
    deviceId: string
    deviceName?: string | null
    platform: $Enums.DevicePlatform
    pushToken?: string | null
    lastSeenAt?: Date | string | null
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeviceCreateOrConnectWithoutRefreshTokensInput = {
    where: DeviceWhereUniqueInput
    create: XOR<DeviceCreateWithoutRefreshTokensInput, DeviceUncheckedCreateWithoutRefreshTokensInput>
  }

  export type UserUpsertWithoutRefreshTokensInput = {
    update: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRefreshTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type UserUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accountStatus?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    listings?: ListingUpdateManyWithoutFarmerNestedInput
    buyerOrders?: OrderUpdateManyWithoutBuyerNestedInput
    farmerOrders?: OrderUpdateManyWithoutFarmerNestedInput
    expressedInterests?: ListingInterestUpdateManyWithoutBuyerNestedInput
    devices?: DeviceUpdateManyWithoutUserNestedInput
    oauthAccounts?: OAuthAccountUpdateManyWithoutUserNestedInput
    reviewsGiven?: ReviewUpdateManyWithoutBuyerNestedInput
    reviewsReceived?: ReviewUpdateManyWithoutFarmerNestedInput
    savedListings?: SavedListingUpdateManyWithoutBuyerNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accountStatus?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    listings?: ListingUncheckedUpdateManyWithoutFarmerNestedInput
    buyerOrders?: OrderUncheckedUpdateManyWithoutBuyerNestedInput
    farmerOrders?: OrderUncheckedUpdateManyWithoutFarmerNestedInput
    expressedInterests?: ListingInterestUncheckedUpdateManyWithoutBuyerNestedInput
    devices?: DeviceUncheckedUpdateManyWithoutUserNestedInput
    oauthAccounts?: OAuthAccountUncheckedUpdateManyWithoutUserNestedInput
    reviewsGiven?: ReviewUncheckedUpdateManyWithoutBuyerNestedInput
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutFarmerNestedInput
    savedListings?: SavedListingUncheckedUpdateManyWithoutBuyerNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DeviceUpsertWithoutRefreshTokensInput = {
    update: XOR<DeviceUpdateWithoutRefreshTokensInput, DeviceUncheckedUpdateWithoutRefreshTokensInput>
    create: XOR<DeviceCreateWithoutRefreshTokensInput, DeviceUncheckedCreateWithoutRefreshTokensInput>
    where?: DeviceWhereInput
  }

  export type DeviceUpdateToOneWithWhereWithoutRefreshTokensInput = {
    where?: DeviceWhereInput
    data: XOR<DeviceUpdateWithoutRefreshTokensInput, DeviceUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type DeviceUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    deviceName?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: EnumDevicePlatformFieldUpdateOperationsInput | $Enums.DevicePlatform
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDevicesNestedInput
  }

  export type DeviceUncheckedUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    deviceName?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: EnumDevicePlatformFieldUpdateOperationsInput | $Enums.DevicePlatform
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpVerificationTokenCreateWithoutOtpCodeInput = {
    id?: string
    phone: string
    purpose: $Enums.OtpPurpose
    expiresAt: Date | string
    consumedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type OtpVerificationTokenUncheckedCreateWithoutOtpCodeInput = {
    id?: string
    phone: string
    purpose: $Enums.OtpPurpose
    expiresAt: Date | string
    consumedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type OtpVerificationTokenCreateOrConnectWithoutOtpCodeInput = {
    where: OtpVerificationTokenWhereUniqueInput
    create: XOR<OtpVerificationTokenCreateWithoutOtpCodeInput, OtpVerificationTokenUncheckedCreateWithoutOtpCodeInput>
  }

  export type OtpVerificationTokenCreateManyOtpCodeInputEnvelope = {
    data: OtpVerificationTokenCreateManyOtpCodeInput | OtpVerificationTokenCreateManyOtpCodeInput[]
    skipDuplicates?: boolean
  }

  export type OtpVerificationTokenUpsertWithWhereUniqueWithoutOtpCodeInput = {
    where: OtpVerificationTokenWhereUniqueInput
    update: XOR<OtpVerificationTokenUpdateWithoutOtpCodeInput, OtpVerificationTokenUncheckedUpdateWithoutOtpCodeInput>
    create: XOR<OtpVerificationTokenCreateWithoutOtpCodeInput, OtpVerificationTokenUncheckedCreateWithoutOtpCodeInput>
  }

  export type OtpVerificationTokenUpdateWithWhereUniqueWithoutOtpCodeInput = {
    where: OtpVerificationTokenWhereUniqueInput
    data: XOR<OtpVerificationTokenUpdateWithoutOtpCodeInput, OtpVerificationTokenUncheckedUpdateWithoutOtpCodeInput>
  }

  export type OtpVerificationTokenUpdateManyWithWhereWithoutOtpCodeInput = {
    where: OtpVerificationTokenScalarWhereInput
    data: XOR<OtpVerificationTokenUpdateManyMutationInput, OtpVerificationTokenUncheckedUpdateManyWithoutOtpCodeInput>
  }

  export type OtpVerificationTokenScalarWhereInput = {
    AND?: OtpVerificationTokenScalarWhereInput | OtpVerificationTokenScalarWhereInput[]
    OR?: OtpVerificationTokenScalarWhereInput[]
    NOT?: OtpVerificationTokenScalarWhereInput | OtpVerificationTokenScalarWhereInput[]
    id?: UuidFilter<"OtpVerificationToken"> | string
    phone?: StringFilter<"OtpVerificationToken"> | string
    purpose?: EnumOtpPurposeFilter<"OtpVerificationToken"> | $Enums.OtpPurpose
    otpCodeId?: UuidFilter<"OtpVerificationToken"> | string
    expiresAt?: DateTimeFilter<"OtpVerificationToken"> | Date | string
    consumedAt?: DateTimeNullableFilter<"OtpVerificationToken"> | Date | string | null
    createdAt?: DateTimeFilter<"OtpVerificationToken"> | Date | string
  }

  export type OtpCodeCreateWithoutVerificationTokensInput = {
    id?: string
    phone: string
    purpose: $Enums.OtpPurpose
    codeHash: string
    attempts?: number
    expiresAt: Date | string
    consumedAt?: Date | string | null
    requestIp?: string | null
    createdAt?: Date | string
  }

  export type OtpCodeUncheckedCreateWithoutVerificationTokensInput = {
    id?: string
    phone: string
    purpose: $Enums.OtpPurpose
    codeHash: string
    attempts?: number
    expiresAt: Date | string
    consumedAt?: Date | string | null
    requestIp?: string | null
    createdAt?: Date | string
  }

  export type OtpCodeCreateOrConnectWithoutVerificationTokensInput = {
    where: OtpCodeWhereUniqueInput
    create: XOR<OtpCodeCreateWithoutVerificationTokensInput, OtpCodeUncheckedCreateWithoutVerificationTokensInput>
  }

  export type OtpCodeUpsertWithoutVerificationTokensInput = {
    update: XOR<OtpCodeUpdateWithoutVerificationTokensInput, OtpCodeUncheckedUpdateWithoutVerificationTokensInput>
    create: XOR<OtpCodeCreateWithoutVerificationTokensInput, OtpCodeUncheckedCreateWithoutVerificationTokensInput>
    where?: OtpCodeWhereInput
  }

  export type OtpCodeUpdateToOneWithWhereWithoutVerificationTokensInput = {
    where?: OtpCodeWhereInput
    data: XOR<OtpCodeUpdateWithoutVerificationTokensInput, OtpCodeUncheckedUpdateWithoutVerificationTokensInput>
  }

  export type OtpCodeUpdateWithoutVerificationTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    purpose?: EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose
    codeHash?: StringFieldUpdateOperationsInput | string
    attempts?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestIp?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpCodeUncheckedUpdateWithoutVerificationTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    purpose?: EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose
    codeHash?: StringFieldUpdateOperationsInput | string
    attempts?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestIp?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutListingsInput = {
    id?: string
    fullName: string
    role: $Enums.UserRole
    phone?: string | null
    phoneVerifiedAt?: Date | string | null
    accountStatus?: $Enums.AccountStatus
    profileImageUrl?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    buyerOrders?: OrderCreateNestedManyWithoutBuyerInput
    farmerOrders?: OrderCreateNestedManyWithoutFarmerInput
    expressedInterests?: ListingInterestCreateNestedManyWithoutBuyerInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    devices?: DeviceCreateNestedManyWithoutUserInput
    oauthAccounts?: OAuthAccountCreateNestedManyWithoutUserInput
    reviewsGiven?: ReviewCreateNestedManyWithoutBuyerInput
    reviewsReceived?: ReviewCreateNestedManyWithoutFarmerInput
    savedListings?: SavedListingCreateNestedManyWithoutBuyerInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutListingsInput = {
    id?: string
    fullName: string
    role: $Enums.UserRole
    phone?: string | null
    phoneVerifiedAt?: Date | string | null
    accountStatus?: $Enums.AccountStatus
    profileImageUrl?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    buyerOrders?: OrderUncheckedCreateNestedManyWithoutBuyerInput
    farmerOrders?: OrderUncheckedCreateNestedManyWithoutFarmerInput
    expressedInterests?: ListingInterestUncheckedCreateNestedManyWithoutBuyerInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    devices?: DeviceUncheckedCreateNestedManyWithoutUserInput
    oauthAccounts?: OAuthAccountUncheckedCreateNestedManyWithoutUserInput
    reviewsGiven?: ReviewUncheckedCreateNestedManyWithoutBuyerInput
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutFarmerInput
    savedListings?: SavedListingUncheckedCreateNestedManyWithoutBuyerInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutListingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutListingsInput, UserUncheckedCreateWithoutListingsInput>
  }

  export type OrderCreateWithoutListingInput = {
    id?: string
    quantity: Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder: Decimal | DecimalJsLike | number | string
    status?: $Enums.OrderStatus
    latestLatitude?: number | null
    latestLongitude?: number | null
    locationReportedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    buyer: UserCreateNestedOneWithoutBuyerOrdersInput
    farmer: UserCreateNestedOneWithoutFarmerOrdersInput
    review?: ReviewCreateNestedOneWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutListingInput = {
    id?: string
    buyerId: string
    farmerId: string
    quantity: Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder: Decimal | DecimalJsLike | number | string
    status?: $Enums.OrderStatus
    latestLatitude?: number | null
    latestLongitude?: number | null
    locationReportedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    review?: ReviewUncheckedCreateNestedOneWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutListingInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutListingInput, OrderUncheckedCreateWithoutListingInput>
  }

  export type OrderCreateManyListingInputEnvelope = {
    data: OrderCreateManyListingInput | OrderCreateManyListingInput[]
    skipDuplicates?: boolean
  }

  export type ListingInterestCreateWithoutListingInput = {
    id?: string
    createdAt?: Date | string
    buyer: UserCreateNestedOneWithoutExpressedInterestsInput
  }

  export type ListingInterestUncheckedCreateWithoutListingInput = {
    id?: string
    buyerId: string
    createdAt?: Date | string
  }

  export type ListingInterestCreateOrConnectWithoutListingInput = {
    where: ListingInterestWhereUniqueInput
    create: XOR<ListingInterestCreateWithoutListingInput, ListingInterestUncheckedCreateWithoutListingInput>
  }

  export type ListingInterestCreateManyListingInputEnvelope = {
    data: ListingInterestCreateManyListingInput | ListingInterestCreateManyListingInput[]
    skipDuplicates?: boolean
  }

  export type SavedListingCreateWithoutListingInput = {
    id?: string
    createdAt?: Date | string
    buyer: UserCreateNestedOneWithoutSavedListingsInput
  }

  export type SavedListingUncheckedCreateWithoutListingInput = {
    id?: string
    buyerId: string
    createdAt?: Date | string
  }

  export type SavedListingCreateOrConnectWithoutListingInput = {
    where: SavedListingWhereUniqueInput
    create: XOR<SavedListingCreateWithoutListingInput, SavedListingUncheckedCreateWithoutListingInput>
  }

  export type SavedListingCreateManyListingInputEnvelope = {
    data: SavedListingCreateManyListingInput | SavedListingCreateManyListingInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutListingsInput = {
    update: XOR<UserUpdateWithoutListingsInput, UserUncheckedUpdateWithoutListingsInput>
    create: XOR<UserCreateWithoutListingsInput, UserUncheckedCreateWithoutListingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutListingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutListingsInput, UserUncheckedUpdateWithoutListingsInput>
  }

  export type UserUpdateWithoutListingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accountStatus?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    buyerOrders?: OrderUpdateManyWithoutBuyerNestedInput
    farmerOrders?: OrderUpdateManyWithoutFarmerNestedInput
    expressedInterests?: ListingInterestUpdateManyWithoutBuyerNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    devices?: DeviceUpdateManyWithoutUserNestedInput
    oauthAccounts?: OAuthAccountUpdateManyWithoutUserNestedInput
    reviewsGiven?: ReviewUpdateManyWithoutBuyerNestedInput
    reviewsReceived?: ReviewUpdateManyWithoutFarmerNestedInput
    savedListings?: SavedListingUpdateManyWithoutBuyerNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutListingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accountStatus?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    buyerOrders?: OrderUncheckedUpdateManyWithoutBuyerNestedInput
    farmerOrders?: OrderUncheckedUpdateManyWithoutFarmerNestedInput
    expressedInterests?: ListingInterestUncheckedUpdateManyWithoutBuyerNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    devices?: DeviceUncheckedUpdateManyWithoutUserNestedInput
    oauthAccounts?: OAuthAccountUncheckedUpdateManyWithoutUserNestedInput
    reviewsGiven?: ReviewUncheckedUpdateManyWithoutBuyerNestedInput
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutFarmerNestedInput
    savedListings?: SavedListingUncheckedUpdateManyWithoutBuyerNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OrderUpsertWithWhereUniqueWithoutListingInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutListingInput, OrderUncheckedUpdateWithoutListingInput>
    create: XOR<OrderCreateWithoutListingInput, OrderUncheckedCreateWithoutListingInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutListingInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutListingInput, OrderUncheckedUpdateWithoutListingInput>
  }

  export type OrderUpdateManyWithWhereWithoutListingInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutListingInput>
  }

  export type ListingInterestUpsertWithWhereUniqueWithoutListingInput = {
    where: ListingInterestWhereUniqueInput
    update: XOR<ListingInterestUpdateWithoutListingInput, ListingInterestUncheckedUpdateWithoutListingInput>
    create: XOR<ListingInterestCreateWithoutListingInput, ListingInterestUncheckedCreateWithoutListingInput>
  }

  export type ListingInterestUpdateWithWhereUniqueWithoutListingInput = {
    where: ListingInterestWhereUniqueInput
    data: XOR<ListingInterestUpdateWithoutListingInput, ListingInterestUncheckedUpdateWithoutListingInput>
  }

  export type ListingInterestUpdateManyWithWhereWithoutListingInput = {
    where: ListingInterestScalarWhereInput
    data: XOR<ListingInterestUpdateManyMutationInput, ListingInterestUncheckedUpdateManyWithoutListingInput>
  }

  export type SavedListingUpsertWithWhereUniqueWithoutListingInput = {
    where: SavedListingWhereUniqueInput
    update: XOR<SavedListingUpdateWithoutListingInput, SavedListingUncheckedUpdateWithoutListingInput>
    create: XOR<SavedListingCreateWithoutListingInput, SavedListingUncheckedCreateWithoutListingInput>
  }

  export type SavedListingUpdateWithWhereUniqueWithoutListingInput = {
    where: SavedListingWhereUniqueInput
    data: XOR<SavedListingUpdateWithoutListingInput, SavedListingUncheckedUpdateWithoutListingInput>
  }

  export type SavedListingUpdateManyWithWhereWithoutListingInput = {
    where: SavedListingScalarWhereInput
    data: XOR<SavedListingUpdateManyMutationInput, SavedListingUncheckedUpdateManyWithoutListingInput>
  }

  export type ListingCreateWithoutInterestsInput = {
    id?: string
    title: string
    description?: string | null
    cropType: $Enums.CropType
    quantity: Decimal | DecimalJsLike | number | string
    quantityUnit: $Enums.QuantityUnit
    pricePerUnit: Decimal | DecimalJsLike | number | string
    location: string
    harvestDate?: Date | string | null
    images?: ListingCreateimagesInput | string[]
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    farmer: UserCreateNestedOneWithoutListingsInput
    orders?: OrderCreateNestedManyWithoutListingInput
    savedBy?: SavedListingCreateNestedManyWithoutListingInput
  }

  export type ListingUncheckedCreateWithoutInterestsInput = {
    id?: string
    farmerId: string
    title: string
    description?: string | null
    cropType: $Enums.CropType
    quantity: Decimal | DecimalJsLike | number | string
    quantityUnit: $Enums.QuantityUnit
    pricePerUnit: Decimal | DecimalJsLike | number | string
    location: string
    harvestDate?: Date | string | null
    images?: ListingCreateimagesInput | string[]
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutListingInput
    savedBy?: SavedListingUncheckedCreateNestedManyWithoutListingInput
  }

  export type ListingCreateOrConnectWithoutInterestsInput = {
    where: ListingWhereUniqueInput
    create: XOR<ListingCreateWithoutInterestsInput, ListingUncheckedCreateWithoutInterestsInput>
  }

  export type UserCreateWithoutExpressedInterestsInput = {
    id?: string
    fullName: string
    role: $Enums.UserRole
    phone?: string | null
    phoneVerifiedAt?: Date | string | null
    accountStatus?: $Enums.AccountStatus
    profileImageUrl?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    listings?: ListingCreateNestedManyWithoutFarmerInput
    buyerOrders?: OrderCreateNestedManyWithoutBuyerInput
    farmerOrders?: OrderCreateNestedManyWithoutFarmerInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    devices?: DeviceCreateNestedManyWithoutUserInput
    oauthAccounts?: OAuthAccountCreateNestedManyWithoutUserInput
    reviewsGiven?: ReviewCreateNestedManyWithoutBuyerInput
    reviewsReceived?: ReviewCreateNestedManyWithoutFarmerInput
    savedListings?: SavedListingCreateNestedManyWithoutBuyerInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutExpressedInterestsInput = {
    id?: string
    fullName: string
    role: $Enums.UserRole
    phone?: string | null
    phoneVerifiedAt?: Date | string | null
    accountStatus?: $Enums.AccountStatus
    profileImageUrl?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    listings?: ListingUncheckedCreateNestedManyWithoutFarmerInput
    buyerOrders?: OrderUncheckedCreateNestedManyWithoutBuyerInput
    farmerOrders?: OrderUncheckedCreateNestedManyWithoutFarmerInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    devices?: DeviceUncheckedCreateNestedManyWithoutUserInput
    oauthAccounts?: OAuthAccountUncheckedCreateNestedManyWithoutUserInput
    reviewsGiven?: ReviewUncheckedCreateNestedManyWithoutBuyerInput
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutFarmerInput
    savedListings?: SavedListingUncheckedCreateNestedManyWithoutBuyerInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutExpressedInterestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutExpressedInterestsInput, UserUncheckedCreateWithoutExpressedInterestsInput>
  }

  export type ListingUpsertWithoutInterestsInput = {
    update: XOR<ListingUpdateWithoutInterestsInput, ListingUncheckedUpdateWithoutInterestsInput>
    create: XOR<ListingCreateWithoutInterestsInput, ListingUncheckedCreateWithoutInterestsInput>
    where?: ListingWhereInput
  }

  export type ListingUpdateToOneWithWhereWithoutInterestsInput = {
    where?: ListingWhereInput
    data: XOR<ListingUpdateWithoutInterestsInput, ListingUncheckedUpdateWithoutInterestsInput>
  }

  export type ListingUpdateWithoutInterestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cropType?: EnumCropTypeFieldUpdateOperationsInput | $Enums.CropType
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantityUnit?: EnumQuantityUnitFieldUpdateOperationsInput | $Enums.QuantityUnit
    pricePerUnit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    location?: StringFieldUpdateOperationsInput | string
    harvestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    images?: ListingUpdateimagesInput | string[]
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farmer?: UserUpdateOneRequiredWithoutListingsNestedInput
    orders?: OrderUpdateManyWithoutListingNestedInput
    savedBy?: SavedListingUpdateManyWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateWithoutInterestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    farmerId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cropType?: EnumCropTypeFieldUpdateOperationsInput | $Enums.CropType
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantityUnit?: EnumQuantityUnitFieldUpdateOperationsInput | $Enums.QuantityUnit
    pricePerUnit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    location?: StringFieldUpdateOperationsInput | string
    harvestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    images?: ListingUpdateimagesInput | string[]
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutListingNestedInput
    savedBy?: SavedListingUncheckedUpdateManyWithoutListingNestedInput
  }

  export type UserUpsertWithoutExpressedInterestsInput = {
    update: XOR<UserUpdateWithoutExpressedInterestsInput, UserUncheckedUpdateWithoutExpressedInterestsInput>
    create: XOR<UserCreateWithoutExpressedInterestsInput, UserUncheckedCreateWithoutExpressedInterestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutExpressedInterestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutExpressedInterestsInput, UserUncheckedUpdateWithoutExpressedInterestsInput>
  }

  export type UserUpdateWithoutExpressedInterestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accountStatus?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    listings?: ListingUpdateManyWithoutFarmerNestedInput
    buyerOrders?: OrderUpdateManyWithoutBuyerNestedInput
    farmerOrders?: OrderUpdateManyWithoutFarmerNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    devices?: DeviceUpdateManyWithoutUserNestedInput
    oauthAccounts?: OAuthAccountUpdateManyWithoutUserNestedInput
    reviewsGiven?: ReviewUpdateManyWithoutBuyerNestedInput
    reviewsReceived?: ReviewUpdateManyWithoutFarmerNestedInput
    savedListings?: SavedListingUpdateManyWithoutBuyerNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutExpressedInterestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accountStatus?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    listings?: ListingUncheckedUpdateManyWithoutFarmerNestedInput
    buyerOrders?: OrderUncheckedUpdateManyWithoutBuyerNestedInput
    farmerOrders?: OrderUncheckedUpdateManyWithoutFarmerNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    devices?: DeviceUncheckedUpdateManyWithoutUserNestedInput
    oauthAccounts?: OAuthAccountUncheckedUpdateManyWithoutUserNestedInput
    reviewsGiven?: ReviewUncheckedUpdateManyWithoutBuyerNestedInput
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutFarmerNestedInput
    savedListings?: SavedListingUncheckedUpdateManyWithoutBuyerNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ListingCreateWithoutOrdersInput = {
    id?: string
    title: string
    description?: string | null
    cropType: $Enums.CropType
    quantity: Decimal | DecimalJsLike | number | string
    quantityUnit: $Enums.QuantityUnit
    pricePerUnit: Decimal | DecimalJsLike | number | string
    location: string
    harvestDate?: Date | string | null
    images?: ListingCreateimagesInput | string[]
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    farmer: UserCreateNestedOneWithoutListingsInput
    interests?: ListingInterestCreateNestedManyWithoutListingInput
    savedBy?: SavedListingCreateNestedManyWithoutListingInput
  }

  export type ListingUncheckedCreateWithoutOrdersInput = {
    id?: string
    farmerId: string
    title: string
    description?: string | null
    cropType: $Enums.CropType
    quantity: Decimal | DecimalJsLike | number | string
    quantityUnit: $Enums.QuantityUnit
    pricePerUnit: Decimal | DecimalJsLike | number | string
    location: string
    harvestDate?: Date | string | null
    images?: ListingCreateimagesInput | string[]
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    interests?: ListingInterestUncheckedCreateNestedManyWithoutListingInput
    savedBy?: SavedListingUncheckedCreateNestedManyWithoutListingInput
  }

  export type ListingCreateOrConnectWithoutOrdersInput = {
    where: ListingWhereUniqueInput
    create: XOR<ListingCreateWithoutOrdersInput, ListingUncheckedCreateWithoutOrdersInput>
  }

  export type UserCreateWithoutBuyerOrdersInput = {
    id?: string
    fullName: string
    role: $Enums.UserRole
    phone?: string | null
    phoneVerifiedAt?: Date | string | null
    accountStatus?: $Enums.AccountStatus
    profileImageUrl?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    listings?: ListingCreateNestedManyWithoutFarmerInput
    farmerOrders?: OrderCreateNestedManyWithoutFarmerInput
    expressedInterests?: ListingInterestCreateNestedManyWithoutBuyerInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    devices?: DeviceCreateNestedManyWithoutUserInput
    oauthAccounts?: OAuthAccountCreateNestedManyWithoutUserInput
    reviewsGiven?: ReviewCreateNestedManyWithoutBuyerInput
    reviewsReceived?: ReviewCreateNestedManyWithoutFarmerInput
    savedListings?: SavedListingCreateNestedManyWithoutBuyerInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBuyerOrdersInput = {
    id?: string
    fullName: string
    role: $Enums.UserRole
    phone?: string | null
    phoneVerifiedAt?: Date | string | null
    accountStatus?: $Enums.AccountStatus
    profileImageUrl?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    listings?: ListingUncheckedCreateNestedManyWithoutFarmerInput
    farmerOrders?: OrderUncheckedCreateNestedManyWithoutFarmerInput
    expressedInterests?: ListingInterestUncheckedCreateNestedManyWithoutBuyerInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    devices?: DeviceUncheckedCreateNestedManyWithoutUserInput
    oauthAccounts?: OAuthAccountUncheckedCreateNestedManyWithoutUserInput
    reviewsGiven?: ReviewUncheckedCreateNestedManyWithoutBuyerInput
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutFarmerInput
    savedListings?: SavedListingUncheckedCreateNestedManyWithoutBuyerInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBuyerOrdersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBuyerOrdersInput, UserUncheckedCreateWithoutBuyerOrdersInput>
  }

  export type UserCreateWithoutFarmerOrdersInput = {
    id?: string
    fullName: string
    role: $Enums.UserRole
    phone?: string | null
    phoneVerifiedAt?: Date | string | null
    accountStatus?: $Enums.AccountStatus
    profileImageUrl?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    listings?: ListingCreateNestedManyWithoutFarmerInput
    buyerOrders?: OrderCreateNestedManyWithoutBuyerInput
    expressedInterests?: ListingInterestCreateNestedManyWithoutBuyerInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    devices?: DeviceCreateNestedManyWithoutUserInput
    oauthAccounts?: OAuthAccountCreateNestedManyWithoutUserInput
    reviewsGiven?: ReviewCreateNestedManyWithoutBuyerInput
    reviewsReceived?: ReviewCreateNestedManyWithoutFarmerInput
    savedListings?: SavedListingCreateNestedManyWithoutBuyerInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFarmerOrdersInput = {
    id?: string
    fullName: string
    role: $Enums.UserRole
    phone?: string | null
    phoneVerifiedAt?: Date | string | null
    accountStatus?: $Enums.AccountStatus
    profileImageUrl?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    listings?: ListingUncheckedCreateNestedManyWithoutFarmerInput
    buyerOrders?: OrderUncheckedCreateNestedManyWithoutBuyerInput
    expressedInterests?: ListingInterestUncheckedCreateNestedManyWithoutBuyerInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    devices?: DeviceUncheckedCreateNestedManyWithoutUserInput
    oauthAccounts?: OAuthAccountUncheckedCreateNestedManyWithoutUserInput
    reviewsGiven?: ReviewUncheckedCreateNestedManyWithoutBuyerInput
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutFarmerInput
    savedListings?: SavedListingUncheckedCreateNestedManyWithoutBuyerInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFarmerOrdersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFarmerOrdersInput, UserUncheckedCreateWithoutFarmerOrdersInput>
  }

  export type ReviewCreateWithoutOrderInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    farmer: UserCreateNestedOneWithoutReviewsReceivedInput
    buyer: UserCreateNestedOneWithoutReviewsGivenInput
  }

  export type ReviewUncheckedCreateWithoutOrderInput = {
    id?: string
    farmerId: string
    buyerId: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutOrderInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutOrderInput, ReviewUncheckedCreateWithoutOrderInput>
  }

  export type ListingUpsertWithoutOrdersInput = {
    update: XOR<ListingUpdateWithoutOrdersInput, ListingUncheckedUpdateWithoutOrdersInput>
    create: XOR<ListingCreateWithoutOrdersInput, ListingUncheckedCreateWithoutOrdersInput>
    where?: ListingWhereInput
  }

  export type ListingUpdateToOneWithWhereWithoutOrdersInput = {
    where?: ListingWhereInput
    data: XOR<ListingUpdateWithoutOrdersInput, ListingUncheckedUpdateWithoutOrdersInput>
  }

  export type ListingUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cropType?: EnumCropTypeFieldUpdateOperationsInput | $Enums.CropType
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantityUnit?: EnumQuantityUnitFieldUpdateOperationsInput | $Enums.QuantityUnit
    pricePerUnit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    location?: StringFieldUpdateOperationsInput | string
    harvestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    images?: ListingUpdateimagesInput | string[]
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farmer?: UserUpdateOneRequiredWithoutListingsNestedInput
    interests?: ListingInterestUpdateManyWithoutListingNestedInput
    savedBy?: SavedListingUpdateManyWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    farmerId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cropType?: EnumCropTypeFieldUpdateOperationsInput | $Enums.CropType
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantityUnit?: EnumQuantityUnitFieldUpdateOperationsInput | $Enums.QuantityUnit
    pricePerUnit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    location?: StringFieldUpdateOperationsInput | string
    harvestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    images?: ListingUpdateimagesInput | string[]
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    interests?: ListingInterestUncheckedUpdateManyWithoutListingNestedInput
    savedBy?: SavedListingUncheckedUpdateManyWithoutListingNestedInput
  }

  export type UserUpsertWithoutBuyerOrdersInput = {
    update: XOR<UserUpdateWithoutBuyerOrdersInput, UserUncheckedUpdateWithoutBuyerOrdersInput>
    create: XOR<UserCreateWithoutBuyerOrdersInput, UserUncheckedCreateWithoutBuyerOrdersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBuyerOrdersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBuyerOrdersInput, UserUncheckedUpdateWithoutBuyerOrdersInput>
  }

  export type UserUpdateWithoutBuyerOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accountStatus?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    listings?: ListingUpdateManyWithoutFarmerNestedInput
    farmerOrders?: OrderUpdateManyWithoutFarmerNestedInput
    expressedInterests?: ListingInterestUpdateManyWithoutBuyerNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    devices?: DeviceUpdateManyWithoutUserNestedInput
    oauthAccounts?: OAuthAccountUpdateManyWithoutUserNestedInput
    reviewsGiven?: ReviewUpdateManyWithoutBuyerNestedInput
    reviewsReceived?: ReviewUpdateManyWithoutFarmerNestedInput
    savedListings?: SavedListingUpdateManyWithoutBuyerNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBuyerOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accountStatus?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    listings?: ListingUncheckedUpdateManyWithoutFarmerNestedInput
    farmerOrders?: OrderUncheckedUpdateManyWithoutFarmerNestedInput
    expressedInterests?: ListingInterestUncheckedUpdateManyWithoutBuyerNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    devices?: DeviceUncheckedUpdateManyWithoutUserNestedInput
    oauthAccounts?: OAuthAccountUncheckedUpdateManyWithoutUserNestedInput
    reviewsGiven?: ReviewUncheckedUpdateManyWithoutBuyerNestedInput
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutFarmerNestedInput
    savedListings?: SavedListingUncheckedUpdateManyWithoutBuyerNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutFarmerOrdersInput = {
    update: XOR<UserUpdateWithoutFarmerOrdersInput, UserUncheckedUpdateWithoutFarmerOrdersInput>
    create: XOR<UserCreateWithoutFarmerOrdersInput, UserUncheckedCreateWithoutFarmerOrdersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFarmerOrdersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFarmerOrdersInput, UserUncheckedUpdateWithoutFarmerOrdersInput>
  }

  export type UserUpdateWithoutFarmerOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accountStatus?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    listings?: ListingUpdateManyWithoutFarmerNestedInput
    buyerOrders?: OrderUpdateManyWithoutBuyerNestedInput
    expressedInterests?: ListingInterestUpdateManyWithoutBuyerNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    devices?: DeviceUpdateManyWithoutUserNestedInput
    oauthAccounts?: OAuthAccountUpdateManyWithoutUserNestedInput
    reviewsGiven?: ReviewUpdateManyWithoutBuyerNestedInput
    reviewsReceived?: ReviewUpdateManyWithoutFarmerNestedInput
    savedListings?: SavedListingUpdateManyWithoutBuyerNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFarmerOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accountStatus?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    listings?: ListingUncheckedUpdateManyWithoutFarmerNestedInput
    buyerOrders?: OrderUncheckedUpdateManyWithoutBuyerNestedInput
    expressedInterests?: ListingInterestUncheckedUpdateManyWithoutBuyerNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    devices?: DeviceUncheckedUpdateManyWithoutUserNestedInput
    oauthAccounts?: OAuthAccountUncheckedUpdateManyWithoutUserNestedInput
    reviewsGiven?: ReviewUncheckedUpdateManyWithoutBuyerNestedInput
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutFarmerNestedInput
    savedListings?: SavedListingUncheckedUpdateManyWithoutBuyerNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ReviewUpsertWithoutOrderInput = {
    update: XOR<ReviewUpdateWithoutOrderInput, ReviewUncheckedUpdateWithoutOrderInput>
    create: XOR<ReviewCreateWithoutOrderInput, ReviewUncheckedCreateWithoutOrderInput>
    where?: ReviewWhereInput
  }

  export type ReviewUpdateToOneWithWhereWithoutOrderInput = {
    where?: ReviewWhereInput
    data: XOR<ReviewUpdateWithoutOrderInput, ReviewUncheckedUpdateWithoutOrderInput>
  }

  export type ReviewUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farmer?: UserUpdateOneRequiredWithoutReviewsReceivedNestedInput
    buyer?: UserUpdateOneRequiredWithoutReviewsGivenNestedInput
  }

  export type ReviewUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    farmerId?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateWithoutReviewInput = {
    id?: string
    quantity: Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder: Decimal | DecimalJsLike | number | string
    status?: $Enums.OrderStatus
    latestLatitude?: number | null
    latestLongitude?: number | null
    locationReportedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    listing: ListingCreateNestedOneWithoutOrdersInput
    buyer: UserCreateNestedOneWithoutBuyerOrdersInput
    farmer: UserCreateNestedOneWithoutFarmerOrdersInput
  }

  export type OrderUncheckedCreateWithoutReviewInput = {
    id?: string
    listingId: string
    buyerId: string
    farmerId: string
    quantity: Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder: Decimal | DecimalJsLike | number | string
    status?: $Enums.OrderStatus
    latestLatitude?: number | null
    latestLongitude?: number | null
    locationReportedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateOrConnectWithoutReviewInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutReviewInput, OrderUncheckedCreateWithoutReviewInput>
  }

  export type UserCreateWithoutReviewsReceivedInput = {
    id?: string
    fullName: string
    role: $Enums.UserRole
    phone?: string | null
    phoneVerifiedAt?: Date | string | null
    accountStatus?: $Enums.AccountStatus
    profileImageUrl?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    listings?: ListingCreateNestedManyWithoutFarmerInput
    buyerOrders?: OrderCreateNestedManyWithoutBuyerInput
    farmerOrders?: OrderCreateNestedManyWithoutFarmerInput
    expressedInterests?: ListingInterestCreateNestedManyWithoutBuyerInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    devices?: DeviceCreateNestedManyWithoutUserInput
    oauthAccounts?: OAuthAccountCreateNestedManyWithoutUserInput
    reviewsGiven?: ReviewCreateNestedManyWithoutBuyerInput
    savedListings?: SavedListingCreateNestedManyWithoutBuyerInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReviewsReceivedInput = {
    id?: string
    fullName: string
    role: $Enums.UserRole
    phone?: string | null
    phoneVerifiedAt?: Date | string | null
    accountStatus?: $Enums.AccountStatus
    profileImageUrl?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    listings?: ListingUncheckedCreateNestedManyWithoutFarmerInput
    buyerOrders?: OrderUncheckedCreateNestedManyWithoutBuyerInput
    farmerOrders?: OrderUncheckedCreateNestedManyWithoutFarmerInput
    expressedInterests?: ListingInterestUncheckedCreateNestedManyWithoutBuyerInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    devices?: DeviceUncheckedCreateNestedManyWithoutUserInput
    oauthAccounts?: OAuthAccountUncheckedCreateNestedManyWithoutUserInput
    reviewsGiven?: ReviewUncheckedCreateNestedManyWithoutBuyerInput
    savedListings?: SavedListingUncheckedCreateNestedManyWithoutBuyerInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReviewsReceivedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReviewsReceivedInput, UserUncheckedCreateWithoutReviewsReceivedInput>
  }

  export type UserCreateWithoutReviewsGivenInput = {
    id?: string
    fullName: string
    role: $Enums.UserRole
    phone?: string | null
    phoneVerifiedAt?: Date | string | null
    accountStatus?: $Enums.AccountStatus
    profileImageUrl?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    listings?: ListingCreateNestedManyWithoutFarmerInput
    buyerOrders?: OrderCreateNestedManyWithoutBuyerInput
    farmerOrders?: OrderCreateNestedManyWithoutFarmerInput
    expressedInterests?: ListingInterestCreateNestedManyWithoutBuyerInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    devices?: DeviceCreateNestedManyWithoutUserInput
    oauthAccounts?: OAuthAccountCreateNestedManyWithoutUserInput
    reviewsReceived?: ReviewCreateNestedManyWithoutFarmerInput
    savedListings?: SavedListingCreateNestedManyWithoutBuyerInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReviewsGivenInput = {
    id?: string
    fullName: string
    role: $Enums.UserRole
    phone?: string | null
    phoneVerifiedAt?: Date | string | null
    accountStatus?: $Enums.AccountStatus
    profileImageUrl?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    listings?: ListingUncheckedCreateNestedManyWithoutFarmerInput
    buyerOrders?: OrderUncheckedCreateNestedManyWithoutBuyerInput
    farmerOrders?: OrderUncheckedCreateNestedManyWithoutFarmerInput
    expressedInterests?: ListingInterestUncheckedCreateNestedManyWithoutBuyerInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    devices?: DeviceUncheckedCreateNestedManyWithoutUserInput
    oauthAccounts?: OAuthAccountUncheckedCreateNestedManyWithoutUserInput
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutFarmerInput
    savedListings?: SavedListingUncheckedCreateNestedManyWithoutBuyerInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReviewsGivenInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReviewsGivenInput, UserUncheckedCreateWithoutReviewsGivenInput>
  }

  export type OrderUpsertWithoutReviewInput = {
    update: XOR<OrderUpdateWithoutReviewInput, OrderUncheckedUpdateWithoutReviewInput>
    create: XOR<OrderCreateWithoutReviewInput, OrderUncheckedCreateWithoutReviewInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutReviewInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutReviewInput, OrderUncheckedUpdateWithoutReviewInput>
  }

  export type OrderUpdateWithoutReviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    latestLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    latestLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    locationReportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listing?: ListingUpdateOneRequiredWithoutOrdersNestedInput
    buyer?: UserUpdateOneRequiredWithoutBuyerOrdersNestedInput
    farmer?: UserUpdateOneRequiredWithoutFarmerOrdersNestedInput
  }

  export type OrderUncheckedUpdateWithoutReviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    farmerId?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    latestLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    latestLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    locationReportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutReviewsReceivedInput = {
    update: XOR<UserUpdateWithoutReviewsReceivedInput, UserUncheckedUpdateWithoutReviewsReceivedInput>
    create: XOR<UserCreateWithoutReviewsReceivedInput, UserUncheckedCreateWithoutReviewsReceivedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReviewsReceivedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReviewsReceivedInput, UserUncheckedUpdateWithoutReviewsReceivedInput>
  }

  export type UserUpdateWithoutReviewsReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accountStatus?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    listings?: ListingUpdateManyWithoutFarmerNestedInput
    buyerOrders?: OrderUpdateManyWithoutBuyerNestedInput
    farmerOrders?: OrderUpdateManyWithoutFarmerNestedInput
    expressedInterests?: ListingInterestUpdateManyWithoutBuyerNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    devices?: DeviceUpdateManyWithoutUserNestedInput
    oauthAccounts?: OAuthAccountUpdateManyWithoutUserNestedInput
    reviewsGiven?: ReviewUpdateManyWithoutBuyerNestedInput
    savedListings?: SavedListingUpdateManyWithoutBuyerNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReviewsReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accountStatus?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    listings?: ListingUncheckedUpdateManyWithoutFarmerNestedInput
    buyerOrders?: OrderUncheckedUpdateManyWithoutBuyerNestedInput
    farmerOrders?: OrderUncheckedUpdateManyWithoutFarmerNestedInput
    expressedInterests?: ListingInterestUncheckedUpdateManyWithoutBuyerNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    devices?: DeviceUncheckedUpdateManyWithoutUserNestedInput
    oauthAccounts?: OAuthAccountUncheckedUpdateManyWithoutUserNestedInput
    reviewsGiven?: ReviewUncheckedUpdateManyWithoutBuyerNestedInput
    savedListings?: SavedListingUncheckedUpdateManyWithoutBuyerNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutReviewsGivenInput = {
    update: XOR<UserUpdateWithoutReviewsGivenInput, UserUncheckedUpdateWithoutReviewsGivenInput>
    create: XOR<UserCreateWithoutReviewsGivenInput, UserUncheckedCreateWithoutReviewsGivenInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReviewsGivenInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReviewsGivenInput, UserUncheckedUpdateWithoutReviewsGivenInput>
  }

  export type UserUpdateWithoutReviewsGivenInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accountStatus?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    listings?: ListingUpdateManyWithoutFarmerNestedInput
    buyerOrders?: OrderUpdateManyWithoutBuyerNestedInput
    farmerOrders?: OrderUpdateManyWithoutFarmerNestedInput
    expressedInterests?: ListingInterestUpdateManyWithoutBuyerNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    devices?: DeviceUpdateManyWithoutUserNestedInput
    oauthAccounts?: OAuthAccountUpdateManyWithoutUserNestedInput
    reviewsReceived?: ReviewUpdateManyWithoutFarmerNestedInput
    savedListings?: SavedListingUpdateManyWithoutBuyerNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReviewsGivenInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accountStatus?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    listings?: ListingUncheckedUpdateManyWithoutFarmerNestedInput
    buyerOrders?: OrderUncheckedUpdateManyWithoutBuyerNestedInput
    farmerOrders?: OrderUncheckedUpdateManyWithoutFarmerNestedInput
    expressedInterests?: ListingInterestUncheckedUpdateManyWithoutBuyerNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    devices?: DeviceUncheckedUpdateManyWithoutUserNestedInput
    oauthAccounts?: OAuthAccountUncheckedUpdateManyWithoutUserNestedInput
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutFarmerNestedInput
    savedListings?: SavedListingUncheckedUpdateManyWithoutBuyerNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ListingCreateWithoutSavedByInput = {
    id?: string
    title: string
    description?: string | null
    cropType: $Enums.CropType
    quantity: Decimal | DecimalJsLike | number | string
    quantityUnit: $Enums.QuantityUnit
    pricePerUnit: Decimal | DecimalJsLike | number | string
    location: string
    harvestDate?: Date | string | null
    images?: ListingCreateimagesInput | string[]
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    farmer: UserCreateNestedOneWithoutListingsInput
    orders?: OrderCreateNestedManyWithoutListingInput
    interests?: ListingInterestCreateNestedManyWithoutListingInput
  }

  export type ListingUncheckedCreateWithoutSavedByInput = {
    id?: string
    farmerId: string
    title: string
    description?: string | null
    cropType: $Enums.CropType
    quantity: Decimal | DecimalJsLike | number | string
    quantityUnit: $Enums.QuantityUnit
    pricePerUnit: Decimal | DecimalJsLike | number | string
    location: string
    harvestDate?: Date | string | null
    images?: ListingCreateimagesInput | string[]
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutListingInput
    interests?: ListingInterestUncheckedCreateNestedManyWithoutListingInput
  }

  export type ListingCreateOrConnectWithoutSavedByInput = {
    where: ListingWhereUniqueInput
    create: XOR<ListingCreateWithoutSavedByInput, ListingUncheckedCreateWithoutSavedByInput>
  }

  export type UserCreateWithoutSavedListingsInput = {
    id?: string
    fullName: string
    role: $Enums.UserRole
    phone?: string | null
    phoneVerifiedAt?: Date | string | null
    accountStatus?: $Enums.AccountStatus
    profileImageUrl?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    listings?: ListingCreateNestedManyWithoutFarmerInput
    buyerOrders?: OrderCreateNestedManyWithoutBuyerInput
    farmerOrders?: OrderCreateNestedManyWithoutFarmerInput
    expressedInterests?: ListingInterestCreateNestedManyWithoutBuyerInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    devices?: DeviceCreateNestedManyWithoutUserInput
    oauthAccounts?: OAuthAccountCreateNestedManyWithoutUserInput
    reviewsGiven?: ReviewCreateNestedManyWithoutBuyerInput
    reviewsReceived?: ReviewCreateNestedManyWithoutFarmerInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSavedListingsInput = {
    id?: string
    fullName: string
    role: $Enums.UserRole
    phone?: string | null
    phoneVerifiedAt?: Date | string | null
    accountStatus?: $Enums.AccountStatus
    profileImageUrl?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    listings?: ListingUncheckedCreateNestedManyWithoutFarmerInput
    buyerOrders?: OrderUncheckedCreateNestedManyWithoutBuyerInput
    farmerOrders?: OrderUncheckedCreateNestedManyWithoutFarmerInput
    expressedInterests?: ListingInterestUncheckedCreateNestedManyWithoutBuyerInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    devices?: DeviceUncheckedCreateNestedManyWithoutUserInput
    oauthAccounts?: OAuthAccountUncheckedCreateNestedManyWithoutUserInput
    reviewsGiven?: ReviewUncheckedCreateNestedManyWithoutBuyerInput
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutFarmerInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSavedListingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSavedListingsInput, UserUncheckedCreateWithoutSavedListingsInput>
  }

  export type ListingUpsertWithoutSavedByInput = {
    update: XOR<ListingUpdateWithoutSavedByInput, ListingUncheckedUpdateWithoutSavedByInput>
    create: XOR<ListingCreateWithoutSavedByInput, ListingUncheckedCreateWithoutSavedByInput>
    where?: ListingWhereInput
  }

  export type ListingUpdateToOneWithWhereWithoutSavedByInput = {
    where?: ListingWhereInput
    data: XOR<ListingUpdateWithoutSavedByInput, ListingUncheckedUpdateWithoutSavedByInput>
  }

  export type ListingUpdateWithoutSavedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cropType?: EnumCropTypeFieldUpdateOperationsInput | $Enums.CropType
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantityUnit?: EnumQuantityUnitFieldUpdateOperationsInput | $Enums.QuantityUnit
    pricePerUnit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    location?: StringFieldUpdateOperationsInput | string
    harvestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    images?: ListingUpdateimagesInput | string[]
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farmer?: UserUpdateOneRequiredWithoutListingsNestedInput
    orders?: OrderUpdateManyWithoutListingNestedInput
    interests?: ListingInterestUpdateManyWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateWithoutSavedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    farmerId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cropType?: EnumCropTypeFieldUpdateOperationsInput | $Enums.CropType
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantityUnit?: EnumQuantityUnitFieldUpdateOperationsInput | $Enums.QuantityUnit
    pricePerUnit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    location?: StringFieldUpdateOperationsInput | string
    harvestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    images?: ListingUpdateimagesInput | string[]
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutListingNestedInput
    interests?: ListingInterestUncheckedUpdateManyWithoutListingNestedInput
  }

  export type UserUpsertWithoutSavedListingsInput = {
    update: XOR<UserUpdateWithoutSavedListingsInput, UserUncheckedUpdateWithoutSavedListingsInput>
    create: XOR<UserCreateWithoutSavedListingsInput, UserUncheckedCreateWithoutSavedListingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSavedListingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSavedListingsInput, UserUncheckedUpdateWithoutSavedListingsInput>
  }

  export type UserUpdateWithoutSavedListingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accountStatus?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    listings?: ListingUpdateManyWithoutFarmerNestedInput
    buyerOrders?: OrderUpdateManyWithoutBuyerNestedInput
    farmerOrders?: OrderUpdateManyWithoutFarmerNestedInput
    expressedInterests?: ListingInterestUpdateManyWithoutBuyerNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    devices?: DeviceUpdateManyWithoutUserNestedInput
    oauthAccounts?: OAuthAccountUpdateManyWithoutUserNestedInput
    reviewsGiven?: ReviewUpdateManyWithoutBuyerNestedInput
    reviewsReceived?: ReviewUpdateManyWithoutFarmerNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSavedListingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accountStatus?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    listings?: ListingUncheckedUpdateManyWithoutFarmerNestedInput
    buyerOrders?: OrderUncheckedUpdateManyWithoutBuyerNestedInput
    farmerOrders?: OrderUncheckedUpdateManyWithoutFarmerNestedInput
    expressedInterests?: ListingInterestUncheckedUpdateManyWithoutBuyerNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    devices?: DeviceUncheckedUpdateManyWithoutUserNestedInput
    oauthAccounts?: OAuthAccountUncheckedUpdateManyWithoutUserNestedInput
    reviewsGiven?: ReviewUncheckedUpdateManyWithoutBuyerNestedInput
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutFarmerNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutNotificationsInput = {
    id?: string
    fullName: string
    role: $Enums.UserRole
    phone?: string | null
    phoneVerifiedAt?: Date | string | null
    accountStatus?: $Enums.AccountStatus
    profileImageUrl?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    listings?: ListingCreateNestedManyWithoutFarmerInput
    buyerOrders?: OrderCreateNestedManyWithoutBuyerInput
    farmerOrders?: OrderCreateNestedManyWithoutFarmerInput
    expressedInterests?: ListingInterestCreateNestedManyWithoutBuyerInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    devices?: DeviceCreateNestedManyWithoutUserInput
    oauthAccounts?: OAuthAccountCreateNestedManyWithoutUserInput
    reviewsGiven?: ReviewCreateNestedManyWithoutBuyerInput
    reviewsReceived?: ReviewCreateNestedManyWithoutFarmerInput
    savedListings?: SavedListingCreateNestedManyWithoutBuyerInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: string
    fullName: string
    role: $Enums.UserRole
    phone?: string | null
    phoneVerifiedAt?: Date | string | null
    accountStatus?: $Enums.AccountStatus
    profileImageUrl?: string | null
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    listings?: ListingUncheckedCreateNestedManyWithoutFarmerInput
    buyerOrders?: OrderUncheckedCreateNestedManyWithoutBuyerInput
    farmerOrders?: OrderUncheckedCreateNestedManyWithoutFarmerInput
    expressedInterests?: ListingInterestUncheckedCreateNestedManyWithoutBuyerInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    devices?: DeviceUncheckedCreateNestedManyWithoutUserInput
    oauthAccounts?: OAuthAccountUncheckedCreateNestedManyWithoutUserInput
    reviewsGiven?: ReviewUncheckedCreateNestedManyWithoutBuyerInput
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutFarmerInput
    savedListings?: SavedListingUncheckedCreateNestedManyWithoutBuyerInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accountStatus?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    listings?: ListingUpdateManyWithoutFarmerNestedInput
    buyerOrders?: OrderUpdateManyWithoutBuyerNestedInput
    farmerOrders?: OrderUpdateManyWithoutFarmerNestedInput
    expressedInterests?: ListingInterestUpdateManyWithoutBuyerNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    devices?: DeviceUpdateManyWithoutUserNestedInput
    oauthAccounts?: OAuthAccountUpdateManyWithoutUserNestedInput
    reviewsGiven?: ReviewUpdateManyWithoutBuyerNestedInput
    reviewsReceived?: ReviewUpdateManyWithoutFarmerNestedInput
    savedListings?: SavedListingUpdateManyWithoutBuyerNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accountStatus?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    listings?: ListingUncheckedUpdateManyWithoutFarmerNestedInput
    buyerOrders?: OrderUncheckedUpdateManyWithoutBuyerNestedInput
    farmerOrders?: OrderUncheckedUpdateManyWithoutFarmerNestedInput
    expressedInterests?: ListingInterestUncheckedUpdateManyWithoutBuyerNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    devices?: DeviceUncheckedUpdateManyWithoutUserNestedInput
    oauthAccounts?: OAuthAccountUncheckedUpdateManyWithoutUserNestedInput
    reviewsGiven?: ReviewUncheckedUpdateManyWithoutBuyerNestedInput
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutFarmerNestedInput
    savedListings?: SavedListingUncheckedUpdateManyWithoutBuyerNestedInput
  }

  export type ListingCreateManyFarmerInput = {
    id?: string
    title: string
    description?: string | null
    cropType: $Enums.CropType
    quantity: Decimal | DecimalJsLike | number | string
    quantityUnit: $Enums.QuantityUnit
    pricePerUnit: Decimal | DecimalJsLike | number | string
    location: string
    harvestDate?: Date | string | null
    images?: ListingCreateimagesInput | string[]
    status?: $Enums.ListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateManyBuyerInput = {
    id?: string
    listingId: string
    farmerId: string
    quantity: Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder: Decimal | DecimalJsLike | number | string
    status?: $Enums.OrderStatus
    latestLatitude?: number | null
    latestLongitude?: number | null
    locationReportedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateManyFarmerInput = {
    id?: string
    listingId: string
    buyerId: string
    quantity: Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder: Decimal | DecimalJsLike | number | string
    status?: $Enums.OrderStatus
    latestLatitude?: number | null
    latestLongitude?: number | null
    locationReportedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ListingInterestCreateManyBuyerInput = {
    id?: string
    listingId: string
    createdAt?: Date | string
  }

  export type RefreshTokenCreateManyUserInput = {
    id?: string
    tokenHash: string
    family: string
    deviceId?: string | null
    issuedAt?: Date | string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    revokedReason?: string | null
    createdAt?: Date | string
  }

  export type DeviceCreateManyUserInput = {
    id?: string
    deviceId: string
    deviceName?: string | null
    platform: $Enums.DevicePlatform
    pushToken?: string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OAuthAccountCreateManyUserInput = {
    id?: string
    provider: $Enums.OAuthProvider
    providerAccountId: string
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewCreateManyBuyerInput = {
    id?: string
    orderId: string
    farmerId: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type ReviewCreateManyFarmerInput = {
    id?: string
    orderId: string
    buyerId: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type SavedListingCreateManyBuyerInput = {
    id?: string
    listingId: string
    createdAt?: Date | string
  }

  export type NotificationCreateManyUserInput = {
    id?: string
    type: $Enums.NotificationType
    title: string
    body: string
    orderId?: string | null
    listingId?: string | null
    isRead?: boolean
    createdAt?: Date | string
  }

  export type ListingUpdateWithoutFarmerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cropType?: EnumCropTypeFieldUpdateOperationsInput | $Enums.CropType
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantityUnit?: EnumQuantityUnitFieldUpdateOperationsInput | $Enums.QuantityUnit
    pricePerUnit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    location?: StringFieldUpdateOperationsInput | string
    harvestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    images?: ListingUpdateimagesInput | string[]
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutListingNestedInput
    interests?: ListingInterestUpdateManyWithoutListingNestedInput
    savedBy?: SavedListingUpdateManyWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateWithoutFarmerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cropType?: EnumCropTypeFieldUpdateOperationsInput | $Enums.CropType
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantityUnit?: EnumQuantityUnitFieldUpdateOperationsInput | $Enums.QuantityUnit
    pricePerUnit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    location?: StringFieldUpdateOperationsInput | string
    harvestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    images?: ListingUpdateimagesInput | string[]
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutListingNestedInput
    interests?: ListingInterestUncheckedUpdateManyWithoutListingNestedInput
    savedBy?: SavedListingUncheckedUpdateManyWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateManyWithoutFarmerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cropType?: EnumCropTypeFieldUpdateOperationsInput | $Enums.CropType
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantityUnit?: EnumQuantityUnitFieldUpdateOperationsInput | $Enums.QuantityUnit
    pricePerUnit?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    location?: StringFieldUpdateOperationsInput | string
    harvestDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    images?: ListingUpdateimagesInput | string[]
    status?: EnumListingStatusFieldUpdateOperationsInput | $Enums.ListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUpdateWithoutBuyerInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    latestLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    latestLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    locationReportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listing?: ListingUpdateOneRequiredWithoutOrdersNestedInput
    farmer?: UserUpdateOneRequiredWithoutFarmerOrdersNestedInput
    review?: ReviewUpdateOneWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutBuyerInput = {
    id?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    farmerId?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    latestLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    latestLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    locationReportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    review?: ReviewUncheckedUpdateOneWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutBuyerInput = {
    id?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    farmerId?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    latestLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    latestLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    locationReportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUpdateWithoutFarmerInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    latestLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    latestLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    locationReportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listing?: ListingUpdateOneRequiredWithoutOrdersNestedInput
    buyer?: UserUpdateOneRequiredWithoutBuyerOrdersNestedInput
    review?: ReviewUpdateOneWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutFarmerInput = {
    id?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    latestLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    latestLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    locationReportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    review?: ReviewUncheckedUpdateOneWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutFarmerInput = {
    id?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    latestLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    latestLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    locationReportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingInterestUpdateWithoutBuyerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listing?: ListingUpdateOneRequiredWithoutInterestsNestedInput
  }

  export type ListingInterestUncheckedUpdateWithoutBuyerInput = {
    id?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingInterestUncheckedUpdateManyWithoutBuyerInput = {
    id?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    family?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    device?: DeviceUpdateOneWithoutRefreshTokensNestedInput
  }

  export type RefreshTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    family?: StringFieldUpdateOperationsInput | string
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    family?: StringFieldUpdateOperationsInput | string
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    deviceName?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: EnumDevicePlatformFieldUpdateOperationsInput | $Enums.DevicePlatform
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    deviceName?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: EnumDevicePlatformFieldUpdateOperationsInput | $Enums.DevicePlatform
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    deviceName?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: EnumDevicePlatformFieldUpdateOperationsInput | $Enums.DevicePlatform
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthAccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumOAuthProviderFieldUpdateOperationsInput | $Enums.OAuthProvider
    providerAccountId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthAccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumOAuthProviderFieldUpdateOperationsInput | $Enums.OAuthProvider
    providerAccountId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthAccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumOAuthProviderFieldUpdateOperationsInput | $Enums.OAuthProvider
    providerAccountId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUpdateWithoutBuyerInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutReviewNestedInput
    farmer?: UserUpdateOneRequiredWithoutReviewsReceivedNestedInput
  }

  export type ReviewUncheckedUpdateWithoutBuyerInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    farmerId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyWithoutBuyerInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    farmerId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUpdateWithoutFarmerInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutReviewNestedInput
    buyer?: UserUpdateOneRequiredWithoutReviewsGivenNestedInput
  }

  export type ReviewUncheckedUpdateWithoutFarmerInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyWithoutFarmerInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedListingUpdateWithoutBuyerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listing?: ListingUpdateOneRequiredWithoutSavedByNestedInput
  }

  export type SavedListingUncheckedUpdateWithoutBuyerInput = {
    id?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedListingUncheckedUpdateManyWithoutBuyerInput = {
    id?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    listingId?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    listingId?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    listingId?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateManyDeviceInput = {
    id?: string
    tokenHash: string
    family: string
    userId: string
    issuedAt?: Date | string
    expiresAt: Date | string
    revokedAt?: Date | string | null
    revokedReason?: string | null
    createdAt?: Date | string
  }

  export type RefreshTokenUpdateWithoutDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    family?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRefreshTokensNestedInput
  }

  export type RefreshTokenUncheckedUpdateWithoutDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    family?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyWithoutDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    family?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpVerificationTokenCreateManyOtpCodeInput = {
    id?: string
    phone: string
    purpose: $Enums.OtpPurpose
    expiresAt: Date | string
    consumedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type OtpVerificationTokenUpdateWithoutOtpCodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    purpose?: EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpVerificationTokenUncheckedUpdateWithoutOtpCodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    purpose?: EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpVerificationTokenUncheckedUpdateManyWithoutOtpCodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    purpose?: EnumOtpPurposeFieldUpdateOperationsInput | $Enums.OtpPurpose
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateManyListingInput = {
    id?: string
    buyerId: string
    farmerId: string
    quantity: Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder: Decimal | DecimalJsLike | number | string
    status?: $Enums.OrderStatus
    latestLatitude?: number | null
    latestLongitude?: number | null
    locationReportedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ListingInterestCreateManyListingInput = {
    id?: string
    buyerId: string
    createdAt?: Date | string
  }

  export type SavedListingCreateManyListingInput = {
    id?: string
    buyerId: string
    createdAt?: Date | string
  }

  export type OrderUpdateWithoutListingInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    latestLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    latestLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    locationReportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    buyer?: UserUpdateOneRequiredWithoutBuyerOrdersNestedInput
    farmer?: UserUpdateOneRequiredWithoutFarmerOrdersNestedInput
    review?: ReviewUpdateOneWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutListingInput = {
    id?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    farmerId?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    latestLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    latestLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    locationReportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    review?: ReviewUncheckedUpdateOneWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutListingInput = {
    id?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    farmerId?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    pricePerUnitAtOrder?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    latestLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    latestLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    locationReportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingInterestUpdateWithoutListingInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    buyer?: UserUpdateOneRequiredWithoutExpressedInterestsNestedInput
  }

  export type ListingInterestUncheckedUpdateWithoutListingInput = {
    id?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingInterestUncheckedUpdateManyWithoutListingInput = {
    id?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedListingUpdateWithoutListingInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    buyer?: UserUpdateOneRequiredWithoutSavedListingsNestedInput
  }

  export type SavedListingUncheckedUpdateWithoutListingInput = {
    id?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedListingUncheckedUpdateManyWithoutListingInput = {
    id?: StringFieldUpdateOperationsInput | string
    buyerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
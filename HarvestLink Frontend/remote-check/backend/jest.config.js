// jest.config.js

/** @type {import('jest').Config} */
export default {
  testEnvironment: "node",
  // No transform — native ESM, no Babel/transpilation step.
  transform: {},
  testMatch: ["**/tests/**/*.test.js"],
  moduleFileExtensions: ["js", "json"],
  collectCoverageFrom: [
    "src/modules/**/*.js",
    "!src/modules/**/*.routes.js", // thin wiring, low value to unit-test
  ],
  coverageDirectory: "coverage",
  verbose: true,
};

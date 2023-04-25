
export default {
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testMatch: ['**/__tests__/integration/**/*.[jt]s?(x)'],
  testTimeout: 1000,
  verbose: true,
};

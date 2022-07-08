module.exports = {
  preset: '',
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  coverageDirectory: 'dist/coverage',

  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/(?!@foo)',
    '<rootDir>/dist/',
  ],

  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },

  moduleFileExtensions: ['ts', 'js'],

  moduleNameMapper: {
    'testing/(.*)': '<rootDir>/src/testing/$1',
    environment: '<rootDir>/src/environment',
    database: '<rootDir>/src/database',
    'app/(.*)': '<rootDir>/src/app/$1',
  },

  testEnvironment: 'node',

  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  transformIgnorePatterns: ['<rootDir>/node_modules/(?!@foo)'],

  coverageThreshold: {
    global: {
      statements: 85,
      branches: 85,
      functions: 75,
      lines: 80,
    },
  },
};

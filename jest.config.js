module.exports = {
  globals: {
    // Point ts-jest to tsconfig for transpilation.
    'ts-jest': {
      tsconfig: 'tsconfig.tests.json',
    },
  },
  transform: {
    // Regex selects .tsx? files to be transpiled to .jsx? before running.
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  testMatch: [
    // Path query that selects test files to run.
    '<rootDir>/**/__tests__/*-test.(ts|tsx|js|jsx)',
  ],
};

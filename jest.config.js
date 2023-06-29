module.exports = {
  collectCoverage: true,
  coverageDirectory: './build/reports/coverage/',
  coveragePathIgnorePatterns: ['/types/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: './test/support/test-environment-fix-jsdom.js',
  testPathIgnorePatterns: ['/node_modules/'],
  transformIgnorePatterns: ['/node_modules/(?!recurly.js).+\\.js$'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '.+\\.css$': 'jest-transform-css'
  },
  globalSetup: './test/support/globalSetup.js'
}

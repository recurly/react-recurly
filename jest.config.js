module.exports = {
  collectCoverage: true,
  coverageDirectory: './build/reports/coverage/',
  coveragePathIgnorePatterns: ['/types/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', 'jest-extended'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['/node_modules/(?!recurly.js).+\\.js$'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.+\\.css$': 'jest-transform-css'
  },
  globalSetup: './globalSetup.js'
}

module.exports = {
  collectCoverage: true,
  coverageDirectory: './build/reports/coverage/',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: ['/node_modules/(?!recurly.js).+\\.js$'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.+\\.css$': 'jest-transform-css'
  },
}

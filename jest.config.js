module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: ['/node_modules/(?!recurly.js).+\\.js$'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.+\\.css$': 'jest-transform-css',
  },
}

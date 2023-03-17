// using babel.config.js instead of a .babelrc because
// node_modules are not transpiled by babel-jest with
// a .babelrc file.
// See https://github.com/facebook/jest/issues/8365

module.exports = {
  'presets': [
    '@babel/preset-react',
    '@babel/preset-env'
  ],
  'plugins': [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
  ]
};

import JSDOMEnvironment from 'jest-environment-jsdom';

/**
 * Fixes JSDOM environment to include structuredClone
 *
 * https://github.com/facebook/jest/blob/v29.4.3/website/versioned_docs/version-29.4/Configuration.md#testenvironment-string
 *
 * FIXME https://github.com/jsdom/jsdom/issues/3363
 */
export default class FixJSDOMEnvironment extends JSDOMEnvironment {
  constructor (...args) {
    super(...args);
    this.global.structuredClone = structuredClone;
  }
}

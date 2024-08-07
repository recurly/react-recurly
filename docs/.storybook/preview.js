/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          'Introduction',
          'Components',
          [
            'RecurlyProvider',
            'Elements',
            'Card Element',
            'Individual Card Elements',
            '*'
          ],
          'Hooks',
          [
            'useRecurly',
            '*'
          ]
        ],
      },
    },
    actions: {
      argTypesRegex: '^on[A-Z].*'
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    a11y: {
      // axe-core configurationOptions (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#parameters-1)
      // config: {},
      // axe-core optionsParameter (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter)
      // options: {},
      // optional flag to prevent the automatic check
      // manual: true,
    },
  }
};

export default preview;

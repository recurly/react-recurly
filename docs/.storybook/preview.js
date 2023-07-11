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
    }
  }
};

export default preview;

import { getComponentProps } from '@storybook/addon-docs/blocks';;

/**
 * @type {PropDef}
 */
export const displayIcon = {
  name: 'displayIcon',
  type: { summary: 'bool' },
  required: false,
  description: 'Whether to show the card brand icon.',
  defaultValue: { detail: undefined, summary: 'true' }
};

/**
 * @type {PropDef}
 */
export const inputType = {
  name: 'inputType',
  type: { summary: 'string' },
  required: false,
  description: `
Modifies the input type of the card field:

\`"text"\` for text input.

\`"mobileSelect"\` renders a mobile-optimized \`<select>\` UI control for expiry on mobile devices only.

\`"select"\` renders the expiry input using a \`<select>\` input on all devices. Mobile devices will display an optimized UI control.
`.trim(),
  defaultValue: { detail: undefined, summary: '"mobileSelect"' }
};

/**
 * constructs a propSlot function to be consumed by a <DocsPage />
 *
 * @param  {React.Component} component
 * @param  {...[PropDef]}    rest
 * @return {PropTypesTableProps}
 */
export function propsSlotFor (component, ...rest) {
  return () => ({
    rows: [
      ...(getComponentProps(component, {}, { parameters: { framework: 'react' } })).rows,
      ...(rest || [])
    ]
  })
}

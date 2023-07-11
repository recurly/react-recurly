/**
 * @type {PropDef}
 */
export const displayIcon = {
  control: { type: 'boolean' },
  required: false,
  description: 'Whether to show the card brand icon.',
  defaultValue: true
};

/**
 * @type {PropDef}
 */
export const inputType = {
  control: { type: 'select' },
  options: ['text', 'mobileSelect', 'select'],
  required: false,
  description: `
Modifies the input type of the card field:

\`"text"\` for text input.

\`"mobileSelect"\` renders a mobile-optimized \`<select>\` UI control for expiry on mobile devices only.

\`"select"\` renders the expiry input using a \`<select>\` input on all devices. Mobile devices will display an optimized UI control.
`.trim(),
  defaultValue: 'mobileSelect'
};

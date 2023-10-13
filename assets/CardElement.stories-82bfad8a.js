import{C as h,s as C}from"./controls-bbc3ccff.js";import{d as f,i as E}from"./args-7d20fe2f.js";import{w as x}from"./decorators-ccea132a.js";import"./index-95c2f079.js";import"./jsx-runtime-bc5d6cf6.js";import"./index-c013ead5.js";import"./_commonjsHelpers-725317a4.js";import"./index-2baff29e.js";const D={component:h,title:"Components/Card Element",argTypes:{displayIcon:f,inputType:E},tags:["autodocs"],decorators:[x],parameters:{componentSubtitle:"Accept all card parameters in one place",docs:{description:{component:`
  A [Card Element](https://developers.recurly.com/reference/recurly-js/#the-card-element)
  component which wraps its Recurly.js analogue, passing configuration props to the underlying
  Recurly.js CardElement and allowing event binding using props.

  Your users will enter their card information (number, expiry, and cvv) here.
`}}}},e={args:{style:C(h)}},r={parameters:{docs:{description:{story:'Set `inputType="select"` to render a `<select>` in place of default expiry text input.'}}},args:{inputType:"select"}},t={parameters:{docs:{description:{story:"Set `placeholder.content` to localize the `CardElement`."}}},args:{style:{placeholder:{content:{number:"Numéro de Carte",expiry:"MM / AA",cvv:"CVC"}}}}},n={parameters:{docs:{description:{story:"Set `displayIcon={false}` to disable the card brand icon."}}},args:{displayIcon:!1}};var o,s,a;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    style: stylePropFor(CardElement)
  }
}`,...(a=(s=e.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};var c,p,i;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Set \`inputType="select"\` to render a \`<select>\` in place of default expiry text input.'
      }
    }
  },
  args: {
    inputType: 'select'
  }
}`,...(i=(p=r.parameters)==null?void 0:p.docs)==null?void 0:i.source}}};var d,l,m;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Set \`placeholder.content\` to localize the \`CardElement\`.'
      }
    }
  },
  args: {
    style: {
      placeholder: {
        content: {
          number: 'Numéro de Carte',
          expiry: 'MM / AA',
          cvv: 'CVC'
        }
      }
    }
  }
}`,...(m=(l=t.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var u,y,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Set \`displayIcon={false}\` to disable the card brand icon.'
      }
    }
  },
  args: {
    displayIcon: false
  }
}`,...(g=(y=n.parameters)==null?void 0:y.docs)==null?void 0:g.source}}};const M=["Default","DropdownExpiry","Localized","WithoutCardIcon"];export{e as Default,r as DropdownExpiry,t as Localized,n as WithoutCardIcon,M as __namedExportsOrder,D as default};
//# sourceMappingURL=CardElement.stories-82bfad8a.js.map

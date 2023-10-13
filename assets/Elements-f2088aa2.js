import{j as e,a as t,F as c}from"./jsx-runtime-bc5d6cf6.js";import{M as s,T as l,b as m,C as a}from"./index-5e7a220f.js";import{E as p}from"./Elements.stories-7ae37334.js";import"./index-95c2f079.js";import{u as i}from"./index-dc1d5b46.js";import"./index-c013ead5.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-5d8d9ff9.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-25c5ea02.js";import"./index-d37d4223.js";import"./index-356e4a49.js";import"./index-2baff29e.js";function o(r){const n=Object.assign({p:"p",code:"code",pre:"pre"},i(),r.components);return t(c,{children:[e(s,{of:p}),`
`,e(l,{}),`
`,e(m,{}),`
`,e(n.p,{children:e(n.code,{children:"import { Elements } from '@recurly/react-recurly';"})}),`
`,t(n.p,{children:["This component groups ",e(n.code,{children:"*Element"})," components together. When generating tokens, it is used to determine which values will be tokenized. This should wrap your checkout form."]}),`
`,t(n.p,{children:["The functionality of ",e(n.code,{children:"<Elements />"})," is largely behind the scenes. It takes one ",e(n.code,{children:"onSubmit"})," prop, and is used solely to designate which ",e(n.code,{children:"*Element"})," components belong together in your component heirarchy."]}),`
`,e(n.pre,{children:e(n.code,{className:"language-js",children:`import {
  RecurlyProvider,
  Elements
} from '@recurly/react-recurly';

() => {
  return (
    <RecurlyProvider publicKey="MY_PUBLIC_KEY">
      <Elements>
        {/* Any *Element component from react-recurly */}
      </Elements>
    </RecurlyProvider>
  );
};
`})}),`
`,e(a,{})]})}function v(r={}){const{wrapper:n}=Object.assign({},i(),r.components);return n?e(n,Object.assign({},r,{children:e(o,r)})):o(r)}export{v as default};
//# sourceMappingURL=Elements-f2088aa2.js.map

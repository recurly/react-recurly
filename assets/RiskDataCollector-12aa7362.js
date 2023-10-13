import{j as r,a as n,F as c}from"./jsx-runtime-bc5d6cf6.js";import"./blocks-2646952b.js";import{R as i}from"./RiskDataCollector.stories-b0b95f92.js";import{M as s,T as l,b as m,C as p}from"./index-5e7a220f.js";import{u as a}from"./index-dc1d5b46.js";import"./index-c013ead5.js";import"./_commonjsHelpers-725317a4.js";import"./decorators-ccea132a.js";import"./index-95c2f079.js";import"./index-2baff29e.js";import"./iframe-5d8d9ff9.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-25c5ea02.js";import"./index-d37d4223.js";import"./index-356e4a49.js";function t(o){const e=Object.assign({p:"p",code:"code",a:"a",pre:"pre"},a(),o.components);return n(c,{children:[r(s,{of:i}),`
`,r(l,{}),`
`,r(m,{}),`
`,r(e.p,{children:r(e.code,{children:"import { RiskDataCollector } from '@recurly/react-recurly';"})}),`
`,n(e.p,{children:["This component adds data collection elements to your checkout which are applied to any tokens generated within the bounds of its nearest ascendant parent ",r(e.code,{children:"HTMLFormElement"}),"."]}),`
`,n(e.p,{children:["This component is compatible with ",r(e.a,{href:"https://docs.recurly.com/docs/fraud-management",target:"_blank",rel:"nofollow noopener noreferrer",children:"Recurly Fraud Management"})," and ",r(e.a,{href:"https://docs.recurly.com/docs/kount",target:"_blank",rel:"nofollow noopener noreferrer",children:"Kount"}),"."]}),`
`,r(e.pre,{children:r(e.code,{className:"language-js",children:`import { RiskDataCollector } from '@recurly/react-recurly';

() => {
  const handleError = (error) => {
    // error.code
    // error.message
  };

  return (
    <RiskDataCollector
      strategy="kount"
      onError={handleError}
    />
  );
};
`})}),`
`,r(p,{})]})}function E(o={}){const{wrapper:e}=Object.assign({},a(),o.components);return e?r(e,Object.assign({},o,{children:r(t,o)})):t(o)}export{E as default};
//# sourceMappingURL=RiskDataCollector-12aa7362.js.map

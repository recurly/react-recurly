import{j as r,a as n,F as i}from"./jsx-runtime-bc5d6cf6.js";import{M as a}from"./index-5e7a220f.js";import{u as o}from"./index-dc1d5b46.js";import"./index-c013ead5.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-5d8d9ff9.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-25c5ea02.js";import"./index-d37d4223.js";import"./index-356e4a49.js";function l(t){const e=Object.assign({h1:"h1",a:"a",img:"img",p:"p",h2:"h2",pre:"pre",code:"code",strong:"strong",blockquote:"blockquote",h3:"h3",ul:"ul",li:"li"},o(),t.components);return n(i,{children:[r("img",{src:"https://i.imgur.com/gGxJ8zx.png",align:"right"}),`
`,n(e.h1,{id:"react-recurly--build-status-coverage-contributor-covenant",children:["react-recurly · ",r(e.a,{href:"https://travis-ci.org/recurly/react-recurly/builds",target:"_blank",rel:"nofollow noopener noreferrer",children:r(e.img,{src:"https://img.shields.io/travis/recurly/react-recurly/main.svg?style=flat-square",alt:"build status"})})," ",r(e.a,{href:"https://coveralls.io/github/recurly/react-recurly",target:"_blank",rel:"nofollow noopener noreferrer",children:r(e.img,{src:"https://img.shields.io/coveralls/github/recurly/react-recurly.svg?style=flat-square",alt:"coverage"})})," ",r(e.a,{href:"CODE_OF_CONDUCT.md",children:r(e.img,{src:"https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg",alt:"contributor covenant"})})]}),`
`,n(e.p,{children:["React components for ",r(e.a,{href:"https://developers.recurly.com/reference/recurly-js/",target:"_blank",rel:"nofollow noopener noreferrer",children:"Recurly.js"})]}),`
`,r(e.h2,{id:"documentation",children:"Documentation"}),`
`,r(e.p,{children:r(e.a,{href:"https://recurly.github.io/react-recurly",target:"_blank",rel:"nofollow noopener noreferrer",children:"Documentation & Reference"})}),`
`,r(e.p,{children:r(e.a,{href:"https://developers.recurly.com/reference/recurly-js/",target:"_blank",rel:"nofollow noopener noreferrer",children:"Recurly.js Documentation"})}),`
`,r(e.h2,{id:"examples",children:"Examples"}),`
`,r(e.p,{children:r(e.a,{href:"https://recurly.github.io/react-recurly/?path=/docs/introduction-interactive-demo--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Interactive Demo"})}),`
`,n(e.p,{children:["A great way to get started is to try the ",r(e.a,{href:"https://recurly.github.io/react-recurly/?path=/docs/introduction-interactive-demo--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"interactive demo"})," in our documentation, and look through the ",r(e.a,{href:"https://github.com/recurly/react-recurly/tree/main/demo",target:"_blank",rel:"nofollow noopener noreferrer",children:"demo source"})," on GitHub."]}),`
`,r(e.h2,{id:"installation",children:"Installation"}),`
`,r(e.p,{children:"Install this package with npm"}),`
`,r(e.pre,{children:r(e.code,{className:"language-bash",children:`npm install @recurly/react-recurly
`})}),`
`,r(e.p,{children:"Then, include recurly.js in your application via our CDN."}),`
`,r(e.pre,{children:r(e.code,{className:"language-html",children:`<script src="https://js.recurly.com/v4/recurly.js"><\/script>
<!-- optional: include recurly.css -->
<link rel="stylesheet" href="https://js.recurly.com/v4/recurly.css">
`})}),`
`,r(e.h2,{id:"implementation-guide",children:"Implementation Guide"}),`
`,n(e.p,{children:["In this guide, we will cover the steps necessary to ",r(e.strong,{children:"create a payment form"})," that will submit your user's payment information to Recurly."]}),`
`,n(e.blockquote,{children:[`
`,n(e.p,{children:["ℹ️ If you haven't yet, please review the ",r(e.a,{href:"https://developers.recurly.com/reference/recurly-js/",target:"_blank",rel:"nofollow noopener noreferrer",children:"Recurly.js documentation"}),". This will give you a solid understanding of the total capabilities of the library before we begin implementing some of its features in React."]}),`
`]}),`
`,n(e.p,{children:["To start, we will use the ",r(e.a,{href:"https://recurly.github.io/react-recurly/?path=/docs/components-recurlyprovider--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"<RecurlyProvider />"})," component to set our ",r(e.a,{href:"https://app.recurly.com/go/developer/api_access",target:"_blank",rel:"nofollow noopener noreferrer",children:"public key"}),"."]}),`
`,r(e.pre,{children:r(e.code,{className:"language-jsx",children:`// app.js
import React from 'react';
import { RecurlyProvider } from '@recurly/react-recurly';

function App () {
  return (
    <RecurlyProvider publicKey="MY_PUBLIC_KEY" />
  );
}
`})}),`
`,n(e.p,{children:["Now we can set up our payment form. For this, we will use ",r(e.a,{href:"https://developers.recurly.com/reference/recurly-js/#elements",target:"_blank",rel:"nofollow noopener noreferrer",children:"Recurly.js Elements"}),". First, we will use the ",r(e.a,{href:"https://recurly.github.io/react-recurly/?path=/docs/components-elements--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"<Elements />"})," component to group our Elements together. We'll also create a ",r(e.code,{children:"<MyPaymentForm />"})," component to contain our payment form."]}),`
`,r(e.pre,{children:r(e.code,{className:"language-jsx",children:`// app.js
import React from 'react';
import { RecurlyProvider, Elements } from '@recurly/react-recurly';
import { MyPaymentForm } from './my-payment-form';

function App () {
  return (
    <RecurlyProvider publicKey="MY_PUBLIC_KEY">
      <Elements>
        <MyPaymentForm />
      </Elements>
    </RecurlyProvider>
  );
}
`})}),`
`,n(e.p,{children:["Within our new ",r(e.code,{children:"<MyPaymentForm />"})," component, we'll add a ",r(e.a,{href:"https://recurly.github.io/react-recurly/?path=/docs/components-card-element--default",target:"_blank",rel:"nofollow noopener noreferrer",children:"<CardElement />"})," which will render a secure card element. We'll also add inputs for our users' name. To let react-recurly know that we want to use these fields, we'll use a ",r(e.code,{children:"data-recurly"})," attribute. To include additional properties, see ",r(e.a,{href:"https://developers.recurly.com/reference/recurly-js/#billing-fields",target:"_blank",rel:"nofollow noopener noreferrer",children:"this billing fields table"}),"."]}),`
`,r(e.pre,{children:r(e.code,{className:"language-jsx",children:`// my-payment-form.js
import React from 'react';
import { CardElement } from '@recurly/react-recurly';

export function MyPaymentForm (props) {
  return (
    <form>
      <input type="text" data-recurly="first_name" placeholder="First name" />
      <input type="text" data-recurly="last_name" placeholder="Last name" />
      <CardElement />
    </form>
  );
}
`})}),`
`,n(e.p,{children:["We are now ready to add the final step: ",r(e.strong,{children:"getting a token"}),". When our users submit our form, we want to send their payment information to Recurly, which will return a token. We'll then keep this token to use in the Recurly API."]}),`
`,n(e.p,{children:["To accomplish this, we will use the ",r(e.a,{href:"https://recurly.github.io/react-recurly/?path=/docs/hooks-userecurly--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"useRecurly"})," hook. This hook returns a Recurly.js instance, on which we will call ",r(e.a,{href:"https://developers.recurly.com/reference/recurly-js/#getting-a-token",target:"_blank",rel:"nofollow noopener noreferrer",children:"recurly.token"}),". Since this function expects a ",r(e.code,{children:"<form>"}),", we will create a ",r(e.a,{href:"react-refs",children:"React ref"})," to pass to it."]}),`
`,r(e.pre,{children:r(e.code,{className:"language-jsx",children:`// my-payment-form.js
import React from 'react';
import { CardElement, useRecurly } from '@recurly/react-recurly';

export function MyPaymentForm (props) {
  const formRef = React.useRef();
  const recurly = useRecurly();

  function handleSubmit (event) {
    event.preventDefault();
    recurly.token(formRef.current, (err, token) => {
      if (err) {
        // handle error
      } else {
        // save the token.id, and submit it to the Recurly API from your server
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <input type="text" data-recurly="first_name" placeholder="First name" />
      <input type="text" data-recurly="last_name" placeholder="Last name" />
      <CardElement />
    </form>
  );
}
`})}),`
`,n(e.p,{children:["With that, we have implemented the essential components of a payment form using react-recurly. The tokens generated above may be used on any ",r(e.code,{children:"billing_info"})," object in the ",r(e.a,{href:"https://developers.recurly.com/api",target:"_blank",rel:"nofollow noopener noreferrer",children:"Recurly API"}),"."]}),`
`,r(e.h3,{id:"additional-usage",children:"Additional Usage"}),`
`,n(e.p,{children:["React-recurly also includes a ",r(e.a,{href:"https://recurly.github.io/react-recurly/?path=/docs/hooks-usecheckoutpricing--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"useCheckoutPricing"})," hook for generating a pricing preview before checking out."]}),`
`,r(e.pre,{children:r(e.code,{className:"language-js",children:`import { useCheckoutPricing, RecurlyProvider } from '@recurly/react-recurly';

function PricingPreview () {
  const initialPricingInput = {
    subscriptions: [
      {
        plan: 'my-plan'
      }
    ]
  };

  const [{ price, loading }, setCheckoutPricing] = useCheckoutPricing(initialPricingInput);

  if (!loading) {
    return <div>{price.now.subtotal}</div>
  };
};

export default function MyApp () {
  <RecurlyProvider>
    <PricingPreview />
  </RecurlyProvider>
};
`})}),`
`,n(e.p,{children:["For more details, see the ",r(e.a,{href:"https://recurly.github.io/react-recurly/?path=/docs/hooks-usecheckoutpricing--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"useCheckoutPricing Documentation"}),"."]}),`
`,r(e.h2,{id:"additional-resources",children:"Additional resources"}),`
`,n(e.ul,{children:[`
`,r(e.li,{children:r(e.a,{href:"https://recurly.github.io/react-recurly",target:"_blank",rel:"nofollow noopener noreferrer",children:"Documentation & Reference"})}),`
`,r(e.li,{children:r(e.a,{href:"https://developers.recurly.com/reference/recurly-js/",target:"_blank",rel:"nofollow noopener noreferrer",children:"Recurly.js Documentation"})}),`
`,r(e.li,{children:r(e.a,{href:"https://recurly.github.io/react-recurly/?path=/docs/introduction-interactive-demo--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Interactive Demo"})}),`
`,r(e.li,{children:r(e.a,{href:"https://github.com/recurly/react-recurly",target:"_blank",rel:"nofollow noopener noreferrer",children:"Code on GitHub"})}),`
`,r(e.li,{children:r(e.a,{href:"https://www.npmjs.com/package/@recurly/react-recurly",target:"_blank",rel:"nofollow noopener noreferrer",children:"Package on npm"})}),`
`,r(e.li,{children:r(e.a,{href:"https://developers.recurly.com/api",target:"_blank",rel:"nofollow noopener noreferrer",children:"Recurly API Documentation"})}),`
`,n(e.li,{children:["Questions? ",r(e.a,{href:"https://github.com/recurly/react-recurly/issues",target:"_blank",rel:"nofollow noopener noreferrer",children:"GitHub issues"})," and ",r(e.a,{href:"https://recurly.zendesk.com",target:"_blank",rel:"nofollow noopener noreferrer",children:"Recurly support"})," are here for you."]}),`
`]}),`
`,r(e.h2,{id:"licence",children:"Licence"}),`
`,r(e.p,{children:"MIT"})]})}function s(t={}){const{wrapper:e}=Object.assign({},o(),t.components);return e?r(e,Object.assign({},t,{children:r(l,t)})):l(t)}function c(t){return n(i,{children:[r(a,{title:"Introduction/Getting Started",parameters:{sortOrder:0}}),`
`,r(s,{})]})}function v(t={}){const{wrapper:e}=Object.assign({},o(),t.components);return e?r(e,Object.assign({},t,{children:r(c,t)})):c()}export{v as default};
//# sourceMappingURL=getting-started-cec62ad6.js.map

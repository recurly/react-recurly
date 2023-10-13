import{j as n,a as i,F as o}from"./jsx-runtime-bc5d6cf6.js";import{M as a}from"./index-5e7a220f.js";import{u as c}from"./index-dc1d5b46.js";import"./index-c013ead5.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-5d8d9ff9.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-25c5ea02.js";import"./index-d37d4223.js";import"./index-356e4a49.js";function t(r){const e=Object.assign({h1:"h1",p:"p",code:"code",a:"a",h2:"h2",pre:"pre",ol:"ol",li:"li"},c(),r.components);return i(o,{children:[n(a,{title:"Hooks/useCheckoutPricing"}),`
`,n(e.h1,{id:"usecheckoutpricing",children:"useCheckoutPricing"}),`
`,n(e.p,{children:n(e.code,{children:"import { useCheckoutPricing } from '@recurly/react-recurly';"})}),`
`,i(e.p,{children:["Use this ",n(e.a,{href:"https://reactjs.org/docs/hooks-intro.html",target:"_blank",rel:"nofollow noopener noreferrer",children:"hook"})," to interact with the ",n(e.a,{href:"https://developers.recurly.com/reference/recurly-js/#pricing",target:"_blank",rel:"nofollow noopener noreferrer",children:"Recurly.js pricing API"})," and provide users with an estimate of a purchase before they check out."]}),`
`,n(e.h2,{id:"initializing",children:"Initializing"}),`
`,i(e.p,{children:["To initialize, call ",n(e.code,{children:"useCheckoutPricing"})," ",n(e.a,{href:"/?path=/docs/types-usecheckoutpricinginput--page",children:"with an initial checkout pricing input"})," from any component inside a ",n(e.a,{href:"/?path=/docs/components-recurlyprovider--page",children:"RecurlyProvider"}),"."]}),`
`,n(e.pre,{children:n(e.code,{className:"language-js",children:`import { useCheckoutPricing, RecurlyProvider } from '@recurly/react-recurly';

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
    // useCheckoutPricing can only be used by a component within a RecurlyProvider tree
    <PricingPreview />
  </RecurlyProvider>
};
`})}),`
`,i(e.p,{children:["Calling ",n(e.code,{children:"useCheckoutPricing"})," returns an array of two items:"]}),`
`,i(e.ol,{children:[`
`,i(e.li,{children:["A ",n(e.a,{href:"/?path=/docs/types-usecheckoutpricingreturn--page#usecheckoutpricingstate",children:"useCheckoutPricingState"})," object for reading output."]}),`
`,i(e.li,{children:["A ",n(e.a,{href:"/?path=/docs/types-usecheckoutpricingreturn--page#setcheckoutpricing",children:"setCheckoutPricing"})," function for updating input values."]}),`
`]}),`
`,i(e.p,{children:["For complete documentation on what ",n(e.code,{children:"useCheckoutPricing"})," returns, see the ",n(e.a,{href:"/?path=/docs/types-usecheckoutpricingreturn--page",children:"useCheckoutPricingReturn types page"}),"."]}),`
`,n(e.h2,{id:"initializing-1",children:"Initializing"}),`
`,i(e.p,{children:["It's important to know that immediately after calling ",n(e.code,{children:"useCheckoutPricing"}),", ",n(e.a,{href:"/?path=/docs/types-usecheckoutpricingreturn--page#usecheckoutpricingstate",children:"useCheckoutPricingState.price"})," will default to an empty object while waiting for asynchronous actions to resolve."]}),`
`,n(e.p,{children:"The below example will throw a type error because of this."}),`
`,n(e.pre,{children:n(e.code,{className:"language-js",children:`export default function PricingPreview () {
  const initialPricingInput = {
    subscriptions: [
      {
        plan: 'my-plan'
      }
    ]
  };

  const [{ price }, setCheckoutPricing] = useCheckoutPricing(initialPricingInput);

  return <div>{price.now.subtotal}</div>
};
`})}),`
`,i(e.p,{children:["The ",n(e.a,{href:"#loading-state",children:"loading state"})," can be checked before rendering anything that uses ",n(e.a,{href:"/?path=/docs/types-usecheckoutpricingreturn--page#usecheckoutpricingstate",children:"useCheckoutPricingState.price"})," to circumvent the error."]}),`
`,n(e.pre,{children:n(e.code,{className:"language-js",children:`export default function PricingPreview () {
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
`})}),`
`,n(e.p,{children:"Existence checking can be used as well."}),`
`,n(e.pre,{children:n(e.code,{className:"language-js",children:`export default function PricingPreview () {
  const initialPricingInput = {
    subscriptions: [
      {
        plan: 'my-plan'
      }
    ]
  };

  const [{ price }, setCheckoutPricing] = useCheckoutPricing(initialPricingInput);

  return <div>{price.now && price.now.subtotal}</div>
};
`})}),`
`,n(e.h2,{id:"updating",children:"Updating"}),`
`,i(e.p,{children:["Calling ",n(e.a,{href:"/?path=/docs/types-usecheckoutpricingreturn--page#setcheckoutpricing",children:"setCheckoutPricing"})," with a ",n(e.a,{href:"/?path=/docs/types-usecheckoutpricinginput--page",children:"useCheckoutPricingInput"})," will recalculate its associated ",n(e.a,{href:"/?path=/docs/types-usecheckoutpricingreturn--page#usecheckoutpricingstate",children:"useCheckoutPricingState"})," and re-render the underlying component."]}),`
`,i(e.p,{children:["For example, if a customer wishes to choose a different plan for their subscription on a checkout page and the price preview needs to be updated, calling ",n(e.a,{href:"/?path=/docs/types-usecheckoutpricingreturn--page#setcheckoutpricing",children:"setCheckoutPricing"})," with new inputs will update ",n(e.a,{href:"/?path=/docs/types-usecheckoutpricingreturn--page#usecheckoutpricingstate",children:"useCheckoutPricingState"})," and trigger a re-render with the updated values."]}),`
`,n(e.pre,{children:n(e.code,{className:"language-js",children:`export default function PricingPreview () {
  const [plan, setPlan] = useState('');
  const initialPricingInput = {
    subscriptions: [
      {
        plan: 'my-plan'
      }
    ]
  };

  const [{ price, loading }, setCheckoutPricing] = useCheckoutPricing(initialPricingInput);

  const handleChange = e => {
    const newPlan = e.target.value;
    setPlan(newPlan);

    // calling setCheckoutPricing here with new input values will update \`price\` and trigger a re-render
    setCheckoutPricing({ subscriptions: [{ plan: newPlan }] });
  }

  if (!loading) {
    return <div>
      <div>
        {price.now.subtotal}
      </div>
      <select value={plan} onChange={handleChange}>
        <option value="">Select a plan</option>
        <option value="my-plan">My plan</option>
        <option value="my-second-plan">My second plan</option>
      </select>
    </div>
  };
};
`})}),`
`,i(e.p,{children:[n(e.a,{href:"/?path=/docs/types-usecheckoutpricingreturn--page#setcheckoutpricing",children:"setCheckoutPricing"})," is an implementation of ",n(e.a,{href:"https://reactjs.org/docs/hooks-state.html",target:"_blank",rel:"nofollow noopener noreferrer",children:"react state"})," and follows the same rules and patterns. It's also possible pass a function to ",n(e.a,{href:"/?path=/docs/types-usecheckoutpricingreturn--page#setcheckoutpricing",children:"setCheckoutPricing"})," that accepts its previous inputs as the first and only argument:"]}),`
`,n(e.pre,{children:n(e.code,{className:"language-js",children:`setCheckoutPricing(previous => ({ ...previous, subscriptions: [{ plan: newPlan }] }));
`})}),`
`,n(e.h2,{id:"loading-state",children:"Loading state"}),`
`,n(e.p,{children:"Because Recurly.js' pricing API is asynchronous, a loading state is provided as a boolean."}),`
`,n(e.pre,{children:n(e.code,{className:"language-js",children:`export default function PricingPreview () {
  const [plan, setPlan] = useState(null)

  const initialPricingInput = {
    subscriptions: [
      {
        plan: 'my-plan'
      }
    ]
  };

  const [{ loading }, setCheckoutPricing] = useCheckoutPricing(initialPricingInput);

  if (loading) {
    return <div>Loading...</div>
  };
  ...
};
`})}),`
`,i(e.p,{children:["When ",n(e.code,{children:"useCheckoutPricing"})," is first initiated or when it's updated with ",n(e.a,{href:"/?path=/docs/types-usecheckoutpricingreturn--page#setcheckoutpricing",children:"setCheckoutPricing"}),", ",n(e.a,{href:"/?path=/docs/types-usecheckoutpricingreturn--page#usecheckoutpricingstate",children:"useCheckoutPricingState.loading"})," will be set to ",n(e.code,{children:"true"})," until its asynchronous actions have resolved, then set back to ",n(e.code,{children:"false"}),"."]}),`
`,n(e.h2,{id:"error-handling",children:"Error handling"}),`
`,i(e.p,{children:["Any errors from ",n(e.code,{children:"useCheckoutPricing"})," will be thrown by default. Passing a function as the second argument to ",n(e.code,{children:"useCheckoutPricing"})," allows errors to be caught and handled."]}),`
`,n(e.pre,{children:n(e.code,{className:"language-js",children:`export default function PricingPreview () {
  const [recurlyError, setRecurlyError] = useState(null);

  const initialPricingInput = {
    subscriptions: [
      {
        plan: 'my-plan'
      }
    ]
  };

  const [{ price, loading }, setCheckoutPricing] = useCheckoutPricing(initialPricingInput, setRecurlyError);

  if (recurlyError && !loading) {
    return <div>Error: {recurlyError.message}</div>
  };
  ...
};
`})}),`
`,i(e.p,{children:["Errors will always take the shape of a ",n(e.a,{href:"https://developers.recurly.com/reference/recurly-js/#errors",target:"_blank",rel:"nofollow noopener noreferrer",children:"Recurly.js error"}),"."]}),`
`,n(e.h2,{id:"demo",children:"Demo"}),`
`,i(e.p,{children:["For a full example of ",n(e.code,{children:"useCheckoutPricing"}),", see our ",n(e.a,{href:"/?path=/docs/introduction-interactive-demo--page",children:"interactive demo"}),"."]})]})}function y(r={}){const{wrapper:e}=Object.assign({},c(),r.components);return e?n(e,Object.assign({},r,{children:n(t,r)})):t(r)}export{y as default};
//# sourceMappingURL=useCheckoutPricing-d9abab61.js.map

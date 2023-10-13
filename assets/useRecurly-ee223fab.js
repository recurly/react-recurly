import{j as n,a as o,F as c}from"./jsx-runtime-bc5d6cf6.js";import"./blocks-2646952b.js";import{u as l}from"./index-dc1d5b46.js";import{M as a}from"./index-5e7a220f.js";import"./index-c013ead5.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-5d8d9ff9.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-25c5ea02.js";import"./index-d37d4223.js";import"./index-356e4a49.js";function t(r){const e=Object.assign({h1:"h1",p:"p",code:"code",a:"a",h2:"h2",pre:"pre"},l(),r.components);return o(c,{children:[n(a,{title:"Hooks/useRecurly"}),`
`,n(e.h1,{id:"userecurly",children:"useRecurly"}),`
`,n(e.p,{children:n(e.code,{children:"import { useRecurly } from '@recurly/react-recurly';"})}),`
`,o(e.p,{children:["Use this ",n(e.a,{href:"https://reactjs.org/docs/hooks-intro.html",target:"_blank",rel:"nofollow noopener noreferrer",children:"hook"})," to access a Recurly instance."]}),`
`,n(e.h2,{id:"getting-a-token",children:"Getting a token"}),`
`,o(e.p,{children:["When a user submits your checkout form, use this hook to submit their card information securely to Recurly. We will generate a token, and return that token to you. You will then send this token to your server, and ",n(e.a,{href:"https://developers.recurly.com/reference/recurly-js/#using-a-token",target:"_blank",rel:"nofollow noopener noreferrer",children:"use it in the Recurly API"})," to store or charge your user's credit card."]}),`
`,o(e.p,{children:[n(e.code,{children:"useRecurly()"})," will return a ",n(e.code,{children:"recurly.js"})," instance on which you will call ",n(e.code,{children:"recurly.token"}),". Create a ref to your payment form using ",n(e.a,{href:"https://reactjs.org/docs/refs-and-the-dom.html",target:"_blank",rel:"nofollow noopener noreferrer",children:n(e.code,{children:"React.useRef"})}),", and pass this ref to ",n(e.code,{children:"recurly.token"}),"."]}),`
`,n(e.pre,{children:n(e.code,{className:"language-jsx",children:`import { CardElement, useRecurly } from '@recurly/react-recurly';

export function MyCardForm (props) {
  const recurly = useRecurly();
  const formRef = React.useRef();

  const handleSubmit = event => {
    if (event.preventDefault) event.preventDefault();
    recurly.token(formRef.current, (err, token) => {
      if (err) console.log('[error]', err);
      else console.log('[token]', token);
    });
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <input type="text" data-recurly="first_name" />
      <input type="text" data-recurly="last_name" />
      <CardElement onSubmit={handleSubmit} />
      <button>Submit</button>
    </form>
  );
}
`})}),`
`,n(e.h2,{id:"extended-usage-example-paypal",children:"Extended usage example: PayPal"}),`
`,o(e.p,{children:[n(e.code,{children:"useRecurly"})," can be used to expose any functionality in ",n(e.a,{href:"https://developers.recurly.com/reference/recurly-js/index.html",target:"_blank",rel:"nofollow noopener noreferrer",children:"Recurly-js"}),"."]}),`
`,o(e.p,{children:["The example below shows how to use ",n(e.code,{children:"useRecurly"})," to interact with the ",n(e.a,{href:"https://developers.recurly.com/reference/recurly-js/index.html#paypal",target:"_blank",rel:"nofollow noopener noreferrer",children:"Recurly-js PayPal API"}),"."]}),`
`,n(e.pre,{children:n(e.code,{className:"language-jsx",children:`const PayPalButton = () => {
  const recurly = useRecurly();
  const payPal = recurly.PayPal();

  useEffect(() => {
    payPal.on('token', token => {
      console.log('Token: ', token);
    });

    payPal.on('error', error => {
      throw error;
    });

    payPal.on('cancel', () => {
      console.log('Cancelled');
    });

    payPal.on('ready', () => {
      console.log('Ready');
    });
  }, [payPal]);

  const handleClick = () => {
    payPal.start();
  };

  return <button onClick={handleClick}>Start Paypal</button>;
};
`})})]})}function R(r={}){const{wrapper:e}=Object.assign({},l(),r.components);return e?n(e,Object.assign({},r,{children:n(t,r)})):t(r)}export{R as default};
//# sourceMappingURL=useRecurly-ee223fab.js.map

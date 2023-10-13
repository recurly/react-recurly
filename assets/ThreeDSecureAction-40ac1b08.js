import{j as e,a as o,F as i}from"./jsx-runtime-bc5d6cf6.js";import"./blocks-2646952b.js";import{T as a}from"./ThreeDSecureAction.stories-7b09e0f3.js";import{u as c}from"./index-dc1d5b46.js";import{M as s,T as l,b as p,C as u}from"./index-5e7a220f.js";import"./index-c013ead5.js";import"./_commonjsHelpers-725317a4.js";import"./decorators-ccea132a.js";import"./index-95c2f079.js";import"./index-2baff29e.js";import"./iframe-5d8d9ff9.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-25c5ea02.js";import"./index-d37d4223.js";import"./index-356e4a49.js";function t(n){const r=Object.assign({p:"p",code:"code",a:"a",pre:"pre"},c(),n.components);return o(i,{children:[e(s,{of:a}),`
`,e(l,{}),`
`,e(p,{}),`
`,e(r.p,{children:e(r.code,{children:"import { ThreeDSecureAction } from '@recurly/react-recurly';"})}),`
`,o(r.p,{children:["This component renders a 3-D Secure authentication flow. If you receive a ",e(r.code,{children:"three_d_secure_action_token_id"})," from the ",e(r.a,{href:"https://developers.recurly.com/api/",target:"_blank",rel:"nofollow noopener noreferrer",children:"Recurly API"}),", use it with this component to process the authentication and receive a result token."]}),`
`,e(r.p,{children:e(r.a,{href:"https://docs.recurly.com/docs/revised-payment-services-directive-psd2",target:"_blank",rel:"nofollow noopener noreferrer",children:"More about Strong Customer Authentication"})}),`
`,e(r.p,{children:e(r.a,{href:"https://dev.recurly.com/page/recurly-3d-secure-2-integration-guide",target:"_blank",rel:"nofollow noopener noreferrer",children:"Recurly 3-D Secure integration documentation"})}),`
`,e(r.pre,{children:e(r.code,{className:"language-js",children:`import { ThreeDSecureAction } from '@recurly/react-recurly';

() => {
  const handleToken = (token) => {
    // token.type => 'three_d_secure_action_result'
    // token.id
  };

  return (
    <ThreeDSecureAction
      actionTokenId="MY_ACTION_TOKEN_ID"
      onToken={handleToken}
    />
  );
};
`})}),`
`,e(u,{})]})}function C(n={}){const{wrapper:r}=Object.assign({},c(),n.components);return r?e(r,Object.assign({},n,{children:e(t,n)})):t(n)}export{C as default};
//# sourceMappingURL=ThreeDSecureAction-40ac1b08.js.map

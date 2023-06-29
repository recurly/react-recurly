import { RecurlyProvider, Elements } from '../../lib';

export default {
  component: Elements
};

export const Primary = {
  render: () => <RecurlyProvider publicKey="MY_PUBLIC_KEY">
    <Elements />
  </RecurlyProvider>,
  parameters: {
    componentSubtitle: 'Top-level component'
  }
};

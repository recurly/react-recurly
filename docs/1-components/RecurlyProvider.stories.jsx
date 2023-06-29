import { RecurlyProvider } from '../../lib';

export default {
  component: RecurlyProvider
};

export const Primary = {
  render: () => <RecurlyProvider publicKey="MY_PUBLIC_KEY" />,
  parameters: {
    componentSubtitle: 'Top-level component'
  }
};

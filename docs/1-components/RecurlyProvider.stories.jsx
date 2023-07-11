import { RecurlyProvider } from '../../lib';

export default {
  component: RecurlyProvider,
  title: 'Components/RecurlyProvider',
  parameters: {
    componentSubtitle: 'Top-level component'
  }
};

export const Default = {
  render: () => <RecurlyProvider publicKey="MY_PUBLIC_KEY" />
};

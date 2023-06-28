import { RecurlyProvider } from '../../lib';

export default {
  component: RecurlyProvider,
  includeStories: ['Primary']
};

export const Empty = null;

export const Primary = {
  render: () => <RecurlyProvider />,
  // args: {
  //   publicKey: 'MY_PUBLIC_KEY'
  // },
  parameters: {
    componentSubtitle: 'Top-level component'
  }
};

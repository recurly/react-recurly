import { RecurlyProvider, Elements } from '../../lib';

export default {
  component: Elements,
  title: 'Components/Elements',
  parameters: {
    componentSubtitle: 'Top-level component'
  }
};

export const Default = {
  render: () => (
    <RecurlyProvider publicKey="MY_PUBLIC_KEY">
      <Elements />
    </RecurlyProvider>
  )
};

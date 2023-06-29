import { ThreeDSecureAction } from '../../lib';

export default {
  component: ThreeDSecureAction,
  title: 'Components/ThreeDSecureAction',
  parameters: {
    componentSubtitle: 'Display a 3-D Secure authentication flow'
  }
};

export const Default = {
  args: {
    actionTokenId: 'MY_ACTION_TOKEN_ID'
  }
};

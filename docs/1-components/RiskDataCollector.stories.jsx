import { RiskDataCollector } from '../../lib';

export default {
  component: RiskDataCollector,
  title: 'Components/RiskDataCollector',
  parameters: {
    componentSubtitle: 'Fraud protection for your checkout'
  }
};

export const Default = {
  args: {
    strategy: 'kount'
  }
};

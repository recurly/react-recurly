import { withRecurlyProvider } from '../shared/decorators';
import { RiskDataCollector } from '../../lib';

export default {
  component: RiskDataCollector,
  title: 'Components/RiskDataCollector',
  parameters: {
    componentSubtitle: 'Fraud protection for your checkout'
  },
  decorators: [withRecurlyProvider]
};

export const Default = {
  args: {
    strategy: 'kount'
  }
};

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// TODO: Lock to CDN distribution
import recurly from 'recurly.js';

global.recurly = recurly;

Enzyme.configure({ adapter: new Adapter() });

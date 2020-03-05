import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// TODO: Lock to CDN distribution
import recurly from 'recurly.js';
import 'regenerator-runtime/runtime';

global.recurly = recurly;

Enzyme.configure({ adapter: new Adapter() });

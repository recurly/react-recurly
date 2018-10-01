import React from 'react'
import App from '../demo/app'
import { render } from '@testing-library/react'

describe('<App />', () => {
    const { getByText } = render(<App />);

    it('should run a test', () => {
        const header = getByText('react-recurly demo');
        expect(header).toBeTruthy();
    });
});

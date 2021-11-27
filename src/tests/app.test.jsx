// disable jest global functions warns
/* eslint-disable no-undef */
import * as React from 'react';
import { screen, render } from '@testing-library/react';
import user from '@testing-library/user-event';

import App from '../App';

const unmockedFetch = global.fetch;
const unmockedClipboard = global.navigator.clipboard;

beforeAll(() => {
    global.fetch = () => Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ link: 'https://bit.ly/456' }),
    });
    global.navigator.clipboard = {
        writeText: () => Promise.resolve(),
    };
});

afterAll(() => {
    global.fetch = unmockedFetch;
    global.navigator.clipboard = unmockedClipboard;
});

test('renders', async () => {
    render(<App />);

    expect(screen.getByText(/Change mobility for good/i)).toBeDefined();

    await user.type(screen.getByLabelText(/url/i), 'http://www.tier.com');
    user.click(screen.getByRole('button', { text: 'Url to shorten' }));

    expect(await screen.findByText(/https:\/\/bit\.ly\/456 copied to clipboard!/)).toBeDefined();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
});

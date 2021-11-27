import { useCallback, useState } from 'react';

const BIT_LY_API_URL = 'https://api-ssl.bitly.com/v4/shorten';

const useBitlyAPI = () => {
    const [state, setState] = useState({ status: '', error: null, result: '' });

    const getShortLink = useCallback(
        async (text) => {
            setState({ status: 'loading', error: null, result: '' });

            try {
                const response = await fetch(BIT_LY_API_URL, {
                    method: 'POST',
                    body: JSON.stringify({
                        long_url: text,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${process.env.REACT_APP_BITLY_AUTHORIZATION_TOKEN}`,
                    },
                });

                const res = await response.json();

                if ([200, 201].includes(response.status)) {
                    setState({
                        status: 'success',
                        error: null,
                        result: res.link,
                    });
                } else {
                    setState({
                        status: 'error',
                        error: res.description,
                        result: '',
                    });
                }
            } catch (e) {
                if (e instanceof Error) {
                    setState({ status: 'error', error: e.message, result: '' });
                }
                setState({
                    status: 'error',
                    error: 'Unknown error',
                    result: '',
                });
            }
        },
        [state, setState],
    );

    return {
        status: state.status,
        error: state.error,
        result: state.result,
        getShortLink,
    };
};

export default useBitlyAPI;

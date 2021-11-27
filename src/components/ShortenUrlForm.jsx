import React, { useCallback, useState } from 'react';

import useClipboard from './useClipboard';
import useBitlyAPI from './useBitlyAPI';

const ShortenUrlForm = () => {
    const [value, setValue] = useState('');

    const { status, result, error, getShortLink } = useBitlyAPI();
    const { save: saveToClipboard } = useClipboard();

    const onChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    const onSubmit = useCallback(
        (event) => {
            event.preventDefault();
            getShortLink(value);
        },
        [value],
    );

    React.useEffect(() => {
        if (result) {
            saveToClipboard(result);
        }
    }, [result]);

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="shorten">
                Url:
                <input
                    placeholder="Url to shorten"
                    id="shorten"
                    type="text"
                    value={value}
                    onChange={onChange}
                />
            </label>
            <input
                type="submit"
                value="Shorten and copy URL"
                disabled={status === 'loading' || !value}
            />
            {status === 'success' && (
                <div className="success">{`${result} copied to clipboard!`}</div>
            )}
            {status === 'error' && <div className="error">{error}</div>}
        </form>
    );
};

export default ShortenUrlForm;

import { useCallback } from 'react';

const useClipboard = () => {
    const save = useCallback(async (value) => {
        await navigator.clipboard.writeText(value);
    }, []);
    return {
        save,
    };
};

export default useClipboard;

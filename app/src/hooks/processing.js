import {useEffect, useState} from 'react';

export const useProcessing = ({table}) => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        const handler = ({working}) => setLoading(working);
        table.on('EXEC_CHANGED', handler);

        return () => table.off(handler);
    });

    return isLoading;
};

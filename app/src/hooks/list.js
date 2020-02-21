import {useEffect, useState} from 'react';

export function useSmartList({table: st}) {
    const [list, setList] = useState(st.getMatchingItems());
    useEffect(() => {
        const handler = items => {
            setList(items.map(i => i.value));
        };
        st.onDisplayChange(handler);
        return () => st.off('DISPLAY_CHANGED', handler);
    }, []);
    return list;
}

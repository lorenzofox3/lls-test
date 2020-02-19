import {useEffect, useState} from 'react';

const eventName = 'SEARCH_CHANGED';

export function useSearch({table, scope = []}) {
    const [predicate, setPredicate] = useState(table.getTableState().search);
    const search = input => table.search({value: input, scope});

    useEffect(() => {
        const handler = state => {
            setPredicate(state.value);
        };
        table.on(eventName, handler);
        return () => table.off(eventName, handler);
    });

    return [predicate, search];
}

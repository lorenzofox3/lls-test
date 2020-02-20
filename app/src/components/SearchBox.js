import React from 'react';
import {useSearch} from '../hooks/search.js';

const debounce = (fn, time = 300) => {
    let timer = null;
    return (...args) => {
        if (timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn(...args);
        }, time);
    };
};

export default props => {
    const {scope, smartTable: table} = props;
    const [predicate, search] = useSearch({scope, table});
    // const callback = useCallback(debounce(v => search(v), 300));
    return <label>
        <span>{props.children}</span>
        <input type="search" value={predicate} onChange={ev => {
            search(ev.target.value);
        }} placeholder="ex: john"/>
    </label>;
};

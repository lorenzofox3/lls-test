import React, {useCallback} from 'react';
import LoadingIndicator from './LoadingIndicator.js';

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
    const search = useCallback(debounce(value => table.search({
        scope,
        value,
        flags: 'i'
    }), 300), [...scope]);
    return <label>
        <span>{props.children}</span>
        <div className="centered">
            <input type="search" onChange={ev => {
                search(ev.target.value);
            }} placeholder="ex: john"/>
            <LoadingIndicator smartTable={table}/>
        </div>
    </label>;
};

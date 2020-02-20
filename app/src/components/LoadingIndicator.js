import React from 'react';
import {useProcessing} from '../hooks/processing.js';

export default ({smartTable: table}) => {
    const isLoading = useProcessing({table});
    return <p className={isLoading ? 'loading centered' : 'loading invisible'}>
        <span className="visually-hidden">Loading</span>
        <svg aria-hidden={true} viewBox="0 0 50 50" className="spinner">
            <circle className="ring" cx="25" cy="25" r="22.5"/>
            <circle className="line" cx="25" cy="25" r="22.5"/>
        </svg>
    </p>;
}

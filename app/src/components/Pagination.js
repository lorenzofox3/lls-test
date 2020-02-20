import React from 'react';
import {usePagination} from '../hooks/pagination.js';
import IconButton from './IconButton.js';

const ChevronLeft = () => <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                               viewBox="0 0 24 24">
    <title>chevron-left</title>
    <path
        d="M15.707 17.293l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-6 6c-0.391 0.391-0.391 1.024 0 1.414l6 6c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414z"></path>
</svg>;
const ChevronRight = () =>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <title>chevron-right</title>
        <path
            d="M9.707 18.707l6-6c0.391-0.391 0.391-1.024 0-1.414l-6-6c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0z"></path>
    </svg>;

export default ({smartTable: table}) => {
    const [pageInfo, {previous, next}] = usePagination({table});
    return <div>
        <p>{pageInfo.page}</p>
        <IconButton disabled={pageInfo.previousDisabled} onClick={previous} label="go on previous page">
            <ChevronLeft/>
        </IconButton>
        <IconButton disabled={pageInfo.nextDisabled} onClick={next} label="go on next page">
            <ChevronRight/>
        </IconButton>
    </div>;
};

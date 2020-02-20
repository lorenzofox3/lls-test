import {smartTable} from 'smart-table-core';
import fixture from './fixture.js';

const wait = (time = 300) => new Promise(resolve => setTimeout(() => resolve(), time));

/**
 *  A fake sdk which mimics round trip with the server
 */
export default () => {
    const table = smartTable({data: fixture});
    return async (opts = {}) => {

        console.log('api call');

        const stateForFullMatchingList = Object.assign({}, opts, {
            slice: {page: 1}
        });

        const [full, partial] = await Promise.all([
            table.eval(stateForFullMatchingList),
            table.eval(opts)
        ]);

        //fake a server round trip
        await wait(300);

        return {
            data: partial,
            summary: {
                page: opts.slice.page,
                size: opts.slice.size,
                filteredCount: full.length
            }
        };
    };
};

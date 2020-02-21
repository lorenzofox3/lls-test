import {smartTable} from 'smart-table-core';
import fixture from './fixture.js';

const wait = (time = 300) => new Promise(resolve => setTimeout(() => resolve(), time));

/**
 *  A fake sdk which mimics round trip with the server
 */
export default () => {
    const table = smartTable({data: fixture});
    return {
        async query(opts = {}) {

            console.log('api call');

            const stateForFullMatchingList = Object.assign({}, opts, {
                slice: {page: 1}
            });

            const [full, partial] = await Promise.all([
                table.eval(stateForFullMatchingList),
                table.eval(opts)
            ]);

            //fake a server round trip
            await wait(500);

            return {
                data: partial,
                summary: {
                    page: opts.slice.page,
                    size: opts.slice.size,
                    filteredCount: full.length
                }
            };
        },

        async patch(id, newVal = {}) {
            const item = fixture.find(student => student.id === id);
            Object.assign(item, newVal);

            // fake round trip
            await wait();
            return item;
        },

        async remove(id) {
            const index = fixture.findIndex(student => student.id === id);
            fixture.splice(index, 1);
            // fake round trip
            await wait();
        },

        async add(newVal = {}) {
            const newId = Math.max(...fixture.map(student => student.id)) + 1;
            const newItem = Object.assign({id: newId}, newVal);
            fixture.unshift(newItem);
            // fake round trip
            await wait();
            return newItem;
        }
    };
};

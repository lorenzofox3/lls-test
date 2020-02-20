import {smartTable} from 'smart-table-core';
import sdk from './fake-api.js';

const queryExtension = query => ({table, tableState, data}) => {
    const exec = async () => {
        table.dispatch('EXEC_CHANGED', {working: true});
        try {
            const {data, summary} = await query(tableState);
            table.dispatch('SUMMARY_CHANGED', summary);
            table.dispatch('DISPLAY_CHANGED', data);
        } catch (e) {
            console.error(e);
            table.dispatch('EXEC_ERROR', e);
        } finally {
            table.dispatch('EXEC_CHANGED', {working: false});
        }
    };

    return Object.assign(table, {
        exec, eval: async (ts = tableState) => {
            const {data} = await query(ts);
            return data;
        }
    });
};

const crudExtension = () => {

};

const DEFAULT_TABLE_STATE = {
    sort: {},
    filter: {},
    search: {},
    slice: {
        page: 1,
        size: 5
    }
};
export default ({data = []} = {data: []}) => smartTable({
    data,
    tableState: DEFAULT_TABLE_STATE
}, queryExtension(sdk()));

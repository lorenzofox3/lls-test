import {smartTable} from 'smart-table-core';
import sdk from './fake-api.js';

const DEFAULT_TABLE_STATE = {
    sort: {},
    filter: {},
    search: {},
    slice: {
        page: 1,
        size: 5
    }
};
const service = sdk();

const queryExtension = service => ({table, tableState, data}) => {
    const exec = async () => {
        table.dispatch('EXEC_CHANGED', {working: true});
        try {
            const {data, summary} = await service.query(tableState);
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

const crudExtension = service => ({table, tableState, data}) => {
    const decorate = fn => async (...args) => {
        await fn(...args);
        table.exec();
    };

    const patch = decorate(service.patch);
    const remove = decorate(service.remove);
    const add = decorate(service.add);

    return Object.assign(table, {
        patch,
        remove,
        add
    });
};

export const MODAL_CHANGE_EVENT = 'MODAL_CHANGE';

const modalExtension = () => ({table}) => {
    return Object.assign(table, {
        openModal(type, data = {}) {
            table.dispatch(MODAL_CHANGE_EVENT, {
                type,
                data
            });
        },
        closeModal() {
            table.dispatch(MODAL_CHANGE_EVENT, {
                type: null
            });
        }
    });
};

export default ({data = []} = {data: []}) =>
    smartTable({
            data,
            tableState: DEFAULT_TABLE_STATE
        },
        queryExtension(service),
        crudExtension(service),
        modalExtension()
    );

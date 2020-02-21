import {useEffect, useState} from 'react';
import {MODAL_CHANGE_EVENT} from '../services/smart-table.js';

export const useModal = ({table}) => {
    const [modalType, updateModalType] = useState(null);
    const [data, updateData] = useState(null);

    useEffect(() => {
        const handler = ({type, data = null}) => {
            updateModalType(type);
            updateData(data);
        };
        table.on(MODAL_CHANGE_EVENT, handler);
        return () => table.off(MODAL_CHANGE_EVENT, handler);
    });

    return [modalType, data];
};

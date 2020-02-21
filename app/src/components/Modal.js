import React from 'react';
import {useModal} from '../hooks/useModal.js';

const stopPropagation = ev => ev.stopPropagation();

const formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate() + 1);
    return [year, month.length === 2 ? month : '0' + month, day.length === 2 ? day : '0' + day].join('-');
};

const ConfirmRemoveModal = ({smartTable: table, close, student}) => {

    const confirm = async () => {
        await table.remove(student.id);
        close();
    };

    return <div onClick={stopPropagation}>
        <p>Are you sure you want to delete student <strong>{student.firstname} {student.lastname}</strong> ?</p>
        <div className="controls-group">
            <button autoFocus={true} onClick={close}>Cancel</button>
            <button onClick={confirm} className="danger">Confirm</button>
        </div>
    </div>;
};

export const EditModal = ({smartTable: table, close, student = {}}) => {

    const label = student.id !== void 0 ? 'Update' : 'Create';
    const {firstname = '', bio = '', lastname = '', birthDate = new Date()} = student;

    const onSubmit = async ev => {
        ev.preventDefault();

        const {target: {elements}} = ev;

        const firstname = elements.namedItem('firstname').value;
        const lastname = elements.namedItem('lastname').value;
        const bio = elements.namedItem('bio').value;
        const birthDate = elements.namedItem('birthDate').value;

        const toSave = {
            firstname,
            lastname,
            bio,
            birthDate
        };

        if (student.id) {
            await table.patch(student.id, toSave);
        } else {
            await table.add(toSave);
        }

        close();
    };

    return <form onSubmit={onSubmit} onClick={stopPropagation}>
        <label>
            <span>First name</span>
            <input name="firstname" defaultValue={firstname} autoFocus required/>
        </label>
        <label>
            <span>Last name</span>
            <input name="lastname" defaultValue={lastname} required/>
        </label>
        <label>
            <span>Bio</span>
            <textarea name="bio" defaultValue={bio} required/>
        </label>
        <label>
            <span>Birth date</span>
            <input name="birthDate" defaultValue={formatDate(new Date(birthDate))} required type="date"/>
        </label>
        <div className="controls-group">
            <button type="button" onClick={close}>Cancel</button>
            <input type="submit" value={label}/>
        </div>
    </form>;
};

const getModalComp = type => {
    switch (type) {
        case 'REMOVE':
            return ConfirmRemoveModal;
        case 'EDIT':
        case 'ADD':
            return EditModal;
        default:
            return () => ``;
    }
};

export const Modal = ({smartTable: table}) => {
    const [type, data] = useModal({table});
    const student = data && data.student || {};
    const close = () => table.closeModal();
    const onKeyDown = ev => {
        if (ev.key === 'Escape') {
            close();
        }
    };
    const modalComp = getModalComp(type);

    return <div onClick={close} onKeyDown={onKeyDown} tabIndex="-1" aria-hidden={String(type === null)}
                id="modal-overlay" className="centered">
        {
            modalComp({smartTable: table, close, student})
        }
    </div>;
};


import React from 'react';
import {useSmartList} from '../hooks/list.js';
import Student from './Student.js';

const List = ({students, smartTable: table}) => {
    const remove = student => table.openModal('REMOVE', {
        student
    });

    const edit = student => table.openModal('EDIT', {
        student
    });

    return <ul>
        {students.map(student =>
            <li key={student.id}>
                <Student remove={remove} edit={edit} student={student}/>
            </li>)}
    </ul>;
};

export default props => {
    const {smartTable: table} = props;
    const students = useSmartList({table});
    return <div>
        {students.length === 0 ?
            <p className="centered">
                Could not find any matching student
            </p> :
            <List smartTable={table} students={students}/>}
    </div>;
};

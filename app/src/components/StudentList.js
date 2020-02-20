import React from 'react';
import {useSmartList} from '../hooks/list.js';
import Student from './Student.js';

export default props => {
    const students = useSmartList(props.smartTable);
    return <ul>
        {students.map(student =>
            <li key={student.id}>
                <Student student={student}/>
            </li>)}
    </ul>;
};

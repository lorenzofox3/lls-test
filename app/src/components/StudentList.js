import React from 'react';
import {useSmartList} from '../hooks/list.js';
import Student from './Student.js';

const List = ({students}) => <ul>
    {students.map(student =>
        <li key={student.id}>
            <Student student={student}/>
        </li>)}
</ul>;

export default props => {
    const {smartTable: table} = props;
    const students = useSmartList({table});
    return <div>
        {students.length === 0 ?
            <p className="centered">
                Could not find any matching student
            </p> :
            <List students={students}/>}
    </div>;
};

import React from 'react';
import ReactDOM from 'react-dom';
import smartListFactory from './services/smart-table.js';
import SearchBox from './components/SearchBox.js';
import StudentList from './components/StudentList.js';
import Pagination from './components/Pagination.js';
import IconButton from './components/IconButton.js';
import {Modal} from './components/Modal.js';

const table = smartListFactory();

const AddIcon = () => <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <title>plus-circle</title>
    <path
        d="M23 12c0-3.037-1.232-5.789-3.222-7.778s-4.741-3.222-7.778-3.222-5.789 1.232-7.778 3.222-3.222 4.741-3.222 7.778 1.232 5.789 3.222 7.778 4.741 3.222 7.778 3.222 5.789-1.232 7.778-3.222 3.222-4.741 3.222-7.778zM21 12c0 2.486-1.006 4.734-2.636 6.364s-3.878 2.636-6.364 2.636-4.734-1.006-6.364-2.636-2.636-3.878-2.636-6.364 1.006-4.734 2.636-6.364 3.878-2.636 6.364-2.636 4.734 1.006 6.364 2.636 2.636 3.878 2.636 6.364zM8 13h3v3c0 0.552 0.448 1 1 1s1-0.448 1-1v-3h3c0.552 0 1-0.448 1-1s-0.448-1-1-1h-3v-3c0-0.552-0.448-1-1-1s-1 0.448-1 1v3h-3c-0.552 0-1 0.448-1 1s0.448 1 1 1z"></path>
</svg>;

const App = ({table}) => {
    return <div>
        <h1>High school students List</h1>
        <div id="controls">
            <SearchBox scope={['firstname', 'lastname']} smartTable={table} id="search-input">
                Search for a student
            </SearchBox>
            <div className="controls-group">
                <IconButton onClick={() => table.openModal('ADD')} className="success" label="Add new student">
                    <AddIcon/>
                </IconButton>
            </div>
        </div>
        <StudentList smartTable={table}/>
        <Pagination smartTable={table}/>
        <Modal smartTable={table}/>
    </div>;
};

// boot app
const createApp = () => {
    table.exec();
    return <App table={table}/>;
};

const domContainer = document.getElementById('main');
ReactDOM.render(createApp(), domContainer);

import React from 'react';
import {render, wait} from '../utils.js';
import {smartTable} from 'smart-table-core';
import StudentList from '../../src/components/StudentList.js';

export default t => {
    t.test(`StudentList should render a warning if no student match`, t => {
        const table = smartTable({data: []});

        const {getByText} = render(<StudentList smartTable={table}/>);

        t.ok(getByText('Could not find any matching student'), 'should be ');
    });

    t.test(`StudentList should render the list of students`, t => {
        const table = smartTable({
            data: [{
                'id': 'd3fd409a-3e7f-4b82-8bd7-ca5a17285f36',
                'firstname': 'Dereck',
                'lastname': 'Weber',
                'birthDate': '2002-02-02T11:14:33.759Z',
                'bio': 'Omnis nemo molestiae non tempore corrupti sequi ipsam optio. Tempora atque facere qui repellat iste optio. Vitae voluptatum quam placeat atque eaque hic deserunt soluta.',
                'avatar': 'whatever'
            }, {
                'id': 'bbffa1d4-73bd-4ec4-9e67-6738a08c542d',
                'firstname': 'Ryley',
                'lastname': 'Kirlin',
                'birthDate': '2005-10-28T04:40:06.690Z',
                'bio': 'Reprehenderit est et et fugit porro. Atque ut in deleniti eaque non. Consequuntur a sit nisi molestiae consequuntur blanditiis. Ab rerum voluptas.',
                'avatar': 'whatever'
            }]
        });

        const {container} = render(<StudentList smartTable={table}/>);

        const items = container.querySelectorAll('article');
        t.eq(items.length, 2, 'should have both items');

        t.eq(items[0].querySelector('h2').textContent, 'Weber Dereck', `first item should match student Weber Dereck`);
        t.eq(items[1].querySelector('h2').textContent, 'Kirlin Ryley', `second item should match student Kirlin Ryley`);
    });

    t.test(`Students Components should update when linked table is updated`, async t => {
        const table = smartTable({
            data: [{
                'id': 'd3fd409a-3e7f-4b82-8bd7-ca5a17285f36',
                'firstname': 'Dereck',
                'lastname': 'Weber',
                'birthDate': '2002-02-02T11:14:33.759Z',
                'bio': 'Omnis nemo molestiae non tempore corrupti sequi ipsam optio. Tempora atque facere qui repellat iste optio. Vitae voluptatum quam placeat atque eaque hic deserunt soluta.',
                'avatar': 'whatever'
            }, {
                'id': 'bbffa1d4-73bd-4ec4-9e67-6738a08c542d',
                'firstname': 'Ryley',
                'lastname': 'Kirlin',
                'birthDate': '2005-10-28T04:40:06.690Z',
                'bio': 'Reprehenderit est et et fugit porro. Atque ut in deleniti eaque non. Consequuntur a sit nisi molestiae consequuntur blanditiis. Ab rerum voluptas.',
                'avatar': 'whatever'
            }]
        });

        const {container} = render(<StudentList smartTable={table}/>);
        const items = container.querySelectorAll('article');
        t.eq(items.length, 2, 'should have both items');

        t.eq(items[0].querySelector('h2').textContent, 'Weber Dereck', `first item should match student Weber Dereck`);
        t.eq(items[1].querySelector('h2').textContent, 'Kirlin Ryley', `second item should match student Kirlin Ryley`);

        table.sort({pointer: 'lastname', direction: 'asc'});

        await wait();

        const newItems = container.querySelectorAll('article');
        t.eq(newItems.length, 2, 'should have both items');

        t.eq(newItems[0].querySelector('h2').textContent, 'Kirlin Ryley', `first item should match student Kirlin Ryley`);
        t.eq(newItems[1].querySelector('h2').textContent, 'Weber Dereck', `second item should match student Weber Dereck`);
    });
}


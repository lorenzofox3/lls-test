import {useEffect, useState} from 'react';

const mapSortState = pointer => sortState => sortState.pointer !== pointer ? 'none' : sortState.direction || 'asc';

const SORT_DIRECTIONS = ['asc', 'desc'];

export function useSort({pointer, table, cycle = false}) {
    const mapState = mapSortState(pointer);
    const directions = cycle === true ? ['none'].concat(SORT_DIRECTIONS) : [...SORT_DIRECTIONS];
    const currentDirection = mapState(table.getTableState().sort);
    const currentIndex = directions.indexOf(currentDirection);
    const newIndex = (currentIndex + 1) % directions.length;
    const [state, updateState] = useState(currentDirection);
    const toggle = () => table.sort({pointer, direction: directions[newIndex]});

    useEffect(() => {
        const handler = state => {
            updateState(mapState(state));
        };
        const eventName = 'TOGGLE_SORT';
        table.on(eventName, handler);
        return () => table.off(eventName, handler);
    });

    return [state, toggle];
}

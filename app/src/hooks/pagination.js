import {useEffect, useState} from 'react';

const isPreviousEnabled = (page) => page - 1 > 0;
const isNextEnabled = (page, total, size) => (page + 1) <= Math.ceil(total / size);

export function usePagination({table}) {
    const {slice} = table.getTableState();
    const {
        page,
        size
    } = slice;
    const count = table.filteredCount;
    const [pageInfo, setPageInfo] = useState({
        ...slice,
        count,
        previousDisabled: !isPreviousEnabled(page),
        nextDisabled: !isNextEnabled(page, size, count)
    });

    const next = () => {
        table.slice({page: Math.min(page + 1, Math.ceil(count / size)), size});
    };
    const previous = () => {
        table.slice({page: Math.max(page - 1, 1), size});
    };

    useEffect(() => {
        const handler = ({page, size, filteredCount: count}) => {
            const previousDisabled = !isPreviousEnabled(page);
            const nextDisabled = !isNextEnabled(page, count, size);
            setPageInfo({
                page,
                size,
                count,
                previousDisabled,
                nextDisabled
            });
        };
        table.on('SUMMARY_CHANGED', handler);

        return () => {
            table.off('SUMMARY_CHANGED', handler);
        };
    });

    return [pageInfo, {
        previous,
        next
    }];
}

import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import CeCalendarPageNationItems from './CeCalnedarPageNationItems';

import styled from 'styled-components';

const CeCalendarPageNationMainDivBox = styled.div`
    width: 100%;
    .pagination {
        display: flex;
        padding-left: 0;
        list-style: none;
        .page-link {
            color: #6c757d;
            pointer-events: none;
            background-color: #fff;
            border-color: #dee2e6;
            position: relative;
            display: block;
            color: #0d6efd;
            text-decoration: none;
            background-color: #fff;
            border: 1px solid #dee2e6;
            transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
                box-shadow 0.15s ease-in-out;
        }
    }
    .disabled {
        .page-link {
            border-top-left-radius: 0.25rem;
            border-bottom-left-radius: 0.25rem;
        }
    }
    .active {
        .page-link {
            z-index: 3;
            color: #fff;
            background-color: #0d6efd;
            border-color: #0d6efd;
        }
    }
`;

type CeCalendarPageNationProps = {
    itemsPerPage: number;
    // items: CeCalendarTableProps[];
};

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

const CeCalendarPageNation = ({ itemsPerPage }: CeCalendarPageNationProps) => {
    const [currentItems, setCurrentItems] = useState<any>(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };

    return (
        <CeCalendarPageNationMainDivBox>
            <CeCalendarPageNationItems currentItems={currentItems} />
            <ReactPaginate
                nextLabel="다음"
                onPageChange={e => handlePageClick(e)}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="이전"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
        </CeCalendarPageNationMainDivBox>
    );
};

export default CeCalendarPageNation;

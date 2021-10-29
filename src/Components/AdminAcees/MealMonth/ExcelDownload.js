import React, { useEffect, useState } from 'react';
import { CSVLink, CSVDownload } from 'react-csv';

const ExcelDownload = ({ data }) => {
    const headers = [
        { label: '소속', key: 'department' },
        { label: '성명', key: 'name' },
        { label: '일자', key: 'dates' },
        { label: '구분', key: 'division' },
        { label: '지역', key: 'location' },
        { label: '장소', key: 'place' },
        { label: '식비', key: 'spending' },
        { label: '지급비', key: 'calculate' },
    ];

    return (
        <div style={{ width: '90%', textAlign: 'end', paddingTop: '10px' }}>
            {data ? (
                <button>
                    <CSVLink headers={headers} data={data} filename="식대정산.csv" target="_blank">
                        엑셀 다운로드
                    </CSVLink>
                </button>
            ) : (
                ''
            )}
        </div>
    );
};

export default ExcelDownload;

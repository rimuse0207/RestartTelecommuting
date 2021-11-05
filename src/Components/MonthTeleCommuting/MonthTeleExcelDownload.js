import React, { useEffect, useState } from 'react';
import { CSVLink, CSVDownload } from 'react-csv';

const MonthTeleExcelDownload = ({ data, selectedYear, selectedMonth, SelectTeam }) => {
    const headers = [
        { label: '날짜', key: 'day' },
        { label: '성명', key: 'name' },
        { label: '팀명', key: 'team' },
        { label: '시작시간', key: 'stat_t' },
        { label: '종료시간', key: 'end_t' },

        { label: '팀장확인', key: 'approve' },
    ];
    const headers2 = [
        { label: '날짜', key: 'day' },
        { label: '성명', key: 'name' },
        { label: '팀명', key: 'team' },
        { label: '시작시간', key: 'stat_t' },
        { label: '종료시간', key: 'end_t' },
        { label: '업무일지', key: 'work' },
        { label: '팀장확인', key: 'approve' },
    ];

    return (
        <div>
            {data ? (
                <>
                    <button style={{ background: 'gray' }}>
                        <CSVLink
                            headers={headers}
                            data={data}
                            filename={`${selectedYear}년 ${selectedMonth}월 ${SelectTeam}팀 재택근무.csv`}
                            target="_blank"
                        >
                            엑셀 다운로드
                        </CSVLink>
                    </button>
                    <button style={{ background: 'gray', marginLeft: '30px' }}>
                        <CSVLink
                            headers={headers2}
                            data={data}
                            filename={`${selectedYear}년 ${selectedMonth}월 ${SelectTeam}팀 재택근무.csv`}
                            target="_blank"
                        >
                            엑셀 다운로드(업무일지 포함)
                        </CSVLink>
                    </button>
                </>
            ) : (
                ''
            )}
        </div>
    );
};

export default MonthTeleExcelDownload;

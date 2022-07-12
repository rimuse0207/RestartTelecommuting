import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const TeamLeaderMonthOtPrinterMainDivBox = styled.div`
    padding: 10px;
    table {
        width: 100%;
        border: 1px solid #444444;
        font-size: 0.1em;
        table-layout: auto;
        text-align: center;
        border-collapse: collapse;
        .Reason_Main_td {
            width: 50%;
            height: 40px;
            text-align: start;
        }
        .MonthOT_TableDivBoxs,
        .MonthOT_TableDivBoxs_division {
            display: contents;
        }
    }

    th {
        font-size: 1em;
    }

    th,
    td {
        border: 1px solid #444444;
        padding: 3px !important;
    }
    td {
        font-size: 0.1em !important;
    }
    .Telecommuting_Table_dayNumber:first-child {
        text-align: start;
    }

    @page {
        size: A4;
        background: none;
    }
    @media print {
        body {
            width: 420mm;
            /* height: 297mm; */
            height: 297mm;
            margin: 10px; /* margin: auto auto; 로 자동 여백 설정도 가능 */
        }
        h3 {
            font-size: 20px !important;
        }
        table {
            page-break-after: auto;
        }
        div {
            page-break-inside: avoid;
        }
        tr {
            page-break-inside: avoid;
            page-break-after: auto;
        }
        td {
            page-break-inside: avoid;
            page-break-after: auto;
        }
        thead {
            display: table-header-group;
        }
        tfoot {
            display: table-footer-group;
        }
        .MonthOT_TableDivBoxs_division {
            page-break-after: always !important;
            page-break-before: always !important;
        }
        .CanlenderPagePrinter {
            page-break-after: always;
            page-break-before: always;
        }
    }
    .CanlenderPagePrinter {
        page-break-after: always;
        page-break-before: always;
    }
`;
type paramasTypes = {
    year: string;
    month: string;
    team: string;
};
type businiessTypes = {
    name: string;
    id: string;
    datas: any | null;
};
const TeamLeaderMonthOtPrinter = () => {
    const { year, month, team } = useParams<paramasTypes>();
    const [showdatas, setShowdatas] = useState([{ name: '', sumTimes: 0, nightTimes: 0, holidaySum_time: 0, business_legnth: 0 }]);
    const [BusinessDatas, setBusinessDatas] = useState<businiessTypes[]>([]);
    const [Loading, setLoading] = useState(false);

    useEffect(() => {
        getDataSelectTeam();
    }, []);
    useEffect(() => {
        if (Loading) {
            setTimeout(() => {
                window.print();
            }, 1000);
            window.onafterprint = function () {
                window.close();
            };
        }
    }, [Loading]);
    const getDataSelectTeam = async () => {
        try {
            const getDataShowTeam = await axios.post(`${process.env.REACT_APP_DB_HOST}/TeamSelectOT_app_server/getTeamShow`, {
                selectYear: year,
                selectMonth: month,
                selectTeam: team,
            });

            if (getDataShowTeam.data.dataSucess) {
                if (getDataShowTeam.data.datas.length > 0) {
                    let datapush: any = [];
                    for (var i = 0; i < getDataShowTeam.data.datas.length; i++) {
                        var sumTime = 0;
                        var nightTime = 0;
                        var holidaySum_time = 0;
                        for (var j = 0; j < getDataShowTeam.data.datas[i].rows2.length; j++) {
                            sumTime = sumTime + getDataShowTeam.data.datas[i].rows2[j].mon_time;
                            nightTime = nightTime + getDataShowTeam.data.datas[i].rows2[j].night_date;
                        }
                        for (var k = 0; k < getDataShowTeam.data.datas[i].rows3.length; k++) {
                            holidaySum_time = holidaySum_time + getDataShowTeam.data.datas[i].rows3[k].mon_time;
                        }
                        datapush = datapush.concat({
                            name: getDataShowTeam.data.datas[i].name,
                            sumTimes: sumTime,
                            nightTimes: nightTime,
                            holidaySum_time,
                            business_legnth: getDataShowTeam.data.datas[i].rows4 ? getDataShowTeam.data.datas[i].rows4.length : 0,
                        });
                    }

                    await setShowdatas(datapush);
                    setLoading(true);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <TeamLeaderMonthOtPrinterMainDivBox>
            <div>
                {Loading ? (
                    <div>
                        <table>
                            {/* <thead> */}
                            <tbody>
                                <tr>
                                    <th
                                        colSpan={
                                            team.toUpperCase() === 'LASER' ||
                                            team.toUpperCase() === 'GRINDER' ||
                                            team.toUpperCase() === 'DICER' ||
                                            team.toUpperCase() === '영업기술'
                                                ? 5
                                                : 4
                                        }
                                        rowSpan={2}
                                    >
                                        <h3 style={{ fontSize: '2em' }}>
                                            {team.toUpperCase()}
                                            <br />
                                            연장(휴일) 근무 실시보고서
                                        </h3>
                                    </th>
                                    <th style={{ background: '#c9cc51', width: '100px' }}>작성자</th>
                                    <th style={{ background: '#c9cc51', width: '100px' }}>검토</th>
                                    <th style={{ background: '#c9cc51', width: '100px' }}>승인</th>
                                </tr>
                                <tr>
                                    <td style={{ height: '50px', background: 'white' }}></td>
                                    <td style={{ height: '50px', background: 'white' }}></td>
                                    <td style={{ height: '50px', background: 'white' }}></td>
                                </tr>
                                {/* </thead> */}

                                <tr>
                                    <td
                                        colSpan={
                                            team.toUpperCase() === 'LASER' ||
                                            team.toUpperCase() === 'GRINDER' ||
                                            team.toUpperCase() === 'DICER' ||
                                            team.toUpperCase() === '영업기술'
                                                ? 2
                                                : 1
                                        }
                                        style={{ fontWeight: 'bolder', height: '25px' }}
                                    >
                                        근무년월
                                    </td>
                                    <td colSpan={2} style={{ fontWeight: 'bolder' }}>{`${year}년 ${month}월`}</td>
                                    {/* {team.toUpperCase() === 'LASER' ||
                                    team.toUpperCase() === 'GRINDER' ||
                                    team.toUpperCase() === 'DICER' ||
                                    team.toUpperCase() === '영업기술' ? (
                                        <td></td>
                                    ) : (
                                        <></>
                                    )} */}
                                    <td colSpan={4}>OT 시간</td>
                                </tr>
                                <tr>
                                    <td>순서</td>
                                    <td>성명</td>
                                    <td>부서명</td>
                                    {team.toUpperCase() === 'LASER' ||
                                    team.toUpperCase() === 'GRINDER' ||
                                    team.toUpperCase() === 'DICER' ||
                                    team.toUpperCase() === '영업기술' ? (
                                        <td>현장 일수</td>
                                    ) : (
                                        <></>
                                    )}

                                    <td colSpan={2}>연장</td>
                                    <td>휴일</td>
                                    <td>합계</td>
                                </tr>

                                {showdatas.map(
                                    (
                                        list: {
                                            name: string;
                                            sumTimes: number;
                                            nightTimes: number;
                                            holidaySum_time: number;
                                            business_legnth: number;
                                        },
                                        i: number
                                    ) => {
                                        return (
                                            <div className={(i + 1) % 20 === 0 ? 'MonthOT_TableDivBoxs_division' : 'MonthOT_TableDivBoxs'}>
                                                <tr>
                                                    <td rowSpan={2}>{i + 1}</td>
                                                    <td rowSpan={2}>{list.name}</td>
                                                    <td rowSpan={2}>{team.toUpperCase()}팀</td>
                                                    {team.toUpperCase() === 'LASER' ||
                                                    team.toUpperCase() === 'GRINDER' ||
                                                    team.toUpperCase() === 'DICER' ||
                                                    team.toUpperCase() === '영업기술' ? (
                                                        <td rowSpan={2}>
                                                            {list.business_legnth === 0 ? '' : `${list.business_legnth} 일`}
                                                        </td>
                                                    ) : (
                                                        <></>
                                                    )}
                                                    <td rowSpan={2}>
                                                        {list.sumTimes - list.holidaySum_time > 0
                                                            ? list.sumTimes - list.holidaySum_time + ' 시간'
                                                            : ''}
                                                    </td>
                                                    <td style={{ background: '#c9cc51' }}>심야</td>
                                                    <td rowSpan={2}>{list.holidaySum_time > 0 ? list.holidaySum_time + ' 시간' : ''}</td>
                                                    <td rowSpan={2}>{list.sumTimes > 0 ? list.sumTimes + ' 시간' : ''}</td>
                                                </tr>
                                                <tr>
                                                    {list.nightTimes > 0 ? (
                                                        <td>{list.nightTimes > 0 ? list.nightTimes + ' 시간' : ''}</td>
                                                    ) : (
                                                        <></>
                                                    )}

                                                    {list.nightTimes === 0 ? (
                                                        <td style={{ color: 'none', opacity: 0 }}>{list.nightTimes === 0 ? '.' : ''}</td>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </tr>
                                            </div>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>Loading....</div>
                )}
            </div>
        </TeamLeaderMonthOtPrinterMainDivBox>
    );
};

export default TeamLeaderMonthOtPrinter;

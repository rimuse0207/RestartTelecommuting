import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const TeamLeaderMonthOtPrinterMainDivBox = styled.div`
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
    }

    th {
        font-size: 0.8em;
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
            margin: 0px; /* margin: auto auto; 로 자동 여백 설정도 가능 */
        }
        table {
            padding: 0px;
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
        // getBusinessData();
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

            // console.log(getDataShowTeam);

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

    // const getBusinessData = async () => {
    //     try {
    //         const getBusinessDatas = await axios.get(`${process.env.REACT_APP_DB_HOST}/TeamSelectOT_app_server/businessGroupData`, {
    //             params: {
    //                 team,
    //                 year,
    //                 month,
    //             },
    //         });
    //         if (getBusinessDatas.data.dataSuccess) {
    //             console.log(getBusinessDatas);
    //             setBusinessDatas(getBusinessDatas.data.datas);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const calendarArr = (datas: businiessTypes) => {
    //     const today = moment(`${year}-${month}-01`);
    //     const firstWeek = today.clone().startOf('month').week();
    //     const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();
    //     let result: Array<any> = [];
    //     let week: number = firstWeek;
    //     for (week; week <= lastWeek; week++) {
    //         result = result.concat(
    //             <tr key={week}>
    //                 {Array(7)
    //                     .fill(0)
    //                     // eslint-disable-next-line no-loop-func
    //                     .map((data, index) => {
    //                         let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day');

    //                         if (days.format('MM') !== today.format('MM')) {
    //                             return (
    //                                 <td key={index} className="Telecommuting_Table_nextMonth">
    //                                     <div className="Telecommuting_Table_dayNumber">
    //                                         {/* <div style={{ paddingLeft: '5px' }}>{days.format('D')}</div> */}
    //                                     </div>
    //                                 </td>
    //                             );
    //                         } else {
    //                             return (
    //                                 <td
    //                                     key={index}
    //                                     className={
    //                                         moment().format('YYYY-MM-DD') === days.format('YYYY-MM-DD')
    //                                             ? 'Telecommuting_table_today'
    //                                             : 'Telecommuting_Table_nowMonth'
    //                                     }
    //                                 >
    //                                     <div className="Telecommuting_Table_dayNumber">
    //                                         <div style={{ paddingLeft: '5px' }}>{days.format('D')}</div>
    //                                         <div className="Text">
    //                                             {datas.datas.map((list: any) => {
    //                                                 return days.format('YYYY-MM-DD') === list.apply_date ? (
    //                                                     list.type === '없음' ? (
    //                                                         ''
    //                                                     ) : list.type === '출장' ? (
    //                                                         <div>
    //                                                             <div>출장</div>
    //                                                             <div style={{ fontSize: '80px', textAlign: 'center' }}>○</div>
    //                                                         </div>
    //                                                     ) : (
    //                                                         <div>
    //                                                             <div>현장</div>
    //                                                             <div style={{ fontSize: '80px', textAlign: 'center' }}>△</div>
    //                                                         </div>
    //                                                     )
    //                                                 ) : (
    //                                                     <div></div>
    //                                                 );
    //                                             })}
    //                                         </div>
    //                                     </div>
    //                                 </td>
    //                             );
    //                         }
    //                     })}
    //             </tr>
    //         );
    //     }
    //     return result;
    // };

    return (
        <TeamLeaderMonthOtPrinterMainDivBox>
            <div>
                {Loading ? (
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th
                                        colSpan={
                                            team.toUpperCase() === 'LASER' ||
                                            team.toUpperCase() === 'GRINDER' ||
                                            team.toUpperCase() === 'DICER'
                                                ? 5
                                                : 4
                                        }
                                        rowSpan={2}
                                    >
                                        <h3>
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
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ fontWeight: 'bolder' }}>근무년월</td>
                                    <td colSpan={2} style={{ fontWeight: 'bolder' }}>{`${year}년 ${month}월`}</td>
                                    {team.toUpperCase() === 'LASER' ||
                                    team.toUpperCase() === 'GRINDER' ||
                                    team.toUpperCase() === 'DICER' ? (
                                        <td></td>
                                    ) : (
                                        <></>
                                    )}
                                    <td colSpan={4}>OT 시간</td>
                                </tr>
                                <tr>
                                    <td>순서</td>
                                    <td>성명</td>
                                    <td>부서명</td>
                                    {team.toUpperCase() === 'LASER' ||
                                    team.toUpperCase() === 'GRINDER' ||
                                    team.toUpperCase() === 'DICER' ? (
                                        <td>현장 일수</td>
                                    ) : (
                                        <></>
                                    )}
                                    <td>합계</td>
                                    <td colSpan={2}>연장</td>
                                    <td>휴일</td>
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
                                            <>
                                                <tr>
                                                    <td rowSpan={2}>{i + 1}</td>
                                                    <td rowSpan={2}>{list.name}</td>
                                                    <td rowSpan={2}>{team.toUpperCase()}팀</td>
                                                    {team.toUpperCase() === 'LASER' ||
                                                    team.toUpperCase() === 'GRINDER' ||
                                                    team.toUpperCase() === 'DICER' ? (
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
                                            </>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                        {/* {BusinessDatas.map((list, i) => {
                            return list.datas.length !== 0 ? (
                                <div className="CanlenderPagePrinter">
                                    <div>
                                        <h2>
                                            {year}년 {month}월 {team.toUpperCase()}
                                            {'                                         '} {list.name}
                                        </h2>
                                        <table className="Telecommuting_Table">
                                            <thead>
                                                <tr>
                                                    <th>일</th>
                                                    <th>월</th>
                                                    <th>화</th>
                                                    <th>수</th>
                                                    <th>목</th>
                                                    <th>금</th>
                                                    <th>토</th>
                                                </tr>
                                            </thead>
                                            <tbody>{calendarArr(list)}</tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : (
                                <div></div>
                            );
                        })} */}
                    </div>
                ) : (
                    <div>Loading....</div>
                )}
            </div>
        </TeamLeaderMonthOtPrinterMainDivBox>
    );
};

export default TeamLeaderMonthOtPrinter;

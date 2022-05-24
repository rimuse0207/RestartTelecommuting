import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const OtPrinterMainPageMainDivBox = styled.div`
    padding: 20px;
    table {
        width: 100%;
        border: 1px solid #444444;
        font-size: 0.5em;
        table-layout: auto;
        text-align: center;
        border-collapse: collapse;
        .Reason_Main_td {
            width: 50%;
            height: 100px;
            text-align: start;
        }
    }

    th {
        font-size: 0.8em;
    }

    th,
    td {
        border: 1px solid #444444;
    }
    @page {
        size: A4;
        background: none;
    }
    @media print {
        body {
            width: 420mm;
            height: 297mm;
            margin: auto; /* margin: auto auto; 로 자동 여백 설정도 가능 */
            padding: 10px;
        }
        table {
            padding: 0px;
            page-break-after: avoid;
            page-break-before: avoid;
            font-size: 12px !important;
        }
    }
`;

type paramasTypes = {
    type: string;
    date: string;
    id: string;
};

const OtPrinterMainPage = () => {
    const { type, date, id } = useParams<paramasTypes>();
    const [clicksData, setClicksData] = useState<any>({});
    const [Loading, setLoading] = useState(false);
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

    useEffect(() => {
        getOtData();
    }, []);

    const getOtData = async () => {
        const startDate = moment(date);
        try {
            const getServerOTDataCheck = await axios.post(
                `${process.env.REACT_APP_API_URL}/OT_app_server/${type === 'after' ? 'OT_get_some_data' : 'NewBeforeOT_get_some_data'}`,
                {
                    id,
                    startDate,
                }
            );

            if (getServerOTDataCheck.data.dataComeIn) {
                const {
                    end_time_mon,
                    end_time_tue,
                    end_time_wed,
                    end_time_thu,
                    end_time_fri,
                    end_time_sat,
                    end_time_sun,
                    start_time_mon,
                    start_time_tue,
                    start_time_wed,
                    start_time_thu,
                    start_time_fri,
                    start_time_sat,
                    start_time_sun,
                    mon_rest,
                    tue_rest,
                    wed_rest,
                    thu_rest,
                    fri_rest,
                    sat_rest,
                    sun_rest,
                    mon_time,
                    tue_time,
                    wed_time,
                    thu_time,
                    fri_time,
                    sat_time,
                    sun_time,
                    mon_night,
                    tue_night,
                    wed_night,
                    thu_night,
                    fri_night,
                    sat_night,
                    sun_night,
                    mon_reason,
                    mon_reason1,
                    mon_reason2,
                    tue_reason,
                    tue_reason1,
                    tue_reason2,
                    wed_reason,
                    wed_reason1,
                    wed_reason2,
                    thu_reason,
                    thu_reason1,
                    thu_reason2,
                    fri_reason,
                    fri_reason1,
                    fri_reason2,
                    sat_reason,
                    sat_reason1,
                    sat_reason2,
                    sun_reason,
                    sun_reason1,
                    sun_reason2,
                    sum_time,
                    number,
                    leadercheck,
                    name,
                    position,
                    team,
                } = getServerOTDataCheck.data.data[0];
                const data = {
                    date_mon: startDate.clone().format('YYYY-MM-DD'),
                    date_tue: startDate.clone().add(1, 'day').format('YYYY-MM-DD'),
                    date_wed: startDate.clone().add(2, 'day').format('YYYY-MM-DD'),
                    date_thu: startDate.clone().add(3, 'day').format('YYYY-MM-DD'),
                    date_fri: startDate.clone().add(4, 'day').format('YYYY-MM-DD'),
                    date_sat: startDate.clone().add(5, 'day').format('YYYY-MM-DD'),
                    date_sun: startDate.clone().add(6, 'day').format('YYYY-MM-DD'),

                    end_time_mon,
                    end_time_tue,
                    end_time_wed,
                    end_time_thu,
                    end_time_fri,
                    end_time_sat,
                    end_time_sun,

                    start_time_mon,
                    start_time_tue,
                    start_time_wed,
                    start_time_thu,
                    start_time_fri,
                    start_time_sat,
                    start_time_sun,

                    mon_rest,
                    tue_rest,
                    wed_rest,
                    thu_rest,
                    fri_rest,
                    sat_rest,
                    sun_rest,

                    mon_time,
                    tue_time,
                    wed_time,
                    thu_time,
                    fri_time,
                    sat_time,
                    sun_time,

                    mon_night,
                    tue_night,
                    wed_night,
                    thu_night,
                    fri_night,
                    sat_night,
                    sun_night,

                    mon_reason,
                    mon_reason1,
                    mon_reason2,
                    tue_reason,
                    tue_reason1,
                    tue_reason2,
                    wed_reason,
                    wed_reason1,
                    wed_reason2,
                    thu_reason,
                    thu_reason1,
                    thu_reason2,
                    fri_reason,
                    fri_reason1,
                    fri_reason2,
                    sat_reason,
                    sat_reason1,
                    sat_reason2,
                    sun_reason,
                    sun_reason1,
                    sun_reason2,
                    sum_time,
                    number,
                    leadercheck,
                    name,
                    position,
                    team,
                };
                await setClicksData(data);
                await setLoading(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <OtPrinterMainPageMainDivBox>
            {Loading ? (
                <div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan={7}>연장(휴일)근무 신청서 ({type === 'after' ? '사후' : '사전'})</th>
                                    <th rowSpan={2}>
                                        팀장
                                        <br />
                                        서명
                                    </th>
                                    <th rowSpan={2} style={{ width: '100px' }}></th>
                                </tr>
                                <tr>
                                    <th colSpan={3}>부서</th>
                                    <th colSpan={2}>{clicksData.team.toUpperCase()}</th>
                                    <th>성명</th>
                                    <th>{clicksData.name} (인)</th>
                                </tr>
                            </thead>
                            <tbody className="PrinterTables">
                                <tr>
                                    <td colSpan={2} rowSpan={2}>
                                        일자
                                        <br />
                                    </td>
                                    <td colSpan={2}>연장근무</td>
                                    <td rowSpan={2}>
                                        저녁
                                        <br />
                                        휴게
                                        <br />
                                        시간
                                    </td>
                                    <td rowSpan={2}>
                                        연장
                                        <br />
                                        근무
                                        <br />
                                        시간
                                    </td>
                                    <td colSpan={3} rowSpan={2}>
                                        사유
                                        <br />
                                    </td>
                                </tr>
                                <tr>
                                    <td>시작</td>
                                    <td>종료</td>
                                </tr>
                                <tr>
                                    <td>{clicksData.date_mon}</td>
                                    <td>월요일</td>
                                    <td>{clicksData.start_time_mon}</td>
                                    <td>{clicksData.end_time_mon}</td>
                                    <td>{clicksData.mon_rest}</td>
                                    <td>{clicksData.mon_time}</td>
                                    <td colSpan={3} className="Reason_Main_td">
                                        <pre>{clicksData.mon_reason}</pre>
                                        <pre>{clicksData.mon_reason1}</pre>
                                        <pre>{clicksData.mon_reason2}</pre>
                                    </td>
                                </tr>

                                <tr>
                                    <td>{clicksData.date_tue}</td>
                                    <td>화요일</td>
                                    <td>{clicksData.start_time_tue}</td>
                                    <td>{clicksData.end_time_tue}</td>
                                    <td>{clicksData.tue_rest}</td>
                                    <td>{clicksData.tue_time}</td>
                                    <td colSpan={3} className="Reason_Main_td">
                                        <pre>{clicksData.tue_reason}</pre>
                                        <pre>{clicksData.tue_reason1}</pre>
                                        <pre>{clicksData.tue_reason2}</pre>
                                    </td>
                                </tr>

                                <tr>
                                    <td>{clicksData.date_wed}</td>
                                    <td>수요일</td>
                                    <td>{clicksData.start_time_wed}</td>
                                    <td>{clicksData.end_time_wed}</td>
                                    <td>{clicksData.wed_rest}</td>
                                    <td>{clicksData.wed_time}</td>
                                    <td colSpan={3} className="Reason_Main_td">
                                        <pre>{clicksData.wed_reason}</pre>
                                        <pre>{clicksData.wed_reason1}</pre>
                                        <pre>{clicksData.wed_reason2}</pre>
                                    </td>
                                </tr>

                                <tr>
                                    <td>{clicksData.date_thu}</td>
                                    <td>목요일</td>
                                    <td>{clicksData.start_time_thu}</td>
                                    <td>{clicksData.end_time_thu}</td>
                                    <td>{clicksData.thu_rest}</td>
                                    <td>{clicksData.thu_time}</td>
                                    <td colSpan={3} className="Reason_Main_td">
                                        <pre>{clicksData.thu_reason}</pre>
                                        <pre>{clicksData.thu_reason1}</pre>
                                        <pre>{clicksData.thu_reason2}</pre>
                                    </td>
                                </tr>

                                <tr>
                                    <td>{clicksData.date_fri}</td>
                                    <td>금요일</td>
                                    <td>{clicksData.start_time_fri}</td>
                                    <td>{clicksData.end_time_fri}</td>
                                    <td>{clicksData.fri_rest}</td>
                                    <td>{clicksData.fri_time}</td>
                                    <td colSpan={3} className="Reason_Main_td">
                                        <pre>{clicksData.fri_reason}</pre>
                                        <pre>{clicksData.fri_reason1}</pre>
                                        <pre>{clicksData.fri_reason2}</pre>
                                    </td>
                                </tr>

                                <tr>
                                    <td>{clicksData.date_sat}</td>
                                    <td>토요일</td>
                                    <td>{clicksData.start_time_sat}</td>
                                    <td>{clicksData.end_time_sat}</td>
                                    <td>{clicksData.sat_rest}</td>
                                    <td>{clicksData.sat_time}</td>
                                    <td colSpan={3} className="Reason_Main_td">
                                        <pre>{clicksData.sat_reason}</pre>
                                        <pre>{clicksData.sat_reason1}</pre>
                                        <pre>{clicksData.sat_reason2}</pre>
                                    </td>
                                </tr>

                                <tr>
                                    <td>{clicksData.date_sun}</td>
                                    <td>일요일</td>
                                    <td>{clicksData.start_time_sun}</td>
                                    <td>{clicksData.end_time_sun}</td>
                                    <td>{clicksData.sun_rest}</td>
                                    <td>{clicksData.sun_time}</td>
                                    <td colSpan={3} className="Reason_Main_td">
                                        <pre>{clicksData.sun_reason}</pre>
                                        <pre>{clicksData.sun_reason1}</pre>
                                        <pre>{clicksData.sun_reason2}</pre>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </OtPrinterMainPageMainDivBox>
    );
};

export default OtPrinterMainPage;

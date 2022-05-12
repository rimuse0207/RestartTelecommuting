import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const OtPrinterMainPageMainDivBox = styled.div`
    table {
        width: 100%;
        border: 1px solid #444444;
        font-size: 0.5em;
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
        }
        table {
            padding: 0px;
            page-break-after: avoid;
            page-break-before: avoid;
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
            console.log(getServerOTDataCheck);
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
                                    <td rowSpan={3}>{clicksData.date_mon}</td>
                                    <td rowSpan={3}>월요일</td>
                                    <td rowSpan={3}>{clicksData.start_time_mon}</td>
                                    <td rowSpan={3}>{clicksData.end_time_mon}</td>
                                    <td rowSpan={3}>{clicksData.mon_rest}</td>
                                    <td rowSpan={3}>{clicksData.mon_time}</td>
                                    <td colSpan={3} className="Reason_Main_td">
                                        {clicksData.mon_reason}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="Reason_Main_td">
                                        {clicksData.mon_reason1}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="Reason_Main_td">
                                        {clicksData.mon_reason2}
                                    </td>
                                </tr>

                                <tr>
                                    <td rowSpan={3}>{clicksData.date_tue}</td>
                                    <td rowSpan={3}>화요일</td>
                                    <td rowSpan={3}>{clicksData.start_time_tue}</td>
                                    <td rowSpan={3}>{clicksData.end_time_tue}</td>
                                    <td rowSpan={3}>{clicksData.tue_rest}</td>
                                    <td rowSpan={3}>{clicksData.tue_time}</td>
                                    <td colSpan={3} className="Reason_Main_td">
                                        {clicksData.tue_reason}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="Reason_Main_td">
                                        {clicksData.tue_reason1}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="Reason_Main_td">
                                        {clicksData.tue_reason2}
                                    </td>
                                </tr>

                                <tr>
                                    <td rowSpan={3}>{clicksData.date_wed}</td>
                                    <td rowSpan={3}>수요일</td>
                                    <td rowSpan={3}>{clicksData.start_time_wed}</td>
                                    <td rowSpan={3}>{clicksData.end_time_wed}</td>
                                    <td rowSpan={3}>{clicksData.wed_rest}</td>
                                    <td rowSpan={3}>{clicksData.wed_time}</td>
                                    <td colSpan={3} className="Reason_Main_td">
                                        {clicksData.wed_reason}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="Reason_Main_td">
                                        {clicksData.wed_reason1}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="Reason_Main_td">
                                        {clicksData.wed_reason2}
                                    </td>
                                </tr>

                                <tr>
                                    <td rowSpan={3}>{clicksData.date_thu}</td>
                                    <td rowSpan={3}>목요일</td>
                                    <td rowSpan={3}>{clicksData.start_time_thu}</td>
                                    <td rowSpan={3}>{clicksData.end_time_thu}</td>
                                    <td rowSpan={3}>{clicksData.thu_rest}</td>
                                    <td rowSpan={3}>{clicksData.thu_time}</td>
                                    <td colSpan={3} className="Reason_Main_td">
                                        {clicksData.thu_reason}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="Reason_Main_td">
                                        {clicksData.thu_reason1}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="Reason_Main_td">
                                        {clicksData.thu_reason2}
                                    </td>
                                </tr>

                                <tr>
                                    <td rowSpan={3}>{clicksData.date_fri}</td>
                                    <td rowSpan={3}>금요일</td>
                                    <td rowSpan={3}>{clicksData.start_time_fri}</td>
                                    <td rowSpan={3}>{clicksData.end_time_fri}</td>
                                    <td rowSpan={3}>{clicksData.fri_rest}</td>
                                    <td rowSpan={3}>{clicksData.fri_time}</td>
                                    <td colSpan={3} className="Reason_Main_td">
                                        {clicksData.fri_reason}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="Reason_Main_td">
                                        {clicksData.fri_reason1}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="Reason_Main_td">
                                        {clicksData.fri_reason2}
                                    </td>
                                </tr>

                                <tr>
                                    <td rowSpan={3}>{clicksData.date_sat}</td>
                                    <td rowSpan={3}>토요일</td>
                                    <td rowSpan={3}>{clicksData.start_time_sat}</td>
                                    <td rowSpan={3}>{clicksData.end_time_sat}</td>
                                    <td rowSpan={3}>{clicksData.sat_rest}</td>
                                    <td rowSpan={3}>{clicksData.sat_time}</td>
                                    <td colSpan={3} className="Reason_Main_td">
                                        {clicksData.sat_reason}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="Reason_Main_td">
                                        {clicksData.sat_reason1}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="Reason_Main_td">
                                        {clicksData.sat_reason2}
                                    </td>
                                </tr>

                                <tr>
                                    <td rowSpan={3}>{clicksData.date_sun}</td>
                                    <td rowSpan={3}>일요일</td>
                                    <td rowSpan={3}>{clicksData.start_time_sun}</td>
                                    <td rowSpan={3}>{clicksData.end_time_sun}</td>
                                    <td rowSpan={3}>{clicksData.sun_rest}</td>
                                    <td rowSpan={3}>{clicksData.sun_time}</td>
                                    <td colSpan={3} className="Reason_Main_td">
                                        {clicksData.sun_reason}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="Reason_Main_td">
                                        {clicksData.sun_reason1}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="Reason_Main_td">
                                        {clicksData.sun_reason2}
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

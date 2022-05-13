import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';

const ErpShowTableMainDivBox = styled.div`
    table {
        width: 50%;
        border: 1px solid #444444;
        border-collapse: collapse;
        margin-top: 20px;
        margin-left: 20px;
        margin-bottom: 20px;
    }
    th,
    td {
        border: 1px solid #444444;
        background-color: none !important;
        font-size: 1em;
    }
    thead {
    }
`;

type businiessTypes = {
    name: string;
    id: string;
    datas: any | null;
};
type ErpDatasTypes = {
    indexs: number;
    paper_code: string;
    name: string;
    business_location: string;
    business_purpose: string;
    business_trip_period: string;
    business_tip_length: number;
    upload_date: string;
};
const BusinessTripShowContent = () => {
    let team = '경영지원';
    let year = '2022';
    let month = '05';
    const [BusinessDatas, setBusinessDatas] = useState<businiessTypes[]>([]);
    const [ErpDatas, setErpDatas] = useState<ErpDatasTypes[]>([]);
    useEffect(() => {
        getBusinessData();
    }, []);

    const getBusinessData = async () => {
        try {
            const getBusinessDatas = await axios.get(`${process.env.REACT_APP_DB_HOST}/TeamSelectOT_app_server/businessGroupData`, {
                params: {
                    team,
                    year,
                    month,
                },
            });
            if (getBusinessDatas.data.dataSuccess) {
                console.log(getBusinessDatas);
                setBusinessDatas(getBusinessDatas.data.datas);
                setErpDatas(getBusinessDatas.data.ERP_data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const calendarArr = (datas: businiessTypes) => {
        const today = moment(`${year}-${month}-01`);
        const firstWeek = today.clone().startOf('month').week();
        const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();
        let result: Array<any> = [];
        let week: number = firstWeek;
        for (week; week <= lastWeek; week++) {
            result = result.concat(
                <tr key={week}>
                    {Array(7)
                        .fill(0)
                        // eslint-disable-next-line no-loop-func
                        .map((data, index) => {
                            let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day');

                            if (days.format('MM') !== today.format('MM')) {
                                return (
                                    <td key={index} className="Telecommuting_Table_nextMonth">
                                        <div className="Telecommuting_Table_dayNumber">
                                            {/* <div style={{ paddingLeft: '5px' }}>{days.format('D')}</div> */}
                                        </div>
                                    </td>
                                );
                            } else {
                                return (
                                    <td
                                        key={index}
                                        className={
                                            moment().format('YYYY-MM-DD') === days.format('YYYY-MM-DD')
                                                ? 'Telecommuting_table_today'
                                                : 'Telecommuting_Table_nowMonth'
                                        }
                                    >
                                        <div className="Telecommuting_Table_dayNumber">
                                            <div style={{ paddingLeft: '5px' }}>{days.format('D')}</div>
                                            <div className="Text">
                                                {ErpDatas.map((list: any) => {
                                                    const FirstDate = moment(list.business_trip_period.split('∼')[0]).subtract(1, 'days');
                                                    const SecondDate = moment(list.business_trip_period.split('∼')[1]).add(1, 'days');
                                                    return moment(days.format('YYYYMMDD')).isBetween(`${FirstDate}`, `${SecondDate}`) ? (
                                                        <div>ERP 출장 O</div>
                                                    ) : (
                                                        <div></div>
                                                    );
                                                })}
                                                {datas.datas.map((list: any) => {
                                                    return days.format('YYYY-MM-DD') === list.apply_date ? (
                                                        list.type === '없음' ? (
                                                            ''
                                                        ) : list.type === '출장' ? (
                                                            <div></div>
                                                        ) : (
                                                            <div>
                                                                <div>OT 신청한 현장 △</div>
                                                                <div></div>
                                                            </div>
                                                        )
                                                    ) : (
                                                        <div></div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </td>
                                );
                            }
                        })}
                </tr>
            );
        }
        return result;
    };
    return (
        <div>
            {BusinessDatas.map((list, i) => {
                return list.datas.length !== 0 ? (
                    <div className="CanlenderPagePrinter">
                        <div>
                            <h2>
                                {year}년 {month}월 {team.toUpperCase()}
                                {list.name}
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
            })}
            <ErpShowTableMainDivBox>
                <table>
                    <thead>
                        <tr>
                            <th>성명</th>
                            <th>출장지</th>
                            <th>출장 기간</th>
                            <th>출장 일수(일당/40000)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ErpDatas.map((list, i) => {
                            return (
                                <tr>
                                    <td>{list.name}</td>
                                    <td>{list.business_location}</td>
                                    <td>{list.business_trip_period}</td>
                                    <td>{list.business_tip_length}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </ErpShowTableMainDivBox>
        </div>
    );
};

export default BusinessTripShowContent;

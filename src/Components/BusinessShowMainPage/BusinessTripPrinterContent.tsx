import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../models';
import { DecryptKey } from '../../config';
import { useParams } from 'react-router-dom';
const BusinessTripShowContentMainDivBox = styled.div`
    .Telecommuting_Table {
        height: auto;
    }
    .Telecommuting_Table > tbody > tr > td {
        height: 70px !important;
    }
`;

const ErpShowTableMainDivBox = styled.div`
    table {
        width: 70%;
        border-collapse: collapse;
        margin-top: 20px;
        margin-left: 20px;
        margin-bottom: 20px;
    }
    th,
    td {
        border: none;
        border-bottom: 1px solid #444444;
        background-color: none !important;
        padding: 10px;
        font-size: 0.8em;
        text-align: center;
    }
    .Telecommuting_Table > tbody > tr > td {
        height: 70px !important;
    }
    thead {
        border: none;
        font-size: 1em !important;
        background-color: none !important;
    }
`;

type businiessTypes = {
    indexs: number;
    id: string;
    name: string;
    type: string;
    apply_date: string;
    teamleader_check: number;
    create_date: string;
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

type paramasTypes = {
    id: string;
    team: string;
    name: string;
    year: string;
    month: string;
};
const BusinessTripPrinterContent = () => {
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const { id, team, name, year, month } = useParams<paramasTypes>();

    const [BusinessDatas, setBusinessDatas] = useState<businiessTypes[]>([]);
    const [ErpDatas, setErpDatas] = useState<ErpDatasTypes[]>([]);
    useEffect(() => {
        if (InfomationState) getBusinessData();
    }, [InfomationState]);

    const getBusinessData = async () => {
        try {
            const getBusinessDatas = await axios.get(`${process.env.REACT_APP_DB_HOST}/TeamSelectOT_app_server/businessGroupData`, {
                params: {
                    team,
                    name,
                    id,
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

    const calendarArr = () => {
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
                                                ? 'Telecommuting_Table_nowMonth'
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
                                                        <div style={{ marginBottom: '5px' }}>ERP 출장 O</div>
                                                    ) : (
                                                        <div></div>
                                                    );
                                                })}
                                                {BusinessDatas.map((list: any) => {
                                                    return days.format('YYYY-MM-DD') === list.apply_date ? (
                                                        list.type === '없음' ? (
                                                            ''
                                                        ) : list.type === '출장' ? (
                                                            <div></div>
                                                        ) : (
                                                            <div>
                                                                <div style={{}}>현장신청(OT) △</div>
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
        <BusinessTripShowContentMainDivBox>
            <div className="CanlenderPagePrinter">
                <div>
                    <h2>
                        {year}년 {month}월 {team.toUpperCase()}
                        {name}
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
                        <tbody>{calendarArr()}</tbody>
                    </table>
                </div>
            </div>
            );
            <ErpShowTableMainDivBox>
                <table>
                    <thead>
                        <tr>
                            <th>성명</th>
                            <th>출장지</th>
                            <th>출장 기간</th>
                            <th>
                                출장 일수
                                <br />
                                (일당/40000)
                            </th>
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
        </BusinessTripShowContentMainDivBox>
    );
};

export default BusinessTripPrinterContent;

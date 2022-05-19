import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../models';
import { DecryptKey } from '../../config';
import { PrinterButtonContainer } from '../OtMainPage/OTTeamLeaderCheckFinish/BeforeOtTeamLeaderFinish';
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
    h4 {
        margin-top: 20px;
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
const BusinessTripShowContent = () => {
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const [getMoment, setMoment] = useState(moment());

    const today = getMoment;
    const [BusinessDatas, setBusinessDatas] = useState<businiessTypes[]>([]);
    const [ErpDatas, setErpDatas] = useState<ErpDatasTypes[]>([]);
    useEffect(() => {
        if (InfomationState) getBusinessData();
    }, [InfomationState, getMoment]);

    const getBusinessData = async () => {
        try {
            const getBusinessDatas = await axios.get(`${process.env.REACT_APP_DB_HOST}/TeamSelectOT_app_server/businessGroupData`, {
                params: {
                    team: InfomationState.team,
                    name: DecryptKey(InfomationState.name),
                    id: DecryptKey(InfomationState.id),
                    year: moment(getMoment).format('YYYY'),
                    month: moment(getMoment).format('MM'),
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
        const today = moment(`${moment(getMoment).format('YYYY')}-${moment(getMoment).format('MM')}-01`);
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
                                                        <div
                                                            style={{
                                                                marginBottom: '5px',
                                                                backgroundColor: '#e8f4b0',
                                                            }}
                                                        >
                                                            출장 일당 (ERP)
                                                        </div>
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
                                                                <div style={{ backgroundColor: '#a1aee0' }}>현장 수당 (OT)</div>
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
                <div className="control">
                    <button
                        onClick={() => {
                            setMoment(getMoment.clone().subtract(1, 'month'));
                        }}
                    >
                        {'<<<'}
                    </button>
                    <span>{today.format('YYYY년 MM월')}</span>
                    <button
                        onClick={() => {
                            setMoment(getMoment.clone().add(1, 'month'));
                        }}
                    >
                        {'>>>'}
                    </button>
                </div>
                <div>
                    <h2>
                        {moment(getMoment).format('YYYY년 MM월')} {InfomationState.team.toUpperCase()}
                        {DecryptKey(InfomationState.name)}
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

            <ErpShowTableMainDivBox>
                <h4>ERP 출장 등록 현황</h4>
                <table>
                    <thead>
                        <tr>
                            <th>성명</th>
                            <th>출장지</th>
                            <th>출장 기간</th>
                            <th>출장 일수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ErpDatas.map((list, i) => {
                            return (
                                <tr>
                                    <td>{list.name}</td>
                                    <td>{list.business_location}</td>
                                    <td>{list.business_trip_period}</td>
                                    <td>{list.business_tip_length} 일</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </ErpShowTableMainDivBox>
            <PrinterButtonContainer>
                <div className="WeekAfterOTWorkSpace_store_button_div">
                    <button
                        onClick={() =>
                            window.open(
                                `/BusinessShowMonthPrinter/${DecryptKey(InfomationState.id)}/${DecryptKey(InfomationState.name)}/${
                                    InfomationState.team
                                }/${moment(getMoment).format('YYYY')}/${moment(getMoment).format('MM')}`,
                                'BusinessShowMonthPrinter',
                                'width=980, height=700'
                            )
                        }
                    >
                        출력하기
                    </button>
                </div>
            </PrinterButtonContainer>
        </BusinessTripShowContentMainDivBox>
    );
};

export default BusinessTripShowContent;

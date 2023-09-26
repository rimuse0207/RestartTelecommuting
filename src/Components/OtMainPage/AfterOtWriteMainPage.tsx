import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import moment from 'moment';
import ko from 'date-fns/locale/ko';
import axios from 'axios';
import { toast } from '../ToastMessage/ToastManager';
import { useSelector } from 'react-redux';
import { RootState } from '../../models/index';
import { DecryptKey } from '../../config';
import PrinterAfterSelectClickModal from '../SelectClickModal/OT/PrinterAfterSelectClickModal';
import styled from 'styled-components';
import AfterOtTeamLeaderFinish from './OTTeamLeaderCheckFinish/AfterOtTeamLeaderFinish';
import AfterMondayComponent from './OtWeekCompoents/AfterComponents/AfterMondayComponent';
import AfterTuedayComponent from './OtWeekCompoents/AfterComponents/AfterTuedayComponent';
import AfterWeddayComponent from './OtWeekCompoents/AfterComponents/AfterWeddayComponent';
import AfterThudayComponent from './OtWeekCompoents/AfterComponents/AfterThudayComponent';
import AfterFridayComponent from './OtWeekCompoents/AfterComponents/AfterFridayComponent';
import AfterSatdayComponent from './OtWeekCompoents/AfterComponents/AfterSatdayComponent';
import AfterSundayComponent from './OtWeekCompoents/AfterComponents/AfterSundayComponent';
import { TailSpin } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { BeforeOtWriteMainPageMainDivBox } from './BeforeOtWriteMainPage';

const SelectMainBox = styled.select`
    padding: 15px;
    font-size: 1em;
    border: none;
    background: #fff;
    box-shadow: 2px 2px 15px 0 rgb(0 0 0 / 15%);
`;
registerLocale('ko', ko);

type WeekAfterOTWorkSpaceProps = {
    startDate: any;
    endDate: any;
    setStartDate: any;
    setEndDate: any;
};

type WeekInfomDataTypes = {
    clickDate: string;
    basicStartTime: string;
    basicEndTime: string;
    basicSumTime: number;
    OTStartTime: string;
    OTEndTime: string;
    OTRestTime: string;
    OTSumTime: number;
    OTreason1: string;
    OTreason2: string;
    OTreason3: string;
    holidayCheck: string;
    OTnightSum: number;
    business_trip: string;
};

const AfterOtWriteMainPage = ({ startDate, endDate, setStartDate, setEndDate }: WeekAfterOTWorkSpaceProps) => {
    const initialState = {
        clickDate: startDate.clone().format('YYYY-MM-DD'),
        basicStartTime: '09:00',
        basicEndTime: '18:00',
        basicSumTime: 8,
        OTStartTime: '18:00',
        OTEndTime: '18:00',
        OTRestTime: '00:00',
        OTSumTime: 0,
        OTreason1: '',
        OTreason2: '',
        OTreason3: '',
        holidayCheck: 'weekday',
        OTnightSum: 0,
        business_trip: '없음',
    };
    const [printerClicked, setPrinterClicked] = useState(false);
    const [clicksData, setClicksData] = useState({});
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const BusinessAcessState = useSelector((state: RootState) => state.Access_Control.BusinessAccess);
    const [leaderCheck, setLeaderCheck] = useState(false);
    const [loading, setLoading] = useState(false);
    const [monDateData, setMonDateData] = useState<WeekInfomDataTypes>(initialState);
    const [tueDateData, setTueDateData] = useState<WeekInfomDataTypes>(initialState);
    const [wedDateData, setWedDateData] = useState<WeekInfomDataTypes>(initialState);
    const [thuDateData, setThuDateData] = useState<WeekInfomDataTypes>(initialState);
    const [friDateData, setFriDateData] = useState<WeekInfomDataTypes>(initialState);
    const [satDateData, setSatDateData] = useState<WeekInfomDataTypes>(initialState);
    const [sunDateData, setSunDateData] = useState<WeekInfomDataTypes>(initialState);

    //OT 데이터 불러오기
    const getDataOTData = async () => {
        setLoading(true);
        const getServerOTDataCheck = await axios.post(`${process.env.REACT_APP_API_URL}/OT_app_server/NewOT_get_some_data`, {
            id: DecryptKey(InfomationState.id),
            startDate: startDate,
        });

        if (getServerOTDataCheck.data.dataComeIn) {
            if (getServerOTDataCheck.data.data[0].leadercheck === 1) setLeaderCheck(true);
            setMonDateData({
                clickDate: startDate.clone().format('YYYY-MM-DD'),
                basicStartTime: getServerOTDataCheck.data.data[0].basic_mon_start_time,
                basicEndTime: getServerOTDataCheck.data.data[0].basic_mon_end_time,
                basicSumTime: getServerOTDataCheck.data.data[0].basic_mon_sum_time,
                OTStartTime: getServerOTDataCheck.data.data[0].start_time_mon,
                OTEndTime: getServerOTDataCheck.data.data[0].end_time_mon,
                OTRestTime: getServerOTDataCheck.data.data[0].mon_rest === '0' ? '00:00' : getServerOTDataCheck.data.data[0].mon_rest,
                OTSumTime: getServerOTDataCheck.data.data[0].mon_time,
                OTreason1: getServerOTDataCheck.data.data[0].mon_reason,
                OTreason2: getServerOTDataCheck.data.data[0].mon_reason1,
                OTreason3: getServerOTDataCheck.data.data[0].mon_reason2,
                holidayCheck: 'weekday',
                OTnightSum: getServerOTDataCheck.data.data[0].mon_night,
                business_trip: getServerOTDataCheck.data.rows3[0] ? getServerOTDataCheck.data.rows3[0].type : '없음',
            });
            setTueDateData({
                clickDate: startDate.clone().format('YYYY-MM-DD'),
                basicStartTime: getServerOTDataCheck.data.data[0].basic_tue_start_time,
                basicEndTime: getServerOTDataCheck.data.data[0].basic_tue_end_time,
                basicSumTime: getServerOTDataCheck.data.data[0].basic_tue_sum_time,
                OTStartTime: getServerOTDataCheck.data.data[0].start_time_tue,
                OTEndTime: getServerOTDataCheck.data.data[0].end_time_tue,
                OTRestTime: getServerOTDataCheck.data.data[0].tue_rest === '0' ? '00:00' : getServerOTDataCheck.data.data[0].tue_rest,
                OTSumTime: getServerOTDataCheck.data.data[0].tue_time,
                OTreason1: getServerOTDataCheck.data.data[0].tue_reason,
                OTreason2: getServerOTDataCheck.data.data[0].tue_reason1,
                OTreason3: getServerOTDataCheck.data.data[0].tue_reason2,
                holidayCheck: 'weekday',
                OTnightSum: getServerOTDataCheck.data.data[0].tue_night,
                business_trip: getServerOTDataCheck.data.rows3[1] ? getServerOTDataCheck.data.rows3[1].type : '없음',
            });
            setWedDateData({
                clickDate: startDate.clone().format('YYYY-MM-DD'),
                basicStartTime: getServerOTDataCheck.data.data[0].basic_wed_start_time,
                basicEndTime: getServerOTDataCheck.data.data[0].basic_wed_end_time,
                basicSumTime: getServerOTDataCheck.data.data[0].basic_wed_sum_time,
                OTStartTime: getServerOTDataCheck.data.data[0].start_time_wed,
                OTEndTime: getServerOTDataCheck.data.data[0].end_time_wed,
                OTRestTime: getServerOTDataCheck.data.data[0].wed_rest === '0' ? '00:00' : getServerOTDataCheck.data.data[0].wed_rest,
                OTSumTime: getServerOTDataCheck.data.data[0].wed_time,
                OTreason1: getServerOTDataCheck.data.data[0].wed_reason,
                OTreason2: getServerOTDataCheck.data.data[0].wed_reason1,
                OTreason3: getServerOTDataCheck.data.data[0].wed_reason2,
                holidayCheck: 'weekday',
                OTnightSum: getServerOTDataCheck.data.data[0].wed_night,
                business_trip: getServerOTDataCheck.data.rows3[2] ? getServerOTDataCheck.data.rows3[2].type : '없음',
            });
            setThuDateData({
                clickDate: startDate.clone().format('YYYY-MM-DD'),
                basicStartTime: getServerOTDataCheck.data.data[0].basic_thu_start_time,
                basicEndTime: getServerOTDataCheck.data.data[0].basic_thu_end_time,
                basicSumTime: getServerOTDataCheck.data.data[0].basic_thu_sum_time,
                OTStartTime: getServerOTDataCheck.data.data[0].start_time_thu,
                OTEndTime: getServerOTDataCheck.data.data[0].end_time_thu,
                OTRestTime: getServerOTDataCheck.data.data[0].thu_rest === '0' ? '00:00' : getServerOTDataCheck.data.data[0].thu_rest,
                OTSumTime: getServerOTDataCheck.data.data[0].thu_time,
                OTreason1: getServerOTDataCheck.data.data[0].thu_reason,
                OTreason2: getServerOTDataCheck.data.data[0].thu_reason1,
                OTreason3: getServerOTDataCheck.data.data[0].thu_reason2,
                holidayCheck: 'weekday',
                OTnightSum: getServerOTDataCheck.data.data[0].thu_night,
                business_trip: getServerOTDataCheck.data.rows3[3] ? getServerOTDataCheck.data.rows3[3].type : '없음',
            });
            setFriDateData({
                clickDate: startDate.clone().format('YYYY-MM-DD'),
                basicStartTime: getServerOTDataCheck.data.data[0].basic_fri_start_time,
                basicEndTime: getServerOTDataCheck.data.data[0].basic_fri_end_time,
                basicSumTime: getServerOTDataCheck.data.data[0].basic_fri_sum_time,
                OTStartTime: getServerOTDataCheck.data.data[0].start_time_fri,
                OTEndTime: getServerOTDataCheck.data.data[0].end_time_fri,
                OTRestTime: getServerOTDataCheck.data.data[0].fri_rest === '0' ? '00:00' : getServerOTDataCheck.data.data[0].fri_rest,
                OTSumTime: getServerOTDataCheck.data.data[0].fri_time,
                OTreason1: getServerOTDataCheck.data.data[0].fri_reason,
                OTreason2: getServerOTDataCheck.data.data[0].fri_reason1,
                OTreason3: getServerOTDataCheck.data.data[0].fri_reason2,
                holidayCheck: 'weekday',
                OTnightSum: getServerOTDataCheck.data.data[0].fri_night,
                business_trip: getServerOTDataCheck.data.rows3[4] ? getServerOTDataCheck.data.rows3[4].type : '없음',
            });
            setSatDateData({
                clickDate: startDate.clone().format('YYYY-MM-DD'),
                basicStartTime: getServerOTDataCheck.data.data[0].basic_fri_start_time,
                basicEndTime: getServerOTDataCheck.data.data[0].basic_fri_end_time,
                basicSumTime: getServerOTDataCheck.data.data[0].basic_fri_sum_time,
                OTStartTime: getServerOTDataCheck.data.data[0].start_time_sat,
                OTEndTime: getServerOTDataCheck.data.data[0].end_time_sat,
                OTRestTime: getServerOTDataCheck.data.data[0].sat_rest === '0' ? '00:00' : getServerOTDataCheck.data.data[0].sat_rest,
                OTSumTime: getServerOTDataCheck.data.data[0].sat_time,
                OTreason1: getServerOTDataCheck.data.data[0].sat_reason,
                OTreason2: getServerOTDataCheck.data.data[0].sat_reason1,
                OTreason3: getServerOTDataCheck.data.data[0].sat_reason2,
                holidayCheck: 'weekday',
                OTnightSum: getServerOTDataCheck.data.data[0].sat_night,
                business_trip: getServerOTDataCheck.data.rows3[5] ? getServerOTDataCheck.data.rows3[5].type : '없음',
            });
            setSunDateData({
                clickDate: startDate.clone().format('YYYY-MM-DD'),
                basicStartTime: getServerOTDataCheck.data.data[0].basic_fri_start_time,
                basicEndTime: getServerOTDataCheck.data.data[0].basic_fri_end_time,
                basicSumTime: getServerOTDataCheck.data.data[0].basic_fri_sum_time,
                OTStartTime: getServerOTDataCheck.data.data[0].start_time_sun,
                OTEndTime: getServerOTDataCheck.data.data[0].end_time_sun,
                OTRestTime: getServerOTDataCheck.data.data[0].sun_rest === '0' ? '00:00' : getServerOTDataCheck.data.data[0].sun_rest,
                OTSumTime: getServerOTDataCheck.data.data[0].sun_time,
                OTreason1: getServerOTDataCheck.data.data[0].sun_reason,
                OTreason2: getServerOTDataCheck.data.data[0].sun_reason1,
                OTreason3: getServerOTDataCheck.data.data[0].sun_reason2,
                holidayCheck: 'weekday',
                OTnightSum: getServerOTDataCheck.data.data[0].sun_night,
                business_trip: getServerOTDataCheck.data.rows3[6] ? getServerOTDataCheck.data.rows3[6].type : '없음',
            });

            setTimeout(() => {
                setLoading(false);
            }, 500);
        } else {
            setMonDateData(initialState);
            setTueDateData(initialState);
            setWedDateData(initialState);
            setThuDateData(initialState);
            setFriDateData(initialState);
            setSatDateData(initialState);
            setSunDateData(initialState);
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    };

    /// 일시 변동 시 재 렌더링
    useEffect(() => {
        setLeaderCheck(false);
        getDataOTData();
        setMonDateData({ ...monDateData, clickDate: startDate.clone().format('YYYY-MM-DD') });
        setTueDateData({ ...tueDateData, clickDate: startDate.clone().format('YYYY-MM-DD') });
        setWedDateData({ ...wedDateData, clickDate: startDate.clone().format('YYYY-MM-DD') });
        setThuDateData({ ...thuDateData, clickDate: startDate.clone().format('YYYY-MM-DD') });
        setFriDateData({ ...friDateData, clickDate: startDate.clone().format('YYYY-MM-DD') });
        setSatDateData({ ...satDateData, clickDate: startDate.clone().format('YYYY-MM-DD') });
        setSunDateData({ ...sunDateData, clickDate: startDate.clone().format('YYYY-MM-DD') });
    }, [startDate]);

    const handlesubTest = () => {
        setStartDate(startDate.clone().subtract(7, 'day'));
        setEndDate(endDate.clone().subtract(7, 'day'));
    };
    const handlenextTest = () => {
        setStartDate(startDate.clone().add(7, 'day'));
        setEndDate(endDate.clone().add(7, 'day'));
    };

    const handleStoreOTData = async () => {
        if (
            monDateData.OTSumTime +
                tueDateData.OTSumTime +
                wedDateData.OTSumTime +
                thuDateData.OTSumTime +
                friDateData.OTSumTime +
                satDateData.OTSumTime +
                sunDateData.OTSumTime >
            12.5
        ) {
            toast.show({
                title: '연장근무 신청 불가. (연장시간 초기화)',
                content: `(주 연장근무 총시간이 12시간을 초과 할수 없습니다.) 팀장님에게 문의 바랍니다.`,
                duration: 6000,
                DataSuccess: false,
            });
            return;
        }
        try {
            const monDataSend = await axios.post(`${process.env.REACT_APP_API_URL}/OT_app_server/New_monDateData`, {
                id: DecryptKey(InfomationState.id),
                name: DecryptKey(InfomationState.name),
                team: InfomationState.team,
                position: InfomationState.position,
                dateSelect: [
                    { title: 'mon', desc: monDateData },
                    { title: 'tue', desc: tueDateData },
                    { title: 'wed', desc: wedDateData },
                    { title: 'thu', desc: thuDateData },
                    { title: 'fri', desc: friDateData },
                    { title: 'sat', desc: satDateData },
                    { title: 'sun', desc: sunDateData },
                ],
            });
        } catch (error) {
            console.log(error);
        }

        try {
            const business_tripDataSend = await axios.post(`${process.env.REACT_APP_API_URL}/OT_app_server/New_business_trip`, {
                id: DecryptKey(InfomationState.id),
                name: DecryptKey(InfomationState.name),
                team: InfomationState.team,
                position: InfomationState.position,
                dateSelect: [
                    { title: 'mon', desc: monDateData },
                    { title: 'tue', desc: tueDateData },
                    { title: 'wed', desc: wedDateData },
                    { title: 'thu', desc: thuDateData },
                    { title: 'fri', desc: friDateData },
                    { title: 'sat', desc: satDateData },
                    { title: 'sun', desc: sunDateData },
                ],
            });
        } catch (error) {
            console.log(error);
        }

        try {
            const dataSendServerOT = await axios.post(`${process.env.REACT_APP_API_URL}/OT_app_server/New_OT_send_Data`, {
                id: DecryptKey(InfomationState.id),
                name: DecryptKey(InfomationState.name),
                team: InfomationState.team,
                position: InfomationState.position,
                monDateData,
                tueDateData,
                wedDateData,
                thuDateData,
                friDateData,
                satDateData,
                sunDateData,
            });
            if (dataSendServerOT.data.dataSuccess) {
                toast.show({
                    title: '사후 OT 데이터 저장 성공 ',
                    content: '사후 OT 데이터가 서버에 성공적으로 저장 되었습니다.',
                    duration: 6000,
                    DataSuccess: true,
                });
            } else {
                toast.show({
                    title: '에러발생. 데이터 저장 실패.',
                    content: '사후 OT 데이터 저장 실패. IT팀에 문의 바랍니다.',
                    duration: 6000,
                    DataSuccess: false,
                });
            }
        } catch (error) {
            console.log(error);

            toast.show({
                title: 'Error발생.',
                content: 'server와의 연결 끊김. ErrorCode OT 20 ',
                duration: 6000,
                DataSuccess: false,
            });
        }
    };

    return (
        <BeforeOtWriteMainPageMainDivBox className="WeekAfterOTWorkSpace_big_div" style={{ marginTop: '20px' }}>
            {printerClicked ? (
                <div></div>
            ) : (
                <>
                    <div style={{ textAlign: 'center', marginBottom: '10px', fontSize: '1.3em' }}>
                        <span
                            className="WeekAferOTWorkSpace_date_change_span"
                            style={{ fontSize: '1.2em', fontWeight: 'bolder' }}
                            onClick={handlesubTest}
                        >
                            {'<<<< '}
                        </span>
                        <h2 style={{ textAlign: 'center', display: 'inline', fontSize: '1.2em' }}>
                            {startDate.format('YYYY년 MM월 DD일')}(월) ~ {endDate.format('YYYY년 MM월 DD일')}(일)
                        </h2>
                        <span
                            className="WeekAferOTWorkSpace_date_change_span"
                            style={{ fontSize: '1.2em', fontWeight: 'bolder' }}
                            onClick={handlenextTest}
                        >
                            {' >>>>'}
                        </span>
                    </div>
                    {leaderCheck ? (
                        <AfterOtTeamLeaderFinish
                            printerClicked={printerClicked}
                            startDate={startDate}
                            monDateData={monDateData}
                            tueDateData={tueDateData}
                            wedDateData={wedDateData}
                            thuDateData={thuDateData}
                            friDateData={friDateData}
                            satDateData={satDateData}
                            sunDateData={sunDateData}
                            id={DecryptKey(InfomationState.id)}
                        ></AfterOtTeamLeaderFinish>
                    ) : (
                        <div>
                            {loading ? (
                                <div style={{ marginLeft: '50px' }}>
                                    <TailSpin color="#3d66ba" height={50} width={50}></TailSpin>
                                </div>
                            ) : (
                                <table>
                                    <thead>
                                        <tr
                                            className="testss"
                                            style={{
                                                borderTop: '1.5px solid black',
                                                borderLeft: '1.3px solid black',
                                                borderRight: '1.3px solid black',
                                            }}
                                        >
                                            <th rowSpan={2} style={{ borderRight: '1.2px solid black' }}>
                                                일자
                                            </th>
                                            <th rowSpan={2} style={{ borderRight: '1.2px solid black' }}>
                                                공휴일
                                            </th>
                                            <th colSpan={3} style={{ borderRight: '1.2px solid black', borderBottom: '1.2px solid black' }}>
                                                소정근로
                                            </th>
                                            {BusinessAcessState ? (
                                                <th rowSpan={2} style={{ borderRight: '1.2px solid black', fontSize: '0.9em' }}>
                                                    현장 수당
                                                    <br />
                                                    출장 일비
                                                    <br />
                                                </th>
                                            ) : (
                                                ''
                                            )}

                                            <th colSpan={4} style={{ borderRight: '1.2px solid black', borderBottom: '1.2px solid black' }}>
                                                {' '}
                                                연장 근무
                                            </th>
                                            <th rowSpan={2} style={{ borderRight: '1.2px solid black' }}>
                                                총 근무 <br />
                                                합계 시간
                                                <br />
                                            </th>
                                            <th rowSpan={2} className="OTSpace_OTReason_th">
                                                연장 사유
                                            </th>
                                        </tr>
                                        <tr
                                            className="testss"
                                            style={{
                                                borderBottom: '1.2px solid black',
                                                borderLeft: '1.3px solid black',
                                                borderRight: '1.3px solid black',
                                            }}
                                        >
                                            <td
                                                style={{
                                                    borderRight: '1.2px solid black',
                                                    borderBottom: '1.2px solid black',
                                                    fontWeight: 'bolder',
                                                }}
                                            >
                                                시작시간
                                            </td>
                                            <td
                                                style={{
                                                    borderRight: '1.2px solid black',
                                                    borderBottom: '1.2px solid black',
                                                    fontWeight: 'bolder',
                                                }}
                                            >
                                                종료시간
                                            </td>
                                            <td
                                                style={{
                                                    borderRight: '1.2px solid black',
                                                    borderBottom: '1.2px solid black',
                                                    fontWeight: 'bolder',
                                                }}
                                            >
                                                총 합계 <br /> 시간
                                            </td>
                                            <td
                                                style={{
                                                    borderRight: '1.2px solid black',
                                                    borderBottom: '1.2px solid black',
                                                    fontWeight: 'bolder',
                                                }}
                                            >
                                                시작시간
                                            </td>
                                            <td
                                                style={{
                                                    borderRight: '1.2px solid black',
                                                    borderBottom: '1.2px solid black',
                                                    fontWeight: 'bolder',
                                                }}
                                            >
                                                종료시간
                                            </td>
                                            <td
                                                style={{
                                                    borderRight: '1.2px solid black',
                                                    borderBottom: '1.2px solid black',
                                                    fontWeight: 'bolder',
                                                }}
                                            >
                                                휴게시간
                                            </td>
                                            <td
                                                style={{
                                                    borderRight: '1.2px solid black',
                                                    borderBottom: '1.2px solid black',
                                                    fontWeight: 'bolder',
                                                }}
                                            >
                                                총 합계 <br />
                                                시간
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <AfterMondayComponent
                                            startDate={startDate}
                                            monDateData={monDateData}
                                            setMonDateData={setMonDateData}
                                            BusinessAcessState={BusinessAcessState}
                                        ></AfterMondayComponent>
                                        <AfterTuedayComponent
                                            startDate={startDate}
                                            tueDateData={tueDateData}
                                            setTueDateData={setTueDateData}
                                            BusinessAcessState={BusinessAcessState}
                                        ></AfterTuedayComponent>
                                        <AfterWeddayComponent
                                            startDate={startDate}
                                            wedDateData={wedDateData}
                                            setWedDateData={setWedDateData}
                                            BusinessAcessState={BusinessAcessState}
                                        ></AfterWeddayComponent>
                                        <AfterThudayComponent
                                            startDate={startDate}
                                            thuDateData={thuDateData}
                                            setThuDateData={setThuDateData}
                                            BusinessAcessState={BusinessAcessState}
                                        ></AfterThudayComponent>
                                        <AfterFridayComponent
                                            startDate={startDate}
                                            friDateData={friDateData}
                                            setFriDateData={setFriDateData}
                                            BusinessAcessState={BusinessAcessState}
                                        ></AfterFridayComponent>
                                        <AfterSatdayComponent
                                            startDate={startDate}
                                            satDateData={satDateData}
                                            setSatDateData={setSatDateData}
                                            BusinessAcessState={BusinessAcessState}
                                        ></AfterSatdayComponent>
                                        <AfterSundayComponent
                                            startDate={startDate}
                                            sunDateData={sunDateData}
                                            setSunDateData={setSunDateData}
                                            BusinessAcessState={BusinessAcessState}
                                        ></AfterSundayComponent>
                                        <tr style={{ height: '50px', border: '1.1px solid black' }}>
                                            <td colSpan={3} style={{ background: 'darkgray', fontWeight: 'bolder' }}>
                                                소정근로 총합계
                                            </td>
                                            <td colSpan={2}>
                                                <span id="total_sum_time">
                                                    {monDateData.basicSumTime +
                                                        tueDateData.basicSumTime +
                                                        wedDateData.basicSumTime +
                                                        thuDateData.basicSumTime +
                                                        friDateData.basicSumTime}
                                                </span>
                                                시간
                                            </td>
                                            <td colSpan={3} style={{ background: 'darkgray', fontWeight: 'bolder' }}>
                                                연장근무 총합계
                                            </td>
                                            <td colSpan={2}>
                                                <span id="total_sum_over_time">
                                                    {monDateData.OTSumTime +
                                                        tueDateData.OTSumTime +
                                                        wedDateData.OTSumTime +
                                                        thuDateData.OTSumTime +
                                                        friDateData.OTSumTime +
                                                        satDateData.OTSumTime +
                                                        sunDateData.OTSumTime}
                                                </span>{' '}
                                                시간
                                            </td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}

                    <div style={{ marginBottom: '30px' }}>
                        {leaderCheck ? (
                            <div style={{ fontSize: 'x-large', margin: '30px' }}>
                                <div style={{ textAlign: 'end', marginRight: '30px' }}>팀장승인 완료</div>
                            </div>
                        ) : (
                            <div className="WeekAfterOTWorkSpace_store_button_div">
                                <button onClick={handleStoreOTData}>저장하기</button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </BeforeOtWriteMainPageMainDivBox>
    );
};

export default AfterOtWriteMainPage;

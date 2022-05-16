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

    // //초기 렌더링 시 OT 데이터 불러오기 실행
    // useEffect(() => {
    //     getDataOTData();
    // }, []);

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

    //월요일 시간 변동 시, 합계 변경
    useEffect(() => {
        const OTendTimes = moment(`2022-01-01 ${monDateData.OTEndTime}`);
        const OTStartTimes = moment(`2022-01-01 ${monDateData.OTStartTime}`);
        const OTRestTimes = moment(`2022-01-01 ${monDateData.OTRestTime}`);
        const OTBasicStartTimes = moment(`2022-01-01 ${monDateData.basicStartTime}`);
        const OTBasicEndTimes = moment(`2022-01-01 ${monDateData.basicEndTime}`);

        let startPlusEnd = moment.duration(OTendTimes.diff(OTStartTimes)).asHours();
        const restPlusTime = moment
            .duration(OTRestTimes.diff(moment(moment(`${OTRestTimes.format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm'))))
            .asHours();

        const nightTime = moment
            .duration(OTendTimes.diff(moment(`${OTendTimes.format('YYYY-MM-DD')} 22:00`).format('YYYY-MM-DD HH:mm')))
            .asHours();
        let nightTimeCal = 0;
        if (nightTime > 0) {
            nightTimeCal = nightTime;
        } else if (nightTime < -15) {
            nightTimeCal = 24 + nightTime;
        }

        if (startPlusEnd < 0) {
            startPlusEnd = 24 + startPlusEnd;
            if (startPlusEnd - restPlusTime < 0) {
                toast.show({
                    title: '근무시간보다 ',
                    content: '휴게시간이 더 큽니다. (휴게시간 초기화 실행)',
                    duration: 3000,
                    DataSuccess: false,
                });
                setMonDateData({
                    ...monDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: '00:00',
                    basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setMonDateData({
                    ...monDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            }
        } else {
            if (startPlusEnd - restPlusTime < 0) {
                toast.show({
                    title: '근무시간보다 ',
                    content: '휴게시간이 더 큽니다. (휴게시간 초기화 실행)',
                    duration: 3000,
                    DataSuccess: false,
                });

                setMonDateData({
                    ...monDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: '00:00',
                    basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setMonDateData({
                    ...monDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            }
        }
    }, [
        monDateData.basicStartTime,
        monDateData.basicEndTime,
        monDateData.OTEndTime,
        monDateData.OTStartTime,
        monDateData.OTRestTime,
        monDateData.clickDate,
    ]);

    // 화요일 시간 변동 시 state변경
    useEffect(() => {
        const OTendTimes = moment(`2022-01-01 ${tueDateData.OTEndTime}`);
        const OTStartTimes = moment(`2022-01-01 ${tueDateData.OTStartTime}`);
        const OTRestTimes = moment(`2022-01-01 ${tueDateData.OTRestTime}`);
        const OTBasicStartTimes = moment(`2022-01-01 ${tueDateData.basicStartTime}`);
        const OTBasicEndTimes = moment(`2022-01-01 ${tueDateData.basicEndTime}`);

        let startPlusEnd = moment.duration(OTendTimes.diff(OTStartTimes)).asHours();
        const restPlusTime = moment
            .duration(OTRestTimes.diff(moment(moment(`${OTRestTimes.format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm'))))
            .asHours();

        const nightTime = moment
            .duration(OTendTimes.diff(moment(`${OTendTimes.format('YYYY-MM-DD')} 22:00`).format('YYYY-MM-DD HH:mm')))
            .asHours();
        let nightTimeCal = 0;
        if (nightTime > 0) {
            nightTimeCal = nightTime;
        } else if (nightTime < -15) {
            nightTimeCal = 24 + nightTime;
        }

        if (startPlusEnd < 0) {
            startPlusEnd = 24 + startPlusEnd;
            if (startPlusEnd - restPlusTime < 0) {
                toast.show({
                    title: '근무시간보다 ',
                    content: '휴게시간이 더 큽니다. (휴게시간 초기화 실행)',
                    duration: 3000,
                    DataSuccess: false,
                });
                setTueDateData({
                    ...tueDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: '00:00',
                    basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setTueDateData({
                    ...tueDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            }
        } else {
            if (startPlusEnd - restPlusTime < 0) {
                toast.show({
                    title: '근무시간보다 ',
                    content: '휴게시간이 더 큽니다. (휴게시간 초기화 실행)',
                    duration: 3000,
                    DataSuccess: false,
                });
                setTueDateData({
                    ...tueDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: '00:00',
                    basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setTueDateData({
                    ...tueDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            }
        }
    }, [
        tueDateData.basicStartTime,
        tueDateData.basicEndTime,
        tueDateData.OTEndTime,
        tueDateData.OTStartTime,
        tueDateData.OTRestTime,
        tueDateData.clickDate,
    ]);

    // 수요일 시간 변경 시 state변경
    useEffect(() => {
        const OTendTimes = moment(`2022-01-01 ${wedDateData.OTEndTime}`);
        const OTStartTimes = moment(`2022-01-01 ${wedDateData.OTStartTime}`);
        const OTRestTimes = moment(`2022-01-01 ${wedDateData.OTRestTime}`);
        const OTBasicStartTimes = moment(`2022-01-01 ${wedDateData.basicStartTime}`);
        const OTBasicEndTimes = moment(`2022-01-01 ${wedDateData.basicEndTime}`);

        let startPlusEnd = moment.duration(OTendTimes.diff(OTStartTimes)).asHours();
        const restPlusTime = moment
            .duration(OTRestTimes.diff(moment(moment(`${OTRestTimes.format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm'))))
            .asHours();

        const nightTime = moment
            .duration(OTendTimes.diff(moment(`${OTendTimes.format('YYYY-MM-DD')} 22:00`).format('YYYY-MM-DD HH:mm')))
            .asHours();
        let nightTimeCal = 0;
        if (nightTime > 0) {
            nightTimeCal = nightTime;
        } else if (nightTime < -15) {
            nightTimeCal = 24 + nightTime;
        }

        if (startPlusEnd < 0) {
            startPlusEnd = 24 + startPlusEnd;
            if (startPlusEnd - restPlusTime < 0) {
                toast.show({
                    title: '근무시간보다 ',
                    content: '휴게시간이 더 큽니다. (휴게시간 초기화 실행)',
                    duration: 3000,
                    DataSuccess: false,
                });
                setWedDateData({
                    ...wedDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: '00:00',
                    basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setWedDateData({
                    ...wedDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            }
        } else {
            if (startPlusEnd - restPlusTime < 0) {
                toast.show({
                    title: '근무시간보다 ',
                    content: '휴게시간이 더 큽니다. (휴게시간 초기화 실행)',
                    duration: 3000,
                    DataSuccess: false,
                });
                setWedDateData({
                    ...wedDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: '00:00',
                    basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setWedDateData({
                    ...wedDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            }
        }
    }, [
        wedDateData.basicStartTime,
        wedDateData.basicEndTime,
        wedDateData.OTEndTime,
        wedDateData.OTStartTime,
        wedDateData.OTRestTime,
        wedDateData.clickDate,
    ]);

    // 목요일 state 변경시 재 렌더링
    useEffect(() => {
        const OTendTimes = moment(`2022-01-01 ${thuDateData.OTEndTime}`);
        const OTStartTimes = moment(`2022-01-01 ${thuDateData.OTStartTime}`);
        const OTRestTimes = moment(`2022-01-01 ${thuDateData.OTRestTime}`);
        const OTBasicStartTimes = moment(`2022-01-01 ${thuDateData.basicStartTime}`);
        const OTBasicEndTimes = moment(`2022-01-01 ${thuDateData.basicEndTime}`);

        let startPlusEnd = moment.duration(OTendTimes.diff(OTStartTimes)).asHours();
        const restPlusTime = moment
            .duration(OTRestTimes.diff(moment(moment(`${OTRestTimes.format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm'))))
            .asHours();

        const nightTime = moment
            .duration(OTendTimes.diff(moment(`${OTendTimes.format('YYYY-MM-DD')} 22:00`).format('YYYY-MM-DD HH:mm')))
            .asHours();
        let nightTimeCal = 0;
        if (nightTime > 0) {
            nightTimeCal = nightTime;
        } else if (nightTime < -15) {
            nightTimeCal = 24 + nightTime;
        }

        if (startPlusEnd < 0) {
            startPlusEnd = 24 + startPlusEnd;
            if (startPlusEnd - restPlusTime < 0) {
                toast.show({
                    title: '근무시간보다 ',
                    content: '휴게시간이 더 큽니다. (휴게시간 초기화 실행)',
                    duration: 3000,
                    DataSuccess: false,
                });
                setThuDateData({
                    ...thuDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: '00:00',
                    basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setThuDateData({
                    ...thuDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            }
        } else {
            if (startPlusEnd - restPlusTime < 0) {
                toast.show({
                    title: '근무시간보다 ',
                    content: '휴게시간이 더 큽니다. (휴게시간 초기화 실행)',
                    duration: 3000,
                    DataSuccess: false,
                });
                setThuDateData({
                    ...thuDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: '00:00',
                    basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setThuDateData({
                    ...thuDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            }
        }
    }, [
        thuDateData.basicStartTime,
        thuDateData.basicEndTime,
        thuDateData.OTEndTime,
        thuDateData.OTStartTime,
        thuDateData.OTRestTime,
        thuDateData.clickDate,
    ]);

    //금요일 시간 변경 시 재렌더링
    useEffect(() => {
        const OTendTimes = moment(`2022-01-01 ${friDateData.OTEndTime}`);
        const OTStartTimes = moment(`2022-01-01 ${friDateData.OTStartTime}`);
        const OTRestTimes = moment(`2022-01-01 ${friDateData.OTRestTime}`);
        const OTBasicStartTimes = moment(`2022-01-01 ${friDateData.basicStartTime}`);
        const OTBasicEndTimes = moment(`2022-01-01 ${friDateData.basicEndTime}`);

        let startPlusEnd = moment.duration(OTendTimes.diff(OTStartTimes)).asHours();
        const restPlusTime = moment
            .duration(OTRestTimes.diff(moment(moment(`${OTRestTimes.format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm'))))
            .asHours();

        const nightTime = moment
            .duration(OTendTimes.diff(moment(`${OTendTimes.format('YYYY-MM-DD')} 22:00`).format('YYYY-MM-DD HH:mm')))
            .asHours();
        let nightTimeCal = 0;
        if (nightTime > 0) {
            nightTimeCal = nightTime;
        } else if (nightTime < -15) {
            nightTimeCal = 24 + nightTime;
        }

        if (startPlusEnd < 0) {
            startPlusEnd = 24 + startPlusEnd;
            if (startPlusEnd - restPlusTime < 0) {
                toast.show({
                    title: '근무시간보다 ',
                    content: '휴게시간이 더 큽니다. (휴게시간 초기화 실행)',
                    duration: 3000,
                    DataSuccess: false,
                });
                setFriDateData({
                    ...friDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: '00:00',
                    basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setFriDateData({
                    ...friDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            }
        } else {
            if (startPlusEnd - restPlusTime < 0) {
                toast.show({
                    title: '근무시간보다 ',
                    content: '휴게시간이 더 큽니다. (휴게시간 초기화 실행)',
                    duration: 3000,
                    DataSuccess: false,
                });
                setFriDateData({
                    ...friDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: '00:00',
                    basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setFriDateData({
                    ...friDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            }
        }
    }, [
        friDateData.basicStartTime,
        friDateData.basicEndTime,
        friDateData.OTEndTime,
        friDateData.OTStartTime,
        friDateData.OTRestTime,
        friDateData.clickDate,
    ]);

    // 토요일 시간 변경 시 재 렌더링
    useEffect(() => {
        const OTendTimes = moment(`2022-01-01 ${satDateData.OTEndTime}`);
        const OTStartTimes = moment(`2022-01-01 ${satDateData.OTStartTime}`);
        const OTRestTimes = moment(`2022-01-01 ${satDateData.OTRestTime}`);
        const OTBasicStartTimes = moment(`2022-01-01 ${satDateData.basicStartTime}`);
        const OTBasicEndTimes = moment(`2022-01-01 ${satDateData.basicEndTime}`);

        let startPlusEnd = moment.duration(OTendTimes.diff(OTStartTimes)).asHours();
        const restPlusTime = moment
            .duration(OTRestTimes.diff(moment(moment(`${OTRestTimes.format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm'))))
            .asHours();

        const nightTime = moment
            .duration(OTendTimes.diff(moment(`${OTendTimes.format('YYYY-MM-DD')} 22:00`).format('YYYY-MM-DD HH:mm')))
            .asHours();
        let nightTimeCal = 0;
        if (nightTime > 0) {
            nightTimeCal = nightTime;
        } else if (nightTime < -15) {
            nightTimeCal = 24 + nightTime;
        }

        if (startPlusEnd < 0) {
            startPlusEnd = 24 + startPlusEnd;
            if (startPlusEnd - restPlusTime < 0) {
                toast.show({
                    title: '근무시간보다 ',
                    content: '휴게시간이 더 큽니다. (휴게시간 초기화 실행)',
                    duration: 3000,
                    DataSuccess: false,
                });
                setSatDateData({
                    ...satDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: '00:00',
                    basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setSatDateData({
                    ...satDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            }
        } else {
            if (startPlusEnd - restPlusTime < 0) {
                toast.show({
                    title: '근무시간보다 ',
                    content: '휴게시간이 더 큽니다. (휴게시간 초기화 실행)',
                    duration: 3000,
                    DataSuccess: false,
                });
                setSatDateData({
                    ...satDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: '00:00',
                    basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setSatDateData({
                    ...satDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            }
        }
    }, [
        satDateData.basicStartTime,
        satDateData.basicEndTime,
        satDateData.OTEndTime,
        satDateData.OTStartTime,
        satDateData.OTRestTime,
        satDateData.clickDate,
    ]);

    //일요일 시간 변동 시 재렌더링
    useEffect(() => {
        const OTendTimes = moment(`2022-01-01 ${sunDateData.OTEndTime}`);
        const OTStartTimes = moment(`2022-01-01 ${sunDateData.OTStartTime}`);
        const OTRestTimes = moment(`2022-01-01 ${sunDateData.OTRestTime}`);
        const OTBasicStartTimes = moment(`2022-01-01 ${sunDateData.basicStartTime}`);
        const OTBasicEndTimes = moment(`2022-01-01 ${sunDateData.basicEndTime}`);

        let startPlusEnd = moment.duration(OTendTimes.diff(OTStartTimes)).asHours();
        const restPlusTime = moment
            .duration(OTRestTimes.diff(moment(moment(`${OTRestTimes.format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm'))))
            .asHours();
        const nightTime = moment
            .duration(OTendTimes.diff(moment(`${OTendTimes.format('YYYY-MM-DD')} 22:00`).format('YYYY-MM-DD HH:mm')))
            .asHours();
        let nightTimeCal = 0;
        if (nightTime > 0) {
            nightTimeCal = nightTime;
        } else if (nightTime < -15) {
            nightTimeCal = 24 + nightTime;
        }

        if (startPlusEnd < 0) {
            startPlusEnd = 24 + startPlusEnd;
            if (startPlusEnd - restPlusTime < 0) {
                toast.show({
                    title: '근무시간보다 ',
                    content: '휴게시간이 더 큽니다. (휴게시간 초기화 실행)',
                    duration: 3000,
                    DataSuccess: false,
                });
                setSunDateData({
                    ...sunDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: '00:00',
                    basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setSunDateData({
                    ...sunDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            }
        } else {
            if (startPlusEnd - restPlusTime < 0) {
                toast.show({
                    title: '근무시간보다 ',
                    content: '휴게시간이 더 큽니다. (휴게시간 초기화 실행)',
                    duration: 3000,
                    DataSuccess: false,
                });
                setSunDateData({
                    ...sunDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: '00:00',
                    basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setSunDateData({
                    ...sunDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            }
        }
    }, [
        sunDateData.basicStartTime,
        sunDateData.basicEndTime,
        sunDateData.OTEndTime,
        sunDateData.OTStartTime,
        sunDateData.OTRestTime,
        sunDateData.clickDate,
    ]);

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
            10
        ) {
            toast.show({
                title: '연장근무 신청 불가. (연장시간 초기화)',
                content: `(주 연장근무 총시간이 10시간을 초과 할수 없습니다.) 팀장님에게 문의 바랍니다.`,
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

    const handlePrinterClicks = () => {
        const data = {
            date_mon: startDate.clone().format('YYYY-MM-DD'),
            date_tue: startDate.clone().add(1, 'day').format('YYYY-MM-DD'),
            date_wed: startDate.clone().add(2, 'day').format('YYYY-MM-DD'),
            date_thu: startDate.clone().add(3, 'day').format('YYYY-MM-DD'),
            date_fri: startDate.clone().add(4, 'day').format('YYYY-MM-DD'),
            date_sat: startDate.clone().add(5, 'day').format('YYYY-MM-DD'),
            date_sun: startDate.clone().add(6, 'day').format('YYYY-MM-DD'),

            end_time_mon: monDateData.OTEndTime,
            end_time_tue: tueDateData.OTEndTime,
            end_time_wed: wedDateData.OTEndTime,
            end_time_thu: thuDateData.OTEndTime,
            end_time_fri: friDateData.OTEndTime,
            end_time_sat: satDateData.OTEndTime,
            end_time_sun: sunDateData.OTEndTime,

            start_time_mon: monDateData.OTStartTime,
            start_time_tue: tueDateData.OTStartTime,
            start_time_wed: wedDateData.OTStartTime,
            start_time_thu: thuDateData.OTStartTime,
            start_time_fri: friDateData.OTStartTime,
            start_time_sat: satDateData.OTStartTime,
            start_time_sun: sunDateData.OTStartTime,

            mon_rest: monDateData.OTRestTime,
            tue_rest: tueDateData.OTRestTime,
            wed_rest: wedDateData.OTRestTime,
            thu_rest: thuDateData.OTRestTime,
            fri_rest: friDateData.OTRestTime,
            sat_rest: satDateData.OTRestTime,
            sun_rest: sunDateData.OTRestTime,

            mon_time: monDateData.OTSumTime,
            tue_time: tueDateData.OTSumTime,
            wed_time: wedDateData.OTSumTime,
            thu_time: thuDateData.OTSumTime,
            fri_time: friDateData.OTSumTime,
            sat_time: satDateData.OTSumTime,
            sun_time: sunDateData.OTSumTime,

            mon_night: monDateData.OTnightSum,
            tue_night: tueDateData.OTnightSum,
            wed_night: wedDateData.OTnightSum,
            thu_night: thuDateData.OTnightSum,
            fri_night: friDateData.OTnightSum,
            sat_night: satDateData.OTnightSum,
            sun_night: sunDateData.OTnightSum,

            mon_reason: monDateData.OTreason1,
            mon_reason1: monDateData.OTreason2,
            mon_reason2: monDateData.OTreason3,
            tue_reason: tueDateData.OTreason1,
            tue_reason1: tueDateData.OTreason2,
            tue_reason2: tueDateData.OTreason3,
            wed_reason: wedDateData.OTreason1,
            wed_reason1: wedDateData.OTreason2,
            wed_reason2: wedDateData.OTreason3,
            thu_reason: thuDateData.OTreason1,
            thu_reason1: thuDateData.OTreason2,
            thu_reason2: thuDateData.OTreason3,
            fri_reason: friDateData.OTreason1,
            fri_reason1: friDateData.OTreason2,
            fri_reason2: friDateData.OTreason3,
            sat_reason: satDateData.OTreason1,
            sat_reason1: satDateData.OTreason2,
            sat_reason2: satDateData.OTreason3,
            sun_reason: sunDateData.OTreason1,
            sun_reason1: sunDateData.OTreason2,
            sun_reason2: sunDateData.OTreason3,
            sum_time: 0,
            number: 0,
            leadercheck: 1,
            id: DecryptKey(InfomationState.id),
            name: DecryptKey(InfomationState.name),
            position: InfomationState.position,
            team: InfomationState.team,
        };
        setClicksData(data);
        setPrinterClicked(true);
    };

    return (
        <div className="WeekAfterOTWorkSpace_big_div" style={{ marginTop: '20px' }}>
            {printerClicked ? (
                <div></div>
            ) : (
                <>
                    <div style={{ textAlign: 'center', marginBottom: '10px' }}>
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
                                            <th rowSpan={2} style={{ borderRight: '1.2px solid black', fontSize: '1em' }}>
                                                현장 <br />
                                                OR <br />
                                                출장 <br />
                                                선택
                                                <br />
                                            </th>
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
                                            <td style={{ borderRight: '1.2px solid black' }}>시작시간</td>
                                            <td style={{ borderRight: '1.2px solid black' }}>종료시간</td>
                                            <td style={{ borderRight: '1.2px solid black' }}>
                                                총 합계 <br /> 시간
                                            </td>
                                            <td style={{ borderRight: '1.2px solid black' }}>시작시간</td>
                                            <td style={{ borderRight: '1.2px solid black' }}>종료시간</td>
                                            <td style={{ borderRight: '1.2px solid black' }}>휴게시간</td>
                                            <td style={{ borderRight: '1.2px solid black' }}>
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
                                        ></AfterMondayComponent>
                                        <AfterTuedayComponent
                                            startDate={startDate}
                                            tueDateData={tueDateData}
                                            setTueDateData={setTueDateData}
                                        ></AfterTuedayComponent>
                                        <AfterWeddayComponent
                                            startDate={startDate}
                                            wedDateData={wedDateData}
                                            setWedDateData={setWedDateData}
                                        ></AfterWeddayComponent>
                                        <AfterThudayComponent
                                            startDate={startDate}
                                            thuDateData={thuDateData}
                                            setThuDateData={setThuDateData}
                                        ></AfterThudayComponent>
                                        <AfterFridayComponent
                                            startDate={startDate}
                                            friDateData={friDateData}
                                            setFriDateData={setFriDateData}
                                        ></AfterFridayComponent>
                                        <AfterSatdayComponent
                                            startDate={startDate}
                                            satDateData={satDateData}
                                            setSatDateData={setSatDateData}
                                        ></AfterSatdayComponent>
                                        <AfterSundayComponent
                                            startDate={startDate}
                                            sunDateData={sunDateData}
                                            setSunDateData={setSunDateData}
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
            <div className="fasfdasfas">
                {printerClicked ? (
                    <PrinterAfterSelectClickModal
                        printerClicked={printerClicked}
                        clicksData={clicksData}
                        setPrinterClicked={data => setPrinterClicked(data)}
                    ></PrinterAfterSelectClickModal>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
};

export default AfterOtWriteMainPage;

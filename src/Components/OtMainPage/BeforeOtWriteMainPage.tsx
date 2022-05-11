import React, { useEffect, useState, useRef } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import moment from 'moment';
import ko from 'date-fns/locale/ko';
import axios from 'axios';
import { toast } from '../ToastMessage/ToastManager';
import { useSelector } from 'react-redux';
import { RootState } from '../../models/index';
import { DecryptKey } from '../../config';
import PrinterBeforeSelectClickModal from '../SelectClickModal/OT/PrinterBeforeSelectClickModal';
// @ts-ignore
import TimePickerWrapper from 'react-times';

// const TimePickerWrapper = require('react-times');
// declare module "react-times";
// use material theme
import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css';
import BeforeOtTeamLeaderFinish from './OTTeamLeaderCheckFinish/BeforeOtTeamLeaderFinish';

registerLocale('ko', ko);

type WeekBeforeOTWorkSpaceProps = {
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
};
const BeforeOtWriteMainPage = ({ startDate, endDate, setStartDate, setEndDate }: WeekBeforeOTWorkSpaceProps) => {
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
    };
    const [printerClicked, setPrinterClicked] = useState(false);
    const [clicksData, setClicksData] = useState({});
    const TimeOverCheck = useRef<any>();
    const [leaderCheck, setLeaderCheck] = useState(false);
    const [loading, setLoading] = useState(false);
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const [monDateData, setMonDateData] = useState<WeekInfomDataTypes>(initialState);
    const [tueDateData, setTueDateData] = useState<WeekInfomDataTypes>(initialState);
    const [wedDateData, setWedDateData] = useState<WeekInfomDataTypes>(initialState);
    const [thuDateData, setThuDateData] = useState<WeekInfomDataTypes>(initialState);
    const [friDateData, setFriDateData] = useState<WeekInfomDataTypes>(initialState);
    const [satDateData, setSatDateData] = useState<WeekInfomDataTypes>(initialState);
    const [sunDateData, setSunDateData] = useState<WeekInfomDataTypes>(initialState);

    //사전 OT 데이터 불러오기
    const getDataOTData = async () => {
        setLoading(true);
        const getServerOTDataCheck = await axios.post(`${process.env.REACT_APP_API_URL}/OT_app_server/NewBeforeOT_get_some_data`, {
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
                OTRestTime: getServerOTDataCheck.data.data[0].mon_rest,
                OTSumTime: getServerOTDataCheck.data.data[0].mon_time,
                OTreason1: getServerOTDataCheck.data.data[0].mon_reason,
                OTreason2: getServerOTDataCheck.data.data[0].mon_reason1,
                OTreason3: getServerOTDataCheck.data.data[0].mon_reason2,
                holidayCheck: 'weekday',
                OTnightSum: getServerOTDataCheck.data.data[0].mon_night,
            });
            setTueDateData({
                clickDate: startDate.clone().format('YYYY-MM-DD'),
                basicStartTime: getServerOTDataCheck.data.data[0].basic_tue_start_time,
                basicEndTime: getServerOTDataCheck.data.data[0].basic_tue_end_time,
                basicSumTime: getServerOTDataCheck.data.data[0].basic_tue_sum_time,
                OTStartTime: getServerOTDataCheck.data.data[0].start_time_tue,
                OTEndTime: getServerOTDataCheck.data.data[0].end_time_tue,
                OTRestTime: getServerOTDataCheck.data.data[0].tue_rest,
                OTSumTime: getServerOTDataCheck.data.data[0].tue_time,
                OTreason1: getServerOTDataCheck.data.data[0].tue_reason,
                OTreason2: getServerOTDataCheck.data.data[0].tue_reason1,
                OTreason3: getServerOTDataCheck.data.data[0].tue_reason2,
                holidayCheck: 'weekday',
                OTnightSum: getServerOTDataCheck.data.data[0].tue_night,
            });
            setWedDateData({
                clickDate: startDate.clone().format('YYYY-MM-DD'),
                basicStartTime: getServerOTDataCheck.data.data[0].basic_wed_start_time,
                basicEndTime: getServerOTDataCheck.data.data[0].basic_wed_end_time,
                basicSumTime: getServerOTDataCheck.data.data[0].basic_wed_sum_time,
                OTStartTime: getServerOTDataCheck.data.data[0].start_time_wed,
                OTEndTime: getServerOTDataCheck.data.data[0].end_time_wed,
                OTRestTime: getServerOTDataCheck.data.data[0].wed_rest,
                OTSumTime: getServerOTDataCheck.data.data[0].wed_time,
                OTreason1: getServerOTDataCheck.data.data[0].wed_reason,
                OTreason2: getServerOTDataCheck.data.data[0].wed_reason1,
                OTreason3: getServerOTDataCheck.data.data[0].wed_reason2,
                holidayCheck: 'weekday',
                OTnightSum: getServerOTDataCheck.data.data[0].wed_night,
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
            });
            setSatDateData({
                clickDate: startDate.clone().format('YYYY-MM-DD'),
                basicStartTime: '09:00',
                basicEndTime: '18:00',
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
            });
            setSunDateData({
                clickDate: startDate.clone().format('YYYY-MM-DD'),
                basicStartTime: getServerOTDataCheck.data.data[0].basic_sun_start_time,
                basicEndTime: getServerOTDataCheck.data.data[0].basic_sun_end_time,
                basicSumTime: getServerOTDataCheck.data.data[0].basic_sun_sum_time,
                OTStartTime: getServerOTDataCheck.data.data[0].start_time_sun,
                OTEndTime: getServerOTDataCheck.data.data[0].end_time_sun,
                OTRestTime: getServerOTDataCheck.data.data[0].sun_rest === '0' ? '00:00' : getServerOTDataCheck.data.data[0].sun_rest,
                OTSumTime: getServerOTDataCheck.data.data[0].sun_time,
                OTreason1: getServerOTDataCheck.data.data[0].sun_reason,
                OTreason2: getServerOTDataCheck.data.data[0].sun_reason1,
                OTreason3: getServerOTDataCheck.data.data[0].sun_reason2,
                holidayCheck: 'weekday',
                OTnightSum: getServerOTDataCheck.data.data[0].sun_night,
            });
            setLoading(false);
        } else {
            setMonDateData(initialState);
            setTueDateData(initialState);
            setWedDateData(initialState);
            setThuDateData(initialState);
            setFriDateData(initialState);
            setSatDateData(initialState);
            setSunDateData(initialState);
            setLoading(false);
        }
    };
    useEffect(() => {
        getDataOTData();
        toast.show({
            title: '효율적인 근무시간 관리로 초과근로를 최소화 합시다.',
            content: '초과근로 신청 사유는 구체적이고 명확하게 작성하여 주십시오.',
            duration: 3000,
            DataSuccess: false,
        });
    }, []);

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
        try {
            const dataSendServerOT = await axios.post(`${process.env.REACT_APP_API_URL}/OT_app_server/NewBeforeOT_send_Data`, {
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
                    title: '사전 OT 데이터 저장 성공 ',
                    content: '사전 OT 데이터가 서버에 성공적으로 저장 되었습니다.',
                    duration: 6000,
                    DataSuccess: true,
                });
            } else {
                toast.show({
                    title: '에러발생. 데이터 저장 실패.',
                    content: '사전 OT 데이터 저장 실패. IT팀에 문의 바랍니다.',
                    duration: 6000,
                    DataSuccess: false,
                });
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: '에러발생. ',
                content: 'server와의 연결 끊김. 에러 코드 사전 OT_1 발생.',
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
        <div className="WeekAfterOTWorkSpace_big_div" style={{ marginTop: '20px' }} ref={TimeOverCheck}>
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
                        <BeforeOtTeamLeaderFinish
                            printerClicked={printerClicked}
                            startDate={startDate}
                            monDateData={monDateData}
                            tueDateData={tueDateData}
                            wedDateData={wedDateData}
                            thuDateData={thuDateData}
                            friDateData={friDateData}
                            satDateData={satDateData}
                            sunDateData={sunDateData}
                        ></BeforeOtTeamLeaderFinish>
                    ) : (
                        <table>
                            <thead style={{ backgroundColor: '#f7c80e' }}>
                                <tr
                                    className="testssBefore"
                                    style={{
                                        borderTop: '1.5px solid black',
                                        borderLeft: '1.3px solid black',
                                        borderRight: '1.3px solid black',
                                        backgroundColor: '#f7c80e',
                                    }}
                                >
                                    <th rowSpan={2} style={{ borderRight: '1.2px solid black', backgroundColor: '#f7c80e' }}>
                                        일자
                                    </th>
                                    <th rowSpan={2} style={{ borderRight: '1.2px solid black', backgroundColor: '#f7c80e' }}>
                                        공휴일
                                    </th>
                                    <th
                                        colSpan={3}
                                        style={{
                                            borderRight: '1.2px solid black',
                                            borderBottom: '1.2px solid black',
                                            backgroundColor: '#f7c80e',
                                        }}
                                    >
                                        소정근로
                                    </th>
                                    <th
                                        colSpan={4}
                                        style={{
                                            borderRight: '1.2px solid black',
                                            borderBottom: '1.2px solid black',
                                            backgroundColor: '#f7c80e',
                                        }}
                                    >
                                        {' '}
                                        연장 근무
                                    </th>
                                    <th rowSpan={2} style={{ borderRight: '1.2px solid black', backgroundColor: '#f7c80e' }}>
                                        총 근무 <br />
                                        합계 시간
                                        <br />
                                    </th>
                                    <th rowSpan={2} style={{ backgroundColor: '#f7c80e' }} className="OTSpace_OTReason_th">
                                        연장 사유
                                    </th>
                                </tr>
                                <tr
                                    className="testssBefore"
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
                                <tr>
                                    <td rowSpan={3} id="stat_date" width="100px">
                                        {startDate.clone().format('YYYY-MM-DD')}
                                        <br />
                                        월요일
                                    </td>

                                    <td rowSpan={3} width="100px" style={{ textAlign: 'start', paddingLeft: '10px' }}>
                                        <label htmlFor="mon_holiday_check">
                                            <input
                                                type="radio"
                                                id="mon_holiday_check"
                                                name="mon_holiday_check"
                                                value="weekday"
                                                readOnly
                                                onChange={() => {
                                                    setMonDateData({ ...monDateData, holidayCheck: 'weekday' });
                                                }}
                                                checked={monDateData.holidayCheck === 'weekday' ? true : false}
                                            ></input>
                                            평일
                                        </label>
                                        <br />

                                        <label htmlFor="mon_holiday_check">
                                            <input
                                                type="radio"
                                                id="mon_holiday_check"
                                                name="mon_holiday_check"
                                                value="holiday"
                                                readOnly
                                                onChange={() => {
                                                    setMonDateData({ ...monDateData, holidayCheck: 'holiday' });
                                                }}
                                                checked={monDateData.holidayCheck === 'holiday' ? true : false}
                                            ></input>
                                            공휴일
                                        </label>
                                    </td>
                                    <td rowSpan={3} width="100px">
                                        <TimePickerWrapper
                                            theme="classic"
                                            timeFormat="HH:MM"
                                            time={monDateData.basicStartTime}
                                            onTimeChange={(options: any) =>
                                                setMonDateData({ ...monDateData, basicStartTime: `${options.hour}:${options.minute}` })
                                            }
                                        ></TimePickerWrapper>
                                    </td>
                                    <td rowSpan={3} width="100px">
                                        <TimePickerWrapper
                                            theme="classic"
                                            timeFormat="HH:MM"
                                            time={monDateData.basicEndTime}
                                            onTimeChange={(options: any) =>
                                                setMonDateData({ ...monDateData, basicEndTime: `${options.hour}:${options.minute}` })
                                            }
                                        ></TimePickerWrapper>
                                    </td>
                                    <td rowSpan={3} width="100px">
                                        <span className="sum_time" id="sum_time_mon">
                                            {monDateData.basicSumTime}
                                        </span>
                                        시간
                                    </td>

                                    <td rowSpan={3} width="100px">
                                        <TimePickerWrapper
                                            theme="classic"
                                            timeFormat="HH:MM"
                                            time={monDateData.OTStartTime}
                                            onTimeChange={(options: any) =>
                                                setMonDateData({ ...monDateData, OTStartTime: `${options.hour}:${options.minute}` })
                                            }
                                        ></TimePickerWrapper>
                                    </td>
                                    <td rowSpan={3} width="100px">
                                        <TimePickerWrapper
                                            theme="classic"
                                            timeFormat="HH:MM"
                                            time={monDateData.OTEndTime}
                                            onTimeChange={(options: any) =>
                                                setMonDateData({ ...monDateData, OTEndTime: `${options.hour}:${options.minute}` })
                                            }
                                        ></TimePickerWrapper>
                                    </td>
                                    <td rowSpan={3} width="100px">
                                        <TimePickerWrapper
                                            theme="classic"
                                            timeFormat="HH:MM"
                                            time={monDateData.OTRestTime}
                                            onTimeChange={(options: any) =>
                                                setMonDateData({ ...monDateData, OTRestTime: `${options.hour}:${options.minute}` })
                                            }
                                        ></TimePickerWrapper>
                                    </td>
                                    <td rowSpan={3} width="100px">
                                        <span className="sum_over_time" id="sum_over_time_monOver">
                                            {monDateData.OTSumTime}
                                        </span>
                                        시간
                                    </td>
                                    <td rowSpan={3} width="100px">
                                        <span id="sum_times_mon"> {monDateData.basicSumTime + monDateData.OTSumTime}</span> 시간
                                    </td>

                                    <td className="reasontable">
                                        <textarea
                                            placeholder="사유1"
                                            value={monDateData.OTreason1}
                                            onChange={e => setMonDateData({ ...monDateData, OTreason1: e.target.value })}
                                        ></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reasontable">
                                        <textarea
                                            placeholder="사유2"
                                            value={monDateData.OTreason2}
                                            onChange={e => setMonDateData({ ...monDateData, OTreason2: e.target.value })}
                                        ></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reasontable">
                                        <textarea
                                            placeholder="사유3"
                                            value={monDateData.OTreason3}
                                            onChange={e => setMonDateData({ ...monDateData, OTreason3: e.target.value })}
                                        ></textarea>
                                    </td>
                                </tr>

                                <tr>
                                    <td rowSpan={3} style={{ minWidth: '100px' }}>
                                        {startDate.clone().add(1, 'day').format('YYYY-MM-DD')}
                                        <br />
                                        화요일
                                    </td>

                                    <td rowSpan={3} width="100px" style={{ textAlign: 'start', paddingLeft: '10px' }}>
                                        <label htmlFor="tue_holiday_check">
                                            <input
                                                type="radio"
                                                id="tue_holiday_check"
                                                name="tue_holiday_check"
                                                value="weekday"
                                                readOnly
                                                onChange={() => {
                                                    setTueDateData({ ...tueDateData, holidayCheck: 'weekday' });
                                                }}
                                                checked={tueDateData.holidayCheck === 'weekday' ? true : false}
                                            ></input>
                                            평일
                                        </label>
                                        <br />
                                        <label htmlFor="tue_holiday_check">
                                            <input
                                                type="radio"
                                                id="tue_holiday_check"
                                                name="tue_holiday_check"
                                                value="holiday"
                                                readOnly
                                                onChange={() => {
                                                    setTueDateData({ ...tueDateData, holidayCheck: 'holiday' });
                                                }}
                                                checked={tueDateData.holidayCheck === 'holiday' ? true : false}
                                            ></input>
                                            공휴일
                                        </label>
                                    </td>
                                    <td rowSpan={3}>
                                        <TimePickerWrapper
                                            theme="classic"
                                            timeFormat="HH:MM"
                                            time={tueDateData.basicStartTime}
                                            onTimeChange={(options: any) =>
                                                setTueDateData({ ...tueDateData, basicStartTime: `${options.hour}:${options.minute}` })
                                            }
                                        ></TimePickerWrapper>
                                    </td>
                                    <td rowSpan={3}>
                                        <TimePickerWrapper
                                            theme="classic"
                                            timeFormat="HH:MM"
                                            time={tueDateData.basicEndTime}
                                            onTimeChange={(options: any) =>
                                                setTueDateData({ ...tueDateData, basicEndTime: `${options.hour}:${options.minute}` })
                                            }
                                        ></TimePickerWrapper>
                                    </td>
                                    <td rowSpan={3}>
                                        <span className="sum_time" id="sum_time_tue">
                                            {tueDateData.basicSumTime}
                                        </span>{' '}
                                        시간
                                    </td>

                                    <td rowSpan={3}>
                                        <TimePickerWrapper
                                            theme="classic"
                                            timeFormat="HH:MM"
                                            time={tueDateData.OTStartTime}
                                            onTimeChange={(options: any) =>
                                                setTueDateData({ ...tueDateData, OTStartTime: `${options.hour}:${options.minute}` })
                                            }
                                        ></TimePickerWrapper>
                                    </td>
                                    <td rowSpan={3}>
                                        <TimePickerWrapper
                                            theme="classic"
                                            timeFormat="HH:MM"
                                            time={tueDateData.OTEndTime}
                                            onTimeChange={(options: any) =>
                                                setTueDateData({ ...tueDateData, OTEndTime: `${options.hour}:${options.minute}` })
                                            }
                                        ></TimePickerWrapper>
                                    </td>
                                    <td rowSpan={3}>
                                        <TimePickerWrapper
                                            theme="classic"
                                            timeFormat="HH:MM"
                                            time={tueDateData.OTRestTime}
                                            onTimeChange={(options: any) =>
                                                setTueDateData({ ...tueDateData, OTRestTime: `${options.hour}:${options.minute}` })
                                            }
                                        ></TimePickerWrapper>
                                    </td>
                                    <td rowSpan={3}>
                                        <span className="sum_over_time" id="sum_over_time_tueOver">
                                            {tueDateData.OTSumTime}
                                        </span>{' '}
                                        시간
                                    </td>
                                    <td rowSpan={3}>
                                        <span id="sum_times_tue">{tueDateData.basicSumTime + tueDateData.OTSumTime}</span> 시간
                                    </td>
                                    <td className="reasontable">
                                        <textarea
                                            placeholder="사유1"
                                            value={tueDateData.OTreason1}
                                            onChange={e => setTueDateData({ ...tueDateData, OTreason1: e.target.value })}
                                        ></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reasontable">
                                        <textarea
                                            placeholder="사유2"
                                            value={tueDateData.OTreason2}
                                            onChange={e => setTueDateData({ ...tueDateData, OTreason2: e.target.value })}
                                        ></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reasontable">
                                        <textarea
                                            placeholder="사유3"
                                            value={tueDateData.OTreason3}
                                            onChange={e => setTueDateData({ ...tueDateData, OTreason3: e.target.value })}
                                        ></textarea>
                                    </td>
                                </tr>

                                <tr>
                                    <td rowSpan={3}>
                                        {startDate.clone().add(2, 'day').format('YYYY-MM-DD')}
                                        <br />
                                        수요일
                                    </td>
                                    <td rowSpan={3} width="100px" style={{ textAlign: 'start', paddingLeft: '10px' }}>
                                        <label htmlFor="wed_holiday_check">
                                            <input
                                                type="radio"
                                                id="wed_holiday_check"
                                                name="wed_holiday_check"
                                                value="weekday"
                                                readOnly
                                                onChange={() => {
                                                    setWedDateData({ ...wedDateData, holidayCheck: 'weekday' });
                                                }}
                                                checked={wedDateData.holidayCheck === 'weekday' ? true : false}
                                            ></input>
                                            평일
                                        </label>
                                        <br />
                                        <label htmlFor="wed_holiday_check">
                                            <input
                                                type="radio"
                                                id="wed_holiday_check"
                                                name="wed_holiday_check"
                                                value="holiday"
                                                readOnly
                                                onChange={() => {
                                                    setWedDateData({ ...wedDateData, holidayCheck: 'holiday' });
                                                }}
                                                checked={wedDateData.holidayCheck === 'holiday' ? true : false}
                                            ></input>
                                            공휴일
                                        </label>
                                    </td>
                                    <td rowSpan={3}>
                                        <TimePickerWrapper
                                            theme="classic"
                                            timeFormat="HH:MM"
                                            time={wedDateData.basicStartTime}
                                            onTimeChange={(options: any) =>
                                                setWedDateData({ ...wedDateData, basicStartTime: `${options.hour}:${options.minute}` })
                                            }
                                        ></TimePickerWrapper>
                                    </td>
                                    <td rowSpan={3}>
                                        <TimePickerWrapper
                                            theme="classic"
                                            timeFormat="HH:MM"
                                            time={wedDateData.basicEndTime}
                                            onTimeChange={(options: any) =>
                                                setWedDateData({ ...wedDateData, basicEndTime: `${options.hour}:${options.minute}` })
                                            }
                                        ></TimePickerWrapper>
                                    </td>
                                    <td rowSpan={3}>
                                        <span className="sum_time" id="sum_time_wed">
                                            {wedDateData.basicSumTime}
                                        </span>{' '}
                                        시간
                                    </td>

                                    <td rowSpan={3}>
                                        <TimePickerWrapper
                                            theme="classic"
                                            timeFormat="HH:MM"
                                            time={wedDateData.OTStartTime}
                                            onTimeChange={(options: any) =>
                                                setWedDateData({ ...wedDateData, OTStartTime: `${options.hour}:${options.minute}` })
                                            }
                                        ></TimePickerWrapper>
                                    </td>
                                    <td rowSpan={3}>
                                        <TimePickerWrapper
                                            theme="classic"
                                            timeFormat="HH:MM"
                                            time={wedDateData.OTEndTime}
                                            onTimeChange={(options: any) =>
                                                setWedDateData({ ...wedDateData, OTEndTime: `${options.hour}:${options.minute}` })
                                            }
                                        ></TimePickerWrapper>
                                    </td>
                                    <td rowSpan={3}>
                                        <TimePickerWrapper
                                            theme="classic"
                                            timeFormat="HH:MM"
                                            time={wedDateData.OTRestTime}
                                            onTimeChange={(options: any) =>
                                                setWedDateData({ ...wedDateData, OTRestTime: `${options.hour}:${options.minute}` })
                                            }
                                        ></TimePickerWrapper>
                                    </td>
                                    <td rowSpan={3}>
                                        <span className="sum_over_time" id="sum_over_time_wedOver">
                                            {wedDateData.OTSumTime}
                                        </span>{' '}
                                        시간
                                    </td>
                                    <td rowSpan={3}>
                                        <span id="sum_times_wed">{wedDateData.basicSumTime + wedDateData.OTSumTime}</span> 시간
                                    </td>
                                    <td className="reasontable">
                                        <textarea
                                            placeholder="사유1"
                                            name="Wed_reason"
                                            value={wedDateData.OTreason1}
                                            onChange={e => setWedDateData({ ...wedDateData, OTreason1: e.target.value })}
                                        ></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reasontable">
                                        <textarea
                                            placeholder="사유2"
                                            name="Wed_reason1"
                                            value={wedDateData.OTreason2}
                                            onChange={e => setWedDateData({ ...wedDateData, OTreason2: e.target.value })}
                                        ></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reasontable">
                                        <textarea
                                            placeholder="사유3"
                                            name="Wed_reason2"
                                            value={wedDateData.OTreason3}
                                            onChange={e => setWedDateData({ ...wedDateData, OTreason3: e.target.value })}
                                        >
                                            {' '}
                                        </textarea>
                                    </td>
                                </tr>

                                <tr>
                                    <td rowSpan={3}>
                                        {startDate.clone().add(3, 'day').format('YYYY-MM-DD')}
                                        <br />
                                        목요일
                                    </td>
                                    <td rowSpan={3} width="100px" style={{ textAlign: 'start', paddingLeft: '10px' }}>
                                        <label htmlFor="thu_holiday_check">
                                            <input
                                                type="radio"
                                                id="thu_holiday_check"
                                                name="thu_holiday_check"
                                                value="weekday"
                                                readOnly
                                                onChange={() => {
                                                    setThuDateData({ ...thuDateData, holidayCheck: 'weekday' });
                                                }}
                                                checked={thuDateData.holidayCheck === 'weekday' ? true : false}
                                            ></input>
                                            평일
                                        </label>
                                        <br />
                                        <label htmlFor="thu_holiday_check">
                                            <input
                                                type="radio"
                                                id="thu_holiday_check"
                                                name="thu_holiday_check"
                                                value="holiday"
                                                readOnly
                                                onChange={() => {
                                                    setThuDateData({ ...thuDateData, holidayCheck: 'holiday' });
                                                }}
                                                checked={thuDateData.holidayCheck === 'holiday' ? true : false}
                                            ></input>
                                            공휴일
                                        </label>
                                    </td>
                                    <td rowSpan={3}>
                                        <TimePickerWrapper
                                            theme="classic"
                                            timeFormat="HH:MM"
                                            time={thuDateData.basicStartTime}
                                            onTimeChange={(options: any) =>
                                                setThuDateData({ ...thuDateData, basicStartTime: `${options.hour}:${options.minute}` })
                                            }
                                        ></TimePickerWrapper>
                                    </td>
                                    <td rowSpan={3}>
                                        <TimePickerWrapper
                                            theme="classic"
                                            timeFormat="HH:MM"
                                            time={thuDateData.basicEndTime}
                                            onTimeChange={(options: any) =>
                                                setThuDateData({ ...thuDateData, basicEndTime: `${options.hour}:${options.minute}` })
                                            }
                                        ></TimePickerWrapper>
                                    </td>
                                    <td rowSpan={3}>
                                        <span className="sum_time" id="sum_time_thu">
                                            {thuDateData.basicSumTime}
                                        </span>{' '}
                                        시간
                                    </td>

                                    <td rowSpan={3}>
                                        <TimePickerWrapper
                                            theme="classic"
                                            timeFormat="HH:MM"
                                            time={thuDateData.OTStartTime}
                                            onTimeChange={(options: any) =>
                                                setThuDateData({ ...thuDateData, OTStartTime: `${options.hour}:${options.minute}` })
                                            }
                                        ></TimePickerWrapper>
                                    </td>
                                    <td rowSpan={3}>
                                        <TimePickerWrapper
                                            theme="classic"
                                            timeFormat="HH:MM"
                                            time={thuDateData.OTEndTime}
                                            onTimeChange={(options: any) =>
                                                setThuDateData({ ...thuDateData, OTEndTime: `${options.hour}:${options.minute}` })
                                            }
                                        ></TimePickerWrapper>
                                    </td>
                                    <td rowSpan={3}>
                                        <TimePickerWrapper
                                            theme="classic"
                                            timeFormat="HH:MM"
                                            time={thuDateData.OTRestTime}
                                            onTimeChange={(options: any) =>
                                                setThuDateData({ ...thuDateData, OTRestTime: `${options.hour}:${options.minute}` })
                                            }
                                        ></TimePickerWrapper>
                                    </td>
                                    <td rowSpan={3}>
                                        <span className="sum_over_time" id="sum_over_time_thuOver">
                                            {thuDateData.OTSumTime}
                                        </span>{' '}
                                        시간
                                    </td>
                                    <td rowSpan={3}>
                                        <span id="sum_times_thu">{thuDateData.basicSumTime + thuDateData.OTSumTime}</span> 시간
                                    </td>
                                    <td className="reasontable">
                                        <textarea
                                            placeholder="사유1"
                                            name="Thu_reason"
                                            value={thuDateData.OTreason1}
                                            onChange={e => setThuDateData({ ...thuDateData, OTreason1: e.target.value })}
                                        ></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reasontable">
                                        <textarea
                                            placeholder="사유2"
                                            name="Thu_reason1"
                                            value={thuDateData.OTreason2}
                                            onChange={e => setThuDateData({ ...thuDateData, OTreason2: e.target.value })}
                                        ></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reasontable">
                                        <textarea
                                            placeholder="사유3"
                                            name="Thu_reason2"
                                            value={thuDateData.OTreason3}
                                            onChange={e => setThuDateData({ ...thuDateData, OTreason3: e.target.value })}
                                        ></textarea>
                                    </td>
                                </tr>

                                <tr>
                                    <td rowSpan={3}>
                                        {startDate.clone().add(4, 'day').format('YYYY-MM-DD')}
                                        <br />
                                        금요일
                                    </td>

                                    <td rowSpan={3} width="100px" style={{ textAlign: 'start', paddingLeft: '10px' }}>
                                        <label htmlFor="fri_holiday_check">
                                            <input
                                                type="radio"
                                                id="fri_holiday_check"
                                                name="fri_holiday_check"
                                                value="weekday"
                                                readOnly
                                                onChange={() => {
                                                    setFriDateData({ ...friDateData, holidayCheck: 'weekday' });
                                                }}
                                                checked={friDateData.holidayCheck === 'weekday' ? true : false}
                                            ></input>
                                            평일
                                        </label>
                                        <br />
                                        <label htmlFor="fri_holiday_check">
                                            <input
                                                type="radio"
                                                id="fri_holiday_check"
                                                name="fri_holiday_check"
                                                value="holiday"
                                                readOnly
                                                onChange={() => {
                                                    setFriDateData({ ...friDateData, holidayCheck: 'holiday' });
                                                }}
                                                checked={friDateData.holidayCheck === 'holiday' ? true : false}
                                            ></input>
                                            공휴일
                                        </label>
                                    </td>
                                    <td rowSpan={3}>
                                        <TimePickerWrapper
                                            theme="classic"
                                            timeFormat="HH:MM"
                                            time={friDateData.basicStartTime}
                                            onTimeChange={(options: any) =>
                                                setFriDateData({ ...friDateData, basicStartTime: `${options.hour}:${options.minute}` })
                                            }
                                        ></TimePickerWrapper>
                                    </td>
                                    <td rowSpan={3}>
                                        <TimePickerWrapper
                                            theme="classic"
                                            timeFormat="HH:MM"
                                            time={friDateData.basicEndTime}
                                            onTimeChange={(options: any) =>
                                                setFriDateData({ ...friDateData, basicEndTime: `${options.hour}:${options.minute}` })
                                            }
                                        ></TimePickerWrapper>
                                    </td>
                                    <td rowSpan={3}>
                                        <span className="sum_time" id="sum_time_fri">
                                            {friDateData.basicSumTime}
                                        </span>{' '}
                                        시간
                                    </td>

                                    <td rowSpan={3}>
                                        <TimePickerWrapper
                                            theme="classic"
                                            timeFormat="HH:MM"
                                            time={friDateData.OTStartTime}
                                            onTimeChange={(options: any) =>
                                                setFriDateData({ ...friDateData, OTStartTime: `${options.hour}:${options.minute}` })
                                            }
                                        ></TimePickerWrapper>
                                    </td>
                                    <td rowSpan={3}>
                                        <TimePickerWrapper
                                            theme="classic"
                                            timeFormat="HH:MM"
                                            time={friDateData.OTEndTime}
                                            onTimeChange={(options: any) =>
                                                setFriDateData({ ...friDateData, OTEndTime: `${options.hour}:${options.minute}` })
                                            }
                                        ></TimePickerWrapper>
                                    </td>
                                    <td rowSpan={3}>
                                        <TimePickerWrapper
                                            theme="classic"
                                            timeFormat="HH:MM"
                                            time={friDateData.OTRestTime}
                                            onTimeChange={(options: any) =>
                                                setFriDateData({ ...friDateData, OTRestTime: `${options.hour}:${options.minute}` })
                                            }
                                        ></TimePickerWrapper>
                                    </td>
                                    <td rowSpan={3}>
                                        <span className="sum_over_time" id="sum_over_time_friOver">
                                            {friDateData.OTSumTime}
                                        </span>{' '}
                                        시간
                                    </td>
                                    <td rowSpan={3}>
                                        <span id="sum_times_fri">{friDateData.basicSumTime + friDateData.OTSumTime}</span> 시간
                                    </td>
                                    <td className="reasontable">
                                        <textarea
                                            placeholder="사유1"
                                            name="Fri_reason"
                                            value={friDateData.OTreason1}
                                            onChange={e => setFriDateData({ ...friDateData, OTreason1: e.target.value })}
                                        ></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reasontable">
                                        <textarea
                                            placeholder="사유2"
                                            name="Fri_reason1"
                                            value={friDateData.OTreason2}
                                            onChange={e => setFriDateData({ ...friDateData, OTreason2: e.target.value })}
                                        ></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reasontable">
                                        <textarea
                                            placeholder="사유3"
                                            name="Fri_reason2"
                                            value={friDateData.OTreason3}
                                            onChange={e => setFriDateData({ ...friDateData, OTreason3: e.target.value })}
                                        ></textarea>
                                    </td>
                                </tr>

                                <tr>
                                    <td rowSpan={3}>
                                        {startDate.clone().add(5, 'day').format('YYYY-MM-DD')}
                                        <br />
                                        토요일
                                    </td>

                                    <td rowSpan={3}></td>
                                    <td rowSpan={3}></td>
                                    <td rowSpan={3}></td>
                                    <td rowSpan={3}></td>

                                    <td rowSpan={3}>
                                        <TimePickerWrapper
                                            theme="classic"
                                            timeFormat="HH:MM"
                                            time={satDateData.OTStartTime}
                                            onTimeChange={(options: any) =>
                                                setSatDateData({ ...satDateData, OTStartTime: `${options.hour}:${options.minute}` })
                                            }
                                        ></TimePickerWrapper>
                                    </td>
                                    <td rowSpan={3}>
                                        <TimePickerWrapper
                                            theme="classic"
                                            timeFormat="HH:MM"
                                            time={satDateData.OTEndTime}
                                            onTimeChange={(options: any) =>
                                                setSatDateData({ ...satDateData, OTEndTime: `${options.hour}:${options.minute}` })
                                            }
                                        ></TimePickerWrapper>
                                    </td>
                                    <td rowSpan={3}>
                                        <TimePickerWrapper
                                            theme="classic"
                                            timeFormat="HH:MM"
                                            time={satDateData.OTRestTime}
                                            onTimeChange={(options: any) =>
                                                setSatDateData({ ...satDateData, OTRestTime: `${options.hour}:${options.minute}` })
                                            }
                                        ></TimePickerWrapper>
                                    </td>
                                    <td rowSpan={3}>
                                        <span className="sum_over_time" id="sum_over_time_satOver">
                                            {satDateData.OTSumTime}
                                        </span>{' '}
                                        시간
                                    </td>
                                    <td rowSpan={3}>
                                        <span id="sum_times_sat">{satDateData.OTSumTime}</span> 시간
                                    </td>
                                    <td className="reasontable">
                                        <textarea
                                            placeholder="사유1"
                                            name="Sat_reason"
                                            value={satDateData.OTreason1}
                                            onChange={e => setSatDateData({ ...satDateData, OTreason1: e.target.value })}
                                        ></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reasontable">
                                        <textarea
                                            placeholder="사유2"
                                            name="Sat_reason1"
                                            value={satDateData.OTreason2}
                                            onChange={e => setSatDateData({ ...satDateData, OTreason2: e.target.value })}
                                        ></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reasontable">
                                        <textarea
                                            placeholder="사유3"
                                            name="Sat_reason2"
                                            value={satDateData.OTreason3}
                                            onChange={e => setSatDateData({ ...satDateData, OTreason3: e.target.value })}
                                        ></textarea>
                                    </td>
                                </tr>

                                <tr>
                                    <td rowSpan={3} id="stats_date">
                                        {startDate.clone().add(6, 'day').format('YYYY-MM-DD')}
                                        <br />
                                        일요일
                                    </td>

                                    <td rowSpan={3}></td>
                                    <td rowSpan={3}></td>
                                    <td rowSpan={3}></td>
                                    <td rowSpan={3}></td>

                                    <td rowSpan={3}>
                                        <TimePickerWrapper
                                            theme="classic"
                                            timeFormat="HH:MM"
                                            time={sunDateData.OTStartTime}
                                            onTimeChange={(options: any) =>
                                                setSunDateData({ ...sunDateData, OTStartTime: `${options.hour}:${options.minute}` })
                                            }
                                        ></TimePickerWrapper>
                                    </td>
                                    <td rowSpan={3}>
                                        <TimePickerWrapper
                                            theme="classic"
                                            timeFormat="HH:MM"
                                            time={sunDateData.OTEndTime}
                                            onTimeChange={(options: any) =>
                                                setSunDateData({ ...sunDateData, OTEndTime: `${options.hour}:${options.minute}` })
                                            }
                                        ></TimePickerWrapper>
                                    </td>
                                    <td rowSpan={3}>
                                        <TimePickerWrapper
                                            theme="classic"
                                            timeFormat="HH:MM"
                                            time={sunDateData.OTRestTime}
                                            onTimeChange={(options: any) =>
                                                setSunDateData({ ...sunDateData, OTRestTime: `${options.hour}:${options.minute}` })
                                            }
                                        ></TimePickerWrapper>
                                    </td>
                                    <td rowSpan={3}>
                                        <span className="sum_over_time" id="sum_over_time_sunOver">
                                            {sunDateData.OTSumTime}
                                        </span>{' '}
                                        시간
                                    </td>
                                    <td rowSpan={3}>
                                        <span id="sum_times_sun">{sunDateData.OTSumTime}</span> 시간
                                    </td>
                                    <td className="reasontable">
                                        <textarea
                                            placeholder="사유1"
                                            name="Sun_reason"
                                            value={sunDateData.OTreason1}
                                            onChange={e => setSunDateData({ ...sunDateData, OTreason1: e.target.value })}
                                        ></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reasontable">
                                        <textarea
                                            placeholder="사유2"
                                            name="Sun_reason1"
                                            value={sunDateData.OTreason2}
                                            onChange={e => setSunDateData({ ...sunDateData, OTreason2: e.target.value })}
                                        ></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reasontable">
                                        <textarea
                                            placeholder="사유3"
                                            name="Sun_reason2"
                                            value={sunDateData.OTreason3}
                                            onChange={e => setSunDateData({ ...sunDateData, OTreason3: e.target.value })}
                                        ></textarea>
                                    </td>
                                </tr>

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

                    {/* <div>
                <div className="WeekAfterOTWorkSpace_store_button_div">
                    <button onClick={handleStoreOTData}>저장하기</button>
                </div>
            </div> */}
                    <div style={{ marginBottom: '30px' }}>
                        {leaderCheck ? (
                            <div style={{ fontSize: 'x-large', margin: '30px' }}>
                                <div style={{ textAlign: 'end', marginRight: '30px' }}>팀장승인 완료</div>
                                <div style={{ marginTop: '30px', paddingBottom: '30px' }}>
                                    <button className="Printer_Button_overOT" onClick={handlePrinterClicks}>
                                        출력하기
                                    </button>
                                </div>
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
                    <PrinterBeforeSelectClickModal
                        printerClicked={printerClicked}
                        clicksData={clicksData}
                        setPrinterClicked={data => setPrinterClicked(data)}
                    ></PrinterBeforeSelectClickModal>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
};

export default BeforeOtWriteMainPage;

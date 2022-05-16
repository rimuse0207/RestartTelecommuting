import React, { useEffect, useState, useRef, useCallback } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import moment from 'moment';
import ko from 'date-fns/locale/ko';
import axios from 'axios';
import { toast } from '../ToastMessage/ToastManager';
import { useSelector } from 'react-redux';
import { RootState } from '../../models/index';
import { DecryptKey } from '../../config';
import PrinterBeforeSelectClickModal from '../SelectClickModal/OT/PrinterBeforeSelectClickModal';

import BeforeOtTeamLeaderFinish from './OTTeamLeaderCheckFinish/BeforeOtTeamLeaderFinish';
import BeforeMondayComponent from './OtWeekCompoents/BeforeComponents/BeforeMondayComponent';
import BeforeTuesdayComponent from './OtWeekCompoents/BeforeComponents/BeforeTuesdayComponent';
import BeforeWeddayComponent from './OtWeekCompoents/BeforeComponents/BeforeWeddayComponent';
import BeforeThudayComponent from './OtWeekCompoents/BeforeComponents/BeforeThudayComponent';
import BeforeFridayComponent from './OtWeekCompoents/BeforeComponents/BeforeFridayComponent';
import BeforeSatdayComponent from './OtWeekCompoents/BeforeComponents/BeforeSatdayComponent';
import BeforeSundayComponent from './OtWeekCompoents/BeforeComponents/BeforeSundayComponent';

import { TailSpin } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

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
    useEffect(() => {
        // getDataOTData();
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

    return (
        <div className="WeekAfterOTWorkSpace_big_div" style={{ marginTop: '20px' }} ref={TimeOverCheck}>
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
                    id={DecryptKey(InfomationState.id)}
                ></BeforeOtTeamLeaderFinish>
            ) : loading ? (
                <div style={{ marginLeft: '50px' }}>
                    <TailSpin color="#3d66ba" height={50} width={50}></TailSpin>
                </div>
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
                        <BeforeMondayComponent
                            monDateData={monDateData}
                            startDate={startDate}
                            setMonDateData={setMonDateData}
                        ></BeforeMondayComponent>
                        <BeforeTuesdayComponent
                            tueDateData={tueDateData}
                            startDate={startDate}
                            setTueDateData={setTueDateData}
                        ></BeforeTuesdayComponent>
                        <BeforeWeddayComponent
                            wedDateData={wedDateData}
                            startDate={startDate}
                            setWedDateData={setWedDateData}
                        ></BeforeWeddayComponent>
                        <BeforeThudayComponent
                            thuDateData={thuDateData}
                            startDate={startDate}
                            setThuDateData={setThuDateData}
                        ></BeforeThudayComponent>
                        <BeforeFridayComponent
                            friDateData={friDateData}
                            startDate={startDate}
                            setFriDateData={setFriDateData}
                        ></BeforeFridayComponent>
                        <BeforeSatdayComponent
                            satDateData={satDateData}
                            startDate={startDate}
                            setSatDateData={setSatDateData}
                        ></BeforeSatdayComponent>
                        <BeforeSundayComponent
                            sunDateData={sunDateData}
                            startDate={startDate}
                            setSunDateData={setSunDateData}
                        ></BeforeSundayComponent>
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
        </div>
    );
};

export default BeforeOtWriteMainPage;

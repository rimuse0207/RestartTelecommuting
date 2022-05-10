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
// @ts-ignore
import TimePickerWrapper from 'react-times';

// const TimePickerWrapper = require('react-times');
// declare module "react-times";
// use material theme
import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css';

registerLocale('ko', ko);

type WeekAfterOTWorkSpaceProps = {
    startDate: any;
    endDate: any;
    setStartDate: any;
    setEndDate: any;
};

const AfterOtWriteMainPage = ({ startDate, endDate, setStartDate, setEndDate }: WeekAfterOTWorkSpaceProps) => {
    const initialState = {
        clickDate: startDate.clone().format('YYYY-MM-DD'),
        basicStartTime: '09:00',
        basicEndTime: '18:00',
        basicSumTime: 9,
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
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const [leaderCheck, setLeaderCheck] = useState(false);
    const [loading, setLoading] = useState(false);
    const [monDateData, setMonDateData] = useState(initialState);
    const [tueDateData, setTueDateData] = useState(initialState);
    const [wedDateData, setWedDateData] = useState(initialState);
    const [thuDateData, setThuDateData] = useState(initialState);
    const [friDateData, setFriDateData] = useState(initialState);
    const [satDateData, setSatDateData] = useState(initialState);
    const [sunDateData, setSunDateData] = useState(initialState);

    //OT 데이터 불러오기
    const getDataOTData = async () => {
        setLoading(true);
        const getServerOTDataCheck = await axios.post(`${process.env.REACT_APP_API_URL}/OT_app_server/OT_get_some_data`, {
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
            });
            setLoading(false);
        } else {
            // setMonDateData(initialState);
            setTueDateData(initialState);
            setWedDateData(initialState);
            setThuDateData(initialState);
            setFriDateData(initialState);
            setSatDateData(initialState);
            setSunDateData(initialState);
            setLoading(false);
        }
    };

    //초기 렌더링 시 OT 데이터 불러오기 실행
    useEffect(() => {
        getDataOTData();
    }, []);

    /// 이건 뭐지?
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

    useEffect(() => {
        console.log(monDateData);
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
                // setMonDateData({
                //     ...monDateData,
                //     OTSumTime: startPlusEnd,
                //     OTRestTime: '00:00',
                //     basicSumTime: moment.duration(moment(monDateData.basicEndTime).diff(moment(monDateData.basicStartTime))).asHours() - 1,
                //     OTnightSum: nightTimeCal,
                // });
                setMonDateData({
                    ...monDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: '00:00',
                    basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours(),
                    OTnightSum: nightTimeCal,
                });
            } else {
                // setMonDateData({
                //     ...monDateData,
                //     OTSumTime: startPlusEnd - restPlusTime,
                //     basicSumTime: moment.duration(moment(monDateData.basicEndTime).diff(moment(monDateData.basicStartTime))).asHours() - 1,
                //     OTnightSum: nightTimeCal,
                // });
                setMonDateData({
                    ...monDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours(),
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
                // setMonDateData({
                //     ...monDateData,
                //     OTSumTime: startPlusEnd,
                //     OTRestTime: '00:00',
                //     basicSumTime: moment.duration(moment(monDateData.basicEndTime).diff(moment(monDateData.basicStartTime))).asHours() - 1,
                //     OTnightSum: nightTimeCal,
                // });

                setMonDateData({
                    ...monDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: '00:00',
                    basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours(),
                    OTnightSum: nightTimeCal,
                });
            } else {
                // setMonDateData({
                //     ...monDateData,
                //     OTSumTime: startPlusEnd - restPlusTime,
                //     basicSumTime: moment.duration(moment(monDateData.basicEndTime).diff(moment(monDateData.basicStartTime))).asHours() - 1,
                //     OTnightSum: nightTimeCal,
                // });
                setMonDateData({
                    ...monDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours(),
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
    useEffect(() => {
        let startPlusEnd = moment.duration(moment(tueDateData.OTEndTime).diff(moment(tueDateData.OTStartTime))).asHours();
        const restPlusTime = moment
            .duration(
                moment(tueDateData.OTRestTime).diff(
                    moment(moment(`${moment(tueDateData.OTRestTime).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm'))
                )
            )
            .asHours();

        const nightTime = moment
            .duration(
                moment(tueDateData.OTEndTime).diff(
                    moment(`${moment(tueDateData.OTEndTime).format('YYYY-MM-DD')} 22:00`).format('YYYY-MM-DD HH:mm')
                )
            )
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
                    basicSumTime: moment.duration(moment(tueDateData.basicEndTime).diff(moment(tueDateData.basicStartTime))).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setTueDateData({
                    ...tueDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(moment(tueDateData.basicEndTime).diff(moment(tueDateData.basicStartTime))).asHours() - 1,
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
                    basicSumTime: moment.duration(moment(tueDateData.basicEndTime).diff(moment(tueDateData.basicStartTime))).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setTueDateData({
                    ...tueDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(moment(tueDateData.basicEndTime).diff(moment(tueDateData.basicStartTime))).asHours() - 1,
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
    useEffect(() => {
        let startPlusEnd = moment.duration(moment(wedDateData.OTEndTime).diff(moment(wedDateData.OTStartTime))).asHours();
        const restPlusTime = moment
            .duration(
                moment(wedDateData.OTRestTime).diff(
                    moment(moment(`${moment(wedDateData.OTRestTime).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm'))
                )
            )
            .asHours();

        const nightTime = moment
            .duration(
                moment(wedDateData.OTEndTime).diff(
                    moment(`${moment(wedDateData.OTEndTime).format('YYYY-MM-DD')} 22:00`).format('YYYY-MM-DD HH:mm')
                )
            )
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
                    basicSumTime: moment.duration(moment(wedDateData.basicEndTime).diff(moment(wedDateData.basicStartTime))).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setWedDateData({
                    ...wedDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(moment(wedDateData.basicEndTime).diff(moment(wedDateData.basicStartTime))).asHours() - 1,
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
                    basicSumTime: moment.duration(moment(wedDateData.basicEndTime).diff(moment(wedDateData.basicStartTime))).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setWedDateData({
                    ...wedDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(moment(wedDateData.basicEndTime).diff(moment(wedDateData.basicStartTime))).asHours() - 1,
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

    useEffect(() => {
        let startPlusEnd = moment.duration(moment(thuDateData.OTEndTime).diff(moment(thuDateData.OTStartTime))).asHours();
        const restPlusTime = moment
            .duration(
                moment(thuDateData.OTRestTime).diff(
                    moment(moment(`${moment(thuDateData.OTRestTime).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm'))
                )
            )
            .asHours();

        const nightTime = moment
            .duration(
                moment(thuDateData.OTEndTime).diff(
                    moment(`${moment(thuDateData.OTEndTime).format('YYYY-MM-DD')} 22:00`).format('YYYY-MM-DD HH:mm')
                )
            )
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
                    basicSumTime: moment.duration(moment(thuDateData.basicEndTime).diff(moment(thuDateData.basicStartTime))).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setThuDateData({
                    ...thuDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(moment(thuDateData.basicEndTime).diff(moment(thuDateData.basicStartTime))).asHours() - 1,
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
                    basicSumTime: moment.duration(moment(thuDateData.basicEndTime).diff(moment(thuDateData.basicStartTime))).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setThuDateData({
                    ...thuDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(moment(thuDateData.basicEndTime).diff(moment(thuDateData.basicStartTime))).asHours() - 1,
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

    useEffect(() => {
        let startPlusEnd = moment.duration(moment(friDateData.OTEndTime).diff(moment(friDateData.OTStartTime))).asHours();
        const restPlusTime = moment
            .duration(
                moment(friDateData.OTRestTime).diff(
                    moment(moment(`${moment(friDateData.OTRestTime).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm'))
                )
            )
            .asHours();

        const nightTime = moment
            .duration(
                moment(friDateData.OTEndTime).diff(
                    moment(`${moment(friDateData.OTEndTime).format('YYYY-MM-DD')} 22:00`).format('YYYY-MM-DD HH:mm')
                )
            )
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
                    basicSumTime: moment.duration(moment(friDateData.basicEndTime).diff(moment(friDateData.basicStartTime))).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setFriDateData({
                    ...friDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(moment(friDateData.basicEndTime).diff(moment(friDateData.basicStartTime))).asHours() - 1,
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
                    basicSumTime: moment.duration(moment(friDateData.basicEndTime).diff(moment(friDateData.basicStartTime))).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setFriDateData({
                    ...friDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(moment(friDateData.basicEndTime).diff(moment(friDateData.basicStartTime))).asHours() - 1,
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

    useEffect(() => {
        let startPlusEnd = moment.duration(moment(satDateData.OTEndTime).diff(moment(satDateData.OTStartTime))).asHours();
        const restPlusTime = moment
            .duration(
                moment(satDateData.OTRestTime).diff(
                    moment(moment(`${moment(satDateData.OTRestTime).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm'))
                )
            )
            .asHours();

        const nightTime = moment
            .duration(
                moment(satDateData.OTEndTime).diff(
                    moment(`${moment(satDateData.OTEndTime).format('YYYY-MM-DD')} 22:00`).format('YYYY-MM-DD HH:mm')
                )
            )
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
                    basicSumTime: moment.duration(moment(satDateData.basicEndTime).diff(moment(satDateData.basicStartTime))).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setSatDateData({
                    ...satDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(moment(satDateData.basicEndTime).diff(moment(satDateData.basicStartTime))).asHours() - 1,
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
                    basicSumTime: moment.duration(moment(satDateData.basicEndTime).diff(moment(satDateData.basicStartTime))).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setSatDateData({
                    ...satDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(moment(satDateData.basicEndTime).diff(moment(satDateData.basicStartTime))).asHours() - 1,
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

    useEffect(() => {
        let startPlusEnd = moment.duration(moment(sunDateData.OTEndTime).diff(moment(sunDateData.OTStartTime))).asHours();
        const restPlusTime = moment
            .duration(
                moment(sunDateData.OTRestTime).diff(
                    moment(moment(`${moment(sunDateData.OTRestTime).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm'))
                )
            )
            .asHours();
        const nightTime = moment
            .duration(
                moment(sunDateData.OTEndTime).diff(
                    moment(`${moment(sunDateData.OTEndTime).format('YYYY-MM-DD')} 22:00`).format('YYYY-MM-DD HH:mm')
                )
            )
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
                    basicSumTime: moment.duration(moment(sunDateData.basicEndTime).diff(moment(sunDateData.basicStartTime))).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setSunDateData({
                    ...sunDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(moment(sunDateData.basicEndTime).diff(moment(sunDateData.basicStartTime))).asHours() - 1,
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
                    basicSumTime: moment.duration(moment(sunDateData.basicEndTime).diff(moment(sunDateData.basicStartTime))).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setSunDateData({
                    ...sunDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(moment(sunDateData.basicEndTime).diff(moment(sunDateData.basicStartTime))).asHours() - 1,
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
            const monDataSend = await axios.post(`${process.env.REACT_APP_API_URL}/OT_app_server/monDateData`, {
                id: DecryptKey(InfomationState.id),
                name: DecryptKey(InfomationState.name),
                team: InfomationState.team,
                position: InfomationState.position,
                monDateData,
            });
            const tueDataSend = await axios.post(`${process.env.REACT_APP_API_URL}/OT_app_server/tueDateData`, {
                id: DecryptKey(InfomationState.id),
                name: DecryptKey(InfomationState.name),
                team: InfomationState.team,
                position: InfomationState.position,
                tueDateData,
            });
            const wedDataSend = await axios.post(`${process.env.REACT_APP_API_URL}/OT_app_server/wedDateData`, {
                id: DecryptKey(InfomationState.id),
                name: DecryptKey(InfomationState.name),
                team: InfomationState.team,
                position: InfomationState.position,
                wedDateData,
            });
            const thuDataSend = await axios.post(`${process.env.REACT_APP_API_URL}/OT_app_server/thuDateData`, {
                id: DecryptKey(InfomationState.id),
                name: DecryptKey(InfomationState.name),
                team: InfomationState.team,
                position: InfomationState.position,
                thuDateData,
            });
            const friDataSend = await axios.post(`${process.env.REACT_APP_API_URL}/OT_app_server/friDateData`, {
                id: DecryptKey(InfomationState.id),
                name: DecryptKey(InfomationState.name),
                team: InfomationState.team,
                position: InfomationState.position,
                friDateData,
            });
            const satDataSend = await axios.post(`${process.env.REACT_APP_API_URL}/OT_app_server/satDateData`, {
                id: DecryptKey(InfomationState.id),
                name: DecryptKey(InfomationState.name),
                team: InfomationState.team,
                position: InfomationState.position,
                satDateData,
            });
            const sunDataSend = await axios.post(`${process.env.REACT_APP_API_URL}/OT_app_server/sunDateData`, {
                id: DecryptKey(InfomationState.id),
                name: DecryptKey(InfomationState.name),
                team: InfomationState.team,
                position: InfomationState.position,
                sunDateData,
            });
        } catch (error) {
            console.log(error);
        }

        try {
            const dataSendServerOT = await axios.post(`${process.env.REACT_APP_API_URL}/OT_app_server/OT_send_Data`, {
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
            alert('server와의 연결 끊김.');
            toast.show({
                title: 'Error발생.',
                content: 'server와의 연결 끊김. ErrorCode OT 20 ',
                duration: 6000,
                DataSuccess: false,
            });
        }
    };

    return (
        <div className="WeekAfterOTWorkSpace_big_div" style={{ marginTop: '20px' }}>
            {
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
                    {
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
                                        <select
                                            style={{
                                                borderRadius: '10px',
                                                fontSize: '1em',
                                                borderRight: 'none',
                                                borderLeft: 'none',
                                            }}
                                        >
                                            <option>없음</option>
                                            <option>현장</option>
                                            <option>출장</option>
                                        </select>
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
                                    <td rowSpan={3} width="100px">
                                        <select
                                            style={{
                                                width: '100%',
                                                height: '100px',
                                                borderRadius: '10px',
                                                fontSize: '1em',
                                                borderRight: 'none',
                                                borderLeft: 'none',
                                            }}
                                        >
                                            <option>없음</option>
                                            <option>현장</option>
                                            <option>출장</option>
                                        </select>
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
                                    <td rowSpan={3} width="100px">
                                        <select
                                            style={{
                                                width: '100%',
                                                height: '100px',
                                                borderRadius: '10px',
                                                fontSize: '1em',
                                                borderRight: 'none',
                                                borderLeft: 'none',
                                            }}
                                        >
                                            <option>없음</option>
                                            <option>현장</option>
                                            <option>출장</option>
                                        </select>
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
                                    <td rowSpan={3} width="100px">
                                        <select
                                            style={{
                                                width: '100%',
                                                height: '100px',
                                                borderRadius: '10px',
                                                fontSize: '1em',
                                                borderRight: 'none',
                                                borderLeft: 'none',
                                            }}
                                        >
                                            <option>없음</option>
                                            <option>현장</option>
                                            <option>출장</option>
                                        </select>
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
                                    <td rowSpan={3} width="100px">
                                        <select
                                            style={{
                                                width: '100%',
                                                height: '100px',
                                                borderRadius: '10px',
                                                fontSize: '1em',
                                                borderRight: 'none',
                                                borderLeft: 'none',
                                            }}
                                        >
                                            <option>없음</option>
                                            <option>현장</option>
                                            <option>출장</option>
                                        </select>
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
                                    <td rowSpan={3} width="100px">
                                        <select
                                            style={{
                                                borderRadius: '10px',
                                                fontSize: '1em',
                                                borderRight: 'none',
                                                borderLeft: 'none',
                                            }}
                                        >
                                            <option>없음</option>
                                            <option>현장</option>
                                            <option>출장</option>
                                        </select>
                                    </td>
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
                                    <td rowSpan={3} width="100px">
                                        <select
                                            style={{
                                                borderRadius: '10px',
                                                fontSize: '1em',
                                                borderRight: 'none',
                                                borderLeft: 'none',
                                            }}
                                        >
                                            <option>없음</option>
                                            <option>현장</option>
                                            <option>출장</option>
                                        </select>
                                    </td>
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
                    }
                </>
            }
        </div>
    );
};

export default AfterOtWriteMainPage;

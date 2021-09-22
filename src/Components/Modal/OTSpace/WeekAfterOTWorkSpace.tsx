import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import moment from 'moment';
import ko from 'date-fns/locale/ko';
import './WeekAfterOT.css';
import axios from 'axios';

registerLocale('ko', ko);

const WeekAfterOTWorkSpace = () => {
    const [startDate, setStartDate] = useState(moment().clone().startOf('week').add(1, 'day'));
    const [endDate, setEndDate] = useState(moment().clone().endOf('week').add(1, 'day'));
    const [monDateData, setMonDateData] = useState({
        clickDate: startDate.clone().format('YYYY-MM-DD'),
        basicStartTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 09:00`).format('YYYY-MM-DD HH:mm')),
        basicEndTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 18:00`).format('YYYY-MM-DD HH:mm')),
        basicSumTime: 0,
        OTStartTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 18:00`).format('YYYY-MM-DD HH:mm')),
        OTEndTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 18:00`).format('YYYY-MM-DD HH:mm')),
        OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
        OTSumTime: 0,
        OTreason1: '',
        OTreason2: '',
        OTreason3: '',
    });
    const initialState = {
        clickDate: startDate.clone().format('YYYY-MM-DD'),
        basicStartTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 09:00`).format('YYYY-MM-DD HH:mm')),
        basicEndTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 18:00`).format('YYYY-MM-DD HH:mm')),
        basicSumTime: 8,
        OTStartTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 18:00`).format('YYYY-MM-DD HH:mm')),
        OTEndTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 18:00`).format('YYYY-MM-DD HH:mm')),
        OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
        OTSumTime: 0,
        OTreason1: '',
        OTreason2: '',
        OTreason3: '',
    };
    const [tueDateData, setTueDateData] = useState({
        clickDate: startDate.clone().format('YYYY-MM-DD'),
        basicStartTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 09:00`).format('YYYY-MM-DD HH:mm')),
        basicEndTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 18:00`).format('YYYY-MM-DD HH:mm')),
        basicSumTime: 0,
        OTStartTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 18:00`).format('YYYY-MM-DD HH:mm')),
        OTEndTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 18:00`).format('YYYY-MM-DD HH:mm')),
        OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
        OTSumTime: 0,
        OTreason1: '',
        OTreason2: '',
        OTreason3: '',
    });
    const [wedDateData, setWedDateData] = useState({
        clickDate: startDate.clone().format('YYYY-MM-DD'),
        basicStartTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 09:00`).format('YYYY-MM-DD HH:mm')),
        basicEndTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 18:00`).format('YYYY-MM-DD HH:mm')),
        basicSumTime: 0,
        OTStartTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 18:00`).format('YYYY-MM-DD HH:mm')),
        OTEndTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 18:00`).format('YYYY-MM-DD HH:mm')),
        OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
        OTSumTime: 0,
        OTreason1: '',
        OTreason2: '',
        OTreason3: '',
    });
    const [thuDateData, setThuDateData] = useState({
        clickDate: startDate.clone().format('YYYY-MM-DD'),
        basicStartTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 09:00`).format('YYYY-MM-DD HH:mm')),
        basicEndTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 18:00`).format('YYYY-MM-DD HH:mm')),
        basicSumTime: 0,
        OTStartTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 18:00`).format('YYYY-MM-DD HH:mm')),
        OTEndTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 18:00`).format('YYYY-MM-DD HH:mm')),
        OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
        OTSumTime: 0,
        OTreason1: '',
        OTreason2: '',
        OTreason3: '',
    });
    const [friDateData, setFriDateData] = useState({
        clickDate: startDate.clone().format('YYYY-MM-DD'),
        basicStartTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 09:00`).format('YYYY-MM-DD HH:mm')),
        basicEndTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 18:00`).format('YYYY-MM-DD HH:mm')),
        basicSumTime: 0,
        OTStartTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 18:00`).format('YYYY-MM-DD HH:mm')),
        OTEndTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 18:00`).format('YYYY-MM-DD HH:mm')),
        OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
        OTSumTime: 0,
        OTreason1: '',
        OTreason2: '',
        OTreason3: '',
    });
    const [satDateData, setSatDateData] = useState({
        clickDate: startDate.clone().format('YYYY-MM-DD'),
        basicStartTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 09:00`).format('YYYY-MM-DD HH:mm')),
        basicEndTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 18:00`).format('YYYY-MM-DD HH:mm')),
        basicSumTime: 0,
        OTStartTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 18:00`).format('YYYY-MM-DD HH:mm')),
        OTEndTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 18:00`).format('YYYY-MM-DD HH:mm')),
        OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
        OTSumTime: 0,
        OTreason1: '',
        OTreason2: '',
        OTreason3: '',
    });
    const [sunDateData, setSunDateData] = useState({
        clickDate: startDate.clone().format('YYYY-MM-DD'),
        basicStartTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 09:00`).format('YYYY-MM-DD HH:mm')),
        basicEndTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 18:00`).format('YYYY-MM-DD HH:mm')),
        basicSumTime: 0,
        OTStartTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 18:00`).format('YYYY-MM-DD HH:mm')),
        OTEndTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 18:00`).format('YYYY-MM-DD HH:mm')),
        OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
        OTSumTime: 0,
        OTreason1: '',
        OTreason2: '',
        OTreason3: '',
    });
    const getDataOTData = async () => {
        const getServerOTDataCheck = await axios.post(`${process.env.REACT_APP_API_URL}/OT_app_server/OT_get_some_data`, {
            id: 'sjyoo@dhk.co.kr',
            startDate: startDate,
        });
        console.log(getServerOTDataCheck);
        if (getServerOTDataCheck.data.dataComeIn) {
            setMonDateData({
                clickDate: startDate.clone().format('YYYY-MM-DD'),
                basicStartTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].basic_start_time}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                basicEndTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].basic_end_time}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                basicSumTime: getServerOTDataCheck.data.data[0].basic_sum_time,
                OTStartTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].start_time_mon}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                OTEndTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].end_time_mon}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                OTRestTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].mon_rest}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                OTSumTime: getServerOTDataCheck.data.data[0].mon_time,
                OTreason1: getServerOTDataCheck.data.data[0].mon_reason,
                OTreason2: getServerOTDataCheck.data.data[0].mon_reason1,
                OTreason3: getServerOTDataCheck.data.data[0].mon_reason2,
            });
            setTueDateData({
                clickDate: startDate.clone().format('YYYY-MM-DD'),
                basicStartTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].basic_start_time}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                basicEndTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].basic_end_time}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                basicSumTime: getServerOTDataCheck.data.data[0].basic_sum_time,
                OTStartTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].start_time_tue}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                OTEndTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].end_time_tue}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                OTRestTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].tue_rest}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                OTSumTime: getServerOTDataCheck.data.data[0].tue_time,
                OTreason1: getServerOTDataCheck.data.data[0].tue_reason,
                OTreason2: getServerOTDataCheck.data.data[0].tue_reason1,
                OTreason3: getServerOTDataCheck.data.data[0].tue_reason2,
            });
            setWedDateData({
                clickDate: startDate.clone().format('YYYY-MM-DD'),
                basicStartTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].basic_start_time}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                basicEndTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].basic_end_time}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                basicSumTime: getServerOTDataCheck.data.data[0].basic_sum_time,
                OTStartTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].start_time_wed}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                OTEndTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].end_time_wed}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                OTRestTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].wed_rest}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                OTSumTime: getServerOTDataCheck.data.data[0].wed_time,
                OTreason1: getServerOTDataCheck.data.data[0].wed_reason,
                OTreason2: getServerOTDataCheck.data.data[0].wed_reason1,
                OTreason3: getServerOTDataCheck.data.data[0].wed_reason2,
            });
            setThuDateData({
                clickDate: startDate.clone().format('YYYY-MM-DD'),
                basicStartTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].basic_start_time}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                basicEndTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].basic_end_time}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                basicSumTime: getServerOTDataCheck.data.data[0].basic_sum_time,
                OTStartTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].start_time_thu}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                OTEndTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].end_time_thu}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                OTRestTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].thu_rest}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                OTSumTime: getServerOTDataCheck.data.data[0].thu_time,
                OTreason1: getServerOTDataCheck.data.data[0].thu_reason,
                OTreason2: getServerOTDataCheck.data.data[0].thu_reason1,
                OTreason3: getServerOTDataCheck.data.data[0].thu_reason2,
            });
            setFriDateData({
                clickDate: startDate.clone().format('YYYY-MM-DD'),
                basicStartTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].basic_start_time}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                basicEndTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].basic_end_time}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                basicSumTime: getServerOTDataCheck.data.data[0].basic_sum_time,
                OTStartTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].start_time_fri}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                OTEndTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].end_time_fri}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                OTRestTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].fri_rest}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                OTSumTime: getServerOTDataCheck.data.data[0].fri_time,
                OTreason1: getServerOTDataCheck.data.data[0].fri_reason,
                OTreason2: getServerOTDataCheck.data.data[0].fri_reason1,
                OTreason3: getServerOTDataCheck.data.data[0].fri_reason2,
            });
            setSatDateData({
                clickDate: startDate.clone().format('YYYY-MM-DD'),
                basicStartTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].basic_start_time}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                basicEndTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].basic_end_time}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                basicSumTime: getServerOTDataCheck.data.data[0].basic_sum_time,
                OTStartTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].start_time_sat}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                OTEndTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].end_time_sat}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                OTRestTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].sat_rest}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                OTSumTime: getServerOTDataCheck.data.data[0].sat_time,
                OTreason1: getServerOTDataCheck.data.data[0].sat_reason,
                OTreason2: getServerOTDataCheck.data.data[0].sat_reason1,
                OTreason3: getServerOTDataCheck.data.data[0].sat_reason2,
            });
            setSunDateData({
                clickDate: startDate.clone().format('YYYY-MM-DD'),
                basicStartTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].basic_start_time}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                basicEndTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].basic_end_time}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                basicSumTime: getServerOTDataCheck.data.data[0].basic_sum_time,
                OTStartTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].start_time_sun}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                OTEndTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].end_time_sun}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                OTRestTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].sun_rest}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                OTSumTime: getServerOTDataCheck.data.data[0].sun_time,
                OTreason1: getServerOTDataCheck.data.data[0].sun_reason,
                OTreason2: getServerOTDataCheck.data.data[0].sun_reason1,
                OTreason3: getServerOTDataCheck.data.data[0].sun_reason2,
            });

        } else {
            setMonDateData(initialState);
            setTueDateData(initialState);
            setWedDateData(initialState);
            setThuDateData(initialState);
            setFriDateData(initialState);
            setSatDateData(initialState);
            setSunDateData(initialState);
        }
    };
    useEffect(() => {
        getDataOTData();
    }, []);

    useEffect(() => {
        getDataOTData();
        setMonDateData({ ...monDateData, clickDate: startDate.clone().format('YYYY-MM-DD') });
        setTueDateData({ ...tueDateData, clickDate: startDate.clone().format('YYYY-MM-DD') });
        setWedDateData({ ...wedDateData, clickDate: startDate.clone().format('YYYY-MM-DD') })
        setThuDateData({ ...thuDateData, clickDate: startDate.clone().format('YYYY-MM-DD') })
        setFriDateData({ ...friDateData, clickDate: startDate.clone().format('YYYY-MM-DD') })
        setSatDateData({ ...satDateData, clickDate: startDate.clone().format('YYYY-MM-DD') })
        setSunDateData({ ...sunDateData, clickDate: startDate.clone().format('YYYY-MM-DD') })
    }, [startDate]);
    useEffect(() => {
        let startPlusEnd = moment.duration(moment(monDateData.OTEndTime).diff(moment(monDateData.OTStartTime))).asHours();
        const restPlusTime = moment
            .duration(
                moment(monDateData.OTRestTime).diff(
                    moment(moment(`${moment(monDateData.OTRestTime).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm'))
                )
            )
            .asHours();
        if (startPlusEnd < 0) {
            startPlusEnd = 24 + startPlusEnd;
            if (startPlusEnd - restPlusTime < 0) {
                alert('근무시간보다 휴게시간이 더 큽니다.');
                setMonDateData({
                    ...monDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
                    basicSumTime: moment.duration(moment(monDateData.basicEndTime).diff(moment(monDateData.basicStartTime))).asHours() - 1,
                });
            } else {
                setMonDateData({
                    ...monDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(moment(monDateData.basicEndTime).diff(moment(monDateData.basicStartTime))).asHours() - 1,
                });
            }
        } else {
            if (startPlusEnd - restPlusTime < 0) {
                alert('근무시간보다 휴게시간이 더 큽니다.');
                setMonDateData({
                    ...monDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
                    basicSumTime: moment.duration(moment(monDateData.basicEndTime).diff(moment(monDateData.basicStartTime))).asHours() - 1,
                });
            } else {
                setMonDateData({
                    ...monDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(moment(monDateData.basicEndTime).diff(moment(monDateData.basicStartTime))).asHours() - 1,
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
        if (startPlusEnd < 0) {
            startPlusEnd = 24 + startPlusEnd;
            if (startPlusEnd - restPlusTime < 0) {
                alert('근무시간보다 휴게시간이 더 큽니다.');
                setTueDateData({
                    ...tueDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
                    basicSumTime: moment.duration(moment(tueDateData.basicEndTime).diff(moment(tueDateData.basicStartTime))).asHours() - 1,
                });
            } else {
                setTueDateData({
                    ...tueDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(moment(tueDateData.basicEndTime).diff(moment(tueDateData.basicStartTime))).asHours() - 1,
                });
            }
        } else {
            if (startPlusEnd - restPlusTime < 0) {
                alert('근무시간보다 휴게시간이 더 큽니다.');
                setTueDateData({
                    ...tueDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
                    basicSumTime: moment.duration(moment(tueDateData.basicEndTime).diff(moment(tueDateData.basicStartTime))).asHours() - 1,
                });
            } else {
                setTueDateData({
                    ...tueDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(moment(tueDateData.basicEndTime).diff(moment(tueDateData.basicStartTime))).asHours() - 1,
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
        if (startPlusEnd < 0) {
            startPlusEnd = 24 + startPlusEnd;
            if (startPlusEnd - restPlusTime < 0) {
                alert('근무시간보다 휴게시간이 더 큽니다.');
                setWedDateData({
                    ...wedDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
                    basicSumTime: moment.duration(moment(wedDateData.basicEndTime).diff(moment(wedDateData.basicStartTime))).asHours() - 1,
                });
            } else {
                setWedDateData({
                    ...wedDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(moment(wedDateData.basicEndTime).diff(moment(wedDateData.basicStartTime))).asHours() - 1,
                });
            }
        } else {
            if (startPlusEnd - restPlusTime < 0) {
                alert('근무시간보다 휴게시간이 더 큽니다.');
                setWedDateData({
                    ...wedDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
                    basicSumTime: moment.duration(moment(wedDateData.basicEndTime).diff(moment(wedDateData.basicStartTime))).asHours() - 1,
                });
            } else {
                setWedDateData({
                    ...wedDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(moment(wedDateData.basicEndTime).diff(moment(wedDateData.basicStartTime))).asHours() - 1,
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
        if (startPlusEnd < 0) {
            startPlusEnd = 24 + startPlusEnd;
            if (startPlusEnd - restPlusTime < 0) {
                alert('근무시간보다 휴게시간이 더 큽니다.');
                setThuDateData({
                    ...thuDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
                    basicSumTime: moment.duration(moment(thuDateData.basicEndTime).diff(moment(thuDateData.basicStartTime))).asHours() - 1,
                });
            } else {
                setThuDateData({
                    ...thuDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(moment(thuDateData.basicEndTime).diff(moment(thuDateData.basicStartTime))).asHours() - 1,
                });
            }
        } else {
            if (startPlusEnd - restPlusTime < 0) {
                alert('근무시간보다 휴게시간이 더 큽니다.');
                setThuDateData({
                    ...thuDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
                    basicSumTime: moment.duration(moment(thuDateData.basicEndTime).diff(moment(thuDateData.basicStartTime))).asHours() - 1,
                });
            } else {
                setThuDateData({
                    ...thuDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(moment(thuDateData.basicEndTime).diff(moment(thuDateData.basicStartTime))).asHours() - 1,
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
        if (startPlusEnd < 0) {
            startPlusEnd = 24 + startPlusEnd;
            if (startPlusEnd - restPlusTime < 0) {
                alert('근무시간보다 휴게시간이 더 큽니다.');
                setFriDateData({
                    ...friDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
                    basicSumTime: moment.duration(moment(friDateData.basicEndTime).diff(moment(friDateData.basicStartTime))).asHours() - 1,
                });
            } else {
                setFriDateData({
                    ...friDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(moment(friDateData.basicEndTime).diff(moment(friDateData.basicStartTime))).asHours() - 1,
                });
            }
        } else {
            if (startPlusEnd - restPlusTime < 0) {
                alert('근무시간보다 휴게시간이 더 큽니다.');
                setFriDateData({
                    ...friDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
                    basicSumTime: moment.duration(moment(friDateData.basicEndTime).diff(moment(friDateData.basicStartTime))).asHours() - 1,
                });
            } else {
                setFriDateData({
                    ...friDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(moment(friDateData.basicEndTime).diff(moment(friDateData.basicStartTime))).asHours() - 1,
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
        if (startPlusEnd < 0) {
            startPlusEnd = 24 + startPlusEnd;
            if (startPlusEnd - restPlusTime < 0) {
                alert('근무시간보다 휴게시간이 더 큽니다.');
                setSatDateData({
                    ...satDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
                    basicSumTime: moment.duration(moment(satDateData.basicEndTime).diff(moment(satDateData.basicStartTime))).asHours() - 1,
                });
            } else {
                setSatDateData({
                    ...satDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(moment(satDateData.basicEndTime).diff(moment(satDateData.basicStartTime))).asHours() - 1,
                });
            }
        } else {
            if (startPlusEnd - restPlusTime < 0) {
                alert('근무시간보다 휴게시간이 더 큽니다.');
                setSatDateData({
                    ...satDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
                    basicSumTime: moment.duration(moment(satDateData.basicEndTime).diff(moment(satDateData.basicStartTime))).asHours() - 1,
                });
            } else {
                setSatDateData({
                    ...satDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(moment(satDateData.basicEndTime).diff(moment(satDateData.basicStartTime))).asHours() - 1,
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
        if (startPlusEnd < 0) {
            startPlusEnd = 24 + startPlusEnd;
            if (startPlusEnd - restPlusTime < 0) {
                alert('근무시간보다 휴게시간이 더 큽니다.');
                setSunDateData({
                    ...sunDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
                    basicSumTime: moment.duration(moment(sunDateData.basicEndTime).diff(moment(sunDateData.basicStartTime))).asHours() - 1,
                });
            } else {
                setSunDateData({
                    ...sunDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(moment(sunDateData.basicEndTime).diff(moment(sunDateData.basicStartTime))).asHours() - 1,
                });
            }
        } else {
            if (startPlusEnd - restPlusTime < 0) {
                alert('근무시간보다 휴게시간이 더 큽니다.');
                setSunDateData({
                    ...sunDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
                    basicSumTime: moment.duration(moment(sunDateData.basicEndTime).diff(moment(sunDateData.basicStartTime))).asHours() - 1,
                });
            } else {
                setSunDateData({
                    ...sunDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(moment(sunDateData.basicEndTime).diff(moment(sunDateData.basicStartTime))).asHours() - 1,
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
    return (
        <div className="WeekAfterOTWorkSpace_big_div">
            <div style={{ textAlign: 'center' }}>
                <span
                    className="WeekAferOTWorkSpace_date_change_span"
                    style={{ fontSize: 'x-large', fontWeight: 'bolder' }}
                    onClick={handlesubTest}
                >
                    {'<<<< '}
                </span>
                <h2 style={{ textAlign: 'center', display: 'inline' }}>
                    {startDate.format('YYYY년 MM월 DD일')}(월)~ {endDate.format('YYYY년 MM월 DD일')}(일)
                </h2>
                <span
                    className="WeekAferOTWorkSpace_date_change_span"
                    style={{ fontSize: 'x-large', fontWeight: 'bolder' }}
                    onClick={handlenextTest}
                >
                    {' >>>>'}
                </span>
            </div>
            <table>
                <thead>
                    <tr>
                        <th rowSpan={2}>일자</th>
                        <th rowSpan={2}>공휴일</th>
                        <th colSpan={3}>소정근로</th>
                        <th colSpan={4}>연장 근무</th>
                        <th rowSpan={2}>
                            총 근무 합계 시간
                            <br />
                        </th>
                        <th rowSpan={2}>연장 사유</th>
                    </tr>
                    <tr className="testss">
                        <td>시작시간</td>
                        <td>종료시간</td>
                        <td>총 합계 시간</td>
                        <td>시작시간</td>
                        <td>종료시간</td>
                        <td>휴게시간</td>
                        <td>총 합계 시간</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td rowSpan={3} id="stat_date">
                            {startDate.clone().format('YYYY-MM-DD')}
                            <br />
                            월요일
                        </td>

                        <td rowSpan={3}>
                            <select name="holiday_mon" id="holiday_mon">
                                <option value="weekday" selected>
                                    평일
                                </option>
                                <option value="holiday">공휴일</option>
                            </select>
                        </td>
                        <td rowSpan={3}>
                            <DatePicker
                                locale="ko"
                                selected={monDateData.basicStartTime}
                                onChange={(Time: any) => setMonDateData({ ...monDateData, basicStartTime: Time })}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                timeCaption="Time"
                                dateFormat="HH:mm"
                                withPortal
                                portalId="root-timeportal"
                            />
                        </td>
                        <td rowSpan={3}>
                            <DatePicker
                                locale="ko"
                                selected={monDateData.basicEndTime}
                                onChange={(Time: any) => setMonDateData({ ...monDateData, basicEndTime: Time })}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                timeCaption="Time"
                                dateFormat="HH:mm"
                                withPortal
                                portalId="root-timeportal"
                            />
                        </td>
                        <td rowSpan={3}>
                            <span className="sum_time" id="sum_time_mon">{monDateData.basicSumTime}</span>
                            시간
                        </td>

                        <td rowSpan={3}>
                            <DatePicker
                                locale="ko"
                                selected={monDateData.OTStartTime}
                                onChange={(Time: any) => setMonDateData({ ...monDateData, OTStartTime: Time })}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                timeCaption="Time"
                                dateFormat="HH:mm"
                                withPortal
                                portalId="root-timeportal"
                            />
                        </td>
                        <td rowSpan={3}>
                            <DatePicker
                                locale="ko"
                                selected={monDateData.OTEndTime}
                                onChange={(Time: any) => setMonDateData({ ...monDateData, OTEndTime: Time })}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                timeCaption="Time"
                                dateFormat="HH:mm"
                                withPortal
                                portalId="root-timeportal"
                            />
                        </td>
                        <td rowSpan={3}>
                            <DatePicker
                                locale="ko"
                                selected={monDateData.OTRestTime}
                                onChange={(Time: any) => setMonDateData({ ...monDateData, OTRestTime: Time })}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                timeCaption="Time"
                                dateFormat="HH:mm"
                                withPortal
                                portalId="root-timeportal"
                            />
                        </td>
                        <td rowSpan={3}>
                            <span className="sum_over_time" id="sum_over_time_monOver">
                                {monDateData.OTSumTime}
                            </span>
                            시간
                        </td>
                        <td rowSpan={3}>
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

                        <td rowSpan={3}>
                            <select name="holiday_tue" id="holiday_tue">
                                <option value="weekday" selected>
                                    평일
                                </option>
                                <option value="holiday">공휴일</option>
                            </select>
                        </td>
                        <td rowSpan={3}>
                            <DatePicker
                                locale="ko"
                                selected={tueDateData.basicStartTime}
                                onChange={(Time: any) => setTueDateData({ ...tueDateData, basicStartTime: Time })}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                timeCaption="Time"
                                dateFormat="HH:mm"
                                withPortal
                                portalId="root-timeportal"
                            />
                        </td>
                        <td rowSpan={3}>
                            <DatePicker
                                locale="ko"
                                selected={tueDateData.basicEndTime}
                                onChange={(Time: any) => setTueDateData({ ...tueDateData, basicEndTime: Time })}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                timeCaption="Time"
                                dateFormat="HH:mm"
                                withPortal
                                portalId="root-timeportal"
                            />
                        </td>
                        <td rowSpan={3}>
                            <span className="sum_time" id="sum_time_tue">
                                {tueDateData.basicSumTime}
                            </span>{' '}
                            시간
                        </td>
                        <td rowSpan={3}>
                            <DatePicker
                                locale="ko"
                                selected={tueDateData.OTStartTime}
                                onChange={(Time: any) => setTueDateData({ ...tueDateData, OTStartTime: Time })}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                timeCaption="Time"
                                dateFormat="HH:mm"
                                withPortal
                                portalId="root-timeportal"
                            />
                        </td>
                        <td rowSpan={3}>
                            <DatePicker
                                locale="ko"
                                selected={tueDateData.OTEndTime}
                                onChange={(Time: any) => setTueDateData({ ...tueDateData, OTEndTime: Time })}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                timeCaption="Time"
                                dateFormat="HH:mm"
                                withPortal
                                portalId="root-timeportal"
                            />
                        </td>
                        <td rowSpan={3}>
                            <DatePicker
                                locale="ko"
                                selected={tueDateData.OTRestTime}
                                onChange={(Time: any) => setTueDateData({ ...tueDateData, OTRestTime: Time })}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                timeCaption="Time"
                                dateFormat="HH:mm"
                                withPortal
                                portalId="root-timeportal"
                            />
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
                        <td rowSpan={3}>
                            <select name="holiday_wed" id="holiday_wed">
                                <option value="weekday" selected>
                                    평일
                                </option>
                                <option value="holiday">공휴일</option>
                            </select>
                        </td>
                        <td rowSpan={3}><DatePicker
                            locale="ko"
                            selected={wedDateData.basicStartTime}
                            onChange={(Time: any) => setWedDateData({ ...wedDateData, basicStartTime: Time })}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            withPortal
                            portalId="root-timeportal"
                        /></td>
                        <td rowSpan={3}> <DatePicker
                            locale="ko"
                            selected={wedDateData.basicEndTime}
                            onChange={(Time: any) => setWedDateData({ ...wedDateData, basicEndTime: Time })}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            withPortal
                            portalId="root-timeportal"
                        /></td>
                        <td rowSpan={3}>
                            <span className="sum_time" id="sum_time_wed">
                                {wedDateData.basicSumTime}</span> 시간
                        </td>
                        <td rowSpan={3}><DatePicker
                            locale="ko"
                            selected={wedDateData.OTStartTime}
                            onChange={(Time: any) => setWedDateData({ ...wedDateData, OTStartTime: Time })}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            withPortal
                            portalId="root-timeportal"
                        /></td>
                        <td rowSpan={3}><DatePicker
                            locale="ko"
                            selected={wedDateData.OTEndTime}
                            onChange={(Time: any) => setWedDateData({ ...wedDateData, OTEndTime: Time })}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            withPortal
                            portalId="root-timeportal"
                        /></td>
                        <td rowSpan={3}><DatePicker
                            locale="ko"
                            selected={wedDateData.OTRestTime}
                            onChange={(Time: any) => setWedDateData({ ...wedDateData, OTRestTime: Time })}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            withPortal
                            portalId="root-timeportal"
                        /></td>
                        <td rowSpan={3}>
                            <span className="sum_over_time" id="sum_over_time_wedOver">{wedDateData.OTSumTime}</span> 시간
                        </td>
                        <td rowSpan={3}>
                            <span id="sum_times_wed">{wedDateData.basicSumTime + wedDateData.OTSumTime}</span> 시간
                        </td>
                        <td className="reasontable">
                            <textarea placeholder="사유1" name="Wed_reason" value={wedDateData.OTreason1}
                                onChange={e => setWedDateData({ ...wedDateData, OTreason1: e.target.value })}></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                            <textarea placeholder="사유2" name="Wed_reason1" value={wedDateData.OTreason2}
                                onChange={e => setWedDateData({ ...wedDateData, OTreason2: e.target.value })}></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                            <textarea placeholder="사유3" name="Wed_reason2" value={wedDateData.OTreason3}
                                onChange={e => setWedDateData({ ...wedDateData, OTreason3: e.target.value })}> </textarea>
                        </td>
                    </tr>

                    <tr>
                        <td rowSpan={3}>
                            {startDate.clone().add(3, 'day').format('YYYY-MM-DD')}
                            <br />
                            목요일
                        </td>
                        <td rowSpan={3}>
                            <select name="holiday_thu" id="holiday_thu">
                                <option value="weekday" selected>
                                    평일
                                </option>
                                <option value="holiday">공휴일</option>
                            </select>
                        </td>
                        <td rowSpan={3}><DatePicker
                            locale="ko"
                            selected={thuDateData.basicStartTime}
                            onChange={(Time: any) => setThuDateData({ ...thuDateData, basicStartTime: Time })}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            withPortal
                            portalId="root-timeportal"
                        /></td>
                        <td rowSpan={3}><DatePicker
                            locale="ko"
                            selected={thuDateData.basicEndTime}
                            onChange={(Time: any) => setThuDateData({ ...thuDateData, basicEndTime: Time })}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            withPortal
                            portalId="root-timeportal"
                        /></td>
                        <td rowSpan={3}>
                            <span className="sum_time" id="sum_time_thu">{thuDateData.basicSumTime}</span> 시간
                        </td>
                        <td rowSpan={3}><DatePicker
                            locale="ko"
                            selected={thuDateData.OTStartTime}
                            onChange={(Time: any) => setThuDateData({ ...thuDateData, OTStartTime: Time })}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            withPortal
                            portalId="root-timeportal"
                        /></td>
                        <td rowSpan={3}><DatePicker
                            locale="ko"
                            selected={thuDateData.OTEndTime}
                            onChange={(Time: any) => setThuDateData({ ...thuDateData, OTEndTime: Time })}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            withPortal
                            portalId="root-timeportal"
                        /></td>
                        <td rowSpan={3}><DatePicker
                            locale="ko"
                            selected={thuDateData.OTRestTime}
                            onChange={(Time: any) => setThuDateData({ ...thuDateData, OTRestTime: Time })}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            withPortal
                            portalId="root-timeportal"
                        /></td>
                        <td rowSpan={3}>
                            <span className="sum_over_time" id="sum_over_time_thuOver">{thuDateData.OTSumTime}</span> 시간
                        </td>
                        <td rowSpan={3}>
                            <span id="sum_times_thu">{thuDateData.basicSumTime + thuDateData.OTSumTime}</span> 시간
                        </td>
                        <td className="reasontable">
                            <textarea placeholder="사유1" name="Thu_reason" value={thuDateData.OTreason1}
                                onChange={e => setThuDateData({ ...thuDateData, OTreason1: e.target.value })}></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                            <textarea placeholder="사유2" name="Thu_reason1" value={thuDateData.OTreason2}
                                onChange={e => setThuDateData({ ...thuDateData, OTreason2: e.target.value })}></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                            <textarea placeholder="사유3" name="Thu_reason2" value={thuDateData.OTreason3}
                                onChange={e => setThuDateData({ ...thuDateData, OTreason3: e.target.value })}></textarea>
                        </td>
                    </tr>

                    <tr>
                        <td rowSpan={3}>
                            {startDate.clone().add(4, 'day').format('YYYY-MM-DD')}
                            <br />
                            금요일
                        </td>

                        <td rowSpan={3}>
                            <select name="holiday_fri" id="holiday_fri">
                                <option value="weekday" selected>
                                    평일
                                </option>
                                <option value="holiday">공휴일</option>
                            </select>
                        </td>
                        <td rowSpan={3}> <DatePicker
                            locale="ko"
                            selected={friDateData.basicStartTime}
                            onChange={(Time: any) => setFriDateData({ ...friDateData, basicStartTime: Time })}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            withPortal
                            portalId="root-timeportal"
                        /></td>
                        <td rowSpan={3}> <DatePicker
                            locale="ko"
                            selected={friDateData.basicEndTime}
                            onChange={(Time: any) => setFriDateData({ ...friDateData, basicEndTime: Time })}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            withPortal
                            portalId="root-timeportal"
                        /></td>
                        <td rowSpan={3}>
                            <span className="sum_time" id="sum_time_fri">{friDateData.basicSumTime}</span> 시간
                        </td>
                        <td rowSpan={3}> <DatePicker
                            locale="ko"
                            selected={friDateData.OTStartTime}
                            onChange={(Time: any) => setFriDateData({ ...friDateData, OTStartTime: Time })}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            withPortal
                            portalId="root-timeportal"
                        /></td>
                        <td rowSpan={3}><DatePicker
                            locale="ko"
                            selected={friDateData.OTEndTime}
                            onChange={(Time: any) => setFriDateData({ ...friDateData, OTEndTime: Time })}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            withPortal
                            portalId="root-timeportal"
                        /></td>
                        <td rowSpan={3}><DatePicker
                            locale="ko"
                            selected={friDateData.OTRestTime}
                            onChange={(Time: any) => setFriDateData({ ...friDateData, OTRestTime: Time })}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            withPortal
                            portalId="root-timeportal"
                        /></td>
                        <td rowSpan={3}>
                            <span className="sum_over_time" id="sum_over_time_friOver">{friDateData.OTSumTime}</span> 시간
                        </td>
                        <td rowSpan={3}>
                            <span id="sum_times_fri">{friDateData.basicSumTime + friDateData.OTSumTime}</span> 시간
                        </td>
                        <td className="reasontable">
                            <textarea placeholder="사유1" name="Fri_reason"
                                value={friDateData.OTreason1}
                                onChange={e => setFriDateData({ ...friDateData, OTreason1: e.target.value })}></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                            <textarea placeholder="사유2" name="Fri_reason1" value={friDateData.OTreason2}
                                onChange={e => setFriDateData({ ...friDateData, OTreason2: e.target.value })}></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                            <textarea placeholder="사유3" name="Fri_reason2" value={friDateData.OTreason3}
                                onChange={e => setFriDateData({ ...friDateData, OTreason3: e.target.value })}></textarea>
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
                        <td rowSpan={3}><DatePicker
                            locale="ko"
                            selected={satDateData.OTStartTime}
                            onChange={(Time: any) => setSatDateData({ ...satDateData, OTStartTime: Time })}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            withPortal
                            portalId="root-timeportal"
                        /></td>
                        <td rowSpan={3}><DatePicker
                            locale="ko"
                            selected={satDateData.OTEndTime}
                            onChange={(Time: any) => setSatDateData({ ...satDateData, OTEndTime: Time })}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            withPortal
                            portalId="root-timeportal"
                        /></td>
                        <td rowSpan={3}><DatePicker
                            locale="ko"
                            selected={satDateData.OTRestTime}
                            onChange={(Time: any) => setSatDateData({ ...satDateData, OTRestTime: Time })}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            withPortal
                            portalId="root-timeportal"
                        /></td>
                        <td rowSpan={3}>
                            <span className="sum_over_time" id="sum_over_time_satOver">{satDateData.OTSumTime}</span> 시간
                        </td>
                        <td rowSpan={3}>
                            <span id="sum_times_sat">{satDateData.OTSumTime}</span> 시간
                        </td>
                        <td>
                            <textarea placeholder="사유1" name="Sat_reason" value={satDateData.OTreason1}
                                onChange={e => setSatDateData({ ...satDateData, OTreason1: e.target.value })}></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <textarea placeholder="사유2" name="Sat_reason1" value={satDateData.OTreason2}
                                onChange={e => setSatDateData({ ...satDateData, OTreason2: e.target.value })}></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <textarea placeholder="사유3" name="Sat_reason2" value={satDateData.OTreason3}
                                onChange={e => setSatDateData({ ...satDateData, OTreason3: e.target.value })}></textarea>
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
                        <td rowSpan={3}><DatePicker
                            locale="ko"
                            selected={sunDateData.OTStartTime}
                            onChange={(Time: any) => setSunDateData({ ...sunDateData, OTStartTime: Time })}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            withPortal
                            portalId="root-timeportal"
                        /></td>
                        <td rowSpan={3}><DatePicker
                            locale="ko"
                            selected={sunDateData.OTEndTime}
                            onChange={(Time: any) => setSunDateData({ ...sunDateData, OTEndTime: Time })}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            withPortal
                            portalId="root-timeportal"
                        /></td>
                        <td rowSpan={3}><DatePicker
                            locale="ko"
                            selected={sunDateData.OTRestTime}
                            onChange={(Time: any) => setSunDateData({ ...sunDateData, OTRestTime: Time })}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            withPortal
                            portalId="root-timeportal"
                        /></td>
                        <td rowSpan={3}>
                            <span className="sum_over_time" id="sum_over_time_sunOver">{sunDateData.OTSumTime}</span> 시간
                        </td>
                        <td rowSpan={3}>
                            <span id="sum_times_sun">{sunDateData.OTSumTime}</span> 시간
                        </td>
                        <td className="reasontable">
                            <textarea placeholder="사유1" name="Sun_reason"
                                value={sunDateData.OTreason1}
                                onChange={e => setSunDateData({ ...sunDateData, OTreason1: e.target.value })}></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                            <textarea placeholder="사유2" name="Sun_reason1" value={sunDateData.OTreason2}
                                onChange={e => setSunDateData({ ...sunDateData, OTreason2: e.target.value })}></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                            <textarea placeholder="사유3" name="Sun_reason2" value={sunDateData.OTreason3}
                                onChange={e => setSunDateData({ ...sunDateData, OTreason3: e.target.value })}></textarea>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={2}>소정근로 총합계</td>
                        <td colSpan={2}>
                            <span id="total_sum_time"> {monDateData.basicSumTime + tueDateData.basicSumTime + wedDateData.basicSumTime + thuDateData.basicSumTime + friDateData.basicSumTime}</span> 시간
                        </td>
                        <td colSpan={2}>연장근무 총합계</td>
                        <td colSpan={2}>
                            <span id="total_sum_over_time">{monDateData.OTSumTime + tueDateData.OTSumTime + wedDateData.OTSumTime + thuDateData.OTSumTime + friDateData.OTSumTime + satDateData.OTSumTime + sunDateData.OTSumTime}</span> 시간
                        </td>
                        <td colSpan={2}></td>
                        <td>
                            <span id="total_time"></span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default WeekAfterOTWorkSpace;

import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import moment from 'moment';
import ko from 'date-fns/locale/ko';
import './WeekAfterOT.css';
import axios from 'axios';
import { toast } from '../../ToastMessage/ToastManager';
import { useSelector } from 'react-redux';
import { RootState } from '../../../models/index';
import { DecryptKey } from '../../../config';
import PrinterAfterSelectClickModal from '../../SelectClickModal/OT/PrinterAfterSelectClickModal';
registerLocale('ko', ko);

type WeekAfterOTWorkSpaceProps = {
    startDate: any;
    endDate: any;
    setStartDate: any;
    setEndDate: any;
};

const WeekAfterOTWorkSpace = ({ startDate, endDate, setStartDate, setEndDate }: WeekAfterOTWorkSpaceProps) => {
    const [printerClicked, setPrinterClicked] = useState(false);
    const [clicksData, setClicksData] = useState({});
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const [leaderCheck, setLeaderCheck] = useState(false);
    const [loading, setLoading] = useState(false);
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
        holidayCheck: 'weekday',
        OTnightSum: 0,
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
        holidayCheck: 'weekday',
        OTnightSum: 0,
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
        holidayCheck: 'weekday',
        OTnightSum: 0,
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
        holidayCheck: 'weekday',
        OTnightSum: 0,
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
        holidayCheck: 'weekday',
        OTnightSum: 0,
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
        holidayCheck: 'weekday',
        OTnightSum: 0,
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
        holidayCheck: 'weekday',
        OTnightSum: 0,
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
        holidayCheck: 'weekday',
        OTnightSum: 0,
    });
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
                basicStartTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].basic_mon_start_time}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                basicEndTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].basic_mon_end_time}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                basicSumTime: getServerOTDataCheck.data.data[0].basic_mon_sum_time,
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
                    moment(
                        `${moment(startDate).format('YYYY-MM-DD')} ${
                            getServerOTDataCheck.data.data[0].mon_rest === '0' ? '00:00' : getServerOTDataCheck.data.data[0].mon_rest
                        }`
                    ).format('YYYY-MM-DD HH:mm')
                ),
                OTSumTime: getServerOTDataCheck.data.data[0].mon_time,
                OTreason1: getServerOTDataCheck.data.data[0].mon_reason,
                OTreason2: getServerOTDataCheck.data.data[0].mon_reason1,
                OTreason3: getServerOTDataCheck.data.data[0].mon_reason2,
                holidayCheck: 'weekday',
                OTnightSum: getServerOTDataCheck.data.data[0].mon_night,
            });
            setTueDateData({
                clickDate: startDate.clone().format('YYYY-MM-DD'),
                basicStartTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].basic_tue_start_time}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                basicEndTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].basic_tue_end_time}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                basicSumTime: getServerOTDataCheck.data.data[0].basic_tue_sum_time,
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
                    moment(
                        `${moment(startDate).format('YYYY-MM-DD')} ${
                            getServerOTDataCheck.data.data[0].tue_rest === '0' ? '00:00' : getServerOTDataCheck.data.data[0].tue_rest
                        }`
                    ).format('YYYY-MM-DD HH:mm')
                ),
                OTSumTime: getServerOTDataCheck.data.data[0].tue_time,
                OTreason1: getServerOTDataCheck.data.data[0].tue_reason,
                OTreason2: getServerOTDataCheck.data.data[0].tue_reason1,
                OTreason3: getServerOTDataCheck.data.data[0].tue_reason2,
                holidayCheck: 'weekday',
                OTnightSum: getServerOTDataCheck.data.data[0].tue_night,
            });
            setWedDateData({
                clickDate: startDate.clone().format('YYYY-MM-DD'),
                basicStartTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].basic_wed_start_time}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                basicEndTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].basic_wed_end_time}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                basicSumTime: getServerOTDataCheck.data.data[0].basic_wed_sum_time,
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
                    moment(
                        `${moment(startDate).format('YYYY-MM-DD')} ${
                            getServerOTDataCheck.data.data[0].wed_rest === '0' ? '00:00' : getServerOTDataCheck.data.data[0].wed_rest
                        }`
                    ).format('YYYY-MM-DD HH:mm')
                ),
                OTSumTime: getServerOTDataCheck.data.data[0].wed_time,
                OTreason1: getServerOTDataCheck.data.data[0].wed_reason,
                OTreason2: getServerOTDataCheck.data.data[0].wed_reason1,
                OTreason3: getServerOTDataCheck.data.data[0].wed_reason2,
                holidayCheck: 'weekday',
                OTnightSum: getServerOTDataCheck.data.data[0].wed_night,
            });
            setThuDateData({
                clickDate: startDate.clone().format('YYYY-MM-DD'),
                basicStartTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].basic_thu_start_time}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                basicEndTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].basic_thu_end_time}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                basicSumTime: getServerOTDataCheck.data.data[0].basic_thu_sum_time,
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
                    moment(
                        `${moment(startDate).format('YYYY-MM-DD')} ${
                            getServerOTDataCheck.data.data[0].thu_rest === '0' ? '00:00' : getServerOTDataCheck.data.data[0].thu_rest
                        }`
                    ).format('YYYY-MM-DD HH:mm')
                ),
                OTSumTime: getServerOTDataCheck.data.data[0].thu_time,
                OTreason1: getServerOTDataCheck.data.data[0].thu_reason,
                OTreason2: getServerOTDataCheck.data.data[0].thu_reason1,
                OTreason3: getServerOTDataCheck.data.data[0].thu_reason2,
                holidayCheck: 'weekday',
                OTnightSum: getServerOTDataCheck.data.data[0].thu_night,
            });
            setFriDateData({
                clickDate: startDate.clone().format('YYYY-MM-DD'),
                basicStartTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].basic_fri_start_time}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                basicEndTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].basic_fri_end_time}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                basicSumTime: getServerOTDataCheck.data.data[0].basic_fri_sum_time,
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
                    moment(
                        `${moment(startDate).format('YYYY-MM-DD')} ${
                            getServerOTDataCheck.data.data[0].fri_rest === '0' ? '00:00' : getServerOTDataCheck.data.data[0].fri_rest
                        }`
                    ).format('YYYY-MM-DD HH:mm')
                ),
                OTSumTime: getServerOTDataCheck.data.data[0].fri_time,
                OTreason1: getServerOTDataCheck.data.data[0].fri_reason,
                OTreason2: getServerOTDataCheck.data.data[0].fri_reason1,
                OTreason3: getServerOTDataCheck.data.data[0].fri_reason2,
                holidayCheck: 'weekday',
                OTnightSum: getServerOTDataCheck.data.data[0].fri_night,
            });
            setSatDateData({
                clickDate: startDate.clone().format('YYYY-MM-DD'),
                basicStartTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].basic_fri_start_time}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                basicEndTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].basic_fri_end_time}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                basicSumTime: getServerOTDataCheck.data.data[0].basic_fri_sum_time,
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
                    moment(
                        `${moment(startDate).format('YYYY-MM-DD')} ${
                            getServerOTDataCheck.data.data[0].sat_rest === '0' ? '00:00' : getServerOTDataCheck.data.data[0].sat_rest
                        }`
                    ).format('YYYY-MM-DD HH:mm')
                ),
                OTSumTime: getServerOTDataCheck.data.data[0].sat_time,
                OTreason1: getServerOTDataCheck.data.data[0].sat_reason,
                OTreason2: getServerOTDataCheck.data.data[0].sat_reason1,
                OTreason3: getServerOTDataCheck.data.data[0].sat_reason2,
                holidayCheck: 'weekday',
                OTnightSum: getServerOTDataCheck.data.data[0].sat_night,
            });
            setSunDateData({
                clickDate: startDate.clone().format('YYYY-MM-DD'),
                basicStartTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].basic_fri_start_time}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                basicEndTime: new Date(
                    moment(`${moment(startDate).format('YYYY-MM-DD')} ${getServerOTDataCheck.data.data[0].basic_fri_end_time}`).format(
                        'YYYY-MM-DD HH:mm'
                    )
                ),
                basicSumTime: getServerOTDataCheck.data.data[0].basic_fri_sum_time,
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
                    moment(
                        `${moment(startDate).format('YYYY-MM-DD')} ${
                            getServerOTDataCheck.data.data[0].sun_rest === '0' ? '00:00' : getServerOTDataCheck.data.data[0].sun_rest
                        }`
                    ).format('YYYY-MM-DD HH:mm')
                ),
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
    useEffect(() => {
        let startPlusEnd = moment.duration(moment(monDateData.OTEndTime).diff(moment(monDateData.OTStartTime))).asHours();
        const restPlusTime = moment
            .duration(
                moment(monDateData.OTRestTime).diff(
                    moment(moment(`${moment(monDateData.OTRestTime).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm'))
                )
            )
            .asHours();

        const nightTime = moment
            .duration(
                moment(monDateData.OTEndTime).diff(
                    moment(`${moment(monDateData.OTEndTime).format('YYYY-MM-DD')} 22:00`).format('YYYY-MM-DD HH:mm')
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
                setMonDateData({
                    ...monDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
                    basicSumTime: moment.duration(moment(monDateData.basicEndTime).diff(moment(monDateData.basicStartTime))).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setMonDateData({
                    ...monDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(moment(monDateData.basicEndTime).diff(moment(monDateData.basicStartTime))).asHours() - 1,
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
                    OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
                    basicSumTime: moment.duration(moment(monDateData.basicEndTime).diff(moment(monDateData.basicStartTime))).asHours() - 1,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setMonDateData({
                    ...monDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: moment.duration(moment(monDateData.basicEndTime).diff(moment(monDateData.basicStartTime))).asHours() - 1,
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
                    OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
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
                    OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
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
                    OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
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
                    OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
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
                    OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
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
                    OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
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
                    OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
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
                    OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
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
                    OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
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
                    OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
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
                    OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
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
                    OTRestTime: new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')),
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

    const handlePrinterClicks = () => {
        const data = {
            date_mon: startDate.clone().format('YYYY-MM-DD'),
            date_tue: startDate.clone().add(1, 'day').format('YYYY-MM-DD'),
            date_wed: startDate.clone().add(2, 'day').format('YYYY-MM-DD'),
            date_thu: startDate.clone().add(3, 'day').format('YYYY-MM-DD'),
            date_fri: startDate.clone().add(4, 'day').format('YYYY-MM-DD'),
            date_sat: startDate.clone().add(5, 'day').format('YYYY-MM-DD'),
            date_sun: startDate.clone().add(6, 'day').format('YYYY-MM-DD'),

            end_time_mon: moment(monDateData.OTEndTime).format('HH:mm'),
            end_time_tue: moment(tueDateData.OTEndTime).format('HH:mm'),
            end_time_wed: moment(wedDateData.OTEndTime).format('HH:mm'),
            end_time_thu: moment(thuDateData.OTEndTime).format('HH:mm'),
            end_time_fri: moment(friDateData.OTEndTime).format('HH:mm'),
            end_time_sat: moment(satDateData.OTEndTime).format('HH:mm'),
            end_time_sun: moment(sunDateData.OTEndTime).format('HH:mm'),

            start_time_mon: moment(monDateData.OTStartTime).format('HH:mm'),
            start_time_tue: moment(tueDateData.OTStartTime).format('HH:mm'),
            start_time_wed: moment(wedDateData.OTStartTime).format('HH:mm'),
            start_time_thu: moment(thuDateData.OTStartTime).format('HH:mm'),
            start_time_fri: moment(friDateData.OTStartTime).format('HH:mm'),
            start_time_sat: moment(satDateData.OTStartTime).format('HH:mm'),
            start_time_sun: moment(sunDateData.OTStartTime).format('HH:mm'),

            mon_rest: moment(monDateData.OTRestTime).format('HH:mm'),
            tue_rest: moment(tueDateData.OTRestTime).format('HH:mm'),
            wed_rest: moment(wedDateData.OTRestTime).format('HH:mm'),
            thu_rest: moment(thuDateData.OTRestTime).format('HH:mm'),
            fri_rest: moment(friDateData.OTRestTime).format('HH:mm'),
            sat_rest: moment(satDateData.OTRestTime).format('HH:mm'),
            sun_rest: moment(sunDateData.OTRestTime).format('HH:mm'),

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

                                    <th colSpan={3} style={{ borderRight: '1.2px solid black', borderBottom: '1.2px solid black' }}>
                                        소정근로
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

                                    <td rowSpan={3} width="100px">
                                        {moment(monDateData.basicStartTime).format('HH:mm')}
                                    </td>
                                    <td rowSpan={3} width="100px">
                                        {moment(monDateData.basicEndTime).format('HH:mm')}
                                    </td>
                                    <td rowSpan={3} width="100px">
                                        <span className="sum_time" id="sum_time_mon">
                                            {monDateData.basicSumTime}
                                        </span>
                                        시간
                                    </td>

                                    <td rowSpan={3} width="100px">
                                        {moment(monDateData.OTStartTime).format('HH:mm')}
                                    </td>
                                    <td rowSpan={3} width="100px">
                                        {moment(monDateData.OTEndTime).format('HH:mm')}
                                    </td>
                                    <td rowSpan={3} width="100px">
                                        {moment(monDateData.OTRestTime).format('HH:mm')}
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

                                    <td className="reasontable" style={{ height: '50px' }}>
                                        <pre>{monDateData.OTreason1}</pre>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reasontable" style={{ height: '50px' }}>
                                        <pre>{monDateData.OTreason2}</pre>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reasontable" style={{ height: '50px' }}>
                                        <pre>{monDateData.OTreason3}</pre>
                                    </td>
                                </tr>

                                <tr>
                                    <td rowSpan={3} style={{ minWidth: '100px' }}>
                                        {startDate.clone().add(1, 'day').format('YYYY-MM-DD')}
                                        <br />
                                        화요일
                                    </td>

                                    <td rowSpan={3}>{moment(tueDateData.basicStartTime).format('HH:mm')}</td>
                                    <td rowSpan={3}>{moment(tueDateData.basicEndTime).format('HH:mm')}</td>
                                    <td rowSpan={3}>
                                        <span className="sum_time" id="sum_time_tue">
                                            {tueDateData.basicSumTime}
                                        </span>{' '}
                                        시간
                                    </td>
                                    <td rowSpan={3}>{moment(tueDateData.OTStartTime).format('HH:mm')}</td>
                                    <td rowSpan={3}>{moment(tueDateData.OTEndTime).format('HH:mm')}</td>
                                    <td rowSpan={3}>{moment(tueDateData.OTRestTime).format('HH:mm')}</td>
                                    <td rowSpan={3}>
                                        <span className="sum_over_time" id="sum_over_time_tueOver">
                                            {tueDateData.OTSumTime}
                                        </span>{' '}
                                        시간
                                    </td>
                                    <td rowSpan={3}>
                                        <span id="sum_times_tue">{tueDateData.basicSumTime + tueDateData.OTSumTime}</span> 시간
                                    </td>
                                    <td className="reasontable" style={{ height: '50px' }}>
                                        <pre>{tueDateData.OTreason1}</pre>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reasontable" style={{ height: '50px' }}>
                                        <pre>{tueDateData.OTreason2}</pre>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reasontable" style={{ height: '50px' }}>
                                        <pre>{tueDateData.OTreason3}</pre>
                                    </td>
                                </tr>

                                <tr>
                                    <td rowSpan={3}>
                                        {startDate.clone().add(2, 'day').format('YYYY-MM-DD')}
                                        <br />
                                        수요일
                                    </td>

                                    <td rowSpan={3}>{moment(wedDateData.basicStartTime).format('HH:mm')}</td>
                                    <td rowSpan={3}>{moment(wedDateData.basicEndTime).format('HH:mm')}</td>
                                    <td rowSpan={3}>
                                        <span className="sum_time" id="sum_time_wed">
                                            {wedDateData.basicSumTime}
                                        </span>{' '}
                                        시간
                                    </td>
                                    <td rowSpan={3}>{moment(wedDateData.OTStartTime).format('HH:mm')}</td>
                                    <td rowSpan={3}>{moment(wedDateData.OTEndTime).format('HH:mm')}</td>
                                    <td rowSpan={3}>{moment(wedDateData.OTRestTime).format('HH:mm')}</td>
                                    <td rowSpan={3}>
                                        <span className="sum_over_time" id="sum_over_time_wedOver">
                                            {wedDateData.OTSumTime}
                                        </span>{' '}
                                        시간
                                    </td>
                                    <td rowSpan={3}>
                                        <span id="sum_times_wed">{wedDateData.basicSumTime + wedDateData.OTSumTime}</span> 시간
                                    </td>
                                    <td className="reasontable" style={{ height: '50px' }}>
                                        <pre>{wedDateData.OTreason1}</pre>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reasontable" style={{ height: '50px' }}>
                                        <pre>{wedDateData.OTreason2}</pre>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reasontable" style={{ height: '50px' }}>
                                        <pre>{wedDateData.OTreason3}</pre>
                                    </td>
                                </tr>

                                <tr>
                                    <td rowSpan={3}>
                                        {startDate.clone().add(3, 'day').format('YYYY-MM-DD')}
                                        <br />
                                        목요일
                                    </td>

                                    <td rowSpan={3}>{moment(thuDateData.basicStartTime).format('HH:mm')}</td>
                                    <td rowSpan={3}>{moment(thuDateData.basicEndTime).format('HH:mm')}</td>
                                    <td rowSpan={3}>
                                        <span className="sum_time" id="sum_time_thu">
                                            {thuDateData.basicSumTime}
                                        </span>{' '}
                                        시간
                                    </td>
                                    <td rowSpan={3}>{moment(thuDateData.OTStartTime).format('HH:mm')}</td>
                                    <td rowSpan={3}>{moment(thuDateData.OTEndTime).format('HH:mm')}</td>
                                    <td rowSpan={3}>{moment(thuDateData.OTRestTime).format('HH:mm')}</td>
                                    <td rowSpan={3}>
                                        <span className="sum_over_time" id="sum_over_time_thuOver">
                                            {thuDateData.OTSumTime}
                                        </span>{' '}
                                        시간
                                    </td>
                                    <td rowSpan={3}>
                                        <span id="sum_times_thu">{thuDateData.basicSumTime + thuDateData.OTSumTime}</span> 시간
                                    </td>
                                    <td className="reasontable" style={{ height: '50px' }}>
                                        <pre>{thuDateData.OTreason1}</pre>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reasontable" style={{ height: '50px' }}>
                                        <pre>{thuDateData.OTreason2}</pre>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reasontable" style={{ height: '50px' }}>
                                        <pre>{thuDateData.OTreason3}</pre>
                                    </td>
                                </tr>

                                <tr>
                                    <td rowSpan={3}>
                                        {startDate.clone().add(4, 'day').format('YYYY-MM-DD')}
                                        <br />
                                        금요일
                                    </td>

                                    <td rowSpan={3}>{moment(friDateData.basicStartTime).format('HH:mm')}</td>
                                    <td rowSpan={3}>{moment(friDateData.basicEndTime).format('HH:mm')}</td>
                                    <td rowSpan={3}>
                                        <span className="sum_time" id="sum_time_fri">
                                            {friDateData.basicSumTime}
                                        </span>{' '}
                                        시간
                                    </td>
                                    <td rowSpan={3}>{moment(friDateData.OTStartTime).format('HH:mm')}</td>
                                    <td rowSpan={3}>{moment(friDateData.OTEndTime).format('HH:mm')}</td>
                                    <td rowSpan={3}>{moment(friDateData.OTRestTime).format('HH:mm')}</td>
                                    <td rowSpan={3}>
                                        <span className="sum_over_time" id="sum_over_time_friOver">
                                            {friDateData.OTSumTime}
                                        </span>{' '}
                                        시간
                                    </td>
                                    <td rowSpan={3}>
                                        <span id="sum_times_fri">{friDateData.basicSumTime + friDateData.OTSumTime}</span> 시간
                                    </td>
                                    <td className="reasontable" style={{ height: '50px' }}>
                                        <pre>{friDateData.OTreason1}</pre>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reasontable" style={{ height: '50px' }}>
                                        <pre>{friDateData.OTreason2}</pre>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reasontable" style={{ height: '50px' }}>
                                        <pre>{friDateData.OTreason3}</pre>
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
                                    <td rowSpan={3}>{moment(satDateData.OTStartTime).format('HH:mm')}</td>
                                    <td rowSpan={3}>{moment(satDateData.OTEndTime).format('HH:mm')}</td>
                                    <td rowSpan={3}>{moment(satDateData.OTRestTime).format('HH:mm')}</td>
                                    <td rowSpan={3}>
                                        <span className="sum_over_time" id="sum_over_time_satOver">
                                            {satDateData.OTSumTime}
                                        </span>{' '}
                                        시간
                                    </td>
                                    <td rowSpan={3}>
                                        <span id="sum_times_sat">{satDateData.OTSumTime}</span> 시간
                                    </td>
                                    <td className="reasontable" style={{ height: '50px' }}>
                                        <pre>{satDateData.OTreason1}</pre>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reasontable" style={{ height: '50px' }}>
                                        <pre>{satDateData.OTreason2}</pre>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reasontable" style={{ height: '50px' }}>
                                        <pre>{satDateData.OTreason3}</pre>
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
                                    <td rowSpan={3}>{moment(sunDateData.OTStartTime).format('HH:mm')}</td>
                                    <td rowSpan={3}>{moment(sunDateData.OTEndTime).format('HH:mm')}</td>
                                    <td rowSpan={3}>{moment(sunDateData.OTRestTime).format('HH:mm')}</td>
                                    <td rowSpan={3}>
                                        <span className="sum_over_time" id="sum_over_time_sunOver">
                                            {sunDateData.OTSumTime}
                                        </span>{' '}
                                        시간
                                    </td>
                                    <td rowSpan={3}>
                                        <span id="sum_times_sun">{sunDateData.OTSumTime}</span> 시간
                                    </td>
                                    <td className="reasontable" style={{ height: '50px' }}>
                                        <pre>{sunDateData.OTreason1}</pre>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reasontable" style={{ height: '50px' }}>
                                        <pre>{sunDateData.OTreason2}</pre>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reasontable" style={{ height: '50px' }}>
                                        <pre>{sunDateData.OTreason3}</pre>
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
                                    <td colSpan={1}>
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
                                    <td rowSpan={3} width="100px">
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
                                    <td rowSpan={3} width="100px">
                                        <span className="sum_time" id="sum_time_mon">
                                            {monDateData.basicSumTime}
                                        </span>
                                        시간
                                    </td>

                                    <td rowSpan={3} width="100px">
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
                                    <td rowSpan={3} width="100px">
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
                                    <td rowSpan={3} width="100px">
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
                                        <DatePicker
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
                                        />
                                    </td>
                                    <td rowSpan={3}>
                                        {' '}
                                        <DatePicker
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
                                        />
                                    </td>
                                    <td rowSpan={3}>
                                        <span className="sum_time" id="sum_time_wed">
                                            {wedDateData.basicSumTime}
                                        </span>{' '}
                                        시간
                                    </td>
                                    <td rowSpan={3}>
                                        <DatePicker
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
                                        />
                                    </td>
                                    <td rowSpan={3}>
                                        <DatePicker
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
                                        />
                                    </td>
                                    <td rowSpan={3}>
                                        <DatePicker
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
                                        />
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
                                        <DatePicker
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
                                        />
                                    </td>
                                    <td rowSpan={3}>
                                        <DatePicker
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
                                        />
                                    </td>
                                    <td rowSpan={3}>
                                        <span className="sum_time" id="sum_time_thu">
                                            {thuDateData.basicSumTime}
                                        </span>{' '}
                                        시간
                                    </td>
                                    <td rowSpan={3}>
                                        <DatePicker
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
                                        />
                                    </td>
                                    <td rowSpan={3}>
                                        <DatePicker
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
                                        />
                                    </td>
                                    <td rowSpan={3}>
                                        <DatePicker
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
                                        />
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
                                        {' '}
                                        <DatePicker
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
                                        />
                                    </td>
                                    <td rowSpan={3}>
                                        {' '}
                                        <DatePicker
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
                                        />
                                    </td>
                                    <td rowSpan={3}>
                                        <span className="sum_time" id="sum_time_fri">
                                            {friDateData.basicSumTime}
                                        </span>{' '}
                                        시간
                                    </td>
                                    <td rowSpan={3}>
                                        {' '}
                                        <DatePicker
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
                                        />
                                    </td>
                                    <td rowSpan={3}>
                                        <DatePicker
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
                                        />
                                    </td>
                                    <td rowSpan={3}>
                                        <DatePicker
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
                                        />
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
                                        <DatePicker
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
                                        />
                                    </td>
                                    <td rowSpan={3}>
                                        <DatePicker
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
                                        />
                                    </td>
                                    <td rowSpan={3}>
                                        <DatePicker
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
                                        />
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
                                        <DatePicker
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
                                        />
                                    </td>
                                    <td rowSpan={3}>
                                        <DatePicker
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
                                        />
                                    </td>
                                    <td rowSpan={3}>
                                        <DatePicker
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
                                        />
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

                    <div>
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

export default WeekAfterOTWorkSpace;

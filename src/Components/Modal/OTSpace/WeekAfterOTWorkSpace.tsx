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
        } else {
            setMonDateData(initialState);
            setTueDateData(initialState);
        }
    };
    useEffect(() => {
        getDataOTData();
    }, []);

    useEffect(() => {
        getDataOTData();
        setMonDateData({ ...monDateData, clickDate: startDate.clone().format('YYYY-MM-DD') });
        setTueDateData({ ...tueDateData, clickDate: startDate.clone().format('YYYY-MM-DD') });
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
                            <span className="sum_time" id="sum_time_mon"></span>
                            {monDateData.basicSumTime} 시간
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
                        <td rowSpan={3}></td>
                        <td rowSpan={3}></td>
                        <td rowSpan={3}>
                            <span className="sum_time" id="sum_time_wed"></span> 시간
                        </td>
                        <td rowSpan={3}></td>
                        <td rowSpan={3}></td>
                        <td rowSpan={3}></td>
                        <td rowSpan={3}>
                            <span className="sum_over_time" id="sum_over_time_wedOver"></span> 시간
                        </td>
                        <td rowSpan={3}>
                            <span id="sum_times_wed"></span> 시간
                        </td>
                        <td className="reasontable">
                            <textarea placeholder="사유1" name="Wed_reason"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                            <textarea placeholder="사유2" name="Wed_reason1"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                            <textarea placeholder="사유3" name="Wed_reason2"></textarea>
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
                        <td rowSpan={3}></td>
                        <td rowSpan={3}></td>
                        <td rowSpan={3}>
                            <span className="sum_time" id="sum_time_thu"></span> 시간
                        </td>
                        <td rowSpan={3}></td>
                        <td rowSpan={3}></td>
                        <td rowSpan={3}></td>
                        <td rowSpan={3}>
                            <span className="sum_over_time" id="sum_over_time_thuOver"></span> 시간
                        </td>
                        <td rowSpan={3}>
                            <span id="sum_times_thu"></span> 시간
                        </td>
                        <td className="reasontable">
                            <textarea placeholder="사유1" name="Thu_reason"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                            <textarea placeholder="사유2" name="Thu_reason1"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                            <textarea placeholder="사유3" name="Thu_reason2"></textarea>
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
                        <td rowSpan={3}></td>
                        <td rowSpan={3}></td>
                        <td rowSpan={3}>
                            <span className="sum_time" id="sum_time_fri"></span> 시간
                        </td>
                        <td rowSpan={3}></td>
                        <td rowSpan={3}></td>
                        <td rowSpan={3}></td>
                        <td rowSpan={3}>
                            <span className="sum_over_time" id="sum_over_time_friOver"></span> 시간
                        </td>
                        <td rowSpan={3}>
                            <span id="sum_times_fri"></span> 시간
                        </td>
                        <td className="reasontable">
                            <textarea placeholder="사유1" name="Fri_reason"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                            <textarea placeholder="사유2" name="Fri_reason1"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                            <textarea placeholder="사유3" name="Fri_reason2"></textarea>
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
                        <td rowSpan={3}></td>
                        <td rowSpan={3}></td>
                        <td rowSpan={3}></td>
                        <td rowSpan={3}>
                            <span className="sum_over_time" id="sum_over_time_satOver"></span> 시간
                        </td>
                        <td rowSpan={3}>
                            <span id="sum_times_sat"></span> 시간
                        </td>
                        <td>
                            <textarea placeholder="사유1" name="Sat_reason"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <textarea placeholder="사유2" name="Sat_reason1"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <textarea placeholder="사유3" name="Sat_reason2"></textarea>
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
                        <td rowSpan={3}></td>
                        <td rowSpan={3}></td>
                        <td rowSpan={3}></td>
                        <td rowSpan={3}>
                            <span className="sum_over_time" id="sum_over_time_sunOver"></span> 시간
                        </td>
                        <td rowSpan={3}>
                            <span id="sum_times_sun"></span> 시간
                        </td>
                        <td className="reasontable">
                            <textarea placeholder="사유1" name="Sun_reason"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                            <textarea placeholder="사유2" name="Sun_reason1"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                            <textarea placeholder="사유3" name="Sun_reason2"></textarea>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={2}>소정근로 총합계</td>
                        <td colSpan={2}>
                            <span id="total_sum_time"></span> 시간
                        </td>
                        <td colSpan={2}>연장근무 총합계</td>
                        <td colSpan={2}>
                            <span id="total_sum_over_time"></span> 시간
                        </td>
                        <td colSpan={2}>총합계</td>
                        <td>
                            <span id="total_time"></span> 시간
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default WeekAfterOTWorkSpace;

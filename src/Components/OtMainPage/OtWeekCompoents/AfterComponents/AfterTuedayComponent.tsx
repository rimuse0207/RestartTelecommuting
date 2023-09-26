import React, { useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TimeClicksOptions, RestTimeClicksOptions } from '../SelectTimeOptionData';
import { OtTueComponentsProps } from '../OTComponentPropsType';
import moment from 'moment';
import { toast } from '../../../ToastMessage/ToastManager';
const AfterTuedayComponent = ({ tueDateData, setTueDateData, startDate, BusinessAcessState }: OtTueComponentsProps) => {
    // 화요일 시간 변동 시 state변경
    useEffect(() => {
        const OTendTimes = moment(`2022-01-01 ${tueDateData.OTEndTime}`);
        const OTStartTimes = moment(`2022-01-01 ${tueDateData.OTStartTime}`);
        const OTRestTimes = moment(`2022-01-01 ${tueDateData.OTRestTime}`);
        const OTBasicStartTimes = moment(`2022-01-01 ${tueDateData.basicStartTime}`);
        const OTBasicEndTimes = moment(`2022-01-01 ${tueDateData.basicEndTime}`);

        const sumBasicData = moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1;

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
                    // basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    basicSumTime: sumBasicData >= 0 ? sumBasicData : 24 + sumBasicData,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setTueDateData({
                    ...tueDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    // basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    basicSumTime: sumBasicData >= 0 ? sumBasicData : 24 + sumBasicData,
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
                    // basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    basicSumTime: sumBasicData >= 0 ? sumBasicData : 24 + sumBasicData,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setTueDateData({
                    ...tueDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    // basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    basicSumTime: sumBasicData >= 0 ? sumBasicData : 24 + sumBasicData,
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

    return (
        <>
            {' '}
            <tr>
                <td rowSpan={3} style={{ minWidth: '100px' }}>
                    {startDate.clone().add(1, 'day').format('YYYY-MM-DD')}
                    <br />
                    화요일
                </td>

                <td rowSpan={3} width="100px" style={{ textAlign: 'start', paddingLeft: '10px' }}>
                    <label htmlFor="tue_weekday_check">
                        <input
                            type="radio"
                            id="tue_weekday_check"
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
                    {tueDateData.holidayCheck === 'weekday' ? (
                        <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                            <InputLabel id="demo-select-small">시작시간</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={tueDateData.basicStartTime}
                                label="시작시간"
                                onChange={event => setTueDateData({ ...tueDateData, basicStartTime: event.target.value })}
                            >
                                {TimeClicksOptions.map(list => {
                                    return (
                                        <MenuItem value={list.value} key={list.value}>
                                            {list.label}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    ) : (
                        <></>
                    )}
                </td>
                <td rowSpan={3}>
                    {tueDateData.holidayCheck === 'weekday' ? (
                        <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                            <InputLabel id="demo-select-small">종료시간</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={tueDateData.basicEndTime}
                                label="종료시간"
                                onChange={event => setTueDateData({ ...tueDateData, basicEndTime: event.target.value })}
                            >
                                {TimeClicksOptions.map(list => {
                                    return (
                                        <MenuItem value={list.value} key={list.value}>
                                            {list.label}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    ) : (
                        <></>
                    )}
                </td>
                <td rowSpan={3} width="80px">
                    <span className="sum_time" id="sum_time_tue">
                        {tueDateData.basicSumTime}
                    </span>{' '}
                    시간
                </td>
                {BusinessAcessState ? (
                    <td rowSpan={3} width="100px" style={{ fontSize: '0.9em' }}>
                        <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                            <InputLabel id="demo-select-small">출장OR현장</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                label="출장OR현장"
                                value={tueDateData.business_trip}
                                onChange={e =>
                                    setTueDateData({
                                        ...tueDateData,
                                        business_trip: e.target.value,
                                    })
                                }
                            >
                                <MenuItem value="없음">없음</MenuItem>
                                <MenuItem value="현장">현장</MenuItem>
                                <MenuItem value="출장">출장</MenuItem>
                            </Select>
                        </FormControl>
                    </td>
                ) : (
                    <></>
                )}

                <td rowSpan={3}>
                    <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                        <InputLabel id="demo-select-small">시작시간</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={tueDateData.OTStartTime}
                            label="시작시간"
                            onChange={event => setTueDateData({ ...tueDateData, OTStartTime: event.target.value })}
                        >
                            {TimeClicksOptions.map(list => {
                                return (
                                    <MenuItem value={list.value} key={list.value}>
                                        {list.label}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </td>
                <td rowSpan={3}>
                    <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                        <InputLabel id="demo-select-small">종료시간</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={tueDateData.OTEndTime}
                            label="종료시간"
                            onChange={event => setTueDateData({ ...tueDateData, OTEndTime: event.target.value })}
                        >
                            {TimeClicksOptions.map(list => {
                                return (
                                    <MenuItem value={list.value} key={list.value}>
                                        {list.label}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </td>
                <td rowSpan={3}>
                    <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                        <InputLabel id="demo-select-small">휴게시간</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={tueDateData.OTRestTime}
                            label="휴게시간"
                            onChange={event => setTueDateData({ ...tueDateData, OTRestTime: event.target.value })}
                        >
                            {RestTimeClicksOptions.map(list => {
                                return (
                                    <MenuItem value={list.value} key={list.value}>
                                        {list.label}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </td>
                <td rowSpan={3} width="80px">
                    <span className="sum_over_time" id="sum_over_time_tueOver">
                        {tueDateData.OTSumTime}
                    </span>{' '}
                    시간
                </td>
                <td rowSpan={3} width="80px">
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
        </>
    );
};

export default React.memo(AfterTuedayComponent);

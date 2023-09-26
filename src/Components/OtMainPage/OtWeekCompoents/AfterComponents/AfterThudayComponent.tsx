import React, { useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TimeClicksOptions, RestTimeClicksOptions } from '../SelectTimeOptionData';
import { OtThuComponentsProps } from '../OTComponentPropsType';
import moment from 'moment';
import { toast } from '../../../ToastMessage/ToastManager';

const AfterThudayComponent = ({ thuDateData, setThuDateData, startDate, BusinessAcessState }: OtThuComponentsProps) => {
    // 목요일 state 변경시 재 렌더링
    useEffect(() => {
        const OTendTimes = moment(`2022-01-01 ${thuDateData.OTEndTime}`);
        const OTStartTimes = moment(`2022-01-01 ${thuDateData.OTStartTime}`);
        const OTRestTimes = moment(`2022-01-01 ${thuDateData.OTRestTime}`);
        const OTBasicStartTimes = moment(`2022-01-01 ${thuDateData.basicStartTime}`);
        const OTBasicEndTimes = moment(`2022-01-01 ${thuDateData.basicEndTime}`);

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
                setThuDateData({
                    ...thuDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: '00:00',
                    // basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    basicSumTime: sumBasicData >= 0 ? sumBasicData : 24 + sumBasicData,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setThuDateData({
                    ...thuDateData,
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
                setThuDateData({
                    ...thuDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: '00:00',
                    // basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    basicSumTime: sumBasicData >= 0 ? sumBasicData : 24 + sumBasicData,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setThuDateData({
                    ...thuDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    // basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    basicSumTime: sumBasicData >= 0 ? sumBasicData : 24 + sumBasicData,
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

    return (
        <>
            <tr>
                <td rowSpan={3}>
                    {startDate.clone().add(3, 'day').format('YYYY-MM-DD')}
                    <br />
                    목요일
                </td>
                <td rowSpan={3} width="100px" style={{ textAlign: 'start', paddingLeft: '10px' }}>
                    <label htmlFor="thu_weekday_check">
                        <input
                            type="radio"
                            id="thu_weekday_check"
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
                    {thuDateData.holidayCheck === 'weekday' ? (
                        <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                            <InputLabel id="demo-select-small">시작시간</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={thuDateData.basicStartTime}
                                label="시작시간"
                                onChange={event => setThuDateData({ ...thuDateData, basicStartTime: event.target.value })}
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
                    {thuDateData.holidayCheck === 'weekday' ? (
                        <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                            <InputLabel id="demo-select-small">종료시간</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={thuDateData.basicEndTime}
                                label="종료시간"
                                onChange={event => setThuDateData({ ...thuDateData, basicEndTime: event.target.value })}
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
                    <span className="sum_time" id="sum_time_thu">
                        {thuDateData.basicSumTime}
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
                                value={thuDateData.business_trip}
                                onChange={e =>
                                    setThuDateData({
                                        ...thuDateData,
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
                            value={thuDateData.OTStartTime}
                            label="시작시간"
                            onChange={event => setThuDateData({ ...thuDateData, OTStartTime: event.target.value })}
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
                            value={thuDateData.OTEndTime}
                            label="종료시간"
                            onChange={event => setThuDateData({ ...thuDateData, OTEndTime: event.target.value })}
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
                            value={thuDateData.OTRestTime}
                            label="휴게시간"
                            onChange={event => setThuDateData({ ...thuDateData, OTRestTime: event.target.value })}
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
                    <span className="sum_over_time" id="sum_over_time_thuOver">
                        {thuDateData.OTSumTime}
                    </span>{' '}
                    시간
                </td>
                <td rowSpan={3} width="80px">
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
        </>
    );
};

export default React.memo(AfterThudayComponent);

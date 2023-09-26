import React, { useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TimeClicksOptions, RestTimeClicksOptions } from '../SelectTimeOptionData';
import { OtSunComponentsProps } from '../OTComponentPropsType';
import moment from 'moment';
import { toast } from '../../../ToastMessage/ToastManager';
const AfterSundayComponent = ({ sunDateData, setSunDateData, startDate, BusinessAcessState }: OtSunComponentsProps) => {
    //일요일 시간 변동 시 재렌더링
    useEffect(() => {
        const OTendTimes = moment(`2022-01-01 ${sunDateData.OTEndTime}`);
        const OTStartTimes = moment(`2022-01-01 ${sunDateData.OTStartTime}`);
        const OTRestTimes = moment(`2022-01-01 ${sunDateData.OTRestTime}`);
        const OTBasicStartTimes = moment(`2022-01-01 ${sunDateData.basicStartTime}`);
        const OTBasicEndTimes = moment(`2022-01-01 ${sunDateData.basicEndTime}`);

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
                setSunDateData({
                    ...sunDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: '00:00',
                    // basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    basicSumTime: sumBasicData >= 0 ? sumBasicData : 24 + sumBasicData,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setSunDateData({
                    ...sunDateData,
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
                setSunDateData({
                    ...sunDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: '00:00',
                    // basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    basicSumTime: sumBasicData >= 0 ? sumBasicData : 24 + sumBasicData,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setSunDateData({
                    ...sunDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    // basicSumTime: moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1,
                    basicSumTime: sumBasicData >= 0 ? sumBasicData : 24 + sumBasicData,
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

    return (
        <>
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
                {BusinessAcessState ? (
                    <td rowSpan={3} width="100px" style={{ fontSize: '0.9em' }}>
                        <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                            <InputLabel id="demo-select-small">출장OR현장</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                label="출장OR현장"
                                value={sunDateData.business_trip}
                                onChange={e =>
                                    setSunDateData({
                                        ...sunDateData,
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
                            value={sunDateData.OTStartTime}
                            label="시작시간"
                            onChange={event => setSunDateData({ ...sunDateData, OTStartTime: event.target.value })}
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
                            value={sunDateData.OTEndTime}
                            label="종료시간"
                            onChange={event => setSunDateData({ ...sunDateData, OTEndTime: event.target.value })}
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
                            value={sunDateData.OTRestTime}
                            label="휴게시간"
                            onChange={event => setSunDateData({ ...sunDateData, OTRestTime: event.target.value })}
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
        </>
    );
};

export default React.memo(AfterSundayComponent);

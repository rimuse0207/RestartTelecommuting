import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TimeClicksOptions, RestTimeClicksOptions } from '../SelectTimeOptionData';
import { OtThuComponentsProps } from '../OTComponentPropsType';

const AfterThudayComponent = ({ thuDateData, setThuDateData, startDate }: OtThuComponentsProps) => {
    return (
        <>
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
                </td>
                <td rowSpan={3}>
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
                </td>
                <td rowSpan={3}>
                    <span className="sum_time" id="sum_time_thu">
                        {thuDateData.basicSumTime}
                    </span>{' '}
                    시간
                </td>
                <td rowSpan={3} width="100px">
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
        </>
    );
};

export default React.memo(AfterThudayComponent);

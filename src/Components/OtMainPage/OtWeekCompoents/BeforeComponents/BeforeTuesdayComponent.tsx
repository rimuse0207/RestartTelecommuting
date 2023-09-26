import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TimeClicksOptions, RestTimeClicksOptions } from '../SelectTimeOptionData';
import { OtTueComponentsProps } from '../OTComponentPropsType';

const BeforeTuesdayComponent = ({ tueDateData, setTueDateData, startDate }: OtTueComponentsProps) => {
    return (
        <>
            <tr>
                <td rowSpan={3} style={{ minWidth: '100px' }}>
                    {startDate.clone().add(1, 'day').format('YYYY-MM-DD')}
                    <br />
                    화요일
                </td>

                <td rowSpan={3} width="100px" style={{ textAlign: 'start', paddingLeft: '10px' }}>
                    <label htmlFor="tue_week_check">
                        <input
                            type="radio"
                            id="tue_week_check"
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
                <td rowSpan={3}>
                    <span className="sum_time" id="sum_time_tue">
                        {tueDateData.basicSumTime}
                    </span>{' '}
                    시간
                </td>

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
        </>
    );
};

export default React.memo(BeforeTuesdayComponent);

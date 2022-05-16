import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TimeClicksOptions, RestTimeClicksOptions } from '../SelectTimeOptionData';
import { OtFriComponentsProps } from '../OTComponentPropsType';

const AfterFridayComponent = ({ friDateData, setFriDateData, startDate }: OtFriComponentsProps) => {
    return (
        <>
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
                    <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                        <InputLabel id="demo-select-small">시작시간</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={friDateData.basicStartTime}
                            label="시작시간"
                            onChange={event => setFriDateData({ ...friDateData, basicStartTime: event.target.value })}
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
                            value={friDateData.basicEndTime}
                            label="종료시간"
                            onChange={event => setFriDateData({ ...friDateData, basicEndTime: event.target.value })}
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
                    <span className="sum_time" id="sum_time_fri">
                        {friDateData.basicSumTime}
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
                            value={friDateData.business_trip}
                            onChange={e =>
                                setFriDateData({
                                    ...friDateData,
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
                            value={friDateData.OTStartTime}
                            label="시작시간"
                            onChange={event => setFriDateData({ ...friDateData, OTStartTime: event.target.value })}
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
                            value={friDateData.OTEndTime}
                            label="종료시간"
                            onChange={event => setFriDateData({ ...friDateData, OTEndTime: event.target.value })}
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
                            value={friDateData.OTRestTime}
                            label="휴게시간"
                            onChange={event => setFriDateData({ ...friDateData, OTRestTime: event.target.value })}
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
        </>
    );
};

export default React.memo(AfterFridayComponent);

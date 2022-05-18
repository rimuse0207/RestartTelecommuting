import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TimeClicksOptions, RestTimeClicksOptions } from '../SelectTimeOptionData';
import { OtWedComponentsProps } from '../OTComponentPropsType';

const BeforeWeddayComponent = ({ wedDateData, setWedDateData, startDate }: OtWedComponentsProps) => {
    return (
        <>
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
                    <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                        <InputLabel id="demo-select-small">시작시간</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={wedDateData.basicStartTime}
                            label="시작시간"
                            onChange={event => setWedDateData({ ...wedDateData, basicStartTime: event.target.value })}
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
                            value={wedDateData.basicEndTime}
                            label="종료시간"
                            onChange={event => setWedDateData({ ...wedDateData, basicEndTime: event.target.value })}
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
                    <span className="sum_time" id="sum_time_wed">
                        {wedDateData.basicSumTime}
                    </span>{' '}
                    시간
                </td>

                <td rowSpan={3}>
                    <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                        <InputLabel id="demo-select-small">시작시간</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={wedDateData.OTStartTime}
                            label="시작시간"
                            onChange={event => setWedDateData({ ...wedDateData, OTStartTime: event.target.value })}
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
                            value={wedDateData.OTEndTime}
                            label="종료시간"
                            onChange={event => setWedDateData({ ...wedDateData, OTEndTime: event.target.value })}
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
                            value={wedDateData.OTRestTime}
                            label="휴게시간"
                            onChange={event => setWedDateData({ ...wedDateData, OTRestTime: event.target.value })}
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
        </>
    );
};

export default React.memo(BeforeWeddayComponent);

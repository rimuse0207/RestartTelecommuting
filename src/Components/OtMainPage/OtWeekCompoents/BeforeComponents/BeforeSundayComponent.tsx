import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TimeClicksOptions, RestTimeClicksOptions } from '../SelectTimeOptionData';
import { OtSunComponentsProps } from '../OTComponentPropsType';

const BeforeSundayComponent = ({ sunDateData, setSunDateData, startDate }: OtSunComponentsProps) => {
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

export default React.memo(BeforeSundayComponent);

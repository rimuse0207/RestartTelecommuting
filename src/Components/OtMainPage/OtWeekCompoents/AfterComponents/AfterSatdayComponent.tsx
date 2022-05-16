import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TimeClicksOptions, RestTimeClicksOptions } from '../SelectTimeOptionData';
import { OtSatComponentsProps } from '../OTComponentPropsType';
const AfterSatdayComponent = ({ satDateData, setSatDateData, startDate }: OtSatComponentsProps) => {
    return (
        <>
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
                <td rowSpan={3} width="100px">
                    <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                        <InputLabel id="demo-select-small">출장OR현장</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            label="출장OR현장"
                            value={satDateData.business_trip}
                            onChange={e =>
                                setSatDateData({
                                    ...satDateData,
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
                            value={satDateData.OTStartTime}
                            label="시작시간"
                            onChange={event => setSatDateData({ ...satDateData, OTStartTime: event.target.value })}
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
                            value={satDateData.OTEndTime}
                            label="종료시간"
                            onChange={event => setSatDateData({ ...satDateData, OTEndTime: event.target.value })}
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
                            value={satDateData.OTRestTime}
                            label="휴게시간"
                            onChange={event => setSatDateData({ ...satDateData, OTRestTime: event.target.value })}
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
        </>
    );
};

export default React.memo(AfterSatdayComponent);

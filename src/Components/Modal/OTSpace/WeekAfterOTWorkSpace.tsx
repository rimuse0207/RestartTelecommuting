import React from 'react';
import './WeekAfterOT.css';
const WeekAfterOTWorkSpace = () => {
    return (
        <div className="WeekAfterOTWorkSpace_big_div">
            <table>
                <thead>
                    <tr>
                        <th rowSpan={2}>일자</th>
                        <th rowSpan={2}>요일</th>
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
                        <td rowSpan={3} id="stat_date"></td>
                        <td rowSpan={3}>월요일</td>
                        <td rowSpan={3}>
                            <select name="holiday_mon" id="holiday_mon">
                                <option value="weekday" selected>
                                    평일
                                </option>
                                <option value="holiday">공휴일</option>
                            </select>
                        </td>
                        <td rowSpan={3}></td>
                        <td rowSpan={3}></td>
                        <td rowSpan={3}>
                            <span className="sum_time" id="sum_time_mon"></span> 시간
                        </td>

                        <td rowSpan={3}></td>
                        <td rowSpan={3}></td>
                        <td rowSpan={3}></td>
                        <td rowSpan={3}>
                            <span className="sum_over_time" id="sum_over_time_monOver">
                                {' '}
                            </span>{' '}
                            시간
                        </td>
                        <td rowSpan={3}>
                            <span id="sum_times_mon"> </span> 시간
                        </td>

                        <td className="reasontable">
                            <textarea placeholder="사유1" name="Mon_reason">
                                {' '}
                            </textarea>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                            <textarea placeholder="사유2" name="Mon_reason1">
                                {' '}
                            </textarea>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                            <textarea placeholder="사유3" name="Mon_reason2">
                                {' '}
                            </textarea>
                        </td>
                    </tr>

                    <tr>
                        <td rowSpan={3}> </td>
                        <td rowSpan={3}>화요일</td>
                        <td rowSpan={3}>
                            <select name="holiday_tue" id="holiday_tue">
                                <option value="weekday" selected>
                                    평일
                                </option>
                                <option value="holiday">공휴일</option>
                            </select>
                        </td>
                        <td rowSpan={3}></td>
                        <td rowSpan={3}></td>
                        <td rowSpan={3}>
                            <span className="sum_time" id="sum_time_tue"></span> 시간
                        </td>
                        <td rowSpan={3}></td>
                        <td rowSpan={3}></td>
                        <td rowSpan={3}></td>
                        <td rowSpan={3}>
                            <span className="sum_over_time" id="sum_over_time_tueOver"></span> 시간
                        </td>
                        <td rowSpan={3}>
                            <span id="sum_times_tue"></span> 시간
                        </td>
                        <td className="reasontable">
                            <textarea placeholder="사유1" name="Tue_reason"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                            <textarea placeholder="사유2" name="Tue_reason1"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                            <textarea placeholder="사유3" name="Tue_reason2"></textarea>
                        </td>
                    </tr>

                    <tr>
                        <td rowSpan={3}></td>
                        <td rowSpan={3}>수요일</td>
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
                        <td rowSpan={3}></td>
                        <td rowSpan={3}>목요일</td>
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
                        <td rowSpan={3}></td>
                        <td rowSpan={3}>금요일</td>
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
                        <td rowSpan={3}></td>
                        <td rowSpan={3}>토요일</td>
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
                        <td rowSpan={3} id="stats_date"></td>
                        <td rowSpan={3}>일요일</td>
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
                        <td></td>
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

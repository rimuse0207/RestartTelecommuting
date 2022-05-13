import React from 'react';
import PrinterBeforeSelectClickModal from '../../SelectClickModal/OT/PrinterBeforeSelectClickModal';
import styled from 'styled-components';

export const PrinterButtonContainer = styled.div`
    width: 95%;
    margin: 0 auto;
    text-align: end;
    margin-top: 10px;

    .WeekAfterOTWorkSpace_store_button_div {
        width: 30%;
        margin: 0 auto;
    }
    .WeekAfterOTWorkSpace_store_button_div > button {
        border: none;
        background-color: darkgrey;
        width: 100%;
        height: 50px;
        margin-top: 40px;
        margin-bottom: 40px;
        font-size: large;
        font-weight: bolder;
        color: white;
        border-radius: 20px;
    }
    .WeekAfterOTWorkSpace_store_button_div > button:hover {
        cursor: pointer;
        background-color: lightgray;
        color: black;
        transition: 0.5s ease-in-out;
    }
`;

type WeekBeforeOTWorkSpaceProps = {
    startDate: any;
    printerClicked: boolean;
    monDateData: WeekInfomDataTypes;
    tueDateData: WeekInfomDataTypes;
    wedDateData: WeekInfomDataTypes;
    thuDateData: WeekInfomDataTypes;
    friDateData: WeekInfomDataTypes;
    satDateData: WeekInfomDataTypes;
    sunDateData: WeekInfomDataTypes;
    id: string;
};

type WeekInfomDataTypes = {
    clickDate: string;
    basicStartTime: string;
    basicEndTime: string;
    basicSumTime: number;
    OTStartTime: string;
    OTEndTime: string;
    OTRestTime: string;
    OTSumTime: number;
    OTreason1: string;
    OTreason2: string;
    OTreason3: string;
    holidayCheck: string;
    OTnightSum: number;
};
const BeforeOtTeamLeaderFinish = ({
    startDate,
    monDateData,
    tueDateData,
    wedDateData,
    thuDateData,
    friDateData,
    satDateData,
    sunDateData,
    id,
}: WeekBeforeOTWorkSpaceProps) => {
    return (
        <div>
            <table>
                <thead style={{ backgroundColor: '#f7c80e' }}>
                    <tr
                        className="testssBefore"
                        style={{
                            borderTop: '1.5px solid black',
                            borderLeft: '1.3px solid black',
                            borderRight: '1.3px solid black',
                            backgroundColor: '#f7c80e',
                        }}
                    >
                        <th rowSpan={2} style={{ borderRight: '1.2px solid black', backgroundColor: '#f7c80e' }}>
                            일자
                        </th>

                        <th
                            colSpan={3}
                            style={{
                                borderRight: '1.2px solid black',
                                borderBottom: '1.2px solid black',
                                backgroundColor: '#f7c80e',
                            }}
                        >
                            소정근로
                        </th>
                        <th
                            colSpan={4}
                            style={{
                                borderRight: '1.2px solid black',
                                borderBottom: '1.2px solid black',
                                backgroundColor: '#f7c80e',
                            }}
                        >
                            {' '}
                            연장 근무
                        </th>
                        <th rowSpan={2} style={{ borderRight: '1.2px solid black', backgroundColor: '#f7c80e' }}>
                            총 근무 <br />
                            합계 시간
                            <br />
                        </th>
                        <th className="OTSpace_OTReason_th" rowSpan={2} style={{ backgroundColor: '#f7c80e' }}>
                            연장 사유
                        </th>
                    </tr>
                    <tr
                        className="testssBefore"
                        style={{
                            borderBottom: '1.2px solid black',
                            borderLeft: '1.3px solid black',
                            borderRight: '1.3px solid black',
                        }}
                    >
                        <td style={{ borderRight: '1.2px solid black' }}>시작시간</td>
                        <td style={{ borderRight: '1.2px solid black' }}>종료시간</td>
                        <td style={{ borderRight: '1.2px solid black' }}>
                            총 합계 <br /> 시간
                        </td>
                        <td style={{ borderRight: '1.2px solid black' }}>시작시간</td>
                        <td style={{ borderRight: '1.2px solid black' }}>종료시간</td>
                        <td style={{ borderRight: '1.2px solid black' }}>휴게시간</td>
                        <td style={{ borderRight: '1.2px solid black' }}>
                            총 합계 <br />
                            시간
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td id="stat_date" width="100px">
                            {startDate.clone().format('YYYY-MM-DD')}
                            <br />
                            월요일
                        </td>

                        <td width="100px">{monDateData.basicStartTime}</td>
                        <td width="100px">{monDateData.basicEndTime}</td>
                        <td width="100px">
                            <span className="sum_time" id="sum_time_mon">
                                {monDateData.basicSumTime}
                            </span>
                            시간
                        </td>

                        <td width="100px">{monDateData.OTStartTime}</td>
                        <td width="100px">{monDateData.OTEndTime}</td>
                        <td width="100px">{monDateData.OTRestTime}</td>
                        <td width="100px">
                            <span className="sum_over_time" id="sum_over_time_monOver">
                                {monDateData.OTSumTime}
                            </span>
                            시간
                        </td>
                        <td width="100px">
                            <span id="sum_times_mon"> {monDateData.basicSumTime + monDateData.OTSumTime}</span> 시간
                        </td>

                        <td className="reasontable" style={{ height: '100px' }}>
                            <pre>{monDateData.OTreason1}</pre>
                            <pre>{monDateData.OTreason2}</pre>
                            <pre>{monDateData.OTreason3}</pre>
                        </td>
                    </tr>

                    <tr>
                        <td style={{ minWidth: '100px' }}>
                            {startDate.clone().add(1, 'day').format('YYYY-MM-DD')}
                            <br />
                            화요일
                        </td>

                        <td>{tueDateData.basicStartTime}</td>
                        <td>{tueDateData.basicEndTime}</td>
                        <td>
                            <span className="sum_time" id="sum_time_tue">
                                {tueDateData.basicSumTime}
                            </span>{' '}
                            시간
                        </td>
                        <td>{tueDateData.OTStartTime}</td>
                        <td>{tueDateData.OTEndTime}</td>
                        <td>{tueDateData.OTRestTime}</td>
                        <td>
                            <span className="sum_over_time" id="sum_over_time_tueOver">
                                {tueDateData.OTSumTime}
                            </span>{' '}
                            시간
                        </td>
                        <td>
                            <span id="sum_times_tue">{tueDateData.basicSumTime + tueDateData.OTSumTime}</span> 시간
                        </td>
                        <td className="reasontable" style={{ height: '100px' }}>
                            <pre>{tueDateData.OTreason1}</pre>
                            <pre>{tueDateData.OTreason2}</pre>
                            <pre>{tueDateData.OTreason3}</pre>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            {startDate.clone().add(2, 'day').format('YYYY-MM-DD')}
                            <br />
                            수요일
                        </td>

                        <td>{wedDateData.basicStartTime}</td>
                        <td>{wedDateData.basicEndTime}</td>
                        <td>
                            <span className="sum_time" id="sum_time_wed">
                                {wedDateData.basicSumTime}
                            </span>{' '}
                            시간
                        </td>
                        <td>{wedDateData.OTStartTime}</td>
                        <td>{wedDateData.OTEndTime}</td>
                        <td>{wedDateData.OTRestTime}</td>
                        <td>
                            <span className="sum_over_time" id="sum_over_time_wedOver">
                                {wedDateData.OTSumTime}
                            </span>{' '}
                            시간
                        </td>
                        <td>
                            <span id="sum_times_wed">{wedDateData.basicSumTime + wedDateData.OTSumTime}</span> 시간
                        </td>
                        <td className="reasontable" style={{ height: '100px' }}>
                            <pre>{wedDateData.OTreason1}</pre>
                            <pre>{wedDateData.OTreason2}</pre>
                            <pre>{wedDateData.OTreason3}</pre>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            {startDate.clone().add(3, 'day').format('YYYY-MM-DD')}
                            <br />
                            목요일
                        </td>

                        <td>{thuDateData.basicStartTime}</td>
                        <td>{thuDateData.basicEndTime}</td>
                        <td>
                            <span className="sum_time" id="sum_time_thu">
                                {thuDateData.basicSumTime}
                            </span>{' '}
                            시간
                        </td>
                        <td>{thuDateData.OTStartTime}</td>
                        <td>{thuDateData.OTEndTime}</td>
                        <td>{thuDateData.OTRestTime}</td>
                        <td>
                            <span className="sum_over_time" id="sum_over_time_thuOver">
                                {thuDateData.OTSumTime}
                            </span>{' '}
                            시간
                        </td>
                        <td>
                            <span id="sum_times_thu">{thuDateData.basicSumTime + thuDateData.OTSumTime}</span> 시간
                        </td>
                        <td className="reasontable" style={{ height: '100px' }}>
                            <pre>{thuDateData.OTreason1}</pre>
                            <pre>{thuDateData.OTreason2}</pre>
                            <pre>{thuDateData.OTreason3}</pre>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            {startDate.clone().add(4, 'day').format('YYYY-MM-DD')}
                            <br />
                            금요일
                        </td>

                        <td>{friDateData.basicStartTime}</td>
                        <td>{friDateData.basicEndTime}</td>
                        <td>
                            <span className="sum_time" id="sum_time_fri">
                                {friDateData.basicSumTime}
                            </span>{' '}
                            시간
                        </td>
                        <td>{friDateData.OTStartTime}</td>
                        <td>{friDateData.OTEndTime}</td>
                        <td>{friDateData.OTRestTime}</td>
                        <td>
                            <span className="sum_over_time" id="sum_over_time_friOver">
                                {friDateData.OTSumTime}
                            </span>{' '}
                            시간
                        </td>
                        <td>
                            <span id="sum_times_fri">{friDateData.basicSumTime + friDateData.OTSumTime}</span> 시간
                        </td>
                        <td className="reasontable" style={{ height: '100px' }}>
                            <pre>{friDateData.OTreason1}</pre>
                            <pre>{friDateData.OTreason2}</pre>
                            <pre>{friDateData.OTreason3}</pre>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            {startDate.clone().add(5, 'day').format('YYYY-MM-DD')}
                            <br />
                            토요일
                        </td>

                        <td></td>
                        <td></td>

                        <td></td>
                        <td>{satDateData.OTStartTime}</td>
                        <td>{satDateData.OTEndTime}</td>
                        <td>{satDateData.OTRestTime}</td>
                        <td>
                            <span className="sum_over_time" id="sum_over_time_satOver">
                                {satDateData.OTSumTime}
                            </span>{' '}
                            시간
                        </td>
                        <td>
                            <span id="sum_times_sat">{satDateData.OTSumTime}</span> 시간
                        </td>
                        <td className="reasontable" style={{ height: '100px' }}>
                            <pre>{satDateData.OTreason1}</pre>
                            <pre>{satDateData.OTreason2}</pre>
                            <pre>{satDateData.OTreason3}</pre>
                        </td>
                    </tr>

                    <tr>
                        <td id="stats_date">
                            {startDate.clone().add(6, 'day').format('YYYY-MM-DD')}
                            <br />
                            일요일
                        </td>

                        <td></td>

                        <td></td>
                        <td></td>
                        <td>{sunDateData.OTStartTime}</td>
                        <td>{sunDateData.OTEndTime}</td>
                        <td>{sunDateData.OTRestTime}</td>
                        <td>
                            <span className="sum_over_time" id="sum_over_time_sunOver">
                                {sunDateData.OTSumTime}
                            </span>{' '}
                            시간
                        </td>
                        <td>
                            <span id="sum_times_sun">{sunDateData.OTSumTime}</span> 시간
                        </td>
                        <td className="reasontable" style={{ height: '100px' }}>
                            <pre>{sunDateData.OTreason1}</pre>
                            <pre>{sunDateData.OTreason2}</pre>
                            <pre>{sunDateData.OTreason3}</pre>
                        </td>
                    </tr>

                    <tr style={{ height: '50px', border: '1.1px solid black' }}>
                        <td colSpan={2} style={{ background: 'darkgray', fontWeight: 'bolder' }}>
                            소정근로 총합계
                        </td>
                        <td colSpan={2}>
                            <span id="total_sum_time">
                                {monDateData.basicSumTime +
                                    tueDateData.basicSumTime +
                                    wedDateData.basicSumTime +
                                    thuDateData.basicSumTime +
                                    friDateData.basicSumTime}
                            </span>
                            시간
                        </td>
                        <td colSpan={3} style={{ background: 'darkgray', fontWeight: 'bolder' }}>
                            연장근무 총합계
                        </td>
                        <td colSpan={2}>
                            <span id="total_sum_over_time">
                                {monDateData.OTSumTime +
                                    tueDateData.OTSumTime +
                                    wedDateData.OTSumTime +
                                    thuDateData.OTSumTime +
                                    friDateData.OTSumTime +
                                    satDateData.OTSumTime +
                                    sunDateData.OTSumTime}
                            </span>{' '}
                            시간
                        </td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <PrinterButtonContainer>
                <div className="WeekAfterOTWorkSpace_store_button_div">
                    <button
                        onClick={() =>
                            window.open(
                                `/PrinterTest/before/${startDate.clone().format('YYYY-MM-DD')}/${id}`,
                                'BfterOT',
                                'width=980, height=700'
                            )
                        }
                    >
                        출력하기
                    </button>
                </div>
            </PrinterButtonContainer>
        </div>
    );
};

export default BeforeOtTeamLeaderFinish;

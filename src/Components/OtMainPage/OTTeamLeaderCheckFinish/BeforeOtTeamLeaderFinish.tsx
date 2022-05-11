import React from 'react';
import PrinterBeforeSelectClickModal from '../../SelectClickModal/OT/PrinterBeforeSelectClickModal';
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
                        <td rowSpan={3} id="stat_date" width="100px">
                            {startDate.clone().format('YYYY-MM-DD')}
                            <br />
                            월요일
                        </td>

                        <td rowSpan={3} width="100px">
                            {monDateData.basicStartTime}
                        </td>
                        <td rowSpan={3} width="100px">
                            {monDateData.basicEndTime}
                        </td>
                        <td rowSpan={3} width="100px">
                            <span className="sum_time" id="sum_time_mon">
                                {monDateData.basicSumTime}
                            </span>
                            시간
                        </td>

                        <td rowSpan={3} width="100px">
                            {monDateData.OTStartTime}
                        </td>
                        <td rowSpan={3} width="100px">
                            {monDateData.OTEndTime}
                        </td>
                        <td rowSpan={3} width="100px">
                            {monDateData.OTRestTime}
                        </td>
                        <td rowSpan={3} width="100px">
                            <span className="sum_over_time" id="sum_over_time_monOver">
                                {monDateData.OTSumTime}
                            </span>
                            시간
                        </td>
                        <td rowSpan={3} width="100px">
                            <span id="sum_times_mon"> {monDateData.basicSumTime + monDateData.OTSumTime}</span> 시간
                        </td>

                        <td className="reasontable" style={{ height: '50px' }}>
                            <pre>{monDateData.OTreason1}</pre>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable" style={{ height: '50px' }}>
                            <pre>{monDateData.OTreason2}</pre>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable" style={{ height: '50px' }}>
                            <pre>{monDateData.OTreason3}</pre>
                        </td>
                    </tr>

                    <tr>
                        <td rowSpan={3} style={{ minWidth: '100px' }}>
                            {startDate.clone().add(1, 'day').format('YYYY-MM-DD')}
                            <br />
                            화요일
                        </td>

                        <td rowSpan={3}>{tueDateData.basicStartTime}</td>
                        <td rowSpan={3}>{tueDateData.basicEndTime}</td>
                        <td rowSpan={3}>
                            <span className="sum_time" id="sum_time_tue">
                                {tueDateData.basicSumTime}
                            </span>{' '}
                            시간
                        </td>
                        <td rowSpan={3}>{tueDateData.OTStartTime}</td>
                        <td rowSpan={3}>{tueDateData.OTEndTime}</td>
                        <td rowSpan={3}>{tueDateData.OTRestTime}</td>
                        <td rowSpan={3}>
                            <span className="sum_over_time" id="sum_over_time_tueOver">
                                {tueDateData.OTSumTime}
                            </span>{' '}
                            시간
                        </td>
                        <td rowSpan={3}>
                            <span id="sum_times_tue">{tueDateData.basicSumTime + tueDateData.OTSumTime}</span> 시간
                        </td>
                        <td className="reasontable" style={{ height: '50px' }}>
                            <pre>{tueDateData.OTreason1}</pre>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable" style={{ height: '50px' }}>
                            <pre>{tueDateData.OTreason2}</pre>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable" style={{ height: '50px' }}>
                            <pre>{tueDateData.OTreason3}</pre>
                        </td>
                    </tr>

                    <tr>
                        <td rowSpan={3}>
                            {startDate.clone().add(2, 'day').format('YYYY-MM-DD')}
                            <br />
                            수요일
                        </td>

                        <td rowSpan={3}>{wedDateData.basicStartTime}</td>
                        <td rowSpan={3}>{wedDateData.basicEndTime}</td>
                        <td rowSpan={3}>
                            <span className="sum_time" id="sum_time_wed">
                                {wedDateData.basicSumTime}
                            </span>{' '}
                            시간
                        </td>
                        <td rowSpan={3}>{wedDateData.OTStartTime}</td>
                        <td rowSpan={3}>{wedDateData.OTEndTime}</td>
                        <td rowSpan={3}>{wedDateData.OTRestTime}</td>
                        <td rowSpan={3}>
                            <span className="sum_over_time" id="sum_over_time_wedOver">
                                {wedDateData.OTSumTime}
                            </span>{' '}
                            시간
                        </td>
                        <td rowSpan={3}>
                            <span id="sum_times_wed">{wedDateData.basicSumTime + wedDateData.OTSumTime}</span> 시간
                        </td>
                        <td className="reasontable" style={{ height: '50px' }}>
                            <pre>{wedDateData.OTreason1}</pre>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable" style={{ height: '50px' }}>
                            <pre>{wedDateData.OTreason2}</pre>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable" style={{ height: '50px' }}>
                            <pre>{wedDateData.OTreason3}</pre>
                        </td>
                    </tr>

                    <tr>
                        <td rowSpan={3}>
                            {startDate.clone().add(3, 'day').format('YYYY-MM-DD')}
                            <br />
                            목요일
                        </td>

                        <td rowSpan={3}>{thuDateData.basicStartTime}</td>
                        <td rowSpan={3}>{thuDateData.basicEndTime}</td>
                        <td rowSpan={3}>
                            <span className="sum_time" id="sum_time_thu">
                                {thuDateData.basicSumTime}
                            </span>{' '}
                            시간
                        </td>
                        <td rowSpan={3}>{thuDateData.OTStartTime}</td>
                        <td rowSpan={3}>{thuDateData.OTEndTime}</td>
                        <td rowSpan={3}>{thuDateData.OTRestTime}</td>
                        <td rowSpan={3}>
                            <span className="sum_over_time" id="sum_over_time_thuOver">
                                {thuDateData.OTSumTime}
                            </span>{' '}
                            시간
                        </td>
                        <td rowSpan={3}>
                            <span id="sum_times_thu">{thuDateData.basicSumTime + thuDateData.OTSumTime}</span> 시간
                        </td>
                        <td className="reasontable" style={{ height: '50px' }}>
                            <pre>{thuDateData.OTreason1}</pre>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable" style={{ height: '50px' }}>
                            <pre>{thuDateData.OTreason2}</pre>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable" style={{ height: '50px' }}>
                            <pre>{thuDateData.OTreason3}</pre>
                        </td>
                    </tr>

                    <tr>
                        <td rowSpan={3}>
                            {startDate.clone().add(4, 'day').format('YYYY-MM-DD')}
                            <br />
                            금요일
                        </td>

                        <td rowSpan={3}>{friDateData.basicStartTime}</td>
                        <td rowSpan={3}>{friDateData.basicEndTime}</td>
                        <td rowSpan={3}>
                            <span className="sum_time" id="sum_time_fri">
                                {friDateData.basicSumTime}
                            </span>{' '}
                            시간
                        </td>
                        <td rowSpan={3}>{friDateData.OTStartTime}</td>
                        <td rowSpan={3}>{friDateData.OTEndTime}</td>
                        <td rowSpan={3}>{friDateData.OTRestTime}</td>
                        <td rowSpan={3}>
                            <span className="sum_over_time" id="sum_over_time_friOver">
                                {friDateData.OTSumTime}
                            </span>{' '}
                            시간
                        </td>
                        <td rowSpan={3}>
                            <span id="sum_times_fri">{friDateData.basicSumTime + friDateData.OTSumTime}</span> 시간
                        </td>
                        <td className="reasontable" style={{ height: '50px' }}>
                            <pre>{friDateData.OTreason1}</pre>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable" style={{ height: '50px' }}>
                            <pre>{friDateData.OTreason2}</pre>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable" style={{ height: '50px' }}>
                            <pre>{friDateData.OTreason3}</pre>
                        </td>
                    </tr>

                    <tr>
                        <td rowSpan={3}>
                            {startDate.clone().add(5, 'day').format('YYYY-MM-DD')}
                            <br />
                            토요일
                        </td>

                        <td rowSpan={3}></td>
                        <td rowSpan={3}></td>

                        <td rowSpan={3}></td>
                        <td rowSpan={3}>{satDateData.OTStartTime}</td>
                        <td rowSpan={3}>{satDateData.OTEndTime}</td>
                        <td rowSpan={3}>{satDateData.OTRestTime}</td>
                        <td rowSpan={3}>
                            <span className="sum_over_time" id="sum_over_time_satOver">
                                {satDateData.OTSumTime}
                            </span>{' '}
                            시간
                        </td>
                        <td rowSpan={3}>
                            <span id="sum_times_sat">{satDateData.OTSumTime}</span> 시간
                        </td>
                        <td className="reasontable" style={{ height: '50px' }}>
                            <pre>{satDateData.OTreason1}</pre>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable" style={{ height: '50px' }}>
                            <pre>{satDateData.OTreason2}</pre>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable" style={{ height: '50px' }}>
                            <pre>{satDateData.OTreason3}</pre>
                        </td>
                    </tr>

                    <tr>
                        <td rowSpan={3} id="stats_date">
                            {startDate.clone().add(6, 'day').format('YYYY-MM-DD')}
                            <br />
                            일요일
                        </td>

                        <td rowSpan={3}></td>

                        <td rowSpan={3}></td>
                        <td rowSpan={3}></td>
                        <td rowSpan={3}>{sunDateData.OTStartTime}</td>
                        <td rowSpan={3}>{sunDateData.OTEndTime}</td>
                        <td rowSpan={3}>{sunDateData.OTRestTime}</td>
                        <td rowSpan={3}>
                            <span className="sum_over_time" id="sum_over_time_sunOver">
                                {sunDateData.OTSumTime}
                            </span>{' '}
                            시간
                        </td>
                        <td rowSpan={3}>
                            <span id="sum_times_sun">{sunDateData.OTSumTime}</span> 시간
                        </td>
                        <td className="reasontable" style={{ height: '50px' }}>
                            <pre>{sunDateData.OTreason1}</pre>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable" style={{ height: '50px' }}>
                            <pre>{sunDateData.OTreason2}</pre>
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable" style={{ height: '50px' }}>
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
            <div className="fasfdasfas">
                {/* {printerClicked ? (
                    <PrinterBeforeSelectClickModal
                        printerClicked={printerClicked}
                        clicksData={clicksData}
                        setPrinterClicked={data => setPrinterClicked(data)}
                    ></PrinterBeforeSelectClickModal>
                ) : (
                    <div></div>
                )} */}
            </div>
        </div>
    );
};

export default BeforeOtTeamLeaderFinish;

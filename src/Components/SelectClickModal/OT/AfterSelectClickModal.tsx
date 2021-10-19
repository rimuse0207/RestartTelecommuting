import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { toast } from '../../ToastMessage/ToastManager';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../models/index';

type TeleSelectClickModalProps = {
    clicksTitle: string;
    clicksData: any | null;
    modalClose: () => void;
};

const AfterSelectClickModal = ({ clicksTitle, clicksData, modalClose }: TeleSelectClickModalProps) => {
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const [checkedOTdata, setcheckedOTdata] = useState({
        start_time_mon: '',
        start_time_tue: '',
        start_time_wed: '',
        start_time_thu: '',
        start_time_fri: '',
        end_time_mon: '',
        end_time_tue: '',
        end_time_wed: '',
        end_time_thu: '',
        end_time_fri: '',
        mon_time: 0,
        tue_time: 0,
        wed_time: 0,
        thu_time: 0,
        fri_time: 0,
    });

    useEffect(() => {
        getSomeData(clicksData);
    }, [clicksData]);

    const getSomeData = async (clicksData: any) => {
        console.log(clicksData);
        try {
            const getSomeDatas = await axios.post(`${process.env.REACT_APP_API_URL}/TeamSelectOT_app_server/AfterOTDataSelectModal`, {
                date: moment(clicksData.date_mon).format('YYYY-MM-DD'),
                id: clicksData.id,
            });
            if (getSomeDatas.data.dataSuccess) {
                setcheckedOTdata(getSomeDatas.data.data[0]);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <div>
                <table style={{ width: '100%', borderCollapse: 'collapse', borderSpacing: '0', textAlign: 'center' }}>
                    <thead style={{ backgroundColor: '#F7C80E' }}>
                        <tr
                            className="testssBefore"
                            style={{
                                borderTop: '1.5px solid black',
                                borderLeft: '1.3px solid black',
                                borderRight: '1.3px solid black',
                                backgroundColor: '#F7C80E',
                            }}
                        >
                            <th rowSpan={2} style={{ borderRight: '1.2px solid black', backgroundColor: '#F7C80E' }}>
                                일자
                            </th>
                            <th
                                colSpan={3}
                                style={{
                                    borderRight: '1.2px solid black',
                                    borderBottom: '1.2px solid black',
                                    backgroundColor: '#F7C80E',
                                }}
                            >
                                소정근로
                            </th>
                            <th
                                colSpan={4}
                                style={{
                                    borderRight: '1.2px solid black',
                                    borderBottom: '1.2px solid black',
                                    backgroundColor: '#F7C80E',
                                }}
                            >
                                {' '}
                                연장 근무
                            </th>
                            <th rowSpan={2} style={{ borderRight: '1.2px solid black', backgroundColor: '#F7C80E' }}>
                                총 근무 <br />
                                합계 시간
                                <br />
                            </th>
                            <th rowSpan={2} style={{ backgroundColor: '#F7C80E' }}>
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
                                {clicksData.date_mon}
                                <br />
                                월요일
                            </td>

                            <td rowSpan={3} width="100px">
                                {checkedOTdata.start_time_mon}
                            </td>
                            <td rowSpan={3} width="100px">
                                {checkedOTdata.end_time_mon}
                            </td>
                            <td rowSpan={3} width="100px">
                                <span className="sum_time" id="sum_time_mon">
                                    {checkedOTdata.mon_time}
                                </span>
                                시간
                            </td>

                            <td rowSpan={3} width="100px">
                                {clicksData.start_time_mon}
                            </td>
                            <td rowSpan={3} width="100px">
                                {clicksData.end_time_mon}
                            </td>
                            <td rowSpan={3} width="100px">
                                {clicksData.mon_rest}
                            </td>
                            <td rowSpan={3} width="100px">
                                <span className="sum_over_time" id="sum_over_time_monOver">
                                    {clicksData.mon_time}
                                </span>
                                시간
                            </td>
                            <td rowSpan={3} width="100px">
                                <span id="sum_times_mon">{clicksData.mon_time + checkedOTdata.mon_time}</span> 시간
                            </td>

                            <td className="reasontable">
                                <pre>{clicksData.mon_reason}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td className="reasontable">
                                <pre>{clicksData.mon_reason1}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <pre>{clicksData.mon_reason2}</pre>
                            </td>
                        </tr>

                        <tr>
                            <td rowSpan={3} style={{ minWidth: '100px' }}>
                                {clicksData.date_tue}
                                <br />
                                화요일
                            </td>

                            <td rowSpan={3}>{checkedOTdata.start_time_tue}</td>
                            <td rowSpan={3}>{checkedOTdata.end_time_tue}</td>
                            <td rowSpan={3}>
                                <span className="sum_time" id="sum_time_tue">
                                    {checkedOTdata.tue_time}
                                </span>{' '}
                                시간
                            </td>
                            <td rowSpan={3}>{clicksData.start_time_tue}</td>
                            <td rowSpan={3}>{clicksData.end_time_tue}</td>
                            <td rowSpan={3}>{clicksData.tue_rest}</td>
                            <td rowSpan={3}>
                                <span className="sum_over_time" id="sum_over_time_tueOver">
                                    {clicksData.tue_time}
                                </span>{' '}
                                시간
                            </td>
                            <td rowSpan={3}>
                                <span id="sum_times_tue">{clicksData.tue_time + checkedOTdata.tue_time}</span> 시간
                            </td>
                            <td className="reasontable">
                                <pre>{clicksData.tue_reason}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td className="reasontable">
                                <pre>{clicksData.tue_reason1}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <pre>{clicksData.tue_reason2}</pre>
                            </td>
                        </tr>

                        <tr>
                            <td rowSpan={3}>
                                {clicksData.date_wed}
                                <br />
                                수요일
                            </td>

                            <td rowSpan={3}>{checkedOTdata.start_time_wed}</td>
                            <td rowSpan={3}>{checkedOTdata.end_time_tue}</td>
                            <td rowSpan={3}>
                                <span className="sum_time" id="sum_time_wed">
                                    {checkedOTdata.wed_time}
                                </span>{' '}
                                시간
                            </td>
                            <td rowSpan={3}>{clicksData.start_time_wed}</td>
                            <td rowSpan={3}>{clicksData.end_time_wed}</td>
                            <td rowSpan={3}>{clicksData.wed_rest}</td>
                            <td rowSpan={3}>
                                <span className="sum_over_time" id="sum_over_time_wedOver">
                                    {clicksData.wed_time}
                                </span>{' '}
                                시간
                            </td>
                            <td rowSpan={3}>
                                <span id="sum_times_wed">{clicksData.wed_time + checkedOTdata.wed_time}</span> 시간
                            </td>
                            <td className="reasontable">
                                <pre>{clicksData.wed_reason}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td className="reasontable">
                                <pre>{clicksData.wed_reason1}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <pre>{clicksData.wed_reason2}</pre>
                            </td>
                        </tr>

                        <tr>
                            <td rowSpan={3}>
                                {clicksData.date_thu}
                                <br />
                                목요일
                            </td>

                            <td rowSpan={3}>{checkedOTdata.start_time_thu}</td>
                            <td rowSpan={3}>{checkedOTdata.end_time_thu}</td>
                            <td rowSpan={3}>
                                <span className="sum_time" id="sum_time_thu">
                                    {checkedOTdata.thu_time}
                                </span>{' '}
                                시간
                            </td>
                            <td rowSpan={3}>{clicksData.start_time_thu}</td>
                            <td rowSpan={3}>{clicksData.end_time_thu}</td>
                            <td rowSpan={3}>{clicksData.thu_rest}</td>
                            <td rowSpan={3}>
                                <span className="sum_over_time" id="sum_over_time_thuOver">
                                    {clicksData.thu_time}
                                </span>{' '}
                                시간
                            </td>
                            <td rowSpan={3}>
                                <span id="sum_times_thu">{clicksData.thu_time + checkedOTdata.thu_time}</span> 시간
                            </td>
                            <td className="reasontable">
                                <pre>{clicksData.thu_reason}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td className="reasontable">
                                <pre>{clicksData.thu_reason1}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <pre>{clicksData.thu_reason2}</pre>
                            </td>
                        </tr>

                        <tr>
                            <td rowSpan={3}>
                                {clicksData.date_fri}
                                <br />
                                금요일
                            </td>

                            <td rowSpan={3}>{checkedOTdata.start_time_fri}</td>
                            <td rowSpan={3}>{checkedOTdata.end_time_fri}</td>
                            <td rowSpan={3}>
                                <span className="sum_time" id="sum_time_fri">
                                    {checkedOTdata.fri_time}
                                </span>{' '}
                                시간
                            </td>
                            <td rowSpan={3}>{clicksData.start_time_fri}</td>
                            <td rowSpan={3}>{clicksData.end_time_fri}</td>
                            <td rowSpan={3}>{clicksData.fri_rest}</td>
                            <td rowSpan={3}>
                                <span className="sum_over_time" id="sum_over_time_friOver">
                                    {clicksData.fri_time}
                                </span>{' '}
                                시간
                            </td>
                            <td rowSpan={3}>
                                <span id="sum_times_fri">{clicksData.fri_time + checkedOTdata.fri_time}</span> 시간
                            </td>
                            <td className="reasontable">
                                <pre>{clicksData.fri_reason}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td className="reasontable">
                                <pre>{clicksData.fri_reason1}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <pre>{clicksData.fri_reason2}</pre>
                            </td>
                        </tr>

                        <tr>
                            <td rowSpan={3}>
                                {clicksData.date_sat}
                                <br />
                                토요일
                            </td>

                            <td rowSpan={3}></td>
                            <td rowSpan={3}></td>
                            <td rowSpan={3}></td>
                            <td rowSpan={3}>{clicksData.start_time_sat}</td>
                            <td rowSpan={3}>{clicksData.end_time_sat}</td>
                            <td rowSpan={3}>{clicksData.sat_rest}</td>
                            <td rowSpan={3}>
                                <span className="sum_over_time" id="sum_over_time_satOver">
                                    {clicksData.sat_time}
                                </span>{' '}
                                시간
                            </td>
                            <td rowSpan={3}>
                                <span id="sum_times_sat">{clicksData.sat_time}</span> 시간
                            </td>
                            <td className="reasontable">
                                <pre>{clicksData.sat_reason}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td className="reasontable">
                                <pre>{clicksData.sat_reason1}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <pre>{clicksData.sat_reason2}</pre>
                            </td>
                        </tr>

                        <tr>
                            <td rowSpan={3} id="stats_date">
                                {clicksData.date_sun}
                                <br />
                                일요일
                            </td>

                            <td rowSpan={3}></td>
                            <td rowSpan={3}></td>
                            <td rowSpan={3}></td>
                            <td rowSpan={3}>{clicksData.start_time_sun}</td>
                            <td rowSpan={3}>{clicksData.end_time_sun}</td>
                            <td rowSpan={3}>{clicksData.sun_rest}</td>
                            <td rowSpan={3}>
                                <span className="sum_over_time" id="sum_over_time_sunOver">
                                    {clicksData.sun_time}
                                </span>{' '}
                                시간
                            </td>
                            <td rowSpan={3}>
                                <span id="sum_times_sun">{clicksData.sun_time}</span> 시간
                            </td>
                            <td className="reasontable">
                                <pre>{clicksData.sun_reason}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td className="reasontable">
                                <pre>{clicksData.sun_reason1}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <pre>{clicksData.sun_reason2}</pre>
                            </td>
                        </tr>

                        <tr style={{ height: '50px', border: '1.1px solid black' }}>
                            <td colSpan={3} style={{ background: 'darkgray', fontWeight: 'bolder' }}>
                                소정근로 총합계
                            </td>
                            <td colSpan={1}>
                                <span id="total_sum_time">
                                    {checkedOTdata.mon_time +
                                        checkedOTdata.tue_time +
                                        checkedOTdata.wed_time +
                                        checkedOTdata.thu_time +
                                        checkedOTdata.fri_time}
                                </span>
                                시간
                            </td>
                            <td colSpan={3} style={{ background: 'darkgray', fontWeight: 'bolder' }}>
                                연장근무 총합계
                            </td>
                            <td colSpan={1}>
                                <span id="total_sum_over_time">
                                    {clicksData.mon_time +
                                        clicksData.tue_time +
                                        clicksData.wed_time +
                                        clicksData.thu_time +
                                        clicksData.fri_time +
                                        clicksData.sat_time +
                                        clicksData.sun_time}
                                    시간
                                </span>
                            </td>
                            <td colSpan={1} style={{ background: 'darkgray', fontWeight: 'bolder' }}>
                                총 합계 시간
                            </td>
                            <td>
                                <span id="total_sum_over_time">
                                    {clicksData.mon_time +
                                        clicksData.tue_time +
                                        clicksData.wed_time +
                                        clicksData.thu_time +
                                        clicksData.fri_time +
                                        clicksData.sat_time +
                                        clicksData.sun_time +
                                        checkedOTdata.mon_time +
                                        checkedOTdata.tue_time +
                                        checkedOTdata.wed_time +
                                        checkedOTdata.thu_time +
                                        checkedOTdata.fri_time}
                                    시간
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                {clicksData.leadercheck === 0 ? (
                    <div style={{ color: '#f78a8a' }} className="AcceptOkayDiv" onClick={() => modalClose()}>
                        승인확인중...
                    </div>
                ) : (
                    <div className="AcceptOkayDiv" onClick={() => modalClose()}>
                        승인완료.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AfterSelectClickModal;

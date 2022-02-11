import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from '../../../ToastMessage/ToastManager';
import Modal from 'react-modal';

type TeamLeaderModalProps = {
    onClicked: boolean;
    modalClose: () => void;
    getDataOTData: () => void;
    clickedOTData: {
        date_mon: string;
        date_tue: string;
        date_wed: string;
        date_thu: string;
        date_fri: string;
        date_sat: string;
        date_sun: string;
        start_time_mon: string;
        start_time_tue: string;
        start_time_wed: string;
        start_time_thu: string;
        start_time_fri: string;
        start_time_sat: string;
        start_time_sun: string;
        end_time_mon: string;
        end_time_tue: string;
        end_time_wed: string;
        end_time_thu: string;
        end_time_fri: string;
        end_time_sat: string;
        end_time_sun: string;
        mon_rest: string;
        tue_rest: string;
        wed_rest: string;
        thu_rest: string;
        fri_rest: string;
        sat_rest: string;
        sun_rest: string;
        mon_time: number;
        tue_time: number;
        wed_time: number;
        thu_time: number;
        fri_time: number;
        sat_time: number;
        sun_time: number;
        mon_reason: string;
        tue_reason: string;
        wed_reason: string;
        thu_reason: string;
        fri_reason: string;
        sat_reason: string;
        sun_reason: string;
        mon_reason1: string;
        tue_reason1: string;
        wed_reason1: string;
        thu_reason1: string;
        fri_reason1: string;
        sat_reason1: string;
        sun_reason1: string;
        mon_reason2: string;
        tue_reason2: string;
        wed_reason2: string;
        thu_reason2: string;
        fri_reason2: string;
        sat_reason2: string;
        sun_reason2: string;
        name: string;
        leadercheck: number;
    };
};

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '90%',
    },
};
Modal.setAppElement('#ModalSet');

const TeamLeaderModal = ({ onClicked, modalClose, clickedOTData, getDataOTData }: TeamLeaderModalProps) => {
    const [checkedOTdata, setCheckedOTdata] = useState<any>({
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
    const handleBeforeOTAccept = async () => {
        try {
            const serverSendAcceptOT = await axios.post(`${process.env.REACT_APP_DB_HOST}/TeamSelectOT_app_server/BeforeOTDataAccept`, {
                clickedOTData,
            });
            if (serverSendAcceptOT.data.dataCheck) {
                toast.show({
                    title: '팀장 승인 완료.',
                    content: `${clickedOTData.name}팀원의 ${clickedOTData.date_mon} ~ ${clickedOTData.date_sun} 사전 OT를 팀장 승인하였습니다.`,
                    duration: 6000,
                    DataSuccess: true,
                });
                getDataOTData();
                modalClose();
            } else {
                toast.show({
                    title: '팀장 승인 실패 (IT팀에 문의 바람)',
                    content: `${clickedOTData.name}팀원의 팀장 승인이 실패 되었습니다. `,
                    duration: 6000,
                    DataSuccess: false,
                });
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: '팀장 승인 실패 (IT팀에 문의 바람)',
                content: `서버와의 통신이 끊어졌습니다. `,
                duration: 6000,
                DataSuccess: false,
            });
        }
    };

    const handleBeforeOTCancel = async () => {
        try {
            const serverSendAcceptOT = await axios.post(`${process.env.REACT_APP_DB_HOST}/TeamSelectOT_app_server/BeforeOTDataCancel`, {
                clickedOTData,
            });
            if (serverSendAcceptOT.data.dataCheck) {
                toast.show({
                    title: '팀장 승인 취소 완료.',
                    content: `${clickedOTData.name}팀원의 OT를 팀장 승인 취소 하였습니다.`,
                    duration: 6000,
                    DataSuccess: true,
                });
                getDataOTData();
                modalClose();
            } else {
                toast.show({
                    title: '팀장 승인 취소 실패 (IT팀에 문의 바람)',
                    content: `${clickedOTData.name}팀원의 팀장 승인 취소 실패 하였습니다.. `,
                    duration: 6000,
                    DataSuccess: false,
                });
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: '팀장 승인 취소 실패 (IT팀에 문의 바람)',
                content: `서버와의 통신이 끊어졌습니다. `,
                duration: 6000,
                DataSuccess: false,
            });
        }
    };

    const handleBeforeOTDelete = async () => {
        try {
            const serverSendAcceptOT = await axios.post(`${process.env.REACT_APP_DB_HOST}/TeamSelectOT_app_server/DeleteBeforeOTDatas`, {
                clicksData: clickedOTData,
            });
            if (serverSendAcceptOT.data.dataSuccess) {
                toast.show({
                    title: 'OT 삭제 완료.',
                    content: `${clickedOTData.name}팀원의 OT를 OT 삭제 하였습니다.`,
                    duration: 6000,
                    DataSuccess: true,
                });
                getDataOTData();
                modalClose();
            } else {
                toast.show({
                    title: 'OT 삭제 실패 (IT팀에 문의 바람)',
                    content: `${clickedOTData.name}팀원의 OT 삭제를 실패 하였습니다.. `,
                    duration: 6000,
                    DataSuccess: false,
                });
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: 'OT 삭제 실패 (IT팀에 문의 바람)',
                content: `서버와의 통신이 끊어졌습니다. `,
                duration: 6000,
                DataSuccess: false,
            });
        }
    };

    useEffect(() => {
        if (onClicked) CheckedDataOT();
    }, [clickedOTData]);
    const CheckedDataOT = async () => {
        const CheckedDataOTs = await axios.post(`${process.env.REACT_APP_DB_HOST}/TeamSelectOT_app_server/getCheckedOTdata`, {
            clickedOTData,
        });

        setCheckedOTdata(CheckedDataOTs.data.data[0]);
    };
    return (
        <div>
            <Modal isOpen={onClicked} style={customStyles} onRequestClose={modalClose}>
                <div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', borderSpacing: '0', textAlign: 'center' }}>
                        <thead style={{ backgroundColor: '#2da8e5' }}>
                            <tr
                                className="testssBefore"
                                style={{
                                    borderTop: '1.5px solid black',
                                    borderLeft: '1.3px solid black',
                                    borderRight: '1.3px solid black',
                                    backgroundColor: '#2da8e5',
                                }}
                            >
                                <th rowSpan={2} style={{ borderRight: '1.2px solid black', backgroundColor: '#2da8e5' }}>
                                    일자
                                </th>
                                <th
                                    colSpan={3}
                                    style={{
                                        borderRight: '1.2px solid black',
                                        borderBottom: '1.2px solid black',
                                        backgroundColor: '#2da8e5',
                                    }}
                                >
                                    소정근로
                                </th>
                                <th
                                    colSpan={4}
                                    style={{
                                        borderRight: '1.2px solid black',
                                        borderBottom: '1.2px solid black',
                                        backgroundColor: '#2da8e5',
                                    }}
                                >
                                    {' '}
                                    연장 근무
                                </th>
                                <th rowSpan={2} style={{ borderRight: '1.2px solid black', backgroundColor: '#2da8e5' }}>
                                    총 근무 <br />
                                    합계 시간
                                    <br />
                                </th>
                                <th rowSpan={2} style={{ backgroundColor: '#2da8e5' }}>
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
                                    {clickedOTData.date_mon}
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
                                    {clickedOTData.start_time_mon}
                                </td>
                                <td rowSpan={3} width="100px">
                                    {clickedOTData.end_time_mon}
                                </td>
                                <td rowSpan={3} width="100px">
                                    {clickedOTData.mon_rest}
                                </td>
                                <td rowSpan={3} width="100px">
                                    <span className="sum_over_time" id="sum_over_time_monOver">
                                        {clickedOTData.mon_time}
                                    </span>
                                    시간
                                </td>
                                <td rowSpan={3} width="100px">
                                    <span id="sum_times_mon">{clickedOTData.mon_time + checkedOTdata.mon_time}</span> 시간
                                </td>

                                <td className="reasontable">
                                    <pre>{clickedOTData.mon_reason}</pre>
                                </td>
                            </tr>
                            <tr>
                                <td className="reasontable">
                                    <pre>{clickedOTData.mon_reason1}</pre>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'left' }}>
                                    <pre>{clickedOTData.mon_reason2}</pre>
                                </td>
                            </tr>

                            <tr>
                                <td rowSpan={3} style={{ minWidth: '100px' }}>
                                    {clickedOTData.date_tue}
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
                                <td rowSpan={3}>{clickedOTData.start_time_tue}</td>
                                <td rowSpan={3}>{clickedOTData.end_time_tue}</td>
                                <td rowSpan={3}>{clickedOTData.tue_rest}</td>
                                <td rowSpan={3}>
                                    <span className="sum_over_time" id="sum_over_time_tueOver">
                                        {clickedOTData.tue_time}
                                    </span>{' '}
                                    시간
                                </td>
                                <td rowSpan={3}>
                                    <span id="sum_times_tue">{clickedOTData.tue_time + checkedOTdata.tue_time}</span> 시간
                                </td>
                                <td className="reasontable">
                                    <pre>{clickedOTData.tue_reason}</pre>
                                </td>
                            </tr>
                            <tr>
                                <td className="reasontable">
                                    <pre>{clickedOTData.tue_reason1}</pre>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'left' }}>
                                    <pre>{clickedOTData.tue_reason2}</pre>
                                </td>
                            </tr>

                            <tr>
                                <td rowSpan={3}>
                                    {clickedOTData.date_wed}
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
                                <td rowSpan={3}>{clickedOTData.start_time_wed}</td>
                                <td rowSpan={3}>{clickedOTData.end_time_wed}</td>
                                <td rowSpan={3}>{clickedOTData.wed_rest}</td>
                                <td rowSpan={3}>
                                    <span className="sum_over_time" id="sum_over_time_wedOver">
                                        {clickedOTData.wed_time}
                                    </span>{' '}
                                    시간
                                </td>
                                <td rowSpan={3}>
                                    <span id="sum_times_wed">{clickedOTData.wed_time + checkedOTdata.wed_time}</span> 시간
                                </td>
                                <td className="reasontable">
                                    <pre>{clickedOTData.wed_reason}</pre>
                                </td>
                            </tr>
                            <tr>
                                <td className="reasontable">
                                    <pre>{clickedOTData.wed_reason1}</pre>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'left' }}>
                                    <pre>{clickedOTData.wed_reason2}</pre>
                                </td>
                            </tr>

                            <tr>
                                <td rowSpan={3}>
                                    {clickedOTData.date_thu}
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
                                <td rowSpan={3}>{clickedOTData.start_time_thu}</td>
                                <td rowSpan={3}>{clickedOTData.end_time_thu}</td>
                                <td rowSpan={3}>{clickedOTData.thu_rest}</td>
                                <td rowSpan={3}>
                                    <span className="sum_over_time" id="sum_over_time_thuOver">
                                        {clickedOTData.thu_time}
                                    </span>{' '}
                                    시간
                                </td>
                                <td rowSpan={3}>
                                    <span id="sum_times_thu">{clickedOTData.thu_time + checkedOTdata.thu_time}</span> 시간
                                </td>
                                <td className="reasontable">
                                    <pre>{clickedOTData.thu_reason}</pre>
                                </td>
                            </tr>
                            <tr>
                                <td className="reasontable">
                                    <pre>{clickedOTData.thu_reason1}</pre>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'left' }}>
                                    <pre>{clickedOTData.thu_reason2}</pre>
                                </td>
                            </tr>

                            <tr>
                                <td rowSpan={3}>
                                    {clickedOTData.date_fri}
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
                                <td rowSpan={3}>{clickedOTData.start_time_fri}</td>
                                <td rowSpan={3}>{clickedOTData.end_time_fri}</td>
                                <td rowSpan={3}>{clickedOTData.fri_rest}</td>
                                <td rowSpan={3}>
                                    <span className="sum_over_time" id="sum_over_time_friOver">
                                        {clickedOTData.fri_time}
                                    </span>{' '}
                                    시간
                                </td>
                                <td rowSpan={3}>
                                    <span id="sum_times_fri">{clickedOTData.fri_time + checkedOTdata.fri_time}</span> 시간
                                </td>
                                <td className="reasontable">
                                    <pre>{clickedOTData.fri_reason}</pre>
                                </td>
                            </tr>
                            <tr>
                                <td className="reasontable">
                                    <pre>{clickedOTData.fri_reason1}</pre>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'left' }}>
                                    <pre>{clickedOTData.fri_reason2}</pre>
                                </td>
                            </tr>

                            <tr>
                                <td rowSpan={3}>
                                    {clickedOTData.date_sat}
                                    <br />
                                    토요일
                                </td>

                                <td rowSpan={3}></td>
                                <td rowSpan={3}></td>
                                <td rowSpan={3}></td>
                                <td rowSpan={3}>{clickedOTData.start_time_sat}</td>
                                <td rowSpan={3}>{clickedOTData.end_time_sat}</td>
                                <td rowSpan={3}>{clickedOTData.sat_rest}</td>
                                <td rowSpan={3}>
                                    <span className="sum_over_time" id="sum_over_time_satOver">
                                        {clickedOTData.sat_time}
                                    </span>{' '}
                                    시간
                                </td>
                                <td rowSpan={3}>
                                    <span id="sum_times_sat">{clickedOTData.sat_time}</span> 시간
                                </td>
                                <td className="reasontable">
                                    <pre>{clickedOTData.sat_reason}</pre>
                                </td>
                            </tr>
                            <tr>
                                <td className="reasontable">
                                    <pre>{clickedOTData.sat_reason1}</pre>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'left' }}>
                                    <pre>{clickedOTData.sat_reason2}</pre>
                                </td>
                            </tr>

                            <tr>
                                <td rowSpan={3} id="stats_date">
                                    {clickedOTData.date_sun}
                                    <br />
                                    일요일
                                </td>

                                <td rowSpan={3}></td>
                                <td rowSpan={3}></td>
                                <td rowSpan={3}></td>
                                <td rowSpan={3}>{clickedOTData.start_time_sun}</td>
                                <td rowSpan={3}>{clickedOTData.end_time_sun}</td>
                                <td rowSpan={3}>{clickedOTData.sun_rest}</td>
                                <td rowSpan={3}>
                                    <span className="sum_over_time" id="sum_over_time_sunOver">
                                        {clickedOTData.sun_time}
                                    </span>{' '}
                                    시간
                                </td>
                                <td rowSpan={3}>
                                    <span id="sum_times_sun">{clickedOTData.sun_time}</span> 시간
                                </td>
                                <td className="reasontable">
                                    <pre>{clickedOTData.sun_reason}</pre>
                                </td>
                            </tr>
                            <tr>
                                <td className="reasontable">
                                    <pre>{clickedOTData.sun_reason1}</pre>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'left' }}>
                                    <pre>{clickedOTData.sun_reason2}</pre>
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
                                        {clickedOTData.mon_time +
                                            clickedOTData.tue_time +
                                            clickedOTData.wed_time +
                                            clickedOTData.thu_time +
                                            clickedOTData.fri_time +
                                            clickedOTData.sat_time +
                                            clickedOTData.sun_time}
                                        시간
                                    </span>
                                </td>
                                <td colSpan={1} style={{ background: 'darkgray', fontWeight: 'bolder' }}>
                                    총 합계 시간
                                </td>
                                <td>
                                    <span id="total_sum_over_time">
                                        {clickedOTData.mon_time +
                                            clickedOTData.tue_time +
                                            clickedOTData.wed_time +
                                            clickedOTData.thu_time +
                                            clickedOTData.fri_time +
                                            clickedOTData.sat_time +
                                            clickedOTData.sun_time +
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
                    <div style={{ textAlign: 'end', marginTop: '40px' }}>
                        {clickedOTData.leadercheck === 1 ? (
                            <div>
                                <div>
                                    <button onClick={handleBeforeOTCancel} className="TeamLeaderAcceptDesc">
                                        팀장승인 취소
                                    </button>
                                    <button
                                        style={{ marginLeft: '30px', background: '#f78a8a' }}
                                        onClick={handleBeforeOTDelete}
                                        className="TeamLeaderAcceptDesc"
                                    >
                                        삭제
                                    </button>
                                </div>
                                <div style={{ marginTop: '30px' }}> 팀장승인 완료.</div>
                            </div>
                        ) : (
                            <button onClick={handleBeforeOTAccept} className="TeamLeaderAcceptDesc">
                                팀장승인
                            </button>
                        )}
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default TeamLeaderModal;

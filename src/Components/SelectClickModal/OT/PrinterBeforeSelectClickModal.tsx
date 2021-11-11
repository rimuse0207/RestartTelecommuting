import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './PrinterAfterSelectClickModal.css';
const customStyles = {
    content: {
        width: '100%',
        height: '100%',
        border: 'none',
        top: '0px',
        left: '0px',
        background: 'white',
    },
};

Modal.setAppElement('#ModalPrinter');

type PrinterBeforeSelectClickModalProps = {
    printerClicked: boolean;
    clicksData: any | null;
    setPrinterClicked: (data: boolean) => void;
};

const PrinterBeforeSelectClickModal = ({ printerClicked, clicksData, setPrinterClicked }: PrinterBeforeSelectClickModalProps) => {
    function closeModal() {
        setPrinterClicked(false);
    }
    useEffect(() => {
        setTimeout(() => {
            window.print();
        }, 500);

        window.onafterprint = function () {
            setPrinterClicked(false);
        };
    }, []);
    return (
        <div>
            <Modal isOpen={printerClicked} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                <div>
                    <div>
                        <table style={{ width: '100%', textAlign: 'center', border: '1px solid gray' }}>
                            <thead style={{ border: '1px solid gray', background: 'none' }}>
                                <tr>
                                    <th style={{ border: '0.5px solid gray' }} colSpan={7}>
                                        연장(휴일)근무 신청서 (사전)
                                    </th>
                                    <th rowSpan={2} style={{ border: '0.5px solid gray' }}>
                                        팀장
                                        <br />
                                        서명
                                    </th>
                                    <th style={{ width: '150px', border: '0.5px solid gray' }} rowSpan={2}></th>
                                </tr>
                                <tr>
                                    <th colSpan={3} style={{ border: '0.5px solid gray' }}>
                                        부서
                                    </th>
                                    <th colSpan={2} style={{ border: '0.5px solid gray' }}>
                                        {clicksData.team.toUpperCase()}
                                    </th>
                                    <th style={{ border: '0.5px solid gray' }}>성명</th>
                                    <th style={{ border: '0.5px solid gray', textAlign: 'end' }}>{clicksData.name} (인)</th>
                                </tr>
                            </thead>
                            <tbody className="PrinterTables">
                                <tr>
                                    <td colSpan={2} rowSpan={2}>
                                        일자
                                        <br />
                                    </td>
                                    <td colSpan={2}>연장근무</td>
                                    <td rowSpan={2}>
                                        저녁
                                        <br />
                                        휴게
                                        <br />
                                        시간
                                    </td>
                                    <td rowSpan={2}>
                                        연장
                                        <br />
                                        근무
                                        <br />
                                        시간
                                    </td>
                                    <td colSpan={3} rowSpan={2}>
                                        사유
                                        <br />
                                    </td>
                                </tr>
                                <tr>
                                    <td>시작</td>
                                    <td>종료</td>
                                </tr>
                                <tr>
                                    <td style={{ width: '100px' }} rowSpan={3}>
                                        {clicksData.date_mon}
                                    </td>
                                    <td style={{ width: '90px' }} rowSpan={3}>
                                        월요일
                                    </td>
                                    <td style={{ width: '90px' }} rowSpan={3}>
                                        {clicksData.start_time_mon}
                                    </td>
                                    <td style={{ width: '90px' }} rowSpan={3}>
                                        {clicksData.end_time_mon}
                                    </td>
                                    <td style={{ width: '90px' }} rowSpan={3}>
                                        {clicksData.mon_rest}
                                    </td>
                                    <td style={{ width: '90px' }} rowSpan={3}>
                                        {clicksData.mon_time}
                                    </td>
                                    <td colSpan={3} style={{ height: '50px', textAlign: 'start' }}>
                                        {clicksData.mon_reason}
                                    </td>
                                </tr>
                                <tr style={{ height: '50px', textAlign: 'start' }}>
                                    <td colSpan={3}> {clicksData.mon_reason1}</td>
                                </tr>
                                <tr>
                                    <td colSpan={3} style={{ height: '50px', textAlign: 'start' }}>
                                        {clicksData.mon_reason2}
                                    </td>
                                </tr>

                                <tr>
                                    <td rowSpan={3}>{clicksData.date_tue}</td>
                                    <td rowSpan={3}>화요일</td>
                                    <td rowSpan={3}>{clicksData.start_time_tue}</td>
                                    <td rowSpan={3}>{clicksData.end_time_tue}</td>
                                    <td rowSpan={3}>{clicksData.tue_rest}</td>
                                    <td rowSpan={3}>{clicksData.tue_time}</td>
                                    <td style={{ height: '50px', textAlign: 'start' }} colSpan={3}>
                                        {clicksData.tue_reason}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} style={{ height: '50px', textAlign: 'start' }}>
                                        {' '}
                                        {clicksData.tue_reason1}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} style={{ height: '50px', textAlign: 'start' }}>
                                        {clicksData.tue_reason2}
                                    </td>
                                </tr>

                                <tr>
                                    <td rowSpan={3}>{clicksData.date_wed}</td>
                                    <td rowSpan={3}>수요일</td>
                                    <td rowSpan={3}>{clicksData.start_time_wed}</td>
                                    <td rowSpan={3}>{clicksData.end_time_wed}</td>
                                    <td rowSpan={3}>{clicksData.wed_rest}</td>
                                    <td rowSpan={3}>{clicksData.wed_time}</td>
                                    <td colSpan={3} style={{ height: '50px', textAlign: 'start' }}>
                                        {clicksData.wed_reason}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} style={{ height: '50px', textAlign: 'start' }}>
                                        {' '}
                                        {clicksData.wed_reason1}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} style={{ height: '50px', textAlign: 'start' }}>
                                        {clicksData.wed_reason2}
                                    </td>
                                </tr>

                                <tr>
                                    <td rowSpan={3}>{clicksData.date_thu}</td>
                                    <td rowSpan={3}>목요일</td>
                                    <td rowSpan={3}>{clicksData.start_time_thu}</td>
                                    <td rowSpan={3}>{clicksData.end_time_thu}</td>
                                    <td rowSpan={3}>{clicksData.thu_rest}</td>
                                    <td rowSpan={3}>{clicksData.thu_time}</td>
                                    <td colSpan={3} style={{ height: '50px', textAlign: 'start' }}>
                                        {clicksData.thu_reason}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} style={{ height: '50px', textAlign: 'start' }}>
                                        {' '}
                                        {clicksData.thu_reason1}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} style={{ height: '50px', textAlign: 'start' }}>
                                        {clicksData.thu_reason2}
                                    </td>
                                </tr>

                                <tr>
                                    <td rowSpan={3}>{clicksData.date_fri}</td>
                                    <td rowSpan={3}>금요일</td>
                                    <td rowSpan={3}>{clicksData.start_time_fri}</td>
                                    <td rowSpan={3}>{clicksData.end_time_fri}</td>
                                    <td rowSpan={3}>{clicksData.fri_rest}</td>
                                    <td rowSpan={3}>{clicksData.fri_time}</td>
                                    <td colSpan={3} style={{ height: '50px', textAlign: 'start' }}>
                                        {clicksData.fri_reason}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} style={{ height: '50px', textAlign: 'start' }}>
                                        {' '}
                                        {clicksData.fri_reason1}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} style={{ height: '50px', textAlign: 'start' }}>
                                        {clicksData.fri_reason2}
                                    </td>
                                </tr>

                                <tr>
                                    <td rowSpan={3}>{clicksData.date_sat}</td>
                                    <td rowSpan={3}>토요일</td>
                                    <td rowSpan={3}>{clicksData.start_time_sat}</td>
                                    <td rowSpan={3}>{clicksData.end_time_sat}</td>
                                    <td rowSpan={3}>{clicksData.sat_rest}</td>
                                    <td rowSpan={3}>{clicksData.sat_time}</td>
                                    <td colSpan={3} style={{ height: '50px', textAlign: 'start' }}>
                                        {clicksData.sat_reason}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} style={{ height: '50px', textAlign: 'start' }}>
                                        {' '}
                                        {clicksData.sat_reason1}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} style={{ height: '50px', textAlign: 'start' }}>
                                        {clicksData.sat_reason2}
                                    </td>
                                </tr>

                                <tr>
                                    <td rowSpan={3}>{clicksData.date_sun}</td>
                                    <td rowSpan={3}>일요일</td>
                                    <td rowSpan={3}>{clicksData.start_time_sun}</td>
                                    <td rowSpan={3}>{clicksData.end_time_sun}</td>
                                    <td rowSpan={3}>{clicksData.sun_rest}</td>
                                    <td rowSpan={3}>{clicksData.sun_time}</td>
                                    <td colSpan={3} style={{ height: '50px', textAlign: 'start' }}>
                                        {clicksData.sun_reason}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} style={{ height: '50px', textAlign: 'start' }}>
                                        {' '}
                                        {clicksData.sun_reason1}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} style={{ height: '50px', textAlign: 'start' }}>
                                        {clicksData.sun_reason2}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default PrinterBeforeSelectClickModal;

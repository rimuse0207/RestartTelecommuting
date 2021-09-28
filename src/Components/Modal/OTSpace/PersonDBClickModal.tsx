import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import axios from 'axios';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '100%',
        width: '70%',
    },
};
Modal.setAppElement('#ModalOTDetail');
type PersonDBClickModalProps = {
    modalIsOpen: boolean;
    closeModal: () => void;
    clickData: {
        name: string;
        dateYear: string;
        dateMonth: string;
    };
};
const PersonDBClickModal = ({ modalIsOpen, closeModal, clickData }: PersonDBClickModalProps) => {
    const [getData, setGetData] = useState([]);
    const [dataloading, setDataLoading] = useState(false);
    useEffect(() => {
        getDataForMe();
    }, [clickData]);

    const getDataForMe = async () => {
        const getDataPersonData = await axios.post(`${process.env.REACT_APP_API_URL}/TeamSelectOT_app_server/getPersonTeam`, {
            name: clickData.name,
            date: `${clickData.dateYear}-${clickData.dateMonth}`,
        });
        setGetData(getDataPersonData.data.data);
        setDataLoading(true);

        console.log(getDataPersonData.data.data);
    };

    return (
        <div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                {dataloading ? (
                    <div className="PersonOTSelect_div_box">
                        <div>
                            <h2>
                                {clickData.dateYear}년 {clickData.dateMonth}월 {clickData.name}
                            </h2>
                        </div>
                        <table>
                            <thead>
                                <tr style={{ background: '#E8D830' }}>
                                    <th colSpan={9}>실근무시간</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ background: '#E8D830' }}>
                                    <td rowSpan={2} style={{ maxWidth: '100px' }}>
                                        일시
                                    </td>
                                    <td rowSpan={2} style={{ maxWidth: '100px' }}>
                                        요일
                                    </td>
                                    <td colSpan={2}>연장근무</td>
                                    <td rowSpan={2} style={{ maxWidth: '100px' }}>
                                        저녁휴게시간
                                    </td>
                                    <td rowSpan={2}>총근무시간</td>
                                    <td colSpan={3}>OT구분</td>
                                </tr>
                                <tr style={{ background: '#E8D830' }}>
                                    <td style={{ maxWidth: '100px' }}>시작시간</td>
                                    <td style={{ maxWidth: '100px' }}>종료시간</td>
                                    <td>연장</td>
                                    <td>심야</td>
                                    <td>휴일</td>
                                </tr>
                                {Array(new Date(parseInt(clickData.dateYear), parseInt(clickData.dateMonth), 0).getDate())
                                    .fill(0)
                                    .map((list, i) => {
                                        var counts = 0;
                                        var Mapdate = `${clickData.dateYear}-${clickData.dateMonth}-${i + 1 > 9 ? i + 1 : '0' + (i + 1)}`;
                                        return (
                                            <tr
                                                style={
                                                    moment(Mapdate).day() === 0 || moment(Mapdate).day() === 6
                                                        ? { background: 'lightgray' }
                                                        : {}
                                                }
                                            >
                                                <td>{Mapdate}</td>
                                                <td>
                                                    {moment(Mapdate).day() === 0
                                                        ? '일요일'
                                                        : moment(Mapdate).day() === 1
                                                        ? '월요일'
                                                        : moment(Mapdate).day() === 2
                                                        ? '화요일'
                                                        : moment(Mapdate).day() === 3
                                                        ? '수요일'
                                                        : moment(Mapdate).day() === 4
                                                        ? '목요일'
                                                        : moment(Mapdate).day() === 5
                                                        ? '금요일'
                                                        : '토요일'}
                                                </td>
                                                {getData.map(
                                                    (
                                                        item: {
                                                            date_mon: string;
                                                            start_time_mon: string;
                                                            end_time_mon: string;
                                                            mon_rest: string;
                                                            mon_time: number;
                                                            mon_night: number;
                                                            date_tue: string;
                                                            start_time_tue: string;
                                                            end_time_tue: string;
                                                            tue_rest: string;
                                                            tue_time: number;
                                                            tue_night: number;
                                                            date_wed: string;
                                                            start_time_wed: string;
                                                            end_time_wed: string;
                                                            wed_rest: string;
                                                            wed_time: number;
                                                            wed_night: number;
                                                            date_thu: string;
                                                            start_time_thu: string;
                                                            end_time_thu: string;
                                                            thu_rest: string;
                                                            thu_time: number;
                                                            thu_night: number;
                                                            date_fri: string;
                                                            start_time_fri: string;
                                                            end_time_fri: string;
                                                            fri_rest: string;
                                                            fri_time: number;
                                                            fri_night: number;
                                                            date_sat: string;
                                                            start_time_sat: string;
                                                            end_time_sat: string;
                                                            sat_rest: string;
                                                            sat_time: number;
                                                            sat_night: number;
                                                            date_sun: string;
                                                            start_time_sun: string;
                                                            end_time_sun: string;
                                                            sun_rest: string;
                                                            sun_time: number;
                                                            sun_night: number;
                                                            holiday_time_mon: number;
                                                            holiday_time_tue: number;
                                                            holiday_time_wed: number;
                                                            holiday_time_thu: number;
                                                            holiday_time_fri: number;
                                                            holiday_time_sat: number;
                                                        },
                                                        j
                                                    ) => {
                                                        if (Mapdate.includes(item.date_mon)) {
                                                            counts++;
                                                            return (
                                                                <>
                                                                    <td>{item.start_time_mon}</td>
                                                                    <td>{item.end_time_mon}</td>
                                                                    <td>{item.mon_rest}</td>
                                                                    <td>{item.mon_time > 0 ? item.mon_time : ''}</td>
                                                                    <td>
                                                                        {item.mon_time > 0 ? item.mon_time - item.holiday_time_mon : ''}
                                                                    </td>
                                                                    <td>{item.mon_time > 0 ? item.mon_night : ''}</td>
                                                                    <td>
                                                                        {item.holiday_time_mon > 0 || item.mon_time > 0
                                                                            ? item.holiday_time_mon
                                                                            : ''}
                                                                    </td>
                                                                </>
                                                            );
                                                        } else if (item.date_tue === Mapdate) {
                                                            counts++;
                                                            return (
                                                                <>
                                                                    <td>{item.start_time_tue}</td>
                                                                    <td>{item.end_time_tue}</td>
                                                                    <td>{item.tue_rest}</td>
                                                                    <td>{item.tue_time > 0 ? item.tue_time : ''}</td>
                                                                    <td>
                                                                        {item.tue_time > 0 ? item.tue_time - item.holiday_time_tue : ''}
                                                                    </td>
                                                                    <td>{item.tue_time > 0 ? item.tue_night : ''}</td>
                                                                    <td>
                                                                        {item.holiday_time_tue > 0 || item.tue_time > 0
                                                                            ? item.holiday_time_tue
                                                                            : ''}
                                                                    </td>
                                                                </>
                                                            );
                                                        } else if (item.date_wed === Mapdate) {
                                                            counts++;
                                                            return (
                                                                <>
                                                                    {' '}
                                                                    <td>{item.start_time_wed}</td>
                                                                    <td>{item.end_time_wed}</td>
                                                                    <td>{item.wed_rest}</td>
                                                                    <td>{item.wed_time > 0 ? item.wed_time : ''}</td>
                                                                    <td>
                                                                        {item.wed_time > 0 ? item.wed_time - item.holiday_time_wed : ''}
                                                                    </td>
                                                                    <td>{item.wed_time > 0 ? item.wed_night : ''}</td>
                                                                    <td>
                                                                        {item.holiday_time_wed > 0 || item.wed_time > 0
                                                                            ? item.holiday_time_wed
                                                                            : ''}
                                                                    </td>
                                                                </>
                                                            );
                                                        } else if (item.date_thu === Mapdate) {
                                                            counts++;
                                                            return (
                                                                <>
                                                                    <td>{item.start_time_thu}</td>
                                                                    <td>{item.end_time_thu}</td>
                                                                    <td>{item.thu_rest}</td>
                                                                    <td>{item.thu_time > 0 ? item.thu_time : ''}</td>
                                                                    <td>
                                                                        {item.thu_time > 0 ? item.thu_time - item.holiday_time_thu : ''}
                                                                    </td>
                                                                    <td>{item.thu_time > 0 ? item.thu_night : ''}</td>
                                                                    <td>
                                                                        {item.holiday_time_thu > 0 || item.thu_time > 0
                                                                            ? item.holiday_time_thu
                                                                            : ''}
                                                                    </td>
                                                                </>
                                                            );
                                                        } else if (item.date_fri === Mapdate) {
                                                            counts++;
                                                            return (
                                                                <>
                                                                    <td>{item.start_time_fri}</td>
                                                                    <td>{item.end_time_fri}</td>
                                                                    <td>{item.fri_rest}</td>
                                                                    <td>{item.fri_time > 0 ? item.fri_time : ''}</td>
                                                                    <td>
                                                                        {item.fri_time > 0 ? item.fri_time - item.holiday_time_fri : ''}
                                                                    </td>
                                                                    <td>{item.fri_time > 0 ? item.fri_night : ''}</td>
                                                                    <td>
                                                                        {item.holiday_time_fri > 0 || item.fri_time > 0
                                                                            ? item.holiday_time_fri
                                                                            : ''}
                                                                    </td>
                                                                </>
                                                            );
                                                        } else if (item.date_sat === Mapdate) {
                                                            counts++;
                                                            return (
                                                                <>
                                                                    <td>{item.start_time_sat}</td>
                                                                    <td>{item.end_time_sat}</td>
                                                                    <td>{item.sat_rest}</td>
                                                                    <td>{item.sat_time > 0 ? item.sat_time : ''}</td>
                                                                    <td>
                                                                        {item.sat_time > 0 ? item.sat_time - item.holiday_time_sat : ''}
                                                                    </td>
                                                                    <td>{item.sat_time > 0 ? item.sat_night : ''}</td>
                                                                    <td>
                                                                        {item.holiday_time_sat > 0 || item.sat_time > 0
                                                                            ? item.holiday_time_sat
                                                                            : ''}
                                                                    </td>
                                                                </>
                                                            );
                                                        } else if (item.date_sun === Mapdate) {
                                                            counts++;
                                                            return (
                                                                <>
                                                                    <td>{item.start_time_sun}</td>
                                                                    <td>{item.end_time_sun}</td>
                                                                    <td>{item.sun_rest}</td>
                                                                    <td>{item.sun_time > 0 ? item.sun_time : ''}</td>
                                                                    <td>{item.sun_time > 0 ? 0 : ''}</td>
                                                                    <td>{item.sun_time > 0 ? item.sun_night : ''}</td>
                                                                    <td>{item.sun_time > 0 ? item.sun_time : ''}</td>
                                                                </>
                                                            );
                                                        }
                                                    }
                                                )}
                                                {counts === 0 ? (
                                                    <>
                                                        <td>18:00</td>
                                                        <td>18:00</td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </>
                                                ) : (
                                                    <></>
                                                )}
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>Loading.....</div>
                )}
            </Modal>
        </div>
    );
};

export default React.memo(PersonDBClickModal);

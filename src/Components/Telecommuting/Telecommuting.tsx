import React, { useState } from 'react';
import moment from 'moment';
import CreateModal from '../Modal/CreateModal';
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../models/index';
import { DecryptKey } from '../../config';
const Telecommuting = () => {
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const [getMoment, setMoment] = useState(moment());
    const [onClicked, setOnClickedSet] = useState(false);
    const [clicksData, setClicksData] = useState<any | null>(null);

    const [telecommutingApply_check, settelecommutingApply_check] = useState(true);
    const [otApply_check, setotApply_check] = useState(true);
    const [foodApply_check, setfoodApply_check] = useState(true);
    const [usbApply_check, setusbApply_check] = useState(true);

    const [tele, setTele] = useState([]);
    const [food, setFood] = useState([]);
    const [OT, setOT] = useState([
        { name: '유성재', date: '2021-08-18', leaderchecK: false },
        { name: '유성재', date: '2021-08-25', leaderchecK: true },
        { name: '유성재', date: '2021-08-31', leaderchecK: false },
    ]);
    const [UsbApply, setUsbApply] = useState([]);

    useEffect(() => {
        getDataFoodApply();
        getDataTelecommuting();
        getDataUsbApply();
    }, [getMoment]);
    const getDataUsbApply = async () => {
        try {
            const dataget = await axios.post(`${process.env.REACT_APP_API_URL}/USB_app_server/Data_get_USBApply`, {
                id: DecryptKey(InfomationState.id),
                team: InfomationState.team,
                name: DecryptKey(InfomationState.name),
                selectDate: moment(getMoment).format('YYYY-MM'),
            });
            if (dataget.data.dataSuccess) {
                setUsbApply(dataget.data.data);
            } else {
                alert('에러 발생! 권한이 없습니다.');
            }
        } catch (error) {
            console.log(error);
            alert('에러 발생: Errorcode: USB 신청 프론트 1');
        }
    };
    const getDataFoodApply = async () => {
        try {
            const dataget = await axios.post(`${process.env.REACT_APP_API_URL}/Meal_app_servers/Data_get_applyMeal`, {
                id: DecryptKey(InfomationState.id),
                team: InfomationState.team,
                name: DecryptKey(InfomationState.name),
                selectDate: moment(getMoment).format('YYYY-MM'),
            });
            if (dataget.data.dataSuccess) {
                setFood(dataget.data.data);
            } else {
                alert('에러 발생! 권한이 없습니다.');
            }
        } catch (error) {
            console.log(error);
            alert('에러 발생: Errorcode: 식대 정산 프론트 1');
        }
    };

    const getDataTelecommuting = async () => {
        try {
            const dataget = await axios.post(`${process.env.REACT_APP_API_URL}/Tele_app_server/Data_get_Telecommuting`, {
                id: DecryptKey(InfomationState.id),
                team: InfomationState.team,
                name: DecryptKey(InfomationState.name),
                selectDate: moment(getMoment).format('YYYY-MM'),
            });
            if (dataget.data.dataSuccess) {
                console.log(dataget);
                setTele(dataget.data.data);
            } else {
                alert('에러 발생! 권한이 없습니다.');
            }
        } catch (error) {
            console.log(error);
            alert('에러 발생: Errorcode: 식대 서버 정산 프론트 1');
        }
    };

    const today = getMoment;
    const firstWeek = today.clone().startOf('month').week();
    const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();
    const ModalOpensClick = (dataChecked: string) => {
        setClicksData(new Date(dataChecked));
        setOnClickedSet(!onClicked);
    };

    const calendarArr = () => {
        let result: Array<any> = [];
        let week: number = firstWeek;
        for (week; week <= lastWeek; week++) {
            result = result.concat(
                <tr key={week}>
                    {Array(7)
                        .fill(0)
                        // eslint-disable-next-line no-loop-func
                        .map((data, index) => {
                            let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day');
                            if (moment().format('YYYY-MM-DD') === days.format('YYYY-MM-DD')) {
                                return (
                                    <td
                                        key={index}
                                        className="Telecommuting_table_today"
                                        onClick={() => ModalOpensClick(days.format('YYYY-MM-DD'))}
                                    >
                                        <div className="Telecommuting_Table_dayNumber">
                                            <div style={{ paddingLeft: '5px' }}>{days.format('D')}</div>
                                            {tele.map((list: { day: string; approve: number }, i) => {
                                                return moment(list.day).format('YYYY-MM-DD') === days.format('YYYY-MM-DD') ? (
                                                    <div className="Telecommuting_Table_Data_Insert">{`( 재택 ) - 팀장승인: ${
                                                        list.approve === 0 ? 'O' : 'X'
                                                    }`}</div>
                                                ) : (
                                                    <></>
                                                );
                                            })}
                                            {OT.map((list, i) => {
                                                return list.date === days.format('YYYY-MM-DD') ? (
                                                    <div
                                                        className="Telecommuting_Table_Data_Insert"
                                                        style={{ backgroundColor: '#7a2d2d' }}
                                                    >{`${list.name} ( OT )`}</div>
                                                ) : (
                                                    <></>
                                                );
                                            })}
                                            {food.map((list: { dates: string; spending: number }, i) => {
                                                return list.dates === days.format('YYYY-MM-DD') ? (
                                                    <div
                                                        className="Telecommuting_Table_Data_Insert"
                                                        style={{ backgroundColor: '#5a267c' }}
                                                    >{`( 식대 ) - ${list.spending
                                                        .toString()
                                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`}</div>
                                                ) : (
                                                    <></>
                                                );
                                            })}
                                            {UsbApply.map((list: { workdate: string; leadercheck: number }, i) => {
                                                return list.workdate === days.format('YYYY-MM-DD') ? (
                                                    <div
                                                        className="Telecommuting_Table_Data_Insert"
                                                        style={{ backgroundColor: '#2c512f' }}
                                                    >{`( USB ) - 팀장승인: ${list.leadercheck === 0 ? 'X' : 'O'}`}</div>
                                                ) : (
                                                    <></>
                                                );
                                            })}
                                        </div>
                                    </td>
                                );
                            } else if (days.format('MM') !== today.format('MM')) {
                                return (
                                    <td
                                        key={index}
                                        className="Telecommuting_Table_nextMonth"
                                        onClick={() => ModalOpensClick(days.format('YYYY-MM-DD'))}
                                    >
                                        <div className="Telecommuting_Table_dayNumber">
                                            <div style={{ paddingLeft: '5px' }}>{days.format('D')}</div>
                                        </div>
                                    </td>
                                );
                            } else {
                                return (
                                    <td
                                        key={index}
                                        onClick={() => ModalOpensClick(days.format('YYYY-MM-DD'))}
                                        className="Telecommuting_Table_nowMonth"
                                    >
                                        <div className="Telecommuting_Table_dayNumber">
                                            <div style={{ paddingLeft: '5px' }}>{days.format('D')}</div>
                                            {tele.map((list: { day: string; approve: number }, i) => {
                                                return moment(list.day).format('YYYY-MM-DD') === days.format('YYYY-MM-DD') ? (
                                                    <div className="Telecommuting_Table_Data_Insert">{`( 재택 ) - 팀장승인: ${
                                                        list.approve === 0 ? 'X' : 'O'
                                                    }`}</div>
                                                ) : (
                                                    <></>
                                                );
                                            })}
                                            {OT.map((list, i) => {
                                                return list.date === days.format('YYYY-MM-DD') ? (
                                                    <div
                                                        className="Telecommuting_Table_Data_Insert"
                                                        style={{ backgroundColor: '#7a2d2d' }}
                                                    >{`${list.name} ( OT )`}</div>
                                                ) : (
                                                    <></>
                                                );
                                            })}
                                            {food.map((list: { dates: string; spending: number }, i) => {
                                                return list.dates === days.format('YYYY-MM-DD') ? (
                                                    <div
                                                        className="Telecommuting_Table_Data_Insert"
                                                        style={{ backgroundColor: '#5a267c' }}
                                                    >{`( 식대 ) - ${list.spending
                                                        .toString()
                                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`}</div>
                                                ) : (
                                                    <></>
                                                );
                                            })}
                                            {UsbApply.map((list: { workdate: string; leadercheck: number }, i) => {
                                                return list.workdate === days.format('YYYY-MM-DD') ? (
                                                    <div
                                                        className="Telecommuting_Table_Data_Insert"
                                                        style={{ backgroundColor: '#2c512f' }}
                                                    >{`( USB ) - 팀장승인: ${list.leadercheck === 0 ? 'X' : 'O'}`}</div>
                                                ) : (
                                                    <></>
                                                );
                                            })}
                                        </div>
                                    </td>
                                );
                            }
                        })}
                </tr>
            );
        }
        return result;
    };
    const modalClose = () => {
        setOnClickedSet(!onClicked);
    };
    return (
        <div>
            <div className="Telecommuting_date_show_div">
                <div className="Telecommuting_apply_div_box">
                    <button
                        onClick={() => {
                            setClicksData(null);
                            setOnClickedSet(!onClicked);
                        }}
                    >
                        작성하기
                    </button>
                </div>
                <div className="control">
                    <button
                        onClick={() => {
                            setMoment(getMoment.clone().subtract(1, 'month'));
                        }}
                    >
                        {'<<<'}
                    </button>
                    <span>{today.format('YYYY년 MM월')}</span>
                    <button
                        onClick={() => {
                            setMoment(getMoment.clone().add(1, 'month'));
                        }}
                    >
                        {'>>>'}
                    </button>
                </div>
                <div className="Telecommutign_checkbox_div">
                    <ul>
                        <li
                            onClick={() => {
                                if (telecommutingApply_check) {
                                    setTele([]);
                                } else {
                                    getDataTelecommuting();
                                }
                                settelecommutingApply_check(!telecommutingApply_check);
                            }}
                        >
                            <input type="checkbox" name="telecommutingApply_check" checked={telecommutingApply_check}></input> 근무 조회
                        </li>
                        <li
                            onClick={() => {
                                if (otApply_check) {
                                    setOT([]);
                                } else {
                                    setOT([
                                        { name: '유성재', date: '2021-08-18', leaderchecK: false },
                                        { name: '유성재', date: '2021-08-25', leaderchecK: true },
                                        { name: '유성재', date: '2021-08-31', leaderchecK: false },
                                    ]);
                                }
                                setotApply_check(!otApply_check);
                            }}
                        >
                            <input type="checkbox" name="otApply_check" checked={otApply_check}></input> OT 조회
                        </li>
                        <li
                            onClick={() => {
                                if (foodApply_check) {
                                    setFood([]);
                                } else {
                                    getDataFoodApply();
                                }
                                setfoodApply_check(!foodApply_check);
                            }}
                        >
                            <input type="checkbox" name="foodApply_check" checked={foodApply_check}></input> 식대 조회
                        </li>
                        <li
                            onClick={() => {
                                if (usbApply_check) {
                                    setUsbApply([]);
                                } else {
                                    getDataUsbApply();
                                }
                                setusbApply_check(!usbApply_check);
                            }}
                        >
                            <input type="checkbox" name="usbApply_check" checked={usbApply_check}></input> USB신청 조회
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <table className="Telecommuting_Table">
                    <thead>
                        <tr>
                            <th>일</th>
                            <th>월</th>
                            <th>화</th>
                            <th>수</th>
                            <th>목</th>
                            <th>금</th>
                            <th>토</th>
                        </tr>
                    </thead>
                    <tbody>{calendarArr()}</tbody>
                </table>
            </div>
            {onClicked ? <CreateModal onClicked={onClicked} modalClose={modalClose} clicksData={clicksData}></CreateModal> : ''}
        </div>
    );
};

export default Telecommuting;

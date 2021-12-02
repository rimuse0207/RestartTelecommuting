import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { RootState } from '../../../models';
import { DecryptKey } from '../../../config';
import moment from 'moment';
import axios from 'axios';
const customStyles = {
    content: {
        width: '80%',
        height: '90%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#ModalPrinter');

type PrinterAfterSelectClickModalProps = {
    selectedNames: string;
    setModalCheck: (data: boolean) => void;
    modalCheck: boolean;
    selectedYear: string;
    selectedMonth: string;
    selectedIds: string;
    usersTeam: string;
};

const ModalMealMonthDetailPage = ({
    selectedNames,
    setModalCheck,
    modalCheck,
    selectedYear,
    selectedMonth,
    selectedIds,
    usersTeam,
}: PrinterAfterSelectClickModalProps) => {
    const [applyedData, setApplyedData] = useState([]);
    const [OTMealCheck, setOTMealCheck] = useState([]);
    const [divisionDate, setDivisionDate] = useState<any>([]);
    function closeModal() {
        document.body.style.overflowX = 'hidden';
        document.body.style.overflowY = 'auto';
        setModalCheck(false);
    }
    useEffect(() => {
        DataGetMeal();
        document.body.style.overflow = 'hidden';
    }, [selectedNames]);

    useEffect(() => {
        if (divisionDate.length > 0) {
            GETOTMeal();
        }
    }, [divisionDate]);

    const GETOTMeal = async () => {
        try {
            const GetOTMealCheck = await axios.post(`${process.env.REACT_APP_DB_HOST}/Meal_app_servers/Data_get_OTMealCheck`, {
                id: selectedIds,
                name: selectedNames,
                divisionDate,
            });
            console.log(GetOTMealCheck.data.OTdatas);
            setOTMealCheck(GetOTMealCheck.data.OTdatas);
        } catch (error) {
            console.log(error);
        }
    };
    const DataGetMeal = async () => {
        try {
            const GetMealDataPerson = await axios.post(`${process.env.REACT_APP_DB_HOST}/Meal_app_servers/MealPersonData`, {
                id: selectedIds,
                name: selectedNames,
                selectDate: selectedYear + '-' + selectedMonth,
            });
            if (GetMealDataPerson.data.dataSuccess) {
                let taaa = [];
                for (var i = 0; i < GetMealDataPerson.data.data.length; i++) {
                    if (GetMealDataPerson.data.data[i].division === '석식') {
                        taaa.push(GetMealDataPerson.data.data[i].dates);
                    }
                }
                console.log(taaa);
                await setDivisionDate(taaa);
                await setApplyedData(GetMealDataPerson.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    return (
        <div>
            <div>
                <Modal isOpen={modalCheck} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                    <div>
                        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
                            {selectedNames} {selectedYear}년 {selectedMonth}월 식대 정산
                        </h1>
                        <div>
                            <table
                                style={{
                                    fontSize: 'small',
                                    width: '100%',
                                    height: '100%',
                                    borderCollapse: 'collapse',
                                    fontWeight: 'bolder',
                                }}
                            >
                                <thead style={{ fontSize: 'small' }}>
                                    <tr style={{ height: '50px' }}>
                                        <th>부서</th>
                                        <th>{usersTeam}</th>
                                        <th colSpan={2}></th>
                                        <th>성명</th>
                                        <th colSpan={3}>{selectedNames}</th>
                                    </tr>
                                    <tr style={{ height: '50px' }}>
                                        <th>일자</th>
                                        <th>구분</th>
                                        <th>지출 금액</th>
                                        <th>정산 금액</th>
                                        <th>방문처</th>
                                        <th>지역</th>
                                        <th>비고</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {applyedData.map(
                                        (
                                            list: {
                                                indexs: string;
                                                dates: string;
                                                division: string;
                                                spending: number;
                                                calculate: number;
                                                place: string;
                                                location: string;
                                            },
                                            i: number
                                        ) => {
                                            return (
                                                <tr key={list.indexs} style={{ border: '0.5px solid black' }}>
                                                    <td style={{ border: '0.5px solid black', padding: '10px' }}>{list.dates}</td>
                                                    <td style={{ border: '0.5px solid black', padding: '10px' }}>{list.division}</td>
                                                    <td style={{ border: '0.5px solid black', padding: '10px' }}>
                                                        {list.spending.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
                                                    </td>
                                                    <td style={{ border: '0.5px solid black', padding: '10px' }}>
                                                        {list.calculate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
                                                    </td>
                                                    <td style={{ border: '0.5px solid black', padding: '10px' }}>{list.place}</td>
                                                    <td style={{ border: '0.5px solid black', padding: '10px' }}>{list.location}</td>
                                                    <td style={{ border: '0.5px solid black', padding: '10px' }}>
                                                        {OTMealCheck.map((item: { dates: string; OTTimes: number }) => {
                                                            return list.division === '석식' ? (
                                                                item.dates === list.dates ? (
                                                                    <div
                                                                        style={
                                                                            item.OTTimes >= 2 ? {} : { background: 'red', color: 'white' }
                                                                        }
                                                                    >
                                                                        {item.OTTimes}시간
                                                                    </div>
                                                                ) : (
                                                                    // <div></div>
                                                                    <div></div>
                                                                )
                                                            ) : (
                                                                <div></div>
                                                            );
                                                        })}
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )}

                                    <tr
                                        className="tailtr"
                                        style={{ fontSize: 'large', border: '0.5px solid black', padding: '10px', fontWeight: 'bolder' }}
                                    >
                                        <td colSpan={3} style={{ border: '0.5px solid black', padding: '10px' }}>
                                            합계
                                        </td>
                                        <td style={{ border: '0.5px solid black', padding: '10px' }}>
                                            {applyedData
                                                .map((list: { calculate: number }) => list.calculate)
                                                .reduce((prev: number, curr: number) => prev + curr, 0)
                                                .toString()
                                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            원
                                        </td>
                                        <td colSpan={4} style={{ border: '0.5px solid black', padding: '10px' }}></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
};
export default ModalMealMonthDetailPage;

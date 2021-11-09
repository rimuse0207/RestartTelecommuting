import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RootState } from '../../models/index';
import { useSelector } from 'react-redux';
import MonthTeleExcelDownload from './MonthTeleExcelDownload';
import SelectClickModalMainPage from '../SelectClickModal/SelectClickModalMainPage';

type MonthTeleCommutingTableBoxProps = {
    selectedYear: string;
    selectedMonth: string;
    SelectTeam: string;
    SelectedName: string;
    setSeletedName: (list: string) => void;
    IDS: string;
};

const MonthTeleCommutingTableBox = ({
    selectedYear,
    selectedMonth,
    SelectTeam,
    SelectedName,
    setSeletedName,
    IDS,
}: MonthTeleCommutingTableBoxProps) => {
    const [MonthTeleDatas, setMonthTeleDatas] = useState([]);
    const [clicksData, setClicksData] = useState({});
    const [clicksTitle, setClicksTitle] = useState('Telecommuting');
    const [onClicked, setOnClickedSet] = useState(false);

    useEffect(() => {
        MonthTeleData();
        console.log(selectedMonth);
    }, [selectedYear, selectedMonth]);
    useEffect(() => {
        MonthTeleData();
    }, [SelectTeam]);
    const modalClose = () => {
        MonthTeleData();
        setOnClickedSet(!onClicked);
    };

    const MonthTeleData = async () => {
        try {
            const MonthTeleDataServer = await axios.post(
                `${process.env.REACT_APP_DB_HOST}/Tele_app_server/Data_get_TeamLeader_Telecommuting_Month_data`,
                {
                    selectDate: `${selectedYear}-${selectedMonth}`,
                    team: SelectTeam,
                    id: IDS,
                }
            );
            console.log(MonthTeleDataServer);
            if (MonthTeleDataServer.data.dataSuccess) {
                setMonthTeleDatas(MonthTeleDataServer.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <div style={{ textAlign: 'end' }}>
                <MonthTeleExcelDownload
                    selectedYear={selectedYear}
                    selectedMonth={selectedMonth}
                    data={MonthTeleDatas}
                    SelectTeam={SelectTeam}
                ></MonthTeleExcelDownload>
            </div>
            <div>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                    <thead>
                        <tr>
                            <th>순서</th>
                            <th>날짜</th>
                            <th>팀명</th>
                            <th>이름</th>
                            <th>시작시간</th>
                            <th>종료시간</th>
                            <th>업무일지</th>
                            <th>팀장확인</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MonthTeleDatas.filter((names: { name: string }) => names.name.includes(SelectedName)).map(
                            (
                                list: {
                                    num: string;
                                    day: string;
                                    team: string;
                                    name: string;
                                    stat_t: string;
                                    end_t: string;
                                    approve: number;
                                },
                                i
                            ) => {
                                return (
                                    <tr key={list.num}>
                                        <td>{i + 1}</td>
                                        <td>{list.day}</td>
                                        <td>{list.team}</td>
                                        <td
                                            title="더블 클릭시 해당 인원만 조회 합니다."
                                            className="MonthSelectedName"
                                            onDoubleClick={() => setSeletedName(list.name)}
                                        >
                                            {list.name}
                                        </td>
                                        <td>{list.stat_t}</td>
                                        <td>{list.end_t}</td>
                                        <td
                                            className="MonthSelectedName"
                                            onClick={() => {
                                                setClicksData(list);
                                                setClicksTitle('Telecommuting');
                                                setOnClickedSet(true);
                                            }}
                                        >
                                            확인
                                        </td>
                                        <td>{list.approve === 1 ? 'O' : 'X'}</td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
            </div>
            {onClicked ? (
                <SelectClickModalMainPage
                    onClicked={onClicked}
                    modalClose={modalClose}
                    clicksData={clicksData}
                    clicksTitle={clicksTitle}
                    setClicksData={(data: {}) => setClicksData(data)}
                ></SelectClickModalMainPage>
            ) : (
                ''
            )}
        </div>
    );
};

export default MonthTeleCommutingTableBox;

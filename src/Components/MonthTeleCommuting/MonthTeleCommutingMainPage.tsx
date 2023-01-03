import React, { useState, useEffect } from 'react';
import MonthTeleCommutingTableBox from './MonthTeleCommutingTableBox';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '../../models';
import { DecryptKey } from '../../config';
import axios from 'axios';
import { OneParamsGet } from '../API/GETApi/GetApi';

type TeamDataProps = {
    show_teams: string;
};

const MonthTeleCommutingMainPage = () => {
    const [selectedMonth, setSelectedMonth] = useState(moment().format('MM'));
    const [selectedYear, setSelectedYear] = useState(moment().format('YYYY'));
    const [ShowTeam, setShowTeam] = useState<TeamDataProps[]>([]);
    const [SelectTeam, setSelectTeam] = useState('권한이 없습니다.');
    const [SelectedName, setSeletedName] = useState('');
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const NavAccessTokenState = useSelector((state: RootState) => state.Nav_AccessTokens);
    useEffect(() => {
        getTeamsDataFromServer();
    }, []);

    const getTeamsDataFromServer = async () => {
        try {
            const getTeamData = await OneParamsGet(`/Tele_app_server/TeamSelectGet`, { id: NavAccessTokenState.id });
            if (getTeamData.data.dataSuccess) {
                setShowTeam(getTeamData.data.teamData);
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ width: '80%', margin: '0 auto' }}>
            <div>
                <select
                    style={{ margin: '0px', width: '100px' }}
                    value={selectedYear}
                    onChange={e => setSelectedYear(e.target.value)}
                    className="TeamLeader_Telecommuting_SearchedNames"
                >
                    <option value="2023">2023년</option>
                    <option value="2022">2022년</option>
                    <option value="2021">2021년</option>
                </select>
                <select
                    style={{ margin: '0px', width: '100px' }}
                    value={selectedMonth}
                    onChange={e => setSelectedMonth(e.target.value)}
                    className="TeamLeader_Telecommuting_SearchedNames"
                >
                    <option value="01">1월</option>
                    <option value="02">2월</option>
                    <option value="03">3월</option>
                    <option value="04">4월</option>
                    <option value="05">5월</option>
                    <option value="06">6월</option>
                    <option value="07">7월</option>
                    <option value="08">8월</option>
                    <option value="09">9월</option>
                    <option value="10">10월</option>
                    <option value="11">11월</option>
                    <option value="12">12월</option>
                </select>
                <select
                    style={{ margin: '0px', width: '100px' }}
                    value={SelectTeam}
                    onChange={e => setSelectTeam(e.target.value)}
                    className="TeamLeader_Telecommuting_SearchedNames"
                >
                    <option value="">팀을 선택해주세요.</option>
                    {ShowTeam.map((list, i) => {
                        return <option value={list.show_teams}>{list.show_teams}</option>;
                    })}
                </select>
                <input
                    type="text"
                    className="TeamLeader_Telecommuting_SearchedNames"
                    value={SelectedName}
                    style={{ border: 'none', paddingLeft: '10px' }}
                    onChange={e => setSeletedName(e.target.value)}
                    placeholder="이름을 입력 해주세요."
                ></input>
                {SelectedName === '' ? (
                    ''
                ) : (
                    <button onClick={() => setSeletedName('')} style={{ marginLeft: '30px', fontSize: '1em' }}>
                        전 인원
                    </button>
                )}
            </div>
            <div>
                <MonthTeleCommutingTableBox
                    selectedYear={selectedYear}
                    selectedMonth={selectedMonth}
                    SelectTeam={SelectTeam}
                    SelectedName={SelectedName}
                    setSeletedName={setSeletedName}
                    IDS={DecryptKey(InfomationState.id)}
                ></MonthTeleCommutingTableBox>
            </div>
        </div>
    );
};

export default MonthTeleCommutingMainPage;

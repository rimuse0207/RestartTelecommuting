import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { DecryptKey } from '../../../config';
import { useSelector } from 'react-redux';
import { RootState } from '../../../models';
import TeamSelectOTTable from './TeamSelectOTTable';
import { OneParamsGet } from '../../API/GETApi/GetApi';
type TeamDataProps = {
    show_teams: string;
};
const TeamSelectOTSpace = () => {
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const NavAccessTokenState = useSelector((state: RootState) => state.Nav_AccessTokens);
    const [selectYear, setSelectYear] = useState(moment().format('YYYY'));
    const [selectMonth, setSelectMonth] = useState(moment().format('MM'));
    const [selectTeam, setSelectTeam] = useState('');
    const [showTeam, setShowTeam] = useState<TeamDataProps[]>([]);

    const [teamBelongInfo, setTeamBelongInfo] = useState([]);

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
    useEffect(() => {
        if (selectTeam === '') {
            setTeamBelongInfo([]);
            return;
        } else {
            getDataSelectTeam();
        }
    }, [selectYear, selectMonth, selectTeam]);

    const getDataSelectTeam = async () => {
        if (selectTeam === '') {
            return;
        }
        try {
            const getDataShowTeam = await axios.post(`${process.env.REACT_APP_DB_HOST}/TeamSelectOT_app_server/getTeamShow`, {
                selectYear,
                selectMonth,
                selectTeam,
            });
            setTeamBelongInfo(getDataShowTeam.data.datas);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="TeamSelectOTSpace_main_div">
                <div className="TeamSelectOTSpace_select_box_div">
                    <select value={selectYear} onChange={e => setSelectYear(e.target.value)}>
                        <option value="2023">2023년</option>
                        <option value="2022">2022년</option>
                        <option value="2021">2021년</option>
                    </select>
                    <select value={selectMonth} onChange={e => setSelectMonth(e.target.value)}>
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
                    <select value={selectTeam} onChange={e => setSelectTeam(e.target.value)}>
                        <option value="">팀 선택</option>
                        {showTeam.map((list, i) => {
                            return (
                                <option value={list.show_teams} key={list.show_teams}>
                                    {list.show_teams.toUpperCase()}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div>
                    <div style={{ textAlign: 'end' }}>*더블 클릭 시 자세하게 볼 수 있습니다.</div>
                    <TeamSelectOTTable
                        teamBelongInfo={teamBelongInfo}
                        selectTeam={selectTeam}
                        selectYear={selectYear}
                        selectMonth={selectMonth}
                    ></TeamSelectOTTable>
                </div>
            </div>
        </div>
    );
};

export default TeamSelectOTSpace;

import React, { useState, useEffect } from 'react';
import TeamLeaderBeforeOTWorkSpace from './TeamLeaderBeforeOTWorkSpace';
import TeamLeaderAfterOTWorkSpace from './TeamLeaderAfterOTWorkSpace';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../models';
import moment from 'moment';
import axios from 'axios';
import './TeamLeader.css';
import { DecryptKey } from '../../../../config';
import { OneParamsGet } from '../../../API/GETApi/GetApi';
type TeamDataProps = {
    show_teams: string;
};

const TeamLeaderOTPage = () => {
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const [showTeam, setShowTeam] = useState<TeamDataProps[]>([]);
    const [selectYear, setSelectYear] = useState(moment().format('YYYY'));
    const [selectMonth, setSelectMonth] = useState(moment().format('MM'));
    const [selectTeam, setSelectTeam] = useState('');
    const [ShowName, setShowName] = useState([]);
    const [selectName, setSelectName] = useState('');
    const [teamBelongInfo, setTeamBelongInfo] = useState([]);
    const NavAccessTokenState = useSelector((state: RootState) => state.Nav_AccessTokens);

    useEffect(() => {
        // getDataSelectTeam();
        // const id = DecryptKey(InfomationState.id);
        // if (
        //     id === 'sjyoo@dhk.co.kr' ||
        //     id === 'sjkim@dhk.co.kr' ||
        //     id === 'jycha@dhk.co.kr' ||
        //     id === 'jhlee1@dhk.co.kr' ||
        //     id === 'htchoi@dhk.co.kr' ||
        //     id === 'jmlee@dhk.co.kr' ||
        //     id === 'dikim@dhk.co.kr'
        // ) {
        //     setShowTeam(['dicer', 'laser', 'grinder', '장비영업', '부품소재', '영업기술', '경영지원', '아산CE', 'OEM']);
        //     setSelectTeam('dicer');
        // } else if (id === 'sjpark@dhk.co.kr') {
        //     setShowTeam(['경영지원']);
        //     setSelectTeam('경영지원');
        // } else if (id === 'jhgoo@dhk.co.kr') {
        //     setShowTeam(['dicer', 'laser', 'grinder', '아산CE']);
        //     setSelectTeam('dicer');
        // } else if (id === 'kcahn@dhk.co.kr') {
        //     setShowTeam(['장비영업', '부품소재', '영업기술', 'OEM']);
        //     setSelectTeam('장비영업');
        // } else if (id === 'ychong@dhk.co.kr') {
        //     setShowTeam(['A_dicer', 'A_laser', 'A_grinder', '아산CE']);
        //     setSelectTeam('A_dicer');
        // } else if (id === 'hjlee@dhk.co.kr') {
        //     setShowTeam(['dicer']);
        //     setSelectTeam('dicer');
        // } else if (id === 'wbjung@dhk.co.kr') {
        //     setShowTeam(['laser']);
        //     setSelectTeam('laser');
        // } else if (id === 'jhshin@dhk.co.kr') {
        //     setShowTeam(['grinder']);
        //     setSelectTeam('grinder');
        // } else if (id === 'cwjun@dhk.co.kr') {
        //     setShowTeam(['장비영업']);
        //     setSelectTeam('장비영업');
        // } else if (id === 'ikkim@dhk.co.kr') {
        //     setShowTeam(['OEM']);
        //     setSelectTeam('OEM');
        // } else if (id === 'siyi@dhk.co.kr') {
        //     setShowTeam(['부품소재']);
        //     setSelectTeam('부품소재');
        // }
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
        if (showTeam.length !== 0 || selectTeam !== '') {
            getDataSelectTeam();
        } else if (selectTeam === '') {
            setShowName([]);
        }
    }, [selectTeam]);

    const getDataSelectTeam = async () => {
        if (selectTeam === '') {
            setShowName([]);
            return;
        }
        try {
            const getDataShowTeam = await axios.post(`${process.env.REACT_APP_DB_HOST}/TeamSelectOT_app_server/getPersonName`, {
                id: DecryptKey(InfomationState.id),
                selectYear,
                selectMonth,
                selectTeam,
            });

            setShowName(getDataShowTeam.data.datas);
            setSelectName(getDataShowTeam.data.datas[0].name);
        } catch (error) {
            console.log(error);
        }
    };

    const HandleNameChecked = () => {
        getDataSelectTeam();
    };
    return (
        <div style={{ width: '90%', margin: '0 auto' }}>
            <div>
                <div className="TeamSelectOTSpace_select_box_div" style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <select
                        style={{ margin: 0, width: '100px' }}
                        value={selectYear}
                        onChange={e => setSelectYear(e.target.value)}
                        className="TeamLeader_Telecommuting_SearchedNames"
                    >
                        <option value="2021">2021년</option>
                        <option value="2022">2022년</option>
                    </select>
                    <select
                        value={selectMonth}
                        onChange={e => setSelectMonth(e.target.value)}
                        className="TeamLeader_Telecommuting_SearchedNames"
                        style={{ margin: 0, width: '100px' }}
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
                        value={selectTeam}
                        onChange={e => setSelectTeam(e.target.value)}
                        className="TeamLeader_Telecommuting_SearchedNames"
                        style={{ margin: 0, width: '100px' }}
                    >
                        <option value="">팀 선택</option>
                        {showTeam.map((list, i) => {
                            return (
                                <option value={list.show_teams} key={list.show_teams}>
                                    {list.show_teams}
                                </option>
                            );
                        })}
                    </select>
                    <select
                        value={selectName}
                        onChange={e => setSelectName(e.target.value)}
                        className="TeamLeader_Telecommuting_SearchedNames"
                        style={{ margin: 0, width: '100px' }}
                    >
                        {ShowName.map((list: { name: string; id: string }, i) => {
                            return (
                                <option value={list.name} key={list.id}>
                                    {list.name}
                                </option>
                            );
                        })}
                    </select>
                    {/* {ShowName.length > 0 ? <div></div> : <button onClick={HandleNameChecked}>이름 확인 클릭</button>} */}
                </div>
            </div>
            <div className="TeamLeaderFloat_box_div">
                <div className="TeamLeaderBefore_left">
                    <div>
                        <TeamLeaderBeforeOTWorkSpace
                            selectYear={selectYear}
                            selectMonth={selectMonth}
                            selectName={selectName}
                        ></TeamLeaderBeforeOTWorkSpace>
                    </div>
                </div>
                <div className="TeamLeaderBefore_right">
                    <div>
                        <TeamLeaderAfterOTWorkSpace
                            selectYear={selectYear}
                            selectMonth={selectMonth}
                            selectName={selectName}
                        ></TeamLeaderAfterOTWorkSpace>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TeamLeaderOTPage;

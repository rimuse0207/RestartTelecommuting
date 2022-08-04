import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../models';
import moment from 'moment';
import axios from 'axios';
import { DecryptKey } from '../../../config';
import TeamLeaderBusinessTripContent from './TeamLeaderBusinessTripContent';
import styled from 'styled-components';
import { OneParamsGet } from '../../API/GETApi/GetApi';

const TeamLeaderPersonClickContentMainDivBox = styled.div`
    padding-left: 20px;
    padding-right: 20px;
`;
type TeamDataProps = {
    show_teams: string;
};
const TeamLeaderPersonClickContent = () => {
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const NavAccessTokenState = useSelector((state: RootState) => state.Nav_AccessTokens);
    const [showTeam, setShowTeam] = useState<TeamDataProps[]>([]);
    const [selectYear, setSelectYear] = useState(moment().format('YYYY'));
    const [selectMonth, setSelectMonth] = useState(moment().format('MM'));
    const [selectTeam, setSelectTeam] = useState('');
    const [ShowName, setShowName] = useState([]);
    const [selectName, setSelectName] = useState('');
    const [selectId, setSelectId] = useState('');

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
        //     setShowTeam(['dicer', 'laser', 'grinder', '아산CE', '영업기술']);
        //     setSelectTeam('dicer');
        // } else if (id === 'jhgoo@dhk.co.kr') {
        //     setShowTeam(['dicer', 'laser', 'grinder', '아산CE']);
        //     setSelectTeam('dicer');
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
        // } else if (id === 'kcahn@dhk.co.kr') {
        //     setShowTeam(['영업기술']);
        //     setSelectTeam('영업기술');
        // }
        getTeamsDataFromServer();
    }, []);

    const getTeamsDataFromServer = async () => {
        try {
            const getTeamData = await OneParamsGet(`/Tele_app_server/TeamSelectGet`, { id: NavAccessTokenState.id });
            if (getTeamData.data.dataSuccess) {
                const DeletTeams = getTeamData.data.teamData
                    .filter((item: { show_teams: string }) => item.show_teams !== '부품소재')
                    .filter((item: { show_teams: string }) => item.show_teams !== '장비영업')
                    .filter((item: { show_teams: string }) => item.show_teams !== '경영지원')
                    .filter((item: { show_teams: string }) => item.show_teams !== 'OEM');
                setShowTeam(DeletTeams);
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    };

    // useEffect(() => {
    //     if (showTeam[0] !== '권한없음') {
    //         getDataSelectTeam();
    //     }
    // }, [selectTeam]);

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
            setSelectId(getDataShowTeam.data.datas[0].id);
        } catch (error) {
            console.log(error);
        }
    };
    const HandleNameChecked = () => {
        getDataSelectTeam();
    };
    return (
        <TeamLeaderPersonClickContentMainDivBox>
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
                    value={`${selectName}||${selectId}`}
                    onChange={e => {
                        setSelectName(e.target.value.split('||')[0]);
                        setSelectId(e.target.value.split('||')[1]);
                    }}
                    className="TeamLeader_Telecommuting_SearchedNames"
                    style={{ margin: 0, width: '100px' }}
                >
                    {ShowName.map((list: { name: string; id: string }, i) => {
                        return (
                            <option value={`${list.name}||${list.id}`} key={list.id}>
                                {list.name}
                            </option>
                        );
                    })}
                </select>
                {/* {ShowName.length > 0 ? <div></div> : <button onClick={HandleNameChecked}>이름 확인 클릭</button>} */}
            </div>
            <TeamLeaderBusinessTripContent
                selectName={selectName}
                selectTeam={selectTeam}
                selectYear={selectYear}
                selectMonth={selectMonth}
                selectId={selectId}
            ></TeamLeaderBusinessTripContent>
        </TeamLeaderPersonClickContentMainDivBox>
    );
};

export default TeamLeaderPersonClickContent;

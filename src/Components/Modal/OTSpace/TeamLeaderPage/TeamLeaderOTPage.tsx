import React, { useState, useEffect } from 'react';
import TeamLeaderBeforeOTWorkSpace from './TeamLeaderBeforeOTWorkSpace';
import TeamLeaderAfterOTWorkSpace from './TeamLeaderAfterOTWorkSpace';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../models';
import moment from 'moment';
import axios from 'axios';
import './TeamLeader.css';
import { DecryptKey } from '../../../../config';

const TeamLeaderOTPage = () => {
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const [showTeam, setShowTeam] = useState(['권한없음.']);
    const [selectYear, setSelectYear] = useState(moment().format('YYYY'));
    const [selectMonth, setSelectMonth] = useState(moment().format('MM'));
    const [selectTeam, setSelectTeam] = useState(InfomationState.team);
    const [ShowName, setShowName] = useState([]);
    const [selectName, setSelectName] = useState('');
    const [teamBelongInfo, setTeamBelongInfo] = useState([]);

    useEffect(() => {
        getDataSelectTeam();
        const id = DecryptKey(InfomationState.id);
        if (
            id === 'sjyoo@dhk.co.kr' ||
            id === 'sjkim@dhk.co.kr' ||
            id === 'jycha@dhk.co.kr' ||
            id === 'jhlee1@dhk.co.kr' ||
            id === 'htchoi@dhk.co.kr' ||
            id === 'jmlee@dhk.co.kr'
        ) {
            setShowTeam(['dicer', 'laser', 'grinder', '장비영업', '부품소재', '영업기술', '경영지원', '아산CE']);
        }
    }, []);
    useEffect(() => {
        if (showTeam[0] !== '권한없음') getDataSelectTeam();
    }, [selectYear, selectMonth, selectTeam]);
    const getDataSelectTeam = async () => {
        try {
            const getDataShowTeam = await axios.post(`${process.env.REACT_APP_DB_HOST}/TeamSelectOT_app_server/getPersonName`, {
                selectYear,
                selectMonth,
                selectTeam,
            });
            console.log(getDataShowTeam);
            setShowName(getDataShowTeam.data.datas);
            setSelectName(getDataShowTeam.data.datas[0].name)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ width: '90%', margin: '0 auto' }}>
            <div>
                <div className="TeamSelectOTSpace_select_box_div">
                    <select value={selectYear} onChange={e => setSelectYear(e.target.value)}>
                        <option value="2021">2021년</option>
                        <option value="2022">2022년</option>
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
                        {showTeam.map((list, i) => {
                            return (
                                <option value={list} key={list}>
                                    {list}
                                </option>
                            );
                        })}
                    </select>
                    <select value={selectName} onChange={e => setSelectName(e.target.value)}>
                        {ShowName.map((list: { name: string; id: string }, i) => {
                            return (
                                <option value={list.name} key={list.id}>
                                    {list.name}
                                </option>
                            );
                        })}
                    </select>
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
                        <TeamLeaderAfterOTWorkSpace  selectYear={selectYear}
                            selectMonth={selectMonth}
                            selectName={selectName}></TeamLeaderAfterOTWorkSpace>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TeamLeaderOTPage;

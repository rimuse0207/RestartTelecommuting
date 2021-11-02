import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { DecryptKey } from '../../../config';
import { useSelector } from 'react-redux';
import { RootState } from '../../../models';
import TeamSelectOTTable from './TeamSelectOTTable';
const TeamSelectOTSpace = () => {
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const [selectYear, setSelectYear] = useState(moment().format('YYYY'));
    const [selectMonth, setSelectMonth] = useState(moment().format('MM'));
    const [selectTeam, setSelectTeam] = useState(InfomationState.team);
    const [showTeam, setShowTeam] = useState(['권한없음.']);

    const [teamBelongInfo, setTeamBelongInfo] = useState([]);

    useEffect(() => {
        const id = DecryptKey(InfomationState.id);
        // if (
        //     id === 'sjyoo@dhk.co.kr' ||
        //     id === 'sjkim@dhk.co.kr' ||
        //     id === 'jycha@dhk.co.kr' ||
        //     id === 'jhlee1@dhk.co.kr' ||
        //     id === 'htchoi@dhk.co.kr' ||
        //     id === 'jmlee@dhk.co.kr'
        // ) {
        //     setShowTeam(['dicer', 'laser', 'grinder', '장비영업', '부품소재', '영업기술', '경영지원', '아산CE']);
        // }
        if (
            id === 'sjyoo@dhk.co.kr' ||
            id === 'sjkim@dhk.co.kr' ||
            id === 'jycha@dhk.co.kr' ||
            id === 'jhlee1@dhk.co.kr' ||
            id === 'htchoi@dhk.co.kr' ||
            id === 'jmlee@dhk.co.kr'
        ) {
            setShowTeam(['dicer', 'laser', 'grinder', '장비영업', '부품소재', '영업기술', '경영지원', '아산CE']);
            setSelectTeam('dicer');
        } else if (id === 'sjpark@dhk.co.kr') {
            setShowTeam(['경영지원']);
            setSelectTeam('경영지원');
        } else if (id === 'jhgoo@dhk.co.kr') {
            setShowTeam(['dicer', 'laser', 'grinder', '아산CE']);
            setSelectTeam('dicer');
        } else if (id === 'kcahn@dhk.co.kr') {
            setShowTeam(['장비영업', '부품소재', '영업기술']);
            setSelectTeam('장비영업');
        } else if (id === 'ychong@dhk.co.kr') {
            setShowTeam(['A_dicer', 'A_laser', 'A_grinder', '아산CE']);
            setSelectTeam('A_dicer');
        }
    }, []);
    useEffect(() => {
        getDataSelectTeam();
    }, [selectYear, selectMonth, selectTeam]);

    const getDataSelectTeam = async () => {
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
                </div>
                <div>
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

import React, { useState, useEffect } from 'react';
import MonthTeleCommutingTableBox from './MonthTeleCommutingTableBox';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '../../models';
import { DecryptKey } from '../../config';
const MonthTeleCommutingMainPage = () => {
    const [selectedMonth, setSelectedMonth] = useState(moment().format('MM'));
    const [selectedYear, setSelectedYear] = useState(moment().format('YYYY'));
    const [ShowTeam, setShowTeam] = useState(['']);
    const [SelectTeam, setSelectTeam] = useState('권한이 없습니다.');
    const [SelectedName, setSeletedName] = useState('');
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    useEffect(() => {
        const id = DecryptKey(InfomationState.id);
        if (
            id === 'sjyoo@dhk.co.kr' ||
            id === 'sjkim@dhk.co.kr' ||
            id === 'jycha@dhk.co.kr' ||
            id === 'jhlee1@dhk.co.kr' ||
            id === 'htchoi@dhk.co.kr' ||
            id === 'jmlee@dhk.co.kr'
        ) {
            setShowTeam(['dicer', 'laser', 'grinder', '장비영업', '부품소재', '영업기술', '경영지원', '아산CE', 'OEM']);
            setSelectTeam('dicer');
        } else if (id === 'sjpark@dhk.co.kr') {
            setShowTeam(['경영지원']);
            setSelectTeam('경영지원');
        } else if (id === 'jhgoo@dhk.co.kr') {
            setShowTeam(['dicer', 'laser', 'grinder', '아산CE']);
            setSelectTeam('dicer');
        } else if (id === 'kcahn@dhk.co.kr') {
            setShowTeam(['장비영업', '부품소재', '영업기술', 'OEM']);
            setSelectTeam('장비영업');
        } else if (id === 'ychong@dhk.co.kr') {
            setShowTeam(['A_dicer', 'A_laser', 'A_grinder', '아산CE']);
            setSelectTeam('A_dicer');
        } else if (id === 'hjlee@dhk.co.kr') {
            setShowTeam(['dicer']);
            setSelectTeam('dicer');
        } else if (id === 'wbjung@dhk.co.kr') {
            setShowTeam(['laser']);
            setSelectTeam('laser');
        } else if (id === 'jhshin@dhk.co.kr') {
            setShowTeam(['grinder']);
            setSelectTeam('grinder');
        } else if (id === 'cwjun@dhk.co.kr') {
            setShowTeam(['장비영업']);
            setSelectTeam('장비영업');
        } else if (id === 'ikkim@dhk.co.kr') {
            setShowTeam(['OEM']);
            setSelectTeam('OEM');
        } else if (id === 'siyi@dhk.co.kr') {
            setShowTeam(['부품소재']);
            setSelectTeam('부품소재');
        }
    }, []);

    return (
        <div style={{ width: '80%', margin: '0 auto' }}>
            <div>
                <select
                    style={{ margin: '0px', width: '100px' }}
                    value={selectedYear}
                    onChange={e => setSelectedYear(e.target.value)}
                    className="TeamLeader_Telecommuting_SearchedNames"
                >
                    <option value="2021">2021년</option>
                    <option value="2022">2022년</option>
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
                    {ShowTeam.map((list, i) => {
                        return <option value={list}>{list}</option>;
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

import React, { useEffect, useState } from 'react';

type TeamSelectOTTableProps = {
    teamBelongInfo: any;
    selectTeam: string;
};

const TeamSelectOTTable = ({ teamBelongInfo, selectTeam }: TeamSelectOTTableProps) => {
    const [showdatas, setShowdatas] = useState([{ name: '', sumTimes: 0, nightTimes: 0, holidaySum_time: 0 }]);
    useEffect(() => {
        let datapush: any = [];
        for (var i = 0; i < teamBelongInfo.length; i++) {
            var sumTime = 0;
            var nightTime = 0;
            var holidaySum_time = 0;
            for (var j = 0; j < teamBelongInfo[i].rows2.length; j++) {
                sumTime = sumTime + teamBelongInfo[i].rows2[j].mon_time;
                nightTime = nightTime + teamBelongInfo[i].rows2[j].night_date;
                holidaySum_time = holidaySum_time + teamBelongInfo[i].rows3[j].mon_time;
            }
            console.log(teamBelongInfo[i].name, sumTime, nightTime, holidaySum_time);
            datapush = datapush.concat({ name: teamBelongInfo[i].name, sumTimes: sumTime, nightTimes: nightTime, holidaySum_time });
        }
        setShowdatas(datapush);
    }, [teamBelongInfo]);
    return (
        <div className="TeamSelectOTTable_list_div" style={{ marginTop: '20px', marginBottom: '30px' }}>
            <table>
                <thead>
                    <tr>
                        <th>순서</th>
                        <th>성명</th>
                        <th>부서명</th>
                        <th>연장</th>
                        <th>심야</th>
                        <th>휴일</th>
                        <th>총 합계</th>
                    </tr>
                </thead>
                <tbody>
                    {showdatas.map((list, i) => {
                        return (
                            <tr key={list.name}>
                                <td>{i + 1}</td>
                                <td>{list.name}</td>
                                {/* <td>{list.team.toUpperCase()}</td> */}
                                <td>{selectTeam.toUpperCase()}</td>
                                <td>{list.sumTimes > 0 || list.holidaySum_time > 0 ? list.sumTimes + '시간' : ''}</td>
                                <td>{list.nightTimes > 0 || list.sumTimes > 0 || list.holidaySum_time ? list.nightTimes + '시간' : ''}</td>
                                <td>{list.holidaySum_time > 0 || list.sumTimes > 0 ? list.holidaySum_time + '시간' : ''}</td>
                                <td>
                                    {list.sumTimes > 0 || list.holidaySum_time > 0 ? list.sumTimes + list.holidaySum_time + '시간' : ''}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TeamSelectOTTable;

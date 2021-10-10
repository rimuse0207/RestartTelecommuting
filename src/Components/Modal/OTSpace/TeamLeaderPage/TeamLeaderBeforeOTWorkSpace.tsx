import axios from 'axios';
import React, { useEffect, useState } from 'react';

type TeamLeaderBeforeOTWorkSpaceProps = {
    selectYear: string;
    selectMonth: string;
    selectName: string | null;
};

const TeamLeaderBeforeOTWorkSpace = ({ selectYear, selectMonth, selectName }: TeamLeaderBeforeOTWorkSpaceProps) => {
    const [BeforeOTData,setBeforeOTData] = useState([]);
    useEffect(() => {
        getDataOTData();
    }, [selectYear, selectMonth, selectName]);
    const getDataOTData = async () => {
        try {
            const getDataBeforeOT = await axios.post(`${process.env.REACT_APP_DB_HOST}/TeamSelectOT_app_server/getPersonBeforeOT`, {
                selectYear,
                selectMonth,
                selectName
            });
            console.log(getDataBeforeOT);
            setBeforeOTData(getDataBeforeOT.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    return <div>
        <div>
            <div>
                <div>
                    <div>
                        <h2>사전OT 신청 현황</h2>
                    </div>
                    <div>
                    <table style={{textAlign:"center",borderCollapse:"collapse"}}>
                    <thead>
                    <tr>
                        <th>일자</th>
                        <th>이름</th>
                        <th>팀명</th>
                        <th>총 시간</th>
                        <th>팀장 승인</th>
                        <th>자세하게</th>
                    </tr>
                    </thead>
                    <tbody>
                    {BeforeOTData.map((list:{date_mon:string;date_sun:string;sum_time:number;name:string;leadercheck:number;team:string},i)=>{
                        return <tr>
                                <td>{list.date_mon}(월) ~ {list.date_sun}(일)</td>
                                <td>{list.name}</td>
                                <td>{list.team}</td>
                                <td>{list.sum_time} 시간</td>
                                <td>{list.leadercheck === 0 ? "X":"O"}</td>
                                <td>클릭</td>
                                </tr>                           
                    })}
                    </tbody>
                </table>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default TeamLeaderBeforeOTWorkSpace;

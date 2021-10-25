import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TeamLeaderAfterModal from './TeamLeaderAfterModal';
import TeamLeaderModal from './TeamLeaderModal';

type TeamLeaderBeforeOTWorkSpaceProps = {
    selectYear: string;
    selectMonth: string;
    selectName: string | null;
};
type listType = {
    date_mon: string;
    date_tue: string;
    date_wed: string;
    date_thu: string;
    date_fri: string;
    date_sat: string;
    date_sun: string;
    start_time_mon: string;
    start_time_tue: string;
    start_time_wed: string;
    start_time_thu: string;
    start_time_fri: string;
    start_time_sat: string;
    start_time_sun: string;
    end_time_mon: string;
    end_time_tue: string;
    end_time_wed: string;
    end_time_thu: string;
    end_time_fri: string;
    end_time_sat: string;
    end_time_sun: string;
    mon_rest: string;
    tue_rest: string;
    wed_rest: string;
    thu_rest: string;
    fri_rest: string;
    sat_rest: string;
    sun_rest: string;
    sum_time: number;
    name: string;
    leadercheck: number;
    team: string;
    mon_time: number;
    tue_time: number;
    wed_time: number;
    thu_time: number;
    fri_time: number;
    sat_time: number;
    sun_time: number;
    mon_reason: string;
    tue_reason: string;
    wed_reason: string;
    thu_reason: string;
    fri_reason: string;
    sat_reason: string;
    sun_reason: string;
    mon_reason1: string;
    tue_reason1: string;
    wed_reason1: string;
    thu_reason1: string;
    fri_reason1: string;
    sat_reason1: string;
    sun_reason1: string;
    mon_reason2: string;
    tue_reason2: string;
    wed_reason2: string;
    thu_reason2: string;
    fri_reason2: string;
    sat_reason2: string;
    sun_reason2: string;
};

const TeamLeaderBeforeOTWorkSpace = ({ selectYear, selectMonth, selectName }: TeamLeaderBeforeOTWorkSpaceProps) => {
    const [BeforeOTData, setBeforeOTData] = useState([]);
    const [onClicked, setonClicked] = useState(false);
    const [clickedOTData, setClickedOTData] = useState<listType>({
        date_mon: '',
        date_tue: '',
        date_wed: '',
        date_thu: '',
        date_fri: '',
        date_sat: '',
        date_sun: '',
        start_time_mon: '',
        start_time_tue: '',
        start_time_wed: '',
        start_time_thu: '',
        start_time_fri: '',
        start_time_sat: '',
        start_time_sun: '',
        end_time_mon: '',
        end_time_tue: '',
        end_time_wed: '',
        end_time_thu: '',
        end_time_fri: '',
        end_time_sat: '',
        end_time_sun: '',
        mon_rest: '',
        tue_rest: '',
        wed_rest: '',
        thu_rest: '',
        fri_rest: '',
        sat_rest: '',
        sun_rest: '',
        sum_time: 0,
        name: '',
        leadercheck: 0,
        team: '',
        mon_time: 0,
        tue_time: 0,
        wed_time: 0,
        thu_time: 0,
        fri_time: 0,
        sat_time: 0,
        sun_time: 0,
        mon_reason: '',
        tue_reason: '',
        wed_reason: '',
        thu_reason: '',
        fri_reason: '',
        sat_reason: '',
        sun_reason: '',
        mon_reason1: '',
        tue_reason1: '',
        wed_reason1: '',
        thu_reason1: '',
        fri_reason1: '',
        sat_reason1: '',
        sun_reason1: '',
        mon_reason2: '',
        tue_reason2: '',
        wed_reason2: '',
        thu_reason2: '',
        fri_reason2: '',
        sat_reason2: '',
        sun_reason2: '',
    });
    useEffect(() => {
        getDataOTData();
    }, [selectYear, selectMonth, selectName]);

    const modalClose = () => {
        setonClicked(false);
    };

    const getDataOTData = async () => {
        try {
            const getDataBeforeOT = await axios.post(`${process.env.REACT_APP_DB_HOST}/TeamSelectOT_app_server/getPersonBeforeOT`, {
                selectYear,
                selectMonth,
                selectName,
            });
            console.log(getDataBeforeOT);
            setBeforeOTData(getDataBeforeOT.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <div>
                <div>
                    <div>
                        <div>
                            <h2>사전OT 신청 현황</h2>
                        </div>
                        <div>
                            <table style={{ textAlign: 'center', borderCollapse: 'collapse' }}>
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
                                    {BeforeOTData.map((list: listType) => {
                                        return (
                                            <tr>
                                                <td>
                                                    {list.date_mon}(월) ~ {list.date_sun}(일)
                                                </td>
                                                <td>{list.name}</td>
                                                <td>{list.team}</td>
                                                <td>{list.mon_time+list.tue_time+list.wed_time+list.thu_time+list.fri_time+list.sat_time+list.sun_time} 시간</td>
                                                <td>{list.leadercheck === 0 ? 'X' : 'O'}</td>
                                                <td
                                                    className="TeamLeader_before_OT_WorkSpace_click_td"
                                                    onClick={() => {
                                                        setonClicked(true);
                                                        setClickedOTData(list);
                                                    }}
                                                >
                                                    클릭
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <TeamLeaderModal
                onClicked={onClicked}
                modalClose={modalClose}
                clickedOTData={clickedOTData}
                getDataOTData={getDataOTData}
            ></TeamLeaderModal>
        </div>
    );
};

export default TeamLeaderBeforeOTWorkSpace;

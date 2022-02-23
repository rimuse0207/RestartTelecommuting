import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import moment from 'moment';
import axios from 'axios';
const AdminDashBoardTeleCommutingContentPageMainDivBox = styled.div`
    .DateClickButtons {
        display: flex;
        justify-content: center;
        align-items: center;
        .DateClickButtons_Icons {
            margin-left: 30px;
            margin-right: 30px;
            text-align: center;
            width: 40px;
            height: 40px;
            line-height: 45px;
            border-radius: 50%;
            :hover {
                cursor: pointer;
                background-color: lightgray;
            }
        }
    }
    table.type09 {
        margin-top: 30px;
        border-collapse: collapse;
        text-align: left;
        line-height: 1.5;
        font-size: 0.9em;

        margin-bottom: 30px;
    }
    table.type09 thead th {
        padding: 10px;
        font-weight: bold;
        vertical-align: top;
        color: #369;
        border-bottom: 3px solid #036;
        font-size: 0.9em;
    }
    table.type09 tbody th {
        width: 150px;
        padding: 10px;
        font-weight: bold;
        vertical-align: top;
        border-bottom: 1px solid #ccc;
        background: #f3f6f7;
    }
    table.type09 td {
        width: 250px;
        padding: 10px;
        vertical-align: top;
        border-bottom: 1px solid #ccc;
        font-size: 0.9em;
    }
`;

type AdminDashBoardTeleCommutingContentPageProps = {
    StaticsNaviButton: string;
};

const AdminDashBoardTeleCommutingContentPage = ({ StaticsNaviButton }: AdminDashBoardTeleCommutingContentPageProps) => {
    const [getDate, setGetDate] = useState(moment());
    const [getTableData, setGetTableData] = useState([]);
    useEffect(() => {
        getDataFromServerTeleCommutingData();
    }, [StaticsNaviButton, getDate]);

    const getDataFromServerTeleCommutingData = async () => {
        try {
            const getDataFromServerData = await axios.get(
                `${process.env.REACT_APP_DB_HOST}/AdminInsertLogin_app_server/getTelecommutingData`,
                {
                    params: {
                        getDate: getDate.format('YYYY-MM-DD'),
                        StaticsNaviButton,
                    },
                }
            );
            if (getDataFromServerData.data.dataSuccess) {
                setGetTableData(getDataFromServerData.data.datas);
            } else {
                alert('에러발생');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AdminDashBoardTeleCommutingContentPageMainDivBox>
            <div className="DateClickButtons">
                <h2 className="DateClickButtons_Icons" onClick={() => setGetDate(moment(getDate).clone().subtract(1, 'days'))}>
                    <MdArrowBackIos></MdArrowBackIos>
                </h2>
                <h2>{getDate.format('YYYY년 MM월 DD일')}</h2>
                <h2 className="DateClickButtons_Icons" onClick={() => setGetDate(moment(getDate).clone().add(1, 'days'))}>
                    <MdArrowForwardIos></MdArrowForwardIos>
                </h2>
            </div>
            <div>
                {getTableData.length > 0 ? (
                    <table className="type09">
                        <thead>
                            <tr>
                                <th scope="cols">인덱스</th>
                                <th scope="cols">이름</th>
                                <th scope="cols">팀명</th>
                                <th scope="cols">시작시간</th>
                                <th scope="cols">종료시간</th>
                                <th scope="cols">총 근무 시간</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getTableData.map((list: { name: string; stat_t: string; end_t: string; team: string }, i: number) => {
                                return (
                                    <tr style={list.end_t === '00:00' ? { background: 'orange' } : {}}>
                                        <th>{i + 1}</th>
                                        <th scope="row">{list.name}</th>
                                        <td>{list.team}</td>
                                        <td>{list.stat_t}</td>
                                        <td>{list.end_t}</td>
                                        {list.end_t === '00:00' ? (
                                            <td>종료 미실시</td>
                                        ) : (
                                            <td>
                                                {Math.floor(
                                                    moment
                                                        .duration(
                                                            moment(`2022-01-01 ${list.end_t}`).diff(moment(`2022-01-01 ${list.stat_t}`))
                                                        )
                                                        .asHours()
                                                )}
                                                시간
                                                {Math.floor(
                                                    moment
                                                        .duration(
                                                            moment(`2022-01-01 ${list.end_t}`).diff(moment(`2022-01-01 ${list.stat_t}`))
                                                        )
                                                        .asMinutes() % 60
                                                )}
                                                분
                                            </td>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <div>데이터가 없습니다...</div>
                )}
            </div>
        </AdminDashBoardTeleCommutingContentPageMainDivBox>
    );
};

export default AdminDashBoardTeleCommutingContentPage;

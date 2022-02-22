import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import axios from 'axios';
import { useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { toast } from '../../../../ToastMessage/ToastManager';
const AdminDashBoardUpdateUsersTableMainDivBox = styled.div`
    table.type09 {
        margin-top: 20px;
        width: 60%;
        border-collapse: collapse;
        text-align: left;
        line-height: 1.5;
        font-size: 0.9em;
    }
    table.type09 thead th {
        padding: 10px;
        font-weight: bold;
        vertical-align: top;
        color: #369;
        font-size: 0.9em;
        border: none;
        background-color: #fff;
        border-bottom: 3px solid #036;
    }
    table.type09 tbody th {
        width: 150px;
        padding: 10px;
        font-weight: bold;
        vertical-align: top;
        font-size: 0.9em;
        border-bottom: 1px solid #ccc;
        background: #f3f6f7;
    }
    table.type09 td {
        width: 350px;
        padding: 10px;
        vertical-align: top;
        border-bottom: 1px solid #ccc;
        font-size: 0.9em;
    }
    .SubmitButtonDiv {
        width: 60%;
        text-align: right;
        margin-top: 20px;

        button {
            border: none;
            width: 150px;
            height: 40px;
            background-color: #369;
            color: #fff;
            font-size: 1em;
            font-weight: bolder;
            border-radius: 5px;
            :hover {
                cursor: pointer;
                background-color: #efefef;
                color: #369;
            }
        }
    }

    .InputCheckTBody {
        td {
            padding: 10px !important;
        }
        select {
            margin-left: 20px;
            height: 30px;
            border: none;
            border-bottom: 2px solid #168;
            padding-left: 20px;
            width: 80%;
        }
        input {
            margin-left: 20px;
            height: 30px;
            border: none;
            border-bottom: 2px solid #168;
            padding-left: 20px;
            width: 80%;
            :focus {
                animation-name: FofusOnandlineOn;
                animation-duration: 0.5s;
                outline: none;
                border-bottom: 2px solid #e08d8d;
                @keyframes FofusOnandlineOn {
                    from {
                        width: 10%;
                    }
                    to {
                        width: 80%;
                    }
                }
            }
        }
    }
`;

type AdminDashBoardUpdateUsersTableProps = {
    SelectedUsersData: {
        name: string | null;
        company: string | null;
        team: string | null;
        position: string | null;
        id: string | null;
    };
    setSelectedUsersData: (data: string | null) => void;
};

const AdminDashBoardUpdateUsersTable = ({ SelectedUsersData, setSelectedUsersData }: AdminDashBoardUpdateUsersTableProps) => {
    const [UpdateUsersData, setUpdateUserData] = useState<any>(
        SelectedUsersData
            ? {
                  name: SelectedUsersData.name ? SelectedUsersData.name : '',
                  company: SelectedUsersData.company ? SelectedUsersData.company : 'EXICON',
                  team: SelectedUsersData.team ? SelectedUsersData.team : '',
                  position: SelectedUsersData.position ? SelectedUsersData.position : '',
                  id: SelectedUsersData.id ? SelectedUsersData.id : '',
              }
            : null
    );
    const [getSelectData, setGetSelectData] = useState<any>([]);
    const [selectedUsers, setSelecetedUsers] = useState<any>(null);
    const [LoadingCheck, setLoadingCheck] = useState(false);
    useEffect(() => {
        if (!selectedUsers) return;
        setUpdateUserData({
            name: selectedUsers.datas.name,
            company: selectedUsers.datas.company,
            team: selectedUsers.datas.team,
            position: selectedUsers.datas.position,
            id: selectedUsers.datas.id,
        });
        setSelectedUsersData(selectedUsers.datas);
    }, [selectedUsers]);

    const handleClicksSave = async () => {
        try {
            const UpdateLoginInfoFromServer = await axios.post(
                `${process.env.REACT_APP_DB_HOST}/AdminInsertLogin_app_server/UpdateLoginInfo`,
                {
                    UpdateUsersData,
                    SelectedUsersData,
                }
            );
            if (UpdateLoginInfoFromServer.data.dataSuccess) {
                setSelectedUsersData(null);
                setUpdateUserData(null);
                toast.show({
                    title: `데이터 변경 완료`,
                    content: `${UpdateUsersData.company}의 ${UpdateUsersData.name}님의 데이터를 변경 하였습니다.`,
                    duration: 6000,
                    DataSuccess: true,
                });
                getUsersNames();
            } else {
                toast.show({
                    title: '데이터 변경 실패',
                    content: `IT팀에 문의 바랍니다.`,
                    duration: 6000,
                    DataSuccess: false,
                });
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: '데이터 변경 실패',
                content: `IT팀에 문의 바랍니다. 서버 연결 끊김`,
                duration: 6000,
                DataSuccess: false,
            });
        }
    };
    useEffect(() => {
        getUsersNames();
    }, []);
    const getUsersNames = async () => {
        try {
            setLoadingCheck(false);
            const getUsersNamesFromServer = await axios.get(`${process.env.REACT_APP_DB_HOST}/AdminInsertLogin_app_server/DataGetSome`);
            if (getUsersNamesFromServer.data.dataSuccess) {
                const options = [];
                for (var i = 0; i < getUsersNamesFromServer.data.datas.length; i++) {
                    options.push({
                        value: getUsersNamesFromServer.data.datas[i].name,
                        label: `${getUsersNamesFromServer.data.datas[i].name} || ${getUsersNamesFromServer.data.datas[i].team} || ${getUsersNamesFromServer.data.datas[i].company} || ${getUsersNamesFromServer.data.datas[i].id}`,
                        datas: getUsersNamesFromServer.data.datas[i],
                    });
                }
                setGetSelectData(options);
                setTimeout(() => {
                    setLoadingCheck(true);
                }, 500);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AdminDashBoardUpdateUsersTableMainDivBox>
            {LoadingCheck ? (
                <div>
                    <div style={{ width: '50%' }}>
                        <h4>인원 검색</h4>
                        <Select
                            options={getSelectData}
                            placeholder="검색 또는 선택 해주세요."
                            value={getSelectData.find((op: { value: string }) => {
                                return op.value === selectedUsers;
                            })}
                            // eslint-disable-next-line react/jsx-no-duplicate-props
                            onChange={value => {
                                setSelecetedUsers(value);
                            }}
                        />
                    </div>
                    <div>
                        {SelectedUsersData ? (
                            <table className="type09">
                                <thead>
                                    <tr>
                                        <th scope="cols"></th>
                                        <th scope="cols">변경 전</th>
                                        <th scope="cols">변경 후</th>
                                    </tr>
                                </thead>
                                <tbody className="InputCheckTBody">
                                    <tr>
                                        <th scope="row">이름</th>
                                        <td>{SelectedUsersData.name}</td>
                                        <td>
                                            <input
                                                value={UpdateUsersData.name}
                                                onChange={e => setUpdateUserData({ ...UpdateUsersData, name: e.target.value })}
                                            ></input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">직급</th>
                                        <td>{SelectedUsersData.position}</td>
                                        <td>
                                            <input
                                                value={UpdateUsersData.position}
                                                onChange={e => setUpdateUserData({ ...UpdateUsersData, position: e.target.value })}
                                            ></input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">회사</th>
                                        <td>{SelectedUsersData.company}</td>
                                        <td>
                                            <select
                                                value={UpdateUsersData.company}
                                                onChange={e => setUpdateUserData({ ...UpdateUsersData, company: e.target.value })}
                                            >
                                                <option value="EXICON">EXICON</option>
                                                <option value="YIKC">YIKC</option>
                                            </select>
                                            {/* <input
                                                value={UpdateUsersData.company}
                                                onChange={e => setUpdateUserData({ ...UpdateUsersData, company: e.target.value })}
                                            ></input> */}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">팀명</th>
                                        <td>{SelectedUsersData.team}</td>
                                        <td>
                                            <input
                                                value={UpdateUsersData.team}
                                                onChange={e => setUpdateUserData({ ...UpdateUsersData, team: e.target.value })}
                                            ></input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Email(ID)</th>
                                        <td>{SelectedUsersData.id}</td>
                                        <td>
                                            <input
                                                value={UpdateUsersData.id}
                                                onChange={e => setUpdateUserData({ ...UpdateUsersData, id: e.target.value })}
                                            ></input>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    {SelectedUsersData ? (
                        <div className="SubmitButtonDiv">
                            <button onClick={handleClicksSave}>변경</button>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            ) : (
                <div>
                    <TailSpin color="#3d66ba" height={30} width={30}></TailSpin>
                </div>
            )}
        </AdminDashBoardUpdateUsersTableMainDivBox>
    );
};

export default AdminDashBoardUpdateUsersTable;

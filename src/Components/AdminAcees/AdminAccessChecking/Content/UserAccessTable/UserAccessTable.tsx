import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Axios_Get_Moduls, request } from '../../../../API/indexs';
import Toggle from './Toggle/Toggle';
import Select from 'react-select';

const UserAccessTableMainDivBox = styled.div`
    font-size: 0.8em;
    table.type09 {
        border: none !important;
        width: 100%;
        font-size: 0.8em;
        border-collapse: collapse;
        text-align: left;
        line-height: 1.5;
        tr {
            :hover {
                cursor: pointer;
                background-color: #f3f6f7;
            }
        }
    }
    thead {
        font-size: 1.1em;
    }
    table.type09 thead th {
        padding: 5px;
        font-weight: bold;
        vertical-align: center;
        color: #369;
        border: none;
        background-color: #fff;
        border-bottom: 3px solid #036;
        font-size: 1em;
    }
    table.type09 tbody th {
        width: 150px;
        padding: 10px;
        font-weight: bold;
        vertical-align: center;
        border: none;
        border-bottom: 1px solid #ccc;
        background: #f3f6f7;
        font-size: 0.8em;
    }
    table.type09 td {
        width: 300px;
        padding: 10px;
        vertical-align: center;
        border-bottom: 1px solid #ccc;
        font-size: 0.9em;
    }
`;

export type UserAccess_Table_State_Types = {
    AfterOTLeaderAccess: number;
    BeforeOTLeaderAccess: number;
    BusinessAccess: number;
    BusinessAdminAccess: number;
    CSM_Master_Access: number;
    FoodLeaderAccess: number;
    Nav_TeamLeaderBusinessAccess: number;
    Nav_TeamLeaderBusinessExcelAccess: number;
    Nav_TeamLeaderCalendarAccess: number;
    Nav_TeamLeaderFoodAccess: number;
    Nav_TeamLeaderMonthOTAccess: number;
    Nav_TeamLeaderOTAccess: number;
    Nav_TeamLeaderTeleAccess: number;
    PersonAdminAccess: number;
    TeleLeaderAccess: number;
    USBApplyLeaderAccess: number;
    company: string;
    id: string;
    indexs: number;
    name: string;
    team: string;
};
export type User_Option_Array_Types = {
    value: string;
    label: string;
};

const UserAccessTable = () => {
    const [User_Access_Table_State, setUser_Access_Table_State] = useState<UserAccess_Table_State_Types[]>([]);
    const [User_Option_Array, setUser_Option_Array] = useState<User_Option_Array_Types[]>([]);
    const [Select_Id, setSelect_Id] = useState<User_Option_Array_Types | null>(null);

    const Getting_User_Options_Array = async () => {
        try {
            const Getting_User_Options_Array_Axios = await Axios_Get_Moduls('/users/Getting_User_Options_Array', {});
            if (Getting_User_Options_Array_Axios) {
                setUser_Option_Array(Getting_User_Options_Array_Axios);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const Getting_UserAccessTable_Data_Axios_Func = async () => {
        try {
            const a = Select_Id ? Select_Id.value : null;
            const Getting_UserAccessTable_Data_Axios_Func_Axios = await Axios_Get_Moduls('/users/Getting_UserAccessTable_Data_Axios_Func', {
                Select_Id: a,
            });

            if (Getting_UserAccessTable_Data_Axios_Func_Axios) {
                setUser_Access_Table_State(Getting_UserAccessTable_Data_Axios_Func_Axios);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        Getting_User_Options_Array();
    }, []);

    useEffect(() => {
        Getting_UserAccessTable_Data_Axios_Func();
    }, [Select_Id]);

    return (
        <UserAccessTableMainDivBox>
            <div>
                <Select value={Select_Id} options={User_Option_Array} onChange={e => setSelect_Id(e)} isClearable={true}></Select>
            </div>
            <table className="type09">
                <thead>
                    <tr>
                        <th scope="cols">NO.</th>
                        <th scope="cols">Email(ID)</th>
                        <th scope="cols">이름</th>
                        <th scope="cols">팀명</th>
                        <th scope="cols">출장/현장수당 신청 권한</th>

                        <th scope="cols">재택근무 관리자 권한</th>
                        <th scope="cols">사전OT 관리자 권한</th>
                        <th scope="cols">사후OT 관리자 권한</th>
                        <th scope="cols">식대정산 관리자 권한</th>

                        <th scope="cols">출장/현장수당 관리자 권한</th>
                        <th scope="cols">사용자 관리 관리자 권한</th>
                    </tr>
                </thead>
                <tbody>
                    {User_Access_Table_State.map((list, j) => {
                        return (
                            <tr>
                                <td>{j + 1}</td>
                                <td>{list.id}</td>
                                <td>{list.name}</td>
                                <td>{list.team}</td>
                                <td>
                                    <Toggle
                                        isOn={list.BusinessAccess === 1 ? true : false}
                                        Select_Data={list}
                                        Select_Menu={'BusinessAccess'}
                                        Getting_UserAccessTable_Data_Axios_Func={() => Getting_UserAccessTable_Data_Axios_Func()}
                                    ></Toggle>
                                </td>
                                <td>
                                    <Toggle
                                        isOn={list.TeleLeaderAccess === 1 ? true : false}
                                        Select_Data={list}
                                        Select_Menu={'TeleLeaderAccess'}
                                        Getting_UserAccessTable_Data_Axios_Func={() => Getting_UserAccessTable_Data_Axios_Func()}
                                    ></Toggle>
                                </td>
                                <td>
                                    <Toggle
                                        isOn={list.BeforeOTLeaderAccess === 1 ? true : false}
                                        Select_Data={list}
                                        Select_Menu={'BeforeOTLeaderAccess'}
                                        Getting_UserAccessTable_Data_Axios_Func={() => Getting_UserAccessTable_Data_Axios_Func()}
                                    ></Toggle>
                                </td>
                                <td>
                                    <Toggle
                                        isOn={list.AfterOTLeaderAccess === 1 ? true : false}
                                        Select_Data={list}
                                        Select_Menu={'AfterOTLeaderAccess'}
                                        Getting_UserAccessTable_Data_Axios_Func={() => Getting_UserAccessTable_Data_Axios_Func()}
                                    ></Toggle>
                                </td>
                                <td>
                                    <Toggle
                                        isOn={list.FoodLeaderAccess === 1 ? true : false}
                                        Select_Data={list}
                                        Select_Menu={'FoodLeaderAccess'}
                                        Getting_UserAccessTable_Data_Axios_Func={() => Getting_UserAccessTable_Data_Axios_Func()}
                                    ></Toggle>
                                </td>

                                <td>
                                    <Toggle
                                        isOn={list.BusinessAdminAccess === 1 ? true : false}
                                        Select_Data={list}
                                        Select_Menu={'BusinessAdminAccess'}
                                        Getting_UserAccessTable_Data_Axios_Func={() => Getting_UserAccessTable_Data_Axios_Func()}
                                    ></Toggle>
                                </td>
                                <td>
                                    <Toggle
                                        isOn={list.PersonAdminAccess === 1 ? true : false}
                                        Select_Data={list}
                                        Select_Menu={'PersonAdminAccess'}
                                        Getting_UserAccessTable_Data_Axios_Func={() => Getting_UserAccessTable_Data_Axios_Func()}
                                    ></Toggle>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </UserAccessTableMainDivBox>
    );
};

export default UserAccessTable;

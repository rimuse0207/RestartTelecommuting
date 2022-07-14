import React, { useState } from 'react';
import styled from 'styled-components';
import { Nav_AccessTokenTypes } from '../../../models/Nav_Access_Redux/Nav_Access_Redux';

import { OneParamsPost } from '../../API/POSTApi/PostApi';
import AdminContentMainPage from './AdminContent/AdminContentMainPage';

const AccessInfoMainPageMainDivBox = styled.div`
    border: 1px solid black;
    .Access_Float_Cotainer {
        width: 100%;
        min-height: 99vh;
        padding-bottom: 50px;
        ::after {
            clear: both;
            display: block;
            content: '';
        }
        .Access_Float_Left {
            float: left;
            border: 1px solid black;
            width: 300px;
            min-height: 600px;
            .AccessMenu {
                margin-top: 20px;
                h4 {
                    margin-left: 10px;
                    font-size: 1.1em;
                }
                ul {
                    margin-left: 20px;
                    li {
                        margin-top: 10px;
                        margin-bottom: 10px;
                        :hover {
                            cursor: pointer;
                            color: blue;
                        }
                    }
                }
            }
        }
        .Access_Float_Right {
            float: right;
            border: 1px solid black;
            width: calc(100vw - 350px);
            min-height: 600px;
        }
    }
`;
export type userDataTypes = {
    id: string;
    indexs: number;
    name: string;
    team: string;
    position: string;
    Nav_TeamLeaderCalendarAccess: number;
    Nav_TeamLeaderTeleAccess: number;
    Nav_TeamLeaderOTAccess: number;
    Nav_TeamLeaderBusinessAccess: number;
    Nav_TeamLeaderBusinessExcelAccess: number;
    Nav_TeamLeaderMonthOTAccess: number;
    Nav_TeamLeaderFoodAccess: number;

    TeleLeaderAccess: number;
    BeforeOTLeaderAccess: number;
    AfterOTLeaderAccess: number;
    FoodLeaderAccess: number;
    USBApplyLeaderAccess: number;
    BusinessAccess: number;
    BusinessAdminAccess: number;
};
const AccessInfoMainPage = () => {
    const [NavAccess_list, setNavAccess_list] = useState([
        { name: '팀원 종합 업무 현황', value: 'Nav_TeamLeaderCalendarAccess', selected: false },
        { name: '월별 재택 조회', value: 'Nav_TeamLeaderTeleAccess', selected: false },
        { name: '팀원 OT 승인', value: 'Nav_TeamLeaderOTAccess', selected: false },
        { name: '현장 수당 정산', value: 'Nav_TeamLeaderBusinessAccess', selected: false },
        { name: 'ERP 파일 업로드', value: 'Nav_TeamLeaderBusinessExcelAccess', selected: false },
        { name: '근무 실시 보고서', value: 'Nav_TeamLeaderMonthOTAccess', selected: false },
        { name: '식대 정산 월별 조회', value: 'Nav_TeamLeaderFoodAccess', selected: false },
    ]);

    const [DataAccess_list, setDataAccess_list] = useState([
        { name: '재택근무 데이터', value: 'TeleLeaderAccess', selected: false },
        { name: '사전 OT 데이터', value: 'BeforeOTLeaderAccess', selected: false },
        { name: '사후 OT 데이터', value: 'AfterOTLeaderAccess', selected: false },
        { name: '식대정산 데이터', value: 'FoodLeaderAccess', selected: false },
        { name: 'USB신청 데이터', value: 'USBApplyLeaderAccess', selected: false },
        { name: '현장수당신청 데이터', value: 'BusinessAccess', selected: false },
        { name: '현장수당 조회 데이터', value: 'BusinessAdminAccess', selected: false },
    ]);

    const [NavSelected, setNavSelected] = useState('');
    const [userData, setUserData] = useState<userDataTypes[]>([]);

    const handleClicks = async (ClickData: string, type: string) => {
        try {
            setNavSelected(ClickData);
            const paramsData = {
                ClickData,
                type,
            };
            const GetuserDataFromServer = await OneParamsPost(`/AdminInsertLogin_app_server/getting_person`, paramsData);
            if (GetuserDataFromServer.data.dataSuccess) {
                console.log(GetuserDataFromServer);
                setUserData(GetuserDataFromServer.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AccessInfoMainPageMainDivBox>
            <div>
                <div className="Access_Float_Cotainer">
                    <div className="Access_Float_Left">
                        <div className="AccessMenu">
                            <h4>메뉴접근 권한</h4>
                            <ul>
                                {NavAccess_list.map((list, i) => {
                                    return (
                                        <li
                                            style={list.value === NavSelected ? { color: 'blue', fontWeight: 'bolder' } : {}}
                                            onClick={() => handleClicks(list.value, 'Menu')}
                                        >
                                            {list.name}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="AccessMenu">
                            <h4>데이터접근 권한</h4>
                            <ul>
                                {DataAccess_list.map((list, i) => {
                                    return (
                                        <li style={list.value === NavSelected ? { color: 'blue', fontWeight: 'bolder' } : {}}>
                                            {list.name}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="Access_Float_Right">
                        <AdminContentMainPage userData={userData}></AdminContentMainPage>
                    </div>
                </div>
            </div>
        </AccessInfoMainPageMainDivBox>
    );
};

export default AccessInfoMainPage;

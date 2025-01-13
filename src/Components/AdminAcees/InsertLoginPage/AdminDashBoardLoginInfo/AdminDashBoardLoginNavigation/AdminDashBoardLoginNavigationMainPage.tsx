import React from 'react';
import styled from 'styled-components';
const AdminProFileNavigationMainPageMainDivBox = styled.div`
    width: 100%;
    border-bottom: 2px solid lightgray;
    margin-top: 20px;
    margin-bottom: 20px;
    ul {
        display: flex;
        li {
            :hover {
                cursor: pointer;
            }
            .LineText {
                font-size: 1em;
                color: #999;
                background-color: transparent;
                height: 40px;
                line-height: 38px;
                padding: 0 40px;
            }
            position: relative;
            .LineActions {
                position: absolute;
                animation-name: slidings;
                animation-duration: 0.8s;
                @keyframes slidings {
                    from {
                        width: 0%;
                    }
                    to {
                        width: 100%;
                    }
                }
                border-bottom: 2px solid #2985db;
                width: 100%;
            }
        }
    }
`;

type AdminDashBoardLoginNavigationMainPageProps = {
    NaviSelected: string;
    setStaticsNaviButton: (data: string) => void;
};

const AdminDashBoardLoginNavigationMainPage = ({ NaviSelected, setStaticsNaviButton }: AdminDashBoardLoginNavigationMainPageProps) => {
    return (
        <AdminProFileNavigationMainPageMainDivBox>
            <div>
                <ul>
                    <li onClick={() => setStaticsNaviButton('ShowUsers')}>
                        {NaviSelected === 'ShowUsers' ? (
                            <>
                                <div className="LineText" style={{ color: '#2985db', fontWeight: 'bold' }}>
                                    등록된 임직원
                                </div>
                                <div className="LineActions"></div>
                            </>
                        ) : (
                            <div className="LineText">등록된 임직원</div>
                        )}
                    </li>
                    <li onClick={() => setStaticsNaviButton('UpdateUsers')}>
                        {NaviSelected === 'UpdateUsers' ? (
                            <>
                                <div className="LineText" style={{ color: '#2985db', fontWeight: 'bold' }}>
                                    임직원 정보 변경
                                </div>
                                <div className="LineActions"></div>
                            </>
                        ) : (
                            <div className="LineText">임직원 정보 변경</div>
                        )}
                    </li>
                    <li onClick={() => setStaticsNaviButton('InsertUsers')}>
                        {NaviSelected === 'InsertUsers' ? (
                            <>
                                <div className="LineText" style={{ color: '#2985db', fontWeight: 'bold' }}>
                                    임직원 추가
                                </div>
                                <div className="LineActions"></div>
                            </>
                        ) : (
                            <div className="LineText">임직원 추가</div>
                        )}
                    </li>
                    <li onClick={() => setStaticsNaviButton('AccessUsersChecking')}>
                        {NaviSelected === 'AccessUsersChecking' ? (
                            <>
                                <div className="LineText" style={{ color: '#2985db', fontWeight: 'bold' }}>
                                    임직원 권한 추가
                                </div>
                                <div className="LineActions"></div>
                            </>
                        ) : (
                            <div className="LineText">임직원 권한 추가</div>
                        )}
                    </li>
                    <li onClick={() => setStaticsNaviButton('DepartmentAccessUsersChecking')}>
                        {NaviSelected === 'DepartmentAccessUsersChecking' ? (
                            <>
                                <div className="LineText" style={{ color: '#2985db', fontWeight: 'bold' }}>
                                    관리자 부서조회 추가
                                </div>
                                <div className="LineActions"></div>
                            </>
                        ) : (
                            <div className="LineText"> 관리자 부서조회 추가</div>
                        )}
                    </li>
                </ul>
            </div>
        </AdminProFileNavigationMainPageMainDivBox>
    );
};

export default AdminDashBoardLoginNavigationMainPage;

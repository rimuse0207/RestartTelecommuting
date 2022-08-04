import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../../../models';
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

type AdminDashBoardTeleCommutingNavigationProps = {
    NaviSelected: string;
    setStaticsNaviButton: (data: string) => void;
};

const AdminDashBoardTeleCommutingNavigation = ({ NaviSelected, setStaticsNaviButton }: AdminDashBoardTeleCommutingNavigationProps) => {
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    return (
        <AdminProFileNavigationMainPageMainDivBox>
            <div>
                <ul>
                    {InfomationState.company === 'YIKC' ? (
                        <li onClick={() => setStaticsNaviButton('YIKC')}>
                            {NaviSelected === 'YIKC' ? (
                                <>
                                    <div className="LineText" style={{ color: '#2985db', fontWeight: 'bold' }}>
                                        YIKC
                                    </div>
                                    <div className="LineActions"></div>
                                </>
                            ) : (
                                <div className="LineText">YIKC</div>
                            )}
                        </li>
                    ) : (
                        <></>
                    )}
                    {InfomationState.company === 'EXICON' ? (
                        <li onClick={() => setStaticsNaviButton('EXICON')}>
                            {NaviSelected === 'EXICON' ? (
                                <>
                                    <div className="LineText" style={{ color: '#2985db', fontWeight: 'bold' }}>
                                        EXICON
                                    </div>
                                    <div className="LineActions"></div>
                                </>
                            ) : (
                                <div className="LineText">EXICON</div>
                            )}
                        </li>
                    ) : (
                        <></>
                    )}
                </ul>
            </div>
        </AdminProFileNavigationMainPageMainDivBox>
    );
};

export default AdminDashBoardTeleCommutingNavigation;

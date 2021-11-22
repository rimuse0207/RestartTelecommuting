import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPersionalLOGOUT } from '../../models/PersonalInfo';
import { RootState } from '../../models/index';
import { DecryptKey } from '../../config';
import { useHistory } from 'react-router';
type Navigation = {
    menuStatus: string;
};
const Navigation = ({ menuStatus }: Navigation) => {
    const history = useHistory();
    const socket = useSelector((state: RootState) => state.Socket.socket);
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const [TeleMenuClicks, setTeleMenuClicks] = useState(true);
    const [OTMenuClicks, setOTMenuClicks] = useState(true);
    const [FoodMenuClicks, setFoodMenuClicks] = useState(true);
    const [ETCMenuClicks, setETCMenuClicks] = useState(true);
    const handleLogout = () => {
        socket.emit('LogOut', {
            message: 'user 나감',
            socketsId: socket.id,
        });

        sessionStorage.clear();
        dispatch(getPersionalLOGOUT());
        history.push('/');
    };
    const dispatch = useDispatch();
    return (
        <div className={menuStatus} id="menu">
            <div>
                <h5 onClick={() => setTeleMenuClicks(!TeleMenuClicks)}>
                    근무메뉴
                    <img src={'/pngegg.png'} className={`nav_handleClicks_arrow ${TeleMenuClicks ? 'nav_hadleClicks_flases' : ''}`}></img>
                </h5>
                {TeleMenuClicks ? (
                    <ul className="MenuDisblock">
                        <Link to="/">
                            <li>신청 현황</li>
                        </Link>
                        {InfomationState.position === '이사' ||
                        InfomationState.position === '팀장' ||
                        DecryptKey(InfomationState.id) === 'jhlee1@dhk.co.kr' ||
                        DecryptKey(InfomationState.id) === 'jmlee@dhk.co.kr' ||
                        DecryptKey(InfomationState.id) === 'htchoi@dhk.co.kr' ||
                        DecryptKey(InfomationState.id) === 'sjkim@dhk.co.kr' ||
                        DecryptKey(InfomationState.id) === 'sjyoo@dhk.co.kr' ? (
                            <Link to="/TeamLeaderTelecommutingMainpage">
                                <li>팀원 신청 현황</li>
                            </Link>
                        ) : (
                            <></>
                        )}

                        <Link to="/Telecommuting_workspace">
                            <li>재택근무 신청</li>
                        </Link>
                        {InfomationState.position === '이사' ||
                        InfomationState.position === '팀장' ||
                        DecryptKey(InfomationState.id) === 'jhlee1@dhk.co.kr' ||
                        DecryptKey(InfomationState.id) === 'sjkim@dhk.co.kr' ||
                        DecryptKey(InfomationState.id) === 'sjyoo@dhk.co.kr' ? (
                            <Link to="/MonthTelecommuting">
                                <li>월별 재택 조회</li>
                            </Link>
                        ) : (
                            <></>
                        )}

                        <Link to="/USbWrite">
                            <li>USB/CD 사전 신청</li>
                        </Link>
                    </ul>
                ) : (
                    ''
                )}
            </div>
            <div>
                <h5 onClick={() => setOTMenuClicks(!OTMenuClicks)}>
                    OT메뉴
                    <img src={'/pngegg.png'} className={`nav_handleClicks_arrow ${OTMenuClicks ? 'nav_hadleClicks_flases' : ''}`}></img>
                </h5>
                {OTMenuClicks ? (
                    <ul className="MenuDisblock">
                        <Link to="/AfterOtworkspace">
                            <li>OT 신청</li>
                        </Link>
                        {InfomationState.position === '이사' ||
                        InfomationState.position === '팀장' ||
                        DecryptKey(InfomationState.id) === 'jhlee1@dhk.co.kr' ||
                        DecryptKey(InfomationState.id) === 'jmlee@dhk.co.kr' ||
                        DecryptKey(InfomationState.id) === 'htchoi@dhk.co.kr' ||
                        DecryptKey(InfomationState.id) === 'sjkim@dhk.co.kr' ||
                        DecryptKey(InfomationState.id) === 'sjyoo@dhk.co.kr' ? (
                            <>
                                <Link to="/TeamLeaderPageMainPage">
                                    <li>팀원 OT 조회</li>
                                </Link>
                                <Link to="/TeamSelectOTWorkSpace">
                                    <li>월별 OT 조회</li>
                                </Link>
                            </>
                        ) : (
                            <></>
                        )}
                    </ul>
                ) : (
                    ''
                )}
            </div>
            <div>
                <h5 onClick={() => setFoodMenuClicks(!FoodMenuClicks)}>
                    식대메뉴{' '}
                    <img src={'/pngegg.png'} className={`nav_handleClicks_arrow ${FoodMenuClicks ? 'nav_hadleClicks_flases' : ''}`}></img>
                </h5>
                {FoodMenuClicks ? (
                    <ul className="MenuDisblock">
                        <Link to="/meal_settlement">
                            <li>식대 정산 신청</li>
                        </Link>
                        {DecryptKey(InfomationState.id) === 'jmlee@dhk.co.kr' ||
                        DecryptKey(InfomationState.id) === 'htchoi@dhk.co.kr' ||
                        DecryptKey(InfomationState.id) === 'sjkim@dhk.co.kr' ||
                        DecryptKey(InfomationState.id) === 'sjyoo@dhk.co.kr' ? (
                            <Link to="/Admin_meal_Select">
                                <li>식대 정산 월별 조회</li>
                            </Link>
                        ) : (
                            <></>
                        )}
                    </ul>
                ) : (
                    ''
                )}
            </div>
            <div>
                <h5 onClick={() => setETCMenuClicks(!ETCMenuClicks)}>
                    기타메뉴
                    <img src={'/pngegg.png'} className={`nav_handleClicks_arrow ${ETCMenuClicks ? 'nav_hadleClicks_flases' : ''}`}></img>
                </h5>
                <ul>
                    <Link to="/ConnectedNow">
                        <li>상대방 호출</li>
                    </Link>
                    <Link to="#" onClick={() => window.open('http://125.132.12.163:3000')}>
                        <li>시설이용</li>
                    </Link>
                    <Link to="/CECalendar">
                        <li>CSM</li>
                    </Link>
                    <Link to="/">
                        <li onClick={handleLogout} style={{ fontWeight: 'bolder', color: '#052272' }}>
                            - 로그아웃
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default Navigation;

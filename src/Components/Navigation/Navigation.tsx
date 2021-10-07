import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPersionalLOGOUT } from '../../models/PersonalInfo';
type Navigation = {
    menuStatus: string;
};
const Navigation = ({ menuStatus }: Navigation) => {
    const [TeleMenuClicks, setTeleMenuClicks] = useState(true);
    const [OTMenuClicks, setOTMenuClicks] = useState(true);
    const [FoodMenuClicks, setFoodMenuClicks] = useState(true);
    const handleLogout = () => {
        sessionStorage.clear();
        dispatch(getPersionalLOGOUT());
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
                        <Link to="/Telecommuting_workspace">
                            <li>재택근무 신청</li>
                        </Link>
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
                        <Link to="/TeamLeaderPageMainPage">
                            <li>팀원 OT 조회</li>
                        </Link>
                        <Link to="/TeamSelectOTWorkSpace">
                            <li>월별 OT 조회</li>
                        </Link>
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
                        <Link to="/Admin_meal_Select">
                            <li>식대 정산 월별 조회</li>
                        </Link>
                    </ul>
                ) : (
                    ''
                )}
            </div>
            <div onClick={handleLogout}>로그아웃</div>
        </div>
    );
};

export default Navigation;

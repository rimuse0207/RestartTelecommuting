import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { getPersionalLOGOUT } from '../../models/PersonalInfo';
type Navigation = {
    menuStatus: string;

};
const Navigation = ({ menuStatus }: Navigation) => {
    const [menuClicks, setMenuClicks] = useState(false);
    const handleLogout = () => {
        sessionStorage.clear();
        dispatch(getPersionalLOGOUT());


    }
    const dispatch = useDispatch();
    return (
        <div className={menuStatus} id="menu">
            <div>
                <h5 onClick={() => setMenuClicks(!menuClicks)}>재택근무</h5>
                {menuClicks ? (
                    <ul className="MenuDisblock">
                        <Link to="/">
                            <li>HOME</li>
                        </Link>
                        <Link to="/meal_settlement">
                            <li>식대 정산 신청</li>
                        </Link>
                        <li onClick={handleLogout}>로그아웃</li>
                    </ul>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default Navigation;

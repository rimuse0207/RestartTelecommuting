import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';

type Navigation = {
    menuStatus: string;
};
const Navigation = ({ menuStatus }: Navigation) => {
    const [menuClicks, setMenuClicks] = useState(false);
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
                    </ul>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default Navigation;

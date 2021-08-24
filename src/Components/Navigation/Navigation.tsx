import React, { useState } from "react";
import { Link } from "react-router-dom";

type Navigation = {
    menuStatus: string
}
const Navigation = ({ menuStatus }: Navigation) => {
    const [menuClicks, setMenuClicks] = useState(false);
    return (
        <div className={menuStatus} id='menu'>
            <div>
                <h5 onClick={() => setMenuClicks(!menuClicks)}>재택근무</h5>
                {menuClicks ? <ul className="MenuDisblock">
                    <Link to="#"><li>재택 근무 시작</li></Link>
                    <Link to="#"><li>재택 근무 조회</li></Link>
                </ul> : ""}

            </div>
        </div>
    )
}

export default Navigation
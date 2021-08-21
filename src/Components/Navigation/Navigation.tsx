import React from "react";
import { Link } from "react-router-dom";

type Navigation = {
    menuStatus: string
}
const Navigation = ({ menuStatus }: Navigation) => {
    return (
        <div className={menuStatus} id='menu'>
            <ul>
                <li>메뉴바 들어갑니.</li>
            </ul>
        </div>
    )
}

export default Navigation
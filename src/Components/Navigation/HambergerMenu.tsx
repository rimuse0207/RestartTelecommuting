import React, { useState } from "react";
import "./Navigation.css";
import Navigation from "./Navigation"
type HambergerMenu = {
    titles: string
}

const HambergerMenu = ({ titles }: HambergerMenu) => {

    const [hambergerOpen, setHambergerOpen] = useState(false);
    const [menuStatus, setMenuStatus] = useState("");
    const _menuToggle = (e: any) => {
        e.stopPropagation();
        hambergerOpen ? setMenuStatus("") : setMenuStatus("isopen");
        setHambergerOpen(!hambergerOpen);

    }

    return (

        <div>
            <div className="menubar">
                <div className="MainTitles"><h1>{titles}</h1></div>
                <div className="hambclicker" onClick={(e: any) => _menuToggle(e)}></div>
                <div id="hambmenu" className={menuStatus}><span></span><span></span><span></span><span></span></div>
                <div className="title">
                    <span>{titles}</span>
                </div>
            </div>
            <Navigation menuStatus={menuStatus} />
        </div>
    )

}

export default HambergerMenu;
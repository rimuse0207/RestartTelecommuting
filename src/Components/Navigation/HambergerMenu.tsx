import React, { useState } from 'react';
import './Navigation.css';
import Navigation from './Navigation';
type HambergerMenu = {
    titles: string;
    subtitles: string;
};

const HambergerMenu = ({ titles, subtitles }: HambergerMenu) => {
    const [hambergerOpen, setHambergerOpen] = useState(false);
    const [menuStatus, setMenuStatus] = useState('');
    const _menuToggle = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        hambergerOpen ? setMenuStatus('') : setMenuStatus('isopen');
        setHambergerOpen(!hambergerOpen);
    };

    return (
        <div>
            <div className="menubar">
                <div className="MainTitles">
                    <h1>{titles}</h1>
                </div>
                <div className="hambclicker" onClick={(e: React.MouseEvent<HTMLElement>) => _menuToggle(e)}></div>
                <div id="hambmenu" className={menuStatus}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="title">
                    <span style={{ fontSize: "20px", fontWeight: "bolder" }}>{subtitles}</span>
                </div>
            </div>
            <Navigation menuStatus={menuStatus} />
        </div>
    );
};

export default HambergerMenu;

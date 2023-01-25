import React, { useState, useEffect } from 'react';

import HambergerMenu from '../Navigation/HambergerMenu';

import CeCalendarSubMenu from './CeCalendarSubMenu';

const CeCalendarMainPage = () => {
    return (
        <div>
            <HambergerMenu titles="CSM" subtitles="CSM관리"></HambergerMenu>
            <CeCalendarSubMenu></CeCalendarSubMenu>
        </div>
    );
};

export default CeCalendarMainPage;

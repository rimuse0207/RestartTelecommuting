import React, { useState } from 'react';
import HambergerMenu from '../Navigation/HambergerMenu';
import MonthTeleCommutingMainPage from './MonthTeleCommutingMainPage';
import './MonthTeleCommuting.css';

const MonthTeleCommuting = () => {
    return (
        <div>
            <HambergerMenu titles="월별 재택 조회" subtitles="월별 재택 조회 및 엑셀 다운로드"></HambergerMenu>
            <MonthTeleCommutingMainPage></MonthTeleCommutingMainPage>
        </div>
    );
};

export default MonthTeleCommuting;

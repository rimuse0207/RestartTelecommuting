import React, { useState } from 'react';
import HambergerMenu from '../Navigation/HambergerMenu';
import SliderPage from '../SliderPage';
import SignInForm from '../Login/SignInForm';
import { useSelector } from 'react-redux';
import { RootState } from '../../models';
import MonthTeleCommutingMainPage from './MonthTeleCommutingMainPage';
import './MonthTeleCommuting.css';
const MonthTeleCommuting = () => {
    const socket = useSelector((state: RootState) => state.Socket.socket);
    const loginChecked = useSelector((state: RootState) => state.PersonalInfo.loginCheck);

    const [loginCheck, setLoginCheck] = useState(false);
    return (
        <div>
            {' '}
            {loginChecked ? (
                <div style={{ height: '100%' }}>
                    <HambergerMenu titles="월별 재택 조회" subtitles="월별 재택 조회 및 엑셀 다운로드"></HambergerMenu>
                    <div style={{ position: 'relative' }}>
                        <MonthTeleCommutingMainPage></MonthTeleCommutingMainPage>
                    </div>
                    <SliderPage width={window.innerWidth} socket={socket}></SliderPage>
                </div>
            ) : (
                <SignInForm setLoginCheck={(data: boolean) => setLoginCheck(data)}></SignInForm>
            )}
        </div>
    );
};

export default MonthTeleCommuting;

import React, { useState } from 'react';
import UsbApply from './UsbApply';
import { useSelector } from 'react-redux';
import SliderPage from '../SliderPage';
import { RootState } from '../../models';
import SignInForm from '../Login/SignInForm';
import HambergerMenu from '../Navigation/HambergerMenu';
const USBApplyMainPage = () => {
    const socket = useSelector((state: RootState) => state.Socket.socket);
    const loginChecked = useSelector((state: RootState) => state.PersonalInfo.loginCheck);

    const [loginCheck, setLoginCheck] = useState(false);
    return (
        <div>
            {loginChecked ? (
                <div>
                    <HambergerMenu titles="USB/CD 사전 신청" subtitles=""></HambergerMenu>
                    <div style={{ position: 'relative' }}>
                        <UsbApply ></UsbApply>
                    </div>
                    <SliderPage width={window.innerWidth} socket={socket}></SliderPage>
                </div>
            ) : (
                <SignInForm setLoginCheck={(data: boolean) => setLoginCheck(data)}></SignInForm>
            )}
        </div>
    );
};

export default USBApplyMainPage;

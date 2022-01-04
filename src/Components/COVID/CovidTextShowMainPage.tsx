import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import HambergerMenu from '../Navigation/HambergerMenu';
import { RootState } from '../../models';
import SignInForm from '../Login/SignInForm';
import SliderPage from '../SliderPage';
import CovidTextShowWrite from './CovidTextShowWrite';
const CovidTextShowMainPage = () => {
    const socket = useSelector((state: RootState) => state.Socket.socket);
    const loginChecked = useSelector((state: RootState) => state.PersonalInfo.loginCheck);

    const [loginCheck, setLoginCheck] = useState(false);
    return (
        <div>
            {loginChecked ? (
                <div>
                    <HambergerMenu titles="USB/CD 사전 신청" subtitles="USB/CD 사전 신청 및 이메일 발송"></HambergerMenu>
                    <div style={{ position: 'relative' }}>
                        <CovidTextShowWrite></CovidTextShowWrite>
                    </div>
                    <SliderPage width={window.innerWidth} socket={socket}></SliderPage>
                </div>
            ) : (
                <SignInForm setLoginCheck={(data: boolean) => setLoginCheck(data)}></SignInForm>
            )}
        </div>
    );
};

export default CovidTextShowMainPage;

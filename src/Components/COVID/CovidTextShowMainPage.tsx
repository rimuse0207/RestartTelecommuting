import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import HambergerMenu from '../Navigation/HambergerMenu';
import { RootState } from '../../models';
import SignInForm from '../Login/SignInForm';
import SliderPage from '../SliderPage';
import CovidTextShowWrite from './CovidTextShowWrite';
import CovidResertMainPage from './CovidResertMainPage';
const CovidTextShowMainPage = () => {
    const socket = useSelector((state: RootState) => state.Socket.socket);
    const loginChecked = useSelector((state: RootState) => state.PersonalInfo.loginCheck);

    const [loginCheck, setLoginCheck] = useState(false);
    return (
        <div>
            {loginChecked ? (
                <div>
                    <HambergerMenu titles="백신 접종" subtitles="임직원 백신 접종 데이터 입력"></HambergerMenu>
                    <div style={{ position: 'relative' }}>
                        <CovidResertMainPage></CovidResertMainPage>
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

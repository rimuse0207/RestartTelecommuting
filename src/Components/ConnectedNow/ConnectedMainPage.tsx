import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../models';
import HambergerMenu from '../Navigation/HambergerMenu';
import SliderPage from '../SliderPage';
import SignInForm from '../Login/SignInForm';
import ConnectedPeopleShow from './ConnectedPeopleShow';

const ConnectedMainPage = () => {
    const socket = useSelector((state: RootState) => state.Socket.socket);
    const loginChecked = useSelector((state: RootState) => state.PersonalInfo.loginCheck);

    const [loginCheck, setLoginCheck] = useState(false);
    return (
        <div>
            {loginChecked ? (
                <div style={{ height: '100%' }}>
                    <HambergerMenu titles="상대방 호출" subtitles="실시간 접속자 및 상대방 호출"></HambergerMenu>
                    <div style={{ position: 'relative' }}>
                        <ConnectedPeopleShow socket={socket}></ConnectedPeopleShow>
                    </div>
                    <SliderPage width={window.innerWidth} socket={socket}></SliderPage>
                </div>
            ) : (
                <SignInForm setLoginCheck={(data: boolean) => setLoginCheck(data)}></SignInForm>
            )}
        </div>
    );
};

export default ConnectedMainPage;

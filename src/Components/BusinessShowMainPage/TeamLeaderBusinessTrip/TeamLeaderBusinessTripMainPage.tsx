import React, { useState } from 'react';
import HambergerMenu from '../../Navigation/HambergerMenu';
import SliderPage from '../../SliderPage';
import SignInForm from '../../Login/SignInForm';
import { useSelector } from 'react-redux';
import { RootState } from '../../../models';

import TeamLeaderPersonClickContent from './TeamLeaderPersonClickContent';

const BusinessTripShowMainPage = () => {
    const socket = useSelector((state: RootState) => state.Socket.socket);
    const loginChecked = useSelector((state: RootState) => state.PersonalInfo.loginCheck);

    const [loginCheck, setLoginCheck] = useState(false);
    return (
        <div className="App">
            {loginChecked ? (
                <div style={{ height: '100%' }}>
                    <HambergerMenu titles="현장 수당 정산" subtitles="현장 수당 정산"></HambergerMenu>
                    <div style={{ position: 'relative', marginLeft: '10px' }}>
                        <TeamLeaderPersonClickContent></TeamLeaderPersonClickContent>
                    </div>
                    <SliderPage width={window.innerWidth} socket={socket}></SliderPage>
                </div>
            ) : (
                <SignInForm setLoginCheck={(data: boolean) => setLoginCheck(data)}></SignInForm>
            )}
        </div>
    );
};

export default BusinessTripShowMainPage;

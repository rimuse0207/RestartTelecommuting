import React, { useState } from 'react';
import BusinessTripShowContent from './BusinessTripShowContent';
import HambergerMenu from '../Navigation/HambergerMenu';
import SliderPage from '../SliderPage';
import SignInForm from '../Login/SignInForm';
import { useSelector } from 'react-redux';
import { RootState } from '../../models';

const BusinessTripShowMainPage = () => {
    const socket = useSelector((state: RootState) => state.Socket.socket);
    const loginChecked = useSelector((state: RootState) => state.PersonalInfo.loginCheck);

    const [loginCheck, setLoginCheck] = useState(false);
    return (
        <div className="App">
            {loginChecked ? (
                <div style={{ height: '100%' }}>
                    <HambergerMenu titles="월별 출장 현장 조회" subtitles="월별 출장 현장 조회"></HambergerMenu>
                    <div style={{ position: 'relative', marginLeft: '10px' }}>
                        <BusinessTripShowContent></BusinessTripShowContent>
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

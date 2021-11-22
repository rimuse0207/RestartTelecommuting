import React, { useState, useEffect } from 'react';
import CeCalendarPublicPage from './CeCalendarPublicPage';
import SignInForm from '../Login/SignInForm';
import HambergerMenu from '../Navigation/HambergerMenu';
import SliderPage from '../SliderPage';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../models';
import { DecryptKey } from '../../config';
import CeCalendarMasterPage from './CeCalendarMasterPage';

const CeCalendarMainPage = () => {
    const socket = useSelector((state: RootState) => state.Socket.socket);
    const loginChecked = useSelector((state: RootState) => state.PersonalInfo.loginCheck);
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const [loginCheck, setLoginCheck] = useState(false);

    return (
        <div>
            {loginChecked ? (
                <div style={{ height: '100%' }}>
                    <HambergerMenu titles="근무 현황" subtitles="일별 신청현황 조회"></HambergerMenu>
                    <div style={{ position: 'relative' }}>
                        {DecryptKey(InfomationState.name) === '유성재' ? (
                            <CeCalendarMasterPage></CeCalendarMasterPage>
                        ) : (
                            <CeCalendarPublicPage></CeCalendarPublicPage>
                        )}
                    </div>
                    <SliderPage width={window.innerWidth} socket={socket}></SliderPage>
                </div>
            ) : (
                <SignInForm setLoginCheck={(data: boolean) => setLoginCheck(data)}></SignInForm>
            )}
        </div>
    );
};

export default CeCalendarMainPage;

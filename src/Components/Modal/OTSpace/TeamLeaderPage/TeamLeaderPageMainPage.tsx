import React, { useState } from 'react';
import HambergerMenu from '../../../Navigation/HambergerMenu';
import SliderPage from '../../../SliderPage';
import SignInForm from '../../../Login/SignInForm';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../models';
import TeamLeaderOTPage from './TeamLeaderOTPage';

const TeamLeaderPageMainPage = () => {
    const socket = useSelector((state: RootState) => state.Socket.socket);
    const loginChecked = useSelector((state: RootState) => state.PersonalInfo.loginCheck);

    const [loginCheck, setLoginCheck] = useState(false);
    return (
        <div>
            {loginChecked ? (
                <div>
                    <HambergerMenu titles="팀원 OT 승인" subtitles="팀원 사전 사후 OT 승인"></HambergerMenu>
                    <div style={{ position: 'relative' }}>
                        <TeamLeaderOTPage></TeamLeaderOTPage>
                    </div>
                    <SliderPage width={window.innerWidth} socket={socket}></SliderPage>
                </div>
            ) : (
                <SignInForm setLoginCheck={(data: boolean) => setLoginCheck(data)}></SignInForm>
            )}
        </div>
    );
};

export default TeamLeaderPageMainPage;

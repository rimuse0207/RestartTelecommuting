import React, { useState } from 'react';
import HambergerMenu from '../../../Navigation/HambergerMenu';
import SliderPage from '../../../SliderPage';
import SignInForm from '../../../Login/SignInForm';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../models';
import TeamLeaderOTPage from './TeamLeaderOTPage';

const TeamLeaderPageMainPage = () => {
    return (
        <div>
            <HambergerMenu titles="팀원 OT 승인" subtitles="팀원 사전 사후 OT 승인"></HambergerMenu>
            <TeamLeaderOTPage></TeamLeaderOTPage>
        </div>
    );
};

export default TeamLeaderPageMainPage;

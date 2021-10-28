import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SliderPage from '../../SliderPage';
import { RootState } from '../../../models';
import SignInForm from '../../Login/SignInForm';
import HambergerMenu from '../../Navigation/HambergerMenu';
import MealMonthMainPage from './MealMonthMainPage';
const MealMonthSelect = () => {
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const socket = useSelector((state: RootState) => state.Socket.socket);
    const loginChecked = useSelector((state: RootState) => state.PersonalInfo.loginCheck);
    const [loginCheck, setLoginCheck] = useState(false);
    return (
        <div>
            {loginChecked ? (
                <div>
                    <HambergerMenu titles="식대정산 월별 조회" subtitles="팀별 팀원 식대 신청 조회"></HambergerMenu>
                    <div style={{ position: 'relative' }}>
                        <MealMonthMainPage></MealMonthMainPage>
                    </div>
                    <SliderPage width={window.innerWidth} socket={socket}></SliderPage>
                </div>
            ) : (
                <SignInForm setLoginCheck={(data: boolean) => setLoginCheck(data)}></SignInForm>
            )}
        </div>
    );
};

export default MealMonthSelect;

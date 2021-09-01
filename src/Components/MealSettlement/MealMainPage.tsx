import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import HambergerMenu from '../Navigation/HambergerMenu';
import SliderPage from '../SliderPage';
import SignInForm from '../Login/SignInForm';
import { RootState } from '../../models/index';
import ApplyMealPage from './ApplyMealPage';

const MealMainPage = () => {
    const socket = useSelector((state: RootState) => state.Socket.socket);
    const loginChecked = useSelector((state: RootState) => state.PersonalInfo.loginCheck);

    const [loginCheck, setLoginCheck] = useState(false);
    return (
        <div>
            <div className="App">
                {loginChecked ? (
                    <div style={{ height: '100%' }}>
                        <HambergerMenu titles="식대 정산" subtitles="월 식대 조회 및 등록"></HambergerMenu>
                        <div>
                            <ApplyMealPage></ApplyMealPage>
                        </div>
                        <SliderPage width={window.innerWidth} socket={socket}></SliderPage>
                    </div>
                ) : (
                    <SignInForm setLoginCheck={(data: boolean) => setLoginCheck(data)}></SignInForm>
                )}
            </div>
        </div>
    );
};

export default MealMainPage;

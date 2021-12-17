import React, { useState } from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import SliderPage from './Components/SliderPage';
import { RootState } from './models';
import SignInForm from './Components/Login/SignInForm';
import HambergerMenu from './Components/Navigation/HambergerMenu';
import TelecommutingMainPage from './Components/Telecommuting/TelecommutingMainPage';

function App() {
    const socket = useSelector((state: RootState) => state.Socket.socket);
    const loginChecked = useSelector((state: RootState) => state.PersonalInfo.loginCheck);

    const [loginCheck, setLoginCheck] = useState(false);

    return (
        <div className="App">
            {loginChecked ? (
                <div style={{ height: '100%' }}>
                    <HambergerMenu titles="종합 업무 현황" subtitles="종합 업무 현황 조회"></HambergerMenu>
                    <div style={{ position: 'relative' }}>
                        <TelecommutingMainPage></TelecommutingMainPage>
                    </div>
                    <SliderPage width={window.innerWidth} socket={socket}></SliderPage>
                </div>
            ) : (
                <SignInForm setLoginCheck={(data: boolean) => setLoginCheck(data)}></SignInForm>
            )}
        </div>
    );
}

export default App;

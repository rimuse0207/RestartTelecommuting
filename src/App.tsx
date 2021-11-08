import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import SliderPage from './Components/SliderPage';
import { RootState } from './models';
import SignInForm from './Components/Login/SignInForm';
import HambergerMenu from './Components/Navigation/HambergerMenu';
import TelecommutingMainPage from './Components/Telecommuting/TelecommutingMainPage';
import { DecryptKey } from './config';

function App() {
    const socket = useSelector((state: RootState) => state.Socket.socket);
    const loginChecked = useSelector((state: RootState) => state.PersonalInfo.loginCheck);
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const [loginCheck, setLoginCheck] = useState(false);
    useEffect(() => {
        socket.emit('hi', {
            name: DecryptKey(InfomationState.name),
            id: DecryptKey(InfomationState.id),
        });
    }, [loginCheck, InfomationState]);
    return (
        <div className="App">
            {loginChecked ? (
                <div style={{ height: '100%' }}>
                    <HambergerMenu titles="근무 현황" subtitles="일별 신청현황 조회"></HambergerMenu>
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

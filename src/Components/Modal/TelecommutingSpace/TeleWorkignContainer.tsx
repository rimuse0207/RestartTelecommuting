import React from 'react';
import TeleWorking from './TeleWorking';
import HambergerMenu from '../..//Navigation/HambergerMenu';
import { useSelector } from 'react-redux';
import { RootState } from '../../../models/index';
import SliderPage from '../../SliderPage';
import { Redirect } from 'react-router';
const TeleWorkingContainer = () => {
    const socket = useSelector((state: RootState) => state.Socket.socket);
    const loginChecked = useSelector((state: RootState) => state.PersonalInfo.loginCheck);
    return (
        <div>
            <div className="App">
                {loginChecked ? (
                    <div>
                        <HambergerMenu titles="재택 근무" subtitles="재택 근무 시작 및 종료"></HambergerMenu>
                        <div>
                            <TeleWorking></TeleWorking>
                        </div>
                        <SliderPage width={window.innerWidth} socket={socket}></SliderPage>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};
export default TeleWorkingContainer;

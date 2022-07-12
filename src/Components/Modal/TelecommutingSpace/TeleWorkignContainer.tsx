import React from 'react';
import TeleWorking from './TeleWorking';
import HambergerMenu from '../..//Navigation/HambergerMenu';

const TeleWorkingContainer = () => {
    return (
        <div>
            <div className="App">
                <HambergerMenu titles="재택 근무" subtitles="재택 근무 시작 및 종료"></HambergerMenu>
                <TeleWorking></TeleWorking>
            </div>
        </div>
    );
};
export default TeleWorkingContainer;

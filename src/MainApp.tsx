import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SignInForm from './Components/Login/SignInForm';
import { RootState } from './models';
import App from './App';
import HambergerMenu from './Components/Navigation/HambergerMenu';

// const MainApp = () => {
//     const [loginCheck, setLoginCheck] = useState(false);
//     const loginChecked = useSelector((state: RootState) => state.PersonalInfo.loginCheck);

//     return <div>{loginChecked ? <App></App> : <SignInForm setLoginCheck={(data: boolean) => setLoginCheck(data)}></SignInForm>}</div>;
// };

const MainApp = () => {
    return (
        <div>
            <HambergerMenu titles="종합 업무 현황" subtitles="종합 업무 현황 조회"></HambergerMenu>
            <App></App>
        </div>
    );
};

export default MainApp;

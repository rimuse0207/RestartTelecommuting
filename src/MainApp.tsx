import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SignInForm from './Components/Login/SignInForm';
import { RootState } from './models';
import App from './App';

const MainApp = () => {
    const [loginCheck, setLoginCheck] = useState(false);
    const loginChecked = useSelector((state: RootState) => state.PersonalInfo.loginCheck);

    return <div>{loginChecked ? <App></App> : <SignInForm setLoginCheck={(data: boolean) => setLoginCheck(data)}></SignInForm>}</div>;
};

export default MainApp;

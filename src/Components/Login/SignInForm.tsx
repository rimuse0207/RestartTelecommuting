import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SignInForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { getPersionalInfo } from '../../models/PersonalInfo';
import { useHistory } from 'react-router-dom';
import { getSocket } from '../../models/Socket';
import socketio from 'socket.io-client';
import { getChatting_members } from '../../models/ChattingMeber';
import { RootState } from '../../models/index';
import { DecryptKey } from '../../config';
type SignInFormProps = {
    setLoginCheck: (data: boolean) => void;
};

const SignInForm = ({ setLoginCheck }: SignInFormProps) => {
    let history = useHistory();
    const socket = useSelector((state: RootState) => state.Socket.socket);
    const loginChecked = useSelector((state: RootState) => state.PersonalInfo.loginCheck);
    const infomations = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const [id, setIds] = useState<string | any>(localStorage.getItem('id') ? localStorage.getItem('id') : '');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    function isEmptyObj(obj: {}) {
        if (obj.constructor === Object && Object.keys(obj).length === 0) {
            return true;
        }

        return false;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // useEffect(() => {
    //     if (isEmptyObj(socket)) {
    //         console.log(localStorage.getItem('loginOutCheck'));
    //         console.log('소켓 없음');
    //         console.log(loginChecked);
    //         if (localStorage.getItem('loginOutCheck') === 'connecting') {
    //             const soscketData = socketio(`${process.env.REACT_APP_API_URL}`);
    //             soscketData.emit('hi', {
    //                 name: DecryptKey(infomations.name),
    //                 id: DecryptKey(infomations.id),
    //             });
    //             soscketData.on('users_come_in', (data: { message: [] }) => {
    //                 dispatch(getChatting_members(data.message));
    //             });
    //             soscketData.on('recieveCall', (data: { message: { senderId: string; senderName: string } }) => {
    //                 console.log(data);
    //                 handleVisibilityChange(data);
    //             });
    //             dispatch(getSocket(soscketData));
    //         }
    //     } else {
    //         console.log('소켓 있음');
    //         console.log(loginChecked);
    //         console.log(socket);
    //         if (loginChecked) {
    //             socket.emit('hi', {
    //                 name: DecryptKey(infomations.name),
    //                 id: DecryptKey(infomations.id),
    //             });
    //             socket.on('users_come_in', (data: { message: [] }) => {
    //                 dispatch(getChatting_members(data.message));
    //             });
    //             socket.on('recieveCall', (data: { message: { senderId: string; senderName: string } }) => {
    //                 console.log(data);
    //                 handleVisibilityChange(data);
    //             });
    //         }
    //     }
    // }, [socket]);

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        try {
            const loginCheck = await axios.post(`${process.env.REACT_APP_DB_HOST}/Login_app_servers/loginCheck`, {
                id: id,
                password: password,
            });

            if (!loginCheck.data.searchOn) {
                alert(loginCheck.data.message);
                setPassword('');
            } else {
                sessionStorage.setItem('DHKS_TOKEN', loginCheck.data.token);
                localStorage.setItem('id', loginCheck.data.data.id);
                localStorage.setItem('loginOutCheck', 'conneting');
                dispatch(getPersionalInfo(loginCheck.data.data));
                const soscketData = await socketio(`${process.env.REACT_APP_API_URL}`);
                soscketData.emit('hi', {
                    name: loginCheck.data.data.name,
                    id: loginCheck.data.data.id,
                });
                soscketData.on('users_come_in', (data: { message: [] }) => {
                    dispatch(getChatting_members(data.message));
                });

                await dispatch(getSocket(soscketData));
                await setLoginCheck(true);
                if (loginCheck.data.changePassword) {
                    history.push('/');
                }
                // return <Redirect push to="/" />
            }
        } catch (error) {
            console.log(error);
            alert('Login Error 서버 차단');
        }
    };
    // const handleVisibilityChange = (data: { message: { senderId: string; senderName: string } }) => {
    //     window.open(`http://192.168.2.241:5555/VideoFocusOn/${data.message.senderId}/${data.message.senderName}`, 'width=800,height=800');
    // };
    return (
        <div>
            <div className="appAside">
                <div className="logo_center">
                    <img src="/dhks.jpg" width="70%"></img>
                </div>
            </div>
            <div className="appForm">
                <div className="formCenter">
                    <form className="formFields" onSubmit={(event: React.SyntheticEvent) => handleSubmit(event)}>
                        <h1>DHKS</h1>
                        <h2>Portal Site</h2>
                        <div className="formField">
                            <label className="formFieldLabel" htmlFor="email">
                                E-Mail Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="formFieldInput"
                                placeholder="Enter your email"
                                name="email"
                                value={id}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIds(e.target.value)}
                            />
                        </div>

                        <div className="formField">
                            <label className="formFieldLabel" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="formFieldInput"
                                placeholder="Enter your password"
                                name="password"
                                value={password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="formField">
                            <button className="formFieldButton">Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;

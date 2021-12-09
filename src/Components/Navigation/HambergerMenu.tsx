import React, { useState, useEffect, useRef } from 'react';
import './Navigation.css';
import Navigation from './Navigation';
import { CgProfile } from 'react-icons/cg';
import { DecryptKey } from '../../config';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../models/index';
import socketio from 'socket.io-client';
import { getSocket } from '../../models/Socket';
import { getChatting_members } from '../../models/ChattingMeber';
type HambergerMenu = {
    titles: string;
    subtitles: string;
};

const HambergerMenu = ({ titles, subtitles }: HambergerMenu) => {
    const dispatch = useDispatch();
    const myMenuRef = useRef<any>('null');
    const [hambergerOpen, setHambergerOpen] = useState(false);
    const socket = useSelector((state: RootState) => state.Socket.socket);
    const loginChecked = useSelector((state: RootState) => state.PersonalInfo.loginCheck);
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const [menuStatus, setMenuStatus] = useState('');
    const _menuToggle = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        hambergerOpen ? setMenuStatus('') : setMenuStatus('isopen');
        setHambergerOpen(!hambergerOpen);
    };
    useEffect(() => {
        function handleClickOutside(e: MouseEvent): void {
            if (myMenuRef.current && !myMenuRef.current.contains(e.target as Node)) {
                e.stopPropagation();
                setMenuStatus('');
                setHambergerOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [myMenuRef]);

    useEffect(() => {
        socketconnect();
    }, []);
    function isEmptyObj(obj: {}) {
        if (obj.constructor === Object && Object.keys(obj).length === 0) {
            return true;
        }

        return false;
    }
    const socketconnect = async () => {
        if (loginChecked && isEmptyObj(socket)) {
            const soscketData = await socketio(`${process.env.REACT_APP_API_URL}`);
            soscketData.emit('hi', {
                name: DecryptKey(InfomationState.name),
                id: DecryptKey(InfomationState.id),
            });
            soscketData.on('users_come_in', (data: { message: [] }) => {
                dispatch(getChatting_members(data.message));
            });
            soscketData.on('recieveCall', (data: { message: { senderId: string; senderName: string } }) => {
                handleVisibilityChange(data);
            });
            await dispatch(getSocket(soscketData));
        }
    };
    const handleVisibilityChange = (data: { message: { senderId: string; senderName: string } }) => {
        window.open(`http://192.168.2.241:5555/VideoFocusOn/${data.message.senderId}/${data.message.senderName}`, 'width=800,height=800');
    };
    return (
        <div ref={myMenuRef}>
            <div className="menubar">
                <div className="MainTitles">
                    <h1>{titles}</h1>
                </div>
                <div className="hambclicker" onClick={(e: React.MouseEvent<HTMLElement>) => _menuToggle(e)}></div>
                <div id="hambmenu" className={menuStatus}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="title">
                    <span className="Navigation_title_text_css">{subtitles}</span>
                </div>
                <div>
                    <div className="Navigation_Info_div">
                        <div>
                            <div> {InfomationState.team.toUpperCase()}</div>
                            <div> {DecryptKey(InfomationState.name)}</div>
                            <div> {InfomationState.position}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <Navigation menuStatus={menuStatus} />
            </div>
        </div>
    );
};

export default HambergerMenu;

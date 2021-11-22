import React, { useEffect, useRef, useState } from 'react';
import MainPage from './MainPage';
import { useDispatch, useSelector } from 'react-redux';
import { getChatting_members } from '../models/ChattingMeber';
import { RootState } from '../models/index';
import { DecryptKey } from '../config';

type SliderPageProps = {
    width: number;
    socket: any;
};

const SliderPage = ({ width, socket }: SliderPageProps) => {
    const [xPosition, setX] = React.useState(false);

    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const dispatch = useDispatch();

    const toggleMenu = () => {
        setX(!xPosition);
    };

    useEffect(() => {
        if (socket) {
            socket.on('users_come_in', (data: { message: [] }) => {
                dispatch(getChatting_members(data.message));
            });
            socket.on('recieveCall', (data: { message: { senderId: string; senderName: string } }) => {
                console.log(data);
                handleVisibilityChange(data);
            });
        }
    }, [socket]);

    const handleVisibilityChange = (data: { message: { senderId: string; senderName: string } }) => {
        window.open(`http://192.168.2.241:5555/VideoFocusOn/${data.message.senderId}/${data.message.senderName}`, 'width=800,height=800');
    };

    return (
        // <div
        //     className="side-bar"
        //     style={{
        //         transform: `translatex(${xPosition ? 0 : 400}px)`,
        //         width: '400px',
        //         height: '90vh',
        //     }}
        // >
        //     <button onClick={() => toggleMenu()} className="toggle-menu"></button>

        //     <MainPage></MainPage>
        // </div>
        <div id="FocusCheckID"></div>
    );
};
export default SliderPage;

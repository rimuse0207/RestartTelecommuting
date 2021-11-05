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
    const FocusREF = useRef<any>('null');
    const [xPosition, setX] = React.useState(false);
    const [FocusTrue, setFocusTrue] = useState(false);
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const dispatch = useDispatch();

    const toggleMenu = () => {
        setX(!xPosition);
    };

    useEffect(() => {
        socket.emit('hi', {
            name: DecryptKey(InfomationState.name),
            id: DecryptKey(InfomationState.id),
        });
    }, []);

    useEffect(() => {
        socket.on('users_come_in', (data: { message: [] }) => {
            dispatch(getChatting_members(data.message));
        });
        socket.on('recieveCall', (data: { message: string }) => {
            console.log(data);
            handleVisibilityChange();
        });
    }, [socket]);

    const handleVisibilityChange = () => {
        console.log('@#@#@');

        if (FocusREF.current.focus) {
            if (document.hidden) {
                // background
                console.log('밖에');
                // alert('밖에 있습니다. 포커스 초점이 됩니다.');
                FocusREF.current.focus();
                window.open('http://192.168.2.155:3000/VideoFocusOn', 'width=800,height=800');
                setFocusTrue(false);
            } else {
                // foreground
                console.log('안에');
                alert('안에 있습니다. 포커스 초점이 없어도 됩니다.');
                setFocusTrue(false);
            }
        }
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
        <div ref={FocusREF} id="FocusCheckID"></div>
    );
};
export default SliderPage;

import React, { useEffect } from 'react';
import MainPage from './MainPage';
import { useDispatch, useSelector } from 'react-redux';
import { getChatting_members } from '../models/ChattingMeber';
import { RootState } from '../models/index';
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
        socket.emit('hi', {
            name: InfomationState.name,
            id: InfomationState.id,
        });
    }, []);

    useEffect(() => {
        socket.on('users_come_in', (data: { message: [] }) => {
            console.log(data);
            dispatch(getChatting_members(data.message));
        });
    }, [socket]);

    return (
        <div
            className="side-bar"
            style={{
                transform: `translatex(${xPosition ? 0 : 400}px)`,
                width: '400px',
                height: '90vh',
            }}
        >
            <button onClick={() => toggleMenu()} className="toggle-menu"></button>

            <MainPage></MainPage>
        </div>
    );
};
export default SliderPage;

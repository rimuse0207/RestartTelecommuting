import React, { useEffect } from "react";
import MainPage from "./MainPage";
import { useDispatch, useSelector } from "react-redux";
import { getChatting_members } from "../models/ChattingMeber"
import { RootState } from "../models/index"
type SliderPageProps = {
    width: number;
    socket: any
}


const SliderPage = ({ width, socket }: SliderPageProps) => {
    const [xPosition, setX] = React.useState(width - 400);
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const dispatch = useDispatch();

    const toggleMenu = () => {
        if (xPosition < width) {
            setX(width);
        } else {
            setX(width - 400);
        }
    };

    useEffect(() => {
        setX(width);
        socket.emit(("hi"), {
            name: InfomationState.name,
            id: InfomationState.email,
        })

    }, []);

    useEffect(() => {
        socket.on('users_come_in', (data: { message: [] }) => {
            dispatch(getChatting_members(data.message));
        });
    }, [socket])

    return (
        <div
            className="side-bar"
            style={{
                transform: `translatex(${xPosition}px)`,
                width: "400px",
                height: "100vh"
            }}
        >
            <button
                onClick={() => toggleMenu()}
                className="toggle-menu"
            ></button>
            <MainPage></MainPage>
        </div>
    )
}
export default SliderPage;
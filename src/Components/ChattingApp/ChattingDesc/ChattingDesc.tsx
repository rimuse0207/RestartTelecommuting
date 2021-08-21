import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../models"

type ChattingDescProps = {
    name: string,
    email: string,
    connectReal: boolean,
    handleClickChattingDescReturn: () => void;
}

const ChattingDesc = ({ connectReal, name, email, handleClickChattingDescReturn }: ChattingDescProps) => {
    const socket = useSelector((state: RootState) => state.Socket.socket);
    const infomation = useSelector((state: RootState) => state.PersonalInfo.infomation)
    const [messages, setMessages] = useState("");

    const messageSend = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert(messages);
        socket.emit("messageSendServer", {
            messages,
            To_Name: email,
            From_Name: infomation.email,
            connectReal
        })
        setMessages("");

    }

    return (
        <div>
            <button onClick={handleClickChattingDescReturn}>뒤로 가기 </button>
            <div>
                <h1>{name}</h1>
                <div>
                    채팅이 들어갑니다.
                </div>
                <div>
                    <div>
                        <span>+</span>
                        <form style={{ display: "inline" }} onSubmit={(e: React.FormEvent<HTMLFormElement>) => messageSend(e)}>
                            <input type="text" value={messages} onChange={(e) => setMessages(e.target.value)} ></input>
                            <button type="submit" >전송</button>
                        </form>
                    </div>

                </div>
            </div>

        </div >
    )
}

export default ChattingDesc;
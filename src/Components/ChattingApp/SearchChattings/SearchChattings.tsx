import React from "react";
import DetailSearchChattings from "./DetailSearchChattings"
import { RiChatNewLine } from "react-icons/ri"
import { useSelector } from "react-redux";
import { RootState } from "../../../models";
import { useEffect } from "react";
import { useState } from "react";

const SearchChattings = () => {
    const socket = useSelector((state: RootState) => state.Socket.socket);
    const Infomation = useSelector((state: RootState) => state.PersonalInfo.infomation)
    const [Rooms, setRooms] = useState([]);
    useEffect(() => {
        socket.emit("getChattingRoom", {
            id: Infomation.email,
        })
        socket.on("sendChattingRoom", (data: { data: [] }) => {
            console.log(data);
            setRooms(data.data)
        })
    }, [])
    return (
        <div className="Chatting_overflowBox">
            <div className="Chatting_ChattingFlex">
                <h2>채팅</h2>
                <span><RiChatNewLine></RiChatNewLine></span>
            </div>
            <div className="Chatting_ChattingFlex_line" > </div>

            {Rooms.map((list, i) => {
                return <DetailSearchChattings datas={list}></DetailSearchChattings>
            })}
        </div>
    )
}

export default SearchChattings;
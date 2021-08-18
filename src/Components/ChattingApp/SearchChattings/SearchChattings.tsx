import React from "react";
import DetailSearchChattings from "./DetailSearchChattings"
import { RiChatNewLine } from "react-icons/ri"
const SearchChattings = () => {
    return (
        <div className="Chatting_overflowBox">
            <div className="Chatting_ChattingFlex">
                <h2>채팅</h2>
                <span><RiChatNewLine></RiChatNewLine></span>
            </div>
            <div className="Chatting_ChattingFlex_line" > </div>
            <DetailSearchChattings></DetailSearchChattings>
            <DetailSearchChattings></DetailSearchChattings>
            <DetailSearchChattings></DetailSearchChattings>
            <DetailSearchChattings></DetailSearchChattings>
            <DetailSearchChattings></DetailSearchChattings>
            <DetailSearchChattings></DetailSearchChattings>
            <DetailSearchChattings></DetailSearchChattings>
            <DetailSearchChattings></DetailSearchChattings>
            <DetailSearchChattings></DetailSearchChattings>
            <DetailSearchChattings></DetailSearchChattings>
            <DetailSearchChattings></DetailSearchChattings>
            <DetailSearchChattings></DetailSearchChattings>
        </div>
    )
}

export default SearchChattings;
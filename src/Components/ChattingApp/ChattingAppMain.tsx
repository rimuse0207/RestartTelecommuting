import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navigation from "./Navigation/Navigation";
import SearchChattings from "./SearchChattings/SearchChattings";
import SearchFriends from "./SearchFriends/SearchFriends";
import "./ChattingAppMain.css";
import { RootState } from "../../models";
import ChattingDesc from "./ChattingDesc/ChattingDesc";

type ShowChattingView = {
    SearchFriendsClick: boolean,
    SearchChattingClicks: boolean
}



const ChattingAppMain = () => {
    const socket = useSelector((state: RootState) => state.Socket.socket);
    const [ShowChattingView, setShowChattingView] = useState<ShowChattingView>({
        SearchFriendsClick: true,
        SearchChattingClicks: false,
    })
    const [ShowChattingDesc, setShowChattingDesc] = useState({
        showChattingDesc: false,
        connectReal: false,
        socketId: "",
        email: "",
        name: ""
    })

    const handleClickChattingDesc = (socketId: string, connectReal: boolean, email: string, name: string) => {
        setShowChattingDesc({
            showChattingDesc: true,
            connectReal: connectReal,
            socketId: socketId,
            email: email,
            name: name
        });
    }
    const handleClickChattingDescReturn = () => {
        setShowChattingDesc({
            showChattingDesc: false,
            connectReal: false,
            socketId: "",
            email: "",
            name: ""
        });
    }
    const handleClicksMenus = (Clickmenu: string) => {
        if (Clickmenu === "friend") {
            setShowChattingView({ SearchFriendsClick: true, SearchChattingClicks: false })
        } else {
            setShowChattingView({ SearchFriendsClick: false, SearchChattingClicks: true })
        }
    }

    return (
        <div className="Chatting_Box">
            <Navigation handleClicksMenus={handleClicksMenus} ShowChattingFriend={ShowChattingView.SearchFriendsClick} ShowChattingChatting={ShowChattingView.SearchChattingClicks}></Navigation>
            {ShowChattingDesc.showChattingDesc ? <ChattingDesc name={ShowChattingDesc.name} handleClickChattingDescReturn={() => handleClickChattingDescReturn()}></ChattingDesc> :
                <>
                    {ShowChattingView.SearchFriendsClick ? <SearchFriends handleClickChattingDesc={(socketId: string, connectReal: boolean, email: string, name: string) => handleClickChattingDesc(socketId, connectReal, email, name)}></SearchFriends> : <></>}
                    {ShowChattingView.SearchChattingClicks ? <SearchChattings></SearchChattings> : <></>}
                </>}

        </div>
    )
}

export default ChattingAppMain;
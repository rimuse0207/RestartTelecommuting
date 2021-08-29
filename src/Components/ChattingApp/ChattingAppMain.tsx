import React, { useState } from 'react';
import Navigation from './Navigation/Navigation';
import SearchChattings from './SearchChattings/SearchChattings';
import SearchFriends from './SearchFriends/SearchFriends';
import './ChattingAppMain.css';
import { RootState } from '../../models';
import ChattingDesc from './ChattingDesc/ChattingDesc';

type ShowChattingView = {
    SearchFriendsClick: boolean;
    SearchChattingClicks: boolean;
};

const ChattingAppMain = () => {
    const [ShowChattingView, setShowChattingView] = useState<ShowChattingView>({
        SearchFriendsClick: true,
        SearchChattingClicks: false,
    });
    const [ShowChattingDesc, setShowChattingDesc] = useState({
        showChattingDesc: false,
        socketId: '',
        id: '',
        name: '',
        room_id: '',
    });

    const handleClickChattingDesc = (socketId: string, roomId: string, id: string, name: string) => {
        setShowChattingDesc({
            showChattingDesc: true,
            socketId: socketId,
            id: id,
            name: name,
            room_id: roomId,
        });
    };
    const handleClickChattingDescReturn = () => {
        setShowChattingDesc({
            showChattingDesc: false,
            socketId: '',
            id: '',
            name: '',
            room_id: '',
        });
    };
    const handleClicksMenus = (Clickmenu: string) => {
        if (Clickmenu === 'friend') {
            setShowChattingView({ SearchFriendsClick: true, SearchChattingClicks: false });
        } else {
            setShowChattingView({ SearchFriendsClick: false, SearchChattingClicks: true });
        }
    };

    return (
        <div className="Chatting_Box">
            <Navigation
                handleClicksMenus={handleClicksMenus}
                ShowChattingFriend={ShowChattingView.SearchFriendsClick}
                ShowChattingChatting={ShowChattingView.SearchChattingClicks}
            ></Navigation>
            {ShowChattingDesc.showChattingDesc ? (
                <ChattingDesc
                    roomId={ShowChattingDesc.room_id}
                    id={ShowChattingDesc.id}
                    name={ShowChattingDesc.name}
                    handleClickChattingDescReturn={() => handleClickChattingDescReturn()}
                ></ChattingDesc>
            ) : (
                <>
                    {ShowChattingView.SearchFriendsClick ? (
                        <SearchFriends
                            handleClickChattingDesc={(socketId: string, roomId: string, id: string, name: string) =>
                                handleClickChattingDesc(socketId, roomId, id, name)
                            }
                        ></SearchFriends>
                    ) : (
                        <></>
                    )}
                    {ShowChattingView.SearchChattingClicks ? (
                        <SearchChattings
                            handleClickChattingDesc={(socketId: string, roomId: string, id: string, name: string) =>
                                handleClickChattingDesc(socketId, roomId, id, name)
                            }
                        ></SearchChattings>
                    ) : (
                        <></>
                    )}
                </>
            )}
        </div>
    );
};

export default ChattingAppMain;

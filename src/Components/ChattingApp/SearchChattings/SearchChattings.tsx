import React from 'react';
import DetailSearchChattings from './DetailSearchChattings';
import { RiChatNewLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { RootState } from '../../../models';
import { useEffect } from 'react';
import { useState } from 'react';
import { DecryptKey } from "../../../config"
type SearchChattingsProps = {
    handleClickChattingDesc: (socketId: string, roomId: string, id: string, name: string) => void;
};
const SearchChattings = ({ handleClickChattingDesc }: SearchChattingsProps) => {
    const socket = useSelector((state: RootState) => state.Socket.socket);
    const Infomation = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const [Rooms, setRooms] = useState([]);
    useEffect(() => {
        socket.emit('getChattingRoom', {
            id: DecryptKey(Infomation.id),
        });
        socket.on('sendChattingRoom', (data: { data: [] }) => {
            console.log(data);
            setRooms(data.data);
        });
        socket.on('disconnected', () => {
            socket.emit('hi', {
                id: DecryptKey(Infomation.id),
            });
        });
    }, []);
    return (
        <div className="Chatting_overflowBox">
            <div className="Chatting_ChattingFlex">
                <h2>채팅</h2>
                <span>
                    <RiChatNewLine></RiChatNewLine>
                </span>
            </div>
            <div className="Chatting_ChattingFlex_line"> </div>

            {Rooms.map((list: {
                name: string;
                position: string;
                room_id: string;
                maxDate: string;
                message_desc: string;
                user_id: string;
                user_id2: string;
                chatCount: number;
                readed_checked: number;
            }, i) => {
                return (
                    <DetailSearchChattings
                        key={list.user_id2}
                        Infomation={Infomation}
                        datas={list}
                        handleClickChattingDesc={(socketId: string, roomId: string, id: string, name: string) =>
                            handleClickChattingDesc(socketId, roomId, id, name)
                        }
                    ></DetailSearchChattings>
                );
            })}
        </div>
    );
};

export default React.memo(SearchChattings);

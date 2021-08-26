import moment from 'moment';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../models';

type ChattingDescProps = {
    name: string;
    id: string;
    roomId: string;
    handleClickChattingDescReturn: () => void;
};

const ChattingDesc = ({ roomId, name, id, handleClickChattingDescReturn }: ChattingDescProps) => {
    const socket = useSelector((state: RootState) => state.Socket.socket);
    const infomation = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const [messages, setMessages] = useState('');
    const [allDesc, setAllDesc] = useState([]);
    const messageSend = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert(messages);
        if (roomId !== 'nothing') {
            socket.emit('messageSendServer', {
                messages,
                To_Name: name,
                From_Name: infomation.id,
                RoomId: roomId,
            });
        } else {
            socket.emit('messageSendServerNothings', {
                messages,
                To_Name: name,
                From_Name: infomation.id,
                RoomId: roomId,
            });
        }

        setMessages('');
    };
    useEffect(() => {
        if (roomId !== 'nothing') {
            socket.emit('getChattingDESC', {
                id: infomation.id,
                roomId,
            });
        }
        socket.on('successChatingDESC', (datas: { data: [] }) => {
            console.log(datas);
            setAllDesc(datas.data);
        });
    }, []);
    return (
        <div>
            <button onClick={handleClickChattingDescReturn}>뒤로 가기 </button>
            <div>
                <h1>{name}</h1>
                <div>
                    {allDesc.map((list: { user_id: string; message_desc: string; write_date: string }, i) => {
                        return (
                            <div>
                                <div>{list.user_id}</div>
                                <div>{list.message_desc}</div>
                                <div>{moment(list.write_date).format('YYYY-MM-DD HH:mm:ss')}</div>
                            </div>
                        );
                    })}
                </div>
                {roomId === 'nothing' ? '채팅 한적 없음' : '채팅한적 있음'}
                <div>
                    <div>
                        <span>+</span>
                        <form style={{ display: 'inline' }} onSubmit={(e: React.FormEvent<HTMLFormElement>) => messageSend(e)}>
                            <input type="text" value={messages} onChange={e => setMessages(e.target.value)}></input>
                            <button type="submit">전송</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ChattingDesc);

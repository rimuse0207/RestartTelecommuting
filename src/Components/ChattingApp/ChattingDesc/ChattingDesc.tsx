import moment from 'moment';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../models';
import './ChattingDesc.css';
import { BsPersonSquare } from 'react-icons/bs';
import { useRef } from 'react';

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
    const textInput = useRef<any>(null);
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
        textInput.current.focus();
        if (!socket) return;
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
        <div className="Chatting_app_DESC_BigBox_div" style={{ width: '100%', height: '90%' }}>
            <button onClick={handleClickChattingDescReturn}>뒤로 가기 </button>
            <div>
                <h1>{name}</h1>

                <div className="Chatting_app_DESC_div">
                    {allDesc.map((list: { user_id: string; message_desc: string; write_date: string }, i) => {
                        return list.user_id === infomation.id ? (
                            <div>
                                <div className="Chatting_app_DESC_right_div">
                                    <div>{list.message_desc}</div>
                                    <div className="Chatting_app_Persion_WriteDate_div_right">
                                        {moment(list.write_date).format('MM월 DD일 HH시 mm분')}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="Chatting_app_DESC_left_div">
                                <div className="Chatting_app_Person_div">
                                    <div className="Chatting_app_Person_left_div">
                                        <BsPersonSquare></BsPersonSquare>
                                    </div>
                                    <div className="Chatting_app_Person_right_div">
                                        <div>{list.user_id}</div>
                                    </div>
                                </div>
                                <div className="Chatting_app_Person_Text_div">
                                    <div>{list.message_desc}</div>
                                    <div className="Chatting_app_Persion_WriteDate_div">
                                        {moment(list.write_date).format('MM월 DD일 HH시 mm분')}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div>
                    <div className="Chatting_app_inputText_MessageSend">
                        <span>+</span>
                        <form style={{ display: 'inline' }} onSubmit={(e: React.FormEvent<HTMLFormElement>) => messageSend(e)}>
                            <input ref={textInput} type="text" value={messages} onChange={e => setMessages(e.target.value)}></input>
                            <button type="submit">전송</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ChattingDesc);

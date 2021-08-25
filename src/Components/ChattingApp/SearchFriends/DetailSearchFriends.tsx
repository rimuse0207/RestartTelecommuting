import React from 'react';
import { CgProfile } from 'react-icons/cg';

type DetailSearchFriendsProps = {
    id: string;
    name: string;
    company: string;
    team: string;
    position: string;
    socketId: string;
    roomId: string;
    handleClickChattingDesc: (socketId: string, roomId: string, id: string, name: string) => void;
};

const DetailSearchFriends = ({
    id,
    name,
    company,
    team,
    position,
    roomId,
    socketId,
    handleClickChattingDesc,
}: DetailSearchFriendsProps) => {
    return (
        <div className="Chatting_Friend_Box" onClick={() => handleClickChattingDesc(socketId, roomId, id, name)}>
            <div className="Chatting_Friend_Box_left">
                <div>
                    <CgProfile></CgProfile>
                </div>
            </div>
            <div className="Chatting_Friend_Box_right">
                <div>
                    <div>
                        <h4>{company}</h4>
                        <h5>{team}</h5>
                    </div>
                    <div>
                        <h3 key={socketId}>{name}</h3>
                        <span style={{ marginLeft: '10px', fontSize: '13px' }}>{position}</span>
                    </div>
                </div>
            </div>
            <div className="Chatting_Friend_Box_right">
                <div>{socketId === 'notConnecting' ? '접속 중이 아닙니다.' : '실시간 접속중'}</div>
            </div>
        </div>
    );
};

export default DetailSearchFriends;

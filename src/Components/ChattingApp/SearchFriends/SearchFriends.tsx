import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DetailSearchFriends from './DetailSearchFriends';
import { RootState } from '../../../models';

type SearchFriendsProps = {
    handleClickChattingDesc: (socketId: string, roomId: string, id: string, name: string) => void;
};

const SearchFriends = ({ handleClickChattingDesc }: SearchFriendsProps) => {
    const [SearchName, setSearchName] = useState('');
    const members = useSelector((state: RootState) => state.ChattingMember.members);

    return (
        <div className="Chatting_overflowBox">
            <div>
                <div className="Chatting_Search_divBox">
                    <input
                        value={SearchName}
                        onChange={e => setSearchName(e.target.value)}
                        placeholder="찾으실 이름 또는 팀명을 입력해주세요....."
                    ></input>
                </div>
                {members.length > 0
                    ? members
                        .filter((info: { name: string; team: string }) => {
                            if (info.name.indexOf(SearchName) !== -1) {
                                return info;
                            } else if (info.team.indexOf(SearchName) !== -1) {
                                return info;
                            }
                        })
                        .map(
                            (
                                list: {
                                    room_id: string;
                                    team: string;
                                    name: string;
                                    position: string;
                                    connect_status: string;
                                    company: string;
                                    id: string;
                                },
                                i
                            ) => {
                                return (
                                    <DetailSearchFriends
                                        key={list.id}
                                        id={list.id}
                                        name={list.name}
                                        company={list.company}
                                        team={list.team}
                                        position={list.position}
                                        roomId={list.room_id}
                                        socketId={list.connect_status}
                                        handleClickChattingDesc={(socketId: string, roomId: string, id: string, name: string) =>
                                            handleClickChattingDesc(socketId, roomId, id, name)
                                        }
                                    ></DetailSearchFriends>
                                );
                            }
                        )
                    : '서버와 연결중에 있습니다.'}
            </div>
        </div>
    );
};

export default React.memo(SearchFriends);

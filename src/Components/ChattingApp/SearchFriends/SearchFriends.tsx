import React, { useState } from "react";
import { useSelector } from "react-redux";
import DetailSearchFriends from "./DetailSearchFriends";
import { RootState } from "../../../models";

type SearchFriendsProps = {
    handleClickChattingDesc: (socketId: string, connectReal: boolean, email: string, name: string) => void
}


const SearchFriends = ({ handleClickChattingDesc }: SearchFriendsProps) => {
    const [SearchName, setSearchName] = useState("");
    const members = useSelector((state: RootState) => state.ChattingMember.members);

    return (
        <div className="Chatting_overflowBox">
            <div>
                <div className="Chatting_Search_divBox">
                    <input value={SearchName} onChange={(e) => setSearchName(e.target.value)} placeholder="찾으실 이름 또는 팀명을 입력해주세요....."></input>
                </div>
                {members.length > 0 ? members.filter((info: { name: string, team: string }) => {
                    if (info.name.indexOf(SearchName) !== -1) {
                        return info;
                    }
                    else if (info.team.indexOf(SearchName) !== -1) {
                        return info
                    }

                }).map((list: { index: number, email: string, name: string, company: string, team: string, position: string, connectReal: boolean, socketId: string }, i) => {
                    return <DetailSearchFriends key={list.index} email={list.email} name={list.name} company={list.company} team={list.team} position={list.position} connectReal={list.connectReal} socketId={list.socketId} handleClickChattingDesc={(socketId: string, connectReal: boolean, email: string, name: string) => handleClickChattingDesc(socketId, connectReal, email, name)} ></DetailSearchFriends>
                }) : "서버와 연결중에 있습니다."}

            </div>
        </div>
    )
}

export default SearchFriends;
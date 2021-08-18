import React from "react";
import { IoPeopleOutline } from "react-icons/io5";
import { BsFillPeopleFill } from "react-icons/bs"
import { AiFillWechat } from "react-icons/ai"
import { RiWechatLine } from "react-icons/ri"
type NavigationProps = {
    handleClicksMenus: (Clickmenu: string) => void
    ShowChattingFriend: boolean,
    ShowChattingChatting: boolean

}

const Navigation = ({ handleClicksMenus, ShowChattingFriend, ShowChattingChatting }: NavigationProps) => {
    return (
        <div className="ChattingApp_Nav_div">
            <ul>
                <li onClick={() => handleClicksMenus("friend")}>{ShowChattingFriend ? <BsFillPeopleFill></BsFillPeopleFill> : <IoPeopleOutline></IoPeopleOutline>} </li>
                <li onClick={() => handleClicksMenus("chatting")}>{ShowChattingChatting ? <AiFillWechat></AiFillWechat> : <RiWechatLine></RiWechatLine>}</li>
            </ul>
        </div>
    )
}

export default Navigation;
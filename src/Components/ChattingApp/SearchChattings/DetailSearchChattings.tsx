
import React from "react";
import { IoPeopleCircleOutline } from "react-icons/io5"
import moment from "moment";

type DetailSearchChattingsProps = {
    datas: {
        name: string;
        position: string;
        room_id: string;
        maxDate: string;
        message_desc: string;
        user_id: string;
        user_id2: string;
    };
    handleClickChattingDesc: (socketId: string, roomId: string, id: string, name: string) => void;
};


const DetailSearchChattings = ({ datas, handleClickChattingDesc }: DetailSearchChattingsProps) => {
    console.log(datas);
    return (
        <div
            className="Chatting_Chatting_Box"
            key={datas.room_id}
            onClick={() => handleClickChattingDesc(datas.room_id, datas.room_id, datas.name, datas.name)}
        >
            <div className="Chatting_Chatting_Box_left">
                <div >
                    <IoPeopleCircleOutline></IoPeopleCircleOutline>
                </div>
            </div>
            <div className="Chatting_Chatting_right">
                <div>
                    <div className="Chatting_relativeBox">
                        <h4>{datas.name}</h4>
                        <h5 style={{ marginLeft: "5px" }}>{datas.position}</h5>
                        <div className="Chatting_Chatting_timeSpan">{moment(datas.maxDate).format("YYYY-MM-DD HH:mm:ss")}</div>
                    </div>
                    <div className="Chatting_Chatting_desc">
                        <h3 >{datas.message_desc}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailSearchChattings;

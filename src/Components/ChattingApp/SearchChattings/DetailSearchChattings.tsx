import React from "react";
import { IoPeopleCircleOutline } from "react-icons/io5"
import moment from "moment";
type DetailSearchChattingsProps = {
    datas: {
        name: string,
        position: string,
        room_id: string,
        message_desc: string,
        maxDate: string
    }
}

const DetailSearchChattings = ({ datas }: DetailSearchChattingsProps) => {
    return (
        <div className="Chatting_Chatting_Box" key={datas.room_id}>
            <div className="Chatting_Chatting_Box_left">
                <div>
                    <IoPeopleCircleOutline></IoPeopleCircleOutline>
                </div>
            </div>
            <div className="Chatting_Chatting_right">
                <div>
                    <div className="Chatting_relativeBox">
                        <h4>{datas.name}</h4>
                        <h5>{datas.position}</h5>
                        <div className="Chatting_Chatting_timeSpan">{moment(datas.maxDate).format("YYYY-MM-DD HH:mm:ss")}</div>
                    </div>
                    <div className="Chatting_Chatting_desc">
                        <h3>{datas.message_desc}</h3>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailSearchChattings;
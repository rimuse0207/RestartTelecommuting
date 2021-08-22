import React from "react";
import { IoPeopleCircleOutline } from "react-icons/io5"

type DetailSearchChattingsProps = {
    datas: {
        name: string,
        position: string,
        room_id: string
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
                        <div className="Chatting_Chatting_timeSpan">2021-07-27 19:11</div>
                    </div>
                    <div className="Chatting_Chatting_desc">
                        <h3>메시지 내용이 들어갑니다.메시지 내용이 들어갑니다.메시지 내용이 들어갑니다.메시지 내용이 들어갑니다.</h3>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailSearchChattings;
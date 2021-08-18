import React from "react";
import { IoPeopleCircleOutline } from "react-icons/io5"

const DetailSearchChattings = () => {
    return (
        <div className="Chatting_Chatting_Box">
            <div className="Chatting_Chatting_Box_left">
                <div>
                    <IoPeopleCircleOutline></IoPeopleCircleOutline>
                </div>
            </div>
            <div className="Chatting_Chatting_right">
                <div>
                    <div className="Chatting_relativeBox">
                        <h4>유성재</h4>
                        <h5>사원</h5>
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
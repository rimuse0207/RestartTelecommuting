import React from "react";
import moment from "moment"
import "./BusinessTrip.css"

type BusinessTripProps ={
    pickerDate?: string | null | undefined;
}

const BusinessTrip= ({pickerDate}:BusinessTripProps) =>{
    return (
        <div className="mainbox">
            <div>
                <div className="Business_main_div_box">
                    <div className="Business_h2_div_box">
                        <h2>출장 근무 신청</h2>
                    </div>
                    <div className="BusinessTrip_input_div_box">
                        <h4>출장 목적지</h4>
                        <input placeholder="출장 목적지를 작성해주세요."></input>
                    </div>
                    <div className="BusinessTrip_textarea_div_box">
                        <h4>출장 목적</h4>
                        <textarea placeholder="출장 목적을 작성해주세요."></textarea>
                    </div>
                </div>
                <div className="Business_button_div_box">
                    <button className="Business_button">저장하기</button>
                </div>
            </div>
        </div>
    )
}

export default BusinessTrip;

import React, { useState } from 'react';
import moment from 'moment';
import './TeleWorking.css';
type TeleWorkingProps = {
    pickerDate?: string | null | undefined;
};

const TeleWorking = ({ pickerDate }: TeleWorkingProps) => {
    const [showBox, setShowBox] = useState(false);
    const [showBox2, setShowBox2] = useState(false);
    return (
        // <div className="TeleWorking_big_box_div">
        //     <h3>{moment().format('YYYY년 MM월 DD일')}</h3>
        //     <div>
        //         <div>
        //             <label>이름: </label>
        //             <input type="text"></input>
        //         </div>
        //         <div>
        //             <label>부서: </label>
        //             <input type="text"></input>
        //         </div>
        //         <div>
        //             <label>사용시작: </label>
        //             <input type="text"></input>
        //         </div>
        //     </div>
        // </div>
        <div className="mainbox">
            <div className="subBox"></div>
            <div className="mainBox">
                <div className="mainBox_ulup">
                    <ul>
                        <li className={showBox ? 'showbox' : 'noneshowbox'} onClick={() => setShowBox(!showBox)}>
                            재택 근무 시작
                        </li>
                        <li className={showBox ? 'noneshowbox' : 'showbox'} onClick={() => setShowBox(!showBox)}>
                            재택근무 종료
                        </li>
                    </ul>
                </div>

                <div className="mainBox_ulup">
                    <ul>
                        <li className={showBox ? 'showbox' : 'noneshowbox'} onClick={() => setShowBox(!showBox)}>
                            재택 근무 시작후 사용 가능
                        </li>
                        <li className={showBox ? 'noneshowbox' : 'showbox'}>
                            <textarea></textarea>
                            업무 일지 작성
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TeleWorking;

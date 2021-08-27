import React from 'react';

const TeleWorking = () => {
    return (
        <div className="Modal_program_inner_div">
            <h3>재택 근무 작성하기</h3>
            <div>
                <div>
                    <label>이름: </label>
                    <input type="text"></input>
                </div>
                <div>
                    <label>부서: </label>
                    <input type="text"></input>
                </div>
                <div>
                    <label>사용시작: </label>
                    <input type="text"></input>
                </div>
            </div>
        </div>
    );
};

export default TeleWorking;

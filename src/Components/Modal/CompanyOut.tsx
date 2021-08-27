import React from 'react';

const CompanyOut = () => {
    return (
        <div className="Modal_program_inner_div">
            <h3>외근 작성하기</h3>
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
                    <label>목적지: </label>
                    <input type="text"></input>
                </div>
            </div>
        </div>
    );
};

export default CompanyOut;

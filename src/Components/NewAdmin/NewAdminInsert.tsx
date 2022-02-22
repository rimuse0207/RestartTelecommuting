import React, { useEffect, useState } from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import { GiClick } from 'react-icons/gi';
import { CgSelectR } from 'react-icons/cg';
import styled from 'styled-components';
import axios from 'axios';

const NewUserApplyFormBoxDiv = styled.div`
    width: 90%;
    height: 50px;
    display: flex;
    margin-top: 30px;
    margin-bottom: 6px;

    .CElogs_WriteData_FORM_emoticon_div {
        line-height: 50px;
    }
    .CElogs_WriteData_FORM_Text_label {
        width: 200px;
    }
    textarea {
        min-height: 100px;
        padding: 10px;
    }
    #TextareaHeight {
        height: 100px;
        line-height: 100px;
    }
    #USBCDDivBox {
        width: 80%;
        height: 100%;

        div {
            height: 100%;
        }
    }
    .react-datepicker__input-container {
        width: 100%;
        height: 100%;
    }
    .example-custom-input10,
    .example-custom-input2 {
        width: 100%;
        height: 100%;
        padding: 0;
        padding-left: 20px;
        border: 0.5px solid lightgray;
        border-radius: 2px;
        font-size: 0.8em;
        font-family: initial;
        color: black;
        background-color: white;
        text-align: start;
        :hover {
            cursor: pointer;
            background-color: #efefef;
        }
    }
    select {
        width: 80%;
        height: 100%;
        padding: 0;
        padding-left: 20px;
        border: 0.5px solid lightgray;
        border-radius: 2px;
        font-size: 0.8em;
        font-family: initial;
        color: black;
        option {
            color: black;
            border: none;
            :focus {
                color: black;
            }
        }
    }
`;
const SubMitButton = styled.div`
    position: relative;
    bottom: -100px;
    text-align: right;
    width: 90%;
    button {
        border: none;
        outline: none;
        width: 30%;
        height: 50px;
        border-radius: 4px;
        font-weight: bolder;
        background-color: #30aed6;
        color: white;
        font-size: 1em;
        :hover {
            cursor: pointer;
            background-color: #efefef;
            color: #30aed6;
            transition: 0.5s ease-in-out;
        }
    }
`;

const NewAdminInsertMainDivBox = styled.div`
    width: 70%;
    margin: 0 auto;
    margin-top: 100px;
`;

const NewAdminInsert = () => {
    const [NewUserData, setNewUserData] = useState({
        company: 'YIKC',
        name: '',
        team: '',
        position: '',
        emailId: '',
    });

    const handclicksServerDataSend = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; // 검증에 사용할 정규식 변수 regExp에 저장
        if (NewUserData.name === '' || NewUserData.team === '' || NewUserData.position === '' || NewUserData.emailId === '') {
            alert('공란을 전부 적어주세요.');
            return;
        }
        if (NewUserData.emailId.match(regExp) != null) {
            const inputString = window.confirm(`
                회사 : ${NewUserData.company} 
                이름 : ${NewUserData.name} 
                부서 : ${NewUserData.team} 
                직급 : ${NewUserData.position} 
                이메일 : ${NewUserData.emailId} 

                위의 내용이 맞다면 확인을 눌러주세요.
            `);
            if (inputString) {
                const SendServerNewAdminData = await axios.post(`${process.env.REACT_APP_DB_HOST}/Login_app_servers/NewAdminData`, {
                    NewUserData,
                });
                if (SendServerNewAdminData.data.dataSuccess) {
                    alert(`
                        아이디 등록이 완료되었습니다.
                        ID: ${NewUserData.emailId}
                        Password: ${NewUserData.emailId.split('@')[0]}1234
                    `);
                    setNewUserData({
                        company: 'YIKC',
                        name: '',
                        team: '',
                        position: '',
                        emailId: '',
                    });
                } else {
                    alert('데이터 저장 실패');
                }
            } else {
                return;
            }
        } else {
            alert('이메일 주소 형식이 올바르지 않습니다.');
            return;
        }
        console.log(e);
        console.log(NewUserData);
    };

    return (
        <NewAdminInsertMainDivBox>
            <h2>재택 프로그램 사용자 등록</h2>
            <div>
                <form className="form" id="form1" onSubmit={(e: React.FormEvent<HTMLFormElement>) => handclicksServerDataSend(e)}>
                    <NewUserApplyFormBoxDiv>
                        <div className="CElogs_WriteData_FORM_Text_label">회사</div>
                        <div className="CElogs_WriteData_FORM_emoticon_div">
                            <CgSelectR></CgSelectR>
                        </div>
                        <select value={NewUserData.company} onChange={e => setNewUserData({ ...NewUserData, company: e.target.value })}>
                            <option value="YIKC">YIKC</option>
                            <option value="EXICON">EXICON</option>
                            <option value="SEMCNS">SEMCNS</option>
                        </select>
                    </NewUserApplyFormBoxDiv>
                    <NewUserApplyFormBoxDiv>
                        <div className="CElogs_WriteData_FORM_Text_label">이름</div>
                        <div className="CElogs_WriteData_FORM_emoticon_div">
                            <BsFillPencilFill></BsFillPencilFill>
                        </div>
                        <input
                            className="CElogs_WriteData_FORM_InputBox"
                            type="text"
                            placeholder="이름"
                            value={NewUserData.name}
                            onChange={e => setNewUserData({ ...NewUserData, name: e.target.value })}
                        ></input>
                    </NewUserApplyFormBoxDiv>
                    <NewUserApplyFormBoxDiv>
                        <div className="CElogs_WriteData_FORM_Text_label">부서명</div>
                        <div className="CElogs_WriteData_FORM_emoticon_div">
                            <BsFillPencilFill></BsFillPencilFill>
                        </div>
                        <input
                            type="text"
                            className="CElogs_WriteData_FORM_InputBox"
                            placeholder="부서 (ex 경영지원, H/W, S/W)"
                            value={NewUserData.team}
                            onChange={e => setNewUserData({ ...NewUserData, team: e.target.value })}
                        ></input>
                    </NewUserApplyFormBoxDiv>
                    <NewUserApplyFormBoxDiv>
                        <div className="CElogs_WriteData_FORM_Text_label">직급</div>
                        <div className="CElogs_WriteData_FORM_emoticon_div">
                            <BsFillPencilFill></BsFillPencilFill>
                        </div>

                        <input
                            type="text"
                            className="CElogs_WriteData_FORM_InputBox"
                            placeholder="직급 (ex 프로, 팀장, 그룹장)"
                            value={NewUserData.position}
                            onChange={e => setNewUserData({ ...NewUserData, position: e.target.value })}
                        ></input>
                    </NewUserApplyFormBoxDiv>
                    <NewUserApplyFormBoxDiv>
                        <div className="CElogs_WriteData_FORM_Text_label">Email 주소</div>
                        <div className="CElogs_WriteData_FORM_emoticon_div">
                            <BsFillPencilFill></BsFillPencilFill>
                        </div>

                        <input
                            className="CElogs_WriteData_FORM_InputBox"
                            type="text"
                            placeholder="Email 주소 (ex sjyoo@dhk.co.kr)"
                            value={NewUserData.emailId}
                            onChange={e => setNewUserData({ ...NewUserData, emailId: e.target.value })}
                        ></input>
                    </NewUserApplyFormBoxDiv>

                    <SubMitButton>
                        <button type="submit">사용자 등록</button>
                    </SubMitButton>
                </form>
            </div>
        </NewAdminInsertMainDivBox>
    );
};

export default NewAdminInsert;

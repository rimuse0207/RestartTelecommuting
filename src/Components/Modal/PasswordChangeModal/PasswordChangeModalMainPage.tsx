import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from '../../ToastMessage/ToastManager';
const PasswordChangeModalMainPageMainDivBox = styled.div`
    padding: 40px;
    height: 100%;
    .InputBoxContainerDiv {
        margin-top: 30px;
        margin-bottom: 30px;
        input {
            width: 100%;
            padding: 12px 20px;
            margin: 8px 0;
            display: inline-block;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
            :focus {
                outline: 1px solid #168;
            }
        }
        label {
            font-size: 1.1em;
            font-weight: bold;
        }
        .buttonBoxContainerDiv {
            text-align: end;

            button {
                width: 100px;
                height: 35px;
                margin-left: 30px;
                outline: none;
                border: none;
                border-radius: 5px;
                font-size: 0.9em;
            }
        }
        .PositionCheckDiv {
            position: relative;
            .PositionCheckDivAbsolute {
                position: absolute;
                top: -15px;
                right: 0px;
                font-size: 0.8em;
                color: gray;
            }
        }
        .buttonBoxContainerDiv {
            button:first-child {
                background-color: #b0dff2;
                color: #168;
                font-weight: bold;
                :hover {
                    cursor: pointer;
                    background-color: #79eaf7;
                }
            }
            button:nth-child(2) {
                background-color: #168;
                color: #fff;
                font-weight: bold;
                :hover {
                    cursor: pointer;
                    background-color: #288691;
                }
            }
        }
    }
`;
type PasswordChangeModalMainPageProps = {
    modalClose: () => void;
    ids: string;
};
const PasswordChangeModalMainPage = ({ modalClose, ids }: PasswordChangeModalMainPageProps) => {
    const [NewPassowrdChanged, setNewPasswordChanged] = useState({
        Nowpassword: '',
        NewPassword: '',
        NewPasswordCheck: '',
    });

    function chkPW(PasswordData: string) {
        var pw = PasswordData;
        var num = pw.search(/[0-9]/g);
        var eng = pw.search(/[a-z]/gi);
        var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

        if (pw.length < 6 || pw.length > 20) {
            toast.show({
                title: '비밀번호 변경 실패',
                content: `6자리 ~ 20자리 이내로 입력해주세요.`,
                duration: 6000,
                DataSuccess: false,
            });
            return false;
        } else if (pw.search(/\s/) !== -1) {
            toast.show({
                title: '비밀번호 변경 실패',
                content: `비밀번호는 공백 없이 입력해주세요.'`,
                duration: 6000,
                DataSuccess: false,
            });
            return false;
        } else if ((num < 0 && eng < 0) || (eng < 0 && spe < 0) || (spe < 0 && num < 0)) {
            toast.show({
                title: '비밀번호 변경 실패',
                content: `영문,숫자, 특수문자 중 2가지 이상을 혼합하여 입력해주세요.'`,
                duration: 6000,
                DataSuccess: false,
            });
            return false;
        } else {
            return true;
        }
    }

    const HandleClicksCancel = async () => {
        setNewPasswordChanged({
            Nowpassword: '',
            NewPassword: '',
            NewPasswordCheck: '',
        });
        modalClose();
    };
    const HandleClicksChanged = async () => {
        try {
            if (
                NewPassowrdChanged.Nowpassword === '' ||
                NewPassowrdChanged.NewPasswordCheck === '' ||
                NewPassowrdChanged.NewPassword === ''
            ) {
                toast.show({
                    title: '비밀번호 변경 실패',
                    content: `공백을 전부 입력 해주세요.`,
                    duration: 6000,
                    DataSuccess: false,
                });
                return;
            } else if (NewPassowrdChanged.NewPasswordCheck !== NewPassowrdChanged.NewPassword) {
                toast.show({
                    title: '비밀번호 변경 실패',
                    content: `새로운 비밀번호가 서로 다릅니다.`,
                    duration: 6000,
                    DataSuccess: false,
                });
                return;
            } else {
                const Checked = chkPW(NewPassowrdChanged.NewPassword);
                if (Checked) {
                    //성공

                    const SendFromServerForChangePassword = await axios.post(
                        `${process.env.REACT_APP_DB_HOST}/Login_app_servers/ChangePassword`,
                        {
                            ids,
                            NewPassowrdChanged,
                        }
                    );
                    if (SendFromServerForChangePassword.data.dataSuccess) {
                        if (SendFromServerForChangePassword.data.nowPasswordCheck) {
                            if (SendFromServerForChangePassword.data.ChangedPassword) {
                                toast.show({
                                    title: '비밀번호 변경 완료.',
                                    content: `비밀번호 변경이 완료 되었습니다.`,
                                    duration: 6000,
                                    DataSuccess: true,
                                });
                                setNewPasswordChanged({
                                    Nowpassword: '',
                                    NewPassword: '',
                                    NewPasswordCheck: '',
                                });
                                modalClose();
                            } else {
                                toast.show({
                                    title: '비밀번호 변경 실패',
                                    content: `비밀번호 변경 실패 다른 비밀번호 입력 바람.`,
                                    duration: 6000,
                                    DataSuccess: false,
                                });
                            }
                        } else {
                            toast.show({
                                title: '비밀번호 변경 실패',
                                content: `현재 비밀번호가 다릅니다.`,
                                duration: 6000,
                                DataSuccess: false,
                            });
                            return;
                        }
                    } else {
                        toast.show({
                            title: '비밀번호 변경 실패',
                            content: `서버와의 연결 끊김 IT팀에 문의 바람.`,
                            duration: 6000,
                            DataSuccess: false,
                        });
                        return;
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <PasswordChangeModalMainPageMainDivBox>
            <div>
                <div>
                    <h2>Change Password</h2>
                </div>
                <div>
                    <div className="InputBoxContainerDiv">
                        <label>현재 비밀번호*</label>
                        <div>
                            <input
                                type="password"
                                placeholder="현재 비밀번호를 입력해주세요."
                                value={NewPassowrdChanged.Nowpassword}
                                onChange={e => setNewPasswordChanged({ ...NewPassowrdChanged, Nowpassword: e.target.value })}
                            ></input>
                        </div>
                    </div>
                    <div className="InputBoxContainerDiv">
                        <label>새로운 비밀번호*</label>
                        <div className="PositionCheckDiv">
                            <input
                                type="password"
                                placeholder="새로운 비밀번호를 입력해주세요."
                                value={NewPassowrdChanged.NewPassword}
                                onChange={e => setNewPasswordChanged({ ...NewPassowrdChanged, NewPassword: e.target.value })}
                            ></input>
                            <div className="PositionCheckDivAbsolute">※영문,숫자, 특수문자 중 2가지 이상을 혼합한 6자리 이상</div>
                        </div>
                    </div>
                    <div className="InputBoxContainerDiv">
                        <label>새로운 비밀번호 확인*</label>
                        <div>
                            <input
                                type="password"
                                placeholder="새로운 비밀번호를 다시 입력해주세요."
                                value={NewPassowrdChanged.NewPasswordCheck}
                                onChange={e => setNewPasswordChanged({ ...NewPassowrdChanged, NewPasswordCheck: e.target.value })}
                            ></input>
                        </div>
                    </div>
                    <div className="InputBoxContainerDiv">
                        <div className="buttonBoxContainerDiv">
                            <button onClick={HandleClicksCancel}>취소</button>
                            <button onClick={HandleClicksChanged}>저장</button>
                        </div>
                    </div>
                </div>
            </div>
        </PasswordChangeModalMainPageMainDivBox>
    );
};

export default PasswordChangeModalMainPage;

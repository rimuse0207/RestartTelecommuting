import axios from 'axios';
import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { toast } from '../../ToastMessage/ToastManager';
import { CeCalendarTableProps } from '../CeCalendarMasterPage';

Modal.setAppElement('#ModalSet');
type CeCalendarUpdateModalsProps = {
    closeModal: () => void;
    getCeCalendarDatas: CeCalendarTableProps;
    hadleDeleteData: () => void;
    hadleUpdateData: (data: CeCalendarTableProps) => void;
};

const CeCalendarUpdateModalsMainDivBox = styled.div`
    table.type03 {
        border-collapse: collapse;
        text-align: left;
        line-height: 1.5;
        border-top: 1px solid #ccc;
        border-left: 3px solid #369;
        margin: 20px 10px;
    }
    table.type03 th {
        width: 147px;
        padding: 10px;
        font-weight: bold;
        vertical-align: top;
        color: #153d73;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }
    table.type03 td {
        width: 349px;
        padding: 10px;
        vertical-align: top;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }
    .Float_main_cotainer {
        ::after {
            content: '';
            display: block;
            clear: both;
        }
        .Float_Left {
            float: left;
            width: 45%;
        }
        .Float_Right {
            float: right;
            width: 45%;
            height: 100%;
            td {
                height: 100%;
                padding: 0px;
                input {
                    width: 100%;
                    height: 40px;
                    padding-left: 10px;
                }
            }
            .Modals_Update_button {
                display: flex;
                justify-content: space-between;
                margin-top: 50px;
                button {
                    width: 20%;
                    height: 40px;
                    outline: none;
                    border: none;
                    font-size: 1em;
                    font-weight: bolder;
                    border-radius: 5px;
                    :hover {
                        cursor: pointer;
                    }
                }
                .DeleteButton {
                    background-color: #efa2a2;
                }
                .UpdateButton {
                    background-color: #82f28d;
                }
                .CancleButton {
                    background-color: #80b1f2;
                }
            }
        }
    }
`;

const CeCalendarUpdateModals = ({ closeModal, getCeCalendarDatas, hadleDeleteData, hadleUpdateData }: CeCalendarUpdateModalsProps) => {
    const [UpdateCalendarData, setUpdateCalendarData] = useState<CeCalendarTableProps>(getCeCalendarDatas);
    const handleDeleteData = async () => {
        if (!window.confirm('정말 삭제 하시겠습니까?')) {
            // 취소(아니오) 버튼 클릭 시 이벤트
            return;
        }
        try {
            const DeleteDataCSM = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteCSMData`, {
                getCeCalendarDatas,
            });
            if (DeleteDataCSM.data.dataSuccess) {
                hadleDeleteData();
                closeModal();
                toast.show({
                    title: 'CSM 데이터 삭제',
                    content: `model: ${getCeCalendarDatas.ModelNumber} , 제번: ${getCeCalendarDatas.Binds}의 데이터 삭제 완료.`,
                    duration: 6000,
                    DataSuccess: true,
                });
            } else {
                toast.show({
                    title: 'CSM 데이터 삭제 실패',
                    content: `IT팀에 문의 바랍니다.`,
                    duration: 6000,
                    DataSuccess: false,
                });
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: 'CSM 데이터 삭제 실패',
                content: `IT팀에 문의 바랍니다.`,
                duration: 6000,
                DataSuccess: false,
            });
        }
    };

    const handleUpdateData = async () => {
        try {
            const UpdateDataCSM = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateDataCSM`, {
                UpdateCalendarData,
            });
            if (UpdateDataCSM.data.dataSuccess) {
                hadleUpdateData(UpdateCalendarData);
                closeModal();
                toast.show({
                    title: 'CSM 데이터 수정',
                    content: `model: ${getCeCalendarDatas.ModelNumber} , 제번: ${getCeCalendarDatas.Binds}의 데이터 수정 완료.`,
                    duration: 6000,
                    DataSuccess: true,
                });
            } else {
                toast.show({
                    title: 'CSM 데이터 수정 실패',
                    content: `IT팀에 문의 바랍니다.`,
                    duration: 6000,
                    DataSuccess: false,
                });
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: 'CSM 데이터 수정 실패',
                content: `IT팀에 문의 바랍니다.`,
                duration: 6000,
                DataSuccess: false,
            });
        }
    };

    return (
        <CeCalendarUpdateModalsMainDivBox>
            <div className="Float_main_cotainer">
                <div className="Float_Left">
                    <h2>변경 전 데이터</h2>
                    <table className="type03">
                        <tr>
                            <th scope="row">상태</th>
                            <td>{getCeCalendarDatas.state}</td>
                        </tr>
                        <tr>
                            <th scope="row">등급</th>
                            <td>{getCeCalendarDatas.grade}</td>
                        </tr>
                        <tr>
                            <th scope="row">발행일</th>
                            <td>{getCeCalendarDatas.issue_date}</td>
                        </tr>
                        <tr>
                            <th scope="row">CSM</th>
                            <td>{getCeCalendarDatas.CSMNumber}</td>
                        </tr>
                        <tr>
                            <th scope="row">MODEL</th>
                            <td>{getCeCalendarDatas.ModelNumber}</td>
                        </tr>
                        <tr>
                            <th scope="row">제번</th>
                            <td>{getCeCalendarDatas.Binds}</td>
                        </tr>
                        <tr>
                            <th scope="row">고객사</th>
                            <td>{getCeCalendarDatas.custom}</td>
                        </tr>
                    </table>
                </div>
                <div className="Float_Right">
                    <h2>변경 할 데이터</h2>
                    <table className="type03">
                        <tr>
                            <th scope="row">상태</th>
                            <td>
                                <input
                                    value={UpdateCalendarData.state}
                                    onChange={e => setUpdateCalendarData({ ...UpdateCalendarData, state: e.target.value })}
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">등급</th>
                            <td>
                                <input
                                    value={UpdateCalendarData.grade}
                                    onChange={e => setUpdateCalendarData({ ...UpdateCalendarData, grade: e.target.value })}
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">발행일</th>
                            <td>
                                <input
                                    type="date"
                                    value={UpdateCalendarData.issue_date}
                                    onChange={e => setUpdateCalendarData({ ...UpdateCalendarData, issue_date: e.target.value })}
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">CSM</th>
                            <td>
                                <input
                                    value={UpdateCalendarData.CSMNumber}
                                    onChange={e => setUpdateCalendarData({ ...UpdateCalendarData, CSMNumber: e.target.value })}
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">MODEL</th>
                            <td>
                                <input
                                    value={UpdateCalendarData.ModelNumber}
                                    onChange={e => setUpdateCalendarData({ ...UpdateCalendarData, ModelNumber: e.target.value })}
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">제번</th>
                            <td>
                                <input
                                    value={UpdateCalendarData.Binds}
                                    onChange={e => setUpdateCalendarData({ ...UpdateCalendarData, Binds: e.target.value })}
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">고객사</th>
                            <td>
                                <input
                                    value={UpdateCalendarData.custom}
                                    onChange={e => setUpdateCalendarData({ ...UpdateCalendarData, custom: e.target.value })}
                                ></input>
                            </td>
                        </tr>
                    </table>
                    <div className="Modals_Update_button">
                        <button className="DeleteButton" onClick={handleDeleteData}>
                            삭제
                        </button>
                        <button className="UpdateButton" onClick={handleUpdateData}>
                            수정
                        </button>
                        <button className="CancleButton" onClick={() => closeModal()}>
                            취소
                        </button>
                    </div>
                </div>
            </div>
        </CeCalendarUpdateModalsMainDivBox>
    );
};

export default CeCalendarUpdateModals;

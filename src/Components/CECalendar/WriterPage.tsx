import axios from 'axios';
import React, { useState } from 'react';
import { BsFillPencilFill } from 'react-icons/bs';

import './WriteData.css';

type dataInsertOnProps = {
    dataInsertOn: () => void;
    closeModal: () => void;
};

const WriterPage = ({ dataInsertOn, closeModal }: dataInsertOnProps) => {
    const [stateData, setStateData] = useState('Close');
    const [gradeData, setGradeData] = useState('SDC');
    const [CSMNumberData, setCSMNumberData] = useState('');
    const [ModelNumberData, setModelNumberData] = useState('');
    const [BindsData, setBindsData] = useState('');
    const [customData, setCustomData] = useState('');
    const [issue_date, setissue_date] = useState('');

    const handleClicks = async (e: any) => {
        e.preventDefault();
        if (stateData && gradeData && CSMNumberData && ModelNumberData && BindsData && customData) {
            const DataAddCeCalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DataSaved`, {
                stateData,
                gradeData,
                issue_date,
                CSMNumberData,
                ModelNumberData,
                BindsData,
                customData,
            });
            if (DataAddCeCalendar.data.dataSuccess) {
                dataInsertOn();
                closeModal();
                window.location.reload();
            } else {
                alert('에러 발생');
            }
        } else {
            alert('공란을 전부 입력 해주세요.');
        }
    };
    return (
        <div style={{ textAlign: 'start' }}>
            <div>
                <h2>데이터 추가</h2>

                <div style={{ padding: '20px' }}>
                    <form onSubmit={e => handleClicks(e)}>
                        <div className="CElogs_WriteData_FORM_div_box">
                            <div className="CElogs_WriteData_FORM_Text_label">상태</div>
                            <div className="CElogs_WriteData_FORM_emoticon_div">
                                <BsFillPencilFill></BsFillPencilFill>
                            </div>
                            <input
                                className="CElogs_WriteData_FORM_InputBox"
                                type="text"
                                value={stateData}
                                onChange={e => setStateData(e.target.value)}
                                placeholder="상태"
                            ></input>
                        </div>
                        <div className="CElogs_WriteData_FORM_div_box">
                            <div className="CElogs_WriteData_FORM_Text_label">등급</div>
                            <div className="CElogs_WriteData_FORM_emoticon_div">
                                <BsFillPencilFill></BsFillPencilFill>
                            </div>
                            <input
                                type="text"
                                className="CElogs_WriteData_FORM_InputBox"
                                value={gradeData}
                                onChange={e => setGradeData(e.target.value)}
                                placeholder="등급"
                            ></input>
                        </div>
                        <div className="CElogs_WriteData_FORM_div_box">
                            <div className="CElogs_WriteData_FORM_Text_label">발행일</div>
                            <div className="CElogs_WriteData_FORM_emoticon_div">
                                <BsFillPencilFill></BsFillPencilFill>
                            </div>
                            <input
                                type="date"
                                className="CElogs_WriteData_FORM_InputBox"
                                value={issue_date}
                                onChange={e => setissue_date(e.target.value)}
                                placeholder="등급"
                            ></input>
                        </div>
                        <div className="CElogs_WriteData_FORM_div_box">
                            <div className="CElogs_WriteData_FORM_Text_label">CSM</div>
                            <div className="CElogs_WriteData_FORM_emoticon_div">
                                <BsFillPencilFill></BsFillPencilFill>
                            </div>

                            <input
                                type="text"
                                className="CElogs_WriteData_FORM_InputBox"
                                value={CSMNumberData}
                                onChange={e => setCSMNumberData(e.target.value)}
                                placeholder="CSM"
                            ></input>
                        </div>
                        <div className="CElogs_WriteData_FORM_div_box">
                            <div className="CElogs_WriteData_FORM_Text_label">MODEL</div>
                            <div className="CElogs_WriteData_FORM_emoticon_div">
                                <BsFillPencilFill></BsFillPencilFill>
                            </div>

                            <input
                                className="CElogs_WriteData_FORM_InputBox"
                                type="text"
                                value={ModelNumberData}
                                onChange={e => setModelNumberData(e.target.value)}
                                placeholder="MODEL"
                            ></input>
                        </div>
                        <div className="CElogs_WriteData_FORM_div_box">
                            <div className="CElogs_WriteData_FORM_Text_label">제번</div>
                            <div className="CElogs_WriteData_FORM_emoticon_div">
                                <BsFillPencilFill></BsFillPencilFill>
                            </div>

                            <input
                                className="CElogs_WriteData_FORM_InputBox"
                                type="text"
                                value={BindsData}
                                onChange={e => setBindsData(e.target.value)}
                                placeholder="제번"
                            ></input>
                        </div>
                        <div className="CElogs_WriteData_FORM_div_box">
                            <div className="CElogs_WriteData_FORM_Text_label">고객사</div>
                            <div className="CElogs_WriteData_FORM_emoticon_div">
                                <BsFillPencilFill></BsFillPencilFill>
                            </div>

                            <input
                                className="CElogs_WriteData_FORM_InputBox"
                                type="text"
                                value={customData}
                                onChange={e => setCustomData(e.target.value)}
                                placeholder="고객사"
                            ></input>
                        </div>
                        <div style={{ textAlign: 'end', width: '50%' }}>
                            <button className="CElogs_WriteData_FORM_ButtonBox" type="submit">
                                저장
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default WriterPage;

import React from 'react';

type PersonPartsSelectClickModalProps = {
    clicksTitle: object | any;
    clicksData: object | any;
    modalClose: () => void;
};

const PersonPartsSelectClickModal = ({ clicksTitle, clicksData, modalClose }: PersonPartsSelectClickModalProps) => {
    return (
        <div>
            <div>
                <h1>{clickData.write_date}</h1>
                <div className="all_desc">
                    <div className="left_desc">
                        <h2>작성자: {clickData.writer}</h2>
                        <h4>작성 날짜: {moment(clickData.write_auto_date).format('YYYY-MM-DD HH:MM')}</h4>
                        <div className="text_label">Part.</div>
                        {updateOn ? (
                            <input
                                type="text"
                                value={part}
                                onChange={e => setParts(e.target.value)}
                                placeholder="Part부문을 입력 해주세요."
                                className="Input_box"
                            ></input>
                        ) : (
                            <div>{clickData.partdesc}</div>
                        )}

                        <div className="text_label" style={{ marginTop: '20px' }}>
                            내용.
                        </div>
                        {updateOn ? (
                            <textarea
                                className="textarea_box"
                                value={desc}
                                onChange={e => setDesc(e.target.value)}
                                placeholder="내용을 작성 해주세요."
                            ></textarea>
                        ) : (
                            <div>
                                <pre>{clickData.describes}</pre>
                            </div>
                        )}

                        {clickData.colorCheck === 3 ? (
                            <></>
                        ) : clickData.writer === localStorage.getItem('name') ? (
                            updateOn ? (
                                <button className="button_box" onClick={() => handleUpdateData(clickData.indexs)}>
                                    수정 저장하기
                                </button>
                            ) : (
                                <button
                                    className="button_box"
                                    onClick={() => {
                                        setUpdateOn(true);
                                        setParts(clickData.partdesc);
                                        setDesc(clickData.describes);
                                    }}
                                >
                                    수정하기
                                </button>
                            )
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="right_desc">
                        {clickData.colorCheck === 3 ? (
                            <div>
                                <h2>확인자: {clickData.Checkname}</h2>
                                <h4>확인 날짜: {moment(clickData.check_date).format('YYYY-MM-DD HH:MM')}</h4>
                                <div className="text_label">코멘트 내용:</div>
                                <div>
                                    <pre>{clickData.comment}</pre>
                                </div>
                            </div>
                        ) : (
                            <>
                                <h2>확인자: {localStorage.getItem('name')}</h2>
                                <textarea
                                    className="textarea_box"
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                    placeholder="코멘트 입력"
                                ></textarea>
                                <button onClick={handleChecked} className="button_box">
                                    확인하기
                                </button>
                            </>
                        )}
                        {clickData.writer === localStorage.getItem('name') ? (
                            <button
                                onClick={() => handleDelete(clickData.indexs)}
                                style={{ display: 'block', marginTop: '30px', backgroundColor: 'red' }}
                                className="button_box"
                            >
                                삭제하기
                            </button>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonPartsSelectClickModal;

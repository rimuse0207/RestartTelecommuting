import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        // top: '50%',
        // left: '50%',
        // right: 'auto',
        // bottom: 'auto',
        // marginRight: '-50%',
        // transform: 'translate(-50%, -50%)',

        top: '0px',
        left: '0px',
        padding: '60px',
        margin: '0px',
        height: '100%',
        width: '100%',
    },
};
Modal.setAppElement('#ModalOTDetail');

type TeamOTPrinterModalProps = {
    modalIsOpen: boolean;
    closeModal: () => void;
    showdatas: any;
    selectTeam: string;
    selectYear: string;
    selectMonth: string;
};

const TeamOTPrinterModal = ({ modalIsOpen, closeModal, showdatas, selectTeam, selectYear, selectMonth }: TeamOTPrinterModalProps) => {
    useEffect(() => {
        if (modalIsOpen) {
            setTimeout(() => {
                window.print();
                closeModal();
            }, 100);
        }
    }, [showdatas, selectTeam, modalIsOpen]);
    return (
        <div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                <div className="TeamOTPrintermodal_big_box_div">
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={4} rowSpan={2}>
                                    <h3>
                                        {selectTeam.toUpperCase()}팀
                                        <br />
                                        연장(휴일) 근무 실시보고서
                                    </h3>
                                </th>
                                <th style={{ background: '#c9cc51', width: '150px' }}>작성자</th>
                                <th style={{ background: '#c9cc51', width: '150px' }}>검토</th>
                                <th style={{ background: '#c9cc51', width: '150px' }}>승인</th>
                            </tr>
                            <tr>
                                <td style={{ height: '60px', background: 'white' }}></td>
                                <td style={{ height: '60px', background: 'white' }}></td>
                                <td style={{ height: '60px', background: 'white' }}></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ fontWeight: 'bolder' }}>근무년월</td>
                                <td colSpan={2} style={{ fontWeight: 'bolder' }}>{`${selectYear}년 ${selectMonth}월`}</td>

                                <td colSpan={4}>OT 시간</td>
                            </tr>
                            <tr>
                                <td>순서</td>
                                <td>성명</td>
                                <td>부서명</td>
                                <td colSpan={2}>연장</td>
                                <td>휴일</td>
                                <td>합계</td>
                            </tr>

                            {showdatas.map(
                                (list: { name: string; sumTimes: number; nightTimes: number; holidaySum_time: number }, i: number) => {
                                    return (
                                        <>
                                            <tr style={{ height: '20px' }}>
                                                <td rowSpan={2}>{i + 1}</td>
                                                <td rowSpan={2}>{list.name}</td>
                                                <td rowSpan={2} style={{ width: '150px;' }}>
                                                    {selectTeam.toUpperCase()}팀
                                                </td>
                                                <td rowSpan={2}>
                                                    {list.sumTimes - list.holidaySum_time > 0
                                                        ? list.sumTimes - list.holidaySum_time + ' 시간'
                                                        : ''}
                                                </td>
                                                <td style={{ background: '#c9cc51', height: '10px', fontSize: 'xx-small' }}>심야</td>
                                                <td rowSpan={2}>{list.holidaySum_time > 0 ? list.holidaySum_time + ' 시간' : ''}</td>
                                                <td rowSpan={2}>{list.sumTimes > 0 ? list.sumTimes + ' 시간' : ''}</td>
                                            </tr>
                                            <tr>
                                                {list.nightTimes > 0 ? (
                                                    <td>{list.nightTimes > 0 ? list.nightTimes + ' 시간' : ''}</td>
                                                ) : (
                                                    <></>
                                                )}

                                                {list.nightTimes === 0 ? (
                                                    <td style={{ color: 'none', opacity: 0 }}>{list.nightTimes === 0 ? '.' : ''}</td>
                                                ) : (
                                                    <></>
                                                )}
                                            </tr>
                                        </>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                </div>
            </Modal>
        </div>
    );
};

export default TeamOTPrinterModal;

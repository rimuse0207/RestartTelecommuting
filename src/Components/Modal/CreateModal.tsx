import React, { useState } from 'react';
import Modal from 'react-modal';
import CompanyIn from './CompanyIn';
import CompanyOut from './CompanyOut';
import TeleWorking from './TeleWorking';
import ApplyState from './ApplyState';
import './CreateModal.css';

Modal.setAppElement('#ModalSet');
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        height: '80%',
        background: '#efefef',
    },
};
type CreateModalProps = {
    onClicked: boolean;
    modalClose: () => void;
};
const CreateModal = ({ onClicked, modalClose }: CreateModalProps) => {
    const [menubarStatus, setMenubarStatus] = useState([
        {
            selected: true,
            names: '작성 현황',
        },
        {
            selected: false,
            names: '내 근',
        },
        {
            selected: false,
            names: '외 근',
        },
        {
            selected: false,
            names: '재 택',
        },
    ]);
    const menuSelected = (list: { selected: boolean; names: string }) => {
        setMenubarStatus(
            menubarStatus.map(item => {
                return item.names === list.names ? { ...item, selected: true } : { ...item, selected: false };
            })
        );
    };
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        //subtitle.style.color = '#f00';
    }
    function closeModal() {
        modalClose();
    }
    return (
        <div>
            <Modal
                isOpen={onClicked}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="재택 근무 시스템 모달"
            >
                <div className="Modal_program_big_div">
                    <div className="Modal_program_close_button_div">
                        <button onClick={closeModal}>닫기</button>
                    </div>
                    <div>
                        <h2>일별 근무 현황 작성</h2>
                        <div className="Modal_program_menu_bar">
                            <ul>
                                {menubarStatus.map((list, i) => {
                                    return (
                                        <li
                                            onClick={() => menuSelected(list)}
                                            key={list.names}
                                            className={list.selected ? 'Modal_program_menu_selected' : ''}
                                        >
                                            {list.names}
                                        </li>
                                    );
                                })}
                            </ul>
                            <>
                                {menubarStatus.map((list, i) => {
                                    return list.selected ? (
                                        list.names === '내 근' ? (
                                            <CompanyIn></CompanyIn>
                                        ) : list.names === '외 근' ? (
                                            <CompanyOut></CompanyOut>
                                        ) : list.names === '재 택' ? (
                                            <TeleWorking></TeleWorking>
                                        ) : list.names === '작성 현황' ? (
                                            <ApplyState></ApplyState>
                                        ) : (
                                            <div>서버와의 연결 끊김</div>
                                        )
                                    ) : (
                                        <></>
                                    );
                                })}
                            </>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default CreateModal;

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import './CreateModal.css';
import DatePickerComponents from './DatePickerComponents';

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
        height: '95%',
        background: '#efefef',
    },
};
type CreateModalProps = {
    onClicked: boolean;
    modalClose: () => void;
    clicksData: string | null;
};
const CreateModal = ({ onClicked, modalClose, clicksData }: CreateModalProps) => {
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        //subtitle.style.color = '#f00';
    }
    function closeModal() {
        modalClose();
    }
    useEffect(() => {
        document.body.style.cssText = `
          position: fixed; 
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 100%;`;
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        };
    }, []);
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
                        <h2>일별 작성</h2>
                        <div>
                            <DatePickerComponents clicksData={clicksData}></DatePickerComponents>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default CreateModal;

import React, { useEffect } from 'react';
import SelectClickModal from './USB/CDSelectClickModal';
import Modal from 'react-modal';
import './SelectClickModal.css';
type SelectClickModalMainPageProps = {
    onClicked: boolean;
    modalClose: () => void;
    clicksData: any | null;
    clicksTitle: string;
};
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        height: '80%',
    },
};
Modal.setAppElement('#ModalSet');

const SelectClickModalMainPage = ({ onClicked, modalClose, clicksData, clicksTitle }: SelectClickModalMainPageProps) => {
    useEffect(() => {
        console.log(clicksData);
    }, [clicksData]);
    return (
        <div>
            <Modal isOpen={onClicked} style={customStyles} onRequestClose={modalClose}>
                <SelectClickModal clicksTitle={clicksTitle} clicksData={clicksData} modalClose={modalClose}></SelectClickModal>
            </Modal>
        </div>
    );
};

export default SelectClickModalMainPage;

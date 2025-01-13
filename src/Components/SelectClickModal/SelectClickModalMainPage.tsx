import React, { useEffect } from 'react';
import CDSelectClickModal from './USB/CDSelectClickModal';
import TeleSelectClickModal from './Tele/TeleSelectClickModal';
import FoodSelectClickModal from './Food/FoodSelectClickModal';
import Modal from 'react-modal';
import './SelectClickModal.css';
import PersonTeleSelectClickModal from './Tele/PersonTeleSelectClickModal';
import PersonSelectClickModal from './USB/PersonCDSelectClickModal';
import BeforeSelectClickModal from './OT/BeforeSelectClickModal';
import AfterSelectClickModal from './OT/AfterSelectClickModal';
import TeamLeaderBeforeSelectClickModal from './OT/TeamLeaderBeforeSelectClickModal';
import TeamLeaderAfterSelectClickModal from './OT/TeamLeaderAfterSelectClickModal';
import PersonPartsSelectClickModal from './Parts/PersonPartsSelectClickModal';
type SelectClickModalMainPageProps = {
    onClicked: boolean;
    modalClose: () => void;
    clicksData: any | null;
    clicksTitle: string | null;
    setClicksData: (data: {}) => void | null | any;
};
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        height: '90%',
    },
};
Modal.setAppElement('#ModalSet');

const SelectClickModalMainPage = ({ onClicked, modalClose, clicksData, clicksTitle, setClicksData }: any) => {
    return (
        <div id="SelectMODAL">
            <Modal isOpen={onClicked} style={customStyles} onRequestClose={modalClose}>
                <div style={{ position: 'relative', top: '-20px', right: '-20px' }}>
                    <div className="SelectClicksModalMainPage_deleteBox_button" onClick={modalClose}>
                        X
                    </div>
                </div>
                {/* USB 관련 모달 */}
                {clicksTitle === 'USB/CD' ? (
                    <CDSelectClickModal clicksTitle={clicksTitle} clicksData={clicksData} modalClose={modalClose}></CDSelectClickModal>
                ) : (
                    <div></div>
                )}
                {/* 재택 근무 관련 모달 */}
                {clicksTitle === 'Telecommuting' ? (
                    <TeleSelectClickModal
                        clicksTitle={clicksTitle}
                        clicksData={clicksData}
                        modalClose={modalClose}
                        setClicksData={(data: {}) => setClicksData(data)}
                    ></TeleSelectClickModal>
                ) : (
                    <div></div>
                )}
                {/* 식대정산 관련 모달 */}
                {clicksTitle === 'Food' ? (
                    <FoodSelectClickModal clicksTitle={clicksTitle} clicksData={clicksData} modalClose={modalClose}></FoodSelectClickModal>
                ) : (
                    <div></div>
                )}

                {clicksTitle === 'Person_Parts' ? (
                    <div>
                        <PersonPartsSelectClickModal
                            clicksTitle={clicksTitle}
                            clicksData={clicksData}
                            modalClose={modalClose}
                        ></PersonPartsSelectClickModal>
                    </div>
                ) : (
                    <div></div>
                )}
                {/* OT관련 모달 */}
                {clicksTitle === 'BeforeOT' ? (
                    <BeforeSelectClickModal
                        clicksTitle={clicksTitle}
                        clicksData={clicksData}
                        modalClose={modalClose}
                    ></BeforeSelectClickModal>
                ) : (
                    <div></div>
                )}
                {clicksTitle === 'AfterOT' ? (
                    <AfterSelectClickModal
                        clicksTitle={clicksTitle}
                        clicksData={clicksData}
                        modalClose={modalClose}
                    ></AfterSelectClickModal>
                ) : (
                    <div></div>
                )}
                {/* 팀장 관련 OT  */}
                {clicksTitle === 'TeamLeaderBeforeOT' ? (
                    <TeamLeaderBeforeSelectClickModal
                        clicksTitle={clicksTitle}
                        clicksData={clicksData}
                        modalClose={modalClose}
                    ></TeamLeaderBeforeSelectClickModal>
                ) : (
                    <div></div>
                )}
                {clicksTitle === 'TeamLeaderAfterOT' ? (
                    <TeamLeaderAfterSelectClickModal
                        clicksTitle={clicksTitle}
                        clicksData={clicksData}
                        modalClose={modalClose}
                    ></TeamLeaderAfterSelectClickModal>
                ) : (
                    <div></div>
                )}

                {clicksTitle === 'Person_Telecommuting' ? (
                    <PersonTeleSelectClickModal
                        clicksTitle={clicksTitle}
                        clicksData={clicksData}
                        modalClose={modalClose}
                    ></PersonTeleSelectClickModal>
                ) : (
                    <div></div>
                )}
                {clicksTitle === 'Person_USB/CD' ? (
                    <PersonSelectClickModal
                        clicksTitle={clicksTitle}
                        clicksData={clicksData}
                        modalClose={modalClose}
                    ></PersonSelectClickModal>
                ) : (
                    <div></div>
                )}
            </Modal>
        </div>
    );
};

export default SelectClickModalMainPage;

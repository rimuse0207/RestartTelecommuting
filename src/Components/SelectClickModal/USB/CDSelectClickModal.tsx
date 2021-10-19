import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { toast } from '../../ToastMessage/ToastManager';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../models';
import { TeamLeader_getUSBCDThunk } from '../../../models/TeamLeader_Thunk_models/TeamLeaderUSBCDData';
type SelectClickModalProps = {
    clicksTitle: string;
    clicksData: any | null;
    modalClose: () => void;
};

const SelectClickModal = ({ clicksTitle, clicksData, modalClose }: SelectClickModalProps) => {
    const dispatch = useDispatch();
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const handleDataClick = async () => {
        const TeamLeaderAccept = await axios.post(`${process.env.REACT_APP_API_URL}/USB_app_server/TeamLeader_Accept`, {
            clicksData,
        });
        if (TeamLeaderAccept.data.updateChecked) {
            dispatch(TeamLeader_getUSBCDThunk(clicksData.workdate, InfomationState));
            toast.show({
                title: '팀장 승인 완료.',
                content: `${clicksData.name}팀원의 USB/CD 사전신청한 부문에 승인하였습니다.`,
                duration: 6000,
            });
            modalClose();
        } else {
            toast.show({
                title: '팀장 승인 실패.',
                content: `다시 한번 시도 후 실패 시 IT팀에 문의 바랍니다.`,
                duration: 6000,
            });
        }
    };
    return (
        <div>
            <div>
                <table style={{ fontWeight: 'bolder', width: '100%', tableLayout: 'fixed' }}>
                    <thead>
                        <tr>
                            <th style={{ width: '150px' }}>구분</th>
                            <th>USB/CD 신청 조회</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ textAlign: 'center' }}>이름</td>
                            <td style={{ padding: '15px' }}>{clicksData.name}</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' }}>사용일자</td>
                            <td style={{ padding: '15px' }}>{moment(clicksData.workdate).format('YYYY년 MM월 DD일')}</td>
                        </tr>

                        <tr>
                            <td style={{ textAlign: 'center' }}>장비</td>
                            <td style={{ padding: '15px' }}>{clicksData.equipment}</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' }}>파일명</td>
                            <td style={{ padding: '15px' }}>{clicksData.filename}</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' }}>USB소유</td>
                            <td style={{ padding: '15px' }}>{clicksData.ownership}</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' }}>사용사유</td>
                            <td style={{ padding: '15px' }}>{clicksData.text}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style={{ width: '100%', textAlign: 'end', paddingRight: '30px', marginTop: '30px' }}>
                {clicksData.leadercheck === 0 ? (
                    <button className="TeamLeaderAcceptDesc" onClick={handleDataClick}>
                        승인하기
                    </button>
                ) : (
                    <div className="AcceptOkayDiv" onClick={() => modalClose()}>
                        승인 완료.
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectClickModal;

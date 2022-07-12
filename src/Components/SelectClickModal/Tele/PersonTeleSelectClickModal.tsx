import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { toast } from '../../ToastMessage/ToastManager';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../models/index';
import { TeamLeader_getTelecommutingThunk } from '../../../models/TeamLeader_Thunk_models/TeamLeaderTelecommutingData';
import { OneParamsPost } from '../../API/POSTApi/PostApi';
type TeleSelectClickModalProps = {
    clicksTitle: string;
    clicksData: any | null;
    modalClose: () => void;
};

const PersonTeleSelectClickModal = ({ clicksTitle, clicksData, modalClose }: TeleSelectClickModalProps) => {
    const CommentInput = useRef<any>(null);
    const dispatch = useDispatch();

    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const [DetailTeleData, setDetailTeleData] = useState({
        stat_t: '00:00',
        end_t: '00:00',
    });

    useEffect(() => {
        getSomeData(clicksData);
    }, [clicksData]);

    const getSomeData = async (clicksData: any) => {
        try {
            const paramsData = { date: moment(clicksData.day).format('YYYY-MM-DD'), id: clicksData.id };
            const getSomeDatas = await OneParamsPost(`/Tele_app_server/getSumWrokData`, paramsData);
            if (getSomeDatas.data.dataSuccess) {
                setDetailTeleData(getSomeDatas.data.data[0]);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <div>
                <table style={{ fontWeight: 'bolder', width: '100%', tableLayout: 'fixed' }}>
                    <thead>
                        <tr>
                            <th style={{ width: '150px' }}>구분</th>
                            <th>재택근무 조회</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ textAlign: 'center' }}>이름</td>
                            <td style={{ padding: '15px' }}>{clicksData.name}</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' }}>재택일자</td>
                            <td style={{ padding: '15px' }}>{moment(clicksData.day).format('YYYY년 MM월 DD일')}</td>
                        </tr>

                        <tr>
                            <td style={{ textAlign: 'center' }}>시작 시간</td>
                            <td style={{ padding: '15px' }}>{DetailTeleData.stat_t}</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' }}>종료 시간</td>
                            <td style={{ padding: '15px' }}>{DetailTeleData.end_t}</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' }}>업무 일지</td>
                            <td style={{ padding: '15px' }}>
                                <pre>{clicksData.work}</pre>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style={{ width: '100%', textAlign: 'end', paddingRight: '30px', marginTop: '30px' }}>
                {clicksData.approve === 0 ? (
                    <div style={{ color: '#f78a8a' }} className="AcceptOkayDiv" onClick={() => modalClose()}>
                        승인확인중...
                    </div>
                ) : (
                    <div className="AcceptOkayDiv" onClick={() => modalClose()}>
                        승인 완료.
                    </div>
                )}
            </div>
        </div>
    );
};

export default PersonTeleSelectClickModal;

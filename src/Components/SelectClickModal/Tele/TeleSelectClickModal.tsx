import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { toast } from '../../ToastMessage/ToastManager';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../models/index';
import { TeamLeader_getTelecommutingThunk } from '../../../models/TeamLeader_Thunk_models/TeamLeaderTelecommutingData';
import { DecryptKey } from '../../../config';
import { OneParamsPost } from '../../API/POSTApi/PostApi';
import 'moment/locale/ko';

type TeleSelectClickModalProps = {
    clicksTitle: string;
    clicksData: any | null;
    modalClose: () => void;
    setClicksData: (data: {}) => void;
};

const TeleSelectClickModal = ({ clicksTitle, clicksData, modalClose, setClicksData }: TeleSelectClickModalProps) => {
    moment.locale('ko');
    const CommentInput = useRef<any>(null);
    const dispatch = useDispatch();
    const [commentDataOn, setCommentDataOn] = useState(true);
    const [commentDesc, setCommentDesc] = useState('');

    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const [DetailTeleData, setDetailTeleData] = useState({
        stat_t: '00:00',
        end_t: '00:00',
    });

    const handleCommentSend = async () => {
        try {
            const paramsData = {
                id: DecryptKey(InfomationState.id),
                name: DecryptKey(InfomationState.name),
                team: InfomationState.team,
                position: InfomationState.position,
                commentDesc,
                clicksData,
            };
            const SendCommentData = await OneParamsPost(`/OT_app_server/commentMailSend`, paramsData);
            if (SendCommentData.data.dataSuccess) {
                setCommentDesc('');
                setCommentDataOn(true);
                toast.show({
                    title: '코멘트 이메일 발송 성공.',
                    content: `${clicksData.name} 팀원의 재택근무 코멘트 이메일 발송되었습니다.`,
                    duration: 6000,
                    DataSuccess: true,
                });
            } else {
                toast.show({
                    title: '코멘트 이메일 발송 실패.',
                    content: `${clicksData.name} 팀원의 코멘트 이메일 발송에 실패하였습니다.`,
                    duration: 6000,
                    DataSuccess: false,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleDataClick = async () => {
        try {
            const paramsData = { clicksData };
            const getSomeDatas = await OneParamsPost(`/Tele_app_server/TeamLeaderAccept_Tele`, paramsData);
            if (getSomeDatas.data.dataSuccess) {
                dispatch(TeamLeader_getTelecommutingThunk(moment(clicksData.day).format('YYYY-MM'), InfomationState));
                toast.show({
                    title: '팀장 승인 완료.',
                    content: `${clicksData.name} 팀원의 ${moment(clicksData.day).format(
                        'YYYY년 MM월 DD일'
                    )} 재택근무 부문에 승인하였습니다.`,
                    duration: 6000,
                    DataSuccess: true,
                });
                modalClose();
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getSomeData(clicksData);
    }, [clicksData]);
    useEffect(() => {
        if (CommentInput.current) {
            CommentInput.current.focus();
        }
    }, [commentDataOn]);
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
    const handleNextData = async (types: string) => {
        try {
            const paramsData = { clicksData };
            if (types === 'pre') {
                const PreDataTeleModal = await OneParamsPost(`/Tele_app_server/GetPreDataTeleModal`, paramsData);
                if (PreDataTeleModal.data.dataSuccess) {
                    if (PreDataTeleModal.data.dataMessage) {
                        toast.show({
                            title: `${PreDataTeleModal.data.message}`,
                            content: `${clicksData.name}팀원의 ${moment(clicksData.day).format(
                                'YYYY년 MM월 DD일'
                            )} 이전 데이터가 없습니다.`,
                            duration: 6000,
                            DataSuccess: false,
                        });
                    } else {
                        setClicksData(PreDataTeleModal.data.data[0]);
                    }
                }
            } else if (types === 'next') {
                const PreDataTeleModal = await OneParamsPost(`/Tele_app_server/GetNextDataTeleModal`, paramsData);
                if (PreDataTeleModal.data.dataSuccess) {
                    if (PreDataTeleModal.data.dataMessage) {
                        toast.show({
                            title: `${PreDataTeleModal.data.message}`,
                            content: `${clicksData.name}팀원의 ${moment(clicksData.day).format(
                                'YYYY년 MM월 DD일'
                            )} 이후의 데이터가 없습니다.`,
                            duration: 6000,
                            DataSuccess: false,
                        });
                    } else {
                        setClicksData(PreDataTeleModal.data.data[0]);
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <div>
                <div style={{ textAlign: 'center' }}>
                    <div
                        onClick={() => handleNextData('pre')}
                        className="Tele_modal_View"
                        style={{ display: 'inline', fontSize: '1.5em', fontWeight: 'bolder' }}
                    >
                        {'<<<<'}
                    </div>
                    <h2 style={{ display: 'inline', fontSize: '1.7em', fontWeight: 'bolder', margin: '0 15px' }}>
                        {moment(clicksData.day).lang('ko').format('YYYY년 MM월 DD일 dddd')}
                    </h2>
                    <div
                        onClick={() => handleNextData('next')}
                        className="Tele_modal_View"
                        style={{ display: 'inline', fontSize: '1.5em', fontWeight: 'bolder' }}
                    >
                        {'>>>>'}
                    </div>
                </div>
            </div>
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
                            <td style={{ padding: '15px' }}>{moment(clicksData.day).lang('ko').format('YYYY년 MM월 DD일 dddd')}</td>
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
                    <div>
                        <button className="TeamLeaderAcceptDesc" onClick={handleDataClick}>
                            승인하기
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="AcceptOkayDiv" onClick={() => modalClose()}>
                            승인 완료.
                        </div>
                    </div>
                )}
            </div>
            <div>
                {commentDataOn ? (
                    <div>
                        <button
                            className="TeamLeaderAcceptDesc"
                            onClick={() => {
                                setCommentDataOn(false);
                            }}
                        >
                            코멘트발송
                        </button>
                    </div>
                ) : (
                    <div>
                        <button className="TeamLeaderCommentWrite" onClick={handleCommentSend}>
                            이메일 전송
                        </button>
                    </div>
                )}
            </div>
            <div>
                {commentDataOn ? (
                    ''
                ) : (
                    <div className="comment_div_box">
                        <div>재택 코멘트</div>
                        <textarea
                            ref={CommentInput}
                            className="comment_textarea_box"
                            value={commentDesc}
                            onChange={e => setCommentDesc(e.target.value)}
                            placeholder="전송하실 이메일 내용을 작성해주세요."
                        ></textarea>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeleSelectClickModal;

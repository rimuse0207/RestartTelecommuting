import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { toast } from '../../ToastMessage/ToastManager';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../models/index';
import { TeamLeader_getTelecommutingThunk } from '../../../models/TeamLeader_Thunk_models/TeamLeaderTelecommutingData';
type TeleSelectClickModalProps = {
    clicksTitle: string;
    clicksData: any | null;
    modalClose: () => void;
};

const TeleSelectClickModal = ({ clicksTitle, clicksData, modalClose }: TeleSelectClickModalProps) => {
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
            console.log(commentDesc);
            setCommentDesc('');
            setCommentDataOn(true);
        } catch (error) {
            console.log(error);
        }
    };
    const handleDataClick = async () => {
        try {
            const getSomeDatas = await axios.post(`${process.env.REACT_APP_API_URL}/Tele_app_server/TeamLeaderAccept_Tele`, {
                clicksData,
            });
            if (getSomeDatas.data.dataSuccess) {
                dispatch(TeamLeader_getTelecommutingThunk(moment(clicksData.day).format('YYYY-MM'), InfomationState));
                toast.show({
                    title: '팀장 승인 완료.',
                    content: `${clicksData.name} 팀원의 재택근무 부문에 승인하였습니다.`,
                    duration: 6000,
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

    const getSomeData = async (clicksData: any) => {
        try {
            const getSomeDatas = await axios.post(`${process.env.REACT_APP_API_URL}/Tele_app_server/getSumWrokData`, {
                date: moment(clicksData.day).format('YYYY-MM-DD'),
                id: clicksData.id,
            });
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
                    <div>
                        <button className="TeamLeaderAcceptDesc" onClick={handleDataClick}>
                            승인하기
                        </button>
                    </div>
                ) : (
                    <div>
                        <div>승인 완료.</div>
                        <button onClick={() => modalClose()}>닫기</button>
                    </div>
                )}
            </div>
            <div>
                {commentDataOn ? (
                    <div>
                        <button className="TeamLeaderAcceptDesc" onClick={() => setCommentDataOn(false)}>
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

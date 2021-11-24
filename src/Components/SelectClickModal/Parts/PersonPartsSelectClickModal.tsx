import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import './PersonPartsSelectClickModal.css';
import { DecryptKey } from '../../../config';
import { RootState } from '../../../models/index';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getPartsdataThunk } from '../../../models/Thunk_models/PartsData';
import { toast } from '../../ToastMessage/ToastManager';
type PersonPartsSelectClickModalProps = {
    clicksTitle: object | any;
    clicksData: object | any;
    modalClose: () => void;
};

const PersonPartsSelectClickModal = ({ clicksTitle, clicksData, modalClose }: PersonPartsSelectClickModalProps) => {
    const dispatch = useDispatch();
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const [CheckDesc, setCheckDesc] = useState('');

    const handleDeletePartsData = async () => {
        try {
            const serverPartsDelete = await axios.post(`${process.env.REACT_APP_API_URL}/sales_server/parts_delete_on`, {
                clicksData,
            });
            if (serverPartsDelete.data.dataSuccess) {
                dispatch(getPartsdataThunk(moment(clicksData.write_date).format('YYYY-MM'), InfomationState));
                setCheckDesc('');
                modalClose();
                toast.show({
                    title: '데이터 삭제 성공',
                    content: `${clicksData.writer}님이 등록하신 업무요청을 삭제하였습니다.`,
                    duration: 6000,
                    DataSuccess: true,
                });
            } else {
                toast.show({
                    title: '데이터 삭제 실패',
                    content: `${clicksData.writer}님이 등록하신 업무요청을 삭제에 실패하였습니다.`,
                    duration: 6000,
                    DataSuccess: false,
                });
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: '서버와의 연결이 실패',
                content: `서버와의 연결이 실패하였습니다. IT팀에 문의바랍니다.`,
                duration: 6000,
                DataSuccess: false,
            });
        }
    };

    const handleClickCheckOn = async () => {
        try {
            const serverPartsCheckOn = await axios.post(`${process.env.REACT_APP_API_URL}/sales_server/parts_check_on`, {
                id: DecryptKey(InfomationState.id),
                name: DecryptKey(InfomationState.name),
                clicksData,
                CheckDesc,
            });
            if (serverPartsCheckOn.data.dataSuccess) {
                dispatch(getPartsdataThunk(moment(clicksData.write_date).format('YYYY-MM'), InfomationState));
                setCheckDesc('');
                modalClose();
                toast.show({
                    title: '데이터 저장 성공',
                    content: `${clicksData.writer}님이 신청하신 업무요청에 확인 하셨습니다.`,
                    duration: 6000,
                    DataSuccess: true,
                });
            } else {
                toast.show({
                    title: '데이터 저장 실패',
                    content: `${moment(clicksData.write_date).format('YYYY년 MM월 DD일')}의 요청업무에 저장이 실패하였습니다.`,
                    duration: 6000,
                    DataSuccess: false,
                });
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: '서버와의 연결이 실패',
                content: `서버와의 연결이 실패하였습니다. IT팀에 문의바랍니다.`,
                duration: 6000,
                DataSuccess: false,
            });
        }
    };

    return (
        <div>
            <div className="Parts_Float_div_box">
                <div className="Parts_Float_left">
                    <div style={{ marginBottom: '30px', marginTop: '10px' }}>
                        <h1>{moment(clicksData.write_date).format('YYYY년 MM월 DD일')}</h1>
                    </div>
                    <div>
                        <div>
                            <h2>작성자: {clicksData.writer}</h2>
                        </div>
                        <div>
                            <h3>작성 날짜: {moment(clicksData.write_auto_date).format('YYYY-MM-DD HH시 mm분')}</h3>
                        </div>
                        <div style={{ marginTop: '30px' }}>
                            <h2>Part.</h2>
                            <h4 style={{ paddingLeft: '30px' }}>{clicksData.partdesc}</h4>
                        </div>
                        <div style={{ marginTop: '30px' }}>
                            <h2>내용.</h2>
                            <h4 style={{ paddingLeft: '30px' }}>{clicksData.describes}</h4>
                        </div>
                        <div>
                            {clicksData.writer === DecryptKey(InfomationState.name) ? (
                                <div style={{ marginTop: '30px', textAlign: 'end', width: '80%' }}>
                                    <button onClick={handleDeletePartsData} className="TeamLeaderAcceptDesc">
                                        삭제하기
                                    </button>
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="Parts_Float_right">
                    <div style={{ marginBottom: '30px', marginTop: '10px' }}>
                        <h1 style={{ color: 'white' }}>확인자</h1>
                    </div>
                    {clicksData.colorCheck === 3 ? (
                        <div>
                            <div>
                                <h2>확인자: {clicksData.Checkname}</h2>
                            </div>
                            <div>
                                <h3>확인 날짜: {moment(clicksData.check_date).format('YYYY-MM-DD HH시 mm분')}</h3>
                            </div>
                            <div style={{ marginTop: '30px' }}>
                                <h2>확인 내용</h2>
                                <div>
                                    <pre>{clicksData.comment}</pre>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div>
                                <h2>확인자: {DecryptKey(InfomationState.name)}</h2>
                            </div>
                            <div>
                                <h3>등록 확인 날짜: {moment().format('YYYY-MM-DD HH시 mm분')}</h3>
                            </div>
                            <div style={{ marginTop: '30px' }}>
                                <h2>내용 입력.</h2>
                                <textarea
                                    placeholder="코멘트를 입력 해주세요."
                                    value={CheckDesc}
                                    onChange={e => setCheckDesc(e.target.value)}
                                    style={{ width: '80%', padding: '10px', height: '100px', marginTop: '10px' }}
                                ></textarea>
                            </div>
                            <div style={{ textAlign: 'end', width: '80%', marginTop: '30px' }}>
                                <button onClick={handleClickCheckOn} className="TeamLeaderAcceptDesc">
                                    업무요청 완료
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PersonPartsSelectClickModal;

import React, { useState } from 'react';
import { RootState } from '../../../models';
import { DecryptKey } from '../../../config';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import { toast } from '../../ToastMessage/ToastManager';
import { getPartsdataThunk } from '../../../models/Thunk_models/PartsData';
type PartsApplyWorkSpaceProps = {
    pickerDate: string | null;
};

const PartsApplyWorkSpace = ({ pickerDate }: PartsApplyWorkSpaceProps) => {
    const dispatch = useDispatch();
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const [part, setPart] = useState('');
    const [desc, setDesc] = useState('');
    const handleClickSaveParts = async () => {
        try {
            const handleClickSavePartsServer = await axios.post(`${process.env.REACT_APP_API_URL}/sales_server/parts_writerSend`, {
                name: DecryptKey(InfomationState.name),
                clickData: moment(pickerDate).format('YYYY-MM-DD'),
                part,
                desc,
            });
            if (handleClickSavePartsServer.data.dataSuccess) {
                dispatch(getPartsdataThunk(moment(pickerDate).format('YYYY-MM'), InfomationState));
                setPart('');
                setDesc('');
                toast.show({
                    title: '데이터 저장 성공',
                    content: `${moment(pickerDate).format('YYYY년 MM월 DD일')}에 업무요청 등록 하였습니다.`,
                    duration: 6000,
                    DataSuccess: true,
                });
            } else {
                toast.show({
                    title: '데이터 저장 실패',
                    content: `${moment(pickerDate).format('YYYY년 MM월 DD일')}의 업무요청 등록이 실패하였습니다.`,
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
            <div>
                <div style={{ marginTop: '30px', marginBottom: '20px' }}>
                    <h2>업무요청 등록</h2>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <h2>작성자: {DecryptKey(InfomationState.name)}</h2>
                    <h3>날짜 : {moment(pickerDate).format('YYYY년 MM월 DD일')}</h3>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <h2>제목.</h2>
                    <input
                        placeholder="Part부문을 입력해주세요."
                        value={part}
                        onChange={e => setPart(e.target.value)}
                        style={{ width: '40%', height: '40px', padding: '10px', marginLeft: '20px', marginTop: '10px' }}
                    ></input>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <h2>내용.</h2>
                    <textarea
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                        placeholder="내용을 작성 해 주세요."
                        style={{ width: '40%', height: '100px', padding: '10px', marginLeft: '20px', marginTop: '10px' }}
                    ></textarea>
                </div>
                <div style={{ width: '40%', textAlign: 'end' }}>
                    <button className="TeamLeaderAcceptDesc" onClick={handleClickSaveParts}>
                        저장하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PartsApplyWorkSpace;

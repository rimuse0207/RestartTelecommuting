import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './TeleWorking.css';
import 'moment/locale/ko';
import axios from 'axios';
import { DecryptKey } from '../../../config';
import { useSelector } from 'react-redux';
import { RootState } from '../../../models/index';
import { toast } from '../../ToastMessage/ToastManager';
type TeleWorkingProps = {
    pickerDate?: string | null | undefined;
};

const TeleWorking = ({ pickerDate }: TeleWorkingProps) => {
    const [TeleStart, setTeleStart] = useState(false);
    const [TeleEnded, setTeleEnded] = useState(false);
    const [WorkBookWrite, setWorkBookWrite] = useState('');
    const [StartTime, setStartTime] = useState('00:00');
    const [EndTime, setEndTime] = useState('00:00');
    const [todayDataisChk, setTodayDataisChk] = useState(false);
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);

    useEffect(() => {
        TodayCheckTele();
    }, []);

    const TodayCheckTele = async () => {
        try {
            const TodayCheckTele = await axios.post(`${process.env.REACT_APP_API_URL}/Tele_app_server/Tele_Today_Check`, {
                id: DecryptKey(InfomationState.id),
                date: moment().format('YYYY-MM-DD'),
            });
            if (TodayCheckTele.data.dataSuccess && TodayCheckTele.data.isChk) {
                setTodayDataisChk(true);
                setStartTime(TodayCheckTele.data.data[0].stat_t);
                setEndTime(TodayCheckTele.data.data[0].end_t);
                setWorkBookWrite(TodayCheckTele.data.data2[0].work);
                if (TodayCheckTele.data.data[0].status === 1) {
                    setTeleStart(true);
                } else if (TodayCheckTele.data.data[0].status === 3) {
                    setTeleStart(true);
                    setTeleEnded(true);
                }
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: 'ERROR!',
                content: `ERROR. 재택근무 시작 데이터 조회가 실패하였습니다. IT 팀에 문의 바랍니다.`,
                duration: 6000,
                DataSuccess: false,
            });
        }
    };
    const handleClickTeleStart = async () => {
        const confrims = window.confirm(`현재 시간( ${moment().format('HH시 mm분')} ) 으로 재택 근무를 시작 하겠습니까?`);
        if (confrims) {
            TodayCheckTeleStart();
        }
    };
    const TodayCheckTeleStart = async () => {
        try {
            const TodayCheckTele = await axios.post(`${process.env.REACT_APP_API_URL}/Tele_app_server/Tele_Today_CheckStart`, {
                id: DecryptKey(InfomationState.id),
                date: moment().format('YYYY-MM-DD'),
            });
            if (TodayCheckTele.data.dataSuccess) {
                toast.show({
                    title: '데이터 저장 완료.',
                    content: `${moment().format('HH시 mm분')}으로 재택근무가 시작됩니다.`,
                    duration: 6000,
                    DataSuccess: true,
                });
                setTeleStart(true);
                setStartTime(moment().format('HH:mm'));
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: 'ERROR!',
                content: `ERROR! 서버 저장 실패`,
                duration: 6000,
                DataSuccess: false,
            });
        }
    };
    const handleClickTeleEnded = () => {
        const confrims = window.confirm(`재택 종료 시 업무일지 수정이 불가합니다. \n재택 근무를 종료 하겠습니까?`);
        if (confrims) {
            try {
                TodayCheckTeleEnded();
            } catch (error) {
                console.log(error);
            }
        }
    };
    const TodayCheckTeleEnded = async () => {
        try {
            const TodayCheckTele = await axios.post(`${process.env.REACT_APP_API_URL}/Tele_app_server/Tele_Today_CheckEnded`, {
                id: DecryptKey(InfomationState.id),
                date: moment().format('YYYY-MM-DD'),
                desc: WorkBookWrite,
            });
            if (TodayCheckTele.data.dataSuccess) {
                toast.show({
                    title: '데이터 저장 완료.',
                    content: `${moment().format('HH시 mm분')}으로 재택근무 종료 데이터가 서버에 저장 되었습니다.`,
                    duration: 6000,
                    DataSuccess: true,
                });
                setTeleEnded(true);
                setEndTime(moment().format('HH:mm'));
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: 'ERROR!',
                content: `ERROR! 서버 저장에 실패하였습니다.`,
                duration: 6000,
                DataSuccess: false,
            });
        }
    };

    const handleClickWorkbook = async () => {
        if (!TeleStart) return alert('재택근무시에만 작성 가능합니다.');
        try {
            const TodayCheckTele = await axios.post(`${process.env.REACT_APP_API_URL}/Tele_app_server/Tele_Workbook_Store`, {
                id: DecryptKey(InfomationState.id),
                date: moment().format('YYYY-MM-DD'),
                desc: WorkBookWrite,
            });
            if (TodayCheckTele.data.dataSuccess) {
                toast.show({
                    title: '데이터 저장 완료.',
                    content: `임시 저장한 업무일지가 서버에 저장 되었습니다.`,
                    duration: 6000,
                    DataSuccess: true,
                });
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: 'ERROR!',
                content: `ERROR! 서버 저장에 실패하였습니다.`,
                duration: 6000,
                DataSuccess: false,
            });
        }
    };
    return (
        <div className="mainbox">
            <div className="subBox">
                <div>
                    <h2 style={{ fontSize: 'xxx-large', fontWeight: 'bolder' }}>{moment().format('YYYY년 MM월 DD일 (dddd)')}</h2>
                </div>
                <div className="Tele_Float_box">
                    <div className="Tele_Float_Left_box">
                        <div className="Tele_Start_Float_box">
                            <div className="Tele_Start_Float_Left_box">
                                <h2>시작시간</h2>
                                <h3>{StartTime}</h3>
                            </div>
                            <div className="Tele_Start_Float_Right_box">
                                <h2>종료시간</h2>
                                <h3>{EndTime}</h3>
                            </div>
                        </div>
                        <div>
                            <div className="Tele_Start_Button_div">
                                {TeleEnded ? (
                                    <div>
                                        <div>재택 종료.</div>
                                        <div>고생하셨습니다.</div>
                                    </div>
                                ) : (
                                    <div>
                                        {TeleStart ? (
                                            <div onClick={handleClickTeleEnded}>재택근무 종료</div>
                                        ) : (
                                            <div>
                                                <div onClick={handleClickTeleStart}>재택근무 시작</div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="Tele_Float_Right_box">
                        <div style={{ marginBottom: '15px' }}>
                            <h2>업무일지</h2>
                        </div>
                        <div>
                            {TeleEnded ? (
                                <>
                                    <div className="Tele_Float_Right_box_inputBox" placeholder="업무일지를 작성해주세요.">
                                        <pre>{WorkBookWrite}</pre>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <textarea
                                        className="Tele_Float_Right_box_inputBox"
                                        placeholder="업무일지를 작성해주세요."
                                        value={WorkBookWrite}
                                        onChange={e => setWorkBookWrite(e.target.value)}
                                    ></textarea>
                                    <div style={{ textAlign: 'end' }}>
                                        {/* <button style={{ marginRight: '40px' }} className="Tele_Float_Right_box_button_store">
                                    임시 저장
                                </button> */}
                                        <button className="Tele_Float_Right_box_button_store" onClick={handleClickWorkbook}>
                                            임시 저장
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeleWorking;

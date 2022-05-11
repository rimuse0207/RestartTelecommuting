import React, { useState } from 'react';
import HambergerMenu from '../Navigation/HambergerMenu';
import { useSelector } from 'react-redux';
import { RootState } from '../../models/index';
import SliderPage from '../SliderPage';
import moment from 'moment';
import AfterOtWriteMainPage from './AfterOtWriteMainPage';
import BeforeOtWriteMainPage from './BeforeOtWriteMainPage';
const OtContainerMainPage = () => {
    const socket = useSelector((state: RootState) => state.Socket.socket);
    const loginChecked = useSelector((state: RootState) => state.PersonalInfo.loginCheck);
    const [BeforeORAfter, setBeforeORAfter] = useState(true);
    const [startDate, setStartDate] = useState(moment().clone().startOf('week').add(1, 'day'));
    const [endDate, setEndDate] = useState(moment().clone().endOf('week').add(1, 'day'));
    return (
        <div className="OTTTTTTTT">
            {loginChecked ? (
                <div>
                    <HambergerMenu
                        titles={BeforeORAfter ? 'OT사전' : 'OT사후'}
                        subtitles={BeforeORAfter ? 'OT사전 신청' : 'OT사후 실시보고'}
                    ></HambergerMenu>
                    <div>
                        <div className="WeekOTMenubar_big_div">
                            <ul>
                                <li style={BeforeORAfter ? { backgroundColor: '#f7c80e' } : {}} onClick={() => setBeforeORAfter(true)}>
                                    사전 OT
                                </li>
                                <li style={BeforeORAfter ? {} : { backgroundColor: '#2da8e5' }} onClick={() => setBeforeORAfter(false)}>
                                    사후 OT
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        {BeforeORAfter ? (
                            <BeforeOtWriteMainPage
                                startDate={startDate}
                                endDate={endDate}
                                setStartDate={setStartDate}
                                setEndDate={setEndDate}
                            ></BeforeOtWriteMainPage>
                        ) : (
                            <AfterOtWriteMainPage
                                startDate={startDate}
                                endDate={endDate}
                                setStartDate={setStartDate}
                                setEndDate={setEndDate}
                            ></AfterOtWriteMainPage>
                        )}
                    </div>
                    {/* <SliderPage width={window.innerWidth} socket={socket}></SliderPage> */}
                </div>
            ) : (
                <div>로그인 필요</div>
            )}
        </div>
    );
};

export default OtContainerMainPage;

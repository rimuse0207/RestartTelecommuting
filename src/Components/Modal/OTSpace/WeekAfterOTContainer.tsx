import React, { useState } from 'react';
import HambergerMenu from '../..//Navigation/HambergerMenu';
import { useSelector } from 'react-redux';
import { RootState } from '../../../models/index';
import SliderPage from '../../SliderPage';
import WeekAfterOTWorkSpace from './WeekAfterOTWorkSpace';
import WeekBeforeOTWorkSpace from './WeekBeforeOTWorkSpace';
import AfterOtWriteMainPage from '../../OtMainPage/AfterOtWriteMainPage';
import moment from 'moment';
// const WeekAfterOTContainer = () => {
//     const socket = useSelector((state: RootState) => state.Socket.socket);
//     const loginChecked = useSelector((state: RootState) => state.PersonalInfo.loginCheck);
//     const [BeforeORAfter, setBeforeORAfter] = useState(true);
//     const [startDate, setStartDate] = useState(moment().clone().startOf('week').add(1, 'day'));
//     const [endDate, setEndDate] = useState(moment().clone().endOf('week').add(1, 'day'));
//     return (
//         <div className="OTTTTTTTT">
//             {loginChecked ? (
//                 <div>
//                     <HambergerMenu
//                         titles={BeforeORAfter ? '사전 OT' : '사후 OT'}
//                         subtitles={BeforeORAfter ? '사전 OT 신청' : '사후 OT 실시보고'}
//                     ></HambergerMenu>
//                     <div>
//                         <div className="WeekOTMenubar_big_div">
//                             <ul>
//                                 <li style={BeforeORAfter ? {} : { backgroundColor: '#2da8e5' }} onClick={() => setBeforeORAfter(false)}>
//                                     사후 OT
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                     <div>
//                         (
//                         <AfterOtWriteMainPage
//                             startDate={startDate}
//                             endDate={endDate}
//                             setStartDate={setStartDate}
//                             setEndDate={setEndDate}
//                         ></AfterOtWriteMainPage>
//                         )
//                     </div>
//                     {/* <SliderPage width={window.innerWidth} socket={socket}></SliderPage> */}
//                 </div>
//             ) : (
//                 <div>로그인 필요</div>
//             )}
//         </div>
//     );
// };

const WeekAfterOTContainer = () => {
    const [BeforeORAfter, setBeforeORAfter] = useState(true);
    const [startDate, setStartDate] = useState(moment().clone().startOf('week').add(1, 'day'));
    const [endDate, setEndDate] = useState(moment().clone().endOf('week').add(1, 'day'));
    return (
        <div className="OTTTTTTTT">
            <div>
                <div className="WeekOTMenubar_big_div">
                    <ul>
                        <li style={BeforeORAfter ? {} : { backgroundColor: '#2da8e5' }} onClick={() => setBeforeORAfter(false)}>
                            사후 OT
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                (
                <AfterOtWriteMainPage
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                ></AfterOtWriteMainPage>
                )
            </div>
        </div>
    );
};

export default WeekAfterOTContainer;

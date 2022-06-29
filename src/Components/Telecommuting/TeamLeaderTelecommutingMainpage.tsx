import React, { useState } from 'react';
import TeamLeaderTelecommuting from './TeamLeaderTelecommuting';
import HambergerMenu from '../Navigation/HambergerMenu';
import SliderPage from '../SliderPage';
import SignInForm from '../Login/SignInForm';
import { useSelector } from 'react-redux';
import { RootState } from '../../models';
// const TeamLeaderTelecommutingMainpage = () => {
//     const socket = useSelector((state: RootState) => state.Socket.socket);
//     const loginChecked = useSelector((state: RootState) => state.PersonalInfo.loginCheck);
//     const [loginCheck, setLoginCheck] = useState(false);
//     return (
//         <div className="App">
//             {loginChecked ? (
//                 <div style={{ height: '100%' }}>
//                     <HambergerMenu titles="팀원 종합 업무 현황" subtitles="팀원 종합 업무 현황 조회"></HambergerMenu>
//                     <div style={{ position: 'relative' }}>
//                         <TeamLeaderTelecommuting></TeamLeaderTelecommuting>
//                     </div>
//                     <SliderPage width={window.innerWidth} socket={socket}></SliderPage>
//                 </div>
//             ) : (
//                 <SignInForm setLoginCheck={(data: boolean) => setLoginCheck(data)}></SignInForm>
//             )}
//         </div>
//     );
// };

const TeamLeaderTelecommutingMainpage = () => {
    return (
        <div className="App">
            <HambergerMenu titles="팀원 종합 업무 현황" subtitles="팀원 종합 업무 현황 조회"></HambergerMenu>
            <TeamLeaderTelecommuting></TeamLeaderTelecommuting>
        </div>
    );
};

export default TeamLeaderTelecommutingMainpage;

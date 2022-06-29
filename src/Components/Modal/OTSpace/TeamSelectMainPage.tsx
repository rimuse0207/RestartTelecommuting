import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../models';
import HambergerMenu from '../../Navigation/HambergerMenu';
import TeamSelectOTSpace from './TeamSelectOTSpace';
import SliderPage from '../../SliderPage';
import SignInForm from '../../Login/SignInForm';
import './TeamSelectOTSpace.css';

// const TeamSelectMainPage = () => {
//     const socket = useSelector((state: RootState) => state.Socket.socket);
//     const loginChecked = useSelector((state: RootState) => state.PersonalInfo.loginCheck);
//     const [loginCheck, setLoginCheck] = useState(false);

//     return (
//         <div>
//             {loginChecked ? (
//                 <div>
//                     <HambergerMenu titles="근무 실시보고서" subtitles="근무 실시보고서"></HambergerMenu>
//                     <div style={{ position: 'relative' }}>
//                         <TeamSelectOTSpace></TeamSelectOTSpace>
//                     </div>
//                     <SliderPage width={window.innerWidth} socket={socket}></SliderPage>
//                 </div>
//             ) : (
//                 <SignInForm setLoginCheck={(data: boolean) => setLoginCheck(data)}></SignInForm>
//             )}
//         </div>
//     );
// };
const TeamSelectMainPage = () => {
    return (
        <div>
            <HambergerMenu titles="근무 실시보고서" subtitles="근무 실시보고서"></HambergerMenu>
            <TeamSelectOTSpace></TeamSelectOTSpace>
        </div>
    );
};
export default TeamSelectMainPage;

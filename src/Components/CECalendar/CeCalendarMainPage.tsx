import React, { useState, useEffect } from 'react';
import CeCalendarPublicPage from './CeCalendarPublicPage';
import SignInForm from '../Login/SignInForm';
import HambergerMenu from '../Navigation/HambergerMenu';
import SliderPage from '../SliderPage';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../models';
import { DecryptKey } from '../../config';
import CeCalendarMasterPage from './CeCalendarMasterPage';
import CeCalendarSubMenu from './CeCalendarSubMenu';

// const CeCalendarMainPage = () => {
//     const socket = useSelector((state: RootState) => state.Socket.socket);
//     const loginChecked = useSelector((state: RootState) => state.PersonalInfo.loginCheck);
//     const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
//     const [loginCheck, setLoginCheck] = useState(false);

//     return (
//         <div>
//             {loginChecked ? (
//                 <div style={{ height: '100%' }}>
//                     <HambergerMenu titles="CSM" subtitles="CSM관리"></HambergerMenu>
//                     <div style={{ position: 'relative' }}>
//                         {DecryptKey(InfomationState.name) === '이광민' ? (
//                             <CeCalendarMasterPage></CeCalendarMasterPage>
//                         ) : (
//                             <CeCalendarPublicPage></CeCalendarPublicPage>
//                         )}
//                     </div>
//                     <SliderPage width={window.innerWidth} socket={socket}></SliderPage>
//                 </div>
//             ) : (
//                 <SignInForm setLoginCheck={(data: boolean) => setLoginCheck(data)}></SignInForm>
//             )}
//         </div>
//     );
// };

const CeCalendarMainPage = () => {
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);

    return (
        <div>
            <HambergerMenu titles="CSM" subtitles="CSM관리"></HambergerMenu>
            {DecryptKey(InfomationState.name) === '이광민' || DecryptKey(InfomationState.name) === '유성재' ? (
                <CeCalendarSubMenu></CeCalendarSubMenu>
            ) : (
                <CeCalendarPublicPage></CeCalendarPublicPage>
            )}
        </div>
    );
};

export default CeCalendarMainPage;

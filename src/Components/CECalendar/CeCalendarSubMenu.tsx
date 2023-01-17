import React, { useState } from 'react';
import CeCalendarMasterPage from './CeCalendarMasterPage';
import styled from 'styled-components';
import CeCalendarExcelFileUpload from './CeCalendarExcelFileUpload';
import CeCalendarSearchIcons from './CeCalendarSearchIcons';
import { DecryptKey } from '../../config';
import { useSelector } from 'react-redux';
import { RootState } from '../../models';
import CeCalendarPublicPage from './CeCalendarPublicPage';
import CsmNumberWorking from './CSMNumberWorking/CsmNumberWorking';

const CeCalendarSubMenuMainDivBox = styled.div`
    font-size: 0.7em;
    .CeCalendarSubMenu_SubMenusUl {
        width: 100%;
        display: flex;
        justify-content: space-around;

        li {
            width: 15%;
            border-bottom: 3px solid #368;
            text-align: center;
            padding-bottom: 10px;
            margin-top: 10px;
            :hover {
                cursor: pointer;
            }
        }
    }
`;

const CeCalendarSubMenu = () => {
    const [SubMenuClicks, setSubMenuClicks] = useState('Table_User_Nothing');
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    return (
        <CeCalendarSubMenuMainDivBox>
            <div>
                {DecryptKey(InfomationState.name) === '이광민' || DecryptKey(InfomationState.name) === '유성재' ? (
                    <div>
                        <ul className="CeCalendarSubMenu_SubMenusUl">
                            <li
                                style={SubMenuClicks === 'Table_User_Nothing' ? {} : { opacity: '0.5' }}
                                onClick={() => setSubMenuClicks('Table_User_Nothing')}
                            >
                                CSM 사용자 미등록
                            </li>
                            <li
                                style={SubMenuClicks === 'Table_User_Used' ? {} : { opacity: '0.5' }}
                                onClick={() => setSubMenuClicks('Table_User_Used')}
                            >
                                CSM 사용자 등록
                            </li>
                            <li style={SubMenuClicks === 'File' ? {} : { opacity: '0.5' }} onClick={() => setSubMenuClicks('File')}>
                                CSM정보 Excel 업로드
                            </li>
                            <li style={SubMenuClicks === 'Working' ? {} : { opacity: '0.5' }} onClick={() => setSubMenuClicks('Working')}>
                                작업시간 및 인원 Excel 업로드
                            </li>
                        </ul>
                    </div>
                ) : (
                    <></>
                )}
            </div>

            {SubMenuClicks === 'Table_User_Nothing' ? (
                DecryptKey(InfomationState.name) === '이광민' || DecryptKey(InfomationState.name) === '유성재' ? (
                    <CeCalendarMasterPage SubMenuClicks={SubMenuClicks}></CeCalendarMasterPage>
                ) : (
                    <CeCalendarPublicPage></CeCalendarPublicPage>
                )
            ) : (
                <></>
            )}
            {SubMenuClicks === 'Table_User_Used' ? (
                DecryptKey(InfomationState.name) === '이광민' || DecryptKey(InfomationState.name) === '유성재' ? (
                    <CeCalendarMasterPage SubMenuClicks={SubMenuClicks}></CeCalendarMasterPage>
                ) : (
                    <CeCalendarPublicPage></CeCalendarPublicPage>
                )
            ) : (
                <></>
            )}
            {SubMenuClicks === 'File' ? <CeCalendarExcelFileUpload></CeCalendarExcelFileUpload> : <></>}
            {SubMenuClicks === 'Working' ? <CsmNumberWorking></CsmNumberWorking> : <></>}
        </CeCalendarSubMenuMainDivBox>
    );
};

export default CeCalendarSubMenu;

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
    .CeCalendarSubMenu_SubMenusUl {
        width: 100%;
        display: flex;
        justify-content: space-around;

        li {
            width: 25%;
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
    const [SubMenuClicks, setSubMenuClicks] = useState('Table');
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    return (
        <CeCalendarSubMenuMainDivBox>
            <div>
                {DecryptKey(InfomationState.name) === '이광민' || DecryptKey(InfomationState.name) === '유성재' ? (
                    <div>
                        <ul className="CeCalendarSubMenu_SubMenusUl">
                            <li style={SubMenuClicks === 'Table' ? {} : { opacity: '0.5' }} onClick={() => setSubMenuClicks('Table')}>
                                CSM
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

            {SubMenuClicks === 'Table' ? (
                DecryptKey(InfomationState.name) === '이광민' || DecryptKey(InfomationState.name) === '유성재' ? (
                    <CeCalendarMasterPage></CeCalendarMasterPage>
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

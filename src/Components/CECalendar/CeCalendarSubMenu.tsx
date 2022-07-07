import React, { useState } from 'react';
import CeCalendarMasterPage from './CeCalendarMasterPage';
import styled from 'styled-components';
import CeCalendarExcelFileUpload from './CeCalendarExcelFileUpload';
import CeCalendarSearchIcons from './CeCalendarSearchIcons';
import { DecryptKey } from '../../config';
import { useSelector } from 'react-redux';
import { RootState } from '../../models';
import CeCalendarPublicPage from './CeCalendarPublicPage';

const CeCalendarSubMenuMainDivBox = styled.div`
    .CeCalendarSubMenu_SubMenusUl {
        width: 100%;
        display: flex;
        justify-content: space-around;

        li {
            width: 45%;
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
                {DecryptKey(InfomationState.name) === '이광민' ? (
                    <div>
                        <ul className="CeCalendarSubMenu_SubMenusUl">
                            <li style={SubMenuClicks === 'Table' ? {} : { opacity: '0.5' }} onClick={() => setSubMenuClicks('Table')}>
                                CSM 저장 테이블
                            </li>
                            <li style={SubMenuClicks === 'File' ? {} : { opacity: '0.5' }} onClick={() => setSubMenuClicks('File')}>
                                CSM Excel 파일 업로드
                            </li>
                        </ul>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <CeCalendarSearchIcons></CeCalendarSearchIcons>
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
        </CeCalendarSubMenuMainDivBox>
    );
};

export default CeCalendarSubMenu;

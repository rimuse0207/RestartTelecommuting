import React, { useState } from 'react';
import CeCalendarMasterPage from './CSMMainContent/AdminContent/CeCalendarMasterPage';
import styled from 'styled-components';
import CeCalendarExcelFileUpload from './CSMMainContent/AdminContent/CSMExcelUpload/CeCalendarExcelFileUpload';
import CeCalendarSearchIcons from './CSMMainContent/CSMFiltering/CeCalendarSearchIcons';
import { DecryptKey } from '../../config';
import { useSelector } from 'react-redux';
import { RootState } from '../../models';
import CsmNumberWorking from './CSMMainContent/AdminContent/CSMWorkingExcel/CsmNumberWorking';
import DistanceDataInsertPage from './CSMMainContent/AdminContent/CSMDistance/DistanceDataInsertPage';

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
    const Nav_AccessTokens = useSelector((state: RootState) => state.Nav_AccessTokens);
    return (
        <CeCalendarSubMenuMainDivBox>
            <div>
                {Nav_AccessTokens.CSM_Master_Access === 1 ? (
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
                            <li style={SubMenuClicks === 'Distance' ? {} : { opacity: '0.5' }} onClick={() => setSubMenuClicks('Distance')}>
                                이동거리 별 시간
                            </li>
                        </ul>
                    </div>
                ) : (
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
                        </ul>
                    </div>
                )}
            </div>

            {SubMenuClicks === 'Table_User_Nothing' ? <CeCalendarMasterPage SubMenuClicks={SubMenuClicks}></CeCalendarMasterPage> : <></>}
            {SubMenuClicks === 'Table_User_Used' ? <CeCalendarMasterPage SubMenuClicks={SubMenuClicks}></CeCalendarMasterPage> : <></>}
            {SubMenuClicks === 'File' ? <CeCalendarExcelFileUpload></CeCalendarExcelFileUpload> : <></>}
            {SubMenuClicks === 'Working' ? <CsmNumberWorking></CsmNumberWorking> : <></>}
            {SubMenuClicks === 'Distance' ? <DistanceDataInsertPage></DistanceDataInsertPage> : <></>}
        </CeCalendarSubMenuMainDivBox>
    );
};

export default CeCalendarSubMenu;

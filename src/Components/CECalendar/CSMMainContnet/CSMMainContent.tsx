import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../models';
import LoaderMainPage from '../../Loader/LoaderMainPage';

import CSMNothingUserContent from './CSMContentList/CSMNothingUserContent';
import CSMUsedUserContent from './CSMContentList/CSMUsedUserContent';

const CSMMainContentMainDivBox = styled.div``;

export type CSMMainContentProps_Types = {
    SubMenuClicks: string;
};

const CSMMainContent = ({ SubMenuClicks }: CSMMainContentProps_Types) => {
    const CSM_Datas = useSelector((state: RootState) => state.CSMDataGetting.CSM_Data);
    return (
        <CSMMainContentMainDivBox>
            {SubMenuClicks === 'Table_User_Nothing' ? <CSMNothingUserContent></CSMNothingUserContent> : <></>}
            {SubMenuClicks === 'Table_User_Used' ? <CSMUsedUserContent></CSMUsedUserContent> : <></>}
        </CSMMainContentMainDivBox>
    );
};

export default CSMMainContent;

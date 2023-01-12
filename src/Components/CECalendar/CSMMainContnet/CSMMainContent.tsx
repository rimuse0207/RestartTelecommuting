import React from 'react';
import styled from 'styled-components';
import { RootState } from '../../../models';

import CSMNothingUserContent from './CSMContentList/CSMNothingUserContent';
import CSMUsedUserContent from './CSMContentList/CSMUsedUserContent';

const CSMMainContentMainDivBox = styled.div``;

export type CSMMainContentProps_Types = {
    hiddenChecked: boolean;
};

const CSMMainContent = ({ hiddenChecked }: CSMMainContentProps_Types) => {
    return (
        <CSMMainContentMainDivBox>
            <CSMNothingUserContent hiddenChecked={hiddenChecked}></CSMNothingUserContent>
            <CSMUsedUserContent></CSMUsedUserContent>
        </CSMMainContentMainDivBox>
    );
};

export default CSMMainContent;

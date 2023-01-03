import React from 'react';
import styled from 'styled-components';
import { RootState } from '../../../models';

import CSMNothingUserContent from './CSMContentList/CSMNothingUserContent';
import CSMUsedUserContent from './CSMContentList/CSMUsedUserContent';

const CSMMainContentMainDivBox = styled.div`
    border: 1px solid black;
`;

const CSMMainContent = () => {
    return (
        <CSMMainContentMainDivBox>
            <CSMNothingUserContent></CSMNothingUserContent>
            <CSMUsedUserContent></CSMUsedUserContent>
        </CSMMainContentMainDivBox>
    );
};

export default CSMMainContent;

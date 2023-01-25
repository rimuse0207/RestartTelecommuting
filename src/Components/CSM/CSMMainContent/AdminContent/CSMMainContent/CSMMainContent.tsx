import React from 'react';
import styled from 'styled-components';
import { SelectTeamsMenuTypes } from '../CeCalendarMasterPage';
import CSMNothingUserContent from './CSMNothingUser/CSMNothingUserContent';
import CSMUsedUserContent from './CSMUsedUser/CSMUsedUserContent';

const CSMMainContentMainDivBox = styled.div`
    .basic_yellow {
        background-color: yellow;
    }
    .basic_lime {
        background-color: lime;
    }
    .basic_blue {
        background-color: blue;
        color: white;
    }
    .basic_purple {
        background-color: purple;
        color: white;
    }
    .basic_skyblue {
        background-color: skyblue;
    }
    .basic_orange {
        background-color: orange;
    }
    .basic_finish {
        background-color: red;
        color: white;
    }
`;

export type CSMMainContentProps_Types = {
    SubMenuClicks: string;
    SelectTeamsMenu: SelectTeamsMenuTypes[];
};

const CSMMainContent = ({ SubMenuClicks, SelectTeamsMenu }: CSMMainContentProps_Types) => {
    return (
        <CSMMainContentMainDivBox>
            {SubMenuClicks === 'Table_User_Nothing' ? (
                <CSMNothingUserContent SelectTeamsMenu={SelectTeamsMenu}></CSMNothingUserContent>
            ) : (
                <></>
            )}
            {SubMenuClicks === 'Table_User_Used' ? <CSMUsedUserContent SelectTeamsMenu={SelectTeamsMenu}></CSMUsedUserContent> : <></>}
        </CSMMainContentMainDivBox>
    );
};

export default CSMMainContent;

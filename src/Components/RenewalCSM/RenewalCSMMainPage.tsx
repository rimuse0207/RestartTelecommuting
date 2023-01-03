import React from 'react';
import styled from 'styled-components';
import HambergerMenu from '../Navigation/HambergerMenu';
import CSMContentMainPage from './CSMContent/CSMContentMainPage';

const RenewalCSMMainPageMainDivBox = styled.div`
    border: 1px solid black;
`;

const RenewalCSMMainPage = () => {
    return (
        <RenewalCSMMainPageMainDivBox>
            <HambergerMenu titles="CSM" subtitles="CSM관리"></HambergerMenu>
            <CSMContentMainPage></CSMContentMainPage>
        </RenewalCSMMainPageMainDivBox>
    );
};

export default RenewalCSMMainPage;

import React from 'react';
import styled from 'styled-components';
import AdminDashBoardMainPage from '../../InsertLoginPage/AdminDashBoardMainPage';
import AdminDashBoardLoginInfoMainPage from '../../InsertLoginPage/AdminDashBoardLoginInfo/AdminDashBoardLoginInfoMainPage';

const ContentMainPageMainDivBox = styled.div``;

const ContentMainPage = () => {
    return (
        <ContentMainPageMainDivBox>
            <AdminDashBoardLoginInfoMainPage></AdminDashBoardLoginInfoMainPage>
        </ContentMainPageMainDivBox>
    );
};

export default ContentMainPage;

import React from 'react';
import styled from 'styled-components';
import HambergerMenu from '../../Navigation/HambergerMenu';
import ContentMainPage from './Content/ContentMainPage';

const AdminAccessCheckingMainPageMainDivBox = styled.div``;

const AdminAccessCheckingMainPage = () => {
    return (
        <AdminAccessCheckingMainPageMainDivBox>
            <HambergerMenu titles="사용자 권한부여" subtitles="사용자 권한부여"></HambergerMenu>
            <ContentMainPage></ContentMainPage>
        </AdminAccessCheckingMainPageMainDivBox>
    );
};

export default AdminAccessCheckingMainPage;

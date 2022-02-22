import React from 'react';
import styled from 'styled-components';
import AdminDashBoardNavigationMainPage from './AdminDashBoardLoginInfo/AdminDashBoardNavigation/AdminDashBoardNavigationMainPage';
import { useParams } from 'react-router-dom';
import AdminDashBoardLoginInfoMainPage from './AdminDashBoardLoginInfo/AdminDashBoardLoginInfoMainPage';
import AdminDashBoardTeleCommutingMainPage from './AdminDashBoardLoginInfo/AdminDashBoardTeleCommutingPage/AdminDashBoardTeleCommutingMainPage';
const AdminDashBoardMainPageMainDivBox = styled.div`
    display: flex;
    flex-flow: wrap;
`;

const AdminDashBoardMainPage = () => {
    const { selected } = useParams<any>();
    return (
        <AdminDashBoardMainPageMainDivBox>
            <AdminDashBoardNavigationMainPage></AdminDashBoardNavigationMainPage>
            {selected === 'LoginInfo' ? <AdminDashBoardLoginInfoMainPage></AdminDashBoardLoginInfoMainPage> : ''}
            {selected === 'TeleCheck' ? <AdminDashBoardTeleCommutingMainPage></AdminDashBoardTeleCommutingMainPage> : ''}
        </AdminDashBoardMainPageMainDivBox>
    );
};
export default AdminDashBoardMainPage;

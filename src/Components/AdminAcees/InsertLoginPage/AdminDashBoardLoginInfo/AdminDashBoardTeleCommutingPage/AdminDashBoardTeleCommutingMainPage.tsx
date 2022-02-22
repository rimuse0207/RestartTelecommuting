import React, { useState } from 'react';
import styled from 'styled-components';
import AdminDashBoardTeleCommutingContentPage from './AdminDashBoardTeleCommutingContentPage';
import AdminDashBoardTeleCommutingNavigation from './AdminDashBoardTeleCommutingNavigation';

const AdminDashBoardTeleCommutingMainPageMainDivBox = styled.div`
    width: 100%;
    min-height: 100vh;
    margin-left: 270px;
`;

const AdminDashBoardTeleCommutingMainPage = () => {
    const [StaticsNaviButton, setStaticsNaviButton] = useState('YIKC');
    return (
        <AdminDashBoardTeleCommutingMainPageMainDivBox>
            <AdminDashBoardTeleCommutingNavigation
                NaviSelected={StaticsNaviButton}
                setStaticsNaviButton={setStaticsNaviButton}
            ></AdminDashBoardTeleCommutingNavigation>
            <AdminDashBoardTeleCommutingContentPage StaticsNaviButton={StaticsNaviButton}></AdminDashBoardTeleCommutingContentPage>
        </AdminDashBoardTeleCommutingMainPageMainDivBox>
    );
};

export default AdminDashBoardTeleCommutingMainPage;

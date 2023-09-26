import React, { useState } from 'react';
import styled from 'styled-components';
import AdminDashBoardLoginNavigationMainPage from './AdminDashBoardLoginNavigation/AdminDashBoardLoginNavigationMainPage';
import AdminDashBoardShowUsersTable from './AdminDashBoardContent/AdminDashBoardShowUsersTable';
import AdminDashBoardUpdateUsersTable from './AdminDashBoardContent/AdminDashBoardUpdateUsersTable';
import { useEffect } from 'react';
import AdminDashBoardInsertUsersTable from './AdminDashBoardContent/AdminDashBoardInsertUsersTable';
const AdminDashBoardLoginInfoMainPageMainDivBox = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 10px;
`;

const AdminDashBoardLoginInfoMainPage = () => {
    const [StaticsNaviButton, setStaticsNaviButton] = useState('ShowUsers');
    const [SelectedUsersData, setSelectedUsersData] = useState<any>(null);

    useEffect(() => {
        if (StaticsNaviButton !== 'UpdateUsers') {
            setSelectedUsersData(null);
        }
    }, [StaticsNaviButton]);

    return (
        <AdminDashBoardLoginInfoMainPageMainDivBox>
            <AdminDashBoardLoginNavigationMainPage
                NaviSelected={StaticsNaviButton}
                setStaticsNaviButton={setStaticsNaviButton}
            ></AdminDashBoardLoginNavigationMainPage>
            <div>
                {StaticsNaviButton === 'ShowUsers' ? (
                    <AdminDashBoardShowUsersTable
                        setStaticsNaviButton={setStaticsNaviButton}
                        setSelectedUsersData={setSelectedUsersData}
                    ></AdminDashBoardShowUsersTable>
                ) : (
                    <div></div>
                )}
                {StaticsNaviButton === 'UpdateUsers' ? (
                    <AdminDashBoardUpdateUsersTable
                        SelectedUsersData={SelectedUsersData}
                        setSelectedUsersData={setSelectedUsersData}
                    ></AdminDashBoardUpdateUsersTable>
                ) : (
                    <div></div>
                )}
                {StaticsNaviButton === 'InsertUsers' ? <AdminDashBoardInsertUsersTable></AdminDashBoardInsertUsersTable> : <div></div>}
            </div>
        </AdminDashBoardLoginInfoMainPageMainDivBox>
    );
};

export default AdminDashBoardLoginInfoMainPage;

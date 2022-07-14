import React from 'react';
import styled from 'styled-components';
import { userDataTypes } from '../AccessInfoMainPage';

const AdminContentMainPageMainDivBox = styled.div`
    border: 1px solid black;
`;
type AdminContentMainPageProps = {
    userData: userDataTypes[];
};

const AdminContentMainPage = ({ userData }: AdminContentMainPageProps) => {
    return (
        <AdminContentMainPageMainDivBox>
            <div>
                <div>
                    <ul>
                        <li>전체</li>
                        <li>사용자</li>
                    </ul>
                </div>
                <div>
                    <ul>
                        {userData.map((list, i) => {
                            return (
                                <li>
                                    {list.name} || {list.team} || {list.position}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </AdminContentMainPageMainDivBox>
    );
};

export default AdminContentMainPage;

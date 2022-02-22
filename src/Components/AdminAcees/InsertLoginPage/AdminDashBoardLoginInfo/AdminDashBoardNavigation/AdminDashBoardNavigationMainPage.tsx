import React from 'react';
import styled from 'styled-components';
import { SiCircle } from 'react-icons/si';
import { FaRegUserCircle } from 'react-icons/fa';
import { useParams, Link } from 'react-router-dom';
import { MdOutlinePermContactCalendar } from 'react-icons/md';
const AdminDashBoardNavigationMainPageMadinDivBox = styled.div`
    height: 100vh;
    width: 250px;
    background-color: #4c4c4c;
    position: fixed;
    .MainNaviHead {
        padding: 10px 10px;
        border-bottom: 1px solid hsla(0, 0%, 100%, 0.2);
        h3 {
            text-transform: uppercase;
            padding: 5px 0;
            display: block;
            font-size: 18px;
            color: #fff;
            text-align: center;
            font-weight: 400;
            line-height: 30px;
        }
    }
    .NavLists {
        width: 90%;
        margin: 0 auto;
        margin-top: 20px;
        li {
            margin-top: 5px;
            padding: 5px 20px;
            color: #fff;
            display: flex;
            .Lists_icons {
                font-size: 28px;
                text-align: center;
                vertical-align: middle;
            }
            .Lists_texts {
                line-height: 32px;
                margin-left: 15px;
                font-size: 0.9em;
                font-weight: bold;
            }
            :hover {
                cursor: pointer;
                background-color: #727272;
            }
        }
    }
`;

const AdminDashBoardNavigationMainPage = () => {
    const { selected } = useParams<any>();
    console.log(selected);
    return (
        <AdminDashBoardNavigationMainPageMadinDivBox>
            <div>
                <div className="MainNaviHead">
                    <h3>재택 근무 프로그램 관리자</h3>
                </div>
            </div>
            <div className="NavLists">
                <ul>
                    {/* <Link to="/AdminDashBoard/dashboard">
                        <li style={selected === 'dashboard' ? { background: '#727272' } : {}}>
                            <div className="Lists_icons">
                                <SiCircle></SiCircle>
                            </div>
                            <div className="Lists_texts">DASHBOARD</div>
                        </li>
                    </Link>
                    */}
                    <Link to="/NewAdminInsertData/LoginInfo">
                        <li style={selected === 'LoginInfo' ? { background: '#727272' } : {}}>
                            <div className="Lists_icons">
                                <MdOutlinePermContactCalendar></MdOutlinePermContactCalendar>
                            </div>
                            <div className="Lists_texts">LOGIN INFO</div>
                        </li>
                    </Link>
                    <Link to="/NewAdminInsertData/TeleCheck">
                        <li style={selected === 'TeleCheck' ? { background: '#727272' } : {}}>
                            <div className="Lists_icons">
                                <FaRegUserCircle></FaRegUserCircle>
                            </div>
                            <div className="Lists_texts">임직원 재택확인</div>
                        </li>
                    </Link>
                </ul>
            </div>
        </AdminDashBoardNavigationMainPageMadinDivBox>
    );
};

export default AdminDashBoardNavigationMainPage;

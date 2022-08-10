import React, { useState } from 'react';
import styled from 'styled-components';
import BasicDataInsertPage from './DataInsertModal/BasicDataInsertPage';
import DistanceDataInsertPage from './DataInsertModal/DistanceDataInsertPage';

const InsertModalMainPageMainDivBox = styled.div`
    .CeCalendarSubMenu_SubMenusUl {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-bottom: 40px;
        li {
            width: 25%;
            border-bottom: 3px solid #368;
            text-align: center;
            padding-bottom: 10px;
            margin-top: 10px;
            :hover {
                cursor: pointer;
            }
        }
    }
`;
type InsertModalMainPageProps = {
    dataGetSome: () => void;
    closeModal: () => void;
};
const InsertModalMainPage = ({ dataGetSome, closeModal }: InsertModalMainPageProps) => {
    const [SelectDataInsertMenu, setSelectDataInsertMenu] = useState('basic');

    return (
        <InsertModalMainPageMainDivBox>
            <div>
                <ul className="CeCalendarSubMenu_SubMenusUl">
                    <li style={SelectDataInsertMenu === 'basic' ? {} : { opacity: '0.5' }} onClick={() => setSelectDataInsertMenu('basic')}>
                        기본정보 입력
                    </li>
                    <li
                        style={SelectDataInsertMenu === 'distance' ? {} : { opacity: '0.5' }}
                        onClick={() => setSelectDataInsertMenu('distance')}
                    >
                        이동정보 입력
                    </li>
                </ul>
            </div>

            {SelectDataInsertMenu === 'basic' ? (
                <BasicDataInsertPage dataInsertOn={() => dataGetSome()} closeModal={() => closeModal()}></BasicDataInsertPage>
            ) : (
                <></>
            )}
            {SelectDataInsertMenu === 'distance' ? <DistanceDataInsertPage></DistanceDataInsertPage> : <></>}
        </InsertModalMainPageMainDivBox>
    );
};
export default InsertModalMainPage;

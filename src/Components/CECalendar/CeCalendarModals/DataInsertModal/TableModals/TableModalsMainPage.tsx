import React, { useState } from 'react';
import styled from 'styled-components';
import CeCalendarUpdateModals, { CeCalendarUpdateModalsProps } from './CeCalendarUpdate/CeCalendarUpdateModals';
import { IoCloseCircleSharp } from 'react-icons/io5';
import CeDistanceUpdateMainPage from '../../../../CSM/CSMMainContent/AdminContent/CSMModals/CSMDistanceModal/CeDistanceUpdateMainPage';

const TableModalsMainPageMainDivBox = styled.div`
    position: relative;
    .Close_Modal {
        color: red;
        position: absolute;
        right: 5px;
        top: 0px;
        :hover {
            cursor: pointer;
        }
    }
    .CeCalendarSubMenu_SubMenusUl {
        width: 100%;
        display: flex;
        margin-bottom: 50px;
        li {
            width: 25%;
            font-weight: bolder;
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

const TableModalsMainPage = ({ closeModal, getCeCalendarDatas, hadleDeleteData, hadleUpdateData }: CeCalendarUpdateModalsProps) => {
    const [ModelMenus, setModalMenus] = useState('Basic');
    return (
        <TableModalsMainPageMainDivBox>
            <div className="Close_Modal" onClick={() => closeModal()}>
                <IoCloseCircleSharp></IoCloseCircleSharp>
            </div>
            <div>
                <ul className="CeCalendarSubMenu_SubMenusUl">
                    <li style={ModelMenus === 'Basic' ? {} : { opacity: '0.5' }} onClick={() => setModalMenus('Basic')}>
                        기본 데이터 수정
                    </li>
                    <li style={ModelMenus === 'Distance' ? {} : { opacity: '0.5' }} onClick={() => setModalMenus('Distance')}>
                        이동 거리 및 시간 입력
                    </li>
                </ul>
                {ModelMenus === 'Basic' ? (
                    <CeCalendarUpdateModals
                        closeModal={closeModal}
                        getCeCalendarDatas={getCeCalendarDatas}
                        hadleDeleteData={hadleDeleteData}
                        hadleUpdateData={updatedata => hadleUpdateData(updatedata)}
                    ></CeCalendarUpdateModals>
                ) : (
                    <></>
                )}
                {ModelMenus === 'Distance' ? <CeDistanceUpdateMainPage closeModal={closeModal}></CeDistanceUpdateMainPage> : <></>}
            </div>
        </TableModalsMainPageMainDivBox>
    );
};

export default TableModalsMainPage;

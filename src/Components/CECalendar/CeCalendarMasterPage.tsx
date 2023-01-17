import React, { useState, useEffect, useRef } from 'react';
import { RootState } from '../../models';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import CeCalendarSearchIcons from './CeCalendarSearchIcons';
import TableModalsMainPage from './CeCalendarModals/DataInsertModal/TableModals/TableModalsMainPage';
import { CeCalendarTableProps, CSM_Data_Checked_Delete_Func, get_CSM_DataThunk } from '../../models/Thunk_models/CSM_Redux_Thunk/CSM_Redux';
import CSMMainContent from './CSMMainContnet/CSMMainContent';
import { FloatingMenu, MainButton, ChildButton } from 'react-floating-button-menu';
import { AiOutlineMenu } from 'react-icons/ai';
import { AiFillDatabase } from 'react-icons/ai';
import { BsFillBagPlusFill, BsFillPencilFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { FaFilter } from 'react-icons/fa';
import { ImCancelCircle } from 'react-icons/im';
import axios from 'axios';
import { toast } from '../ToastMessage/ToastManager';
import { CSM_Selected_Data_List_Reset_Func } from '../../models/CSMFilteringRedux/CSMSelectedRedux';
import InsertModalMainPage from './CeCalendarModals/InsertModalMainPage';
import CeDistanceUpdateMainPage from './CeCalendarModals/DataInsertModal/TableModals/CeDistanceUpdate/CeDistanceUpdateMainPage';
import Draggable from 'react-draggable';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '95%',
        height: '95%',
        zIndex: 100,
    },
};
Modal.setAppElement('#ModalSet');

export const AssetTableMainDivBox = styled.div`
    /* max-height: 120vh; */
    /* overflow: auto; */
    background-color: #fff;
    margin: 0 auto;
    border-radius: 10px;
    padding-top: 20px;
    padding-left: 10px;
    margin-right: 20px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
        rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
    direction: ltr;
    scrollbar-color: #d4aa70 #e4e4e4;
    scrollbar-width: thin;
    width: 98%;
    padding-bottom: 50px;
    position: relative;
    margin-top: 40px;
    ::-webkit-scrollbar {
        width: 20px;
    }

    ::-webkit-scrollbar-track {
        background-color: #e4e4e4;
        border-radius: 100px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 100px;
        border: 7px solid transparent;
        background-clip: content-box;
        background-color: #368;
    }

    table {
        font-size: 0.7em;
        position: relative;
        table-layout: fixed;
        width: 98vw;
    }

    table.type09 {
        border-collapse: collapse;
        text-align: left;
        line-height: 1.5;
        table-layout: fixed;
        /* .Table_First,
        .Table_Second,
        .Table_Third,
        .Table_Fourth,
        .Table_Fifth, */
        .Table_Sixth,
        .Table_Seventh,
        .Table_Eighth,
        .Table_Ninth,
        .Table_Tenth {
            position: sticky;
            top: 0;
            background-color: #fff;
        }
        .Table_First {
            width: 70px !important;
        }
        .Table_Second {
            width: 50px !important;
        }
        .Table_Third {
            width: 50px !important;
        }
        .Table_Fourth {
            width: 50px !important;
        }
        .Table_Fifth {
            width: 100px !important;
        }
        .Table_Sixth {
            left: 0px;
            width: 100px !important;
            z-index: 6;
        }
        .Table_Seventh {
            left: 100px;
            width: 120px !important;
            z-index: 7;
        }
        .Table_Eighth {
            left: 220px;
            width: 100px !important;
            z-index: 8;
        }
        .Table_Ninth {
            left: 320px;
            width: 150px !important;
            z-index: 9;
        }
        .Table_Tenth {
            left: 470px;
            width: 100px !important;
            z-index: 8;
        }
    }
    table.type09 > thead > tr > th {
        padding: 10px;
        font-weight: bold;
        vertical-align: top;
        color: #369;
        border: none;
        border-bottom: 3px solid #036;
        background: #f3f6f7 !important;
        font-size: 0.1em;
        table-layout: fixed;
        width: 100px;
    }
    table.type09 tbody th {
        padding: 5px;
        font-weight: bold;
        vertical-align: top;
        border-bottom: 1px solid #ccc;
        background: #f3f6f7;
        width: 100px;
        table-layout: fixed;
    }
    table.type09 td {
        /* width: 300px; */
        padding: 2px;
        vertical-align: center;
        border-bottom: 1px solid #ccc;
        font-size: 0.1em;
        text-align: center;
        width: 100px;
        table-layout: fixed;
    }
    .UserMinusIcons,
    .UserPlusIcons {
        font-size: 1.5em;
        display: inline-block;
    }
    .UserMinusIcons {
        :hover {
            cursor: pointer;
            color: red;
        }
    }
    .UserPlusIcons {
        :hover {
            cursor: pointer;
            color: limegreen;
        }
    }
    .CeCalendar_paginations {
        width: 50%;
        margin: 0 auto;
        margin-top: 30px;
        ul {
            width: 100%;
            display: flex;
            justify-content: center;
            li {
                margin-left: 20px;
                margin-right: 20px;
                font-weight: bolder;
                :hover {
                    cursor: pointer;
                    color: blue;
                }
            }
        }
    }
    .Table_container {
        width: 96vw;
        max-height: 85vh;
        padding-right: 10px;
        overflow: auto;
        ::-webkit-scrollbar {
            width: 20px;
        }

        ::-webkit-scrollbar-track {
            background-color: #e4e4e4;
            border-radius: 100px;
        }

        ::-webkit-scrollbar-thumb {
            border-radius: 100px;
            border: 7px solid transparent;
            background-clip: content-box;
            background-color: #368;
        }
    }
    .Table_hover_check {
        :hover {
            background-color: lightgray;
            cursor: pointer;
            .Table_Sixth,
            .Table_Seventh,
            .Table_Eighth,
            .Table_Ninth,
            .Table_Tenth {
                background-color: lightgray;
            }
        }
    }
    .Table_Tr_position {
        position: sticky;
        top: 0;
        left: 0;
        z-index: 15;
    }

    .Asset_Type_MenuBar {
        position: absolute;
        top: -42px;
        left: 10px;
        font-size: 0.5em;

        ul {
            display: flex;
            height: 40px;
            align-items: center;
            a {
                color: black;
            }
            li {
                width: 150px;
                height: 100%;
                line-height: 40px;
                text-align: center;
                margin-right: 20px;
                background-color: #eee;
                font-weight: bolder;
                border-radius: 5px 5px 0px 0px;
                box-shadow: rgba(0, 0, 0, 0.15) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.05) 0px 0.125em 0.5em,
                    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
                :hover {
                    cursor: pointer;
                    background-color: gray;
                    color: white;
                }
            }
            .Select_Menus {
                background-color: gray;
                color: white;
            }
        }
    }

    .FloatingMenu_Container {
        position: fixed;
        bottom: 50px;
        right: 100px;
        z-index: 99;
        cursor: move !important;
    }
`;
export type paramasTypes = {
    pagenumber: string;
    type: string;
};

export type CeCalendarMasterPagePropsTypes = {
    SubMenuClicks: string;
};

const CeCalendarMasterPage = ({ SubMenuClicks }: CeCalendarMasterPagePropsTypes) => {
    const nodeRef = useRef(null);
    const dispatch = useDispatch();
    const HandleScrollUp = useRef<any>(null);
    const { pagenumber, type } = useParams<paramasTypes>();
    // const PageNumbers = useSelector((state: RootState) => state.CSMDataGetting.CSM_Data.pagenumber);
    const CSM_Selected_Data_List = useSelector((state: RootState) => state.CSM_Selected_Data_List.Csm_Selected_Data);
    const CSM_Datas = useSelector((state: RootState) => state.CSMDataGetting.CSM_Data);

    const [data, setData] = useState<CeCalendarTableProps[]>([]);
    const [ModalOpen, setModalOpen] = useState(false);
    const [getCeCalendarDatas, setGetCeCalendarDatas] = useState<CeCalendarTableProps | null>(null);

    const [FloatingMenuChecking, setFloatingMenuChecking] = useState(true);

    const [SelectClicksModals, setSelectClicksModals] = useState({
        FilterSearch: true,
        NewDataModal: false,
        BindsDataModal: false,
    });

    const [Opacity, setOpacity] = useState(false);
    const handleStart = () => {
        setOpacity(true);
    };
    const handleEnd = () => {
        setOpacity(false);
    };

    function closeModal() {
        setSelectClicksModals({
            ...SelectClicksModals,
            NewDataModal: false,
            BindsDataModal: false,
        });
    }

    const hadleDeleteData = async () => {
        try {
            const delete_Before_data = data.filter(item => item.csm_calendar_csm_key !== getCeCalendarDatas?.csm_calendar_csm_key);
            setData(delete_Before_data);
        } catch (error) {
            console.log(error);
        }
    };
    const hadleUpdateData = async (UpdateData: CeCalendarTableProps | null) => {
        try {
            const update_Before_data = data.map(item => {
                if (item.csm_calendar_csm_key === UpdateData?.csm_calendar_csm_key) {
                    return UpdateData;
                } else {
                    return item;
                }
            });

            setData(update_Before_data);
        } catch (error) {
            console.log(error);
        }
    };

    //숨김처리
    const handleClicksForHidden = async () => {
        if (CSM_Selected_Data_List.length === 0) {
            toast.show({
                title: '숨김처리 할 데이터가 없습니다.',
                content: `데이터를 선택한 이후에 다시 시도 해주세요.`,
                duration: 4000,
                DataSuccess: false,
            });

            return;
        }

        try {
            const Change_Hiiden_Data_From_Server = await axios.post(
                `${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server//UpdateHidden`,
                { CSM_Selected_Data_List }
            );

            if (Change_Hiiden_Data_From_Server.data.dataSuccess) {
                let Change_Datas = CSM_Datas.data;

                for (var i = 0; i < CSM_Selected_Data_List.length; i++) {
                    Change_Datas = Change_Datas.map(item =>
                        item.csm_basic_data_csm_key === CSM_Selected_Data_List[i].csm_basic_data_csm_key
                            ? item.csm_calendar_hidden_on === 1
                                ? { ...item, csm_calendar_hidden_on: 0 }
                                : { ...item, csm_calendar_hidden_on: 1 }
                            : item
                    );
                }

                // 체크항목에서 Redux에서 제거
                for (var i = 0; i < CSM_Selected_Data_List.length; i++) {
                    Change_Datas = Change_Datas.map(list =>
                        list.csm_basic_data_csm_key === CSM_Selected_Data_List[i].csm_basic_data_csm_key
                            ? { ...list, csm_data_slect: 0 }
                            : list
                    );
                }

                dispatch(CSM_Data_Checked_Delete_Func(Change_Datas));
                dispatch(CSM_Selected_Data_List_Reset_Func());

                toast.show({
                    title: '숨김처리 완료!',
                    content: `${CSM_Selected_Data_List.length}개의 데이터를 숨김처리 하였습니다.`,
                    duration: 6000,
                    DataSuccess: true,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const ScrollUpping = () => {
        if (HandleScrollUp.current) {
            HandleScrollUp.current.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div>
            <div ref={HandleScrollUp}></div>
            <CeCalendarSearchIcons SubMenuClicks={SubMenuClicks}></CeCalendarSearchIcons>
            <AssetTableMainDivBox>
                <div className="Asset_Type_MenuBar">
                    <ul>
                        <Link to={`/CECalendar/${pagenumber}/ALL`}>
                            <li className={type === 'ALL' ? 'Select_Menus' : ''}>ALL</li>
                        </Link>
                        <Link to={`/CECalendar/${pagenumber}/GRINDER`}>
                            <li className={type === 'GRINDER' ? 'Select_Menus' : ''}>GRINDER</li>
                        </Link>
                        <Link to={`/CECalendar/${pagenumber}/LASER`}>
                            <li className={type === 'LASER' ? 'Select_Menus' : ''}>LASER</li>
                        </Link>
                        <Link to={`/CECalendar/${pagenumber}/DICER`}>
                            <li className={type === 'DICER' ? 'Select_Menus' : ''}>DICER</li>
                        </Link>
                    </ul>
                </div>
                <CSMMainContent SubMenuClicks={SubMenuClicks}></CSMMainContent>
                {/* Floating 메뉴 시작 */}
                <Draggable nodeRef={nodeRef} onStart={handleStart} onStop={handleEnd}>
                    <div className="FloatingMenu_Container" ref={nodeRef} style={{ opacity: Opacity ? '0.6' : '1' }}>
                        <FloatingMenu slideSpeed={500} direction="up" spacing={8} isOpen={FloatingMenuChecking}>
                            <MainButton
                                iconActive={<ImCancelCircle style={{ fontSize: 20, backgroundColor: 'white', color: 'black' }} />}
                                iconResting={<AiOutlineMenu style={{ fontSize: 20, backgroundColor: 'white', color: 'black' }} />}
                                size={56}
                                isOpen={true}
                                background={'white'}
                                onClick={() => setFloatingMenuChecking(!FloatingMenuChecking)}
                            ></MainButton>
                            <ChildButton
                                icon={<FaFilter style={{ fontSize: 20, backgroundColor: 'white', color: '#b23c46' }} />}
                                // backgroundColor="white"
                                background={'white'}
                                size={40}
                                onClick={() => ScrollUpping()}
                            />
                            <ChildButton
                                icon={<BsFillBagPlusFill style={{ fontSize: 20, backgroundColor: 'white', color: '#368' }} />}
                                background={'white'}
                                size={40}
                                onClick={() =>
                                    setSelectClicksModals({
                                        ...SelectClicksModals,
                                        NewDataModal: !SelectClicksModals.NewDataModal,
                                    })
                                }
                            />
                            <ChildButton
                                icon={<BsFillEyeSlashFill style={{ fontSize: 20, backgroundColor: 'white', color: 'gray' }} />}
                                background={'white'}
                                size={40}
                                onClick={() => handleClicksForHidden()}
                            />
                            <ChildButton
                                icon={<AiFillDatabase style={{ fontSize: 20, backgroundColor: 'white', color: '#375b31' }} />}
                                background={'white'}
                                size={40}
                                onClick={() =>
                                    setSelectClicksModals({
                                        ...SelectClicksModals,
                                        BindsDataModal: !SelectClicksModals.BindsDataModal,
                                    })
                                }
                            />
                        </FloatingMenu>
                    </div>
                </Draggable>
                {/* Floating 메뉴 종료 */}

                <Modal isOpen={ModalOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                    <TableModalsMainPage
                        closeModal={closeModal}
                        getCeCalendarDatas={getCeCalendarDatas}
                        hadleDeleteData={hadleDeleteData}
                        hadleUpdateData={updatedata => hadleUpdateData(updatedata)}
                    ></TableModalsMainPage>
                </Modal>

                {/* <Modal
                    isOpen={SelectClicksModals.NewDataModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <InsertModalMainPage dataGetSome={() => dataGetSome()} closeModal={() => closeModal()}></InsertModalMainPage>
                </Modal> */}
                <Modal isOpen={SelectClicksModals.BindsDataModal} style={customStyles}>
                    <h2 style={{ marginTop: '20px', paddingBottom: '20px', borderBottom: '1px solid black' }}>이동 거리 및 시간 입력</h2>
                    <div style={{ marginBottom: '30px' }}></div>
                    <CeDistanceUpdateMainPage closeModal={() => closeModal()}></CeDistanceUpdateMainPage>
                </Modal>
            </AssetTableMainDivBox>
        </div>
    );
};

export default CeCalendarMasterPage;

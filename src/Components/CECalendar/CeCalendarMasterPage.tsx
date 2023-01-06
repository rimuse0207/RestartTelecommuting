import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import { RootState } from '../../models';
import { useSelector, useDispatch } from 'react-redux';
import { DecryptKey } from '../../config';
import { toast } from '../ToastMessage/ToastManager';
import styled from 'styled-components';
import CeCalendarPageNation from './CeCalendarPageNation';
import { Link, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import CeCalendarUpdateModals from './CeCalendarModals/DataInsertModal/TableModals/CeCalendarUpdate/CeCalendarUpdateModals';
import CeCalendarSearchIcons from './CeCalendarSearchIcons';
import TableModalsMainPage from './CeCalendarModals/DataInsertModal/TableModals/TableModalsMainPage';
import { FcInfo } from 'react-icons/fc';
import { get_CSM_DataThunk } from '../../models/Thunk_models/CSM_Redux_Thunk/CSM_Redux';
import CSMMainContent from './CSMMainContnet/CSMMainContent';

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
            width: 50px !important;
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
        font-size: 0.7em;
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
        font-size: 1em;
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
        max-height: 70vh;
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
                background-color: #ffffff;
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
`;

export type CeCalendarTableProps = {
    csm_basic_data_binds: string;
    csm_basic_data_csm_key: string;
    csm_basic_data_csm_number: string;
    csm_basic_data_custom: string;
    csm_basic_data_division: string;
    csm_basic_data_etc: string;
    csm_basic_data_grade: string;
    csm_basic_data_indexs: number;
    csm_basic_data_issue_date: string;
    csm_basic_data_model_number: string;
    csm_basic_data_part_number: string;
    csm_basic_data_state: string;
    csm_basic_data_titles: string;
    csm_basic_data_write_date: string;
    csm_calendar_apply: null | string;
    csm_calendar_apply_id: null | string;
    csm_calendar_ce: null | string;
    csm_calendar_ce_id: null | string;
    csm_calendar_csm_key: string;
    csm_calendar_custom_date: null | string;
    csm_calendar_custom_date_id: null | string;
    csm_calendar_entering: null | string;
    csm_calendar_entering_id: null | string;
    csm_calendar_finall: null | string;
    csm_calendar_finall_id: null | string;
    csm_calendar_hidden_on: number;
    csm_calendar_indexs: number;
    csm_calendar_pay: null | string;
    csm_calendar_pay_id: null | string;
    csm_calendar_publish: null | string;
    csm_calendar_publish_id: null | string;
    csm_calendar_status: number;
    csm_calendar_write_date: string;
    csm_user_input_data_csm_key: null | string;
    csm_user_input_data_indexs: null | string;
    csm_user_input_data_operation_cost: null | string;
    csm_user_input_data_stay_days: null | string;
    csm_user_input_data_stay_days_cost: null | string;
    csm_user_input_data_total_cost: null | string;
    csm_user_input_data_travel_range: null | string;
    csm_user_input_data_travel_range_cost: null | string;
    csm_user_input_data_travel_time: null | string;
    csm_user_input_data_travel_time_cost: null | string;
    csm_user_input_data_working_count: null | string;
    csm_user_input_data_working_hours: null | string;
    csm_user_input_data_write_date: null | string;
    csm_user_input_data_writer_id: null | string;
    name: null | string;
    csm_user_input_data_apply_code: null | string;
};

export type paramasTypes = {
    pagenumber: string;
    type: string;
};
const CeCalendarMasterPage = () => {
    const dispatch = useDispatch();
    // const REACT_APP_PAGE_NUMBER = 100;
    const { pagenumber, type } = useParams<paramasTypes>();
    const GetCSMFilteringData = useSelector((state: RootState) => state.CSMFiltering.CSMFilteringData);
    const PageNumbers = useSelector((state: RootState) => state.CSMDataGetting.CSM_Data.pagenumber);

    const [data, setData] = useState<CeCalendarTableProps[]>([
        {
            csm_basic_data_binds: '',
            csm_basic_data_csm_key: '',
            csm_basic_data_csm_number: '',
            csm_basic_data_custom: '',
            csm_basic_data_division: '',
            csm_basic_data_etc: '',
            csm_basic_data_grade: '',
            csm_basic_data_indexs: 0,
            csm_basic_data_issue_date: '',
            csm_basic_data_model_number: '',
            csm_basic_data_part_number: '',
            csm_basic_data_state: '',
            csm_basic_data_titles: '',
            csm_basic_data_write_date: '',
            csm_calendar_apply: null,
            csm_calendar_apply_id: null,
            csm_calendar_ce: null,
            csm_calendar_ce_id: null,
            csm_calendar_csm_key: '',
            csm_calendar_custom_date: null,
            csm_calendar_custom_date_id: null,
            csm_calendar_entering: null,
            csm_calendar_entering_id: null,
            csm_calendar_finall: null,
            csm_calendar_finall_id: null,
            csm_calendar_hidden_on: 0,
            csm_calendar_indexs: 0,
            csm_calendar_pay: null,
            csm_calendar_pay_id: null,
            csm_calendar_publish: null,
            csm_calendar_publish_id: null,
            csm_calendar_status: 0,
            csm_calendar_write_date: '',
            csm_user_input_data_csm_key: null,
            csm_user_input_data_indexs: null,
            csm_user_input_data_operation_cost: null,
            csm_user_input_data_stay_days: null,
            csm_user_input_data_stay_days_cost: null,
            csm_user_input_data_total_cost: null,
            csm_user_input_data_travel_range: null,
            csm_user_input_data_travel_range_cost: null,
            csm_user_input_data_travel_time: null,
            csm_user_input_data_travel_time_cost: null,
            csm_user_input_data_working_count: null,
            csm_user_input_data_working_hours: null,
            csm_user_input_data_write_date: null,
            csm_user_input_data_writer_id: null,
            name: null,
            csm_user_input_data_apply_code: null,
        },
    ]);
    const [ModalOpen, setModalOpen] = useState(false);
    const [getCeCalendarDatas, setGetCeCalendarDatas] = useState<CeCalendarTableProps>({
        csm_basic_data_binds: '',
        csm_basic_data_csm_key: '',
        csm_basic_data_csm_number: '',
        csm_basic_data_custom: '',
        csm_basic_data_division: '',
        csm_basic_data_etc: '',
        csm_basic_data_grade: '',
        csm_basic_data_indexs: 0,
        csm_basic_data_issue_date: '',
        csm_basic_data_model_number: '',
        csm_basic_data_part_number: '',
        csm_basic_data_state: '',
        csm_basic_data_titles: '',
        csm_basic_data_write_date: '',
        csm_calendar_apply: null,
        csm_calendar_apply_id: null,
        csm_calendar_ce: null,
        csm_calendar_ce_id: null,
        csm_calendar_csm_key: '',
        csm_calendar_custom_date: null,
        csm_calendar_custom_date_id: null,
        csm_calendar_entering: null,
        csm_calendar_entering_id: null,
        csm_calendar_finall: null,
        csm_calendar_finall_id: null,
        csm_calendar_hidden_on: 0,
        csm_calendar_indexs: 0,
        csm_calendar_pay: null,
        csm_calendar_pay_id: null,
        csm_calendar_publish: null,
        csm_calendar_publish_id: null,
        csm_calendar_status: 0,
        csm_calendar_write_date: '',
        csm_user_input_data_csm_key: null,
        csm_user_input_data_indexs: null,
        csm_user_input_data_operation_cost: null,
        csm_user_input_data_stay_days: null,
        csm_user_input_data_stay_days_cost: null,
        csm_user_input_data_total_cost: null,
        csm_user_input_data_travel_range: null,
        csm_user_input_data_travel_range_cost: null,
        csm_user_input_data_travel_time: null,
        csm_user_input_data_travel_time_cost: null,
        csm_user_input_data_working_count: null,
        csm_user_input_data_working_hours: null,
        csm_user_input_data_write_date: null,
        csm_user_input_data_writer_id: null,
        name: null,
        csm_user_input_data_apply_code: null,
    });
    const [hiddenChecked, setHiddenChecked] = useState(false);
    const [ShowProcess, setShowProcess] = useState('');

    function closeModal() {
        setModalOpen(false);
    }

    useEffect(() => {
        dataGetSome();
    }, [GetCSMFilteringData, type]);

    const dataGetSome = async () => {
        dispatch(get_CSM_DataThunk(GetCSMFilteringData, pagenumber, type));
    };

    const hadleDeleteData = async () => {
        try {
            const delete_Before_data = data.filter(item => item.csm_calendar_csm_key !== getCeCalendarDatas.csm_calendar_csm_key);
            setData(delete_Before_data);
        } catch (error) {
            console.log(error);
        }
    };
    const hadleUpdateData = async (UpdateData: CeCalendarTableProps) => {
        try {
            const update_Before_data = data.map(item => {
                if (item.csm_calendar_csm_key === UpdateData.csm_calendar_csm_key) {
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

    return (
        <div>
            <CeCalendarSearchIcons></CeCalendarSearchIcons>
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

                <div style={{ display: 'inline-block' }}>
                    <div>
                        <div onClick={() => setHiddenChecked(!hiddenChecked)} className="ThirdTest_list_hidden_box">
                            <input type="checkbox" checked={hiddenChecked}></input>
                            {hiddenChecked ? <span>숨김 목록 숨기기</span> : <span>숨김 목록 보기</span>}
                        </div>
                    </div>
                </div>
                <CSMMainContent hiddenChecked={hiddenChecked}></CSMMainContent>

                <Modal isOpen={ModalOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                    <TableModalsMainPage
                        closeModal={closeModal}
                        getCeCalendarDatas={getCeCalendarDatas}
                        hadleDeleteData={hadleDeleteData}
                        hadleUpdateData={updatedata => hadleUpdateData(updatedata)}
                    ></TableModalsMainPage>
                </Modal>
            </AssetTableMainDivBox>
        </div>
    );
};

export default CeCalendarMasterPage;

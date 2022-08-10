import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import { RootState } from '../../models';
import { useSelector } from 'react-redux';
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
};

export type paramasTypes = {
    pagenumber: string;
    type: string;
};
const CeCalendarMasterPage = () => {
    const REACT_APP_PAGE_NUMBER = 100;
    const { pagenumber, type } = useParams<paramasTypes>();
    const [hiddenChecked, setHiddenChecked] = useState(false);
    const GetCSMFilteringData = useSelector((state: RootState) => state.CSMFiltering.CSMFilteringData);
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const [PageNumbers, setPageNumbers] = useState(0);

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
    });

    const [ShowProcess, setShowProcess] = useState('');

    function closeModal() {
        setModalOpen(false);
    }

    useEffect(() => {
        dataGetSome();
    }, [GetCSMFilteringData, type]);

    const dataGetSome = async () => {
        try {
            const DataGetSomeCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DataGetSome`, {
                GetCSMFilteringData,
                pagenumber,
                SelectTeam: type,
            });

            if (DataGetSomeCECalendar.data.dataSuccess) {
                setData(DataGetSomeCECalendar.data.datas);
                setPageNumbers(DataGetSomeCECalendar.data.Count[0] ? DataGetSomeCECalendar.data.Count[0].counts : 0);
            } else {
                alert('에러');
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: 'ERROR!',
                content: `ERROR! 서버와의 통신이 끊어졌습니다. `,
                duration: 6000,
                DataSuccess: false,
            });
        }
    };

    const handleChangeClickHidden = async (e: any, datas: any) => {
        try {
            if (e.target.checked) {
                const DataUpdateCEcalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateHidden`, {
                    datas,
                    hiddenChecked: true,
                });
                if (DataUpdateCEcalendar.data.dataSuccess) {
                    setData(
                        data.map(item =>
                            item.csm_calendar_csm_key === datas.csm_calendar_csm_key ? { ...item, csm_calendar_hidden_on: 1 } : item
                        )
                    );
                    toast.show({
                        title: '서버에 저장 성공',
                        content: `데이터 숨김처리 되었습니다. `,
                        duration: 6000,
                        DataSuccess: true,
                    });
                }
            } else {
                const DataUpdateCEcalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateHidden`, {
                    datas,
                    hiddenChecked: false,
                });
                if (DataUpdateCEcalendar.data.dataSuccess) {
                    setData(
                        data.map(item =>
                            item.csm_calendar_csm_key === datas.csm_calendar_csm_key ? { ...item, csm_calendar_hidden_on: 0 } : item
                        )
                    );
                    toast.show({
                        title: '서버에 저장 성공',
                        content: `데이터 표시처리 되었습니다. `,
                        duration: 6000,
                        DataSuccess: true,
                    });
                }
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: 'ERROR!',
                content: `ERROR! 서버와의 통신이 끊어졌습니다. `,
                duration: 6000,
                DataSuccess: false,
            });
        }
    };

    const handleClicksDeleteData = async (datas: any, text: string) => {
        try {
            if (text === '발행') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: '발행',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    setData(
                        data.map(item =>
                            item.csm_calendar_csm_key === datas.csm_calendar_csm_key
                                ? { ...item, csm_calendar_publish: '', csm_calendar_publish_id: '' }
                                : item
                        )
                    );
                }
            } else if (text === '신청') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: '신청',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    setData(
                        data.map(item =>
                            item.csm_calendar_csm_key === datas.csm_calendar_csm_key
                                ? { ...item, csm_calendar_apply: '', csm_calendar_apply_id: '' }
                                : item
                        )
                    );
                }
            } else if (text === '입고') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: '입고',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    setData(
                        data.map(item =>
                            item.csm_calendar_csm_key === datas.csm_calendar_csm_key
                                ? { ...item, csm_calendar_entering: '', csm_calendar_entering_id: '' }
                                : item
                        )
                    );
                }
            } else if (text === 'CE') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: 'CE',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    setData(
                        data.map(item =>
                            item.csm_calendar_csm_key === datas.csm_calendar_csm_key
                                ? { ...item, csm_calendar_ce: '', csm_calendar_ce_id: '' }
                                : item
                        )
                    );
                }
            } else if (text === '고객') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: '고객',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    setData(
                        data.map(item =>
                            item.csm_calendar_csm_key === datas.csm_calendar_csm_key
                                ? { ...item, csm_calendar_custom_date: '', csm_calendar_custom_date_id: '' }
                                : item
                        )
                    );
                }
            } else if (text === 'PAY') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: 'PAY',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    setData(
                        data.map(item =>
                            item.csm_calendar_csm_key === datas.csm_calendar_csm_key
                                ? { ...item, csm_calendar_pay: '', csm_calendar_pay_id: '' }
                                : item
                        )
                    );
                }
            } else if (text === 'finished') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: '완료',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    setData(
                        data.map(item =>
                            item.csm_calendar_csm_key === datas.csm_calendar_csm_key
                                ? { ...item, csm_calendar_finall: '', csm_calendar_finall_id: '' }
                                : item
                        )
                    );
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClicks = async (datas: any, text: string) => {
        if (text === '발행') {
            const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateData`, {
                selectEnter: '발행',
                datas,
                names: DecryptKey(InfomationState.name),
            });
            if (DataUpdateCECalendar.data.dataSuccess) {
                setData(
                    data.map(item =>
                        item.csm_calendar_csm_key === datas.csm_calendar_csm_key
                            ? {
                                  ...item,
                                  csm_calendar_publish: moment().format('YYYY-MM-DD'),
                                  csm_calendar_publish_id: DecryptKey(InfomationState.name),
                              }
                            : item
                    )
                );
            }
        } else if (text === '신청') {
            const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateData`, {
                selectEnter: '신청',
                datas,
                names: DecryptKey(InfomationState.name),
            });
            if (DataUpdateCECalendar.data.dataSuccess) {
                setData(
                    data.map(item =>
                        item.csm_calendar_csm_key === datas.csm_calendar_csm_key
                            ? {
                                  ...item,
                                  csm_calendar_apply: moment().format('YYYY-MM-DD'),
                                  csm_calendar_apply_id: DecryptKey(InfomationState.name),
                              }
                            : item
                    )
                );
            }
        } else if (text === '입고') {
            const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateData`, {
                selectEnter: '입고',
                datas,
                names: DecryptKey(InfomationState.name),
            });
            if (DataUpdateCECalendar.data.dataSuccess) {
                setData(
                    data.map(item =>
                        item.csm_calendar_csm_key === datas.csm_calendar_csm_key
                            ? {
                                  ...item,
                                  csm_calendar_entering: moment().format('YYYY-MM-DD'),
                                  csm_calendar_entering_id: DecryptKey(InfomationState.name),
                              }
                            : item
                    )
                );
            }
        } else if (text === 'CE') {
            const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateData`, {
                selectEnter: 'CE',
                datas,
                names: DecryptKey(InfomationState.name),
            });
            if (DataUpdateCECalendar.data.dataSuccess) {
                setData(
                    data.map(item =>
                        item.csm_calendar_csm_key === datas.csm_calendar_csm_key
                            ? {
                                  ...item,
                                  csm_calendar_ce: moment().format('YYYY-MM-DD'),
                                  csm_calendar_ce_id: DecryptKey(InfomationState.name),
                              }
                            : item
                    )
                );
            }
        } else if (text === '고객') {
            const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateData`, {
                selectEnter: '고객',
                datas,
                names: DecryptKey(InfomationState.name),
            });
            if (DataUpdateCECalendar.data.dataSuccess) {
                setData(
                    data.map(item =>
                        item.csm_calendar_csm_key === datas.csm_calendar_csm_key
                            ? {
                                  ...item,
                                  csm_calendar_custom_date: moment().format('YYYY-MM-DD'),
                                  csm_calendar_custom_date_id: DecryptKey(InfomationState.name),
                              }
                            : item
                    )
                );
            }
        } else if (text === 'PAY') {
            const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateData`, {
                selectEnter: 'PAY',
                datas,
                names: DecryptKey(InfomationState.name),
            });
            if (DataUpdateCECalendar.data.dataSuccess) {
                setData(
                    data.map(item =>
                        item.csm_calendar_csm_key === datas.csm_calendar_csm_key
                            ? {
                                  ...item,
                                  csm_calendar_pay: moment().format('YYYY-MM-DD'),
                                  csm_calendar_pay_id: DecryptKey(InfomationState.name),
                              }
                            : item
                    )
                );
            }
        } else if (text === 'finished') {
            const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateData`, {
                selectEnter: '완료',
                datas,
                names: DecryptKey(InfomationState.name),
            });
            if (DataUpdateCECalendar.data.dataSuccess) {
                setData(
                    data.map(item =>
                        item.csm_calendar_csm_key === datas.csm_calendar_csm_key
                            ? {
                                  ...item,
                                  csm_calendar_finall: moment().format('YYYY-MM-DD'),
                                  csm_calendar_finall_id: DecryptKey(InfomationState.name),
                              }
                            : item
                    )
                );
            }
        }
    };

    const handleSubUpdateData = async (list: CeCalendarTableProps) => {
        try {
            setGetCeCalendarDatas(list);
            setModalOpen(true);
        } catch (error) {
            console.log(error);
        }
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
                <div>
                    <button onClick={() => window.open(`/CeCantactPage`, 'CeCantactPage', 'width=980, height=700')}>
                        고객사 부서장 연락처
                    </button>
                </div>
                <div>
                    <select value={ShowProcess} onChange={e => setShowProcess(e.target.value)}>
                        <option value="">All</option>
                        <option value="csm_calendar_publish">발행</option>
                        <option value="csm_calendar_apply">신청</option>
                        <option value="csm_calendar_entering">입고</option>
                        <option value="csm_calendar_ce">CE</option>
                        <option value="csm_calendar_custom_date">고객</option>
                        <option value="csm_calendar_pay">PAY</option>
                        <option value="csm_calendar_finall">완료</option>
                    </select>
                </div>
                <div style={{ display: 'inline-block' }}>
                    <div>
                        <div onClick={() => setHiddenChecked(!hiddenChecked)} className="ThirdTest_list_hidden_box">
                            <input type="checkbox" checked={hiddenChecked}></input>
                            {hiddenChecked ? <span>숨김 목록 숨기기</span> : <span>숨김 목록 보기</span>}
                        </div>
                    </div>
                </div>
                <div className="Table_container">
                    <table className="type09" id="CeCalendarTables">
                        <thead>
                            <tr className="Table_Tr_position">
                                <th className="Table_First">숨김</th>
                                <th className="Table_Second">인덱스</th>
                                <th className="Table_Third">상태</th>
                                <th className="Table_Fourth">등급</th>
                                <th className="Table_Fifth">발행일</th>
                                <th className="Table_Sixth">CSM</th>
                                <th className="Table_Seventh">MODEL</th>
                                <th className="Table_Eighth">제번</th>
                                <th className="Table_Ninth">고객사</th>
                                <th className="Table_Tenth">Part NO.</th>
                                <th>제목</th>
                                <th>비고</th>
                                <th>사용자 이름</th>
                                <th>작업시간</th>
                                <th>작업인원</th>
                                <th>이동거리</th>
                                <th>이동시간</th>
                                <th>숙박일수</th>
                                <th>이동거리 비용</th>
                                <th>이동시간 비용</th>
                                <th>숙박비용</th>
                                <th>작업비용</th>
                                <th>총비용</th>

                                <th>발행</th>
                                <th>신청</th>
                                <th>입고</th>
                                <th>CE</th>
                                <th>고객</th>
                                <th>PAY</th>
                                <th>완료</th>

                                <th>자세히</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data
                                .filter(item => {
                                    if (!hiddenChecked) {
                                        return item.csm_calendar_hidden_on === 0 ? item : '';
                                    }
                                })
                                .filter(item => {
                                    if (ShowProcess === '') {
                                        return item;
                                    } else if (ShowProcess === 'csm_calendar_publish') {
                                        return !item.csm_calendar_apply ? item : '';
                                    } else if (ShowProcess === 'csm_calendar_apply') {
                                        return !item.csm_calendar_entering ? item : '';
                                    } else if (ShowProcess === 'csm_calendar_entering') {
                                        return !item.csm_calendar_ce ? item : '';
                                    } else if (ShowProcess === 'csm_calendar_ce') {
                                        return !item.csm_calendar_custom_date ? item : '';
                                    } else if (ShowProcess === 'csm_calendar_custom_date') {
                                        return !item.csm_calendar_pay ? item : '';
                                    } else if (ShowProcess === 'csm_calendar_pay') {
                                        return !item.csm_calendar_finall ? item : '';
                                    } else if (ShowProcess === 'csm_calendar_finall') {
                                        return item.csm_calendar_finall ? item : '';
                                    }
                                })
                                .map((list: any, i) => {
                                    var classnamesAUTO = 'basic';

                                    if (!list.csm_calendar_publish) {
                                        classnamesAUTO = 'basic_yellow';
                                    } else if (!list.csm_calendar_apply) {
                                        classnamesAUTO = 'basic_lime';
                                    } else if (!list.csm_calendar_entering) {
                                        classnamesAUTO = 'basic_blue';
                                    } else if (!list.csm_calendar_ce) {
                                        classnamesAUTO = 'basic_purple';
                                    } else if (!list.csm_calendar_custom_date) {
                                        classnamesAUTO = 'basic_skyblue';
                                    } else if (!list.csm_calendar_pay) {
                                        classnamesAUTO = 'basic_orange';
                                    } else if (!list.csm_calendar_finall) {
                                        classnamesAUTO = 'basic_finish';
                                    }
                                    return (
                                        <tr key={list.csm_calendar_indexs} className="Table_hover_check">
                                            <td className="Table_First">
                                                <input
                                                    type="checkbox"
                                                    checked={list.csm_calendar_hidden_on === 0 ? false : true}
                                                    onChange={e => handleChangeClickHidden(e, list)}
                                                ></input>
                                            </td>
                                            <td className="Table_Second">{i + 1}</td>
                                            <td className="Table_Third">{list.csm_basic_data_state}</td>
                                            <td className="Table_Fourth">{list.csm_basic_data_grade}</td>
                                            <td className="Table_Fifth">{list.csm_basic_data_issue_date}</td>
                                            <td className="Table_Sixth">{list.csm_basic_data_csm_number}</td>
                                            <td className="Table_Seventh">{list.csm_basic_data_model_number}</td>
                                            <td className="Table_Eighth">{list.csm_basic_data_binds}</td>
                                            <td className="Table_Ninth">{list.csm_basic_data_custom}</td>
                                            <td className="Table_Tenth">{list.csm_basic_data_part_number}</td>
                                            <td>{list.csm_basic_data_titles}</td>
                                            <td>{list.csm_basic_data_etc}</td>

                                            <td>{list.name}</td>

                                            <td>
                                                {list.csm_user_input_data_working_hours
                                                    ? `${list.csm_user_input_data_working_hours} 시간`
                                                    : ''}
                                            </td>
                                            <td>
                                                {list.csm_user_input_data_working_count
                                                    ? `${list.csm_user_input_data_working_count} 명`
                                                    : ''}
                                            </td>
                                            <td>{list.csm_user_input_data_travel_range ? list.csm_user_input_data_travel_range : ''}</td>
                                            <td>{list.csm_user_input_data_travel_time ? list.csm_user_input_data_travel_time : ''}</td>
                                            <td>{list.csm_user_input_data_stay_days ? list.csm_user_input_data_stay_days : ''}</td>
                                            <td>
                                                {list.csm_user_input_data_travel_range_cost
                                                    ? list.csm_user_input_data_travel_range_cost
                                                    : ''}
                                            </td>
                                            <td>
                                                {list.csm_user_input_data_travel_time_cost ? list.csm_user_input_data_travel_time_cost : ''}
                                            </td>
                                            <td>
                                                {list.csm_user_input_data_stay_days_cost ? list.csm_user_input_data_stay_days_cost : ''}
                                            </td>
                                            <td>
                                                {list.csm_user_input_data_operation_cost ? list.csm_user_input_data_operation_cost : ''}
                                            </td>
                                            <td>{list.csm_user_input_data_total_cost ? list.csm_user_input_data_total_cost : ''}</td>

                                            <td
                                                className={classnamesAUTO}
                                                style={list.csm_calendar_publish ? {} : { backgroundColor: 'white' }}
                                            >
                                                <div className="Insert_dates">
                                                    {classnamesAUTO === 'basic_yellow' ? (
                                                        <div>
                                                            <button onClick={() => handleClicks(list, '발행')}>확인</button>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="ThirdTest_Delete_for_div_box"
                                                            onDoubleClick={() => handleClicksDeleteData(list, '발행')}
                                                        >
                                                            <div>{list.csm_calendar_publish}</div>
                                                            <div>{list.csm_calendar_publish ? list.csm_calendar_publish_id : ''}</div>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td
                                                className={classnamesAUTO}
                                                style={list.csm_calendar_apply ? {} : { backgroundColor: 'white' }}
                                            >
                                                {classnamesAUTO === 'basic_lime' ? (
                                                    <div>
                                                        <button onClick={() => handleClicks(list, '신청')}>확인</button>
                                                    </div>
                                                ) : (
                                                    <div
                                                        className="ThirdTest_Delete_for_div_box"
                                                        onDoubleClick={() => handleClicksDeleteData(list, '신청')}
                                                    >
                                                        <div>{list.csm_calendar_apply}</div>
                                                        <div>{list.csm_calendar_apply ? list.csm_calendar_apply_id : ''}</div>
                                                    </div>
                                                )}
                                            </td>
                                            <td
                                                className={classnamesAUTO}
                                                style={list.csm_calendar_entering ? {} : { backgroundColor: 'white' }}
                                            >
                                                {classnamesAUTO === 'basic_blue' ? (
                                                    <div>
                                                        <button onClick={() => handleClicks(list, '입고')}>확인</button>
                                                    </div>
                                                ) : (
                                                    <div
                                                        className="ThirdTest_Delete_for_div_box"
                                                        onDoubleClick={() => handleClicksDeleteData(list, '입고')}
                                                    >
                                                        <div>{list.csm_calendar_entering}</div>
                                                        <div>{list.csm_calendar_entering ? list.csm_calendar_entering_id : ''}</div>
                                                    </div>
                                                )}
                                            </td>
                                            <td className={classnamesAUTO} style={list.csm_calendar_ce ? {} : { backgroundColor: 'white' }}>
                                                {classnamesAUTO === 'basic_purple' ? (
                                                    <div>
                                                        <button onClick={() => handleClicks(list, 'CE')}>확인</button>
                                                    </div>
                                                ) : (
                                                    <div
                                                        className="ThirdTest_Delete_for_div_box"
                                                        onDoubleClick={() => handleClicksDeleteData(list, 'CE')}
                                                    >
                                                        <div>{list.csm_calendar_ce}</div>
                                                        <div>{list.csm_calendar_ce ? list.csm_calendar_ce_id : ''}</div>
                                                    </div>
                                                )}
                                            </td>
                                            <td
                                                className={classnamesAUTO}
                                                style={list.csm_calendar_custom_date ? {} : { backgroundColor: 'white' }}
                                            >
                                                {classnamesAUTO === 'basic_skyblue' ? (
                                                    <div>
                                                        <button onClick={() => handleClicks(list, '고객')}>확인</button>
                                                    </div>
                                                ) : (
                                                    <div
                                                        className="ThirdTest_Delete_for_div_box"
                                                        onDoubleClick={() => handleClicksDeleteData(list, '고객')}
                                                    >
                                                        <div>{list.csm_calendar_custom_date}</div>
                                                        <div>{list.csm_calendar_custom_date ? list.csm_calendar_custom_date_id : ''}</div>
                                                    </div>
                                                )}
                                            </td>
                                            <td
                                                className={classnamesAUTO}
                                                style={list.csm_calendar_pay ? {} : { backgroundColor: 'white' }}
                                            >
                                                {classnamesAUTO === 'basic_orange' ? (
                                                    DecryptKey(InfomationState.name) === '이지원' ||
                                                    DecryptKey(InfomationState.name) === '이광민' ? (
                                                        <div>
                                                            <div>
                                                                <button onClick={() => handleClicks(list, 'PAY')}>확인</button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div></div>
                                                    )
                                                ) : (
                                                    <div
                                                        className="ThirdTest_Delete_for_div_box"
                                                        onDoubleClick={() => handleClicksDeleteData(list, 'PAY')}
                                                    >
                                                        <div>{list.csm_calendar_pay}</div>
                                                        <div>{list.csm_calendar_pay ? list.csm_calendar_pay_id : ''}</div>
                                                    </div>
                                                )}
                                            </td>
                                            <td
                                                className={classnamesAUTO}
                                                style={list.csm_calendar_finall ? {} : { backgroundColor: 'white' }}
                                            >
                                                {classnamesAUTO === 'basic_finish' ? (
                                                    DecryptKey(InfomationState.name) === '이지원' ||
                                                    DecryptKey(InfomationState.name) === '이광민' ? (
                                                        <div>
                                                            <div>
                                                                <button onClick={() => handleClicks(list, 'finished')}>확인</button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div></div>
                                                    )
                                                ) : (
                                                    <div
                                                        className="ThirdTest_Delete_for_div_box"
                                                        onDoubleClick={() => handleClicksDeleteData(list, 'finished')}
                                                    >
                                                        <div>{list.csm_calendar_finall}</div>
                                                        <div>{list.csm_calendar_finall_id}</div>
                                                    </div>
                                                )}
                                            </td>

                                            <td onClick={() => handleSubUpdateData(list)}>
                                                <FcInfo></FcInfo>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
                <div className="CeCalendar_paginations">
                    <ul>
                        {Number(pagenumber) > 3 ? (
                            <>
                                <li onClick={() => window.location.replace(`/CECalendar/${1}`)}>1</li>
                                <li>...</li>
                            </>
                        ) : (
                            <></>
                        )}
                        {Number(pagenumber) - 2 > 0 ? (
                            <>
                                <li onClick={() => window.location.replace(`/CECalendar/${Number(pagenumber) - 2}`)}>
                                    {Number(pagenumber) - 2}
                                </li>
                            </>
                        ) : (
                            <></>
                        )}
                        {Number(pagenumber) - 1 > 0 ? (
                            <>
                                <li onClick={() => window.location.replace(`/CECalendar/${Number(pagenumber) - 1}`)}>
                                    {Number(pagenumber) - 1}
                                </li>
                            </>
                        ) : (
                            <></>
                        )}

                        <li style={{ color: '#0031f7' }}>{pagenumber}</li>

                        {Number(pagenumber) + 1 < Math.ceil(PageNumbers / REACT_APP_PAGE_NUMBER) ? (
                            <>
                                <li onClick={() => window.location.replace(`/CECalendar/${Number(pagenumber) + 1}`)}>
                                    {Number(pagenumber) + 1}
                                </li>
                            </>
                        ) : (
                            <></>
                        )}

                        {Number(pagenumber) + 2 < Math.ceil(PageNumbers / REACT_APP_PAGE_NUMBER) ? (
                            <>
                                <li onClick={() => window.location.replace(`/CECalendar/${Number(pagenumber) + 2}`)}>
                                    {Number(pagenumber) + 2}
                                </li>
                            </>
                        ) : (
                            <></>
                        )}

                        {Number(pagenumber) < Math.ceil(PageNumbers / REACT_APP_PAGE_NUMBER) - 3 ? (
                            <>
                                {' '}
                                <li>...</li>
                                <li
                                    onClick={() =>
                                        window.location.replace(`/CECalendar/${Math.ceil(PageNumbers / REACT_APP_PAGE_NUMBER) - 1}`)
                                    }
                                >
                                    {Math.ceil(PageNumbers / REACT_APP_PAGE_NUMBER) - 1}
                                </li>
                            </>
                        ) : (
                            <></>
                        )}
                    </ul>
                </div>

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

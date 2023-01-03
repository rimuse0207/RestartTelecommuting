import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { DecryptKey } from '../../../../config';
import { RootState } from '../../../../models';
import { toast } from '../../../ToastMessage/ToastManager';
import { CeCalendarTableProps } from '../../CeCalendarMasterPage';
import { FcInfo } from 'react-icons/fc';
import moment from 'moment';
import { get_CSM_User_Used_DataThunk } from '../../../../models/Thunk_models/CSM_Redux_Thunk/CSM_User_Used_Redux';

const CSMUsedUserContentMainDivBox = styled.div`
    border: 1px solid black;
    margin-top: 50px;
`;

type CSM_Datas_Type = {
    FirstData: CeCalendarTableProps[];
    SecondData: CeCalendarTableProps[];
};

const CSMUsedUserContent = () => {
    const dispatch = useDispatch();
    const CSM_User_Used_Datas = useSelector((state: RootState) => state.CSM_User_Used_DataGetting.Datas);
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);

    const [CSM_Datas, setCSM_Datas] = useState<CSM_Datas_Type[]>([]);

    const [hiddenChecked, setHiddenChecked] = useState(false);
    const [ShowProcess, setShowProcess] = useState('');
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

    const HanldeDataGetting = async () => {
        try {
            const HandleDataGetting_data_Server_axios = await axios.get(
                `${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/User_Selected_Data_DataGetSome`
            );

            if (HandleDataGetting_data_Server_axios.data.dataSuccess) {
                console.log(HandleDataGetting_data_Server_axios);
                setCSM_Datas(HandleDataGetting_data_Server_axios.data.Datas);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // HanldeDataGetting();
        dispatch(get_CSM_User_Used_DataThunk());
    }, []);

    return (
        <CSMUsedUserContentMainDivBox>
            <div className="Table_container">
                <table className="type09" id="CeCalendarTables">
                    <thead>
                        <tr className="Table_Tr_position">
                            <th className="Table_Second">인덱스</th>
                            <th>신청 날짜</th>
                            <th className="Table_Third">상태</th>
                            <th className="Table_Fourth">등급</th>
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
                        </tr>
                    </thead>
                    <tbody>
                        {CSM_User_Used_Datas.map((item, i) => {
                            return item.SecondData.map((list, j) => {
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
                                    <tr
                                        key={list.csm_calendar_indexs}
                                        className="Table_hover_check"
                                        style={j === item.SecondData.length - 1 ? { borderBottom: '3px solid black' } : {}}
                                    >
                                        {/* <td className="Table_First">
                                            <input
                                                type="checkbox"
                                                checked={list.csm_calendar_hidden_on === 0 ? false : true}
                                                onChange={e => handleChangeClickHidden(e, list)}
                                            ></input>
                                        </td> */}
                                        {j === 0 ? (
                                            <>
                                                <td className="Table_Second" rowSpan={item.SecondData.length}>
                                                    {i + 1}
                                                </td>
                                                <td className="Table_Second" rowSpan={item.SecondData.length}>
                                                    {moment(list.csm_user_input_data_apply_code?.split('_')[0].slice(0, 8)).format(
                                                        'YYYY-MM-DD'
                                                    )}
                                                </td>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                        <td className="Table_Third">{list.csm_basic_data_state}</td>
                                        <td className="Table_Fourth">{list.csm_basic_data_grade}</td>
                                        {/* <td className="Table_Fifth">{list.csm_basic_data_issue_date}</td> */}
                                        <td className="Table_Sixth">{list.csm_basic_data_csm_number}</td>
                                        <td className="Table_Seventh">{list.csm_basic_data_model_number}</td>
                                        <td className="Table_Eighth">{list.csm_basic_data_binds}</td>
                                        <td className="Table_Ninth">{list.csm_basic_data_custom}</td>
                                        <td className="Table_Tenth">{list.csm_basic_data_part_number}</td>
                                        <td>{list.csm_basic_data_titles}</td>
                                        <td>{list.csm_basic_data_etc}</td>
                                        <td>{list.name}</td>
                                        <td>
                                            {list.csm_user_input_data_working_hours ? `${list.csm_user_input_data_working_hours} 시간` : ''}
                                        </td>
                                        <td>
                                            {list.csm_user_input_data_working_count ? `${list.csm_user_input_data_working_count} 명` : ''}
                                        </td>

                                        {j === 0 ? (
                                            <>
                                                <td rowSpan={item.SecondData.length}>
                                                    {list.csm_user_input_data_travel_range ? list.csm_user_input_data_travel_range : ''}
                                                </td>
                                                <td rowSpan={item.SecondData.length}>
                                                    {list.csm_user_input_data_travel_time ? list.csm_user_input_data_travel_time : ''}시간
                                                </td>
                                                <td rowSpan={item.SecondData.length}>
                                                    {list.csm_user_input_data_stay_days ? `${list.csm_user_input_data_stay_days}일` : ''}
                                                </td>
                                                <td rowSpan={item.SecondData.length}>
                                                    {list.csm_user_input_data_travel_range_cost
                                                        ? list.csm_user_input_data_travel_range_cost
                                                              .toString()
                                                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                        : ''}
                                                </td>
                                                <td rowSpan={item.SecondData.length}>
                                                    {list.csm_user_input_data_travel_time_cost
                                                        ? list.csm_user_input_data_travel_time_cost
                                                              .toString()
                                                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                        : ''}
                                                </td>
                                                <td rowSpan={item.SecondData.length}>
                                                    {list.csm_user_input_data_stay_days_cost
                                                        ? list.csm_user_input_data_stay_days_cost
                                                              .toString()
                                                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                        : ''}
                                                </td>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                        <td>
                                            {list.csm_user_input_data_operation_cost
                                                ? list.csm_user_input_data_operation_cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                : ''}
                                        </td>

                                        <td>
                                            {list.csm_user_input_data_total_cost
                                                ? list.csm_user_input_data_total_cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                : ''}
                                        </td>
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
                                        <td className={classnamesAUTO} style={list.csm_calendar_apply ? {} : { backgroundColor: 'white' }}>
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
                                        <td className={classnamesAUTO} style={list.csm_calendar_pay ? {} : { backgroundColor: 'white' }}>
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
                                        <td className={classnamesAUTO} style={list.csm_calendar_finall ? {} : { backgroundColor: 'white' }}>
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
                                    </tr>
                                );
                            });
                        })}
                    </tbody>
                </table>
            </div>
        </CSMUsedUserContentMainDivBox>
    );
};

export default CSMUsedUserContent;

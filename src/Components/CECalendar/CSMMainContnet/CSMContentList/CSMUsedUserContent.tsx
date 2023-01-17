import axios from 'axios';
import React, { useEffect, useState, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { DecryptKey } from '../../../../config';
import { RootState } from '../../../../models';
import { toast } from '../../../ToastMessage/ToastManager';
import { FaFileDownload } from 'react-icons/fa';
import { BsFillCalendar2DateFill } from 'react-icons/bs';
import moment from 'moment';
import {
    CSM_User_Used_CE_CALENDAR_CHECKED_Func,
    get_CSM_User_Used_DataThunk,
} from '../../../../models/Thunk_models/CSM_Redux_Thunk/CSM_User_Used_Redux';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { CeCalendarTableProps } from '../../../../models/Thunk_models/CSM_Redux_Thunk/CSM_Redux';
import LoaderMainPage from '../../../Loader/LoaderMainPage';
import { paramasTypes } from '../../CeCalendarMasterPage';
import { useParams } from 'react-router-dom';

const CSMUsedUserContentMainDivBox = styled.div`
    margin-top: 50px;
    .Text_Title {
        position: relative;
        .UserUsed_Data_Download {
            position: absolute;
            top: -30px;
            right: 30px;
            color: green;
            z-index: 99;
            font-size: 2em;
            text-align: center;
            :hover {
                cursor: pointer;
                opacity: 0.7;
            }
        }
    }

    .SearchInputContainerSubTitleFlexDivBox {
        display: flex;
        justify-content: center;
        align-items: center;
        h4 {
            text-align: center;
        }
        .react-datepicker-wrapper {
            min-width: 400px;
        }
    }

    .saturday {
        color: blue;
    }
    .sunday {
        color: red;
    }

    .Search_Date_Button_Container {
        text-align: center;
        margin-top: 30px;
        button {
            width: 250px;
            height: 40px;
            border: none;
            background-color: green;
            color: white;
            font-size: 1.1em;
            border-radius: 10px;
            font-weight: bolder;
            :hover {
                cursor: pointer;
                background-color: #efefef;
                color: green;
                transition: all 0.3s ease-in-out;
            }
        }
    }
`;

export type NowTimesTypes = {
    startTime: Date;
    endTime: Date;
};

const CSMUsedUserContent = () => {
    const date = new Date();
    const { pagenumber, type } = useParams<paramasTypes>();
    const dispatch = useDispatch();
    const CSM_User_Used_Datas = useSelector((state: RootState) => state.CSM_User_Used_DataGetting.Datas);
    const CSM_User_Used_ErrorChecking = useSelector((state: RootState) => state.CSM_User_Used_DataGetting);
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const GetCSMFilteringData = useSelector((state: RootState) => state.CSMFiltering.CSMFilteringData);
    const [NowTimes, setNowTimes] = useState<NowTimesTypes>({
        startTime: new Date(date.getFullYear(), date.getMonth(), 1),
        endTime: new Date(date.getFullYear(), date.getMonth() + 1, 0),
    });

    const handleClicksDeleteData = async (datas: CeCalendarTableProps, text: string) => {
        try {
            if (text === '발행') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: '발행',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    const Second_Change_Datas = CSM_User_Used_Datas.map(item =>
                        item.SecondData.map((list, j) => {
                            return list.csm_calendar_csm_key === datas.csm_calendar_csm_key
                                ? {
                                      ...list,
                                      csm_calendar_publish: '',
                                      csm_calendar_publish_id: '',
                                  }
                                : list;
                        })
                    );

                    const FinallData = [];
                    for (var i = 0; i < Second_Change_Datas.length; i++) {
                        FinallData.push({
                            FirstData: Second_Change_Datas[i][0],
                            SecondData: Second_Change_Datas[i],
                        });
                    }

                    dispatch(CSM_User_Used_CE_CALENDAR_CHECKED_Func(FinallData));
                }
            } else if (text === '신청') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: '신청',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    const Second_Change_Datas = CSM_User_Used_Datas.map(item =>
                        item.SecondData.map((list, j) => {
                            return list.csm_calendar_csm_key === datas.csm_calendar_csm_key
                                ? {
                                      ...list,
                                      csm_calendar_apply: '',
                                      csm_calendar_apply_id: '',
                                  }
                                : list;
                        })
                    );

                    const FinallData = [];
                    for (var i = 0; i < Second_Change_Datas.length; i++) {
                        FinallData.push({
                            FirstData: Second_Change_Datas[i][0],
                            SecondData: Second_Change_Datas[i],
                        });
                    }

                    dispatch(CSM_User_Used_CE_CALENDAR_CHECKED_Func(FinallData));
                }
            } else if (text === '입고') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: '입고',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    const Second_Change_Datas = CSM_User_Used_Datas.map(item =>
                        item.SecondData.map((list, j) => {
                            return list.csm_calendar_csm_key === datas.csm_calendar_csm_key
                                ? {
                                      ...list,
                                      csm_calendar_entering: '',
                                      csm_calendar_entering_id: '',
                                  }
                                : list;
                        })
                    );

                    const FinallData = [];
                    for (var i = 0; i < Second_Change_Datas.length; i++) {
                        FinallData.push({
                            FirstData: Second_Change_Datas[i][0],
                            SecondData: Second_Change_Datas[i],
                        });
                    }

                    dispatch(CSM_User_Used_CE_CALENDAR_CHECKED_Func(FinallData));
                }
            } else if (text === 'CE') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: 'CE',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    const Second_Change_Datas = CSM_User_Used_Datas.map(item =>
                        item.SecondData.map((list, j) => {
                            return list.csm_calendar_csm_key === datas.csm_calendar_csm_key
                                ? {
                                      ...list,
                                      csm_calendar_ce: '',
                                      csm_calendar_ce_id: '',
                                  }
                                : list;
                        })
                    );
                    const FinallData = [];
                    for (var i = 0; i < Second_Change_Datas.length; i++) {
                        FinallData.push({
                            FirstData: Second_Change_Datas[i][0],
                            SecondData: Second_Change_Datas[i],
                        });
                    }

                    dispatch(CSM_User_Used_CE_CALENDAR_CHECKED_Func(FinallData));
                }
            } else if (text === '고객') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: '고객',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    const Second_Change_Datas = CSM_User_Used_Datas.map(item =>
                        item.SecondData.map((list, j) => {
                            return list.csm_calendar_csm_key === datas.csm_calendar_csm_key
                                ? {
                                      ...list,
                                      csm_calendar_custom_date: '',
                                      csm_calendar_custom_date_id: '',
                                  }
                                : list;
                        })
                    );
                    const FinallData = [];
                    for (var i = 0; i < Second_Change_Datas.length; i++) {
                        FinallData.push({
                            FirstData: Second_Change_Datas[i][0],
                            SecondData: Second_Change_Datas[i],
                        });
                    }

                    dispatch(CSM_User_Used_CE_CALENDAR_CHECKED_Func(FinallData));
                }
            } else if (text === 'PAY') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: 'PAY',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    const Second_Change_Datas = CSM_User_Used_Datas.map(item =>
                        item.SecondData.map((list, j) => {
                            return list.csm_calendar_csm_key === datas.csm_calendar_csm_key
                                ? {
                                      ...list,
                                      csm_calendar_pay: '',
                                      csm_calendar_pay_id: '',
                                  }
                                : list;
                        })
                    );
                    const FinallData = [];
                    for (var i = 0; i < Second_Change_Datas.length; i++) {
                        FinallData.push({
                            FirstData: Second_Change_Datas[i][0],
                            SecondData: Second_Change_Datas[i],
                        });
                    }

                    dispatch(CSM_User_Used_CE_CALENDAR_CHECKED_Func(FinallData));
                }
            } else if (text === 'finished') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: '완료',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    const Second_Change_Datas = CSM_User_Used_Datas.map(item =>
                        item.SecondData.map((list, j) => {
                            return list.csm_calendar_csm_key === datas.csm_calendar_csm_key
                                ? {
                                      ...list,
                                      csm_calendar_finall: '',
                                      csm_calendar_finall_id: '',
                                  }
                                : list;
                        })
                    );
                    const FinallData = [];
                    for (var i = 0; i < Second_Change_Datas.length; i++) {
                        FinallData.push({
                            FirstData: Second_Change_Datas[i][0],
                            SecondData: Second_Change_Datas[i],
                        });
                    }
                    dispatch(CSM_User_Used_CE_CALENDAR_CHECKED_Func(FinallData));
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClicks = async (datas: CeCalendarTableProps, text: string) => {
        if (text === '발행') {
            const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateData`, {
                selectEnter: '발행',
                datas,
                names: DecryptKey(InfomationState.name),
            });

            if (DataUpdateCECalendar.data.dataSuccess) {
                const Second_Change_Datas = CSM_User_Used_Datas.map(item =>
                    item.SecondData.map((list, j) => {
                        return list.csm_calendar_csm_key === datas.csm_calendar_csm_key
                            ? {
                                  ...list,
                                  csm_calendar_publish: moment().format('YYYY-MM-DD'),
                                  csm_calendar_publish_id: DecryptKey(InfomationState.name),
                              }
                            : list;
                    })
                );

                const FinallData = [];
                for (var i = 0; i < Second_Change_Datas.length; i++) {
                    FinallData.push({
                        FirstData: Second_Change_Datas[i][0],
                        SecondData: Second_Change_Datas[i],
                    });
                }

                dispatch(CSM_User_Used_CE_CALENDAR_CHECKED_Func(FinallData));
            }
        } else if (text === '신청') {
            const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateData`, {
                selectEnter: '신청',
                datas,
                names: DecryptKey(InfomationState.name),
            });
            if (DataUpdateCECalendar.data.dataSuccess) {
                const Second_Change_Datas = CSM_User_Used_Datas.map(item =>
                    item.SecondData.map((list, j) => {
                        return list.csm_calendar_csm_key === datas.csm_calendar_csm_key
                            ? {
                                  ...list,
                                  csm_calendar_apply: moment().format('YYYY-MM-DD'),
                                  csm_calendar_apply_id: DecryptKey(InfomationState.name),
                              }
                            : list;
                    })
                );

                const FinallData = [];
                for (var i = 0; i < Second_Change_Datas.length; i++) {
                    FinallData.push({
                        FirstData: Second_Change_Datas[i][0],
                        SecondData: Second_Change_Datas[i],
                    });
                }

                dispatch(CSM_User_Used_CE_CALENDAR_CHECKED_Func(FinallData));
            }
        } else if (text === '입고') {
            const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateData`, {
                selectEnter: '입고',
                datas,
                names: DecryptKey(InfomationState.name),
            });
            if (DataUpdateCECalendar.data.dataSuccess) {
                const Second_Change_Datas = CSM_User_Used_Datas.map(item =>
                    item.SecondData.map((list, j) => {
                        return list.csm_calendar_csm_key === datas.csm_calendar_csm_key
                            ? {
                                  ...list,
                                  csm_calendar_entering: moment().format('YYYY-MM-DD'),
                                  csm_calendar_entering_id: DecryptKey(InfomationState.name),
                              }
                            : list;
                    })
                );

                const FinallData = [];
                for (var i = 0; i < Second_Change_Datas.length; i++) {
                    FinallData.push({
                        FirstData: Second_Change_Datas[i][0],
                        SecondData: Second_Change_Datas[i],
                    });
                }

                dispatch(CSM_User_Used_CE_CALENDAR_CHECKED_Func(FinallData));
            }
        } else if (text === 'CE') {
            const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateData`, {
                selectEnter: 'CE',
                datas,
                names: DecryptKey(InfomationState.name),
            });
            if (DataUpdateCECalendar.data.dataSuccess) {
                const Second_Change_Datas = CSM_User_Used_Datas.map(item =>
                    item.SecondData.map((list, j) => {
                        return list.csm_calendar_csm_key === datas.csm_calendar_csm_key
                            ? {
                                  ...list,
                                  csm_calendar_ce: moment().format('YYYY-MM-DD'),
                                  csm_calendar_ce_id: DecryptKey(InfomationState.name),
                              }
                            : list;
                    })
                );
                const FinallData = [];
                for (var i = 0; i < Second_Change_Datas.length; i++) {
                    FinallData.push({
                        FirstData: Second_Change_Datas[i][0],
                        SecondData: Second_Change_Datas[i],
                    });
                }

                dispatch(CSM_User_Used_CE_CALENDAR_CHECKED_Func(FinallData));
            }
        } else if (text === '고객') {
            const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateData`, {
                selectEnter: '고객',
                datas,
                names: DecryptKey(InfomationState.name),
            });
            if (DataUpdateCECalendar.data.dataSuccess) {
                const Second_Change_Datas = CSM_User_Used_Datas.map(item =>
                    item.SecondData.map((list, j) => {
                        return list.csm_calendar_csm_key === datas.csm_calendar_csm_key
                            ? {
                                  ...list,
                                  csm_calendar_custom_date: moment().format('YYYY-MM-DD'),
                                  csm_calendar_custom_date_id: DecryptKey(InfomationState.name),
                              }
                            : list;
                    })
                );
                const FinallData = [];
                for (var i = 0; i < Second_Change_Datas.length; i++) {
                    FinallData.push({
                        FirstData: Second_Change_Datas[i][0],
                        SecondData: Second_Change_Datas[i],
                    });
                }

                dispatch(CSM_User_Used_CE_CALENDAR_CHECKED_Func(FinallData));
            }
        } else if (text === 'PAY') {
            const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateData`, {
                selectEnter: 'PAY',
                datas,
                names: DecryptKey(InfomationState.name),
            });
            if (DataUpdateCECalendar.data.dataSuccess) {
                const Second_Change_Datas = CSM_User_Used_Datas.map(item =>
                    item.SecondData.map((list, j) => {
                        return list.csm_calendar_csm_key === datas.csm_calendar_csm_key
                            ? {
                                  ...list,
                                  csm_calendar_pay: moment().format('YYYY-MM-DD'),
                                  csm_calendar_pay_id: DecryptKey(InfomationState.name),
                              }
                            : list;
                    })
                );
                const FinallData = [];
                for (var i = 0; i < Second_Change_Datas.length; i++) {
                    FinallData.push({
                        FirstData: Second_Change_Datas[i][0],
                        SecondData: Second_Change_Datas[i],
                    });
                }

                dispatch(CSM_User_Used_CE_CALENDAR_CHECKED_Func(FinallData));
            }
        } else if (text === 'finished') {
            const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateData`, {
                selectEnter: '완료',
                datas,
                names: DecryptKey(InfomationState.name),
            });
            if (DataUpdateCECalendar.data.dataSuccess) {
                const Second_Change_Datas = CSM_User_Used_Datas.map(item =>
                    item.SecondData.map((list, j) => {
                        return list.csm_calendar_csm_key === datas.csm_calendar_csm_key
                            ? {
                                  ...list,
                                  csm_calendar_finall: moment().format('YYYY-MM-DD'),
                                  csm_calendar_finall_id: DecryptKey(InfomationState.name),
                              }
                            : list;
                    })
                );
                const FinallData = [];
                for (var i = 0; i < Second_Change_Datas.length; i++) {
                    FinallData.push({
                        FirstData: Second_Change_Datas[i][0],
                        SecondData: Second_Change_Datas[i],
                    });
                }
                dispatch(CSM_User_Used_CE_CALENDAR_CHECKED_Func(FinallData));
            }
        }
    };

    const HandleNewDataGetting = () => {
        dispatch(get_CSM_User_Used_DataThunk(NowTimes, GetCSMFilteringData, type));
    };

    const handleDownloadUserUsedData = async () => {
        try {
            const DownloadData_User_Used_Data_From_Server = await axios.get(
                `${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/Downloaded_Data_User_Used`,
                {
                    params: {
                        startTime: NowTimes.startTime,
                        endTime: NowTimes.endTime,
                    },
                }
            );

            if (DownloadData_User_Used_Data_From_Server.data.dataSuccess) {
                window.open(`${process.env.REACT_APP_DB_HOST}/CSM/${DownloadData_User_Used_Data_From_Server.data.ExcelDataDownloadUrl}`);
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // dispatch(get_CSM_User_Used_DataThunk(NowTimes));
        HandleNewDataGetting();
    }, [GetCSMFilteringData, type]);

    return (
        <CSMUsedUserContentMainDivBox>
            <div className="Text_Title">
                <h2>사용자 등록 완료</h2>
                <div className="UserUsed_Data_Download" onClick={() => handleDownloadUserUsedData()}>
                    <FaFileDownload></FaFileDownload>
                    <div style={{ fontSize: '0.1em' }}>Excel 다운</div>
                </div>
            </div>
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
                        {!CSM_User_Used_ErrorChecking.error ? (
                            CSM_User_Used_Datas.map((item, i) => {
                                let dataSum_Cost = 0;
                                return item.SecondData.map((list, j) => {
                                    var classnamesAUTO = 'basic';
                                    dataSum_Cost = dataSum_Cost + Number(list.csm_user_input_data_total_cost);
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
                                        <>
                                            <tr key={list.csm_calendar_indexs} className="Table_hover_check">
                                                {j === 0 ? (
                                                    <>
                                                        <td className="Table_Second" rowSpan={item.SecondData.length + 1}>
                                                            {i + 1}
                                                        </td>
                                                        <td className="Table_Second" rowSpan={item.SecondData.length + 1}>
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

                                                {j === 0 ? (
                                                    <>
                                                        <td rowSpan={item.SecondData.length}>
                                                            {list.csm_user_input_data_travel_range
                                                                ? list.csm_user_input_data_travel_range
                                                                : ''}
                                                        </td>
                                                        <td rowSpan={item.SecondData.length}>
                                                            {list.csm_user_input_data_travel_time
                                                                ? list.csm_user_input_data_travel_time
                                                                : ''}
                                                            시간
                                                        </td>
                                                        <td rowSpan={item.SecondData.length}>
                                                            {list.csm_user_input_data_stay_days
                                                                ? `${list.csm_user_input_data_stay_days}일`
                                                                : ''}
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
                                                        ? list.csm_user_input_data_operation_cost
                                                              .toString()
                                                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                        : ''}
                                                </td>

                                                <td>
                                                    {list.csm_user_input_data_total_cost
                                                        ? list.csm_user_input_data_total_cost
                                                              .toString()
                                                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
                                                <td
                                                    className={classnamesAUTO}
                                                    style={list.csm_calendar_ce ? {} : { backgroundColor: 'white' }}
                                                >
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
                                                            <div>
                                                                {list.csm_calendar_custom_date ? list.csm_calendar_custom_date_id : ''}
                                                            </div>
                                                        </div>
                                                    )}
                                                </td>
                                                <td
                                                    className={classnamesAUTO}
                                                    style={list.csm_calendar_pay ? {} : { backgroundColor: 'white' }}
                                                >
                                                    {classnamesAUTO === 'basic_orange' ? (
                                                        DecryptKey(InfomationState.name) === '유성재' ||
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
                                                        DecryptKey(InfomationState.name) === '유성재' ||
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
                                            {item.SecondData.length === j + 1 ? (
                                                <tr
                                                    style={{
                                                        borderBottom: '3px solid black',
                                                        height: '50px',
                                                        fontSize: '1em',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    <td colSpan={19} style={{ textAlign: 'end' }}>
                                                        합계
                                                    </td>
                                                    <td>{dataSum_Cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            ) : (
                                                <></>
                                            )}
                                        </>
                                    );
                                });
                            })
                        ) : (
                            <tr>
                                <td colSpan={2}>ERROR 발생.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <LoaderMainPage loading={CSM_User_Used_ErrorChecking.loading}></LoaderMainPage>
        </CSMUsedUserContentMainDivBox>
    );
};

export default CSMUsedUserContent;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HiSelector } from 'react-icons/hi';
import { GiClick } from 'react-icons/gi';
import { BsPencilSquare } from 'react-icons/bs';
import DatePicker, { registerLocale } from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { NothingGet, OneParamsGet } from '../../../../../API/GETApi/GetApi';
import { MdOutlineCancel } from 'react-icons/md';
import { OneParamsPost } from '../../../../../API/POSTApi/PostApi';
import { RootState } from '../../../../../../models';
import { useDispatch, useSelector } from 'react-redux';
import { DecryptKey } from '../../../../../../config';
import {
    get_CSM_DataThunk,
    CSM_Data_Resister_Finished_Delete_Func,
    CSM_CE_CALENDAR_CHECKED_Func,
    CeCalendarTableProps,
    CSM_Data_Checked_Delete_Func,
} from '../../../../../../models/Thunk_models/CSM_Redux_Thunk/CSM_Redux';
import { paramasTypes } from '../../../../CeCalendarMasterPage';
import { useParams } from 'react-router-dom';
import { toast } from '../../../../../ToastMessage/ToastManager';
import { CSM_User_Used_Data_Register_Func } from '../../../../../../models/Thunk_models/CSM_Redux_Thunk/CSM_User_Used_Redux';
import {
    CSM_Selected_Data_List_Reset_Func,
    CSM_Selected_Data_List_Func,
} from '../../../../../../models/CSMFilteringRedux/CSMSelectedRedux';

registerLocale('ko', ko);
const CeDistanceUpdateMainPageMainDivBox = styled.div`
    .InputBox_Main_Container {
        display: flex;
        height: 45px;
        width: 600px;
        margin-bottom: 20px;
        align-items: center;
        .InputBox_Main_Text {
            width: 200px;
        }
        .InputBox_Main_Input {
            display: flex;
            align-items: center;
            .InputBox_Main_Input_Icons {
                border: 1px solid lightgray;
                width: 50px;
                height: 45px;
                font-size: 1.5em;
                padding-top: 7px;
                text-align: center;
            }
            .InputBox_Main_Input_Values {
                border: 1px solid lightgray;
                width: 350px;
                height: 45px;
                .react-datepicker-wrapper,
                .select__control,
                .basic-single {
                    height: 100%;
                }
                .react-datepicker__input-container {
                    height: 100%;
                }
                input {
                    padding-left: 10px;
                }
                input,
                select {
                    outline: none;
                    border: none;
                    width: 100%;
                    height: 100%;
                }
            }
            .InputBox_Main_Input_Values_Stay_Date_Button {
                display: flex;
                border: 1px solid lightgray;
                width: 350px;
                height: 45px;
                justify-content: space-between;
                align-items: center;
                .StayFont {
                    font-size: 1.3em;
                    font-weight: bolder;
                }
                button {
                    margin-left: 10px;
                    margin-right: 10px;
                    width: 50px;
                    font-size: 1.3em;
                    font-weight: bolder;
                }
            }
        }
    }

    .User_Input_Float_Main {
        ::after {
            clear: both;
            content: '';
            display: block;
        }
        .User_Input_Float_Left {
            float: left;
            width: 47%;
        }
        .User_Input_Float_Right {
            float: right;
            width: 47%;
            .Binds_Container {
                border: 1px dashed black;
                padding: 10px;
                height: 400px;
                overflow-y: auto;
                border-radius: 5px;
                position: relative;

                .InputBox_Flex {
                    display: flex;
                }
                h3 {
                    position: sticky;
                    background-color: #fff;
                    top: -11px;
                    left: 10px;
                    z-index: 1;
                }
                ul {
                    display: flex;
                    flex-wrap: wrap;
                    li {
                        width: 100px;
                        margin: 10px;
                        :hover {
                            cursor: pointer;
                            color: blue;
                        }
                        label {
                            :hover {
                                cursor: pointer;
                                color: blue;
                            }
                        }
                    }
                }
            }
        }
    }

    .Selected_distance_binds_Data_Container {
        margin-top: 30px;

        table {
            font-size: 0.7em;
            position: relative;
            width: 100%;
        }

        table.type09 {
            border-collapse: collapse;
            text-align: left;
            line-height: 1.5;
        }
        tr {
            :hover {
                background-color: #efefef;
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
            font-size: 1.3em;
            text-align: center;
            width: 100px;
            table-layout: fixed;
        }
        .Delete_Binds_Cancel_Icons {
            font-size: 1.3em;
            :hover {
                cursor: pointer;
                color: red;
            }
        }

        /* display: flex;
        flex-wrap: wrap;
        min-height: 300px;
        li {
            border: 1px dashed gray;
            margin: 5px;
            padding: 5px;
            .handleClicksContainer {
                display: flex;

                justify-content: space-between;
                align-items: center;
            }
        } */
    }

    .btns {
        text-align: end;
        margin-top: 50px;
        margin-bottom: 50px;
        .btn {
            display: inline-block;
            margin-right: 2px;
            padding: 10px 20px;
            background: none;
            border: 1px solid #c0c0c0;
            border-radius: 2px;
            color: #666;
            font-size: 1em;
            outline: none;
            transition: all 100ms ease-out;
            &:hover,
            &:focus {
                transform: translateY(-3px);
                cursor: pointer;
            }
            &-confirm {
                border: 1px solid #2962ff;
                background: #2962ff;
                color: #fff;
            }
        }
    }
`;

type csm_distance_lists_Types = {
    value: string | null;
    label: string | null;
};

type CeDistanceState_Types = {
    distance_date: Date;
    distance_company: csm_distance_lists_Types;
    distance_csmNumber: csm_distance_lists_Types;
    distance_equitModel: csm_distance_lists_Types;
    distance_binds: CeCalendarTableProps[];
    Select_team: string;
    Select_Id: string;
    start_location: string;
    stay_chek: boolean;
    stay_day: number;
};

type csm_Binds_lists_Types = {
    csm_Binds_Lists_Data: CeCalendarTableProps;
    select: boolean;
    nowSelected: boolean;
};

type CeDistanceUpdateMainPagePropsType = {
    closeModal: () => void;
};

const CeDistanceUpdateMainPage = ({ closeModal }: CeDistanceUpdateMainPagePropsType) => {
    const dispatch = useDispatch();
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const CSM_Selected_Data_List = useSelector((state: RootState) => state.CSM_Selected_Data_List.Csm_Selected_Data);
    const CSM_Datas = useSelector((state: RootState) => state.CSMDataGetting.CSM_Data);
    const [CeDistanceState, setCeDistanceState] = useState<CeDistanceState_Types>({
        distance_date: new Date(),
        start_location: '판교',
        distance_company: {
            value: null,
            label: null,
        },
        distance_csmNumber: {
            value: null,
            label: null,
        },
        distance_equitModel: {
            value: null,
            label: null,
        },
        distance_binds: [],
        Select_team: InfomationState.team,
        // Select_team: 'grinder',
        Select_Id: DecryptKey(InfomationState.id),

        stay_chek: false,
        stay_day: 0,
    });
    const { pagenumber, type } = useParams<paramasTypes>();
    const [csm_distance_lists, setCsm_distance_lists] = useState<csm_distance_lists_Types[]>([]);
    const [csm_csmNumber_lists, setCsm_csmNumber_lists] = useState<csm_distance_lists_Types[]>([]);
    const [csm_equitModel_lists, setCsm_equitModel_lists] = useState<csm_distance_lists_Types[]>([]);
    const [csm_Binds_lists, setCsm_Binds_lists] = useState<csm_Binds_lists_Types[]>([]);

    //초기 렌더링 ( 고객사명 및 CSM번호 불러오기 )
    useEffect(() => {
        Csm_Distance_Info_Data();
    }, []);

    const Csm_Distance_Info_Data = async () => {
        try {
            const getWriterDatas = await NothingGet(`/CE_Calendar_app_server/Csm_Distance_Info_Data`);

            if (getWriterDatas.data.dataSuccess) {
                setCsm_distance_lists(getWriterDatas.data.csm_distance_lists_data);
                setCsm_csmNumber_lists(getWriterDatas.data.setCsm_csmNumber_lists_data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    //장비모델 렌더링 ( CSM번호 변경시 장비모델 불러오기 )

    useEffect(() => {
        if (setCsm_csmNumber_lists.length === 0) {
            return;
        } else if (CeDistanceState.distance_csmNumber) {
            setCeDistanceState({
                ...CeDistanceState,
                distance_equitModel: {
                    value: null,
                    label: null,
                },
            });
            Csm_Distance_Info_Data_EquitMentModel();
        }
    }, [CeDistanceState.distance_csmNumber]);

    const Csm_Distance_Info_Data_EquitMentModel = async () => {
        try {
            const getWriterDatas_equitModel = await OneParamsGet(`/CE_Calendar_app_server/Csm_Distance_Info_Data_EquitMentModel`, {
                csm_number: CeDistanceState.distance_csmNumber.value,
            });

            if (getWriterDatas_equitModel.data.dataSuccess) {
                setCsm_equitModel_lists(getWriterDatas_equitModel.data.setCsm_equitModel_lists_data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    //제번 렌더링 ( 장비모델 변경시 제번 불러오기 )

    useEffect(() => {
        if (csm_equitModel_lists.length === 0) {
            return;
        } else if (CeDistanceState.distance_equitModel) {
            Csm_Distance_Info_Data_Binds();
        }
    }, [CeDistanceState.distance_equitModel]);

    const Csm_Distance_Info_Data_Binds = async () => {
        try {
            const getWriterDatas_Binds = await OneParamsGet(`/CE_Calendar_app_server/Csm_Distance_Info_Data_Binds`, {
                csm_number: CeDistanceState.distance_csmNumber.value,
                csm_models: CeDistanceState.distance_equitModel.value,
            });
            if (getWriterDatas_Binds.data.dataSuccess) {
                setCsm_Binds_lists(getWriterDatas_Binds.data.setCsm_Binds_lists_data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // 제번 클릭 시 데이터 추가 및 삭제
    const handleClicksBinds = (item: csm_Binds_lists_Types) => {
        //선택 되어 있을 시,
        if (item.select) {
            const ChangeCsm_Binds_lists = csm_Binds_lists.map(list =>
                list.csm_Binds_Lists_Data.csm_number_respond_working_indexs !== item.csm_Binds_Lists_Data.csm_number_respond_working_indexs
                    ? list
                    : { ...list, select: false }
            );
            setCsm_Binds_lists(ChangeCsm_Binds_lists);
            const Change_Scelect_Binds = CeDistanceState.distance_binds.filter(binds =>
                binds.csm_number_respond_working_indexs !== item.csm_Binds_Lists_Data.csm_number_respond_working_indexs ? binds : ''
            );
            setCeDistanceState({ ...CeDistanceState, distance_binds: Change_Scelect_Binds });
            const CSM_Selected_Data_List_Delete = CSM_Selected_Data_List.filter(
                list => list.csm_basic_data_csm_key !== item.csm_Binds_Lists_Data.csm_basic_data_csm_key
            );
            // 선택항목 Redux에서 제거
            dispatch(CSM_Selected_Data_List_Func(CSM_Selected_Data_List_Delete));
        }
        // 선택 되어 있지 않을 시,
        else {
            /// 고객사가 같지 않을 경우
            for (var i = 0; i < CSM_Selected_Data_List.length; i++) {
                if (CSM_Selected_Data_List[i].csm_basic_data_custom !== item.csm_Binds_Lists_Data.csm_basic_data_custom) {
                    toast.show({
                        title: '고객사 일치 실패',
                        content: `${item.csm_Binds_Lists_Data.csm_basic_data_custom}의 고객사가 일치 하지 않아 등록 되지 않습니다.`,
                        duration: 4000,
                        DataSuccess: false,
                    });
                    return;
                }
            }

            //고객사 일치 등록 완료

            const ChangeCsm_Binds_lists = csm_Binds_lists.map(list =>
                list.csm_Binds_Lists_Data.csm_number_respond_working_indexs !== item.csm_Binds_Lists_Data.csm_number_respond_working_indexs
                    ? list
                    : { ...list, select: true }
            );
            setCsm_Binds_lists(ChangeCsm_Binds_lists);

            dispatch(CSM_Selected_Data_List_Func(CSM_Selected_Data_List.concat(item.csm_Binds_Lists_Data)));
            // setCeDistanceState({ ...CeDistanceState, distance_binds: CeDistanceState.distance_binds.concat(item) });
        }
    };

    // 선택 된 제번 데이터 추가 및 삭제
    const handleDeleteData = (item: CeCalendarTableProps) => {
        const ChangeCsm_Binds_lists = csm_Binds_lists.map(list =>
            list.csm_Binds_Lists_Data.csm_number_respond_working_indexs !== item.csm_number_respond_working_indexs
                ? list
                : { ...list, select: false }
        );
        setCsm_Binds_lists(ChangeCsm_Binds_lists);
        const Change_Scelect_Binds = CeDistanceState.distance_binds.filter(binds =>
            binds.csm_number_respond_working_indexs !== item.csm_number_respond_working_indexs ? binds : ''
        );
        setCeDistanceState({ ...CeDistanceState, distance_binds: Change_Scelect_Binds });

        const CSM_Selected_Data_List_Delete = CSM_Selected_Data_List.filter(
            list => list.csm_basic_data_csm_key !== item.csm_basic_data_csm_key
        );

        // 선택항목 Redux에서 제거
        dispatch(CSM_Selected_Data_List_Func(CSM_Selected_Data_List_Delete));

        // 체크항목에서 Redux에서 제거
        const Changes_Data_CSM = CSM_Datas.data.map(list =>
            list.csm_basic_data_csm_key === item.csm_basic_data_csm_key ? { ...list, csm_data_slect: 0 } : list
        );

        dispatch(CSM_Data_Checked_Delete_Func(Changes_Data_CSM));
    };

    // 데이터 저장 취소
    const CloseHandleClicks = () => {
        if (window.confirm('정말 나가시겠습니까?')) {
            // dispatch(CSM_Selected_Data_List_Reset_Func());
            closeModal();
        }
    };

    //데이터 서버에 저장
    const handleClickStoreFromServer = async () => {
        try {
            if (!CeDistanceState.distance_company.value) {
                alert('고객사명을 선택 해주세요.');
                return;
            } else if (CSM_Selected_Data_List.length === 0) {
                alert('데이터를 선택 해주세요.');
            } else if (CSM_Selected_Data_List.length > 2) {
                for (var i = 1; i < CSM_Selected_Data_List.length; i++) {
                    if (CSM_Selected_Data_List[0].csm_basic_data_custom !== CSM_Selected_Data_List[i].csm_basic_data_custom) {
                        alert('고객사 명이 상이하여 등록이 불가합니다.');
                        return;
                    }
                }
            }

            const binds_data_send_from_server = await OneParamsPost('/CE_Calendar_app_server/binds_data_send', {
                CeDistanceState,
                CSM_Selected_Data_List,
            });

            if (binds_data_send_from_server.data.dataSuccess) {
                if (binds_data_send_from_server.data.UpdateSuccess) {
                    // CSM Redux 사용자 데이터에 추가
                    dispatch(CSM_User_Used_Data_Register_Func(binds_data_send_from_server.data.User_Datas_Rows));

                    let ChangeData = CSM_Datas.data;
                    for (var i = 0; i < CSM_Selected_Data_List.length; i++) {
                        ChangeData = ChangeData.filter(
                            item => item.csm_basic_data_csm_key !== CSM_Selected_Data_List[i].csm_basic_data_csm_key
                        );
                    }
                    ChangeData = ChangeData.map(item => (item.csm_data_slect !== 0 ? { ...item, csm_data_slect: 0 } : item));

                    // CSM Redux 기본 데이터에서 삭제
                    dispatch(CSM_Data_Resister_Finished_Delete_Func(ChangeData));

                    // 선택 CSM 초기화
                    dispatch(CSM_Selected_Data_List_Reset_Func());
                    alert('데이터 등록 완료.');
                    closeModal();
                } else {
                    alert('아직 이동거리 시간에 대한 CSM 정보가 없습니다.\n 이광민프로에게 정보 추가 이후에 다시 시도해 주세요.');
                }
            } else {
            }
        } catch (error) {
            console.log(error);
            alert('Error');
        }
    };

    return (
        <CeDistanceUpdateMainPageMainDivBox>
            <div className="User_Input_Float_Main">
                <div className="User_Input_Float_Left">
                    <div className="InputBox_Main_Container">
                        <div className="InputBox_Main_Text">
                            <h3>일자.</h3>
                        </div>
                        <div className="InputBox_Main_Input">
                            <div className="InputBox_Main_Input_Icons">
                                <GiClick></GiClick>
                            </div>
                            <div className="InputBox_Main_Input_Values">
                                <DatePicker
                                    selected={CeDistanceState.distance_date}
                                    onChange={(date: any) => setCeDistanceState({ ...CeDistanceState, distance_date: date })}
                                    locale={ko}
                                    dateFormat="yyy-MM-dd"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="InputBox_Main_Container">
                        <div className="InputBox_Main_Text">
                            <h3>숙박일수.</h3>
                        </div>
                        <div className="InputBox_Main_Input">
                            <div className="InputBox_Main_Input_Icons">
                                <GiClick></GiClick>
                            </div>
                            <div className="InputBox_Main_Input_Values_Stay_Date_Button">
                                <button
                                    onClick={() => {
                                        if (CeDistanceState.stay_day - 1 < 0) {
                                            alert('0보다 작을 수 없습니다.');
                                        } else {
                                            setCeDistanceState({ ...CeDistanceState, stay_day: CeDistanceState.stay_day - 1 });
                                        }
                                    }}
                                >
                                    -
                                </button>
                                <div className="StayFont">{CeDistanceState.stay_day} 일</div>
                                <button onClick={() => setCeDistanceState({ ...CeDistanceState, stay_day: CeDistanceState.stay_day + 1 })}>
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="InputBox_Main_Container">
                        <div className="InputBox_Main_Text">
                            <h3>출발지.</h3>
                        </div>
                        <div className="InputBox_Main_Input">
                            <div className="InputBox_Main_Input_Icons">
                                <HiSelector></HiSelector>
                            </div>
                            <div className="InputBox_Main_Input_Values">
                                <select
                                    value={CeDistanceState.start_location}
                                    onChange={e => setCeDistanceState({ ...CeDistanceState, start_location: e.target.value })}
                                >
                                    <option value="판교">판교</option>
                                    <option value="아산">아산</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="InputBox_Main_Container">
                        <div className="InputBox_Main_Text">
                            <h3>고객사명.</h3>
                        </div>
                        <div className="InputBox_Main_Input">
                            <div className="InputBox_Main_Input_Icons">
                                <BsPencilSquare></BsPencilSquare>
                            </div>
                            <div className="InputBox_Main_Input_Values">
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    value={CeDistanceState.distance_company}
                                    onChange={(value: any) => {
                                        setCeDistanceState({ ...CeDistanceState, distance_company: value });
                                    }}
                                    isClearable={true}
                                    isSearchable={true}
                                    options={csm_distance_lists}
                                    placeholder="고객사 명을 선택 또는 검색 해 주세요."
                                ></Select>
                            </div>
                        </div>
                    </div>

                    <div className="InputBox_Main_Container">
                        <div className="InputBox_Main_Text">
                            <h3>CSM번호.</h3>
                        </div>
                        <div className="InputBox_Main_Input">
                            <div className="InputBox_Main_Input_Icons">
                                <HiSelector></HiSelector>
                            </div>
                            <div className="InputBox_Main_Input_Values">
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    value={CeDistanceState.distance_csmNumber}
                                    onChange={(value: any) => {
                                        setCeDistanceState({ ...CeDistanceState, distance_csmNumber: value });
                                    }}
                                    isClearable={true}
                                    isSearchable={true}
                                    options={csm_csmNumber_lists}
                                    placeholder="CSM번호를 선택 또는 검색 해 주세요."
                                ></Select>
                            </div>
                        </div>
                    </div>

                    <div className="InputBox_Main_Container">
                        <div className="InputBox_Main_Text">
                            <h3>장비모델.</h3>
                        </div>
                        <div className="InputBox_Main_Input">
                            <div className="InputBox_Main_Input_Icons">
                                <HiSelector></HiSelector>
                            </div>
                            <div className="InputBox_Main_Input_Values">
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    value={CeDistanceState.distance_equitModel}
                                    onChange={(value: any) => {
                                        setCeDistanceState({ ...CeDistanceState, distance_equitModel: value });
                                    }}
                                    isClearable={true}
                                    isSearchable={true}
                                    options={csm_equitModel_lists}
                                    placeholder="장비모델을 선택 또는 검색 해 주세요."
                                ></Select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="User_Input_Float_Right">
                    <div className="Binds_Container">
                        <h3>제번 목록</h3>
                        <ul>
                            {csm_Binds_lists.map(list => {
                                return list.nowSelected ? (
                                    <li
                                        key={list.csm_Binds_Lists_Data.csm_number_respond_working_indexs}
                                        style={{ textDecorationLine: 'line-through', opacity: '0.5' }}
                                    >
                                        <div className="InputBox_Flex">
                                            <div>
                                                <input
                                                    id={`${list.csm_Binds_Lists_Data.csm_number_respond_working_indexs}`}
                                                    type="checkbox"
                                                    checked={false}
                                                    readOnly
                                                ></input>
                                            </div>
                                            <div>
                                                <label htmlFor={`${list.csm_Binds_Lists_Data.csm_number_respond_working_indexs}`}>
                                                    {list.csm_Binds_Lists_Data.csm_number_respond_working_binds}
                                                </label>
                                            </div>
                                        </div>
                                    </li>
                                ) : (
                                    <li
                                        onChange={() => handleClicksBinds(list)}
                                        key={list.csm_Binds_Lists_Data.csm_number_respond_working_indexs}
                                    >
                                        <div className="InputBox_Flex">
                                            <div>
                                                <input
                                                    id={`${list.csm_Binds_Lists_Data.csm_number_respond_working_indexs}`}
                                                    type="checkbox"
                                                    checked={list.select}
                                                    readOnly
                                                ></input>
                                            </div>
                                            <div>
                                                <label htmlFor={`${list.csm_Binds_Lists_Data.csm_number_respond_working_indexs}`}>
                                                    {list.csm_Binds_Lists_Data.csm_number_respond_working_binds}
                                                </label>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <div className="Selected_distance_binds_Data_Container">
                    <h3>등록 데이터</h3>
                    <table className="type09">
                        <thead>
                            <tr>
                                <th>인덱스</th>
                                <th>CSM 번호</th>
                                <th>장비 모델</th>
                                <th>제번</th>
                                <th>고객사</th>
                                <th>작업 시간</th>
                                <th>작업 인원</th>
                                <th>삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {CSM_Selected_Data_List.map((list, j) => {
                                return (
                                    <tr key={list.csm_number_respond_working_indexs}>
                                        <td>{j + 1}</td>
                                        <td>{list.csm_number_respond_working_csm_number}</td>
                                        <td>{list.csm_number_respond_working_model}</td>
                                        <td>{list.csm_number_respond_working_binds}</td>
                                        <td>{list.csm_basic_data_custom}</td>
                                        {j === 0 ? (
                                            <td rowSpan={CSM_Selected_Data_List.length}>
                                                {list.csm_number_respond_working_working_hours} 시간
                                            </td>
                                        ) : (
                                            ''
                                        )}
                                        {j === 0 ? (
                                            <td rowSpan={CSM_Selected_Data_List.length}>
                                                {list.csm_number_respond_working_working_count} 명
                                            </td>
                                        ) : (
                                            ''
                                        )}

                                        <td>
                                            <MdOutlineCancel
                                                onClick={() => handleDeleteData(list)}
                                                className="Delete_Binds_Cancel_Icons"
                                            ></MdOutlineCancel>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="btns">
                <button className="btn btn-cancel" onClick={CloseHandleClicks}>
                    <span>취소</span>
                </button>
                <button className="btn btn-confirm" onClick={handleClickStoreFromServer}>
                    <span>저장</span>
                </button>
            </div>
        </CeDistanceUpdateMainPageMainDivBox>
    );
};

export default CeDistanceUpdateMainPage;

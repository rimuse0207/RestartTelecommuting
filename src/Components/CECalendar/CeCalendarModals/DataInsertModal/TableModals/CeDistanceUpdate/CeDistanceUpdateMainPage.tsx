import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HiSelector } from 'react-icons/hi';
import { GiClick } from 'react-icons/gi';
import { BsPencilSquare } from 'react-icons/bs';
import { CeCalendarUpdateModalsProps } from '../CeCalendarUpdate/CeCalendarUpdateModals';
import DatePicker, { registerLocale } from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { NothingGet, OneParamsGet } from '../../../../../API/GETApi/GetApi';

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
        }
    }
    .Binds_Container {
        border: 1px dashed black;
        padding: 10px;
        ul {
            display: flex;
            flex-wrap: wrap;
            li {
                width: 100px;
                margin: 10px;
            }
        }
    }
`;

type csm_distance_lists_Types = {
    value: string;
    label: string;
};

type csm_Binds_lists_Types = {
    select: boolean;
    csm_number_respond_working_binds: string;
    csm_number_respond_working_indexs: string;
};

const CeDistanceUpdateMainPage = ({ closeModal, getCeCalendarDatas, hadleDeleteData, hadleUpdateData }: CeCalendarUpdateModalsProps) => {
    const [CeDistanceState, setCeDistanceState] = useState({
        distance_date: new Date(),
        distance_company: {
            value: '',
            label: '',
        },
        distance_csmNumber: {
            value: '',
            label: '',
        },
        distance_equitModel: {
            value: '',
            label: '',
        },
    });
    const [csm_distance_lists, setCsm_distance_lists] = useState<csm_distance_lists_Types[]>([]);
    const [csm_csmNumber_lists, setCsm_csmNumber_lists] = useState<csm_distance_lists_Types[]>([]);
    const [csm_equitModel_lists, setCsm_equitModel_lists] = useState<csm_distance_lists_Types[]>([]);
    const [csm_Binds_lists, setCsm_Binds_lists] = useState<csm_Binds_lists_Types[]>([]);
    useEffect(() => {
        Csm_Distance_Info_Data();
    }, []);

    useEffect(() => {
        if (CeDistanceState.distance_csmNumber.value) {
            setCeDistanceState({
                ...CeDistanceState,
                distance_equitModel: {
                    value: '',
                    label: '',
                },
            });
            Csm_Distance_Info_Data_EquitMentModel();
        }
    }, [CeDistanceState.distance_csmNumber]);

    useEffect(() => {
        if (CeDistanceState.distance_equitModel.value) {
            Csm_Distance_Info_Data_Binds();
        }
    }, [CeDistanceState.distance_equitModel]);

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

    const Csm_Distance_Info_Data_Binds = async () => {
        try {
            const getWriterDatas_Binds = await OneParamsGet(`/CE_Calendar_app_server/Csm_Distance_Info_Data_Binds`, {
                csm_number: CeDistanceState.distance_csmNumber.value,
                csm_models: CeDistanceState.distance_equitModel.value,
            });

            if (getWriterDatas_Binds.data.dataSuccess) {
                console.log(getWriterDatas_Binds);
                setCsm_Binds_lists(getWriterDatas_Binds.data.setCsm_Binds_lists_data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <CeDistanceUpdateMainPageMainDivBox>
            <div>
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
                                // withPortal
                                locale={ko}
                                dateFormat="yyy-MM-dd"
                            />
                        </div>
                    </div>
                </div>
                <div className="InputBox_Main_Container">
                    <div className="InputBox_Main_Text">
                        <h3>숙박유무.</h3>
                    </div>
                    <div className="InputBox_Main_Input">
                        <div className="InputBox_Main_Input_Icons">
                            <HiSelector></HiSelector>
                        </div>
                        <div className="InputBox_Main_Input_Values">
                            <select>
                                <option>판교</option>
                                <option>아산</option>
                            </select>
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
                            <select>
                                <option>판교</option>
                                <option>아산</option>
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

                <div className="Binds_Container">
                    <ul>
                        {csm_Binds_lists.map((list, i) => {
                            return (
                                <li>
                                    <div>
                                        <span>
                                            <input type="checkbox" checked={list.select}></input>
                                        </span>
                                        <span>{list.csm_number_respond_working_binds}</span>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </CeDistanceUpdateMainPageMainDivBox>
    );
};

export default CeDistanceUpdateMainPage;

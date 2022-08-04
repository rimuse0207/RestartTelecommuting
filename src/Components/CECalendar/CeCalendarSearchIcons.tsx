import React, { useState } from 'react';
import styled from 'styled-components';
import { BsFileEarmarkBarGraphFill } from 'react-icons/bs';
import { BsFillBagPlusFill } from 'react-icons/bs';
import { FaFilter } from 'react-icons/fa';
import { BsFillPencilFill } from 'react-icons/bs';
import { GrPowerReset } from 'react-icons/gr';
import { GoSearch } from 'react-icons/go';
import Modal from 'react-modal';
import WriterPage from './WriterPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../models';
import { CSMFilteringAdd, CSMFilteringReset } from '../../models/CSMFilteringRedux/CSMFilteringRedux';
import { DecryptKey } from '../../config';
import BasicDataInsertPage from './CeCalendarModals/DataInsertModal/BasicDataInsertPage';
import InsertModalMainPage from './CeCalendarModals/InsertModalMainPage';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '70%',
    },
};
Modal.setAppElement('#ModalSet');

const PcAssetMenuIconsMainPageDivBox = styled.div`
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
    .IconsClickMenu {
        display: flex;
        flex-wrap: wrap;
        justify-content: end;
    }
    .DownLoadIcons {
        width: 100px;
        font-size: 2em;
        color: green;
        text-align: center;
        :hover {
            cursor: pointer;
            opacity: 0.5;
        }
    }
    .FiterIcons {
        width: 100px;
        font-size: 2em;
        color: #b23c46;
        text-align: center;
        :hover {
            cursor: pointer;
            opacity: 0.5;
        }
    }
    .NewDataIcons {
        width: 100px;
        font-size: 2em;
        color: #368;
        text-align: center;
        :hover {
            cursor: pointer;
            opacity: 0.5;
        }
    }
    .IconText {
        text-align: center;
        font-weight: bold;
    }
`;

export const FilterSearchMainPageDivBox = styled.div`
    height: 400px;
    padding: 10px;
    margin-right: 30px;
    padding-right: 40px;
    margin-top: 20px;
    background-color: #fff;
    border-radius: 10px;
    animation-name: SlideUpDown;
    animation-duration: 0.5s;
    @keyframes SlideUpDown {
        from {
            height: 0vh;
            opacity: 0;
        }

        to {
            height: 400px;
            opacity: 1;
        }
    }
    .FilteringContainer {
        margin-top: 10px;
        max-height: 30vh;
        display: flex;
        flex-flow: wrap;
        justify-content: space-between;
        .SearchInputContainer {
            display: flex;
            width: 45%;
            height: 40px;
            margin-left: 20px;
            margin-bottom: 10px;
            .SearchInputContainerTitle {
                margin-right: 10px;
                line-height: 40px;
                width: 100px;
            }
            .SearchInputContainerSubTitle {
                width: 100%;
                height: 100%;
                .SearchInputContainerSubTitleFlexDivBox {
                    display: flex;
                    height: 100%;
                    .IconsDivBox {
                        width: 50px;
                        height: 100%;
                        text-align: center;
                        line-height: 30px;
                        border: 1px solid lightgray;
                        line-height: 40px;
                    }
                    .InputDivBox {
                        width: 100%;
                        height: 100%;
                        form {
                            height: 100%;
                        }
                        input,
                        select {
                            width: 100%;
                            height: 100%;
                            border: 1px solid lightgray;
                            padding-left: 10px;
                            :focus {
                                outline: none;
                                border: none;
                                border: 0.5px solid #368;
                            }
                        }
                    }
                }
            }
        }
    }
    .btns {
        text-align: end;
        margin-top: 25px;
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

export const FilterSearchMainPageDivBoxDownSlide = styled.div`
    animation-name: SlideUp;
    animation-duration: 0.5s;
    @keyframes SlideUp {
        from {
            height: 400px;
        }

        to {
            height: 0vh;
        }
    }
`;
type FilteringDataTypes = {
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
    finish_csm_basic_data_issue_date: string;
    start_csm_basic_data_issue_date: string;
};

const CeCalendarSearchIcons = () => {
    const dispatch = useDispatch();
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const GetCSMFilteringData = useSelector((state: RootState) => state.CSMFiltering.CSMFilteringData);
    const [SelectClicksModals, setSelectClicksModals] = useState({
        FilterSearch: false,
        NewDataModal: false,
    });
    const [FilteringData, setFilteringData] = useState<FilteringDataTypes>(GetCSMFilteringData);

    function closeModal() {
        setSelectClicksModals({
            ...SelectClicksModals,
            NewDataModal: !SelectClicksModals.NewDataModal,
        });
    }

    const dataGetSome = () => {
        try {
        } catch (error) {
            console.log(error);
        }
    };

    const ResetHandleClicks = async () => {
        try {
            await dispatch(CSMFilteringReset());
            setFilteringData({
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
                finish_csm_basic_data_issue_date: '',
                start_csm_basic_data_issue_date: '',
            });
            await window.location.replace(`/CECalendar/${1}`);
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickFilterData = async () => {
        try {
            await dispatch(CSMFilteringAdd({ CSMFilteringData: FilteringData }));
            await window.location.replace(`/CECalendar/${1}`);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEnterClicks = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            await dispatch(CSMFilteringAdd({ CSMFilteringData: FilteringData }));
            await window.location.replace(`/CECalendar/${1}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <PcAssetMenuIconsMainPageDivBox>
            <div></div>
            <div className="IconsClickMenu">
                <div>
                    <div
                        className="FiterIcons"
                        onClick={() =>
                            setSelectClicksModals({
                                ...SelectClicksModals,
                                FilterSearch: !SelectClicksModals.FilterSearch,
                            })
                        }
                    >
                        <FaFilter></FaFilter>
                    </div>
                    <div className="IconText">필터 검색</div>
                </div>
                {DecryptKey(InfomationState.name) === '이광민' || DecryptKey(InfomationState.name) === '유성재' ? (
                    <div>
                        <div
                            className="NewDataIcons"
                            onClick={() =>
                                setSelectClicksModals({
                                    ...SelectClicksModals,
                                    NewDataModal: !SelectClicksModals.NewDataModal,
                                })
                            }
                        >
                            <BsFillBagPlusFill></BsFillBagPlusFill>
                        </div>
                        <div className="IconText">데이터 추가</div>
                    </div>
                ) : (
                    <></>
                )}
            </div>

            {SelectClicksModals.FilterSearch ? (
                <FilterSearchMainPageDivBox>
                    <div>
                        <div>
                            <div>
                                <h3>필터링 검색</h3>
                            </div>
                            <div className="FilteringContainer">
                                <div className="SearchInputContainer">
                                    <div className="SearchInputContainerTitle">
                                        <h4>상태.</h4>
                                    </div>
                                    <div className="SearchInputContainerSubTitle">
                                        <div className="SearchInputContainerSubTitleFlexDivBox">
                                            <div className="IconsDivBox">
                                                <label>
                                                    <BsFillPencilFill></BsFillPencilFill>
                                                </label>
                                            </div>
                                            <div className="InputDivBox">
                                                <select
                                                    value={FilteringData.csm_basic_data_state}
                                                    onChange={e =>
                                                        setFilteringData({ ...FilteringData, csm_basic_data_state: e.target.value })
                                                    }
                                                >
                                                    <option value="">All</option>
                                                    <option value="Open">Open</option>
                                                    <option value="Close">Close</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="SearchInputContainer">
                                    <div className="SearchInputContainerTitle">
                                        <h4>등급.</h4>
                                    </div>
                                    <div className="SearchInputContainerSubTitle">
                                        <div className="SearchInputContainerSubTitleFlexDivBox">
                                            <div className="IconsDivBox">
                                                <label>
                                                    <BsFillPencilFill></BsFillPencilFill>
                                                </label>
                                            </div>
                                            <div className="InputDivBox">
                                                <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleEnterClicks(e)}>
                                                    <input
                                                        value={FilteringData.csm_basic_data_grade}
                                                        type="text"
                                                        placeholder="Ex) CDC.."
                                                        onChange={e =>
                                                            setFilteringData({ ...FilteringData, csm_basic_data_grade: e.target.value })
                                                        }
                                                    ></input>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="SearchInputContainer">
                                    <div className="SearchInputContainerTitle">
                                        <h4>발행일.</h4>
                                    </div>
                                    <div className="SearchInputContainerSubTitle">
                                        <div className="SearchInputContainerSubTitleFlexDivBox">
                                            <div className="InputDivBox">
                                                <input
                                                    type="date"
                                                    value={FilteringData.start_csm_basic_data_issue_date}
                                                    onChange={e =>
                                                        setFilteringData({
                                                            ...FilteringData,
                                                            start_csm_basic_data_issue_date: e.target.value,
                                                        })
                                                    }
                                                ></input>
                                            </div>
                                            <div
                                                style={{
                                                    lineHeight: '40px',
                                                    marginRight: '10px',
                                                    marginLeft: '10px',
                                                    fontSize: '1.5em',
                                                }}
                                            >
                                                ~
                                            </div>
                                            <div className="InputDivBox">
                                                <input
                                                    type="date"
                                                    value={FilteringData.finish_csm_basic_data_issue_date}
                                                    onChange={e =>
                                                        setFilteringData({
                                                            ...FilteringData,
                                                            finish_csm_basic_data_issue_date: e.target.value,
                                                        })
                                                    }
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="SearchInputContainer">
                                    <div className="SearchInputContainerTitle">
                                        <h4>CSM번호.</h4>
                                    </div>
                                    <div className="SearchInputContainerSubTitle">
                                        <div className="SearchInputContainerSubTitleFlexDivBox">
                                            <div className="IconsDivBox">
                                                <label>
                                                    <BsFillPencilFill></BsFillPencilFill>
                                                </label>
                                            </div>
                                            <div className="InputDivBox">
                                                <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleEnterClicks(e)}>
                                                    <input
                                                        type="text"
                                                        value={FilteringData.csm_basic_data_csm_number}
                                                        placeholder="Ex) CDC20001"
                                                        onChange={e =>
                                                            setFilteringData({
                                                                ...FilteringData,
                                                                csm_basic_data_csm_number: e.target.value,
                                                            })
                                                        }
                                                    ></input>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="SearchInputContainer">
                                    <div className="SearchInputContainerTitle">
                                        <h4>장비Model.</h4>
                                    </div>
                                    <div className="SearchInputContainerSubTitle">
                                        <div className="SearchInputContainerSubTitleFlexDivBox">
                                            <div className="IconsDivBox">
                                                <label>
                                                    <BsFillPencilFill></BsFillPencilFill>
                                                </label>
                                            </div>
                                            <div className="InputDivBox">
                                                <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleEnterClicks(e)}>
                                                    <input
                                                        value={FilteringData.csm_basic_data_model_number}
                                                        type="text"
                                                        placeholder="Ex) DFD**..."
                                                        onChange={e =>
                                                            setFilteringData({
                                                                ...FilteringData,
                                                                csm_basic_data_model_number: e.target.value,
                                                            })
                                                        }
                                                    ></input>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="SearchInputContainer">
                                    <div className="SearchInputContainerTitle">
                                        <h4>제번.</h4>
                                    </div>
                                    <div className="SearchInputContainerSubTitle">
                                        <div className="SearchInputContainerSubTitleFlexDivBox">
                                            <div className="IconsDivBox">
                                                <label>
                                                    <BsFillPencilFill></BsFillPencilFill>
                                                </label>
                                            </div>
                                            <div className="InputDivBox">
                                                <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleEnterClicks(e)}>
                                                    <input
                                                        value={FilteringData.csm_basic_data_binds}
                                                        type="text"
                                                        placeholder="Ex) NLA**.."
                                                        onChange={e =>
                                                            setFilteringData({ ...FilteringData, csm_basic_data_binds: e.target.value })
                                                        }
                                                    ></input>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="SearchInputContainer">
                                    <div className="SearchInputContainerTitle">
                                        <h4>고객사.</h4>
                                    </div>
                                    <div className="SearchInputContainerSubTitle">
                                        <div className="SearchInputContainerSubTitleFlexDivBox">
                                            <div className="IconsDivBox">
                                                <label>
                                                    <BsFillPencilFill></BsFillPencilFill>
                                                </label>
                                            </div>
                                            <div className="InputDivBox">
                                                <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleEnterClicks(e)}>
                                                    <input
                                                        value={FilteringData.csm_basic_data_custom}
                                                        type="text"
                                                        placeholder="Ex) AMKOR.."
                                                        onChange={e =>
                                                            setFilteringData({ ...FilteringData, csm_basic_data_custom: e.target.value })
                                                        }
                                                    ></input>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="SearchInputContainer">
                                    <div className="SearchInputContainerTitle">
                                        <h4>Part NO.</h4>
                                    </div>
                                    <div className="SearchInputContainerSubTitle">
                                        <div className="SearchInputContainerSubTitleFlexDivBox">
                                            <div className="IconsDivBox">
                                                <label>
                                                    <BsFillPencilFill></BsFillPencilFill>
                                                </label>
                                            </div>
                                            <div className="InputDivBox">
                                                <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleEnterClicks(e)}>
                                                    <input
                                                        value={FilteringData.csm_basic_data_part_number}
                                                        type="text"
                                                        placeholder="Ex) CSM18-00102-**.."
                                                        onChange={e =>
                                                            setFilteringData({
                                                                ...FilteringData,
                                                                csm_basic_data_part_number: e.target.value,
                                                            })
                                                        }
                                                    ></input>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="btns">
                        <button className="btn btn-cancel" onClick={ResetHandleClicks}>
                            <span style={{ marginRight: '10px' }}>
                                <GrPowerReset></GrPowerReset>
                            </span>

                            <span>리셋</span>
                        </button>
                        <button className="btn btn-confirm" onClick={handleClickFilterData}>
                            <span style={{ marginRight: '10px' }}>
                                <GoSearch></GoSearch>
                            </span>

                            <span>검색</span>
                        </button>
                    </div>
                </FilterSearchMainPageDivBox>
            ) : (
                <FilterSearchMainPageDivBoxDownSlide></FilterSearchMainPageDivBoxDownSlide>
            )}

            <Modal isOpen={SelectClicksModals.NewDataModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                {/* <WriterPage dataInsertOn={() => dataGetSome()} closeModal={() => closeModal()}></WriterPage> */}
                <InsertModalMainPage dataGetSome={() => dataGetSome()} closeModal={() => closeModal()}></InsertModalMainPage>
            </Modal>
        </PcAssetMenuIconsMainPageDivBox>
    );
};

export default CeCalendarSearchIcons;

import React, { useState, forwardRef } from 'react';
import styled from 'styled-components';
import { BsFillPencilFill } from 'react-icons/bs';
import { GrPowerReset } from 'react-icons/gr';
import { GoSearch } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../models';
import { CSMFilteringAdd, CSMFilteringData, CSMFilteringReset } from '../../../../models/CSMFilteringRedux/CSMFilteringRedux';
import { paramasTypes } from '../AdminContent/CeCalendarMasterPage';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';

const PcAssetMenuIconsMainPageDivBox = styled.div`
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
    .IconsClickMenu {
        display: flex;
        flex-wrap: wrap;
        justify-content: end;
        width: 95%;
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
    .BindesIcons {
        width: 100px;
        font-size: 2em;
        color: #375b31;
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
    .HiddenIcons {
        width: 100px;
        font-size: 2em;
        color: gray;
        text-align: center;
        :hover {
            cursor: pointer;
            opacity: 0.5;
        }
    }

    .example-custom-input {
        width: 100%;
        height: 40px;
        border: 1px solid lightgray;
        padding-left: 10px;
        font-size: 0.5em;
        background: #fff;
        color: black;
        border-radius: 0px;
        margin-top: 0px;
    }
`;

export const FilterSearchMainPageDivBox = styled.div`
    padding: 10px;
    margin-right: 30px;
    padding-right: 40px;
    margin-top: 20px;
    background-color: #fff;
    border-radius: 10px;

    .FilteringContainer {
        margin-top: 10px;
        max-height: 30vh;
        display: flex;
        flex-flow: wrap;
        justify-content: space-between;
        font-size: 0.5em;
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
                            font-size: 0.5em;
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

        font-size: 0.5em;
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

export const FilterSearchMainPageDivBoxDownSlide = styled.div``;

type CeCalendarSearchIconsPropsType = {
    SubMenuClicks: string;
};

export type NowTimesTypes = {
    startTime: Date;
    endTime: Date;
};

const CeCalendarSearchIcons = ({ SubMenuClicks }: CeCalendarSearchIconsPropsType) => {
    const dispatch = useDispatch();
    const GetCSMFilteringData = useSelector((state: RootState) => state.CSMFiltering.CSMFilteringData);
    const [FilteringData, setFilteringData] = useState<CSMFilteringData>(GetCSMFilteringData);
    const Nav_AccessTokens = useSelector((state: RootState) => state.Nav_AccessTokens);

    ///date-picker 버튼 컴포넌트
    const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
        <button className="example-custom-input" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));

    ///date-picker 토요일 일요일 색깔 표시
    const getDayName = (date: Date) => {
        return date
            .toLocaleDateString('ko-KR', {
                weekday: 'long',
            })
            .substr(0, 1);
    };

    const createDate = (date: Date) => {
        return new Date(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));
    };
    const ResetHandleClicks = async () => {
        //필터링 초기화
        dispatch(CSMFilteringReset());
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
            name: '',
            startTime: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            endTime: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
        });
    };

    const handleClickFilterData = async () => {
        try {
            dispatch(CSMFilteringAdd(FilteringData));
        } catch (error) {
            console.log(error);
        }
    };

    const handleEnterClicks = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            dispatch(CSMFilteringAdd(FilteringData));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <PcAssetMenuIconsMainPageDivBox>
            <div></div>

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
                                                onChange={e => setFilteringData({ ...FilteringData, csm_basic_data_state: e.target.value })}
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
                            {SubMenuClicks === 'Table_User_Used' ? (
                                <div className="SearchInputContainer">
                                    <div className="SearchInputContainerTitle">
                                        <h4>사용자.</h4>
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
                                                    {Nav_AccessTokens.CSM_Master_Access === 1 ? (
                                                        <input
                                                            value={FilteringData.name}
                                                            type="text"
                                                            placeholder="EX) 유성재..."
                                                            onChange={e =>
                                                                setFilteringData({
                                                                    ...FilteringData,
                                                                    name: e.target.value,
                                                                })
                                                            }
                                                        ></input>
                                                    ) : (
                                                        <input value="" placeholder="권한이 없습니다." readOnly></input>
                                                    )}
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    {SubMenuClicks === 'Table_User_Used' ? (
                        <div className="FilteringContainer">
                            <div className="SearchInputContainer">
                                <div className="SearchInputContainerTitle">
                                    <h4>시작일.</h4>
                                </div>
                                <div className="SearchInputContainerSubTitle">
                                    <div className="SearchInputContainerSubTitleFlexDivBox">
                                        <div className="IconsDivBox">
                                            <label>
                                                <BsFillPencilFill></BsFillPencilFill>
                                            </label>
                                        </div>
                                        <div className="InputDivBox">
                                            <DatePicker
                                                locale={ko}
                                                selected={FilteringData.startTime ? new Date(FilteringData.startTime) : new Date()}
                                                onChange={(date: Date) =>
                                                    setFilteringData({
                                                        ...FilteringData,
                                                        startTime: date,
                                                    })
                                                }
                                                dateFormat="yyyy-MM-dd"
                                                highlightDates={[new Date()]}
                                                popperModifiers={[
                                                    {
                                                        name: 'preventOverflow',
                                                        options: {
                                                            rootBoundary: 'viewport',
                                                            tether: false,
                                                            altAxis: true,
                                                        },
                                                    },
                                                ]}
                                                dayClassName={date =>
                                                    getDayName(createDate(date)) === '토'
                                                        ? 'saturday'
                                                        : getDayName(createDate(date)) === '일'
                                                        ? 'sunday'
                                                        : ''
                                                }
                                                customInput={<ExampleCustomInput />}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="SearchInputContainer">
                                <div className="SearchInputContainerTitle">
                                    <h4>종료일.</h4>
                                </div>
                                <div className="SearchInputContainerSubTitle">
                                    <div className="SearchInputContainerSubTitleFlexDivBox">
                                        <div className="IconsDivBox">
                                            <label>
                                                <BsFillPencilFill></BsFillPencilFill>
                                            </label>
                                        </div>
                                        <div className="InputDivBox">
                                            <DatePicker
                                                locale={ko}
                                                selected={FilteringData.endTime ? new Date(FilteringData.endTime) : new Date()}
                                                onChange={(date: Date) =>
                                                    setFilteringData({
                                                        ...FilteringData,
                                                        endTime: date,
                                                    })
                                                }
                                                dateFormat="yyyy-MM-dd"
                                                highlightDates={[new Date()]}
                                                popperModifiers={[
                                                    {
                                                        name: 'preventOverflow',
                                                        options: {
                                                            rootBoundary: 'viewport',
                                                            tether: false,
                                                            altAxis: true,
                                                        },
                                                    },
                                                ]}
                                                dayClassName={date =>
                                                    getDayName(createDate(date)) === '토'
                                                        ? 'saturday'
                                                        : getDayName(createDate(date)) === '일'
                                                        ? 'sunday'
                                                        : ''
                                                }
                                                customInput={<ExampleCustomInput />}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
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
        </PcAssetMenuIconsMainPageDivBox>
    );
};

export default CeCalendarSearchIcons;

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
    state: string;
    grade: string;
    start_issue_date: string;
    finish_issue_date: string;
    CSMNumber: string;
    ModelNumber: string;
    Binds: string;
    custom: string;
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
                state: '',
                grade: '',
                start_issue_date: '',
                finish_issue_date: '',
                CSMNumber: '',
                ModelNumber: '',
                Binds: '',
                custom: '',
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
                {DecryptKey(InfomationState.name) === '이광민' ? (
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
                                                    value={FilteringData.state}
                                                    onChange={e => setFilteringData({ ...FilteringData, state: e.target.value })}
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
                                                        value={FilteringData.grade}
                                                        type="text"
                                                        placeholder="Ex) CDC.."
                                                        onChange={e => setFilteringData({ ...FilteringData, grade: e.target.value })}
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
                                                    value={FilteringData.start_issue_date}
                                                    onChange={e => setFilteringData({ ...FilteringData, start_issue_date: e.target.value })}
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
                                                    value={FilteringData.finish_issue_date}
                                                    onChange={e =>
                                                        setFilteringData({ ...FilteringData, finish_issue_date: e.target.value })
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
                                                        value={FilteringData.CSMNumber}
                                                        placeholder="Ex) CDC20001"
                                                        onChange={e => setFilteringData({ ...FilteringData, CSMNumber: e.target.value })}
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
                                                        value={FilteringData.ModelNumber}
                                                        type="text"
                                                        placeholder="Ex) DFD**..."
                                                        onChange={e => setFilteringData({ ...FilteringData, ModelNumber: e.target.value })}
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
                                                        value={FilteringData.Binds}
                                                        type="text"
                                                        placeholder="Ex) NLA**.."
                                                        onChange={e => setFilteringData({ ...FilteringData, Binds: e.target.value })}
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
                                                        value={FilteringData.custom}
                                                        type="text"
                                                        placeholder="Ex) AMKOR.."
                                                        onChange={e => setFilteringData({ ...FilteringData, custom: e.target.value })}
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
                <WriterPage dataInsertOn={() => dataGetSome()} closeModal={() => closeModal()}></WriterPage>
            </Modal>
        </PcAssetMenuIconsMainPageDivBox>
    );
};

export default CeCalendarSearchIcons;

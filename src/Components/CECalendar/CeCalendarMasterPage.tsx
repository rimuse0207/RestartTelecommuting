import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import { RootState } from '../../models';
import { useSelector } from 'react-redux';
import { DecryptKey } from '../../config';
import { toast } from '../ToastMessage/ToastManager';
import styled from 'styled-components';
export const AssetTableMainDivBox = styled.div`
    max-height: 120vh;
    overflow: auto;
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
        font-size: 0.8em;
        position: relative;
        width: 100%;
    }

    table.type09 {
        border-collapse: collapse;
        text-align: left;
        line-height: 1.5;
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
    }
    table.type09 tbody th {
        width: 150px;
        padding: 10px;
        font-weight: bold;
        vertical-align: top;
        border-bottom: 1px solid #ccc;
        background: #f3f6f7;
    }
    table.type09 td {
        /* width: 300px; */
        padding: 5px;
        vertical-align: center;
        border-bottom: 1px solid #ccc;
        font-size: 1em;
        text-align: center;
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
`;
const CeCalendarMasterPage = () => {
    const [hiddenChecked, setHiddenChecked] = useState(false);
    const GetCSMFilteringData = useSelector((state: RootState) => state.CSMFiltering.CSMFilteringData);
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);

    const [data, setData] = useState([
        {
            indexs: 1,
            state: 'Close',
            grade: 'SDC',
            CSMNumber: 'SDC19003',
            ModelNumber: 'DFL7161C',
            Binds: 'PA1749',
            custom: '스테코',
            publish: '2021-06-05',
            apply: '2021-06-06',
            entering: '2021-06-07',
            CE: '2021-06-08',
            customDate: '2021-06-08',
            PAY: '2021-06-08',
            finall: '2021-06-08',
            hiddenOn: 0,
        },
    ]);

    useEffect(() => {
        dataGetSome();
    }, [GetCSMFilteringData]);

    const dataGetSome = async () => {
        try {
            const DataGetSomeCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DataGetSome`, {
                GetCSMFilteringData,
            });
            console.log(DataGetSomeCECalendar);
            if (DataGetSomeCECalendar.data.dataSuccess) {
                setData(DataGetSomeCECalendar.data.datas);
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
                    setData(data.map(item => (item.indexs === datas.indexs ? { ...item, hiddenOn: 1 } : item)));
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
                    setData(data.map(item => (item.indexs === datas.indexs ? { ...item, hiddenOn: 0 } : item)));
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
                    setData(data.map(item => (item.indexs === datas.indexs ? { ...item, publish: '', publish_name: '' } : item)));
                }
            } else if (text === '신청') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: '신청',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    setData(data.map(item => (item.indexs === datas.indexs ? { ...item, apply: '', apply_name: '' } : item)));
                }
            } else if (text === '입고') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: '입고',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    setData(data.map(item => (item.indexs === datas.indexs ? { ...item, entering: '', entering_name: '' } : item)));
                }
            } else if (text === 'CE') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: 'CE',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    setData(data.map(item => (item.indexs === datas.indexs ? { ...item, CE: '', CE_name: '' } : item)));
                }
            } else if (text === '고객') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: '고객',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    setData(data.map(item => (item.indexs === datas.indexs ? { ...item, customDate: '', customDate_name: '' } : item)));
                }
            } else if (text === 'PAY') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: 'PAY',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    setData(data.map(item => (item.indexs === datas.indexs ? { ...item, PAY: '', PAY_name: '' } : item)));
                }
            } else if (text === 'finished') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: '완료',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    setData(data.map(item => (item.indexs === datas.indexs ? { ...item, finall: '', finall_name: '' } : item)));
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
                        item.indexs === datas.indexs
                            ? { ...item, publish: moment().format('YYYY-MM-DD'), publish_name: DecryptKey(InfomationState.name) }
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
                        item.indexs === datas.indexs
                            ? { ...item, apply: moment().format('YYYY-MM-DD'), apply_name: DecryptKey(InfomationState.name) }
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
                        item.indexs === datas.indexs
                            ? { ...item, entering: moment().format('YYYY-MM-DD'), entering_name: DecryptKey(InfomationState.name) }
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
                        item.indexs === datas.indexs
                            ? { ...item, CE: moment().format('YYYY-MM-DD'), CE_name: DecryptKey(InfomationState.name) }
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
                        item.indexs === datas.indexs
                            ? { ...item, customDate: moment().format('YYYY-MM-DD'), customDate_name: DecryptKey(InfomationState.name) }
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
                        item.indexs === datas.indexs
                            ? { ...item, PAY: moment().format('YYYY-MM-DD'), PAY_name: DecryptKey(InfomationState.name) }
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
                        item.indexs === datas.indexs
                            ? { ...item, finall: moment().format('YYYY-MM-DD'), finall_name: DecryptKey(InfomationState.name) }
                            : item
                    )
                );
            }
        }
    };
    return (
        <AssetTableMainDivBox>
            <div>
                <div>
                    <div onClick={() => setHiddenChecked(!hiddenChecked)} className="ThirdTest_list_hidden_box">
                        <input type="checkbox" checked={hiddenChecked}></input>
                        {hiddenChecked ? <span>숨김 목록 보기</span> : <span>숨김 목록 숨기기</span>}
                    </div>
                </div>
            </div>
            <table className="type09" id="CeCalendarTables">
                <thead>
                    <tr>
                        <th>숨김</th>
                        <th>인덱스</th>
                        <th>상태</th>
                        <th>등급</th>
                        <th>발행일</th>
                        <th>CSM</th>
                        <th>MODEL</th>
                        <th>제번</th>
                        <th>고객사</th>
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
                    {data.map((list: any, i) => {
                        var classnamesAUTO = 'basic';
                        if (!list.publish) {
                            classnamesAUTO = 'basic_yellow';
                        } else if (!list.apply) {
                            classnamesAUTO = 'basic_lime';
                        } else if (!list.entering) {
                            classnamesAUTO = 'basic_blue';
                        } else if (!list.CE) {
                            classnamesAUTO = 'basic_purple';
                        } else if (!list.customDate) {
                            classnamesAUTO = 'basic_skyblue';
                        } else if (!list.PAY) {
                            classnamesAUTO = 'basic_orange';
                        } else if (!list.finall) {
                            classnamesAUTO = 'basic_finish';
                        }
                        return (
                            <tr key={list.indexs}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={list.hiddenOn === 0 ? false : true}
                                        onChange={e => handleChangeClickHidden(e, list)}
                                    ></input>
                                </td>
                                <td>{i + 1}</td>
                                <td>{list.state}</td>
                                <td>{list.grade}</td>
                                <td>{list.issue_date}</td>
                                <td>{list.CSMNumber}</td>
                                <td>{list.ModelNumber}</td>
                                <td>{list.Binds}</td>
                                <td>{list.custom}</td>
                                <td className={classnamesAUTO} style={list.publish ? {} : { backgroundColor: 'white' }}>
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
                                                <div>{list.publish}</div>
                                                <div>{list.publish ? list.publish_name : ''}</div>
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className={classnamesAUTO} style={list.apply ? {} : { backgroundColor: 'white' }}>
                                    {classnamesAUTO === 'basic_lime' ? (
                                        <div>
                                            <button onClick={() => handleClicks(list, '신청')}>확인</button>
                                        </div>
                                    ) : (
                                        <div
                                            className="ThirdTest_Delete_for_div_box"
                                            onDoubleClick={() => handleClicksDeleteData(list, '신청')}
                                        >
                                            <div>{list.apply}</div>
                                            <div>{list.apply ? list.apply_name : ''}</div>
                                        </div>
                                    )}
                                    {/* <div className="Insert_dates">{list.apply}</div> */}
                                </td>
                                <td className={classnamesAUTO} style={list.entering ? {} : { backgroundColor: 'white' }}>
                                    {classnamesAUTO === 'basic_blue' ? (
                                        <div>
                                            <button onClick={() => handleClicks(list, '입고')}>확인</button>
                                        </div>
                                    ) : (
                                        <div
                                            className="ThirdTest_Delete_for_div_box"
                                            onDoubleClick={() => handleClicksDeleteData(list, '입고')}
                                        >
                                            <div>{list.entering}</div>
                                            <div>{list.entering ? list.entering_name : ''}</div>
                                        </div>
                                    )}
                                    {/* <div className="Insert_dates">{list.entering}</div> */}
                                </td>
                                <td className={classnamesAUTO} style={list.CE ? {} : { backgroundColor: 'white' }}>
                                    {classnamesAUTO === 'basic_purple' ? (
                                        <div>
                                            <button onClick={() => handleClicks(list, 'CE')}>확인</button>
                                        </div>
                                    ) : (
                                        <div
                                            className="ThirdTest_Delete_for_div_box"
                                            onDoubleClick={() => handleClicksDeleteData(list, 'CE')}
                                        >
                                            <div>{list.CE}</div>
                                            <div>{list.CE ? list.CE_name : ''}</div>
                                        </div>
                                    )}
                                    {/* <div className="Insert_dates">{list.CE}</div> */}
                                </td>
                                <td className={classnamesAUTO} style={list.customDate ? {} : { backgroundColor: 'white' }}>
                                    {classnamesAUTO === 'basic_skyblue' ? (
                                        <div>
                                            <button onClick={() => handleClicks(list, '고객')}>확인</button>
                                        </div>
                                    ) : (
                                        <div
                                            className="ThirdTest_Delete_for_div_box"
                                            onDoubleClick={() => handleClicksDeleteData(list, '고객')}
                                        >
                                            <div>{list.customDate}</div>
                                            <div>{list.customDate ? list.customDate_name : ''}</div>
                                        </div>
                                    )}
                                    {/* <div className="Insert_dates">{list.customDate}</div> */}
                                </td>
                                <td className={classnamesAUTO} style={list.PAY ? {} : { backgroundColor: 'white' }}>
                                    {classnamesAUTO === 'basic_orange' ? (
                                        DecryptKey(InfomationState.name) === '이지원' || DecryptKey(InfomationState.name) === '이광민' ? (
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
                                            <div>{list.PAY}</div>
                                            <div>{list.PAY ? list.PAY_name : ''}</div>
                                        </div>
                                    )}
                                    {/* <div className="Insert_dates">{list.PAY}</div> */}
                                </td>
                                <td className={classnamesAUTO} style={list.finall ? {} : { backgroundColor: 'white' }}>
                                    {classnamesAUTO === 'basic_finish' ? (
                                        DecryptKey(InfomationState.name) === '이지원' || DecryptKey(InfomationState.name) === '이광민' ? (
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
                                            <div>{list.finall}</div>
                                            <div>{list.finall_name}</div>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </AssetTableMainDivBox>
    );
};

export default CeCalendarMasterPage;

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import WriteData from './WriterPage';
import { AiFillPlusCircle } from 'react-icons/ai';
import Modal from 'react-modal';
import { RootState } from '../../models';
import { useSelector } from 'react-redux';
import { DecryptKey } from '../../config';
import { toast } from '../ToastMessage/ToastManager';
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
const CeCalendarMasterPage = () => {
    const [searchState, setSearchState] = useState('');
    const [searchGrade, setSearchGrade] = useState('');
    const [searchCSMNumber, setSearchCSMNumber] = useState('');
    const [searchModelNumber, setSearchModelNumber] = useState('');
    const [searchBinds, setSearchBinds] = useState('');
    const [searchCustom, setSearchCustom] = useState('');
    const [hiddenChecked, setHiddenChecked] = useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);

    function afterOpenModal() {}

    function closeModal() {
        setIsOpen(false);
    }
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
    }, []);

    const dataGetSome = async () => {
        try {
            const DataGetSomeCECalendar = await axios.get(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DataGetSome`);
            if (DataGetSomeCECalendar.data.dataSuccess) {
                setData(DataGetSomeCECalendar.data.datas);
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
                        item.indexs === datas.indexs ? { ...item, publish: moment().format('YYYY-MM-DD'), publish_name: '유성재' } : item
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
                        item.indexs === datas.indexs ? { ...item, apply: moment().format('YYYY-MM-DD'), apply_name: '유성재' } : item
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
                        item.indexs === datas.indexs ? { ...item, entering: moment().format('YYYY-MM-DD'), entering_name: '유성재' } : item
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
                        item.indexs === datas.indexs ? { ...item, CE: moment().format('YYYY-MM-DD'), CE_name: '유성재' } : item
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
                            ? { ...item, customDate: moment().format('YYYY-MM-DD'), customDate_name: '유성재' }
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
                        item.indexs === datas.indexs ? { ...item, PAY: moment().format('YYYY-MM-DD'), PAY_name: '유성재' } : item
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
                        item.indexs === datas.indexs ? { ...item, finall: moment().format('YYYY-MM-DD'), finall_name: '유성재' } : item
                    )
                );
            }
        }
    };
    return (
        <div style={{ margin: '30px auto', width: '95%', textAlign: 'center' }}>
            <div>
                <div style={{ textAlign: 'end' }}>
                    <div onClick={() => setHiddenChecked(!hiddenChecked)} className="ThirdTest_list_hidden_box">
                        <input type="checkbox" checked={hiddenChecked}></input>
                        {hiddenChecked ? <span>숨김 목록 보기</span> : <span>숨김 목록 숨기기</span>}
                    </div>
                </div>
            </div>
            <table style={{ tableLayout: 'fixed', wordBreak: 'break-all', borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th>
                            <button
                                onClick={() => {
                                    setSearchState('');
                                    setSearchGrade('');
                                    setSearchCSMNumber('');
                                    setSearchModelNumber('');
                                    setSearchBinds('');
                                    setSearchCustom('');
                                }}
                            >
                                필터 초기화
                            </button>
                        </th>
                        <th>
                            <input
                                style={{ width: '100%', height: '100%', paddingLeft: '5px', margin: '0px', display: 'block' }}
                                value={searchState}
                                onChange={e => setSearchState(e.target.value)}
                                placeholder="상태 검색"
                            ></input>
                        </th>
                        <th>
                            <input
                                style={{ width: '100%', height: '100%', paddingLeft: '5px', margin: '0px', display: 'block' }}
                                value={searchGrade}
                                onChange={e => setSearchGrade(e.target.value)}
                                placeholder="등급 검색"
                            ></input>
                        </th>
                        <th>
                            <input
                                style={{ width: '100%', height: '100%', paddingLeft: '5px', margin: '0px', display: 'block' }}
                                value={searchCSMNumber}
                                onChange={e => setSearchCSMNumber(e.target.value)}
                                placeholder="CSM 검색"
                            ></input>
                        </th>
                        <th>
                            <input
                                style={{ width: '100%', height: '100%', paddingLeft: '5px', margin: '0px', display: 'block' }}
                                value={searchModelNumber}
                                onChange={e => setSearchModelNumber(e.target.value)}
                                placeholder="MODEL 검색"
                            ></input>
                        </th>
                        <th>
                            <input
                                style={{ width: '100%', height: '100%', paddingLeft: '5px', margin: '0px', display: 'block' }}
                                value={searchBinds}
                                onChange={e => setSearchBinds(e.target.value)}
                                placeholder="제번 검색"
                            ></input>
                        </th>
                        <th>
                            <input
                                style={{ width: '100%', height: '100%', paddingLeft: '5px', margin: '0px', display: 'block' }}
                                value={searchCustom}
                                onChange={e => setSearchCustom(e.target.value)}
                                placeholder="고객사 검색"
                            ></input>
                        </th>
                    </tr>
                    <tr className="Title_table">
                        <th>숨김</th>
                        <th>상태</th>
                        <th>등급</th>
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
                <tbody className="CecalendarPaddingdelete">
                    {data
                        .filter((item, j) => (hiddenChecked ? !item.hiddenOn : data))
                        .filter((item, j) => item.state.toUpperCase().includes(searchState.toUpperCase()))
                        .filter((item, j) => item.grade.toUpperCase().includes(searchGrade.toUpperCase()))
                        .filter((item, j) => item.CSMNumber.toUpperCase().includes(searchCSMNumber.toUpperCase()))
                        .filter((item, j) => item.ModelNumber.toUpperCase().includes(searchModelNumber.toUpperCase()))
                        .filter((item, j) => item.Binds.toUpperCase().includes(searchBinds.toUpperCase()))
                        .filter((item, j) => item.custom.toUpperCase().includes(searchCustom.toUpperCase()))
                        .map((list: any, i) => {
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
                                    <td>{list.state}</td>
                                    <td>{list.grade}</td>
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
                                                <div>{list.PAY}</div>
                                                <div>{list.PAY ? list.PAY_name : ''}</div>
                                            </div>
                                        )}
                                        {/* <div className="Insert_dates">{list.PAY}</div> */}
                                    </td>
                                    <td className={classnamesAUTO} style={list.finall ? {} : { backgroundColor: 'white' }}>
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
            <div className="CElogs_WriteData_Add_data_main_div_box">
                <div
                    className={modalIsOpen ? 'CElogs_WriteData_Add_data_div_box_opens' : 'CElogs_WriteData_Add_data_div_box'}
                    style={{ width: '100px', fontSize: '100px' }}
                    onClick={() => setIsOpen(true)}
                >
                    <AiFillPlusCircle></AiFillPlusCircle>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <WriteData dataInsertOn={() => dataGetSome()}></WriteData>
            </Modal>
        </div>
    );
};

export default CeCalendarMasterPage;

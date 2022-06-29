import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../models';
import moment from 'moment';
import axios from 'axios';
import './CeCalendarPublicPage.css';
import { DecryptKey } from '../../config';
const CeCalendarPublicPage = () => {
    const [searchState, setSearchState] = useState('');
    const [searchGrade, setSearchGrade] = useState('');
    const [searchCSMNumber, setSearchCSMNumber] = useState('');
    const [searchModelNumber, setSearchModelNumber] = useState('');
    const [searchBinds, setSearchBinds] = useState('');
    const [searchCustom, setSearchCustom] = useState('');

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
        },
    ]);

    useEffect(() => {
        dataGetSome();
    }, []);

    const dataGetSome = async () => {
        try {
            const DataGetSomeCECalendar = await axios.get(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DataGetSome`);
            console.log(DataGetSomeCECalendar);
            if (DataGetSomeCECalendar.data.dataSuccess) {
                setData(DataGetSomeCECalendar.data.datas);
            }
        } catch (error) {
            console.log(error);
            alert('ERROR');
        }
    };

    const handleClicks = async (datas: any, text: string) => {
        console.log(text);
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
        <div style={{ margin: '30px auto', width: '95%', textAlign: 'center' }}>
            <table style={{ tableLayout: 'fixed', wordBreak: 'break-all', borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
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
                        <th style={{ width: '100px' }}>상태</th>
                        <th style={{ width: '100px' }}>등급</th>
                        <th style={{ width: '100px' }}>CSM</th>
                        <th style={{ width: '100px' }}>MODEL</th>
                        <th style={{ width: '100px' }}>제번</th>
                        <th style={{ width: '100px' }}>고객사</th>
                        <th style={{ width: '150px' }}>발행</th>
                        <th style={{ width: '150px' }}>신청</th>
                        <th style={{ width: '150px' }}>입고</th>
                        <th style={{ width: '150px' }}>CE</th>
                        <th style={{ width: '150px' }}>고객</th>
                        <th style={{ width: '150px' }}>PAY</th>
                        <th style={{ width: '150px' }}>완료</th>
                    </tr>
                </thead>
                <tbody className="CecalendarPaddingdelete" style={{ fontSize: '1em', padding: '0px' }}>
                    {data
                        .filter((item: any, j) => (item.hiddenOn ? '' : data))
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
                                <tr>
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
                                                <div>
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
                                            <div>
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
                                            <div>
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
                                            <div>
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
                                            <div>
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
                                            <div>
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
                                            <div>
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
        </div>
    );
};

export default CeCalendarPublicPage;

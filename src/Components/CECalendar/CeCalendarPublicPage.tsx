import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../models';
import moment from 'moment';
import axios from 'axios';
import './CeCalendarPublicPage.css';
import { DecryptKey } from '../../config';
import styled from 'styled-components';
import { AssetTableMainDivBox, paramasTypes } from '../CSM/CSMMainContent/AdminContent/CeCalendarMasterPage';
import { useParams } from 'react-router-dom';

const CeCalendarPublicPage = () => {
    const GetCSMFilteringData = useSelector((state: RootState) => state.CSMFiltering.CSMFilteringData);
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const { pagenumber } = useParams<paramasTypes>();
    const [PageNumbers, setPageNumbers] = useState(0);
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
            const DataGetSomeCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/PublicDataGetSome`, {
                GetCSMFilteringData,
                pagenumber,
            });
            console.log(DataGetSomeCECalendar);
            if (DataGetSomeCECalendar.data.dataSuccess) {
                setData(DataGetSomeCECalendar.data.datas);
                setPageNumbers(DataGetSomeCECalendar.data.Count[0] ? DataGetSomeCECalendar.data.Count[0].counts : 0);
            }
        } catch (error) {
            console.log(error);
            alert('ERROR');
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
            <table className="type09" id="CeCalendarTables">
                <thead>
                    <tr className="Title_table">
                        <th style={{ width: '100px' }}>인덱스</th>
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
                            <tr>
                                <td>{i + 1}</td>
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
                                        <div>
                                            <div>{list.PAY}</div>
                                            <div>{list.PAY ? list.PAY_name : ''}</div>
                                        </div>
                                    )}
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
            <div className="CeCalendar_paginations">
                <ul>
                    {Number(pagenumber) > 3 ? (
                        <>
                            <li onClick={() => window.location.replace(`/CECalendar/${1}`)}>1</li>
                            <li>...</li>
                        </>
                    ) : (
                        <></>
                    )}
                    {Number(pagenumber) - 2 > 0 ? (
                        <>
                            <li onClick={() => window.location.replace(`/CECalendar/${Number(pagenumber) - 2}`)}>
                                {Number(pagenumber) - 2}
                            </li>
                        </>
                    ) : (
                        <></>
                    )}
                    {Number(pagenumber) - 1 > 0 ? (
                        <>
                            <li onClick={() => window.location.replace(`/CECalendar/${Number(pagenumber) - 1}`)}>
                                {Number(pagenumber) - 1}
                            </li>
                        </>
                    ) : (
                        <></>
                    )}

                    <li style={{ color: '#0031f7' }}>{pagenumber}</li>

                    {Number(pagenumber) + 1 < Math.ceil(PageNumbers / 20) ? (
                        <>
                            <li onClick={() => window.location.replace(`/CECalendar/${Number(pagenumber) + 1}`)}>
                                {Number(pagenumber) + 1}
                            </li>
                        </>
                    ) : (
                        <></>
                    )}

                    {Number(pagenumber) + 2 < Math.ceil(PageNumbers / 20) ? (
                        <>
                            <li onClick={() => window.location.replace(`/CECalendar/${Number(pagenumber) + 2}`)}>
                                {Number(pagenumber) + 2}
                            </li>
                        </>
                    ) : (
                        <></>
                    )}

                    {Number(pagenumber) < Math.ceil(PageNumbers / 20) - 3 ? (
                        <>
                            {' '}
                            <li>...</li>
                            <li onClick={() => window.location.replace(`/CECalendar/${Math.ceil(PageNumbers / 20) - 1}`)}>
                                {Math.ceil(PageNumbers / 20) - 1}
                            </li>
                        </>
                    ) : (
                        <></>
                    )}
                </ul>
            </div>
        </AssetTableMainDivBox>
    );
};

export default CeCalendarPublicPage;

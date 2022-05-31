import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RiEyeOffFill, RiEyeFill } from 'react-icons/ri';
import moment from 'moment';
import { toast } from '../ToastMessage/ToastManager';

const BusinessPrinterControllMainPageMainDivBox = styled.div`
    width: 70%;
    margin: 0 auto;
    padding-bottom: 30px;
    .MainContentBox {
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;

        .YearSelectButton {
            font-size: 1.5em;
            margin-left: 20px;
            margin-right: 20px;
            font-weight: bolder;
            :hover {
                cursor: pointer;
            }
        }
    }
    .SelectPrinterSwitch {
        ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            li {
                font-size: 1.1em;
                border: 2px solid black;
                margin-top: 20px;
                padding: 10px;
                width: 45%;
                border-radius: 10px;
                h3 {
                    margin-bottom: 10px;
                }
                :hover {
                    cursor: pointer;
                }
            }
        }
        .PrinterOn {
            border-color: green;
        }
        .PrinterOff {
            border-color: red;
        }
    }
`;

const BusinessPrinterControllMainPage = () => {
    const [PrinterOpenData, setPrinterOpenData] = useState({
        january: false,
        february: false,
        march: false,
        april: false,
        may: false,
        june: false,
        july: false,
        august: false,
        september: false,
        october: false,
        november: false,
        december: false,
    });
    const [NowYear, setNowYear] = useState(moment());

    useEffect(() => {
        getPrinterOpenData();
    }, [NowYear]);

    const getPrinterOpenData = async () => {
        try {
            const getPrinterOpenDataFromServer = await axios.get(`${process.env.REACT_APP_DB_HOST}/sales_server/SelectPrinterOpenData`, {
                params: {
                    date: NowYear.format('YYYY'),
                },
            });

            if (getPrinterOpenDataFromServer.data.dataSuccess) {
                setPrinterOpenData(getPrinterOpenDataFromServer.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClicks = async (month: string, data: boolean) => {
        try {
            const postDatasSendServer = await axios.post(`${process.env.REACT_APP_DB_HOST}/sales_server/SelectPrinterChangeData`, {
                month,
                data,
            });
            if (postDatasSendServer.data.dataSuccess) {
                getPrinterOpenData();
                if (data) {
                    toast.show({
                        title: '데이터 변경 성공',
                        content: `${moment(month).format('YYYY년 MM월')}의 현장 수당 정산 출력이 불가하게 변경하였습니다.`,
                        duration: 6000,
                        DataSuccess: false,
                    });
                } else {
                    toast.show({
                        title: '데이터 변경 성공',
                        content: `${moment(month).format('YYYY년 MM월')}의 현장 수당 정산 출력이 가능하게 변경하였습니다.`,
                        duration: 6000,
                        DataSuccess: true,
                    });
                }
            } else {
                alert('에러발생');
            }
        } catch (error) {
            console.log(error);
            alert('에러발생');
        }
    };
    return (
        <BusinessPrinterControllMainPageMainDivBox>
            <div className="MainContentBox">
                <div className="YearSelectButton" onClick={() => setNowYear(moment(NowYear).clone().subtract(1, 'year'))}>
                    {'<<<<<'}
                </div>
                <div>
                    <h2>{NowYear.format('YYYY')}</h2>
                </div>
                <div className="YearSelectButton" onClick={() => setNowYear(moment(NowYear).clone().add(1, 'year'))}>
                    {'>>>>>'}
                </div>
            </div>

            <div className="SelectPrinterSwitch">
                <ul>
                    <li
                        className={PrinterOpenData.january ? 'PrinterOn' : 'PrinterOff'}
                        onClick={() => handleClicks(`${NowYear.format('YYYY')}-01`, PrinterOpenData.january)}
                    >
                        <div>
                            <h3>01월</h3>
                            <div>
                                {PrinterOpenData.january ? (
                                    <div>
                                        <span>프린터 출력이 가능합니다.</span>
                                    </div>
                                ) : (
                                    <div>
                                        <span>출력이 불가합니다.</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </li>
                    <li
                        className={PrinterOpenData.february ? 'PrinterOn' : 'PrinterOff'}
                        onClick={() => handleClicks(`${NowYear.format('YYYY')}-02`, PrinterOpenData.february)}
                    >
                        <div>
                            <h3>02월</h3>
                            <div>
                                {PrinterOpenData.february ? (
                                    <div>
                                        <span>프린터 출력이 가능합니다.</span>
                                    </div>
                                ) : (
                                    <div>
                                        <span>출력이 불가합니다.</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </li>
                    <li
                        className={PrinterOpenData.march ? 'PrinterOn' : 'PrinterOff'}
                        onClick={() => handleClicks(`${NowYear.format('YYYY')}-03`, PrinterOpenData.march)}
                    >
                        <div>
                            <h3>03월</h3>
                            <div>
                                {PrinterOpenData.march ? (
                                    <div>
                                        <span>프린터 출력이 가능합니다.</span>
                                    </div>
                                ) : (
                                    <div>
                                        <span>출력이 불가합니다.</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </li>
                    <li
                        className={PrinterOpenData.april ? 'PrinterOn' : 'PrinterOff'}
                        onClick={() => handleClicks(`${NowYear.format('YYYY')}-04`, PrinterOpenData.april)}
                    >
                        <div>
                            <h3>04월</h3>
                            <div>
                                {PrinterOpenData.april ? (
                                    <div>
                                        <span>프린터 출력이 가능합니다.</span>
                                    </div>
                                ) : (
                                    <div>
                                        <span>출력이 불가합니다.</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </li>
                    <li
                        className={PrinterOpenData.may ? 'PrinterOn' : 'PrinterOff'}
                        onClick={() => handleClicks(`${NowYear.format('YYYY')}-05`, PrinterOpenData.may)}
                    >
                        <div>
                            <h3>05월</h3>
                            <div>
                                {PrinterOpenData.may ? (
                                    <div>
                                        <span>프린터 출력이 가능합니다.</span>
                                    </div>
                                ) : (
                                    <div>
                                        <span>출력이 불가합니다.</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </li>
                    <li
                        className={PrinterOpenData.june ? 'PrinterOn' : 'PrinterOff'}
                        onClick={() => handleClicks(`${NowYear.format('YYYY')}-06`, PrinterOpenData.june)}
                    >
                        <div>
                            <h3>06월</h3>
                            <div>
                                {PrinterOpenData.june ? (
                                    <div>
                                        <span>프린터 출력이 가능합니다.</span>
                                    </div>
                                ) : (
                                    <div>
                                        <span>출력이 불가합니다.</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </li>
                    <li
                        className={PrinterOpenData.july ? 'PrinterOn' : 'PrinterOff'}
                        onClick={() => handleClicks(`${NowYear.format('YYYY')}-07`, PrinterOpenData.july)}
                    >
                        <div>
                            <h3>07월</h3>
                            <div>
                                {PrinterOpenData.july ? (
                                    <div>
                                        <span>프린터 출력이 가능합니다.</span>
                                    </div>
                                ) : (
                                    <div>
                                        <span>출력이 불가합니다.</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </li>
                    <li
                        className={PrinterOpenData.august ? 'PrinterOn' : 'PrinterOff'}
                        onClick={() => handleClicks(`${NowYear.format('YYYY')}-08`, PrinterOpenData.august)}
                    >
                        <div>
                            <h3>08월</h3>
                            <div>
                                {PrinterOpenData.august ? (
                                    <div>
                                        <span>프린터 출력이 가능합니다.</span>
                                    </div>
                                ) : (
                                    <div>
                                        <span>출력이 불가합니다.</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </li>
                    <li
                        className={PrinterOpenData.september ? 'PrinterOn' : 'PrinterOff'}
                        onClick={() => handleClicks(`${NowYear.format('YYYY')}-09`, PrinterOpenData.september)}
                    >
                        <div>
                            <h3>09월</h3>
                            <div>
                                {PrinterOpenData.september ? (
                                    <div>
                                        <span>프린터 출력이 가능합니다.</span>
                                    </div>
                                ) : (
                                    <div>
                                        <span>출력이 불가합니다.</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </li>
                    <li
                        className={PrinterOpenData.october ? 'PrinterOn' : 'PrinterOff'}
                        onClick={() => handleClicks(`${NowYear.format('YYYY')}-10`, PrinterOpenData.october)}
                    >
                        <div>
                            <h3>10월</h3>
                            <div>
                                {PrinterOpenData.october ? (
                                    <div>
                                        <span>프린터 출력이 가능합니다.</span>
                                    </div>
                                ) : (
                                    <div>
                                        <span>출력이 불가합니다.</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </li>
                    <li
                        className={PrinterOpenData.november ? 'PrinterOn' : 'PrinterOff'}
                        onClick={() => handleClicks(`${NowYear.format('YYYY')}-11`, PrinterOpenData.november)}
                    >
                        <div>
                            <h3>11월</h3>
                            <div>
                                {PrinterOpenData.november ? (
                                    <div>
                                        <span>프린터 출력이 가능합니다.</span>
                                    </div>
                                ) : (
                                    <div>
                                        <span>출력이 불가합니다.</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </li>
                    <li
                        className={PrinterOpenData.december ? 'PrinterOn' : 'PrinterOff'}
                        onClick={() => handleClicks(`${NowYear.format('YYYY')}-12`, PrinterOpenData.december)}
                    >
                        <div>
                            <h3>12월</h3>
                            <div>
                                {PrinterOpenData.december ? (
                                    <div>
                                        <span>프린터 출력이 가능합니다.</span>
                                    </div>
                                ) : (
                                    <div>
                                        <span>출력이 불가합니다.</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </BusinessPrinterControllMainPageMainDivBox>
    );
};

export default BusinessPrinterControllMainPage;

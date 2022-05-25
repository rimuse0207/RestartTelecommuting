import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RiEyeOffFill, RiEyeFill } from 'react-icons/ri';
import moment from 'moment';

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
        console.log(month, data);
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
                                    <RiEyeFill></RiEyeFill>
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
                        onClick={() => handleClicks('february', PrinterOpenData.february)}
                    >
                        <div>
                            <h3>02월</h3>
                            <div>
                                {PrinterOpenData.february ? (
                                    <RiEyeFill></RiEyeFill>
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
                        onClick={() => handleClicks('march', PrinterOpenData.march)}
                    >
                        <div>
                            <h3>03월</h3>
                            <div>
                                {PrinterOpenData.march ? (
                                    <RiEyeFill></RiEyeFill>
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
                        onClick={() => handleClicks('april', PrinterOpenData.april)}
                    >
                        <div>
                            <h3>04월</h3>
                            <div>
                                {PrinterOpenData.april ? (
                                    <RiEyeFill></RiEyeFill>
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
                        onClick={() => handleClicks('may', PrinterOpenData.may)}
                    >
                        <div>
                            <h3>05월</h3>
                            <div>
                                {PrinterOpenData.may ? (
                                    <RiEyeFill></RiEyeFill>
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
                        onClick={() => handleClicks('june', PrinterOpenData.june)}
                    >
                        <div>
                            <h3>06월</h3>
                            <div>
                                {PrinterOpenData.june ? (
                                    <RiEyeFill></RiEyeFill>
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
                        onClick={() => handleClicks('july', PrinterOpenData.july)}
                    >
                        <div>
                            <h3>07월</h3>
                            <div>
                                {PrinterOpenData.july ? (
                                    <RiEyeFill></RiEyeFill>
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
                        onClick={() => handleClicks('august', PrinterOpenData.august)}
                    >
                        <div>
                            <h3>08월</h3>
                            <div>
                                {PrinterOpenData.august ? (
                                    <RiEyeFill></RiEyeFill>
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
                        onClick={() => handleClicks('september', PrinterOpenData.september)}
                    >
                        <div>
                            <h3>09월</h3>
                            <div>
                                {PrinterOpenData.september ? (
                                    <RiEyeFill></RiEyeFill>
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
                        onClick={() => handleClicks('october', PrinterOpenData.october)}
                    >
                        <div>
                            <h3>10월</h3>
                            <div>
                                {PrinterOpenData.october ? (
                                    <RiEyeFill></RiEyeFill>
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
                        onClick={() => handleClicks('november', PrinterOpenData.november)}
                    >
                        <div>
                            <h3>11월</h3>
                            <div>
                                {PrinterOpenData.november ? (
                                    <RiEyeFill></RiEyeFill>
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
                        onClick={() => handleClicks('december', PrinterOpenData.december)}
                    >
                        <div>
                            <h3>12월</h3>
                            <div>
                                {PrinterOpenData.december ? (
                                    <RiEyeFill></RiEyeFill>
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

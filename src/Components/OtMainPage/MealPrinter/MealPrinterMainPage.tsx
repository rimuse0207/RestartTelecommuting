import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '../../../models';
import { DecryptKey } from '../../../config';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MealPrinterMainPageDivBox = styled.div`
    padding: 10px;
    @page {
        size: A4;
        background: none;
    }
    @media print {
        body {
            width: 420mm;
            height: 297mm;
            margin: auto; /* margin: auto auto; 로 자동 여백 설정도 가능 */
        }
        table {
            padding: 0px;
            page-break-after: avoid;
            page-break-before: avoid;
            font-size: 10px !important;
        }
        th {
            font-size: 12px !important;
        }
        h1 {
            font-size: 30px;
        }
    }
`;

type ParmasTypes = {
    date: string;
    id: string;
    name: string;
    team: string;
};

const MealPrinterMainPage = () => {
    useEffect(() => {
        data_get();
    }, []);
    const { date, id, name, team } = useParams<ParmasTypes>();
    const [applyedData, setApplyedData] = useState([]);
    const [Loading, setLoading] = useState(false);

    useEffect(() => {
        if (Loading) {
            setTimeout(() => {
                window.print();
            }, 1000);
            window.onafterprint = function () {
                window.close();
            };
        }
    }, [Loading]);

    const data_get = async () => {
        try {
            const dataget = await axios.get(`${process.env.REACT_APP_DB_HOST}/Meal_app_servers/Data_get_applyMeal`, {
                params: {
                    selectDate: date,
                    id,
                },
            });
            if (dataget.data.dataSuccess) {
                let taaa = [];
                for (var i = 0; i < dataget.data.data.length; i++) {
                    if (dataget.data.data[i].division === '석식') {
                        taaa.push(dataget.data.data[i].dates);
                    }
                }

                await setApplyedData(dataget.data.data);
                await setLoading(true);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <MealPrinterMainPageDivBox>
            {Loading ? (
                <div>
                    <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>{moment(date).format('YYYY년 MM월')} 식대 정산</h1>
                    <div>
                        <table style={{ fontSize: 'medium', width: '100%', height: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ fontSize: 'medium' }}>
                                <tr style={{ height: '50px' }}>
                                    <th>부서</th>
                                    <th>{team}</th>
                                    <th colSpan={2}></th>
                                    <th>성명</th>
                                    <th colSpan={3}>{name}</th>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <th>일자</th>
                                    <th>구분</th>
                                    <th>지출 금액</th>
                                    <th>정산 금액</th>
                                    <th>방문처</th>
                                    <th>지역</th>
                                    <th>비고</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applyedData.map(
                                    (
                                        list: {
                                            indexs: string;
                                            dates: string;
                                            division: string;
                                            spending: number;
                                            calculate: number;
                                            place: string;
                                            location: string;
                                        },
                                        i: number
                                    ) => {
                                        return (
                                            <tr key={list.indexs} style={{ border: '0.5px solid black' }}>
                                                <td style={{ border: '0.5px solid black', padding: '10px' }}>{list.dates}</td>
                                                <td style={{ border: '0.5px solid black', padding: '10px' }}>{list.division}</td>
                                                <td style={{ border: '0.5px solid black', padding: '10px' }}>
                                                    {list.spending.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
                                                </td>
                                                <td style={{ border: '0.5px solid black', padding: '10px' }}>
                                                    {list.calculate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
                                                </td>
                                                <td style={{ border: '0.5px solid black', padding: '10px' }}>{list.place}</td>
                                                <td style={{ border: '0.5px solid black', padding: '10px' }}>{list.location}</td>
                                                <td style={{ border: '0.5px solid black', padding: '10px' }}></td>
                                            </tr>
                                        );
                                    }
                                )}

                                <tr
                                    className="tailtr"
                                    style={{ fontSize: 'large', border: '0.5px solid black', padding: '10px', fontWeight: 'bolder' }}
                                >
                                    <td colSpan={3} style={{ border: '0.5px solid black', padding: '10px' }}>
                                        합계
                                    </td>
                                    <td style={{ border: '0.5px solid black', padding: '10px' }}>
                                        {applyedData
                                            .map((list: { calculate: number }) => list.calculate)
                                            .reduce((prev: number, curr: number) => prev + curr, 0)
                                            .toString()
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        원
                                    </td>
                                    <td colSpan={4} style={{ border: '0.5px solid black', padding: '10px' }}></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div>Loading....</div>
            )}

            <div style={{ marginTop: '30px', marginLeft: '30px' }}>* 영수증 첨부 (카드영수증, 현금영수증, PAYCO이용내역)</div>
        </MealPrinterMainPageDivBox>
    );
};
export default MealPrinterMainPage;

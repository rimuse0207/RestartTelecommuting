import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NothingGet } from '../../API/GETApi/GetApi';

const CsmNumberWorkingMainPage = styled.div`
    .Table_Container {
        width: 95%;
        margin: 0 auto;
        min-height: 80vh;
        margin-bottom: 30px;
        padding-left: 10px;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
            rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
        border-radius: 10px;
        background-color: #fff;
        padding: 10px;
        margin-top: 40px;
    }
    table.type09 {
        border-collapse: collapse;
        text-align: left;
        line-height: 1.5;
        width: 100%;
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
        table-layout: fixed;
        width: 100px;
    }
    table.type09 tbody th {
        padding: 5px;
        font-weight: bold;
        vertical-align: top;
        border-bottom: 1px solid #ccc;
        background: #f3f6f7;
        width: 100px;
        table-layout: fixed;
    }
    table.type09 td {
        /* width: 300px; */
        padding: 2px;
        vertical-align: center;
        border-bottom: 1px solid #ccc;
        font-size: 1em;
        text-align: center;
        width: 100px;
        table-layout: fixed;
    }
`;

type CsmNumberWorkingTypes = {
    csm_number_respond_working_indexs: number;
    csm_number_respond_working_csm_number: string;
    csm_number_respond_working_model: string;
    csm_number_respond_working_binds: string;
    csm_number_respond_working_working_hours: number;
    csm_number_respond_working_working_count: number;
    csm_number_respond_working_write_date: string;
};

const CsmNumberWorking = () => {
    const [CsmNumberData, setCsmNumberData] = useState<CsmNumberWorkingTypes[]>([]);

    useEffect(() => {
        getCsmWorkingData();
    }, []);

    const getCsmWorkingData = async () => {
        try {
            const CsmWorking = await NothingGet(`/CE_Calendar_app_server/Csm_Number_Working`);
            if (CsmWorking.data.dataSuccess) {
                setCsmNumberData(CsmWorking.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <CsmNumberWorkingMainPage>
            <div>
                <div className="Table_Container">
                    <table className="type09">
                        <thead>
                            <tr>
                                <th>인덱스</th>
                                <th>CSM번호</th>
                                <th>장비 Model</th>
                                <th>제번</th>
                                <th>작업시간</th>
                                <th>작업인원</th>
                                <th>등록날짜</th>
                                <th>수정하기</th>
                            </tr>
                        </thead>
                        <tbody>
                            {CsmNumberData.map((list, i) => {
                                return (
                                    <tr key={list.csm_number_respond_working_indexs}>
                                        <td>{i + 1}</td>
                                        <td>{list.csm_number_respond_working_csm_number}</td>
                                        <td>{list.csm_number_respond_working_model}</td>
                                        <td>{list.csm_number_respond_working_binds}</td>
                                        <td>{list.csm_number_respond_working_working_hours} 시간</td>
                                        <td>{list.csm_number_respond_working_working_count} 명</td>
                                        <td>{moment(list.csm_number_respond_working_write_date).format('YYYY-MM-DD')}</td>
                                        <td>수정</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </CsmNumberWorkingMainPage>
    );
};

export default CsmNumberWorking;

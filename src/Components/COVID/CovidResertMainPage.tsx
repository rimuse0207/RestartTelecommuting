import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { BsFillPencilFill } from 'react-icons/bs';
import axios from 'axios';
import { DecryptKey } from '../../config';
import { useSelector } from 'react-redux';
import { RootState } from '../../models';
import { AiFillDelete } from 'react-icons/ai';
const CovidInputDataFormMainDivBox = styled.div`
    width: 80%;

    margin: 0 auto;

    .FloatMainDivBox {
        margin-top: 30px;
        ::after {
            clear: both;
            display: block;
            content: '';
        }
    }
    .FloatMainDivBoxLeft {
        float: left;
        width: 60%;

        form {
            .ButtonBoxdiv {
                width: 90%;
                margin: 0 auto;
                text-align: end;
                button {
                    width: 130px;
                    height: 40px;
                    background-color: #efefef;
                    border: none;
                    border-radius: 10px;
                    font-size: 1.2em;
                    font-weight: bolder;
                    :hover {
                        cursor: pointer;
                        background-color: darkgray;
                        color: white;
                    }
                }
            }
            .Inputboxs {
                width: 90%;

                margin: 0 auto;
                display: flex;
                margin-top: 30px;
                margin-bottom: 30px;
                h4 {
                    width: 100px;
                    line-height: 50px;
                }
                span {
                    width: 50px;
                    padding: 10px;
                    font-size: 1.2em;
                    border: 0.5px solid lightgray;
                    text-align: center;
                }
                input {
                    width: 80%;
                    border: 0.5px solid lightgray;
                    padding-left: 10px;
                }
            }
        }
    }
    .FloatMainDivBoxRight {
        float: right;
        width: 40%;
        border: 1px solid black;
    }
`;

const CovidShowTableBox = styled.table`
    width: 100%;
    border: 1px solid #444444;
    border-collapse: collapse;
    th,
    td {
        border: 1px solid #444444;
        padding: 10px;
    }
`;

const CovidResertMainPage = () => {
    const [InputDate, setInputDate] = useState('');
    const [InputName, setInputName] = useState('');
    const [InputList, setInputList] = useState('');
    const [getCovidData, setGetCovidData] = useState([]);
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const focusOn = useRef<any>(null);

    const handleSaveData = async (e: any) => {
        e.preventDefault();

        if (InputDate === '' || InputName === '') {
            alert('공란을 적부 입력하여 주세요.');
        } else {
            try {
                const SendData = await axios.post(`${process.env.REACT_APP_DB_HOST}/Covid_app_server/covid_InsertData`, {
                    InputDate,
                    InputName,
                    InputList,
                });
                if (SendData.data.dataSuccess) {
                    getData();
                    setInputList('');
                } else {
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        // getData();
    }, []);

    const getData = async () => {
        try {
            const getCovidData = await axios.get(`${process.env.REACT_APP_DB_HOST}/Covid_app_server/covid_ShowData`, {
                params: {
                    id: DecryptKey(InfomationState.id),
                },
            });

            if (!getCovidData.data.accesstoken) {
                alert('권한이 없습니다.');
                return;
            } else if (getCovidData.data.dataSuccess) {
                setGetCovidData(getCovidData.data.datas);
            } else {
                alert('에러 발생');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteCovid = async (datas: { name: string; inoculate: string; vaccine_list: string }) => {
        try {
            const DeleteCovidData = await axios.post(`${process.env.REACT_APP_DB_HOST}/Covid_app_server/DeleteCovidData`, {
                datas,
            });
            if (DeleteCovidData.data.dataSuccess) {
                getData();
            } else {
                alert('에러 발생');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <CovidInputDataFormMainDivBox>
            {/* <div className="FloatMainDivBox">
                <div className="FloatMainDivBoxLeft">
                    <form onSubmit={e => handleSaveData(e)}>
                        <div className="Inputboxs">
                            <h4>이름</h4>
                            <span>
                                <BsFillPencilFill></BsFillPencilFill>
                            </span>
                            <input type="text" value={InputName} onChange={e => setInputName(e.target.value)}></input>
                        </div>
                        <div className="Inputboxs">
                            <h4>접종 일자</h4>
                            <span>
                                <BsFillPencilFill></BsFillPencilFill>
                            </span>
                            <input
                                type="text"
                                value={InputDate}
                                onChange={e => setInputDate(e.target.value)}
                                onFocus={() => setInputDate('')}
                                onBlur={() => {
                                    if (InputDate.length > 6) {
                                        setInputDate(moment(InputDate).format('YYYY-MM-DD'));
                                    } else {
                                        setInputDate(moment('20' + InputDate).format('YYYY-MM-DD'));
                                    }
                                }}
                            ></input>
                        </div>
                        <div className="Inputboxs">
                            <h4>접종 상태</h4>
                            <span>
                                <BsFillPencilFill></BsFillPencilFill>
                            </span>
                            <input type="text" value={InputList} onChange={e => setInputList(e.target.value)}></input>
                        </div>

                        <div className="ButtonBoxdiv">
                            <button type="submit">저장</button>
                        </div>
                    </form>
                </div>
                <div className="FloatMainDivBoxRight">
                    <div>
                        <CovidShowTableBox>
                            <thead>
                                <tr>
                                    <th>이름</th>
                                    <th>접종일자</th>
                                    <th>접종 상태</th>
                                    <th>삭제</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getCovidData.map((list: { name: string; inoculate: string; vaccine_list: string }, i) => {
                                    return (
                                        <tr key={list.name}>
                                            <td>{list.name}</td>
                                            <td>{list.inoculate}</td>
                                            <td>{list.vaccine_list}</td>
                                            <td style={{ textAlign: 'center' }} onClick={() => handleDeleteCovid(list)}>
                                                <AiFillDelete></AiFillDelete>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </CovidShowTableBox>
                    </div>
                </div>
            </div> */}
        </CovidInputDataFormMainDivBox>
    );
};

export default CovidResertMainPage;

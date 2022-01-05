import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiFillEye, AiFillSave, AiFillDelete } from 'react-icons/ai';
import { BsFillPencilFill } from 'react-icons/bs';
import axios from 'axios';
import { toast } from '../ToastMessage/ToastManager';
const MainCovidTextShowMainBoxDiv = styled.div`
    width: 90%;
    margin: 0 auto;

    ul {
    }
    li {
        margin-bottom: 30px;
    }
`;

export const CovidShowTextIconsDiv = styled.div`
    width: 100%;

    .ShowBox {
        height: 50px;
        display: flex;
        div {
            border: 0.5px solid lightgray;
            line-height: 50px;
            padding-left: 10px;
            width: 100%;
        }
        input {
            width: 100%;

            padding-left: 20px;
            :focus {
                outline: 1px solid #a2d2ef;
                border: none;
            }
        }
        h4 {
            line-height: 50px;
            margin-right: 10px;
        }
        span {
            width: 50px;
            height: 100%;
            border: 0.5px solid lightgray;
            font-size: 1.2em;
            padding: 14px;
            background-color: lightgray;
        }
        .SaveIcons,
        .UpdateIcons {
            :hover {
                cursor: pointer;
                background-color: #6bb6ef;
            }
        }
        .DeleteIcons {
            background-color: #db8383;
            :hover {
                cursor: pointer;
            }
        }
    }
`;

const CovidShowTextAddMainBoxDiv = styled.div`
    div {
        height: 40px;
        width: 100px;
    }
    button {
        height: 40px;
        border: none;
        outline: none;
        width: 100%;
        height: 100%;
        background-color: #0c3d60;
        color: white;
        font-size: 1.2em;
        border-radius: 10px;
        :hover {
            cursor: pointer;
            background-color: #efefef;
            color: #0c3d60;
        }
    }
`;

const CovidTextShowWrite = () => {
    const [getData, setGetData] = useState([
        {
            indexs: 0,
            notice_text: '',
            UpdateOn: false,
        },
    ]);
    useEffect(() => {
        getCovidData();
    }, []);

    const getCovidData = async () => {
        try {
            const getServerCovidData = await axios.get(`${process.env.REACT_APP_DB_HOST}/Covid_app_server/covid_getData`);

            if (getServerCovidData.data.dataSuccess) {
                setGetData(getServerCovidData.data.datas);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChanges = (e: any, data: { indexs: number; notice_text: string }) => {
        setGetData(getData.map(item => (item.indexs === data.indexs ? { ...item, notice_text: e.target.value } : item)));
    };

    const UpdateOnChange = (data: { indexs: number; notice_text: string }) => {
        setGetData(getData.map(item => (item.indexs === data.indexs ? { ...item, UpdateOn: true } : item)));
    };
    const handleUpdateSaveServer = async (data: { indexs: number; notice_text: string }) => {
        const SaveData = await axios.post(`${process.env.REACT_APP_DB_HOST}/Covid_app_server/covid_text_Update`, {
            data,
        });
        if (SaveData.data.dataSuccess) {
            setGetData(SaveData.data.datas);
            // setGetData(getData.map(item => (item.indexs === data.indexs ? { ...item, UpdateOn: false } : item)));
            toast.show({
                title: '데이터 저장 완료',
                content: `코로나 공지 데이터를 서버에 저장 완료 하였습니다.`,
                duration: 6000,
                DataSuccess: true,
            });
        } else {
            alert('오류 발생');
        }
    };
    const handleDataAdd = () => {
        const max = getData.reduce(function (prev, current) {
            return prev.indexs > current.indexs ? prev : current;
        });

        const InitialData = { indexs: max.indexs + 1, notice_text: '', UpdateOn: true };
        setGetData(getData.concat(InitialData));
    };
    const DeleteOnChange = async (datas: { indexs: number; notice_text: string }) => {
        if (!window.confirm('정말로 삭제 하시겠습니까?')) {
            // 취소(아니오) 버튼 클릭 시 이벤트
            return;
        }
        try {
            const DeleteData = await axios.post(`${process.env.REACT_APP_DB_HOST}/Covid_app_server/covid_text_Delete`, {
                datas,
            });
            if (DeleteData.data.dataSuccess) {
                setGetData(DeleteData.data.datas);
                toast.show({
                    title: '데이터 삭제 완료.',
                    content: `코로나 공지 데이터를 서버에서 삭제 완료 하였습니다.`,
                    duration: 6000,
                    DataSuccess: true,
                });
            } else {
                alert('오류발생');
            }
        } catch (error) {
            console.log(error);
        }

        // setGetData(getData.filter(item => (item.indexs !== data.indexs ? item : '')));
    };
    return (
        <MainCovidTextShowMainBoxDiv>
            <div>
                <ul>
                    {getData.map((list, i) => {
                        return list.UpdateOn ? (
                            <li key={list.indexs}>
                                <CovidShowTextIconsDiv>
                                    <div className="ShowBox">
                                        <h4>{i + 1}. </h4>
                                        <span>
                                            <BsFillPencilFill></BsFillPencilFill>
                                        </span>
                                        <input value={list.notice_text} onChange={e => handleChanges(e, list)}></input>
                                        <span
                                            className="SaveIcons"
                                            style={{ fontSize: '1.2em', padding: '14px' }}
                                            onClick={() => handleUpdateSaveServer(list)}
                                        >
                                            <AiFillSave></AiFillSave>
                                        </span>
                                    </div>
                                </CovidShowTextIconsDiv>
                            </li>
                        ) : (
                            <li>
                                <CovidShowTextIconsDiv>
                                    <div className="ShowBox">
                                        <h4>{i + 1}. </h4>
                                        <span>
                                            <AiFillEye></AiFillEye>
                                        </span>
                                        <div>{list.notice_text}</div>
                                        <span
                                            className="UpdateIcons"
                                            style={{ fontSize: '1.2em', padding: '14px' }}
                                            onClick={() => UpdateOnChange(list)}
                                        >
                                            <BsFillPencilFill></BsFillPencilFill>
                                        </span>
                                        <span
                                            className="DeleteIcons"
                                            style={{ fontSize: '1.2em', padding: '14px' }}
                                            onClick={() => DeleteOnChange(list)}
                                        >
                                            <AiFillDelete></AiFillDelete>
                                        </span>
                                    </div>
                                </CovidShowTextIconsDiv>
                            </li>
                        );
                    })}
                </ul>

                <CovidShowTextAddMainBoxDiv>
                    <div>
                        <button onClick={handleDataAdd}>추가</button>
                    </div>
                </CovidShowTextAddMainBoxDiv>
            </div>
        </MainCovidTextShowMainBoxDiv>
    );
};

export default CovidTextShowWrite;

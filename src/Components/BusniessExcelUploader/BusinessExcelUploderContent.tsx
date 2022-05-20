import React, { useState } from 'react';
import styled from 'styled-components';
import { FileDrop } from 'react-file-drop';
import { TiDelete } from 'react-icons/ti';
import axios from 'axios';
import { toast } from '../ToastMessage/ToastManager';
import moment from 'moment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const BusinessExcelUploaderContentMainDivBox = styled.div`
    width: 80%;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 30px;
    .upload-file-wrapper {
        border: 1px dashed rgba(0, 0, 0, 0.2);
        width: '600px';
        color: 'black';
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .upload-file-wrapper p {
        font-family: Arial, Helvetica, sans-serif;
        margin-bottom: 0;
    }
    .browse-btn {
        width: 150px;
        line-height: 50px;
        text-align: center;
        color: rgb(6, 140, 218);
        background-color: rgb(6, 140, 218, 0.3);
        border: 0;
        border-radius: 10px;
        font-size: 16px;
        font-weight: bold;
        margin-left: auto;
        display: inline-block;
        font-family: Arial, Helvetica, sans-serif;
    }
    .remove-btn {
        border: 0px;
        background: none;
    }
    .browse-btn input[type='file'] {
        display: none;
    }
    .file-drop {
        width: 100%;
    }
    .file-drop-target {
        display: flex;
    }
    .drop-file-detail {
        display: flex;
        justify-content: space-between;
    }
    .drop-file-detail p {
        font-size: 14px;
        color: #cdcdcd;
    }

    .import-file-wrapper {
        border: 1px solid rgba(0, 0, 0, 0.2);
        width: '600px';
        color: 'black';
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba(0, 0, 0, 0.05);
    }
    .import-file-wrapper p {
        font-family: Arial, Helvetica, sans-serif;
        margin-bottom: 0;
    }
    .import-btn {
        font-family: Arial, Helvetica, sans-serif;
        width: 150px;
        line-height: 50px;
        text-align: center;
        background-color: rgb(6, 140, 218);
        color: #fff;
        border: 0;
        border-radius: 10px;
        font-size: 16px;
        font-weight: bold;
        margin-left: auto;
        display: inline-block;
    }
    .import-btn input[type='file'] {
        display: none;
    }
    .import-drop {
        width: 100%;
    }
    .filimporte-drop-target {
        display: flex;
    }
    .import-file-detail {
        display: flex;
        justify-content: space-between;
    }
    .import-file-detail p {
        font-size: 14px;
        color: #cdcdcd;
    }

    .DBDateSelect {
        margin-bottom: 30px;
        select {
            width: 200px;
            height: 50px;
        }
    }
`;

const UploadedFileDataUlBox = styled.ul`
    border: 1px solid black;
    li {
        padding: 10px;
        border: 1px dashed gray;
        display: inline-block;
        .UploadedContainerDiv {
            display: flex;
            justify-content: center;
            div {
                margin-left: 10px;
                margin-right: 10px;
                svg {
                    font-size: 1.2em;
                    :hover {
                        cursor: pointer;
                        color: red;
                    }
                }
            }
        }
    }
`;

const TableContainerDivMainPage = styled.div`
    margin-top: 30px;
    thead {
        font-size: 0.8em;
    }
    .blueone {
        border-collapse: collapse;
    }
    .blueone th {
        padding: 10px;
        color: #168;
        border: none;
        background-color: #fff;
        border-bottom: 3px solid #168;
        text-align: left;
    }
    .blueone td {
        color: #669;
        padding: 10px;
        border-bottom: 1px solid #ddd;
    }
    .blueone tr:hover td {
        color: #004;
    }
`;

type FileuploadDatasType = {
    name: string;
    paper_code: string;
    business_trip_period: string;
    business_tip_length: number;
};

const BusinessExcelUploaderContent = () => {
    const [file, setFile] = useState<any>([]);
    const [UploadedFinish, setUploadedFinish] = useState(false);
    // const [UploadedData, setUploadedData] = useState<FileuploadDatasType[]>([]);
    const [InsertedData, setInsertedData] = useState<FileuploadDatasType[]>([]);
    const [SelectDate, setSelectDate] = useState('없음');
    const handle = (files: any) => {
        let arr = Object.values(files);
        const dd = file.concat(arr);
        setFile(dd);
    };
    const handleDeleteFromFiles = (xData: any) => {
        const deleteFileData = file.filter((item: { name: string }) => {
            return item.name === xData.name ? '' : item;
        });
        setFile(deleteFileData);
    };

    const SaveDataFromFile = async () => {
        try {
            if (SelectDate === '없음') {
                alert('DB 저장 날짜를 선택 해 주세요.');
                return;
            } else if (file.length === 0) {
                alert('등록 된 파일이 없습니다.');
                return;
            }
            const formData = new FormData();

            file.map((list: any, i: number) => {
                formData.append(`file`, list);
                formData.append('SelectDate', SelectDate);
            });

            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            };
            const SendFileDataFromServer = await axios.post(
                `${process.env.REACT_APP_DB_HOST}/sales_server/ERP_Uploader_File`,
                formData,
                config
            );
            if (SendFileDataFromServer.data.dataSuccess) {
                console.log(SendFileDataFromServer);
                setFile([]);
                // setUploadedData(SendFileDataFromServer.data.DB_Upate_logs);
                setInsertedData(SendFileDataFromServer.data.DB_Insert_logs);
                toast.show({
                    title: '업로드 완료.',
                    content: 'ERP 출장 파일 데이터 DB에 저장 완료.',
                    duration: 6000,
                    DataSuccess: true,
                });
                setUploadedFinish(true);
            } else {
                toast.show({
                    title: '업로드 실패.',
                    content: 'IT팀에 문의 바랍니다.',
                    duration: 6000,
                    DataSuccess: false,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <BusinessExcelUploaderContentMainDivBox>
            <div className="DBDateSelect">
                <h3>DB 저장 날짜 선택</h3>
                <div style={{ marginTop: '20px' }}>
                    <FormControl sx={{ m: 1, width: 300 }} size="small">
                        <InputLabel id="demo-select-small">DB 등록 날짜</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            label="DB 등록 날짜"
                            value={SelectDate}
                            onChange={e => setSelectDate(e.target.value)}
                        >
                            <MenuItem value={'없음'}>없음</MenuItem>
                            <MenuItem value={moment().clone().subtract(1, 'month').format('YYYY-MM')}>
                                {moment().clone().subtract(1, 'month').format('YYYY년 MM월')}
                            </MenuItem>
                            <MenuItem value={moment().format('YYYY-MM')}>{moment().format('YYYY년 MM월')}</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <h3>ERP 출장 정보 업로드 파일</h3>

            <div className="upload-file-wrapper">
                <FileDrop onDrop={(files, event) => handle(files)}>
                    <p>업로드 하실 파일을 드래그 또는 클릭 하여 추가 </p>
                    <label htmlFor="same" className="browse-btn">
                        클릭
                        <input id="same" type="file" multiple onChange={e => handle(e.target.files)}></input>
                    </label>
                </FileDrop>
            </div>
            <div style={{ marginTop: '20px' }}>
                <h4>등록된 파일</h4>
                <UploadedFileDataUlBox>
                    {file.map((x: any) => {
                        return (
                            <li key={x.name}>
                                <div className="UploadedContainerDiv">
                                    <div>{x.name}</div>
                                    <div onClick={() => handleDeleteFromFiles(x)}>
                                        <TiDelete></TiDelete>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </UploadedFileDataUlBox>
            </div>
            <div>
                <div>
                    <button onClick={() => SaveDataFromFile()}>저장</button>
                </div>
            </div>

            <TableContainerDivMainPage>
                <h3>추가된 데이터</h3>
                <table className="blueone">
                    <thead>
                        <tr>
                            <th>인덱스</th>
                            <th>전표 번호</th>
                            <th>이름</th>
                            <th>출장 기간</th>
                            <th>출장 일수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {InsertedData.map((list, j) => {
                            return (
                                <tr>
                                    <td>{j + 1}</td>
                                    <td>{list.paper_code}</td>
                                    <td>{list.name}</td>
                                    <td>{list.business_trip_period}</td>
                                    <td>{list.business_tip_length}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </TableContainerDivMainPage>

            {/* <TableContainerDivMainPage>
                <h3>변경된 데이터</h3>
                <table className="blueone">
                    <thead>
                        <tr>
                            <th>인덱스</th>
                            <th>전표 번호</th>
                            <th>이름</th>
                            <th>출장 기간</th>
                            <th>출장 일수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {UploadedData.map((list, j) => {
                            return (
                                <tr>
                                    <td>{j + 1}</td>
                                    <td>{list.paper_code}</td>
                                    <td>{list.name}</td>
                                    <td>{list.business_trip_period}</td>
                                    <td>{list.business_tip_length}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </TableContainerDivMainPage> */}
        </BusinessExcelUploaderContentMainDivBox>
    );
};

export default BusinessExcelUploaderContent;

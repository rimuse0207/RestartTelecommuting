import React, { useState } from 'react';
import styled from 'styled-components';
import { FileDrop } from 'react-file-drop';
import { UploadedFileDataUlBox, TableContainerDivMainPage } from '../BusniessExcelUploader/BusinessExcelUploderContent';
import { TiDelete } from 'react-icons/ti';
import axios from 'axios';
import { toast } from '../ToastMessage/ToastManager';
import LoaderMainPage from '../Loader/LoaderMainPage';
const CeCalendarExcelFileUploadMainDivBox = styled.div`
    width: 90%;
    margin: 0 auto;
    margin-top: 20px;
`;
type FileuploadDatasType = {
    state: string;
    grade: string;
    issue_date: string;
    CSMNumber: string;
    ModelNumber: string;
    Binds: string;
    custom: string;
};

const CeCalendarExcelFileUpload = () => {
    const [InsertedData, setInsertedData] = useState<FileuploadDatasType[]>([]);
    const [file, setFile] = useState<any>([]);
    const handle = (files: any) => {
        let arr = Object.values(files);
        const dd = file.concat(arr);
        setFile(dd);
    };
    const [loading, setLoading] = useState(false);
    const handleDeleteFromFiles = (xData: any) => {
        const deleteFileData = file.filter((item: { name: string }) => {
            return item.name === xData.name ? '' : item;
        });
        setFile(deleteFileData);
    };
    const SaveDataFromFile = async () => {
        try {
            if (file.length === 0) {
                alert('등록 된 파일이 없습니다.');
                return;
            }
            setLoading(true);
            const formData = new FormData();

            file.map((list: any, i: number) => {
                formData.append(`file`, list);
            });

            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            };
            const SendFileDataFromServer = await axios.post(
                `${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/CSM_Uploader_File`,
                formData,
                config
            );

            if (SendFileDataFromServer.data.dataSuccess) {
                setFile([]);
                setInsertedData(SendFileDataFromServer.data.DB_Insert_logs);
                toast.show({
                    title: '업로드 완료.',
                    content: 'CSM 파일 데이터 DB에 저장 완료.',
                    duration: 6000,
                    DataSuccess: true,
                });
                setLoading(false);
            } else {
                toast.show({
                    title: '업로드 실패.',
                    content: 'IT팀에 문의 바랍니다.',
                    duration: 6000,
                    DataSuccess: false,
                });
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: '업로드 실패.',
                content: 'IT팀에 문의 바랍니다.',
                duration: 6000,
                DataSuccess: false,
            });
            setLoading(false);
        }
    };
    return (
        <CeCalendarExcelFileUploadMainDivBox>
            <h3>CSM 정보 업로드</h3>

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
                <div>{file.length > 0 ? <button onClick={() => SaveDataFromFile()}>저장</button> : <></>}</div>
            </div>

            <TableContainerDivMainPage>
                <h3>추가된 데이터</h3>
                <table className="blueone">
                    <thead>
                        <tr>
                            <th>상태</th>
                            <th>등급</th>
                            <th>발행일</th>
                            <th>CSM번호</th>
                            <th>장비Model</th>
                            <th>제번</th>
                            <th>고객사</th>
                        </tr>
                    </thead>
                    <tbody>
                        {InsertedData.map((list, j) => {
                            return (
                                <tr>
                                    <td>{j + 1}</td>
                                    <td>{list.state}</td>
                                    <td>{list.grade}</td>
                                    <td>{list.CSMNumber}</td>
                                    <td>{list.ModelNumber}</td>
                                    <td>{list.Binds}</td>
                                    <td>{list.custom}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </TableContainerDivMainPage>
            <LoaderMainPage loading={loading}></LoaderMainPage>
        </CeCalendarExcelFileUploadMainDivBox>
    );
};

export default CeCalendarExcelFileUpload;

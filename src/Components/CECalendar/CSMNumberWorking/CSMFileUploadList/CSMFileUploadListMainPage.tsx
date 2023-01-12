import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SiMicrosoftexcel } from 'react-icons/si';
import { NothingGet } from '../../../API/GETApi/GetApi';
import moment from 'moment';
import { FaArrowRight } from 'react-icons/fa';
import { BsFileEarmarkCheck } from 'react-icons/bs';

const CSMFileUploadListMainPageMainDivBox = styled.div`
    border: 1px dashed black;
    height: 40vh;
    overflow: auto;
    padding: 30px;
    margin-bottom: 20px;
    width: 80%;
    ul {
        li {
            /* border: 1px solid black; */
            display: flex;
            margin-bottom: 10px;
            justify-content: space-around;

            .FileUploadListsContainer {
                :hover {
                    .FileUploadLists_Title {
                        color: lightgray;
                        cursor: pointer;
                        .FileUploadLists_icons {
                            color: lightgray;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }

    .FileUploadListsContainer {
        display: flex;
        align-items: center;
        border: 1px solid black;
        width: 40%;
        padding-left: 30px;
        .FileUploadLists_icons {
            font-size: 2em;
            color: green;
            width: 100px;
            text-align: center;
        }
        .FileUploadLists_Title {
            font-size: 0.9em;
        }
    }
`;

export type FileListsTypes = {
    csm_excel_file_upload_indexs: number;
    csm_excel_file_upload_id: string;
    csm_excel_file_upload_original_filename: string;
    csm_excel_file_upload_change_filename: string;
    csm_excel_file_upload_path: string;
    csm_excel_file_upload_date: string;
};

type CSMFileUploadListMainPagePropsTypes = {
    FileUploadSuccess: FileListsTypes | null;
    setFileUploadSuccess: (data: null) => void;
};

const CSMFileUploadListMainPage = ({ FileUploadSuccess, setFileUploadSuccess }: CSMFileUploadListMainPagePropsTypes) => {
    const [FileLists, setFileLists] = useState<FileListsTypes[]>([]);

    const CSMFileDataGetting = async () => {
        try {
            const CSMFileData = await NothingGet(`/CE_Calendar_app_server/Csm_FileUpload_lists_Getting`);
            if (CSMFileData.data.dataSuccess) {
                setFileLists(CSMFileData.data.GettingExcelDBLists_Rows);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClicksFile = (data: FileListsTypes) => {
        window.open(`${process.env.REACT_APP_DB_HOST}/CSM/${data.csm_excel_file_upload_change_filename}`);
    };

    const handleResultClicksFile = (data: FileListsTypes) => {
        window.open(`${process.env.REACT_APP_DB_HOST}/CSM/${data.csm_excel_file_upload_path}`);
    };

    useEffect(() => {
        CSMFileDataGetting();
    }, [FileUploadSuccess]);

    return (
        <CSMFileUploadListMainPageMainDivBox>
            <ul>
                <li>
                    <div className="FileUploadListsContainer" style={{ border: 'none' }}>
                        <h3>업로드 파일</h3>
                    </div>
                    <div></div>
                    <div className="FileUploadListsContainer" style={{ border: 'none' }}>
                        <h3>결과 파일</h3>
                    </div>
                </li>
                {FileLists.map((list, i) => {
                    return (
                        <li>
                            <div className="FileUploadListsContainer" onClick={() => handleClicksFile(list)}>
                                <h3>{i + 1}. </h3>
                                <div className="FileUploadLists_icons">
                                    <SiMicrosoftexcel></SiMicrosoftexcel>
                                </div>
                                <div className="FileUploadLists_Title">
                                    <div>{list.csm_excel_file_upload_original_filename}</div>
                                    <div>{moment(list.csm_excel_file_upload_date).format('YYYY-MM-DD HH:mm')}</div>
                                </div>
                            </div>
                            <div style={{ paddingTop: '10px', fontSize: '1em' }}>
                                <FaArrowRight></FaArrowRight>
                            </div>
                            {list.csm_excel_file_upload_path ? (
                                <div className="FileUploadListsContainer" onClick={() => handleResultClicksFile(list)}>
                                    <h3>{i + 1}. </h3>
                                    <div className="FileUploadLists_icons">
                                        <SiMicrosoftexcel></SiMicrosoftexcel>
                                    </div>
                                    <div className="FileUploadLists_Title">
                                        <div>{list.csm_excel_file_upload_path}</div>
                                        <div>{moment(list.csm_excel_file_upload_date).format('YYYY-MM-DD HH:mm')}</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="FileUploadListsContainer">
                                    <h3>{i + 1}. </h3>
                                    <div className="FileUploadLists_icons">
                                        <BsFileEarmarkCheck></BsFileEarmarkCheck>
                                    </div>
                                    <div className="FileUploadLists_Title">결과 파일 없음</div>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </CSMFileUploadListMainPageMainDivBox>
    );
};

export default CSMFileUploadListMainPage;

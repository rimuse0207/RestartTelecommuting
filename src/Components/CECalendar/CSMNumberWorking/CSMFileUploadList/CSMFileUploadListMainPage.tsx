import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SiMicrosoftexcel } from 'react-icons/si';
import { NothingGet } from '../../../API/GETApi/GetApi';
import moment from 'moment';

const CSMFileUploadListMainPageMainDivBox = styled.div`
    border: 1px dashed black;
    height: 40vh;
    overflow: auto;
    padding: 30px;
    margin-bottom: 20px;
    width: 650px;
    ul {
        li {
            border: 1px solid black;
            display: block;
            margin-bottom: 10px;
            :hover {
                color: lightgray;
                cursor: pointer;
                .FileUploadLists_icons {
                    color: lightgray;
                    cursor: pointer;
                }
            }
        }
    }

    .FileUploadListsContainer {
        display: flex;
        align-items: center;

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

type FileListsTypes = {
    csm_excel_file_upload_indexs: number;
    csm_excel_file_upload_id: string;
    csm_excel_file_upload_original_filename: string;
    csm_excel_file_upload_change_filename: string;
    csm_excel_file_upload_path: string;
    csm_excel_file_upload_date: string;
};

const CSMFileUploadListMainPage = () => {
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

    useEffect(() => {
        CSMFileDataGetting();
    }, []);

    return (
        <CSMFileUploadListMainPageMainDivBox>
            <ul>
                {/* <li>
                    <div className="FileUploadListsContainer">
                        <h3>1.</h3>
                        <div className="FileUploadLists_icons">
                            <SiMicrosoftexcel></SiMicrosoftexcel>
                        </div>
                        <div className="FileUploadLists_Title">
                            <div>20221228_Upload구분</div>
                            <div>2022-12-28</div>
                        </div>
                    </div>
                </li> */}

                {FileLists.map((list, i) => {
                    return (
                        <li onClick={() => handleClicksFile(list)}>
                            <div className="FileUploadListsContainer">
                                <h3>{i + 1}. </h3>
                                <div className="FileUploadLists_icons">
                                    <SiMicrosoftexcel></SiMicrosoftexcel>
                                </div>
                                <div className="FileUploadLists_Title">
                                    <div>{list.csm_excel_file_upload_original_filename}</div>
                                    <div>{moment(list.csm_excel_file_upload_date).format('YYYY-MM-DD HH:mm')}</div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </CSMFileUploadListMainPageMainDivBox>
    );
};

export default CSMFileUploadListMainPage;

import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsFillInfoSquareFill } from 'react-icons/bs';
import Modal from 'react-modal';
import { ModalCloseContainer } from '../CeCalendarMasterPage';
import { CgClose } from 'react-icons/cg';
import CSMDistanceUpdateModal from './CSMDistanceModal/CSMDistanceUpdateModal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '95%',
        height: '95%',
        zIndex: 100,
    },
};
Modal.setAppElement('#ModalSet');

const DistanceDataInsertPageMainDivBox = styled.div`
    width: 90%;
    margin: 0 auto;
    margin-top: 30px;
    padding-bottom: 30px;

    table {
        border-collapse: separate;
        border-spacing: 0;
        width: 100%;
    }
    th,
    td {
        padding: 6px 15px;
    }
    th {
        background: #42444e;
        color: #fff;
        text-align: left;
    }
    tr:first-child th:first-child {
        border-top-left-radius: 6px;
    }
    tr:first-child th:last-child {
        border-top-right-radius: 6px;
    }
    td {
        border-right: 1px solid #c6c9cc;
        border-bottom: 1px solid #c6c9cc;
    }
    td:first-child {
        border-left: 1px solid #c6c9cc;
    }
    tr:nth-child(even) td {
        background: #eaeaed;
    }
    tr:last-child td:first-child {
        border-bottom-left-radius: 6px;
    }
    tr:last-child td:last-child {
        border-bottom-right-radius: 6px;
    }
    .Info_Icons {
        text-align: center;
        font-size: 1.3em;
        :hover {
            cursor: pointer;
            color: skyblue;
        }
    }
`;

export type DistanceDataTypes = {
    csm_distance_lists_indexs: number;
    csm_distance_lists_custommer: string;
    csm_distance_lists_area: string;
    csm_distance_lists_location: string;
    csm_distance_lists_distance: number;
    csm_distance_lists_distance_time: number;
    csm_distance_lists_write_date: string;
    Asan_csm_distance_lists_location: string;
    Asan_csm_distance_lists_distance: number;
    Asan_csm_distance_lists_distance_time: number;
};

const DistanceDataInsertPage = () => {
    const [DistanceData, setDistanceData] = useState<DistanceDataTypes[]>([]);
    const [ModalOpen, setModalOpen] = useState(false);
    const [SelectedData, setSelectedData] = useState<DistanceDataTypes | null>(null);

    const GetDistancData = async () => {
        try {
            const Getting_Distance_Datas_Axios = await axios.get(
                `${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/Distance_Data_Getting`
            );

            if (Getting_Distance_Datas_Axios.data.dataSuccess) {
                setDistanceData(Getting_Distance_Datas_Axios.data.Distance_Select_Rows);
            } else {
                alert('ERROR발생');
            }
        } catch (error) {
            console.log(error);
            alert('ERROR발생');
        }
    };

    function closeModal() {
        document.body.style.overflow = 'unset';
        setModalOpen(false);
    }

    const handleModalOpen = (clicks_data: DistanceDataTypes) => {
        document.body.style.overflow = 'hidden';
        setModalOpen(true);
        console.log(clicks_data);
        setSelectedData(clicks_data);
    };

    useEffect(() => {
        GetDistancData();
    }, []);

    return (
        <DistanceDataInsertPageMainDivBox>
            <table>
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Area</th>
                        <th>Custommer</th>
                        <th>Pangyo</th>
                        <th>移動Time</th>
                        <th>Asan</th>
                        <th>移動Time</th>
                        <th>등록 날짜</th>
                        <th>수정</th>
                    </tr>
                </thead>
                <tbody>
                    {DistanceData.map((list, i) => {
                        return (
                            <tr>
                                <td style={{ fontWeight: 'bold' }}>{i + 1}</td>
                                <td>{list.csm_distance_lists_area}</td>
                                <td>{list.csm_distance_lists_custommer}</td>
                                <td>{list.csm_distance_lists_distance}</td>
                                <td>{list.csm_distance_lists_distance_time}</td>
                                <td>{list.Asan_csm_distance_lists_distance}</td>
                                <td>{list.Asan_csm_distance_lists_distance_time}</td>
                                <td>{moment(list.csm_distance_lists_write_date).format('YYYY-MM-DD')}</td>
                                <td className="Info_Icons" onClick={() => handleModalOpen(list)}>
                                    <BsFillInfoSquareFill></BsFillInfoSquareFill>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <Modal isOpen={ModalOpen} style={customStyles} contentLabel="Example Modal">
                <ModalCloseContainer>
                    <div className="Close_button" onClick={() => closeModal()}>
                        <CgClose></CgClose>
                    </div>
                </ModalCloseContainer>
                <CSMDistanceUpdateModal SelectedData={SelectedData}></CSMDistanceUpdateModal>
            </Modal>
        </DistanceDataInsertPageMainDivBox>
    );
};

export default DistanceDataInsertPage;

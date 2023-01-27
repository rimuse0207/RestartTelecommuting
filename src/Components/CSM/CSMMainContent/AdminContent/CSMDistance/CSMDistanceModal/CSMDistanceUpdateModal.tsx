import React, { useState } from 'react';
import styled from 'styled-components';
import { DistanceDataTypes } from '../DistanceDataInsertPage';
import { IoIosArrowDroprightCircle } from 'react-icons/io';

const CSMDistanceUpdateModalMainDivBox = styled.div`
    padding-top: 20px;
    padding-bottom: 50px;
    position: relative;
    .CeCalendarSubMenu_SubMenusUl {
        width: 100%;
        display: flex;

        li {
            width: 15%;
            border-bottom: 3px solid #368;
            text-align: center;
            padding-bottom: 10px;
            margin-top: 10px;
            margin-right: 30px;
            :hover {
                cursor: pointer;
            }
        }
    }

    .Float_Container {
        margin-top: 50px;

        ::after {
            clear: both;
            content: '';
            display: block;
        }

        table.type09 {
            border-collapse: collapse;
            text-align: left;
            line-height: 1.5;
        }
        table.type09 thead th {
            padding: 10px;
            font-weight: bold;
            vertical-align: top;
            color: #369;
            border-bottom: 3px solid #036;
        }
        table.type09 tbody th {
            width: 150px;
            padding: 10px;
            font-weight: bold;
            vertical-align: top;
            border-bottom: 1px solid #ccc;
            background: #f3f6f7;
        }
        table.type09 td {
            width: 350px;
            padding: 10px;
            vertical-align: top;
            border-bottom: 1px solid #ccc;
        }
        .Float_Left {
            width: 45%;
            float: left;
            min-height: 50px;
        }
        .Float_Right {
            width: 45%;
            float: right;
            min-height: 50px;
        }
        .Float_Middle {
            font-size: 2em;
            float: left;
            position: absolute;
            top: 60%;
            left: 45%;
            transform: translate(-50%, -40%);
        }
    }
`;

type CSMDistanceUpdateModalPropsTypes = {
    SelectedData: DistanceDataTypes | null;
};

const CSMDistanceUpdateModal = ({ SelectedData }: CSMDistanceUpdateModalPropsTypes) => {
    const [SelectedMenu, setSelectedMenu] = useState([
        { name: 'Pangyo', value: '판교', selected: true },
        { name: 'Asan', value: '아산', selected: false },
    ]);

    return (
        <CSMDistanceUpdateModalMainDivBox>
            <ul className="CeCalendarSubMenu_SubMenusUl">
                {SelectedMenu.map(list => {
                    return <li style={list.selected ? {} : { opacity: 0.5 }}>{list.value}</li>;
                })}
            </ul>
            <div className="Float_Container">
                <div className="Float_Left">
                    <h2>수정전</h2>
                    <table className="type09">
                        <thead>
                            <tr>
                                <th scope="cols">판교</th>
                                <th scope="cols">내용</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Area</th>
                                <td>{SelectedData?.csm_distance_lists_area}</td>
                            </tr>
                            <tr>
                                <th scope="row">Custommer</th>
                                <td>{SelectedData?.csm_distance_lists_custommer}</td>
                            </tr>
                            <tr>
                                <th scope="row">이동 거리</th>
                                <td>{SelectedData?.csm_distance_lists_distance}</td>
                            </tr>
                            <tr>
                                <th scope="row">이동 시간</th>
                                <td>{SelectedData?.csm_distance_lists_distance_time}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="Float_Middle">
                    <IoIosArrowDroprightCircle></IoIosArrowDroprightCircle>
                </div>
                <div className="Float_Right">
                    <h2>수정후</h2>
                    <table className="type09">
                        <thead>
                            <tr>
                                <th scope="cols">판교</th>
                                <th scope="cols">내용</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Area</th>
                                <td>{SelectedData?.csm_distance_lists_area}</td>
                            </tr>
                            <tr>
                                <th scope="row">Custommer</th>
                                <td>{SelectedData?.csm_distance_lists_custommer}</td>
                            </tr>
                            <tr>
                                <th scope="row">이동 거리</th>
                                <td>{SelectedData?.csm_distance_lists_distance}</td>
                            </tr>
                            <tr>
                                <th scope="row">이동 시간</th>
                                <td>{SelectedData?.csm_distance_lists_distance_time}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </CSMDistanceUpdateModalMainDivBox>
    );
};

export default CSMDistanceUpdateModal;

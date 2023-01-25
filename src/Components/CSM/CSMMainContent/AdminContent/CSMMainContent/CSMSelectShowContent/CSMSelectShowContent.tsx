import React, { useRef, useState, DragEvent } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../../../../models';

const CSMSelectShowContentMainDivBox = styled.div`
    position: fixed;
    width: 100%;
    height: 100px;
    bottom: 0px;
    background-color: #fff;
    border: 1px solid black;
    z-index: 99;
    left: 0px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 10px;
    overflow-y: auto;

    .ScrollChecking {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 5px;
        :hover {
            cursor: row-resize;
        }
    }

    .Select_Content_li {
        width: 100%;
        .Select_Content_li_Container_Div {
            div {
                border: 1px solid lightgray;
                width: 100%;
                text-align: center;
            }
            display: flex;
            width: 100%;
            justify-content: space-between;
        }
    }
`;

const CSMSelectShowContent = () => {
    const HanldFixedCheck = useRef<any>(null);
    const CSM_Selected_Data_List = useSelector((state: RootState) => state.CSM_Selected_Data_List.Csm_Selected_Data);
    const [initialPos, setInitialPos] = useState<any>(0);
    const [initialSize, setInitialSize] = useState<any>(0);

    const HandleDragStart = (e: DragEvent<HTMLDivElement>) => {
        setInitialPos(e.clientY);
        setInitialSize(HanldFixedCheck.current.offsetHeight);
    };

    const HandleDrag = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (HanldFixedCheck && e.clientY !== 0) {
            HanldFixedCheck.current.style.height = `${parseInt(initialSize) - e.clientY + initialPos}px`;
        }
    };

    return (
        <CSMSelectShowContentMainDivBox ref={HanldFixedCheck}>
            <div className="ScrollChecking" draggable={true} onDrag={e => HandleDrag(e)} onDragStart={e => HandleDragStart(e)}></div>
            <div>
                <h2>선택된 CSM List({CSM_Selected_Data_List.length})</h2>
            </div>
            <ul>
                <li className="Select_Content_li">
                    <div
                        className="Select_Content_li_Container_Div"
                        style={{ fontWeight: 'bolder', backgroundColor: 'lightgray', height: '40px', lineHeight: '40px' }}
                    >
                        <div>인덱스</div>
                        <div>상태</div>
                        <div>등급</div>
                        <div>CSM</div>
                        <div>MODEL</div>
                        <div>제번</div>
                        <div>고객사</div>
                        <div>Part NO.</div>
                        <div>제목</div>
                        <div>비고</div>
                    </div>
                </li>
                {CSM_Selected_Data_List.map((list, j) => {
                    return (
                        <li className="Select_Content_li" key={list.csm_basic_data_csm_key}>
                            <div className="Select_Content_li_Container_Div">
                                <div>{j + 1}</div>
                                <div>{list.csm_basic_data_state}</div>
                                <div>{list.csm_basic_data_grade}</div>
                                <div>{list.csm_basic_data_csm_number}</div>
                                <div>{list.csm_basic_data_model_number}</div>
                                <div>{list.csm_basic_data_binds}</div>
                                <div>{list.csm_basic_data_custom}</div>
                                <div>{list.csm_basic_data_part_number}</div>
                                <div>{list.csm_basic_data_titles}</div>
                                <div>{list.csm_basic_data_etc}</div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </CSMSelectShowContentMainDivBox>
    );
};

export default CSMSelectShowContent;

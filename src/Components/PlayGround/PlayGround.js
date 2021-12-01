// import axios from 'axios';
// import React, { useRef, useState, useEffect, useCallback } from 'react';
// import useIntersect from '../../HOOKS/useIntersect';
// import './PlayGround.css';

// const fakeFetch = (delay = 1000) => new Promise(res => setTimeout(res, delay));

// const PlayGround = () => {
//     let count = 0;
//     const [state, setState] = useState({ itemCount: 0, isLoading: false });
//     const [FoodDatas, setFoodDatas] = useState([]);
//     const getData = async numbers => {
//         try {
//             const getDataServer = await axios.get('http://localhost:3003/FoodGetDataInfinity', {
//                 params: {
//                     countNumber: numbers,
//                 },
//             });
//             setFoodDatas(FoodDatas.concat(getDataServer.data.datas));
//             count = count + 40;
//             // setFinishCount(getDataServer.data.finishCount);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const fetchItems = async () => {
//         setState(prev => ({ ...prev, isLoading: true }));
//         await getData(state.itemCount);
//         await fakeFetch();

//         setState(prev => ({
//             itemCount: prev.itemCount + 40,
//             isLoading: false,
//         }));
//     };
//     /* initial fetch */
//     useEffect(() => {
//         fetchItems();
//     }, []);
//     const [_, setRef] = useIntersect(async (entry, observer) => {
//         console.log('play1');
//         observer.unobserve(entry.target);
//         console.log('play2');
//         await getData(state.itemCount);
//         console.log('play3');
//         await fetchItems();
//         console.log('play4');

//         observer.observe(entry.target);
//         console.log('play5');
//     }, {});
//     const { itemCount, isLoading } = state;
//     if (!itemCount) return null;

//     return (
//         <div style={{ background: 'lightgray' }}>
//             <table>
//                 <thead>
//                     <tr style={{ background: 'gray' }}>
//                         <th>날짜</th>
//                         <th>이름</th>
//                         <th>회사</th>
//                         <th>메뉴명</th>
//                         <th>메뉴의견</th>
//                         <th>WILL</th>
//                         <th>날짜</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {FoodDatas.map((item, i) => {
//                         return (
//                             <tr className="ListItem" key={item.indexs}>
//                                 {/* <td>{FoodDatas[i].indexs}</td>
//                                 <td>{FoodDatas[i].name}</td>
//                                 <td>{FoodDatas[i].company}</td>
//                                 <td>{FoodDatas[i].menuname}</td>
//                                 <td>{FoodDatas[i].menuopinion}</td>
//                                 <td>{FoodDatas[i].money}</td>
//                                 <td>{FoodDatas[i].roulletcheck}</td>
//                                 <td>{FoodDatas[i].updateDates}</td> */}
//                                 <td>{i}</td>
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>

//             <div style={{ height: '100px' }} ref={setRef} className="Loading">
//                 {isLoading && 'Loading...'}
//             </div>
//         </div>
//     );
// };

// export default PlayGround;

import React from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import styled from 'styled-components';

const USBCDApplyFormBoxDiv = styled.div`
    width: 90%;
    height: 40px;
    display: flex;
    margin-top: 3px;
    margin-bottom: 6px;
`;

const PlayGround = () => {
    return (
        <div>
            <h2>USB/CD 사전 신청</h2>
            <div>
                <form>
                    <USBCDApplyFormBoxDiv>
                        <div className="CElogs_WriteData_FORM_Text_label">이름</div>
                        <div className="CElogs_WriteData_FORM_emoticon_div">
                            <BsFillPencilFill></BsFillPencilFill>
                        </div>
                        <input className="CElogs_WriteData_FORM_InputBox" type="text" placeholder="이름"></input>
                    </USBCDApplyFormBoxDiv>
                    <USBCDApplyFormBoxDiv>
                        <div className="CElogs_WriteData_FORM_Text_label">사용일자</div>
                        <div className="CElogs_WriteData_FORM_emoticon_div">
                            <BsFillPencilFill></BsFillPencilFill>
                        </div>
                        <input type="text" className="CElogs_WriteData_FORM_InputBox" placeholder="사용일자"></input>
                    </USBCDApplyFormBoxDiv>
                    <USBCDApplyFormBoxDiv>
                        <div className="CElogs_WriteData_FORM_Text_label">사용장비</div>
                        <div className="CElogs_WriteData_FORM_emoticon_div">
                            <BsFillPencilFill></BsFillPencilFill>
                        </div>

                        <input type="text" className="CElogs_WriteData_FORM_InputBox" placeholder="사용장비"></input>
                    </USBCDApplyFormBoxDiv>
                    <USBCDApplyFormBoxDiv>
                        <div className="CElogs_WriteData_FORM_Text_label">사용 파일명</div>
                        <div className="CElogs_WriteData_FORM_emoticon_div">
                            <BsFillPencilFill></BsFillPencilFill>
                        </div>

                        <input className="CElogs_WriteData_FORM_InputBox" type="text" placeholder="사용 파일명"></input>
                    </USBCDApplyFormBoxDiv>
                    <USBCDApplyFormBoxDiv>
                        <div className="CElogs_WriteData_FORM_Text_label">자사 or 고객</div>
                        <div className="CElogs_WriteData_FORM_emoticon_div">
                            <BsFillPencilFill></BsFillPencilFill>
                        </div>

                        <input className="CElogs_WriteData_FORM_InputBox" type="text" placeholder="자사또는 고객"></input>
                    </USBCDApplyFormBoxDiv>
                    <USBCDApplyFormBoxDiv>
                        <div className="CElogs_WriteData_FORM_Text_label">사용이유</div>
                        <div className="CElogs_WriteData_FORM_emoticon_div">
                            <BsFillPencilFill></BsFillPencilFill>
                        </div>

                        <input className="CElogs_WriteData_FORM_InputBox" type="text" placeholder="사용이유"></input>
                    </USBCDApplyFormBoxDiv>
                    <div style={{ textAlign: 'end', width: '50%' }}>
                        <button className="CElogs_WriteData_FORM_ButtonBox" type="submit">
                            저장
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PlayGround;

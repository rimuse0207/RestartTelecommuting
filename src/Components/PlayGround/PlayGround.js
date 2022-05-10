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

import React, { useState } from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import styled from 'styled-components';
import TimePickerWrapper from 'react-times';
// use material theme
import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css';
import { set } from 'date-fns';

const USBCDApplyFormBoxDiv = styled.div`
    width: 90%;
    height: 40px;
    display: flex;
    margin-top: 3px;
    margin-bottom: 6px;
`;

const PlayGround = () => {
    const [times, setTimes] = useState('09:00');
    return (
        <div>
            <TimePickerWrapper
                theme="classic"
                timeFormat="HH:MM"
                time={times}
                onTimeChange={options => setTimes(`${options.hour}:${options.minute}`)}
            ></TimePickerWrapper>
        </div>
    );
};

export default PlayGround;

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import HambergerMenu from '../../../Navigation/HambergerMenu';

const ReNewalCSMMainPageMainDivBox = styled.div`
    width: 95%;
    margin: 0 auto;
    .Container {
        box-shadow: 5px 5px 5px 5px gray;
        max-height: 80vh;
        border-radius: 10px;
        overflow: auto;

        margin-top: 20px;
        table {
            font-size: 0.5em;
            width: 300%;
            border-collapse: collapse;
            border-spacing: 0;
            /* table-layout: fixed; */
            thead {
                position: sticky;
                top: 0px;
                z-index: 200;
                th {
                    font-size: 0.7em;
                    background-color: white;
                    border: none;
                    border: 0.5px solid lightgray;
                    /* border-bottom: 2px solid #368; */
                    padding: 10px;
                    ::after {
                        content: '';
                        border-bottom: 2px solid #368;
                        width: 100%;
                        position: absolute;
                        bottom: 0px;
                        left: 0;
                    }
                    max-width: 150px;
                }
                .Fixed_Data {
                    position: sticky;
                    z-index: 100;
                }
            }
            tbody {
                tr {
                    td {
                        border: 0.5px solid lightgray;
                        background-color: white;
                        max-width: 150px;
                    }
                }
                .Fixed_Data {
                    position: sticky;
                    z-index: 100;
                    background-color: #fff;
                }
            }
        }
    }
`;

const ReNewalCSMMainPage = () => {
    const leftSizeCheck = useRef<any>([]);

    useEffect(() => {
        if (leftSizeCheck) {
            let widthCal = 0;
            for (var i = 0; i < 5; i++) {
                leftSizeCheck.current[i].offsetLeft = widthCal;
                widthCal = leftSizeCheck.current[i - 1 > 0 ? i - 1 : 0].clientWidth + widthCal;
            }
        }
    }, [leftSizeCheck]);

    return (
        <div>
            <HambergerMenu titles="CSM" subtitles="CSM관리"></HambergerMenu>
            <ReNewalCSMMainPageMainDivBox>
                <div className="Container">
                    <table>
                        <thead>
                            <tr>
                                {/* <th>숨김</th> */}
                                <th>상태</th>
                                <th>등급</th>

                                <th className="Fixed_Data" ref={el => (leftSizeCheck.current[0] = el)} style={{ left: 1000 }}>
                                    CSM
                                </th>
                                <th className="Fixed_Data" ref={el => (leftSizeCheck.current[1] = el)}>
                                    MODEL
                                </th>
                                <th className="Fixed_Data" ref={el => (leftSizeCheck.current[2] = el)}>
                                    제번
                                </th>
                                <th className="Fixed_Data" ref={el => (leftSizeCheck.current[3] = el)}>
                                    고객사
                                </th>
                                <th className="Fixed_Data" ref={el => (leftSizeCheck.current[4] = el)}>
                                    Part NO.
                                </th>

                                <th>제목</th>
                                <th>비고</th>
                                <th>사용자 이름</th>
                                <th>작업시간</th>
                                <th>작업인원</th>
                                <th>이동거리</th>
                                <th>이동시간</th>
                                <th>숙박일수</th>
                                <th>이동거리 비용</th>
                                <th>이동시간 비용</th>
                                <th>숙박비용</th>
                                <th>작업비용</th>
                                <th>총비용</th>
                                <th>발행</th>
                                <th>신청</th>
                                <th>입고</th>
                                <th>CE</th>
                                <th>고객</th>
                                <th>PAY</th>
                                <th>완료</th>
                                <th>자세히</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array(50)
                                .fill(1)
                                .map(j => {
                                    return (
                                        <tr>
                                            {/* <td>숨김</td> */}
                                            <td>상태</td>
                                            <td>등급</td>
                                            <td className="Fixed_Data" style={{ left: 0 }}>
                                                CSM
                                            </td>
                                            <td className="Fixed_Data">MODEL</td>
                                            <td className="Fixed_Data">제번</td>

                                            <td className="Fixed_Data">고객</td>
                                            <td className="Fixed_Data">Part NO.</td>
                                            <td>제목</td>
                                            <td>비고</td>
                                            <td>사용자 이름</td>
                                            <td>작업시간</td>
                                            <td>작업인원</td>
                                            <td>이동거리</td>
                                            <td>이동시간</td>
                                            <td>숙박일수</td>
                                            <td>이동거리 비용</td>
                                            <td>이동시간 비용</td>
                                            <td>숙박비용</td>
                                            <td>작업비용</td>
                                            <td>총비용</td>
                                            <td>발행</td>
                                            <td>신청</td>
                                            <td>입고</td>
                                            <td>CE</td>
                                            <td>고객</td>
                                            <td>PAY</td>
                                            <td>완료</td>
                                            <td>자세히</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </ReNewalCSMMainPageMainDivBox>
        </div>
    );
};

export default ReNewalCSMMainPage;

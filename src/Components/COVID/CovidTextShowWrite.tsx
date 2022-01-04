import React, { useState } from 'react';
import styled from 'styled-components';

const MainCovidTextShowMainBoxDiv = styled.div`
    width: 80%;
    margin: 0 auto;
`;

const CovidTextShowWrite = () => {
    const [getData, setGetData] = useState([
        {
            index: 0,
            text: '코로나 4단계 거리두기 시행중',
        },
        {
            index: 1,
            text: '4인 이상 집합 근지',
        },
    ]);
    return (
        <MainCovidTextShowMainBoxDiv>
            <div>
                <ul>
                    {getData.map((list, i) => {
                        return (
                            <li>
                                {list.index + 1}. {list.text}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </MainCovidTextShowMainBoxDiv>
    );
};

export default CovidTextShowWrite;

import React from 'react';
import styled from 'styled-components';

const CSMContentMainPageMainDivBox = styled.div`
    border: 1px solid black;
    margin-left: 10px;
    .MainTitleName {
        position: relative;
        ul {
            display: flex;
            border: 1px solid black;
            position: absolute;
            top: 0px;
            left: 0px;
            li {
                border: 1px solid black;
            }
        }
    }
`;

const CSMContentMainPage = () => {
    return (
        <CSMContentMainPageMainDivBox>
            <div>dada</div>
            <div className="MainTitleName">
                <ul>
                    <li>인덱스</li>
                    <li>상태</li>
                    <li>등급</li>
                    <li>CSM</li>
                    <li>MODEL</li>
                    <li>제번</li>
                    <li>고객사</li>
                    <li>Part No</li>
                    <li>제목</li>
                    <li>비고</li>
                    <li>사용자 이름</li>
                </ul>
                <ul>
                    <li>1</li>
                    <li>인데스</li>
                    <li>상태</li>
                    <li>등급</li>
                    <li>인데스</li>
                </ul>
            </div>
        </CSMContentMainPageMainDivBox>
    );
};

export default CSMContentMainPage;

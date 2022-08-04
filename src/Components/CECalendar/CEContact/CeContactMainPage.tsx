import React from 'react';
import styled from 'styled-components';

const CeContactMainPageMainDivBox = styled.div`
    border: 1px solid black;
    padding: 30px;
    table {
        width: 100%;
        border: 3px solid #444444;
        border-collapse: collapse;
    }
    th {
        font-size: 1.5em;
    }
    th,
    td {
        border: 1px solid #444444;
        padding: 10px;
    }
`;

const CeContactMainPage = () => {
    return (
        <CeContactMainPageMainDivBox>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={4}>CSM 관련 고객사 부서장 연락처</th>
                        </tr>
                        <tr>
                            <th>고객사</th>
                            <th>성함</th>
                            <th>직책 / 직급</th>
                            <th>메일 주소</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td rowSpan={2}>SK hynix (CJ) PKG</td>
                            <td>김남구</td>
                            <td>팀장 / 수석</td>
                            <td>namgu1.kim@sk.com</td>
                        </tr>
                        <tr>
                            <td>이기봉</td>
                            <td>직장 / 기성</td>
                            <td>gibong.lee@sk.com</td>
                        </tr>
                        <tr>
                            <td rowSpan={2}>SK hynix System IC</td>
                            <td>권용규</td>
                            <td>그룹장 / 수석</td>
                            <td>yongkyu.kwon@sk.com</td>
                        </tr>
                        <tr>
                            <td>이영배</td>
                            <td>파트장 / 책임</td>
                            <td>youngbae1.lee@sk.com</td>
                        </tr>
                        <tr>
                            <td rowSpan={2}>SFA 반도체</td>
                            <td>김종억</td>
                            <td>팀장 / 부장</td>
                            <td>jongeuck.kim@sfasemicon.com</td>
                        </tr>
                        <tr>
                            <td>손성오</td>
                            <td>파트장 / 차장</td>
                            <td>seongoh.son@sfasemicon.com</td>
                        </tr>
                        <tr>
                            <td rowSpan={2}>Hanmicron</td>
                            <td>손효원</td>
                            <td>그룹장 / 부장</td>
                            <td>naragood@hanamicron.co.kr</td>
                        </tr>
                        <tr>
                            <td>임재형</td>
                            <td>파트장 / 차장</td>
                            <td>jhlim@hanamicron.co.kr</td>
                        </tr>
                        <tr>
                            <td rowSpan={2}>Steco</td>
                            <td>김시정</td>
                            <td>그룹장 / 부장</td>
                            <td>ksj0019@steco.co.kr</td>
                        </tr>
                        <tr>
                            <td>정우창</td>
                            <td>파트장 / 부장</td>
                            <td>jwc.jung@steco.co.kr</td>
                        </tr>
                        <tr>
                            <td rowSpan={8}>삼성온양</td>
                            <td>김상민</td>
                            <td>파트 3 파트장</td>
                            <td>sangmin1.kim@samsung.com</td>
                        </tr>
                        <tr>
                            <td>하경호</td>
                            <td>파트 2 파트장</td>
                            <td>kyungho.ha@samsung.com</td>
                        </tr>
                        <tr>
                            <td>김경열</td>
                            <td>제조기술총괄책임</td>
                            <td>ky102.kim@samsung.com</td>
                        </tr>
                        <tr>
                            <td>김영준</td>
                            <td>라인별 관리자(1Line)</td>
                            <td>yj012.kim@samsung.com</td>
                        </tr>
                        <tr>
                            <td>임영식</td>
                            <td>라인별 관리자(2Line)</td>
                            <td>ys7354.lim@samsung.com</td>
                        </tr>
                        <tr>
                            <td>박준현</td>
                            <td>라인별 관리자(3Line)</td>
                            <td>jun91.park@samsung.com</td>
                        </tr>
                        <tr>
                            <td>이정규</td>
                            <td>라인별 관리자(4Line)</td>
                            <td>bb1.lee@samsung.com</td>
                        </tr>
                        <tr>
                            <td>이진호</td>
                            <td>라인별 관리자(5Line)</td>
                            <td>jhhow.lee@samsung.com</td>
                        </tr>
                        <tr>
                            <td rowSpan={3}>삼성천안</td>
                            <td>한기욱</td>
                            <td>부장 (4층)</td>
                            <td>kiwook.han@samsung.com</td>
                        </tr>
                        <tr>
                            <td>조정범</td>
                            <td>과장 (2층)</td>
                            <td>jongbum.cho@samsung.com</td>
                        </tr>
                        <tr>
                            <td>예준영</td>
                            <td>프로 (PLP)</td>
                            <td>joonyoung.yeh@samsung.com</td>
                        </tr>
                        <tr>
                            <td rowSpan={2}>Nepes</td>
                            <td>배상현</td>
                            <td>차장</td>
                            <td>shbae@nepes.co.kr</td>
                        </tr>
                        <tr>
                            <td>유대길</td>
                            <td>과장</td>
                            <td>yudg@nepes.co.kr</td>
                        </tr>
                        <tr>
                            <td>SK Siltron</td>
                            <td>이영호</td>
                            <td>팀장 / 부장 (프로)</td>
                            <td>youngho.lee1@sk.com</td>
                        </tr>
                        <tr>
                            <td>SK Hynix ( IC ) PKG</td>
                            <td>김광훈</td>
                            <td>팀장 / TL</td>
                            <td>twelve@sk.com</td>
                        </tr>
                        <tr>
                            <td>SK Hynix ( IC ) TSV</td>
                            <td>최영문</td>
                            <td>팀장 / TL</td>
                            <td>youngmun.choi@sk.com</td>
                        </tr>
                        <tr>
                            <td>SK Hynix ( IC ) M10C</td>
                            <td>박상범</td>
                            <td>팀장 / TL</td>
                            <td>sangbum1.park@sk.com</td>
                        </tr>
                        <tr>
                            <td rowSpan={2}>SK Hynix ( IC ) 개발라인</td>
                            <td>박상국</td>
                            <td>FM </td>
                            <td>sangkook.park@sk.com</td>
                        </tr>
                        <tr>
                            <td>임상준</td>
                            <td>팀장</td>
                            <td>sangjoon.lim@sk.com</td>
                        </tr>
                        <tr>
                            <td>FUREX</td>
                            <td>강명수</td>
                            <td>팀장 / 차장 </td>
                            <td>mskang@furex.co.kr</td>
                        </tr>
                        <tr>
                            <td rowSpan={2}>AMKOR K5</td>
                            <td>황대현</td>
                            <td>수석 ( PM 선임 )</td>
                            <td>DaeHyeon.Hwang@amkor.co.kr</td>
                        </tr>
                        <tr>
                            <td>문정식</td>
                            <td>파트장 / 부장</td>
                            <td>JongSik.Moon@amkor.co.kr</td>
                        </tr>
                        <tr>
                            <td>Signetics</td>
                            <td>이상현</td>
                            <td>팀장 / 차장</td>
                            <td>sti.bs@sti-corp.co.kr</td>
                        </tr>
                        <tr>
                            <td>ASE Korea</td>
                            <td>이용주</td>
                            <td>팀장 / 부장</td>
                            <td>yongjulee@asekr.com</td>
                        </tr>
                        <tr>
                            <td>Samsung ( KH )</td>
                            <td>장수억</td>
                            <td>팀장 / 차장 </td>
                            <td>su.jang@samsung.com</td>
                        </tr>
                        <tr>
                            <td>Samsung LED </td>
                            <td>서상연</td>
                            <td>직장</td>
                            <td>richard.seo@samsung.com</td>
                        </tr>
                        <tr>
                            <td>Winpac</td>
                            <td>양훈</td>
                            <td>파트장 / 부장</td>
                            <td>hyang@winpac.co.kr</td>
                        </tr>
                        <tr>
                            <td>LG Innotek</td>
                            <td>이상현</td>
                            <td>팀장 </td>
                            <td>shlees@lginnotek.com</td>
                        </tr>
                        <tr>
                            <td>On-Semi</td>
                            <td>김석</td>
                            <td>파트장 / 부장</td>
                            <td>Conner.Kim@onsemi.com</td>
                        </tr>
                        <tr>
                            <td>동부하이텍</td>
                            <td>정정호</td>
                            <td>수석</td>
                            <td>jungho.jung@dbhitek.com</td>
                        </tr>
                        <tr>
                            <td>Statschippac</td>
                            <td>김태규</td>
                            <td>차장</td>
                            <td>taegyu.kim@Statschippac.com</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </CeContactMainPageMainDivBox>
    );
};

export default CeContactMainPage;

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../models/index';
import './ApplyMealPage.css';
import { DecryptKey } from '../../config';
const ApplyMealPage = () => {
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    return (
        <div style={{ width: '95%', margin: '0 auto' }}>
            <div>
                <div className="SelectMonth">
                    <select name="SelectValue" id="TestSelect">
                        <option>조회 월을 선택해주세요.</option>
                        <option value="01">1월</option>
                        <option value="02">2월</option>
                        <option value="03">3월</option>
                        <option value="04">4월</option>
                        <option value="05">5월</option>
                        <option value="06">6월</option>
                        <option value="07">7월</option>
                        <option value="08">8월</option>
                        <option value="09">9월</option>
                        <option value="10">10월</option>
                        <option value="11">11월</option>
                        <option value="12">12월</option>
                    </select>
                </div>
                <h1>월 식대 조회 및 등록</h1>

                <div id="form-div">
                    <form className="form" id="form1" action="foodchargesend.jsp" method="post">
                        <div className="halfdiv">
                            <p className="name">
                                <input
                                    name="team"
                                    value={InfomationState.team}
                                    type="text"
                                    className="validate[required,custom[onlyLetter],length[0,100]] feedback-input"
                                    placeholder="team"
                                    id="team"
                                    readOnly
                                />
                            </p>
                            <p className="name">
                                <input
                                    name="name"
                                    value={DecryptKey(InfomationState.name)}
                                    type="text"
                                    className="validate[required,custom[onlyLetter],length[0,100]] feedback-input"
                                    placeholder="Name"
                                    id="name"
                                    readOnly
                                />
                            </p>
                        </div>
                        <div className="halfdiv">
                            <p className="name">
                                <input
                                    name="workdate"
                                    type="text"
                                    className="validate[required,custom[onlyLetter],length[0,100]] feedback-input"
                                    placeholder="일자 (Click here)"
                                    id="datepicker"
                                    autoComplete="off"
                                />
                            </p>
                            <p>
                                <select name="division">
                                    <option value="중식" selected>
                                        중식
                                    </option>
                                    <option value="석식">석식</option>
                                </select>
                            </p>
                        </div>

                        <p className="name">
                            <input
                                name="spending"
                                type="number"
                                step="1000"
                                min="0"
                                className="validate[required,custom[onlyLetter],length[0,100]] feedback-input"
                                placeholder="지출 금액 (숫자만 입력)"
                                id="spending"
                            />
                        </p>
                        <p className="name">
                            <input
                                name="place"
                                type="text"
                                className="validate[required,custom[onlyLetter],length[0,100]] feedback-input"
                                placeholder="방문처 ex) SK하이닉스, 삼성전자"
                                id="place"
                            />
                        </p>
                        <p className="name">
                            <input
                                name="location"
                                type="text"
                                className="validate[required,custom[onlyLetter],length[0,100]] feedback-input"
                                placeholder="지역 ex) 이천, 온양"
                                id="location"
                            />
                        </p>

                        <div className="submit">
                            <input type="button" value="등록하기" id="button-blue" />
                            {/* <div className="textEx" style={{ color: 'rgba(93, 93, 93, 0.4)' }}>
                                참고..
                            </div>
                            <div className="textEx">*출장 일당 지급일은 식대 지원대상에서 제외</div>
                            <div className="textEx">*식대지원 한도: 7,000원/1식</div>
                            <div className="textEx">*익월 3영업일 까지 등록 가능</div>
                            <div className="textEx">*중식지원 제외 지역 (성남시, 아산시 둔포면)</div> */}
                        </div>
                    </form>
                </div>
                <div className="MealSettlement_Table_container_div_box">
                    <table>
                        <thead>
                            <tr>
                                <th>부서</th>
                                <th></th>
                                <th colSpan={2}></th>
                                <th>성명</th>
                                <th></th>
                            </tr>
                            <tr>
                                <th>일자</th>
                                <th>구분</th>
                                <th>지출 금액</th>
                                <th>정산 금액</th>
                                <th>방문처</th>
                                <th>지역</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="removeTHis">삭제</td>
                            </tr>

                            <tr className="tailtr">
                                <td colSpan={3}>합계</td>

                                <td>원</td>
                                <td colSpan={2}></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <button className="printbutton">출력하기</button>

            <div style={{ height: '30px' }}></div>
        </div>
    );
};

export default ApplyMealPage;

import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ExcelDataFormat from './ExcelDataFormat';
import ModalMealMonthDetailPage from './ModalMealMonthDetailPage';

const MealMonthMainPage = () => {
    const [selectedYear, setSelectedYear] = useState(moment().format('YYYY'));
    const [selectedMonth, setSelectedMonth] = useState(moment().format('MM'));
    const [selectedTeam, setSelectedTeam] = useState('All');
    const [belongNames, setBelongNames] = useState<any>([]);
    const [selectedNames, setSelectedNames] = useState('선택해주세요.');
    const [selectedIds, setSelectedIds] = useState('선택해주세요.');
    const [modalCheck, setModalCheck] = useState(false);
    useEffect(() => {
        selectedTeamChange();
    }, [selectedTeam, selectedMonth]);

    const selectedTeamChange = async () => {
        setBelongNames([]);
        try {
            const changeTeam = await axios.post(`${process.env.REACT_APP_DB_HOST}/Meal_app_servers/Meal_Team_Change`, {
                selectedYear,
                selectedMonth,
                selectedTeam,
            });
            if (changeTeam.data.dataSuccess) {
                console.log(changeTeam);
                setBelongNames(changeTeam.data.datas);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleClicksMeal = (names: string, id: string) => {
        setSelectedNames(names);
        setSelectedIds(id);
        setModalCheck(true);
    };

    return (
        <div>
            <div style={{ width: '90%', margin: '0 auto' }}>
                <div>
                    <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                    </select>
                    <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
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
                    <select value={selectedTeam} onChange={e => setSelectedTeam(e.target.value)}>
                        <option value="All">전체</option>
                        <option value="dicer">dicer</option>
                        <option value="laser">laser</option>
                        <option value="grinder">grinder</option>
                        <option value="장비영업">장비영업</option>
                        <option value="부품소재">부품소재</option>
                        <option value="영업기술">영업기술</option>
                        <option value="경영지원">경영지원</option>
                        <option value="아산CE">CE</option>
                    </select>
                    <span style={{ marginLeft: '50px' }}>
                        <ExcelDataFormat
                            selectedYear={selectedYear}
                            selectedMonth={selectedMonth}
                            selectedTeam={selectedTeam}
                        ></ExcelDataFormat>
                    </span>
                </div>
                <div style={{ marginBottom: '30px' }}>
                    <table style={{ textAlign: 'center', borderCollapse: 'collapse', width: '100%', fontWeight: 'bolder' }}>
                        <thead>
                            <tr>
                                <th>성명</th>
                                <th>부서명</th>
                                <th>중식 건수</th>
                                <th>중식 정산금액</th>
                                <th>석식 건수</th>
                                <th>석식 정산금액</th>
                                <th>총 건수</th>
                                <th>총 정산금액</th>
                            </tr>
                        </thead>
                        <tbody>
                            {belongNames.rows
                                ? belongNames.rows.map((list: { name: string; team: string; id: string }, i: number) => {
                                      return (
                                          <tr
                                              className="MealMonthMainPage_hover_tr"
                                              key={list.name}
                                              onDoubleClick={() => handleClicksMeal(list.name, list.id)}
                                          >
                                              <td style={{ padding: '10px' }}>{list.name}</td>
                                              <td>{list.team}</td>
                                              <td>{belongNames.lunchData[i].length} 건</td>
                                              <td>
                                                  {belongNames.lunchData[i]
                                                      .reduce((pre: number, next: { calculate: number }) => pre + next.calculate, 0)
                                                      .toString()
                                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                                                  원
                                              </td>
                                              <td>{belongNames.dinnerData[i].length} 건</td>
                                              <td>
                                                  {belongNames.dinnerData[i]
                                                      .reduce((pre: number, next: { calculate: number }) => pre + next.calculate, 0)
                                                      .toString()
                                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                                                  원
                                              </td>
                                              <td>{belongNames.lunchData[i].length + belongNames.dinnerData[i].length} 건</td>
                                              <td>
                                                  {(
                                                      belongNames.lunchData[i].reduce(
                                                          (pre: number, next: { calculate: number }) => pre + next.calculate,
                                                          0
                                                      ) +
                                                      belongNames.dinnerData[i].reduce(
                                                          (pre: number, next: { calculate: number }) => pre + next.calculate,
                                                          0
                                                      )
                                                  )
                                                      .toString()
                                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                                                  원
                                              </td>
                                          </tr>
                                      );
                                  })
                                : ''}
                        </tbody>
                    </table>
                </div>

                {modalCheck ? (
                    <ModalMealMonthDetailPage
                        selectedNames={selectedNames}
                        setModalCheck={data => setModalCheck(data)}
                        modalCheck={modalCheck}
                        selectedYear={selectedYear}
                        selectedMonth={selectedMonth}
                        selectedIds={selectedIds}
                    ></ModalMealMonthDetailPage>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
};

export default MealMonthMainPage;

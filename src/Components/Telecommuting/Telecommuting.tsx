import React, { useState } from 'react';
import moment from 'moment';
import CreateModal from '../Modal/CreateModal';
const Telecommuting = () => {
    const [getMoment, setMoment] = useState(moment());
    const [onClicked, setOnClickedSet] = useState(false);
    const today = getMoment;
    const firstWeek = today.clone().startOf('month').week();
    const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();
    const calendarArr = () => {
        let result: Array<any> = [];
        let week: number = firstWeek;
        for (week; week <= lastWeek; week++) {
            result = result.concat(
                <tr key={week}>
                    {Array(7)
                        .fill(0)
                        // eslint-disable-next-line no-loop-func
                        .map((data, index) => {
                            let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day');
                            if (moment().format('YYYYMMDD') === days.format('YYYYMMDD')) {
                                return (
                                    <td key={index} className="Telecommuting_table_today">
                                        <div className="Telecommuting_Table_dayNumber">
                                            <div style={{ paddingLeft: '5px' }}>{days.format('D')}</div>
                                            <div className="Telecommuting_Table_Data_Insert" onClick={() => setOnClickedSet(!onClicked)}>
                                                asdasd
                                            </div>
                                            <div className="Telecommuting_Table_Data_Insert">asdasd</div>
                                            <div className="Telecommuting_Table_Data_Insert">asdasd</div>
                                            <div className="Telecommuting_Table_Data_Insert">asdasd</div>
                                            <div className="Telecommuting_Table_Data_Insert">asdasd</div>

                                        </div>
                                    </td>
                                );
                            } else if (days.format('MM') !== today.format('MM')) {
                                return (
                                    <td key={index} className="Telecommuting_Table_nextMonth">
                                        <div className="Telecommuting_Table_dayNumber">
                                            <div style={{ paddingLeft: '5px' }}>{days.format('D')}</div>
                                        </div>
                                    </td>
                                );
                            } else {
                                return (
                                    <td key={index}>
                                        <div className="Telecommuting_Table_dayNumber">
                                            <div style={{ paddingLeft: '5px' }}>{days.format('D')}</div>
                                        </div>
                                    </td>
                                );
                            }
                        })}
                </tr>
            );
        }
        return result;
    };
    const modalClose = () => {
        setOnClickedSet(!onClicked);
    };
    return (
        <div style={{ height: '100%' }}>
            <div className="Telecommuting_date_show_div">
                <div className="control">
                    <button
                        onClick={() => {
                            setMoment(getMoment.clone().subtract(1, 'month'));
                        }}
                    >
                        {'<<<'}
                    </button>
                    <span>{today.format('YYYY년 MM월')}</span>
                    <button
                        onClick={() => {
                            setMoment(getMoment.clone().add(1, 'month'));
                        }}
                    >
                        {'>>>'}
                    </button>
                </div>
                {/* <h1>
                    {moment().format('YYYY년 MM월 DD일')}{' '}
                    {moment().day() === 0
                        ? '< 일 >'
                        : moment().day() === 1
                        ? '< 월 >'
                        : moment().day() === 2
                        ? '< 화 >'
                        : moment().day() === 3
                        ? '< 수 >'
                        : moment().day() === 4
                        ? '< 목 >'
                        : moment().day() === 5
                        ? '< 금 >'
                        : '토'}
                </h1> */}
            </div>
            <div style={{ height: '100%' }}>
                <table className="Telecommuting_Table">
                    <thead>
                        <tr>
                            <th>일</th>
                            <th>월</th>
                            <th>화</th>
                            <th>수</th>
                            <th>목</th>
                            <th>금</th>
                            <th>토</th>
                        </tr>
                    </thead>
                    <tbody>{calendarArr()}</tbody>
                </table>
            </div>
            {onClicked ? <CreateModal onClicked={onClicked} modalClose={modalClose}></CreateModal> : ''}
        </div>
    );
};

export default Telecommuting;

import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import moment from 'moment';
import ko from 'date-fns/locale/ko';
import './AfterOtworkSpace.css';

registerLocale('ko', ko);
type AfterOtWorkSpaceProps = {
    startDate: string;
};
const AfterOtWorkSpace = ({ startDate }: AfterOtWorkSpaceProps) => {
    const [BasicstartTime, setBasicStartTime] = useState(
        new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 09:00`).format('YYYY-MM-DD HH:mm'))
    );
    const [BasicendTime, setBasicEndTime] = useState(
        new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 18:00`).format('YYYY-MM-DD HH:mm'))
    );
    const [startTime, setStartTime] = useState(
        new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 18:00`).format('YYYY-MM-DD HH:mm'))
    );
    const [endTime, setEndTime] = useState(new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 18:00`).format('YYYY-MM-DD HH:mm')));
    const [restTime, setRestTime] = useState(
        new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm'))
    );
    const [SumTime, setSumTime] = useState(0);

    useEffect(() => {
        let startPlusEnd = moment.duration(moment(endTime).diff(moment(startTime))).asHours();
        const restPlusTime = moment
            .duration(moment(restTime).diff(moment(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm'))))
            .asHours();
        if (startPlusEnd < 0) {
            startPlusEnd = 24 + startPlusEnd;
            if (startPlusEnd - restPlusTime < 0) {
                alert('근무시간보다 휴게시간이 더 큽니다.');
                setRestTime(new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')));
                setSumTime(startPlusEnd);
            } else {
                setSumTime(startPlusEnd - restPlusTime);
            }
        } else {
            if (startPlusEnd - restPlusTime < 0) {
                alert('근무시간보다 휴게시간이 더 큽니다.');
                setRestTime(new Date(moment(`${moment(startDate).format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm')));
                setSumTime(startPlusEnd);
            } else {
                setSumTime(startPlusEnd - restPlusTime);
            }
        }
    }, [startTime, endTime, restTime]);
    return (
        <div>
            <div className="DatePickerTimes_float_box_div">
                <div className="DatePickerTimes_left_div">
                    <div className="DatePickerTimes">
                        <h2>소정 근로</h2>
                        <span>시작 시간</span>
                        <DatePicker
                            locale="ko"
                            selected={BasicstartTime}
                            onChange={(Time: any) => setBasicStartTime(Time)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            withPortal
                            portalId="root-timeportal"
                        />
                    </div>
                    <div className="DatePickerTimes">
                        <span>종료 시간</span>
                        <DatePicker
                            locale="ko"
                            selected={BasicendTime}
                            onChange={(Time: any) => setBasicEndTime(Time)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            withPortal
                            portalId="root-timeportal"
                        />
                    </div>
                </div>
                <div className="DatePickerTimes_right_div">
                    <div className="DatePickerTimes">
                        <h2>연장 근로</h2>
                        <span>시작 시간</span>
                        <DatePicker
                            locale="ko"
                            selected={startTime}
                            onChange={(Time: any) => setStartTime(Time)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            withPortal
                            portalId="root-timeportal"
                        />
                    </div>
                    <div className="DatePickerTimes">
                        <span>종료 시간</span>
                        <DatePicker
                            locale="ko"
                            selected={endTime}
                            onChange={(Time: any) => setEndTime(Time)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            withPortal
                            portalId="root-timeportal"
                        />
                    </div>
                    <div className="DatePickerTimes">
                        <span>휴게 시간</span>
                        <DatePicker
                            locale="ko"
                            selected={restTime}
                            onChange={(Time: any) => setRestTime(Time)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            withPortal
                            portalId="root-timeportal"
                        />
                    </div>
                </div>
            </div>
            <div>
                <div>소정 근로 시간: {moment.duration(moment(BasicendTime).diff(moment(BasicstartTime))).asHours() - 1} 시간 </div>
                <div>연장 근로 시간: {SumTime} 시간</div>
            </div>
            <div>
                <button>저장하기</button>
            </div>
        </div>
    );
};

export default AfterOtWorkSpace;

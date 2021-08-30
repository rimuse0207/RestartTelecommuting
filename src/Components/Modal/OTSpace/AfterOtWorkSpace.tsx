import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import moment from "moment";
import ko from 'date-fns/locale/ko';

registerLocale('ko', ko);
type AfterOtWorkSpaceProps = {
    startDate: string;
}
const AfterOtWorkSpace = ({ startDate }: AfterOtWorkSpaceProps) => {

    const [BasicstartTime, setBasicStartTime] = useState(new Date(moment(`${moment(startDate).format("YYYY-MM-DD")} 09:00`).format("YYYY-MM-DD HH:mm")));
    const [BasicendTime, setBasicEndTime] = useState(new Date(moment(`${moment(startDate).format("YYYY-MM-DD")} 18:00`).format("YYYY-MM-DD HH:mm")));
    const [startTime, setStartTime] = useState(new Date(moment(`${moment(startDate).format("YYYY-MM-DD")} 18:00`).format("YYYY-MM-DD HH:mm")));
    const [endTime, setEndTime] = useState(new Date(moment(`${moment(startDate).format("YYYY-MM-DD")} 18:00`).format("YYYY-MM-DD HH:mm")));


    return (
        <div>
            <div>이름:</div>
            <div>연장 근로 시작 시간</div>
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
        </div>
    );
};

export default AfterOtWorkSpace;

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
const MainOtWorkSpace = () => {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    return (
        <div>
            <div>이름:</div>
            <div>연장 근로 시작 시간</div>
            <div className="DatePickerTimes">
                <span>시작 시간</span>
                <DatePicker
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

export default MainOtWorkSpace;

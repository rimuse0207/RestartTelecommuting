import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../models/index';
import { DecryptKey } from '../../../config';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import axios from 'axios';
import moment from 'moment';
registerLocale('ko', ko);

const MealMonthSelect = () => {
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const [startDate, setStartDate] = useState<any>(new Date());
    const [selectDate, setSelectDate] = useState(moment().format('YYYY-MM'));
    return (
        <div>
            <div>
                <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    showMonthYearPicker
                    showFullMonthYearPicker
                    dateFormat="yyyy-MM"
                    locale="ko"
                    withPortal
                    portalId="root-portal"
                />
            </div>
        </div>
    );
};

export default MealMonthSelect;

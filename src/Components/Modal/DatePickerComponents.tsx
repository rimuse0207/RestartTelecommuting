import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePickerComponents.css';
import ko from 'date-fns/locale/ko';
import CompanyIn from './CompanyIn';
import CompanyOut from './CompanyOut';
import TeleWorking from './TeleWorking';
import ApplyState from './ApplyState';
import getYear from 'date-fns/getYear';
import getMonth from 'date-fns/getMonth';
import moment from 'moment';
import MainWorkSpace from './WorkSpace/MainWorkSpace';
import MainOtWorkSpace from './OTSpace/MainOtWorkSpace';

registerLocale('ko', ko);
type DatePickerComponentsProps = {
    clicksData: string | null;
};

const DatePickerComponents = ({ clicksData }: DatePickerComponentsProps) => {
    const [startDate, setStartDate] = useState<any>(clicksData);
    // const [menubarStatus, setMenubarStatus] = useState([
    //     {
    //         selected: true,
    //         names: '작성 현황',
    //     },
    //     {
    //         selected: false,
    //         names: '내 근',
    //     },
    //     {
    //         selected: false,
    //         names: '외 근',
    //     },
    //     {
    //         selected: false,
    //         names: '재 택',
    //     },
    // ]);
    // const menuSelected = (list: { selected: boolean; names: string }) => {
    //     setMenubarStatus(
    //         menubarStatus.map(item => {
    //             return item.names === list.names ? { ...item, selected: true } : { ...item, selected: false };
    //         })
    //     );
    // };

    const ExampleCustomInput = ({ value, onClick }: any) => (
        <button className="example-custom-input" onClick={onClick}>
            {' '}
            {value}{' '}
        </button>
    );

    const dateChangePre = () => {
        const a = moment(startDate).subtract(1, 'days').toString();
        setStartDate(new Date(a));
    };

    const dateChangeNext = () => {
        const a = moment(startDate).add(1, 'days').toString();
        setStartDate(new Date(a));
    };
    return (
        <div>
            <div className="Date_picker_bigBox_div">
                <div>
                    {startDate ? (
                        ''
                    ) : (
                        <>
                            <span>
                                아래의 파란 버튼을 클릭 후 <br />
                            </span>
                            <span>날짜를 선택 해주세요.</span>
                        </>
                    )}
                    <div className="datePickBox">
                        {startDate ? (
                            <div className="datePrev" onClick={dateChangePre}>
                                {' <<< '}
                            </div>
                        ) : (
                            ''
                        )}
                        <div className="DatePicker_container_div">
                            <DatePicker
                                placeholderText="보실 날짜를 선택해주세요."
                                dateFormat="yyyy-MM-dd(eee)"
                                locale="ko"
                                customInput={<ExampleCustomInput />}
                                selected={startDate}
                                withPortal
                                portalId="root-portal"
                                onChange={(date: any) => setStartDate(date)}
                            />
                        </div>
                        {startDate ? (
                            <div className="datePrev" onClick={dateChangeNext}>
                                {' >>> '}
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
            {/* {startDate ? (
                <div className="Modal_program_menu_bar">
                    <ul>
                        {menubarStatus.map((list, i) => {
                            return (
                                <li
                                    onClick={() => menuSelected(list)}
                                    key={list.names}
                                    className={list.selected ? 'Modal_program_menu_selected' : ''}
                                >
                                    {list.names}
                                </li>
                            );
                        })}
                    </ul>
                    <>
                        {menubarStatus.map((list, i) => {
                            return list.selected ? (
                                list.names === '내 근' ? (
                                    <CompanyIn></CompanyIn>
                                ) : list.names === '외 근' ? (
                                    <CompanyOut></CompanyOut>
                                ) : list.names === '재 택' ? (
                                    <TeleWorking></TeleWorking>
                                ) : list.names === '작성 현황' ? (
                                    <ApplyState></ApplyState>
                                ) : (
                                    <div>서버와의 연결 끊김</div>
                                )
                            ) : (
                                <></>
                            );
                        })}
                    </>
                </div>
            ) : (
                ''
            )} */}
            <MainWorkSpace startDate={startDate}></MainWorkSpace>
            {startDate ? <MainOtWorkSpace startDate={startDate}></MainOtWorkSpace> : ""}
        </div>
    );
};

export default DatePickerComponents;

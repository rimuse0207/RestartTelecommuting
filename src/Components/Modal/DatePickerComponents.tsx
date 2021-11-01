import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePickerComponents.css';
import ko from 'date-fns/locale/ko';
import CompanyIn from './CompanyIn';
import CompanyOut from './CompanyOut';
import TeleWorking from './TelecommutingSpace/TeleWorking';
import ApplyState from './ApplyState';
import getYear from 'date-fns/getYear';
import getMonth from 'date-fns/getMonth';
import moment from 'moment';
import MainWorkSpace from './WorkSpace/MainWorkSpace';
import MainOtWorkSpace from './OTSpace/MainOtWorkSpace';
import USBApplyMainPage from '../USBApply/USBApplyMainPage';
import UsbApply from '../USBApply/UsbApply';
import ApplyMealPage from '../MealSettlement/ApplyMealPage';
import BusinessTrip from '../WorkSpace/BusinessTrip';
import PartsApplyWorkSpace from './WorkSpace/PartsApplyWorkSpace';

registerLocale('ko', ko);
type DatePickerComponentsProps = {
    clicksData: string | null;
};

const DatePickerComponents = ({ clicksData }: DatePickerComponentsProps) => {
    const [startDate, setStartDate] = useState<any>(clicksData);
    const [selectedShow, setSelectedShow] = useState({
        Before_OT_workspace: false,
        After_OT_workspace: false,
        Apply_Food_workspace: false,
        Apply_USB_CD_workspace: false,
        Telecommuting_workspace: false,
        BusinessTrip: false,
        Apply_Parts_workspace: false,
    });
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
    const handleChangeSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const initialSelectedState = {
            Before_OT_workspace: e.target.value === 'Before_OT_workspace' ? true : false,
            After_OT_workspace: e.target.value === 'After_OT_workspace' ? true : false,
            Apply_Food_workspace: e.target.value === 'Apply_Food_workspace' ? true : false,
            Apply_USB_CD_workspace: e.target.value === 'Apply_USB_CD_workspace' ? true : false,
            Telecommuting_workspace: e.target.value === 'Telecommuting_workspace' ? true : false,
            BusinessTrip: e.target.value === 'BusinessTrip' ? true : false,
            Apply_Parts_workspace: e.target.value === 'Apply_Parts_workspace' ? true : false,
        };
        setSelectedShow(initialSelectedState);
    };
    return (
        <div>
            <div className="Date_picker_bigBox_div">
                <div>
                    {startDate ? (
                        <select onChange={e => handleChangeSelected(e)}>
                            <option value="initial">항목을 선택 해 주세요.</option>
                            {/* <option value="BusinessTrip">출장 신청</option> */}
                            <option value="Apply_USB_CD_workspace">USB/CD 신청</option>
                            <option value="Apply_Food_workspace">식대정산 신청</option>
                            <option value="Apply_Parts_workspace">업무요청</option>
                        </select>
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

            {startDate ? selectedShow.Before_OT_workspace ? <MainOtWorkSpace startDate={startDate}></MainOtWorkSpace> : '' : ''}
            {startDate ? selectedShow.After_OT_workspace ? <MainOtWorkSpace startDate={startDate}></MainOtWorkSpace> : '' : ''}
            {startDate ? selectedShow.Apply_USB_CD_workspace ? <UsbApply pickerDate={startDate}></UsbApply> : '' : ''}
            {startDate ? selectedShow.Apply_Food_workspace ? <ApplyMealPage pickerDate={startDate}></ApplyMealPage> : '' : ''}
            {startDate ? selectedShow.Telecommuting_workspace ? <TeleWorking pickerDate={startDate}></TeleWorking> : '' : ''}
            {startDate ? selectedShow.BusinessTrip ? <BusinessTrip pickerDate={startDate}></BusinessTrip> : '' : ''}

            {startDate ? selectedShow.Apply_Parts_workspace ? <PartsApplyWorkSpace pickerDate={startDate}></PartsApplyWorkSpace> : '' : ''}
        </div>
    );
};

export default DatePickerComponents;

import React, { useState, useEffect } from 'react';
import './UsbUse.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { DecryptKey } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../models';
import moment from 'moment';
import { toast } from '../ToastMessage/ToastManager';
import { getUSBCDThunk } from '../../models/Thunk_models/USBCDData';
type UsbApplyProps = {
    pickerDate?: any;
};

const UsbApply = ({ pickerDate }: UsbApplyProps) => {
    const dispatch = useDispatch();
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const ExampleCustomInput = ({ value, onClick }: any) => (
        <button className="example-custom-input10" onClick={onClick}>
            {' '}
            {value}{' '}
        </button>
    );
    useEffect(() => {
        setStartDate(pickerDate ? pickerDate : new Date());
    }, [pickerDate]);

    const [startDate, setStartDate] = useState(pickerDate ? pickerDate : new Date());
    const handleChangeData = (date: any) => {
        setStartDate(date);
    };
    const [equipment, setequipment] = useState('');
    const [filename, setfilename] = useState('');
    const [useText, setUseText] = useState('');
    const [usbownership, setUsbownership] = useState('자사');
    const [question, setQuestion] = useState([
        {
            index: 1,
            describes: '1. 사용할 외부 저장 매체가 CD-Rom 또는 USB 메모리 인가요?',
            checked: '',
        },
        {
            index: 2,
            describes: '2. 사용할 매체가 회사 공용 또는 고객사 매체가 인가요?',
            checked: '',
        },
        {
            index: 3,
            describes: '3  USB 메모리인 경우 개인 USB 메모리 인가요?',
            checked: '',
        },
        {
            index: 4,
            describes: '4. 저장 매체로 Down/Upload할 파일은 "장비 Soft, 장비 Log"  이외 것입니까?',
            checked: '',
        },
        {
            index: 5,
            describes:
                '5. 저장매체에 Down/Upload 절대 불가한 항목은" 도면, 테크니컬 레포트(CE용) 등" 고객에게 유출되면 안되는 대외비 파일 인것을 숙지 하셨나요?',
            checked: '',
        },
    ]);

    const handleChangeQuestion = (number: number, selecteds: any) => {
        setQuestion(
            question.map((list, i) => {
                return list.index === number ? { ...list, checked: selecteds } : list;
            })
        );
    };
    const handleSendMail = async () => {
        let returnSpaceValue = false;
        let returnValue = false;
        question.map((list, i) => {
            if (list.index === 1 || list.index === 2 || list.index === 5) {
                if (list.checked === '') {
                    returnSpaceValue = true;
                } else if (!list.checked) {
                    returnValue = true;
                }
            } else {
                if (list.checked === '') {
                    returnSpaceValue = true;
                } else if (list.checked) {
                    returnValue = true;
                }
            }
        });

        if (returnSpaceValue) {
            toast.show({
                title: '신청불가. ',
                content: '문항지를 전부 선택 해주세요.',
                duration: 6000,
            });
            return;
        }
        if (returnValue) {
            toast.show({
                title: '신청불가. 문항이 일치 하지 않아, ',
                content: '보안상 USB를 사용 할 수 없습니다. 팀장님께 문의 해주세요.',
                duration: 6000,
            });

            return;
        }

        if (equipment === '' || filename === '' || useText === '' || usbownership === '') {
            toast.show({
                title: '신청불가. ',
                content: '내용을 입력 해주세요.',
                duration: 6000,
            });
            return;
        }
        const mailsendOkay = await axios.post(`${process.env.REACT_APP_DB_HOST}/USB_app_server/usbmailsend`, {
            selecteDate: moment(startDate).format('YYYY-MM-DD'),
            question,
            id: DecryptKey(InfomationState.id),
            name: DecryptKey(InfomationState.name),
            equipment,
            filename,
            text: useText,
            ownership: usbownership,
            team: InfomationState.team,
        });
        if (mailsendOkay.data.DataSendSuccess) {
            const selecteDatess = moment(startDate).format('YYYY-MM');
            dispatch(getUSBCDThunk(selecteDatess, InfomationState));
            toast.show({
                title: '신청완료. ',
                content: '메일 발송 완료. 팀장 승인을 기다려 주세요.',
                duration: 6000,
            });
        } else {
            toast.show({
                title: '메일 전송 실패 ',
                content: '메일 발송 실패. IT팀에 문의 주세요.',
                duration: 6000,
            });
        }
    };
    return (
        <div>
            <div className="USB_ALL_box">
                <div className="USB_left_box">
                    <div>
                        {question.map((list: any, i) => {
                            return (
                                <div key={list.index}>
                                    <div>{list.describes}</div>
                                    <form>
                                        <div className="radio">
                                            <label onChange={() => handleChangeQuestion(list.index, true)}>
                                                <input type="radio" value="option1" name="Q1" />예
                                            </label>
                                        </div>
                                        <div className="radio">
                                            <label onChange={() => handleChangeQuestion(list.index, false)}>
                                                <input type="radio" value="option2" name="Q1" />
                                                아니요
                                            </label>
                                        </div>
                                    </form>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="USB_right_box">
                    <div id="form-div">
                        <h2>USB/CD 이메일 전송</h2>
                        <form className="form" id="form1" onSubmit={e => e.preventDefault()}>
                            <div className="usb_name">
                                <input
                                    value={DecryptKey(InfomationState.name)}
                                    type="text"
                                    className="validate[required,custom[onlyLetter],length[0,100]] feedback-input"
                                    placeholder="Name"
                                    id="name"
                                    readOnly
                                />
                            </div>
                            <div className="usb_name Datepickers">
                                <span className="Usb_span_box">사용일자:</span>
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
                            <div className="usb_name">
                                <input
                                    name="equipment"
                                    type="text"
                                    className="validate[required,custom[onlyLetter],length[0,100]] feedback-input"
                                    placeholder="사용장비"
                                    id="equipment"
                                    value={equipment}
                                    onChange={e => setequipment(e.target.value)}
                                />
                            </div>
                            <div className="usb_name">
                                <input
                                    name="filename"
                                    type="text"
                                    className="validate[required,custom[onlyLetter],length[0,100]] feedback-input"
                                    placeholder="사용 파일명"
                                    id="filename"
                                    value={filename}
                                    onChange={e => setfilename(e.target.value)}
                                />
                            </div>
                            <div>
                                <select name="ownership" onChange={e => setUsbownership(e.target.value)}>
                                    <option value="자사" selected>
                                        자사
                                    </option>
                                    <option value="고객">고객</option>
                                </select>
                            </div>
                            <div className="text">
                                <textarea
                                    name="text"
                                    className="validate[required,length[6,300]] feedback-input"
                                    id="comment"
                                    placeholder="사용 이유"
                                    value={useText}
                                    onChange={e => setUseText(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="submit">
                                <input type="button" value="이메일 보내기" id="button-blue" onClick={handleSendMail} />
                                <div className="ease"></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsbApply;

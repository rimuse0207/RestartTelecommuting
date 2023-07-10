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
import { BsFillPencilFill } from 'react-icons/bs';
import { GiClick } from 'react-icons/gi';
import { CgSelectR } from 'react-icons/cg';
import styled from 'styled-components';
import LoaderMainPage from '../Loader/LoaderMainPage';

export const USBCDApplyFormBoxDiv = styled.div`
    width: 90%;
    height: 40px;
    display: flex;
    margin-top: 3px;
    margin-bottom: 6px;
    .CElogs_WriteData_FORM_Text_label {
        width: 200px;
    }
    textarea {
        min-height: 100px;
        padding: 10px;
    }
    #TextareaHeight {
        height: 100px;
        line-height: 100px;
    }
    #USBCDDivBox {
        width: 80%;
        height: 100%;

        div {
            height: 100%;
        }
    }
    .react-datepicker__input-container {
        width: 100%;
        height: 100%;
    }
    .example-custom-input10,
    .example-custom-input2 {
        width: 100%;
        height: 100%;
        padding: 0;
        padding-left: 20px;
        border: 0.5px solid lightgray;
        border-radius: 2px;
        font-size: 0.8em;
        font-family: initial;
        color: black;
        background-color: white;
        text-align: start;
        :hover {
            cursor: pointer;
            background-color: #efefef;
        }
    }
    select,input {
        width: 80%;
        height: 100%;
        padding: 0;
        padding-left: 20px;
        border: 0.5px solid lightgray;
        border-radius: 2px;
        font-size: 0.8em;
        font-family: initial;
        color: black;
        option {
            color: black;
            border: none;
            :focus {
                color: black;
            }
        }
    }
`;

export const SubMitButton = styled.div`
    position: relative;
    bottom: -100px;
    text-align: right;
    width: 90%;
    button {
        border: none;
        outline: none;
        width: 30%;
        height: 40px;
        border-radius: 4px;
        font-weight: bolder;
        background-color: #30aed6;
        color: white;
        font-size: 1em;
        :hover {
            cursor: pointer;
            background-color: #efefef;
            color: #30aed6;
            transition: 0.5s ease-in-out;
        }
    }
`;

type UsbApplyProps = {
    pickerDate?: any;
};

const UsbApply = ({ pickerDate }: UsbApplyProps) => {
    const dispatch = useDispatch();
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const ExampleCustomInput = ({ value, onClick }: any) => (
        <button className="example-custom-input10" onClick={onClick}>
            {value}
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
    const [loading, setLoading] = useState(false);
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
                DataSuccess: false,
            });
            return;
        }
        if (returnValue) {
            toast.show({
                title: '신청불가. 문항이 일치 하지 않아, ',
                content: '보안상 USB를 사용 할 수 없습니다. 팀장님께 문의 해주세요.',
                duration: 6000,
                DataSuccess: false,
            });

            return;
        }

        if (equipment === '' || filename === '' || useText === '' || usbownership === '') {
            toast.show({
                title: '신청불가. ',
                content: '내용을 입력 해주세요.',
                duration: 6000,
                DataSuccess: false,
            });
            return;
        }
        try {
            setLoading(true);
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
                    DataSuccess: true,
                });
                setTimeout(() => {
                    setLoading(false);
                }, 3000);
            } else {
                toast.show({
                    title: '메일 전송 실패 ',
                    content: '메일 발송 실패. IT팀에 문의 주세요.',
                    duration: 6000,
                    DataSuccess: false,
                });
                setTimeout(() => {
                    setLoading(false);
                }, 3000);
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: '메일 전송 실패 ',
                content: '메일 발송 실패. IT팀에 문의 주세요.',
                duration: 6000,
                DataSuccess: false,
            });
            setTimeout(() => {
                setLoading(false);
            }, 3000);
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
                    <div style={{ padding: '30px' }}>
                        <h2 style={{ marginBottom: '30px' }}>USB/CD 사전 신청</h2>

                        <div>
                            <form className="form" id="form1" onSubmit={e => e.preventDefault()}>
                                <USBCDApplyFormBoxDiv>
                                    <div className="CElogs_WriteData_FORM_Text_label">이름</div>
                                    <div className="CElogs_WriteData_FORM_emoticon_div">
                                        <BsFillPencilFill></BsFillPencilFill>
                                    </div>
                                    <input
                                        className="CElogs_WriteData_FORM_InputBox"
                                        value={DecryptKey(InfomationState.name)}
                                        type="text"
                                        placeholder="이름"
                                        readOnly
                                    ></input>
                                </USBCDApplyFormBoxDiv>
                                <USBCDApplyFormBoxDiv>
                                    <div className="CElogs_WriteData_FORM_Text_label">사용 일자</div>
                                    <div className="CElogs_WriteData_FORM_emoticon_div">
                                        <GiClick></GiClick>
                                    </div>
                                    {/* <input type="text" className="CElogs_WriteData_FORM_InputBox" placeholder="사용일자"></input> */}
                                    <div id="USBCDDivBox">
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
                                </USBCDApplyFormBoxDiv>
                                <USBCDApplyFormBoxDiv>
                                    <div className="CElogs_WriteData_FORM_Text_label">사용 장비</div>
                                    <div className="CElogs_WriteData_FORM_emoticon_div">
                                        <BsFillPencilFill></BsFillPencilFill>
                                    </div>

                                    <input
                                        type="text"
                                        className="CElogs_WriteData_FORM_InputBox"
                                        placeholder="사용장비"
                                        value={equipment}
                                        onChange={e => setequipment(e.target.value)}
                                    ></input>
                                </USBCDApplyFormBoxDiv>
                                <USBCDApplyFormBoxDiv>
                                    <div className="CElogs_WriteData_FORM_Text_label">사용 파일명</div>
                                    <div className="CElogs_WriteData_FORM_emoticon_div">
                                        <BsFillPencilFill></BsFillPencilFill>
                                    </div>

                                    <input
                                        className="CElogs_WriteData_FORM_InputBox"
                                        type="text"
                                        placeholder="사용 파일명"
                                        value={filename}
                                        onChange={e => setfilename(e.target.value)}
                                    ></input>
                                </USBCDApplyFormBoxDiv>
                                <USBCDApplyFormBoxDiv>
                                    <div className="CElogs_WriteData_FORM_Text_label">사용 USB</div>
                                    <div className="CElogs_WriteData_FORM_emoticon_div">
                                        <CgSelectR></CgSelectR>
                                    </div>

                                    <select name="ownership" onChange={e => setUsbownership(e.target.value)}>
                                        <option value="자사">자사</option>
                                        <option value="고객">고객</option>
                                    </select>
                                </USBCDApplyFormBoxDiv>
                                <USBCDApplyFormBoxDiv>
                                    <div id="TextareaHeight" className="CElogs_WriteData_FORM_Text_label">
                                        사용이유
                                    </div>
                                    <div id="TextareaHeight" className="CElogs_WriteData_FORM_emoticon_div">
                                        <BsFillPencilFill></BsFillPencilFill>
                                    </div>
                                    <textarea
                                        className="CElogs_WriteData_FORM_InputBox"
                                        placeholder="사용이유"
                                        value={useText}
                                        onChange={e => setUseText(e.target.value)}
                                    ></textarea>
                                </USBCDApplyFormBoxDiv>
                                <SubMitButton>
                                    <button type="submit" value="이메일 보내기" onClick={handleSendMail}>
                                        메일 전송
                                    </button>
                                </SubMitButton>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <LoaderMainPage loading={loading}></LoaderMainPage>
        </div>
    );
};

export default UsbApply;

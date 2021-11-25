import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../models/index';
import './ApplyMealPage.css';
import { DecryptKey } from '../../config';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import axios from 'axios';
import moment from 'moment';
import { getFoodDataThunk } from '../../models/Thunk_models/FoodData';
import { toast } from '../ToastMessage/ToastManager';
import PrinterApplyMealPage from './PrinterApplyMealPage';

registerLocale('ko', ko);
type ApplyMealPageProps = {
    pickerDate?: string | null | undefined;
};
const ApplyMealPage = ({ pickerDate }: ApplyMealPageProps) => {
    const divisionRef = useRef<any>(null);
    const [printerClicked, setPrinterClicked] = useState(false);
    const dispatch = useDispatch();
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const [startDate, setStartDate] = useState<any>(pickerDate ? pickerDate : new Date());
    const [selectDate, setSelectDate] = useState(moment().format('YYYY-MM'));
    // 석식 및 중식 체크
    const [Whatmeal, setWhatmeal] = useState('중식');
    const [MealPrice, setMealPrice] = useState<any>(0);
    const [MealPlace, setMealPlace] = useState('');
    const [MealPosition, setMealPosition] = useState('');
    const [Caution, setCaution] = useState(sessionStorage.getItem('FoodCaution') === 'accept' ? true : false);
    const [applyedData, setApplyedData] = useState([]);
    const [divisionDate, setDivisionDate] = useState<any>([]);
    const [OTDatas, setOTDatas] = useState([]);
    useEffect(() => {
        setDivisionDate([]);
        data_get();
    }, [selectDate]);
    useEffect(() => {
        setStartDate(pickerDate ? startDate : new Date());
    }, [pickerDate]);

    const data_get = async () => {
        try {
            // const dataget = await axios.post(`${process.env.REACT_APP_DB_HOST}/Meal_app_servers/Data_get_applyMeal`, {
            //     id: DecryptKey(InfomationState.id),
            //     team: InfomationState.team,
            //     name: DecryptKey(InfomationState.name),
            //     selectDate,
            // });
            const dataget = await axios.get(`${process.env.REACT_APP_DB_HOST}/Meal_app_servers/Data_get_applyMeal`, {
                params: {
                    selectDate,
                },
                headers: {
                    Authorization: sessionStorage.getItem('DHKS_TOKEN'),
                },
            });
            if (dataget.data.dataSuccess) {
                let taaa = [];
                for (var i = 0; i < dataget.data.data.length; i++) {
                    if (dataget.data.data[i].division === '석식') {
                        taaa.push(dataget.data.data[i].dates);
                    }
                }
                setDivisionDate(taaa);
                setApplyedData(dataget.data.data);
            } else {
                toast.show({
                    title: 'ERROR! ',
                    content: 'ERROR! 권한이 없습니다.',
                    duration: 6000,
                    DataSuccess: false,
                });
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: 'ERROR! ',
                content: 'ERROR! ErrorCode: 식대 서버 정산 프론트 1',
                duration: 6000,
                DataSuccess: false,
            });
        }
    };
    useEffect(() => {
        if (divisionDate.length === 0) return;
        OTdataGet();
    }, [divisionDate]);
    const OTdataGet = async () => {
        try {
            // const dataget = await axios.post(`${process.env.REACT_APP_API_URL}/Meal_app_servers/Data_get_OTMealCheck`, {
            //     divisionDate,
            //     id: DecryptKey(InfomationState.id),
            //     team: InfomationState.team,
            //     name: DecryptKey(InfomationState.name),
            // });
            const dataget = await axios.get(`${process.env.REACT_APP_API_URL}/Meal_app_servers/Data_get_OTMealCheck`, {
                params: {
                    selectDate,
                    divisionDate,
                },
                headers: {
                    Authorization: sessionStorage.getItem('DHKS_TOKEN'),
                },
            });
            if (dataget.data.dataSuccess) {
                setOTDatas(dataget.data.OTdatas);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const ExampleCustomInput = ({ value, onClick }: any) => (
        <button className="example-custom-input2" onClick={onClick}>
            {' '}
            {value}{' '}
        </button>
    );
    const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleClick_select_date_pre = () => {
        const preDate = moment(selectDate).subtract(1, 'months').format('YYYY-MM');
        setSelectDate(preDate);
    };

    const handleClick_select_date_next = () => {
        const nextDate = moment(selectDate).add(1, 'months').format('YYYY-MM');
        setSelectDate(nextDate);
    };

    const Meal_sendData = async () => {
        try {
            const dataSend = await axios.post(`${process.env.REACT_APP_API_URL}/Meal_app_servers/Data_send`, {
                pick_dates: moment(startDate).format('YYYY-MM-DD'),
                Whatmeal,
                MealPrice,
                MealPlace,
                MealPosition,
                id: DecryptKey(InfomationState.id),
                team: InfomationState.team,
                name: DecryptKey(InfomationState.name),
            });
            if (dataSend.data.dataSuccess) {
                data_get();
                dispatch(
                    getFoodDataThunk(pickerDate ? moment(pickerDate).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'), InfomationState)
                );

                toast.show({
                    title: '데이터 저장 성공 ',
                    content: '데이터 저장 완료.',
                    duration: 6000,
                    DataSuccess: true,
                });
            } else {
                toast.show({
                    title: '데이터 저장　실패 ',
                    content: '에러 발생 ErrorCode: 식대 정산 서버 10',
                    duration: 6000,
                    DataSuccess: false,
                });
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: '에러발생. ',
                content: '에러 발생 ErrorCode: 식대 정산 프론트 2',
                duration: 6000,
                DataSuccess: false,
            });
        }
    };
    const handleDelete = async (datas: {
        indexs: string;
        dates: string;
        division: string;
        spending: number;
        calculate: number;
        place: string;
        location: string;
    }) => {
        try {
            const deleteData = await axios.post(`${process.env.REACT_APP_API_URL}/Meal_app_servers/Data_Delete_Meal`, {
                datas,
            });
            if (deleteData.data.dataSuccess) {
                data_get();
                dispatch(
                    getFoodDataThunk(pickerDate ? moment(pickerDate).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'), InfomationState)
                );
                toast.show({
                    title: '데이터 삭제 성공 ',
                    content: `${datas.dates}일자에 신청한 식대정산 데이터가 삭제되었습니다.`,
                    duration: 6000,
                    DataSuccess: true,
                });
            } else {
                toast.show({
                    title: '데이터 삭제　실패 ',
                    content: 'Error: ErrorCode: 식대 정산 서버 14',
                    duration: 6000,
                    DataSuccess: false,
                });
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: 'Error! ',
                content: 'Error: ErrorCode: 식대 서버 정산 프론트 5',
                duration: 6000,
                DataSuccess: false,
            });
        }
    };

    return (
        <div className="MealPage_first_box_div" style={{ width: '95%', margin: '0 auto' }}>
            {printerClicked ? (
                <></>
            ) : (
                <div>
                    <div className="Float_parent_after">
                        <div className="Float_left_div">
                            {Caution ? (
                                <div id="form-div">
                                    <form className="form" id="form1" onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleChange(e)}>
                                        <div className="halfdiv">
                                            <div className="name">
                                                <input
                                                    name="team"
                                                    value={InfomationState.team}
                                                    type="text"
                                                    className="validate[required,custom[onlyLetter],length[0,100]] feedback-input"
                                                    placeholder="team"
                                                    id="team"
                                                    readOnly
                                                />
                                            </div>
                                            <div className="name">
                                                <input
                                                    name="name"
                                                    value={DecryptKey(InfomationState.name)}
                                                    type="text"
                                                    className="validate[required,custom[onlyLetter],length[0,100]] feedback-input"
                                                    placeholder="Name"
                                                    id="name"
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="halfdiv">
                                            <div className="name">
                                                {/* <input
                                    name="workdate"
                                    type="text"
                                    className="validate[required,custom[onlyLetter],length[0,100]] feedback-input"
                                    placeholder="일자 (Click here)"
                                    id="datepicker"
                                    autoComplete="off"
                                /> */}
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
                                            <div className="name">
                                                <select name="division" value={Whatmeal} onChange={e => setWhatmeal(e.target.value)}>
                                                    <option value="중식">중식</option>
                                                    <option value="석식">석식</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="name2">
                                            <input
                                                name="spending"
                                                type="number"
                                                step="1000"
                                                min={0}
                                                value={MealPrice}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    setMealPrice(e.target.value);
                                                }}
                                                className="validate[required,custom[onlyLetter],length[0,100]] feedback-input"
                                                placeholder="지출 금액 (숫자만 입력)"
                                                id="spending"
                                            />
                                        </div>
                                        <div className="name2">
                                            <input
                                                name="place"
                                                type="text"
                                                value={MealPlace}
                                                onChange={e => setMealPlace(e.target.value)}
                                                className="validate[required,custom[onlyLetter],length[0,100]] feedback-input"
                                                placeholder="방문처 ex) SK하이닉스, 삼성전자"
                                                id="place"
                                            />
                                        </div>
                                        <div className="name2">
                                            <input
                                                name="location"
                                                type="text"
                                                value={MealPosition}
                                                onChange={e => setMealPosition(e.target.value)}
                                                className="validate[required,custom[onlyLetter],length[0,100]] feedback-input"
                                                placeholder="지역 ex) 이천, 온양"
                                                id="location"
                                            />
                                        </div>

                                        <div className="submit">
                                            <input type="button" value="등록하기" id="button-blue" onClick={Meal_sendData} />
                                            {/* <div className="textEx" style={{ color: 'rgba(93, 93, 93, 0.4)' }}>
                                참고..
                            </div>
                            */}
                                        </div>
                                    </form>
                                </div>
                            ) : (
                                <div>
                                    <div className="Caution">
                                        <div>
                                            <h2>참고 사항.</h2>
                                            <div className="textEx">*출장 일당 지급일은 식대 지원대상에서 제외</div>
                                            <div className="textEx">*식대지원 한도: 7,000원/1식</div>
                                            <div className="textEx">*익월 3영업일 까지 등록 가능</div>
                                            <div className="textEx">*중식지원 제외 지역 (성남시, 아산시 둔포면)</div>
                                            <div className="textEx">*식대 정산 매월 하나의 전표로 정산 가능합니다.</div>
                                        </div>
                                        <div style={{ width: '100%', margin: '0 auto' }}>
                                            <button
                                                className="Caution_button"
                                                onClick={() => {
                                                    sessionStorage.setItem('FoodCaution', 'accept');
                                                    setCaution(true);
                                                }}
                                            >
                                                확인 및 작성하기
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="Float_right_div">
                            <div className="SelectMonth">
                                <div>
                                    <div className="space_pre" onClick={handleClick_select_date_pre}>
                                        {' '}
                                        {' <<< '}{' '}
                                    </div>
                                    <h2 style={{ display: 'inline' }}>{selectDate}</h2>
                                    <div className="space_pre" onClick={handleClick_select_date_next}>
                                        {' '}
                                        {' >>> '}{' '}
                                    </div>
                                </div>
                            </div>
                            <div className="MealSettlement_Table_container_div_box">
                                <table style={{ fontSize: 'small' }}>
                                    <thead style={{ fontSize: 'small' }}>
                                        <tr>
                                            <th>부서</th>
                                            <th>{InfomationState.team}</th>
                                            <th colSpan={2}></th>
                                            <th>성명</th>
                                            <th colSpan={3}>{DecryptKey(InfomationState.name)}</th>
                                        </tr>
                                        <tr>
                                            <th>일자</th>
                                            <th>구분</th>
                                            <th>
                                                지출 <br />
                                                금액
                                            </th>
                                            <th>
                                                정산 <br />
                                                금액
                                            </th>
                                            <th>방문처</th>
                                            <th>지역</th>
                                            <th>비고</th>
                                            <th>삭제</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {applyedData.map(
                                            (
                                                list: {
                                                    indexs: string;
                                                    dates: string;
                                                    division: string;
                                                    spending: number;
                                                    calculate: number;
                                                    place: string;
                                                    location: string;
                                                },
                                                i
                                            ) => {
                                                return (
                                                    <tr key={list.indexs} ref={divisionRef} className="DISCO_PC_mealSet">
                                                        <td>{list.dates}</td>
                                                        <td>{list.division}</td>
                                                        <td>{list.spending.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                                                        <td>{list.calculate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                                                        <td>{list.place}</td>
                                                        <td>{list.location}</td>
                                                        <td className="DISCO_PC_etc_width">
                                                            {OTDatas.map((item: { dates: string; OTTimes: number }, j) => {
                                                                return list.division === '석식' ? (
                                                                    item.dates === list.dates ? (
                                                                        <div style={item.OTTimes === 0 ? { background: 'red' } : {}}>
                                                                            {item.OTTimes}시간
                                                                        </div>
                                                                    ) : (
                                                                        <div></div>
                                                                    )
                                                                ) : (
                                                                    <div></div>
                                                                );
                                                            })}
                                                        </td>
                                                        <td
                                                            onClick={() => handleDelete(list)}
                                                            className="MealSet_ApplyMealData_delete"
                                                            style={{ fontSize: 'large', fontWeight: 'bold' }}
                                                        >
                                                            Θ
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )}

                                        <tr className="tailtr" style={{ fontSize: 'small' }}>
                                            <td colSpan={3}>합계</td>
                                            <td>
                                                {applyedData
                                                    .map((list: { calculate: number }) => list.calculate)
                                                    .reduce((prev, curr) => prev + curr, 0)
                                                    .toString()
                                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                원
                                            </td>
                                            <td colSpan={4}></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {pickerDate ? (
                        <div></div>
                    ) : (
                        <button className="Printer_Button_overOT" onClick={() => setPrinterClicked(true)}>
                            인쇄하기
                        </button>
                    )}

                    <div style={{ height: '30px' }}></div>
                </div>
            )}

            <div>
                {printerClicked ? (
                    <PrinterApplyMealPage
                        printerClicked={printerClicked}
                        setPrinterClicked={setPrinterClicked}
                        applyedData={applyedData}
                        selectDate={selectDate}
                        OTDatas={OTDatas}
                    ></PrinterApplyMealPage>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default ApplyMealPage;

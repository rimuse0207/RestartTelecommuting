import React, { useState, useEffect } from 'react';
import moment from 'moment';
import CreateModal from '../Modal/CreateModal';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../models/index';
import { getFoodDataThunk, FoodDataShowCheckedTrue, FoodDataShowCheckedFalse } from '../../models/Thunk_models/FoodData';
import { getUSBCDThunk, USBCDDataShowCheckedFalse, USBCDDataShowCheckedTrue } from '../../models/Thunk_models/USBCDData';
import {
    getTelecommutingThunk,
    TelecommutingDataShowCheckedTrue,
    TelecommutingDataShowCheckedFalse,
} from '../../models/Thunk_models/TelecommutingData';
import { getAFTEROTdataThunk, AfterOTDataShowCheckedFalse, AfterOTShowCheckedTrue } from '../../models/Thunk_models/AfterOTData';
import { getBEFOREOTdataThunk, BeforeOTDataShowCheckedFalse, BeforeOTShowCheckedTrue } from '../../models/Thunk_models/BeforeOTData';
import { getPartsdataThunk, PartsDataShowCheckedFalse, PartsDataShowCheckedTrue } from '../../models/Thunk_models/PartsData';
import SelectClickModalMainPage from '../SelectClickModal/SelectClickModalMainPage';
const Telecommuting = () => {
    const dispatch = useDispatch();
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const FoodData = useSelector((state: RootState) => state.FoodDataGetting.FoodDatas);
    const USBCDData = useSelector((state: RootState) => state.USBCDDataGetting.USBCDDatas);
    const TelecommutingData = useSelector((state: RootState) => state.TelecommutingDataGetting.TelecommutingDatas);
    const AfterOTData = useSelector((state: RootState) => state.AfterOTData.AfterOTDatas);
    const BeforeOTData = useSelector((state: RootState) => state.BeforeOTData.BeforeOTDatas);
    const PartsData = useSelector((state: RootState) => state.PartsData.PartsDatas);

    const [getMoment, setMoment] = useState(moment());
    const [onClicked, setOnClickedSet] = useState(false);
    const [onClickedDataIn, setOnClickedDataIn] = useState(false);
    const [clicksData, setClicksData] = useState<any | null>(null);
    const [telecommutingApply_check, settelecommutingApply_check] = useState(true);
    const [AfterOtApply_check, setAfterOtApply_check] = useState(true);
    const [BeforeOtApply_check, setBeforeOtApply_check] = useState(true);
    const [foodApply_check, setfoodApply_check] = useState(true);
    const [usbApply_check, setusbApply_check] = useState(true);
    const [Parts_check, setParts_check] = useState(true);
    const [clicksTitle, setClicksTitle] = useState('');

    useEffect(() => {
        if (foodApply_check) dispatch(getFoodDataThunk(getMoment, InfomationState));
        if (usbApply_check) dispatch(getUSBCDThunk(getMoment, InfomationState));
        if (telecommutingApply_check) dispatch(getTelecommutingThunk(getMoment, InfomationState));
        if (AfterOtApply_check) dispatch(getAFTEROTdataThunk(getMoment, InfomationState));
        if (BeforeOtApply_check) dispatch(getBEFOREOTdataThunk(getMoment, InfomationState));
        if (Parts_check) dispatch(getPartsdataThunk(getMoment, InfomationState));
    }, [getMoment]);

    const today = getMoment;
    const firstWeek = today.clone().startOf('month').week();
    const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();
    const ModalOpensClick = (dataChecked: string) => {
        setClicksData(new Date(dataChecked));
        setOnClickedSet(!onClicked);
    };

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

                            if (days.format('MM') !== today.format('MM')) {
                                return (
                                    <td
                                        key={index}
                                        className="Telecommuting_Table_nextMonth"
                                        onClick={() => ModalOpensClick(days.format('YYYY-MM-DD'))}
                                    >
                                        <div className="Telecommuting_Table_dayNumber">
                                            <div style={{ paddingLeft: '5px' }}>{days.format('D')}</div>
                                        </div>
                                    </td>
                                );
                            } else {
                                return (
                                    <td
                                        key={index}
                                        onClick={(e: any) => {
                                            if (e.target.className === 'Telecommuting_Table_dayNumber') {
                                                ModalOpensClick(days.format('YYYY-MM-DD'));
                                            }
                                        }}
                                        className={
                                            moment().format('YYYY-MM-DD') === days.format('YYYY-MM-DD')
                                                ? 'Telecommuting_table_today'
                                                : 'Telecommuting_Table_nowMonth'
                                        }
                                    >
                                        <div className="Telecommuting_Table_dayNumber">
                                            <div style={{ paddingLeft: '5px' }}>{days.format('D')}</div>
                                            {TelecommutingData.dataChecked ? (
                                                TelecommutingData.data.map(
                                                    (list: { day: string; approve: number; num: number }, i: number) => {
                                                        return moment(list.day).format('YYYY-MM-DD') === days.format('YYYY-MM-DD') ? (
                                                            <div
                                                                onClick={() => {
                                                                    setClicksData(list);
                                                                    setClicksTitle('Person_Telecommuting');
                                                                    setOnClickedDataIn(true);
                                                                }}
                                                                key={list.num}
                                                                className={`Telecommuting_Table_Data_Insert ${
                                                                    list.approve === 0 ? 'blink' : ''
                                                                }`}
                                                            >{`( 재택 ) - 승인: ${list.approve === 0 ? 'X' : 'O'}`}</div>
                                                        ) : (
                                                            <div></div>
                                                        );
                                                    }
                                                )
                                            ) : (
                                                <div></div>
                                            )}
                                            {BeforeOTData.dataChecked
                                                ? BeforeOTData.data.map(
                                                      (list: {
                                                          date_mon: string;
                                                          mon_time: number;
                                                          leadercheck: number;
                                                          number: number;
                                                      }) => {
                                                          return list.date_mon === days.format('YYYY-MM-DD') ? (
                                                              list.mon_time > 0 ? (
                                                                  <div
                                                                      key={list.number}
                                                                      onClick={() => {
                                                                          setClicksData(list);
                                                                          setClicksTitle('BeforeOT');
                                                                          setOnClickedDataIn(true);
                                                                      }}
                                                                      className={`Telecommuting_Table_Data_Insert ${
                                                                          list.leadercheck === 0 ? 'blink' : ''
                                                                      }`}
                                                                      style={{ backgroundColor: '#9061a8' }}
                                                                  >
                                                                      ( 사전 OT ) - {list.mon_time}시간 승인:{' '}
                                                                      {list.leadercheck === 0 ? 'X' : 'O'}
                                                                  </div>
                                                              ) : (
                                                                  <div></div>
                                                              )
                                                          ) : (
                                                              <div></div>
                                                          );
                                                      }
                                                  )
                                                : ''}
                                            {BeforeOTData.dataChecked
                                                ? BeforeOTData.data.map(
                                                      (list: {
                                                          date_tue: string;
                                                          tue_time: number;
                                                          leadercheck: number;
                                                          number: number;
                                                      }) => {
                                                          return list.date_tue === days.format('YYYY-MM-DD') ? (
                                                              list.tue_time > 0 ? (
                                                                  <div
                                                                      key={list.number}
                                                                      onClick={() => {
                                                                          setClicksData(list);
                                                                          setClicksTitle('BeforeOT');
                                                                          setOnClickedDataIn(true);
                                                                      }}
                                                                      className={`Telecommuting_Table_Data_Insert ${
                                                                          list.leadercheck === 0 ? 'blink' : ''
                                                                      }`}
                                                                      style={{ backgroundColor: '#9061a8' }}
                                                                  >
                                                                      ( 사전 OT ) - {list.tue_time}시간 승인:{' '}
                                                                      {list.leadercheck === 0 ? 'X' : 'O'}
                                                                  </div>
                                                              ) : (
                                                                  <div></div>
                                                              )
                                                          ) : (
                                                              <div></div>
                                                          );
                                                      }
                                                  )
                                                : ''}
                                            {BeforeOTData.dataChecked
                                                ? BeforeOTData.data.map(
                                                      (list: {
                                                          date_wed: string;
                                                          wed_time: number;
                                                          leadercheck: number;
                                                          number: number;
                                                      }) => {
                                                          return list.date_wed === days.format('YYYY-MM-DD') ? (
                                                              list.wed_time > 0 ? (
                                                                  <div
                                                                      key={list.number}
                                                                      onClick={() => {
                                                                          setClicksData(list);
                                                                          setClicksTitle('BeforeOT');
                                                                          setOnClickedDataIn(true);
                                                                      }}
                                                                      className={`Telecommuting_Table_Data_Insert ${
                                                                          list.leadercheck === 0 ? 'blink' : ''
                                                                      }`}
                                                                      style={{ backgroundColor: '#9061a8' }}
                                                                  >
                                                                      ( 사전 OT ) - {list.wed_time}시간 승인:{' '}
                                                                      {list.leadercheck === 0 ? 'X' : 'O'}
                                                                  </div>
                                                              ) : (
                                                                  <div></div>
                                                              )
                                                          ) : (
                                                              <div></div>
                                                          );
                                                      }
                                                  )
                                                : ''}

                                            {BeforeOTData.dataChecked
                                                ? BeforeOTData.data.map(
                                                      (list: {
                                                          date_thu: string;
                                                          thu_time: number;
                                                          leadercheck: number;
                                                          number: number;
                                                      }) => {
                                                          return list.date_thu === days.format('YYYY-MM-DD') ? (
                                                              list.thu_time > 0 ? (
                                                                  <div
                                                                      key={list.number}
                                                                      onClick={() => {
                                                                          setClicksData(list);
                                                                          setClicksTitle('BeforeOT');
                                                                          setOnClickedDataIn(true);
                                                                      }}
                                                                      className={`Telecommuting_Table_Data_Insert ${
                                                                          list.leadercheck === 0 ? 'blink' : ''
                                                                      }`}
                                                                      style={{ backgroundColor: '#9061a8' }}
                                                                  >
                                                                      ( 사전 OT ) - {list.thu_time}시간 승인:{' '}
                                                                      {list.leadercheck === 0 ? 'X' : 'O'}
                                                                  </div>
                                                              ) : (
                                                                  <div></div>
                                                              )
                                                          ) : (
                                                              <div></div>
                                                          );
                                                      }
                                                  )
                                                : ''}
                                            {BeforeOTData.dataChecked
                                                ? BeforeOTData.data.map(
                                                      (list: {
                                                          date_fri: string;
                                                          fri_time: number;
                                                          leadercheck: number;
                                                          number: number;
                                                      }) => {
                                                          return list.date_fri === days.format('YYYY-MM-DD') ? (
                                                              list.fri_time > 0 ? (
                                                                  <div
                                                                      key={list.number}
                                                                      onClick={() => {
                                                                          setClicksData(list);
                                                                          setClicksTitle('BeforeOT');
                                                                          setOnClickedDataIn(true);
                                                                      }}
                                                                      className={`Telecommuting_Table_Data_Insert ${
                                                                          list.leadercheck === 0 ? 'blink' : ''
                                                                      }`}
                                                                      style={{ backgroundColor: '#9061a8' }}
                                                                  >
                                                                      ( 사전 OT ) - {list.fri_time}시간 승인:{' '}
                                                                      {list.leadercheck === 0 ? 'X' : 'O'}
                                                                  </div>
                                                              ) : (
                                                                  <div></div>
                                                              )
                                                          ) : (
                                                              <div></div>
                                                          );
                                                      }
                                                  )
                                                : ''}
                                            {BeforeOTData.dataChecked
                                                ? BeforeOTData.data.map(
                                                      (list: {
                                                          date_sat: string;
                                                          sat_time: number;
                                                          leadercheck: number;
                                                          number: number;
                                                      }) => {
                                                          return list.date_sat === days.format('YYYY-MM-DD') ? (
                                                              list.sat_time > 0 ? (
                                                                  <div
                                                                      key={list.number}
                                                                      onClick={() => {
                                                                          setClicksData(list);
                                                                          setClicksTitle('BeforeOT');
                                                                          setOnClickedDataIn(true);
                                                                      }}
                                                                      className={`Telecommuting_Table_Data_Insert ${
                                                                          list.leadercheck === 0 ? 'blink' : ''
                                                                      }`}
                                                                      style={{ backgroundColor: '#9061a8' }}
                                                                  >
                                                                      ( 사전 OT ) - {list.sat_time}시간 승인:{' '}
                                                                      {list.leadercheck === 0 ? 'X' : 'O'}
                                                                  </div>
                                                              ) : (
                                                                  <div></div>
                                                              )
                                                          ) : (
                                                              <div></div>
                                                          );
                                                      }
                                                  )
                                                : ''}
                                            {BeforeOTData.dataChecked
                                                ? BeforeOTData.data.map(
                                                      (list: {
                                                          date_sun: string;
                                                          sun_time: number;
                                                          leadercheck: number;
                                                          number: number;
                                                      }) => {
                                                          return list.date_sun === days.format('YYYY-MM-DD') ? (
                                                              list.sun_time > 0 ? (
                                                                  <div
                                                                      key={list.number}
                                                                      onClick={() => {
                                                                          setClicksData(list);
                                                                          setClicksTitle('BeforeOT');
                                                                          setOnClickedDataIn(true);
                                                                      }}
                                                                      className={`Telecommuting_Table_Data_Insert ${
                                                                          list.leadercheck === 0 ? 'blink' : ''
                                                                      }`}
                                                                      style={{ backgroundColor: '#9061a8' }}
                                                                  >
                                                                      ( 사전 OT ) - {list.sun_time}시간 승인:{' '}
                                                                      {list.leadercheck === 0 ? 'X' : 'O'}
                                                                  </div>
                                                              ) : (
                                                                  <div></div>
                                                              )
                                                          ) : (
                                                              <div></div>
                                                          );
                                                      }
                                                  )
                                                : ''}

                                            {AfterOTData.dataChecked
                                                ? AfterOTData.data.map(
                                                      (list: {
                                                          date_mon: string;
                                                          mon_time: number;
                                                          leadercheck: number;
                                                          number: number;
                                                      }) => {
                                                          return list.date_mon === days.format('YYYY-MM-DD') ? (
                                                              list.mon_time > 0 ? (
                                                                  <div
                                                                      key={list.number}
                                                                      className={`Telecommuting_Table_Data_Insert ${
                                                                          list.leadercheck === 0 ? 'blink' : ''
                                                                      }`}
                                                                      onClick={() => {
                                                                          setClicksData(list);
                                                                          setClicksTitle('AfterOT');
                                                                          setOnClickedDataIn(true);
                                                                      }}
                                                                      style={{ backgroundColor: '#7a2d2d' }}
                                                                  >
                                                                      ( 사후 OT ) - {list.mon_time}시간 승인:{' '}
                                                                      {list.leadercheck === 0 ? 'X' : 'O'}
                                                                  </div>
                                                              ) : (
                                                                  <div></div>
                                                              )
                                                          ) : (
                                                              <div></div>
                                                          );
                                                      }
                                                  )
                                                : ''}
                                            {AfterOTData.dataChecked
                                                ? AfterOTData.data.map(
                                                      (list: {
                                                          date_tue: string;
                                                          tue_time: number;
                                                          leadercheck: number;
                                                          number: number;
                                                      }) => {
                                                          return list.date_tue === days.format('YYYY-MM-DD') ? (
                                                              list.tue_time > 0 ? (
                                                                  <div
                                                                      key={list.number}
                                                                      onClick={() => {
                                                                          setClicksData(list);
                                                                          setClicksTitle('AfterOT');
                                                                          setOnClickedDataIn(true);
                                                                      }}
                                                                      className={`Telecommuting_Table_Data_Insert ${
                                                                          list.leadercheck === 0 ? 'blink' : ''
                                                                      }`}
                                                                      style={{ backgroundColor: '#7a2d2d' }}
                                                                  >
                                                                      ( 사후 OT ) - {list.tue_time}시간 승인:{' '}
                                                                      {list.leadercheck === 0 ? 'X' : 'O'}
                                                                  </div>
                                                              ) : (
                                                                  <div></div>
                                                              )
                                                          ) : (
                                                              <div></div>
                                                          );
                                                      }
                                                  )
                                                : ''}
                                            {AfterOTData.dataChecked
                                                ? AfterOTData.data.map(
                                                      (list: {
                                                          date_wed: string;
                                                          wed_time: number;
                                                          leadercheck: number;
                                                          number: number;
                                                      }) => {
                                                          return list.date_wed === days.format('YYYY-MM-DD') ? (
                                                              list.wed_time > 0 ? (
                                                                  <div
                                                                      key={list.number}
                                                                      onClick={() => {
                                                                          setClicksData(list);
                                                                          setClicksTitle('AfterOT');
                                                                          setOnClickedDataIn(true);
                                                                      }}
                                                                      className={`Telecommuting_Table_Data_Insert ${
                                                                          list.leadercheck === 0 ? 'blink' : ''
                                                                      }`}
                                                                      style={{ backgroundColor: '#7a2d2d' }}
                                                                  >
                                                                      ( 사후 OT ) - {list.wed_time}시간 승인:{' '}
                                                                      {list.leadercheck === 0 ? 'X' : 'O'}
                                                                  </div>
                                                              ) : (
                                                                  <div></div>
                                                              )
                                                          ) : (
                                                              <div></div>
                                                          );
                                                      }
                                                  )
                                                : ''}

                                            {AfterOTData.dataChecked
                                                ? AfterOTData.data.map(
                                                      (list: {
                                                          date_thu: string;
                                                          thu_time: number;
                                                          leadercheck: number;
                                                          number: number;
                                                      }) => {
                                                          return list.date_thu === days.format('YYYY-MM-DD') ? (
                                                              list.thu_time > 0 ? (
                                                                  <div
                                                                      key={list.number}
                                                                      onClick={() => {
                                                                          setClicksData(list);
                                                                          setClicksTitle('AfterOT');
                                                                          setOnClickedDataIn(true);
                                                                      }}
                                                                      className={`Telecommuting_Table_Data_Insert ${
                                                                          list.leadercheck === 0 ? 'blink' : ''
                                                                      }`}
                                                                      style={{ backgroundColor: '#7a2d2d' }}
                                                                  >
                                                                      ( 사후 OT ) - {list.thu_time}시간 승인:{' '}
                                                                      {list.leadercheck === 0 ? 'X' : 'O'}
                                                                  </div>
                                                              ) : (
                                                                  <div></div>
                                                              )
                                                          ) : (
                                                              <div></div>
                                                          );
                                                      }
                                                  )
                                                : ''}
                                            {AfterOTData.dataChecked
                                                ? AfterOTData.data.map(
                                                      (list: {
                                                          date_fri: string;
                                                          fri_time: number;
                                                          leadercheck: number;
                                                          number: number;
                                                      }) => {
                                                          return list.date_fri === days.format('YYYY-MM-DD') ? (
                                                              list.fri_time > 0 ? (
                                                                  <div
                                                                      key={list.number}
                                                                      onClick={() => {
                                                                          setClicksData(list);
                                                                          setClicksTitle('AfterOT');
                                                                          setOnClickedDataIn(true);
                                                                      }}
                                                                      className={`Telecommuting_Table_Data_Insert ${
                                                                          list.leadercheck === 0 ? 'blink' : ''
                                                                      }`}
                                                                      style={{ backgroundColor: '#7a2d2d' }}
                                                                  >
                                                                      ( 사후 OT ) - {list.fri_time}시간 승인:{' '}
                                                                      {list.leadercheck === 0 ? 'X' : 'O'}
                                                                  </div>
                                                              ) : (
                                                                  <div></div>
                                                              )
                                                          ) : (
                                                              <div></div>
                                                          );
                                                      }
                                                  )
                                                : ''}
                                            {AfterOTData.dataChecked
                                                ? AfterOTData.data.map(
                                                      (list: {
                                                          date_sat: string;
                                                          sat_time: number;
                                                          leadercheck: number;
                                                          number: number;
                                                      }) => {
                                                          return list.date_sat === days.format('YYYY-MM-DD') ? (
                                                              list.sat_time > 0 ? (
                                                                  <div
                                                                      key={list.number}
                                                                      onClick={() => {
                                                                          setClicksData(list);
                                                                          setClicksTitle('AfterOT');
                                                                          setOnClickedDataIn(true);
                                                                      }}
                                                                      className={`Telecommuting_Table_Data_Insert ${
                                                                          list.leadercheck === 0 ? 'blink' : ''
                                                                      }`}
                                                                      style={{ backgroundColor: '#7a2d2d' }}
                                                                  >
                                                                      ( 사후 OT ) - {list.sat_time}시간 승인:{' '}
                                                                      {list.leadercheck === 0 ? 'X' : 'O'}
                                                                  </div>
                                                              ) : (
                                                                  <div></div>
                                                              )
                                                          ) : (
                                                              <div></div>
                                                          );
                                                      }
                                                  )
                                                : ''}
                                            {AfterOTData.dataChecked
                                                ? AfterOTData.data.map(
                                                      (list: {
                                                          date_sun: string;
                                                          sun_time: number;
                                                          leadercheck: number;
                                                          number: number;
                                                      }) => {
                                                          return list.date_sun === days.format('YYYY-MM-DD') ? (
                                                              list.sun_time > 0 ? (
                                                                  <div
                                                                      key={list.number}
                                                                      onClick={() => {
                                                                          setClicksData(list);
                                                                          setClicksTitle('AfterOT');
                                                                          setOnClickedDataIn(true);
                                                                      }}
                                                                      className={`Telecommuting_Table_Data_Insert ${
                                                                          list.leadercheck === 0 ? 'blink' : ''
                                                                      }`}
                                                                      style={{ backgroundColor: '#7a2d2d' }}
                                                                  >
                                                                      ( 사후 OT ) - {list.sun_time}시간 승인:{' '}
                                                                      {list.leadercheck === 0 ? 'X' : 'O'}
                                                                  </div>
                                                              ) : (
                                                                  <div></div>
                                                              )
                                                          ) : (
                                                              <div></div>
                                                          );
                                                      }
                                                  )
                                                : ''}

                                            {FoodData.dataChecked ? (
                                                FoodData.data.map((list: { dates: string; spending: number; indexs: number }) => {
                                                    return list.dates === days.format('YYYY-MM-DD') ? (
                                                        <div
                                                            onClick={() => {
                                                                setClicksData(list);
                                                                setClicksTitle('Food');
                                                                setOnClickedDataIn(true);
                                                            }}
                                                            key={list.indexs}
                                                            className="Telecommuting_Table_Data_Insert"
                                                            style={{ backgroundColor: '#5a267c' }}
                                                        >{`( 식대 ) - ${list.spending
                                                            .toString()
                                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`}</div>
                                                    ) : (
                                                        <div></div>
                                                    );
                                                })
                                            ) : (
                                                <div></div>
                                            )}

                                            {USBCDData.dataChecked ? (
                                                USBCDData.data.map(
                                                    (list: { workdate: string; leadercheck: number; number: number }, i: number) => {
                                                        return list.workdate === days.format('YYYY-MM-DD') ? (
                                                            <div
                                                                key={list.number}
                                                                className={`Telecommuting_Table_Data_Insert ${
                                                                    list.leadercheck === 0 ? 'blink' : ''
                                                                }`}
                                                                onClick={() => {
                                                                    setClicksData(list);
                                                                    setClicksTitle('Person_USB/CD');
                                                                    setOnClickedDataIn(true);
                                                                }}
                                                                style={{ backgroundColor: '#773b02' }}
                                                            >{`( USB ) - 팀장승인: ${list.leadercheck === 0 ? 'X' : 'O'}`}</div>
                                                        ) : (
                                                            <div></div>
                                                        );
                                                    }
                                                )
                                            ) : (
                                                <div></div>
                                            )}
                                            {Parts_check ? (
                                                PartsData.data.map(
                                                    (
                                                        list: {
                                                            check_date: string;
                                                            writer: string;
                                                            indexs: number;
                                                            colorCheck: number;
                                                            write_auto_date: string;
                                                            partdesc: string;
                                                            write_date: string;
                                                        },
                                                        i: number
                                                    ) => {
                                                        return moment(list.write_date).format('YYYY-MM-DD') ===
                                                            days.format('YYYY-MM-DD') ? (
                                                            <div
                                                                key={list.indexs}
                                                                className="Telecommuting_Table_Data_Insert"
                                                                onClick={() => {
                                                                    setClicksData(list);
                                                                    setClicksTitle('Person_Parts');
                                                                    setOnClickedDataIn(true);
                                                                }}
                                                                style={
                                                                    list.colorCheck === 3
                                                                        ? { backgroundColor: 'gray' }
                                                                        : moment(list.write_auto_date).diff(moment(), 'days') === 0
                                                                        ? { backgroundColor: '#427200' }
                                                                        : moment(list.write_auto_date).diff(moment(), 'days') === -1
                                                                        ? { backgroundColor: '#f7b34c' }
                                                                        : { backgroundColor: '#c13838' }
                                                                }
                                                            >{`${list.writer}_${list.partdesc.slice(0, 15)}...`}</div>
                                                        ) : (
                                                            <div></div>
                                                        );
                                                    }
                                                )
                                            ) : (
                                                <div></div>
                                            )}
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
        setOnClickedSet(false);
        setOnClickedDataIn(false);
    };
    return (
        <div>
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
                {InfomationState.company === 'DHKS' ? (
                    <div className="Telecommutign_checkbox_div">
                        <ul>
                            <li
                                onClick={() => {
                                    if (telecommutingApply_check) {
                                        dispatch(TelecommutingDataShowCheckedFalse());
                                    } else {
                                        dispatch(getTelecommutingThunk(getMoment, InfomationState));
                                    }
                                    settelecommutingApply_check(!telecommutingApply_check);
                                }}
                            >
                                <input type="checkbox" name="telecommutingApply_check" checked={telecommutingApply_check} readOnly></input>
                                재택 근무
                            </li>
                            <li
                                onClick={() => {
                                    if (BeforeOtApply_check) {
                                        dispatch(BeforeOTDataShowCheckedFalse());
                                    } else {
                                        dispatch(getBEFOREOTdataThunk(getMoment, InfomationState));
                                    }
                                    setBeforeOtApply_check(!BeforeOtApply_check);
                                }}
                            >
                                <input type="checkbox" name="BeforeOtApply_check" checked={BeforeOtApply_check} readOnly></input>사전 OT
                            </li>
                            <li
                                onClick={() => {
                                    if (AfterOtApply_check) {
                                        dispatch(AfterOTDataShowCheckedFalse());
                                    } else {
                                        dispatch(getAFTEROTdataThunk(getMoment, InfomationState));
                                    }
                                    setAfterOtApply_check(!AfterOtApply_check);
                                }}
                            >
                                <input type="checkbox" name="AfterOtApply_check" checked={AfterOtApply_check} readOnly></input>사후 OT
                            </li>
                            <li
                                onClick={() => {
                                    if (foodApply_check) {
                                        dispatch(FoodDataShowCheckedFalse());
                                    } else {
                                        dispatch(getFoodDataThunk(getMoment, InfomationState));
                                    }
                                    setfoodApply_check(!foodApply_check);
                                }}
                            >
                                <input type="checkbox" name="foodApply_check" checked={foodApply_check} readOnly></input> 식대 정산
                            </li>
                            <li
                                onClick={() => {
                                    if (usbApply_check) {
                                        dispatch(USBCDDataShowCheckedFalse());
                                    } else {
                                        dispatch(getUSBCDThunk(getMoment, InfomationState));
                                    }
                                    setusbApply_check(!usbApply_check);
                                }}
                            >
                                <input type="checkbox" name="usbApply_check" checked={usbApply_check} readOnly></input> USB신청
                            </li>
                            {/* <li
                            onClick={() => {
                                if (Parts_check) {
                                    dispatch(PartsDataShowCheckedFalse());
                                } else {
                                    dispatch(getPartsdataThunk(getMoment, InfomationState));
                                }
                                setParts_check(!Parts_check);
                            }}
                        >
                            <input type="checkbox" name="usbParts" checked={Parts_check} readOnly></input> 업무요청
                        </li> */}
                        </ul>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <div>
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
            {onClicked ? <CreateModal onClicked={onClicked} modalClose={modalClose} clicksData={clicksData}></CreateModal> : ''}

            {onClickedDataIn ? (
                <SelectClickModalMainPage
                    onClicked={onClickedDataIn}
                    modalClose={modalClose}
                    clicksData={clicksData}
                    clicksTitle={clicksTitle}
                    setClicksData={(data: {}) => setClicksData(data)}
                ></SelectClickModalMainPage>
            ) : (
                ''
            )}
        </div>
    );
};

export default Telecommuting;

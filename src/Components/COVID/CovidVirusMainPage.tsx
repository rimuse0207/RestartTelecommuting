import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const CovidVirusMainPage = () => {
    const [getDataCovid, setGetDataCovid] = useState([]);
    const [todayPerson, setTodayPerson] = useState(0);
    const [CountYesterDay, setCountYesterDay] = useState(0);
    useEffect(() => {
        getCovidData();
    }, []);

    const getCovidData = async () => {
        try {
            const getDataCovidAPI = await axios.get(
                `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${
                    process.env.REACT_APP_COVID_KEY
                }&pageNo=1&numOfRows=10&startCreateDt=${moment().subtract(2, 'day').format('YYYYMMDD')}&endCreateDt=${moment().format(
                    'YYYYMMDD'
                )}`
            );
            if (getDataCovidAPI.status === 200) {
                setGetDataCovid(getDataCovidAPI.data.response.body.items.item);

                const Person =
                    getDataCovidAPI.data.response.body.items.item[0].decideCnt - getDataCovidAPI.data.response.body.items.item[1].decideCnt;

                const PersonYesterDay =
                    getDataCovidAPI.data.response.body.items.item[1].decideCnt - getDataCovidAPI.data.response.body.items.item[2].decideCnt;

                const cutPerson = Person - PersonYesterDay;
                if (cutPerson >= 0) {
                    setCountYesterDay(cutPerson);
                } else {
                    setCountYesterDay(cutPerson);
                }
                setTodayPerson(Person);
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div>
                {moment().subtract(1, 'day').format('MM월 DD일')} 코로나 확진자수 : {todayPerson}명({CountYesterDay}명)
            </div>
        </div>
    );
};

export default CovidVirusMainPage;

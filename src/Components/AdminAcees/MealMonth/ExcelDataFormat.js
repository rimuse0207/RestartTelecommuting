import React, { useState, useEffect } from 'react';
import ExcelDownload from './ExcelDownload';
import axios from 'axios';
import './ExcelDataFormat.css';
const ExcelDataFormat = ({ selectedYear, selectedMonth, selectedTeam }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        ExcelDataGet();
    }, [selectedTeam, selectedMonth, selectedYear]);
    const ExcelDataGet = async () => {
        const dataGet = await axios.post(`${process.env.REACT_APP_DB_HOST}/Meal_app_servers/getExcelData`, {
            selectedTeam,
            selectDate: selectedYear + '-' + selectedMonth,
        });
        if (dataGet.data.dataSuccess) {
            setData(dataGet.data.data);
        }
    };
    return (
        <div className="ExcelDataDownload_big_div">
            <ExcelDownload data={data}></ExcelDownload>
        </div>
    );
};

export default ExcelDataFormat;

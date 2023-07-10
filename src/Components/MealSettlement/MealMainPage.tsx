import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import HambergerMenu from '../Navigation/HambergerMenu';
import SliderPage from '../SliderPage';
import SignInForm from '../Login/SignInForm';
import { RootState } from '../../models/index';
import ApplyMealPage from './ApplyMealPage';

const MealMainPage = () => {
    return (
        <div>
            <div className="App">
                <HambergerMenu titles="식대 정산" subtitles="월 식대 등록 및 조회"></HambergerMenu>
                <ApplyMealPage></ApplyMealPage>
            </div>
        </div>
    );
};

export default MealMainPage;

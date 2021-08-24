import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom"
import ChattingAppMain from "./ChattingApp/ChattingAppMain";
import ErrorPage from "./ErrorPage/ErrorPage";

const MainPage = () => {
    return (
        <ChattingAppMain></ChattingAppMain>
    )
}

export default MainPage;
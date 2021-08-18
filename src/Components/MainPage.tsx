import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom"
import ChattingAppMain from "./ChattingApp/ChattingAppMain";
import ErrorPage from "./ErrorPage/ErrorPage";

const MainPage = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ChattingAppMain}></Route>
                <Route path="*" component={ErrorPage} />
                <Redirect path="*" to="/ErrorPage" />
            </Switch>
        </BrowserRouter>
    )
}

export default MainPage;
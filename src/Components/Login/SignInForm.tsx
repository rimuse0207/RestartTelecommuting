import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SignInForm.css";
import { useDispatch } from "react-redux";
import { getPersionalInfo } from "../../models/PersonalInfo"

type SignInFormProps = {
    setLoginCheck: (data: boolean) => void
}

const SignInForm = ({ setLoginCheck }: SignInFormProps) => {

    const [email, setEmail] = useState<string | any>(localStorage.getItem("id") ? localStorage.getItem("id") : "")
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        try {
            const loginCheck = await axios.post(`${process.env.REACT_APP_DB_HOST}/Login_app_servers/loginCheck`, {
                id: email,
                password: password
            })
            if (!loginCheck.data.searchOn) {
                alert(loginCheck.data.message);
                setPassword("");
            } else {
                alert(loginCheck.data.message);
                localStorage.setItem("id", (loginCheck.data.datas[0].email))
                dispatch(getPersionalInfo(loginCheck.data.datas[0]));
                setLoginCheck(true);

                // return <Redirect push to="/" />
            }
        } catch (error) {
            console.log(error);
            alert("Login Error 서버 차단");
        }

    }

    return (
        <div>
            <div className="appAside" >
                <div className="logo_center">
                    <img src="/dhks.jpg" width="70%"></img>
                </div>
            </div>
            <div className="appForm">
                <div className="formCenter">

                    <form className="formFields" onSubmit={(event: React.SyntheticEvent) => handleSubmit(event)}>
                        <h1>DHKS</h1>
                        <h2>종합 프로그램</h2>
                        <div className="formField">
                            <label className="formFieldLabel" htmlFor="email">
                                E-Mail Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="formFieldInput"
                                placeholder="Enter your email"
                                name="email"
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="formField">
                            <label className="formFieldLabel" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="formFieldInput"
                                placeholder="Enter your password"
                                name="password"
                                value={password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="formField">
                            <button className="formFieldButton">Sign In</button>
                        </div>


                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignInForm;
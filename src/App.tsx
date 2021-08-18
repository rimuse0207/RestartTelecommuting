import React, { useState } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { getSocket } from './models/Socket';
import SliderPage from './Components/SliderPage';
import socketio from 'socket.io-client';
import { RootState } from './models';
import SignInForm from "./Components/Login/SignInForm";

function App() {

  const socket = useSelector((state: RootState) => state.Socket.socket);
  const [loginCheck, setLoginCheck] = useState(false);


  return (

    <div className="App">
      {loginCheck ? <SliderPage width={window.innerWidth} socket={socket}></SliderPage> : <SignInForm setLoginCheck={(data: boolean) => setLoginCheck(data)}></SignInForm>}
    </div>
  );
}

export default App;

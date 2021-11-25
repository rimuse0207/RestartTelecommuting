import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlusNumbering, RandomNumbering, SocketsConnect } from '../../models/ReduxTestFile';
import { RootState } from '../../models';
import socketio from 'socket.io-client';

const PlayGround = () => {
    const Dispatch = useDispatch();
    const handleCLicks = () => {
        Dispatch(PlusNumbering());
    };

    const RandomNumberClicks = async () => {
        const sole = await socketio(`${process.env.REACT_APP_API_URL}`);
        console.log(sole);
        Dispatch(sole);
    };

    const datasss = useSelector((state: RootState) => state.numberingTest);

    return (
        <div>
            <div>
                <div>
                    <button onClick={handleCLicks}>++</button>
                </div>
                <div>
                    <button onClick={RandomNumberClicks}>Random</button>
                </div>
            </div>
        </div>
    );
};

export default PlayGround;

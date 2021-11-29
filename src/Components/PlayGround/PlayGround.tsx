import React, { useRef } from 'react';
import './PlayGround.css';
const PlayGround = () => {
    return (
        <div style={{ background: 'lightgray' }}>
            <div>
                <div className="PlayGroundImage">
                    <div className="displayMoniter">
                        <div>
                            <div>
                                <h2>로그인</h2>
                                <form>
                                    <input></input>
                                    <input></input>
                                </form>
                            </div>
                        </div>
                        <div className="MarkDelete"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayGround;

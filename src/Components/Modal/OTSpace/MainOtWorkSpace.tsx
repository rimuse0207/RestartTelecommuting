import React, { useState } from 'react';
import AfterOtWorkSpace from './AfterOtWorkSpace';

type MainOtWorkSpaceProps = {
    startDate: string;
}

const MainOtWorkSpace = ({ startDate }: MainOtWorkSpaceProps) => {

    return (
        <div>
            <AfterOtWorkSpace startDate={startDate}></AfterOtWorkSpace>
        </div>
    );
};

export default MainOtWorkSpace;

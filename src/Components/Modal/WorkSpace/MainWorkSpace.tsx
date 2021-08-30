import React from 'react';
import PersonalApply from './PersonalApply';

type MainWorkSpaceProps = {
    startDate: string | null;
};

const MainWorkSpace = ({ startDate }: MainWorkSpaceProps) => {
    return (
        <div>
            <PersonalApply startDate={startDate}></PersonalApply>
        </div>
    );
};

export default MainWorkSpace;

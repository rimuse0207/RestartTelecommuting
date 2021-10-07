import axios from 'axios';
import React, { useEffect } from 'react';

type TeamLeaderBeforeOTWorkSpaceProps = {
    selectYear: string;
    selectMonth: string;
    selectName: string | null;
};

const TeamLeaderBeforeOTWorkSpace = ({ selectYear, selectMonth, selectName }: TeamLeaderBeforeOTWorkSpaceProps) => {
    useEffect(() => {
        getDataOTData();
    }, [selectYear, selectMonth, selectName]);
    const getDataOTData = async () => {
        try {
            const getDataBeforeOT = await axios.post(`${process.env.REACT_APP_DB_HOST}/TeamSelectOT_app_server/getPersonName`, {
                selectYear,
                selectMonth,
            });
        } catch (error) {
            console.log(error);
        }
    };
    return <div>Before</div>;
};

export default TeamLeaderBeforeOTWorkSpace;

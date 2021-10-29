import { combineReducers } from 'redux';
import Socket from './Socket';
import ChattingMember from './ChattingMeber';
import PersonalInfo from './PersonalInfo';
import FoodDataGetting from './Thunk_models/FoodData';
import USBCDDataGetting from './Thunk_models/USBCDData';
import TelecommutingDataGetting from './Thunk_models/TelecommutingData';
import AfterOTData from './Thunk_models/AfterOTData';
import BeforeOTData from './Thunk_models/BeforeOTData';
import PartsData from './Thunk_models/PartsData';
import TeamLeader_TelecommutingDataGetting from './TeamLeader_Thunk_models/TeamLeaderTelecommutingData';
import TeamLeaderUSBCDDataGetting from './TeamLeader_Thunk_models/TeamLeaderUSBCDData';
import TeamLeaderFoodData from './TeamLeader_Thunk_models/TeamLeaderFoodData';
import TeamLeaderBeforeOTData from './TeamLeader_Thunk_models/TeamLeaderBeforeOTData';
import TeamLeaderAfterOTData from './TeamLeader_Thunk_models/TeamLeaderAfterOTData';

const rootReducer = combineReducers({
    Socket,
    ChattingMember,
    PersonalInfo,
    FoodDataGetting,
    USBCDDataGetting,
    TelecommutingDataGetting,
    AfterOTData,
    BeforeOTData,
    TeamLeader_TelecommutingDataGetting,
    TeamLeaderUSBCDDataGetting,
    TeamLeaderFoodData,
    TeamLeaderBeforeOTData,
    TeamLeaderAfterOTData,
    PartsData,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

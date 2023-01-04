import { combineReducers } from 'redux';
// import Socket from './Socket';
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
import numberingTest from './ReduxTestFile';
import Access_Control from './Access_Redux/Access_Redux';
import CSMFiltering from './CSMFilteringRedux/CSMFilteringRedux';
import Nav_AccessTokens from './Nav_Access_Redux/Nav_Access_Redux';
import CSMDataGetting from './Thunk_models/CSM_Redux_Thunk/CSM_Redux';
import CSM_User_Used_DataGetting from './Thunk_models/CSM_Redux_Thunk/CSM_User_Used_Redux';
import CSM_Selected_Data_List from './CSMFilteringRedux/CSMSelectedRedux';
const rootReducer = combineReducers({
    // Socket,
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
    numberingTest,
    Access_Control,
    CSMFiltering,
    Nav_AccessTokens,
    CSMDataGetting,
    CSM_User_Used_DataGetting,
    CSM_Selected_Data_List,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

import { combineReducers } from 'redux';
import Socket from './Socket';
import ChattingMember from './ChattingMeber';
import PersonalInfo from './PersonalInfo';
import FoodDataGetting from './Thunk_models/FoodData';
import USBCDDataGetting from './Thunk_models/USBCDData';
import TelecommutingDataGetting from './Thunk_models/TelecommutingData';
import AfterOTData from './Thunk_models/AfterOTData';
import BeforeOTData from './Thunk_models/BeforeOTData';

const rootReducer = combineReducers({
    Socket,
    ChattingMember,
    PersonalInfo,
    FoodDataGetting,
    USBCDDataGetting,
    TelecommutingDataGetting,
    AfterOTData,
    BeforeOTData,
});
// 루트 리듀서를 내보내주세요.
export default rootReducer;

// 루트 리듀서의 반환값를 유추해줍니다
// 추후 이 타입을 컨테이너 컴포넌트에서 불러와서 사용해야 하므로 내보내줍니다.
export type RootState = ReturnType<typeof rootReducer>;

import axios, { AxiosError } from 'axios';
import { DecryptKey } from '../../config';
import moment from 'moment';
import { RootState } from '../../models/index';
import { createAsyncAction, createReducer } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

interface TelecommutingDataTypes {
    Time1: string;
    Time2: string;
    approve: number;
    company: string;
    day: string;
    id: string;
    image: string;
    name: string;
    no: number;
    num: number;
    position: string;
    team: string;
    work: string;
}

const GET_TelecommutingData_GET = 'TelecommutingData/GET_TelecommutingData_GET';
const GET_TelecommutingData_SUCCESS = 'TelecommutingData/GET_TelecommutingData_SUCCESS';
const GET_TelecommutingData_ERROR = 'TelecommutingData/GET_TelecommutingData_ERROR';
const TelecommutingData_Show_FALSE = 'TelecommutingData/TelecommutingData_Show_FALSE';
const TelecommutingData_Show_TRUE = 'TelecommutingData/TelecommutingData_Show_TRUE';

const getUSBCDDataAsync = createAsyncAction(GET_TelecommutingData_GET, GET_TelecommutingData_SUCCESS, GET_TelecommutingData_ERROR)<
    undefined,
    TelecommutingDataTypes,
    AxiosError
>();

const getDataFoodApply = async (getMoment: {}, InfomationState: { id: string; team: string; name: string }) => {
    try {
        const dataget = await axios.post(`${process.env.REACT_APP_API_URL}/Tele_app_server/Data_get_Telecommuting`, {
            id: DecryptKey(InfomationState.id),
            team: InfomationState.team,
            name: DecryptKey(InfomationState.name),
            selectDate: moment(getMoment).format('YYYY-MM'),
        });

        return dataget.data.data;
    } catch (error) {
        console.log(error);
    }
};
const actions = {
    GET_TelecommutingData_GET,
    GET_TelecommutingData_SUCCESS,
    GET_TelecommutingData_ERROR,
    TelecommutingData_Show_FALSE,
    TelecommutingData_Show_TRUE,
};
// type GithubAction = ActionType<typeof GET_FoodData_GET> | ActionType<typeof GET_FoodData_SUCCESS> | ActionType<typeof GET_FoodData_ERROR> | ActionType<any>
type GithubAction = ActionType<typeof actions> | ActionType<any>;

type GithubState = {
    TelecommutingDatas: {
        loading: boolean;
        error: Error | null;
        data: TelecommutingDataTypes | any;
        dataChecked: boolean;
    };
};

export function getTelecommutingThunk(
    getMoment: {},
    InfomationState: { id: string; team: string; name: string }
): ThunkAction<void, RootState, null, GithubAction> {
    return async dispatch => {
        const { request, success, failure } = getUSBCDDataAsync;
        dispatch(request());
        try {
            const userProfile = await getDataFoodApply(getMoment, InfomationState);
            if (userProfile) {
                dispatch(success(userProfile));
            }

        } catch (e: any) {
            dispatch(failure(e));
        }
    };
}
export const TelecommutingDataShowCheckedFalse = () => ({
    type: TelecommutingData_Show_FALSE,
});
export const TelecommutingDataShowCheckedTrue = () => ({
    type: TelecommutingData_Show_TRUE,
});

const initialState: GithubState = {
    TelecommutingDatas: {
        loading: false,
        error: null,
        data: [],
        dataChecked: false,
    },
};

const TelecommutingDataGetting = createReducer<GithubState, GithubAction>(initialState, {
    [GET_TelecommutingData_GET]: state => ({
        ...state,
        TelecommutingDatas: {
            loading: true,
            error: null,
            data: [],
            dataChecked: false,
        },
    }),
    [GET_TelecommutingData_SUCCESS]: (state, action) => ({
        ...state,
        TelecommutingDatas: {
            loading: false,
            error: null,
            data: action.payload,
            dataChecked: true,
        },
    }),
    [GET_TelecommutingData_ERROR]: (state, action) => ({
        ...state,
        TelecommutingDatas: {
            loading: false,
            error: action.payload,
            data: [],
            dataChecked: false,
        },
    }),
    [TelecommutingData_Show_FALSE]: state => ({
        ...state,
        TelecommutingDatas: {
            ...state.TelecommutingDatas,
            dataChecked: false,
        },
    }),
    [TelecommutingData_Show_TRUE]: state => ({
        ...state,
        TelecommutingDatas: {
            ...state.TelecommutingDatas,
            dataChecked: true,
        },
    }),
});

export default TelecommutingDataGetting;

import axios, { AxiosError } from 'axios';
import { DecryptKey } from '../../config';
import moment from 'moment';
import { RootState } from '../../models/index';
import { createAsyncAction, createReducer } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

interface TeamLeader_TelecommutingDataTypes {
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

const GET_TeamLeader_TelecommutingData_GET = 'TeamLeader_TelecommutingData/GET_TeamLeader_TelecommutingData_GET';
const GET_TeamLeader_TelecommutingData_SUCCESS = 'TeamLeader_TelecommutingData/GET_TeamLeader_TelecommutingData_SUCCESS';
const GET_TeamLeader_TelecommutingData_ERROR = 'TeamLeader_TelecommutingData/GET_TeamLeader_TelecommutingData_ERROR';
const TeamLeader_TelecommutingData_Show_FALSE = 'TeamLeader_TelecommutingData/TeamLeader_TelecommutingData_Show_FALSE';
const TeamLeader_TelecommutingData_Show_TRUE = 'TeamLeader_TelecommutingData/TeamLeader_TelecommutingData_Show_TRUE';

const getUSBCDDataAsync = createAsyncAction(
    GET_TeamLeader_TelecommutingData_GET,
    GET_TeamLeader_TelecommutingData_SUCCESS,
    GET_TeamLeader_TelecommutingData_ERROR
)<undefined, TeamLeader_TelecommutingDataTypes, AxiosError>();

const getDataFoodApply = async (getMoment: {}, InfomationState: { id: string; team: string; name: string; company: string }) => {
    // try {
    //     const dataget = await axios.post(`${process.env.REACT_APP_API_URL}/Tele_app_server/Data_get_TeamLeader_Telecommuting`, {
    //         id: DecryptKey(InfomationState.id),
    //         team: InfomationState.team,
    //         name: DecryptKey(InfomationState.name),
    //         selectDate: moment(getMoment).format('YYYY-MM'),
    //     });

    //     return dataget.data.data;
    // } catch (error) {
    //     console.log(error);
    // }
    try {
        const TeleLeaderdataget = await axios.get(`${process.env.REACT_APP_API_URL}/Tele_app_server/Data_get_TeamLeader_Telecommuting`, {
            params: {
                selectDate: moment(getMoment).format('YYYY-MM'),
                selectCompany: InfomationState.company,
            },
            headers: {
                Authorization: sessionStorage.getItem('DHKS_TOKEN'),
            },
        });
        return TeleLeaderdataget.data.data;
    } catch (error) {
        console.log(error);
    }
};
const actions = {
    GET_TeamLeader_TelecommutingData_GET,
    GET_TeamLeader_TelecommutingData_SUCCESS,
    GET_TeamLeader_TelecommutingData_ERROR,
    TeamLeader_TelecommutingData_Show_FALSE,
    TeamLeader_TelecommutingData_Show_TRUE,
};
// type GithubAction = ActionType<typeof GET_FoodData_GET> | ActionType<typeof GET_FoodData_SUCCESS> | ActionType<typeof GET_FoodData_ERROR> | ActionType<any>
type GithubAction = ActionType<typeof actions> | ActionType<any>;

type GithubState = {
    TeamLeader_TelecommutingDatas: {
        loading: boolean;
        error: Error | null;
        data: TeamLeader_TelecommutingDataTypes | any;
        dataChecked: boolean;
    };
};

export function TeamLeader_getTelecommutingThunk(
    getMoment: {},
    InfomationState: { id: string; team: string; name: string; company: string }
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
export const TeamLeader_TelecommutingDataShowCheckedFalse = () => ({
    type: TeamLeader_TelecommutingData_Show_FALSE,
});
export const TeamLeader_TelecommutingDataShowCheckedTrue = () => ({
    type: TeamLeader_TelecommutingData_Show_TRUE,
});

const initialState: GithubState = {
    TeamLeader_TelecommutingDatas: {
        loading: false,
        error: null,
        data: [],
        dataChecked: false,
    },
};

const TeamLeader_TelecommutingDataGetting = createReducer<GithubState, GithubAction>(initialState, {
    [GET_TeamLeader_TelecommutingData_GET]: state => ({
        ...state,
        TeamLeader_TelecommutingDatas: {
            loading: true,
            error: null,
            data: [],
            dataChecked: false,
        },
    }),
    [GET_TeamLeader_TelecommutingData_SUCCESS]: (state, action) => ({
        ...state,
        TeamLeader_TelecommutingDatas: {
            loading: false,
            error: null,
            data: action.payload,
            dataChecked: true,
        },
    }),
    [GET_TeamLeader_TelecommutingData_ERROR]: (state, action) => ({
        ...state,
        TeamLeader_TelecommutingDatas: {
            loading: false,
            error: action.payload,
            data: [],
            dataChecked: false,
        },
    }),
    [TeamLeader_TelecommutingData_Show_FALSE]: state => ({
        ...state,
        TeamLeader_TelecommutingDatas: {
            ...state.TeamLeader_TelecommutingDatas,
            dataChecked: false,
        },
    }),
    [TeamLeader_TelecommutingData_Show_TRUE]: state => ({
        ...state,
        TeamLeader_TelecommutingDatas: {
            ...state.TeamLeader_TelecommutingDatas,
            dataChecked: true,
        },
    }),
});

export default TeamLeader_TelecommutingDataGetting;

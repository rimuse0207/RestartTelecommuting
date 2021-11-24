import axios, { AxiosError } from 'axios';
import { DecryptKey } from '../../config';
import moment from 'moment';
import { RootState } from '../../models/index';
import { createAsyncAction, createReducer } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

interface FoodDataTypes {
    indexs: number;
    dates: string;
    division: string;
    spending: number;
    calculate: number;
    place: string;
    location: string;
    etc: string;
    name: string;
    department: string;
    id: string;
    months: string;
}

const TeamLeader_GET_FoodData_GET = 'TeamLeader_FoodData/TeamLeader_GET_FoodData_GET';
const TeamLeader_GET_FoodData_SUCCESS = 'TeamLeader_FoodData/TeamLeader_GET_FoodData_SUCCESS';
const TeamLeader_GET_FoodData_ERROR = 'TeamLeader_FoodData/TeamLeader_GET_FoodData_ERROR';
const TeamLeader_FoodData_Show_FALSE = 'TeamLeader_FoodData/TeamLeader_FoodData_Show_FALSE';
const TeamLeader_FoodData_Show_TRUE = 'TeamLeader_FoodData/TeamLeader_FoodData_Show_TRUE';

const TeamLeader_getFoodDataAsync = createAsyncAction(
    TeamLeader_GET_FoodData_GET,
    TeamLeader_GET_FoodData_SUCCESS,
    TeamLeader_GET_FoodData_ERROR
)<undefined, FoodDataTypes, AxiosError>();

const TeamLeader_getDataFoodApply = async (getMoment: {}, InfomationState: { id: string; team: string; name: string }) => {
    try {
        // const dataget = await axios.post(`${process.env.REACT_APP_API_URL}/Meal_app_servers/TeamLeader_Data_get_applyMeal`, {
        //     id: DecryptKey(InfomationState.id),
        //     team: InfomationState.team,
        //     name: DecryptKey(InfomationState.name),
        //     selectDate: moment(getMoment).format('YYYY-MM'),
        // });
        const Fooddataget = await axios.get(`${process.env.REACT_APP_API_URL}/Meal_app_servers/TeamLeader_Data_get_applyMeal`, {
            params: {
                selectDate: moment(getMoment).format('YYYY-MM'),
            },
            headers: {
                Authorization: sessionStorage.getItem('DHKS_TOKEN'),
            },
        });
        return Fooddataget.data.data;
    } catch (error) {
        console.log(error);
    }
};
const actions = {
    TeamLeader_GET_FoodData_GET,
    TeamLeader_GET_FoodData_SUCCESS,
    TeamLeader_GET_FoodData_ERROR,
    TeamLeader_FoodData_Show_TRUE,
    TeamLeader_FoodData_Show_FALSE,
};
// type GithubAction = ActionType<typeof GET_FoodData_GET> | ActionType<typeof GET_FoodData_SUCCESS> | ActionType<typeof GET_FoodData_ERROR> | ActionType<any>
type GithubAction = ActionType<typeof actions> | ActionType<any>;

type GithubState = {
    TeamLeader_FoodDatas: {
        loading: boolean;
        error: Error | null;
        data: FoodDataTypes | any;
        dataChecked: boolean;
    };
};

export function TeamLeader_getFoodDataThunk(
    getMoment: {},
    InfomationState: { id: string; team: string; name: string }
): ThunkAction<void, RootState, null, GithubAction> {
    return async dispatch => {
        const { request, success, failure } = TeamLeader_getFoodDataAsync;
        dispatch(request());
        try {
            const userProfile = await TeamLeader_getDataFoodApply(getMoment, InfomationState);
            if (userProfile) {
                dispatch(success(userProfile));
            }
        } catch (e: any) {
            dispatch(failure(e));
        }
    };
}
export const TeamLeader_FoodDataShowCheckedFalse = () => ({
    type: TeamLeader_FoodData_Show_FALSE,
});
export const TeamLeader_FoodDataShowCheckedTrue = () => ({
    type: TeamLeader_FoodData_Show_TRUE,
});

const initialState: GithubState = {
    TeamLeader_FoodDatas: {
        loading: false,
        error: null,
        data: [],
        dataChecked: false,
    },
};

const TeamLeaderFoodDataGetting = createReducer<GithubState, GithubAction>(initialState, {
    [TeamLeader_GET_FoodData_GET]: state => ({
        ...state,
        TeamLeader_FoodDatas: {
            loading: true,
            error: null,
            data: [],
            dataChecked: false,
        },
    }),
    [TeamLeader_GET_FoodData_SUCCESS]: (state, action) => ({
        ...state,
        TeamLeader_FoodDatas: {
            loading: false,
            error: null,
            data: action.payload,
            dataChecked: true,
        },
    }),
    [TeamLeader_GET_FoodData_ERROR]: (state, action) => ({
        ...state,
        TeamLeader_FoodDatas: {
            loading: false,
            error: action.payload,
            data: [],
            dataChecked: false,
        },
    }),
    [TeamLeader_FoodData_Show_FALSE]: state => ({
        ...state,
        TeamLeader_FoodDatas: {
            ...state.TeamLeader_FoodDatas,
            dataChecked: false,
        },
    }),
    [TeamLeader_FoodData_Show_TRUE]: state => ({
        ...state,
        TeamLeader_FoodDatas: {
            ...state.TeamLeader_FoodDatas,
            dataChecked: true,
        },
    }),
});

export default TeamLeaderFoodDataGetting;

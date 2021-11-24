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

const GET_FoodData_GET = 'FoodData/GET_FoodData_GET';
const GET_FoodData_SUCCESS = 'FoodData/GET_FoodData_SUCCESS';
const GET_FoodData_ERROR = 'FoodData/GET_FoodData_ERROR';
const FoodData_Show_FALSE = 'FoodData/FoodData_Show_FALSE';
const FoodData_Show_TRUE = 'FoodData/FoodData_Show_TRUE';

const getFoodDataAsync = createAsyncAction(GET_FoodData_GET, GET_FoodData_SUCCESS, GET_FoodData_ERROR)<
    undefined,
    FoodDataTypes,
    AxiosError
>();

const getDataFoodApply = async (getMoment: {}, InfomationState: { id: string; team: string; name: string }) => {
    try {
        // const dataget = await axios.post(`${process.env.REACT_APP_API_URL}/Meal_app_servers/Data_get_applyMeal`, {
        //     id: DecryptKey(InfomationState.id),
        //     team: InfomationState.team,
        //     name: DecryptKey(InfomationState.name),
        //     selectDate: moment(getMoment).format('YYYY-MM'),
        // });
        const FoodPersondataget = await axios.get(`${process.env.REACT_APP_API_URL}/Meal_app_servers/Data_get_applyMeal`, {
            params: {
                selectDate: moment(getMoment).format('YYYY-MM'),
            },
            headers: {
                Authorization: sessionStorage.getItem('DHKS_TOKEN'),
            },
        });

        return FoodPersondataget.data.data;
    } catch (error) {
        console.log(error);
    }
};
const actions = { GET_FoodData_GET, GET_FoodData_SUCCESS, GET_FoodData_ERROR, FoodData_Show_TRUE, FoodData_Show_FALSE };
// type GithubAction = ActionType<typeof GET_FoodData_GET> | ActionType<typeof GET_FoodData_SUCCESS> | ActionType<typeof GET_FoodData_ERROR> | ActionType<any>
type GithubAction = ActionType<typeof actions> | ActionType<any>;

type GithubState = {
    FoodDatas: {
        loading: boolean;
        error: Error | null;
        data: FoodDataTypes | any;
        dataChecked: boolean;
    };
};

export function getFoodDataThunk(
    getMoment: {},
    InfomationState: { id: string; team: string; name: string }
): ThunkAction<void, RootState, null, GithubAction> {
    return async dispatch => {
        const { request, success, failure } = getFoodDataAsync;
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
export const FoodDataShowCheckedFalse = () => ({
    type: FoodData_Show_FALSE,
});
export const FoodDataShowCheckedTrue = () => ({
    type: FoodData_Show_TRUE,
});

const initialState: GithubState = {
    FoodDatas: {
        loading: false,
        error: null,
        data: [],
        dataChecked: false,
    },
};

const FoodDataGetting = createReducer<GithubState, GithubAction>(initialState, {
    [GET_FoodData_GET]: state => ({
        ...state,
        FoodDatas: {
            loading: true,
            error: null,
            data: [],
            dataChecked: false,
        },
    }),
    [GET_FoodData_SUCCESS]: (state, action) => ({
        ...state,
        FoodDatas: {
            loading: false,
            error: null,
            data: action.payload,
            dataChecked: true,
        },
    }),
    [GET_FoodData_ERROR]: (state, action) => ({
        ...state,
        FoodDatas: {
            loading: false,
            error: action.payload,
            data: [],
            dataChecked: false,
        },
    }),
    [FoodData_Show_FALSE]: state => ({
        ...state,
        FoodDatas: {
            ...state.FoodDatas,
            dataChecked: false,
        },
    }),
    [FoodData_Show_TRUE]: state => ({
        ...state,
        FoodDatas: {
            ...state.FoodDatas,
            dataChecked: true,
        },
    }),
});

export default FoodDataGetting;

import axios, { AxiosError } from "axios";
import { DecryptKey } from "../../config";
import moment from "moment";
import { useSelector } from 'react-redux';
import { RootState } from '../../models/index';
import { createAsyncAction, createReducer } from 'typesafe-actions';
import { ThunkAction } from "redux-thunk";
import { ActionType } from 'typesafe-actions';

const GET_FoodData_GET = 'FoodData/GET_FoodData_GET';
const GET_FoodData_SUCCESS = 'FoodData/GET_FoodData_SUCCESS';
const GET_FoodData_ERROR = 'FoodData/GET_FoodData_ERROR';

const getFoodDataAsync = createAsyncAction(
    GET_FoodData_GET,
    GET_FoodData_SUCCESS,
    GET_FoodData_ERROR
)<undefined, any, AxiosError>();


const getDataFoodApply = async (getMoment: any, InfomationState: any) => {

    try {
        const dataget = await axios.post(`${process.env.REACT_APP_API_URL}/Meal_app_servers/Data_get_applyMeal`, {
            id: DecryptKey(InfomationState.id),
            team: InfomationState.team,
            name: DecryptKey(InfomationState.name),
            selectDate: moment(getMoment).format('YYYY-MM'),
        });

        return dataget.data.data
    } catch (error) {
        console.log(error);

    }
}
type GithubAction = ActionType<typeof GET_FoodData_GET> | ActionType<typeof GET_FoodData_SUCCESS> | ActionType<typeof GET_FoodData_ERROR> | ActionType<any>


type GithubState = {
    userProfile: {
        loading: boolean;
        error: Error | null;
        data: any | null;
    };
};

export function getUserProfileThunk(username: any, InfomationState: any): ThunkAction<void, RootState, null, GithubAction> {
    return async dispatch => {
        const { request, success, failure } = getFoodDataAsync;
        dispatch(request());
        try {
            const userProfile = await getDataFoodApply(username, InfomationState);
            dispatch(success(userProfile));
        } catch (e: any) {
            dispatch(failure(e));
        }
    };
}

const initialState: GithubState = {
    userProfile: {
        loading: false,
        error: null,
        data: []
    }
};

const github = createReducer<GithubState, GithubAction>(initialState, {
    [GET_FoodData_GET]: (state: any) => ({
        ...state,
        userProfile: {
            loading: true,
            error: null,
            data: []
        }
    }),
    [GET_FoodData_SUCCESS]: (state: any, action: { payload: any; }) => ({
        ...state,
        userProfile: {
            loading: false,
            error: null,
            data: action.payload
        }
    }),
    [GET_FoodData_ERROR]: (state: any, action: { payload: any; }) => ({
        ...state,
        userProfile: {
            loading: false,
            error: action.payload,
            data: []
        }
    })
});

export default github
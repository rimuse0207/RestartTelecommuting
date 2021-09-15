import axios, { AxiosError } from 'axios';
import { DecryptKey } from '../../config';
import moment from 'moment';
import { RootState } from '../../models/index';
import { createAsyncAction, createReducer } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

interface USBCDDataTypes {
    applydate: string;
    email: string;
    equipment: string;
    filename: string;
    leadercheck: number;
    name: string;
    number: number;
    ownership: string;
    team: string;
    text: string;
    workdate: string;
}

const GET_USBCDData_GET = 'USBCDData/GET_USBCDData_GET';
const GET_USBCDData_SUCCESS = 'USBCDData/GET_USBCDData_SUCCESS';
const GET_USBCDData_ERROR = 'USBCDData/GET_USBCDData_ERROR';
const USBCDData_Show_FALSE = 'USBCDData/USBCDData_Show_FALSE';
const USBCDData_Show_TRUE = 'USBCDData/USBCDData_Show_TRUE';

const getUSBCDDataAsync = createAsyncAction(GET_USBCDData_GET, GET_USBCDData_SUCCESS, GET_USBCDData_ERROR)<
    undefined,
    USBCDDataTypes,
    AxiosError
>();

const getDataUSBCDApply = async (getMoment: {}, InfomationState: { id: string; team: string; name: string }) => {
    console.log(`${process.env.REACT_APP_API_URL}/USB_app_server/Data_get_USBApply`);
    try {
        const dataget = await axios.post(`${process.env.REACT_APP_API_URL}/USB_app_server/Data_get_USBApply`, {
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
const actions = { GET_USBCDData_GET, GET_USBCDData_SUCCESS, GET_USBCDData_ERROR, USBCDData_Show_FALSE, USBCDData_Show_TRUE };
// type GithubAction = ActionType<typeof GET_FoodData_GET> | ActionType<typeof GET_FoodData_SUCCESS> | ActionType<typeof GET_FoodData_ERROR> | ActionType<any>
type GithubAction = ActionType<typeof actions> | ActionType<any>;

type GithubState = {
    USBCDDatas: {
        loading: boolean;
        error: Error | null;
        data: USBCDDataTypes | any;
        dataChecked: boolean;
    };
};

export function getUSBCDThunk(
    getMoment: {},
    InfomationState: { id: string; team: string; name: string }
): ThunkAction<void, RootState, null, GithubAction> {
    return async dispatch => {
        const { request, success, failure } = getUSBCDDataAsync;
        dispatch(request());
        try {
            const userProfile = await getDataUSBCDApply(getMoment, InfomationState);
            if (userProfile) {
                dispatch(success(userProfile));
            }

        } catch (e: any) {
            dispatch(failure(e));
        }
    };
}
export const USBCDDataShowCheckedFalse = () => ({
    type: USBCDData_Show_FALSE,
});
export const USBCDDataShowCheckedTrue = () => ({
    type: USBCDData_Show_TRUE,
});

const initialState: GithubState = {
    USBCDDatas: {
        loading: false,
        error: null,
        data: [],
        dataChecked: false,
    },
};

const USBCDDataGetting = createReducer<GithubState, GithubAction>(initialState, {
    [GET_USBCDData_GET]: state => ({
        ...state,
        USBCDDatas: {
            loading: true,
            error: null,
            data: [],
            dataChecked: false,
        },
    }),
    [GET_USBCDData_SUCCESS]: (state, action) => ({
        ...state,
        USBCDDatas: {
            loading: false,
            error: null,
            data: action.payload,
            dataChecked: true,
        },
    }),
    [GET_USBCDData_ERROR]: (state, action) => ({
        ...state,
        USBCDDatas: {
            loading: false,
            error: action.payload,
            data: [],
            dataChecked: false,
        },
    }),
    [USBCDData_Show_FALSE]: state => ({
        ...state,
        USBCDDatas: {
            ...state.USBCDDatas,
            dataChecked: false,
        },
    }),
    [USBCDData_Show_TRUE]: state => ({
        ...state,
        USBCDDatas: {
            ...state.USBCDDatas,
            dataChecked: true,
        },
    }),
});

export default USBCDDataGetting;

import axios, { AxiosError } from 'axios';
import { DecryptKey } from '../../config';
import moment from 'moment';
import { RootState } from '../../models/index';
import { createAsyncAction, createReducer } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

interface AfterOTDataTypes {
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

const GET_AFTEROTData_GET = 'AFTEROTData/GET_AFTEROTData_GET';
const GET_AFTEROTData_SUCCESS = 'AFTEROTData/GET_AFTEROTData_SUCCESS';
const GET_AFTEROTData_ERROR = 'AFTEROTData/GET_AFTEROTData_ERROR';
const AFTEROTData_Show_FALSE = 'AFTEROTData/FoodData_Show_FALSE';
const AFTEROTData_Show_TRUE = 'AFTEROTData/FoodData_Show_TRUE';

const getAfterOTDataAsync = createAsyncAction(GET_AFTEROTData_GET, GET_AFTEROTData_SUCCESS, GET_AFTEROTData_ERROR)<
    undefined,
    AfterOTDataTypes,
    AxiosError
>();

const getDataAfterOTApply = async (getMoment: {}, InfomationState: { id: string; team: string; name: string }) => {
    try {
        const dataget = await axios.post(`${process.env.REACT_APP_API_URL}/OT_app_server/AfterOT_get_data`, {
            id: DecryptKey(InfomationState.id),
            team: InfomationState.team,
            name: DecryptKey(InfomationState.name),
            selectDate: moment(getMoment).format('YYYY-MM'),
        });
        console.log(dataget);
        return dataget.data.data;
    } catch (error) {
        console.log(error);
    }
};
const actions = { GET_AFTEROTData_GET, GET_AFTEROTData_SUCCESS, GET_AFTEROTData_ERROR, AFTEROTData_Show_FALSE, AFTEROTData_Show_TRUE };

type GithubAction = ActionType<typeof actions> | ActionType<any>;

type GithubState = {
    AfterOTDatas: {
        loading: boolean;
        error: Error | null;
        data: AfterOTDataTypes | any;
        dataChecked: boolean;
    };
};

export function getAFTEROTdataThunk(
    getMoment: {},
    InfomationState: { id: string; team: string; name: string }
): ThunkAction<void, RootState, null, GithubAction> {
    return async dispatch => {
        const { request, success, failure } = getAfterOTDataAsync;
        dispatch(request());
        try {
            const userProfile = await getDataAfterOTApply(getMoment, InfomationState);
            if (userProfile) {
                dispatch(success(userProfile));
            }
        } catch (e: any) {
            dispatch(failure(e));
        }
    };
}
export const AfterOTDataShowCheckedFalse = () => ({
    type: AFTEROTData_Show_FALSE,
});
export const AfterOTShowCheckedTrue = () => ({
    type: AFTEROTData_Show_TRUE,
});

const initialState: GithubState = {
    AfterOTDatas: {
        loading: false,
        error: null,
        data: [],
        dataChecked: false,
    },
};

const AfterOTData = createReducer<GithubState, GithubAction>(initialState, {
    [GET_AFTEROTData_GET]: state => ({
        ...state,
        AfterOTDatas: {
            loading: true,
            error: null,
            data: [],
            dataChecked: false,
        },
    }),
    [GET_AFTEROTData_SUCCESS]: (state, action) => ({
        ...state,
        AfterOTDatas: {
            loading: false,
            error: null,
            data: action.payload,
            dataChecked: true,
        },
    }),
    [GET_AFTEROTData_ERROR]: (state, action) => ({
        ...state,
        AfterOTDatas: {
            loading: false,
            error: action.payload,
            data: [],
            dataChecked: false,
        },
    }),
    [AFTEROTData_Show_FALSE]: state => ({
        ...state,
        AfterOTDatas: {
            ...state.AfterOTDatas,
            dataChecked: false,
        },
    }),
    [AFTEROTData_Show_TRUE]: state => ({
        ...state,
        AfterOTDatas: {
            ...state.AfterOTDatas,
            dataChecked: true,
        },
    }),
});

export default AfterOTData;

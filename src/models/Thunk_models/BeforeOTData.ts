import axios, { AxiosError } from 'axios';
import { DecryptKey } from '../../config';
import moment from 'moment';
import { RootState } from '../../models/index';
import { createAsyncAction, createReducer } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

interface BeforeOTDataTypes {
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

const GET_BEFOREOTData_GET = 'BEFOREOTData/GET_BEFOREOTData_GET';
const GET_BEFOREOTData_SUCCESS = 'BEFOREOTData/GET_BEFOREOTData_SUCCESS';
const GET_BEFOREOTData_ERROR = 'BEFOREOTData/GET_BEFOREOTData_ERROR';
const BEFOREOTData_Show_FALSE = 'BEFOREOTData/BEFOREOTData_Show_FALSE';
const BEFOREOTData_Show_TRUE = 'BEFOREOTData/BEFOREOTData_Show_TRUE';

const getBeforeOTDataAsync = createAsyncAction(GET_BEFOREOTData_GET, GET_BEFOREOTData_SUCCESS, GET_BEFOREOTData_ERROR)<
    undefined,
    BeforeOTDataTypes,
    AxiosError
>();

const getDataBeforeOTApply = async (getMoment: {}, InfomationState: { id: string; team: string; name: string }) => {
    try {
        const dataget = await axios.post(`${process.env.REACT_APP_API_URL}/OT_app_server/BeforeOT_get_data`, {
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
const actions = { GET_BEFOREOTData_GET, GET_BEFOREOTData_SUCCESS, GET_BEFOREOTData_ERROR, BEFOREOTData_Show_FALSE, BEFOREOTData_Show_TRUE };

type GithubAction = ActionType<typeof actions> | ActionType<any>;

type GithubState = {
    BeforeOTDatas: {
        loading: boolean;
        error: Error | null;
        data: BeforeOTDataTypes | any;
        dataChecked: boolean;
    };
};

export function getBEFOREOTdataThunk(
    getMoment: {},
    InfomationState: { id: string; team: string; name: string }
): ThunkAction<void, RootState, null, GithubAction> {
    return async dispatch => {
        const { request, success, failure } = getBeforeOTDataAsync;
        dispatch(request());
        try {
            const userProfile = await getDataBeforeOTApply(getMoment, InfomationState);
            if (userProfile) {
                dispatch(success(userProfile));
            }
        } catch (e: any) {
            dispatch(failure(e));
        }
    };
}
export const BeforeOTDataShowCheckedFalse = () => ({
    type: BEFOREOTData_Show_FALSE,
});
export const BeforeOTShowCheckedTrue = () => ({
    type: BEFOREOTData_Show_TRUE,
});

const initialState: GithubState = {
    BeforeOTDatas: {
        loading: false,
        error: null,
        data: [],
        dataChecked: false,
    },
};

const BeforeOTData = createReducer<GithubState, GithubAction>(initialState, {
    [GET_BEFOREOTData_GET]: state => ({
        ...state,
        BeforeOTDatas: {
            loading: true,
            error: null,
            data: [],
            dataChecked: false,
        },
    }),
    [GET_BEFOREOTData_SUCCESS]: (state, action) => ({
        ...state,
        BeforeOTDatas: {
            loading: false,
            error: null,
            data: action.payload,
            dataChecked: true,
        },
    }),
    [GET_BEFOREOTData_ERROR]: (state, action) => ({
        ...state,
        BeforeOTDatas: {
            loading: false,
            error: action.payload,
            data: [],
            dataChecked: false,
        },
    }),
    [BEFOREOTData_Show_FALSE]: state => ({
        ...state,
        BeforeOTDatas: {
            ...state.BeforeOTDatas,
            dataChecked: false,
        },
    }),
    [BEFOREOTData_Show_TRUE]: state => ({
        ...state,
        BeforeOTDatas: {
            ...state.BeforeOTDatas,
            dataChecked: true,
        },
    }),
});

export default BeforeOTData;

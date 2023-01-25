import axios, { AxiosError } from 'axios';

import { RootState } from '../../../models/index';
import { action, createAsyncAction, createReducer } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';
import { CeCalendarTableProps } from './CSM_Redux';
import { CSMFilteringData } from '../../CSMFilteringRedux/CSMFilteringRedux';

interface User_Used_Data_Type {
    FirstData: CeCalendarTableProps[];
    SecondData: CeCalendarTableProps[];
}

const GET_CSM_User_Used_Data_GET = 'CSM_User_Used_Data/GET_CSM_User_Used_Data_GET';
const GET_CSM_User_Used_Data_SUCCESS = 'CSM_User_Used_Data/GET_CSM_User_Used_Data_SUCCESS';
const GET_CSM_User_Used_Data_ERROR = 'CSM_User_Used_Data/GET_CSM_User_Used_Data_ERROR';
const GET_CSM_User_Used_Data_Register = 'GET_CSM_User_Used_Data_Register/GET_CSM_User_Used_Data_Register';

const GET_CSM_User_Used_CE_CALENDAR_CHECKED = 'GET_CSM_User_Used_CE_CALENDAR_CHECKED/GET_CSM_User_Used_CE_CALENDAR_CHECKED';

const get_CSM_User_Used_DataAsync = createAsyncAction(
    GET_CSM_User_Used_Data_GET,
    GET_CSM_User_Used_Data_SUCCESS,
    GET_CSM_User_Used_Data_ERROR
)<undefined, CeCalendarTableProps, AxiosError>();

const get_User_Used_CSM_Data = async (GetCSMFilteringData: CSMFilteringData, type: string, CSM_Access: boolean, Person_ID: string) => {
    try {
        const DataGetUserUsed = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/User_Selected_Data_DataGetSome`, {
            GetCSMFilteringData,
            SelectTeam: type,
            CSM_Access: CSM_Access,
            Person_ID: Person_ID,
        });

        if (DataGetUserUsed.data.dataSuccess) {
            return DataGetUserUsed.data.Datas;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};
const actions = { GET_CSM_User_Used_Data_GET, GET_CSM_User_Used_Data_SUCCESS, GET_CSM_User_Used_Data_ERROR };

type CSM_User_Used_DATA_Action =
    | ActionType<typeof actions>
    | ActionType<any>
    | ActionType<typeof CSM_User_Used_CE_CALENDAR_CHECKED_Func>
    | ActionType<typeof CSM_User_Used_Data_Register_Func>;

export type CSM_User_Used_DATA_State = {
    Datas: User_Used_Data_Type[];
    loading: boolean;
    error: Error | null | boolean;
    dataChecked: boolean;
    pagenumber: number;
};

export function get_CSM_User_Used_DataThunk(
    GetCSMFilteringData: CSMFilteringData,
    type: string,
    CSM_Access: boolean,
    Person_ID: string
): ThunkAction<void, RootState, null, CSM_User_Used_DATA_Action> {
    return async dispatch => {
        const { request, success, failure } = get_CSM_User_Used_DataAsync;
        dispatch(request());

        try {
            const gettings_CSM_User_Used_DATA = await get_User_Used_CSM_Data(GetCSMFilteringData, type, CSM_Access, Person_ID);
            if (gettings_CSM_User_Used_DATA) {
                dispatch(success(gettings_CSM_User_Used_DATA));
            } else {
                dispatch(failure(gettings_CSM_User_Used_DATA));
            }
        } catch (e: any) {
            dispatch(failure(e));
        }
    };
}

export const CSM_User_Used_Data_Register_Func = (data: CeCalendarTableProps[]) => ({
    type: GET_CSM_User_Used_Data_Register,
    payload: {
        FirstData: data[0],
        SecondData: data,
    },
});

export const CSM_User_Used_CE_CALENDAR_CHECKED_Func = (data: User_Used_Data_Type[] | any) => ({
    type: GET_CSM_User_Used_CE_CALENDAR_CHECKED,
    payload: data,
});

const initialState: CSM_User_Used_DATA_State = {
    Datas: [],
    loading: false,
    error: null,
    dataChecked: false,
    pagenumber: 0,
};

const CSM_User_Used_DataGetting = createReducer<CSM_User_Used_DATA_State, CSM_User_Used_DATA_Action>(initialState, {
    [GET_CSM_User_Used_Data_GET]: state => ({
        ...state,
        Datas: [],
        loading: true,
        error: null,
        dataChecked: false,
        pagenumber: 0,
    }),
    [GET_CSM_User_Used_Data_SUCCESS]: (state, action) => ({
        ...state,
        Datas: action.payload,
        loading: false,
        error: null,
        dataChecked: true,
        pagenumber: 0,
    }),
    [GET_CSM_User_Used_Data_ERROR]: (state, action) => ({
        ...state,
        Datas: [],
        loading: false,
        error: true,
        dataChecked: false,
        pagenumber: 0,
    }),
    [GET_CSM_User_Used_Data_Register]: (state, action) => ({
        ...state,
        Datas: state.Datas.concat(action.payload),
    }),
    [GET_CSM_User_Used_CE_CALENDAR_CHECKED]: (state, action) => ({
        ...state,
        Datas: action.payload,
    }),
});

export default CSM_User_Used_DataGetting;

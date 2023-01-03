import axios, { AxiosError } from 'axios';

import { RootState } from '../../../models/index';
import { createAsyncAction, createReducer } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

export interface CeCalendarTableProps {
    csm_basic_data_binds: string;
    csm_basic_data_csm_key: string;
    csm_basic_data_csm_number: string;
    csm_basic_data_custom: string;
    csm_basic_data_division: string;
    csm_basic_data_etc: string;
    csm_basic_data_grade: string;
    csm_basic_data_indexs: number;
    csm_basic_data_issue_date: string;
    csm_basic_data_model_number: string;
    csm_basic_data_part_number: string;
    csm_basic_data_state: string;
    csm_basic_data_titles: string;
    csm_basic_data_write_date: string;
    csm_calendar_apply: null | string;
    csm_calendar_apply_id: null | string;
    csm_calendar_ce: null | string;
    csm_calendar_ce_id: null | string;
    csm_calendar_csm_key: string;
    csm_calendar_custom_date: null | string;
    csm_calendar_custom_date_id: null | string;
    csm_calendar_entering: null | string;
    csm_calendar_entering_id: null | string;
    csm_calendar_finall: null | string;
    csm_calendar_finall_id: null | string;
    csm_calendar_hidden_on: number;
    csm_calendar_indexs: number;
    csm_calendar_pay: null | string;
    csm_calendar_pay_id: null | string;
    csm_calendar_publish: null | string;
    csm_calendar_publish_id: null | string;
    csm_calendar_status: number;
    csm_calendar_write_date: string;
    csm_user_input_data_csm_key: null | string;
    csm_user_input_data_indexs: null | string;
    csm_user_input_data_operation_cost: null | string;
    csm_user_input_data_stay_days: null | string;
    csm_user_input_data_stay_days_cost: null | string;
    csm_user_input_data_total_cost: null | string;
    csm_user_input_data_travel_range: null | string;
    csm_user_input_data_travel_range_cost: null | string;
    csm_user_input_data_travel_time: null | string;
    csm_user_input_data_travel_time_cost: null | string;
    csm_user_input_data_working_count: null | string;
    csm_user_input_data_working_hours: null | string;
    csm_user_input_data_write_date: null | string;
    csm_user_input_data_writer_id: null | string;
    name: null | string;
    csm_user_input_data_apply_code: null | string;
}

interface User_Used_Data_Type {
    FirstData: CeCalendarTableProps[];
    SecondData: CeCalendarTableProps[];
}

const GET_CSM_User_Used_Data_GET = 'CSM_User_Used_Data/GET_CSM_User_Used_Data_GET';
const GET_CSM_User_Used_Data_SUCCESS = 'CSM_User_Used_Data/GET_CSM_User_Used_Data_SUCCESS';
const GET_CSM_User_Used_Data_ERROR = 'CSM_User_Used_Data/GET_CSM_User_Used_Data_ERROR';

const get_CSM_User_Used_DataAsync = createAsyncAction(
    GET_CSM_User_Used_Data_GET,
    GET_CSM_User_Used_Data_SUCCESS,
    GET_CSM_User_Used_Data_ERROR
)<undefined, CeCalendarTableProps, AxiosError>();

const get_User_Used_CSM_Data = async () => {
    try {
        const DataGetUserUsed = await axios.get(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/User_Selected_Data_DataGetSome`);
        console.log('Redux에서 발생', DataGetUserUsed);
        if (DataGetUserUsed.data.dataSuccess) {
            return DataGetUserUsed.data.Datas;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};
const actions = { GET_CSM_User_Used_Data_GET, GET_CSM_User_Used_Data_SUCCESS, GET_CSM_User_Used_Data_ERROR };

type CSM_User_Used_DATA_Action = ActionType<typeof actions> | ActionType<any>;

export type CSM_User_Used_DATA_State = {
    Datas: User_Used_Data_Type[];
    loading: boolean;
    error: Error | null;
    dataChecked: boolean;
    pagenumber: number;
};

export function get_CSM_User_Used_DataThunk(): ThunkAction<void, RootState, null, CSM_User_Used_DATA_Action> {
    return async dispatch => {
        const { request, success, failure } = get_CSM_User_Used_DataAsync;
        dispatch(request());

        try {
            const gettings_CSM_User_Used_DATA = await get_User_Used_CSM_Data();
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
        loading: false,
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
        error: action.payload,
        dataChecked: false,
        pagenumber: 0,
    }),
});

export default CSM_User_Used_DataGetting;

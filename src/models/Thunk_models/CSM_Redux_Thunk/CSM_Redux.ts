import axios, { AxiosError } from 'axios';

import { RootState } from '../../../models/index';
import { createAsyncAction, createReducer } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';
import { CSMFilteringData } from '../../CSMFilteringRedux/CSMFilteringRedux';

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
    name: string | null;
    select: boolean;
    nowSelected: boolean;
    csm_number_respond_working_indexs: number | null;
    csm_number_respond_working_binds: string | null;
    csm_number_respond_working_csm_number: string | null;
    csm_number_respond_working_model: string | null;
    csm_number_respond_working_working_hours: number | null;
    csm_number_respond_working_working_count: number | null;
    csm_user_input_data_apply_code: null | string;
    id: null | string;
    team: null | string;
    csm_data_slect: number;
    csm_number_respond_working_csm_key: string;
    csm_number_respond_working_write_date: string;
}

const GET_CSM_Data_GET = 'CSM_Data/GET_CSM_Data_GET';
const GET_CSM_Data_SUCCESS = 'CSM_Data/GET_CSM_Data_SUCCESS';
const GET_CSM_Data_ERROR = 'CSM_Data/GET_CSM_Data_ERROR';

const GET_CSM_DATA_CHECKED = 'GET_CSM_DATA_CHECKED/GET_CSM_DATA_CHECKED';
const GET_CSM_DATA_CHECKED_DELETE = 'GET_CSM_DATA_CHECKED_DELETE/GET_CSM_DATA_CHECKED_DELETE';

const GET_CSM_CE_CALENDAR_CHECKED = 'GET_CSM_CE_CALENDAR_CHECKED/GET_CSM_CE_CALENDAR_CHECKED';
const CSM_DDATA_RESISTER_FINISHED_DELETE = 'CSM_DDATA_RESISTER_FINISHED_DELETE/CSM_DDATA_RESISTER_FINISHED_DELETE';

const get_CSM_DataAsync = createAsyncAction(GET_CSM_Data_GET, GET_CSM_Data_SUCCESS, GET_CSM_Data_ERROR)<
    undefined,
    CeCalendarTableProps,
    AxiosError
>();

const get_CSM_Data = async (
    GetCSMFilteringData: CSMFilteringData,
    pagenumber: string,
    SelectTeam: string,
    hiddenChecked: boolean,
    CSM_Selected_Data_List: CeCalendarTableProps[]
) => {
    try {
        const DataGetSomeCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DataGetSome`, {
            GetCSMFilteringData,
            pagenumber,
            SelectTeam,
            hiddenChecked,
            CSM_Selected_Data_List,
        });
        if (DataGetSomeCECalendar.data.dataSuccess) {
            return DataGetSomeCECalendar.data;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};
const actions = { GET_CSM_Data_GET, GET_CSM_Data_SUCCESS, GET_CSM_Data_ERROR };

type CSM_DATA_Action = ActionType<typeof actions> | ActionType<any>;

export type CSM_DATA_State = {
    CSM_Data: {
        loading: boolean;
        error: Error | null | boolean;
        data: CeCalendarTableProps[];
        dataChecked: boolean;
        pagenumber: number;
    };
};

export function get_CSM_DataThunk(
    GetCSMFilteringData: CSMFilteringData,
    pagenumber: string,
    SelectTeam: string,
    hiddenChecked: boolean,
    CSM_Selected_Data_List: CeCalendarTableProps[]
): ThunkAction<void, RootState, null, CSM_DATA_Action> {
    return async dispatch => {
        const { request, success, failure } = get_CSM_DataAsync;
        dispatch(request());
        try {
            const gettings_CSM_DATA = await get_CSM_Data(
                GetCSMFilteringData,
                pagenumber,
                SelectTeam,
                hiddenChecked,
                CSM_Selected_Data_List
            );
            if (gettings_CSM_DATA) {
                dispatch(success(gettings_CSM_DATA));
            } else {
                dispatch(failure(gettings_CSM_DATA));
            }
        } catch (e: any) {
            dispatch(failure(e));
        }
    };
}

export const CSM_Data_Checked_Func = (data: CeCalendarTableProps[]) => ({
    type: GET_CSM_DATA_CHECKED,
    payload: data,
});

export const CSM_Data_Checked_Delete_Func = (data: CeCalendarTableProps[]) => ({
    type: GET_CSM_DATA_CHECKED_DELETE,
    payload: data,
});

export const CSM_CE_CALENDAR_CHECKED_Func = (data: CeCalendarTableProps[]) => ({
    type: GET_CSM_CE_CALENDAR_CHECKED,
    payload: data,
});

export const CSM_Data_Resister_Finished_Delete_Func = (data: CeCalendarTableProps[]) => ({
    type: CSM_DDATA_RESISTER_FINISHED_DELETE,
    payload: data,
});

const initialState: CSM_DATA_State = {
    CSM_Data: {
        loading: false,
        error: null,
        data: [],
        dataChecked: false,
        pagenumber: 0,
    },
};

const CSMDataGetting = createReducer<CSM_DATA_State, CSM_DATA_Action>(initialState, {
    [GET_CSM_Data_GET]: state => ({
        ...state,
        CSM_Data: {
            loading: true,
            error: null,
            data: [],
            dataChecked: false,
            pagenumber: 0,
        },
    }),
    [GET_CSM_Data_SUCCESS]: (state, action) => ({
        ...state,
        CSM_Data: {
            loading: false,
            error: null,
            data: action.payload.datas,
            dataChecked: true,
            pagenumber: 0,
        },
    }),
    [GET_CSM_Data_ERROR]: (state, action) => ({
        ...state,
        CSM_Data: {
            loading: false,
            error: true,
            data: [],
            dataChecked: false,
            pagenumber: 0,
        },
    }),
    [GET_CSM_DATA_CHECKED]: (state, action) => ({
        ...state,
        CSM_Data: {
            ...state.CSM_Data,
            data: action.payload,
        },
    }),
    [GET_CSM_DATA_CHECKED_DELETE]: (state, action) => ({
        ...state,
        CSM_Data: {
            ...state.CSM_Data,
            data: action.payload,
        },
    }),
    [GET_CSM_CE_CALENDAR_CHECKED]: (state, action) => ({
        ...state,
        CSM_Data: {
            ...state.CSM_Data,
            data: action.payload,
        },
    }),
    [CSM_DDATA_RESISTER_FINISHED_DELETE]: (state, action) => ({
        ...state,
        CSM_Data: {
            ...state.CSM_Data,
            data: action.payload,
        },
    }),
});

export default CSMDataGetting;

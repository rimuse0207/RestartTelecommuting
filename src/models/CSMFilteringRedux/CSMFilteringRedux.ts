const CSMFilteringRedux_GET = 'CSMFilteringRedux/CSMFilteringRedux_GET' as const;
const CSMFilterResetRedux = 'CSMFilteringRedux/CSMFilterResetRedux' as const;

export type CSMFilteringState = {
    CSMFilteringData: {
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
        finish_csm_basic_data_issue_date: string;
        start_csm_basic_data_issue_date: string;
    };
};

export const CSMFilteringAdd = (diff: CSMFilteringState) => ({
    type: CSMFilteringRedux_GET,
    payload: diff,
});
export const CSMFilteringReset = () => ({
    type: CSMFilterResetRedux,
});

type CSMFilteringAction = ReturnType<typeof CSMFilteringAdd> | ReturnType<typeof CSMFilteringReset>;

const initialState: CSMFilteringState = {
    CSMFilteringData: {
        csm_basic_data_binds: '',
        csm_basic_data_csm_key: '',
        csm_basic_data_csm_number: '',
        csm_basic_data_custom: '',
        csm_basic_data_division: '',
        csm_basic_data_etc: '',
        csm_basic_data_grade: '',
        csm_basic_data_indexs: 0,
        csm_basic_data_issue_date: '',
        csm_basic_data_model_number: '',
        csm_basic_data_part_number: '',
        csm_basic_data_state: '',
        csm_basic_data_titles: '',
        csm_basic_data_write_date: '',
        csm_calendar_apply: null,
        csm_calendar_apply_id: null,
        csm_calendar_ce: null,
        csm_calendar_ce_id: null,
        csm_calendar_csm_key: '',
        csm_calendar_custom_date: null,
        csm_calendar_custom_date_id: null,
        csm_calendar_entering: null,
        csm_calendar_entering_id: null,
        csm_calendar_finall: null,
        csm_calendar_finall_id: null,
        csm_calendar_hidden_on: 0,
        csm_calendar_indexs: 0,
        csm_calendar_pay: null,
        csm_calendar_pay_id: null,
        csm_calendar_publish: null,
        csm_calendar_publish_id: null,
        csm_calendar_status: 0,
        csm_calendar_write_date: '',
        csm_user_input_data_csm_key: null,
        csm_user_input_data_indexs: null,
        csm_user_input_data_operation_cost: null,
        csm_user_input_data_stay_days: null,
        csm_user_input_data_stay_days_cost: null,
        csm_user_input_data_total_cost: null,
        csm_user_input_data_travel_range: null,
        csm_user_input_data_travel_range_cost: null,
        csm_user_input_data_travel_time: null,
        csm_user_input_data_travel_time_cost: null,
        csm_user_input_data_working_count: null,
        csm_user_input_data_working_hours: null,
        csm_user_input_data_write_date: null,
        csm_user_input_data_writer_id: null,
        finish_csm_basic_data_issue_date: '',
        start_csm_basic_data_issue_date: '',
    },
};

function CSMFiltering(state: CSMFilteringState = initialState, action: CSMFilteringAction): CSMFilteringState {
    switch (action.type) {
        case CSMFilteringRedux_GET:
            return { CSMFilteringData: action.payload.CSMFilteringData };
        case CSMFilterResetRedux:
            return { CSMFilteringData: initialState.CSMFilteringData };
        default:
            return state;
    }
}

export default CSMFiltering;

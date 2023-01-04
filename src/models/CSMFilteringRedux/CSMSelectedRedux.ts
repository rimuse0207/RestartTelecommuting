import { CeCalendarTableProps } from '../Thunk_models/CSM_Redux_Thunk/CSM_Redux';

const CSM_SELECTED_DATA_Redux_GET = 'CSM_SELECTED_DATA_Redux_GET/CSM_SELECTED_DATA_Redux_GET' as const;
const CSM_SELECTED_DATA_RESET_GET = 'CSM_SELECTED_DATA_RESET_GET/CSM_SELECTED_DATA_RESET_GET' as const;

export const CSM_Selected_Data_List_Func = (data: CeCalendarTableProps[]) => ({
    type: CSM_SELECTED_DATA_Redux_GET,
    payload: data,
});
export const CSM_Selected_Data_List_Reset_Func = () => ({
    type: CSM_SELECTED_DATA_RESET_GET,
});

interface CSMSelectedReduxStateType {
    Csm_Selected_Data: CeCalendarTableProps[];
}

type CSMSelectedReduxAction = ReturnType<typeof CSM_Selected_Data_List_Func> | ReturnType<typeof CSM_Selected_Data_List_Reset_Func>;

const initialState: CSMSelectedReduxStateType = {
    Csm_Selected_Data: [],
};

function CSM_Selected_Data_List(
    state: CSMSelectedReduxStateType = initialState,
    action: CSMSelectedReduxAction
): CSMSelectedReduxStateType {
    switch (action.type) {
        case CSM_SELECTED_DATA_Redux_GET:
            return { Csm_Selected_Data: action.payload };
        case CSM_SELECTED_DATA_RESET_GET:
            return initialState;
        default:
            return state;
    }
}

export default CSM_Selected_Data_List;

const CSMFilteringRedux_GET = 'CSMFilteringRedux/CSMFilteringRedux_GET' as const;
const CSMFilterResetRedux = 'CSMFilteringRedux/CSMFilterResetRedux' as const;

export type CSMFilteringState = {
    CSMFilteringData: {
        state: string;
        grade: string;
        start_issue_date: string;
        finish_issue_date: string;
        CSMNumber: string;
        ModelNumber: string;
        Binds: string;
        custom: string;
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
        state: '',
        grade: '',
        start_issue_date: '',
        finish_issue_date: '',
        CSMNumber: '',
        ModelNumber: '',
        Binds: '',
        custom: '',
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

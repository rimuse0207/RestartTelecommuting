const ACCESS_REDUXGET = 'Access_Redux/ACCESS_REDUXGET' as const;
const ACCESS_REDUXERROR = 'Access_Redux/ACCESS_REDUXERROR' as const;

type AccessDataType = {
    BusinessAccess: boolean;
    BusinessAdminAccess: boolean;
};

export const GetAccessData = (data: AccessDataType) => ({
    type: ACCESS_REDUXGET,
    payload: data,
});

export const getAccessDataError = () => ({
    type: ACCESS_REDUXERROR,
});

type AccessAction = ReturnType<typeof GetAccessData> | ReturnType<typeof getAccessDataError>;

type AccessState = {
    BusinessAccess: boolean;
    BusinessAdminAccess: boolean;
};

const initialState: AccessState = {
    BusinessAccess: false,
    BusinessAdminAccess: false,
};

function Access_Control(state: AccessState = initialState, action: AccessAction): AccessState {
    switch (action.type) {
        case ACCESS_REDUXGET:
            return { ...state, BusinessAccess: action.payload.BusinessAccess, BusinessAdminAccess: action.payload.BusinessAdminAccess };
        case ACCESS_REDUXERROR:
            return initialState;
        default:
            return state;
    }
}

export default Access_Control;

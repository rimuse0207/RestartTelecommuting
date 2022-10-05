const CSM_NUMBER_DATA_GET = 'CSM_NUMBER_DATA_GET/CSM_NUMBER_DATA_GET_REDUX' as const;
const CSM_NUMBER_RESET_GET = 'CSM_NUMBER_RESET_GET/CSM_NUMBER_RESET_GET_REDUX' as const;

export type CSM_NUMBER_Types = {
    PageNumbers: number;
};

export const CSM_NUMBER_DataGetting = (data: CSM_NUMBER_Types) => ({
    type: CSM_NUMBER_DATA_GET,
    payload: data,
});

export const CSM_NUMBER_RESTING = () => ({
    type: CSM_NUMBER_RESET_GET,
});

type Nav_AccessTokenAction = ReturnType<typeof CSM_NUMBER_DataGetting> | ReturnType<typeof CSM_NUMBER_RESTING>;

const initialState: CSM_NUMBER_Types = {
    PageNumbers: 0,
};

export default function CSM_NUMBER_Tokens(state: CSM_NUMBER_Types = initialState, action: Nav_AccessTokenAction): CSM_NUMBER_Types {
    switch (action.type) {
        case CSM_NUMBER_DATA_GET:
            return action.payload;
        case CSM_NUMBER_RESET_GET:
            return initialState;
        default:
            return state;
    }
}

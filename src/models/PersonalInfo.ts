
const GETPERSONALINFO = 'PersonalInfo/GETPERSONALINFO' as const;

export const getPersionalInfo = (data: {
    name: string;
    email: string;
    team: string;
    position: string;
    loginCheck: boolean;
    id: string;
}) => ({
    type: GETPERSONALINFO,
    payload: data,
});

type PersonalInfoAction = ReturnType<typeof getPersionalInfo>;

type PersonalInfoState = {
    loginCheck: boolean;
    infomation: {
        name: string;
        email: string;
        team: string;
        position: string;
        id: string;
    };

};

const initialState: PersonalInfoState = {
    loginCheck: false,
    infomation: {
        name: '',
        email: '',
        team: '',
        position: '',
        id: '',
    },
};

function PersonalInfo(state: PersonalInfoState = initialState, action: PersonalInfoAction): PersonalInfoState {
    switch (action.type) {
        case GETPERSONALINFO:
            return {
                loginCheck: true,
                infomation: action.payload,
            };
        default:
            return state;
    }
}

export default PersonalInfo;

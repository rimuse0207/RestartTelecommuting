import crypto from 'crypto-js';

const ciphertext = (datas: string) => {
    const keys: any = `${process.env.REACT_APP_SECRETKEY}`;
    return crypto.AES.encrypt(datas, keys).toString();
};

const GETPERSONALINFO = 'PersonalInfo/GETPERSONALINFO' as const;
const LOGOUTSESSIONOFF = 'PersonalInfo/LOGOUTSESSIONOFF' as const;

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

export const getPersionalLOGOUT = () => ({
    type: LOGOUTSESSIONOFF,
});

type PersonalInfoAction = ReturnType<typeof getPersionalInfo> | ReturnType<typeof getPersionalLOGOUT>;

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
                infomation: {
                    name: ciphertext(action.payload.name),
                    email: ciphertext(action.payload.id),
                    team: action.payload.team,
                    position: action.payload.position,
                    id: ciphertext(action.payload.id),
                },
            };
        case LOGOUTSESSIONOFF:
            return initialState;
        default:
            return state;
    }
}

export default PersonalInfo;

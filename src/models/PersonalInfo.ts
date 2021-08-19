const GETPERSONALINFO = "PersonalInfo/GETPERSONALINFO" as const;



export const getPersionalInfo = (data: { name: string, email: string, team: string, position: string, loginCheck: boolean }) => ({
    type: GETPERSONALINFO,
    payload: data
});



type PersonalInfoAction =
    | ReturnType<typeof getPersionalInfo>


type PersonalInfoState = {
    loginCheck: boolean,
    infomation: {
        name: string,
        email: string,
        team: string,
        position: string,
    }

};


const initialState: PersonalInfoState = {
    loginCheck: false,
    infomation: {
        name: "",
        email: "",
        team: "",
        position: "",

    }

};

function PersonalInfo(
    state: PersonalInfoState = initialState,
    action: PersonalInfoAction
): PersonalInfoState {
    switch (action.type) {
        case GETPERSONALINFO:
            return {
                loginCheck: true,
                infomation: action.payload
            };
        default:
            return state;
    }
}

export default PersonalInfo;
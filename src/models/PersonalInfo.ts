const GETPERSONALINFO = "PersonalInfo/GETPERSONALINFO" as const;



export const getPersionalInfo = (data: { name: string, email: string, team: string, position: string }) => ({
    type: GETPERSONALINFO,
    payload: data
});



type PersonalInfoAction =
    | ReturnType<typeof getPersionalInfo>


type PersonalInfoState = {
    infomation: {
        name: string,
        email: string,
        team: string,
        position: string,
    }

};


const initialState: PersonalInfoState = {
    infomation: {
        name: "",
        email: "",
        team: "",
        position: ""
    }

};

function PersonalInfo(
    state: PersonalInfoState = initialState,
    action: PersonalInfoAction
): PersonalInfoState {
    switch (action.type) {
        case GETPERSONALINFO:
            return { infomation: action.payload };
        default:
            return state;
    }
}

export default PersonalInfo;
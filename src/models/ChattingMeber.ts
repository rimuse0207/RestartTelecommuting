const CHATTING_MEMBERS = "Socket/CHATTING_MEMBERS" as const;

export const getChatting_members = (members: []) => ({
    type: CHATTING_MEMBERS,
    payload: members
})

type Chatting_member_Action =
    | ReturnType<typeof getChatting_members>


type Chatting_member_State = {
    members: [],
};


const initialState: Chatting_member_State = {
    members: [],
};


function ChattingMember(
    state: Chatting_member_State = initialState,
    action: Chatting_member_Action
): Chatting_member_State {
    switch (action.type) {
        case CHATTING_MEMBERS:
            return { members: action.payload };
        default:
            return state;
    }
}

export default ChattingMember;
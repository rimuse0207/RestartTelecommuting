const PLUSBUTTON = 'REDUXTESTFILE/PLUSBUTTON' as const;
const ACTIONBUTTON = 'REDUXTESTFILE/ACTIONBUTTON' as const;
const SOCKETCONNECTED = 'REDUXTESTFILE/SOCKETCONNECTED' as const;

export const PlusNumbering = () => ({
    type: PLUSBUTTON,
});

export const RandomNumbering = (numbers: number) => ({
    type: ACTIONBUTTON,
    payload: numbers,
});

export const SocketsConnect = (socketPath: any) => ({
    type: SOCKETCONNECTED,
    payload: socketPath,
});

type InitialState = {
    datas: number;
    sockets: any;
};
type ActionTypes = ReturnType<typeof PlusNumbering> | ReturnType<typeof RandomNumbering> | ReturnType<typeof SocketsConnect>;
const initialState: InitialState = {
    datas: 10,
    sockets: {},
};

function numberingTest(state: InitialState = initialState, action: ActionTypes) {
    switch (action.type) {
        case PLUSBUTTON: {
            return { datas: state.datas + 1 };
        }
        case ACTIONBUTTON: {
            return { datas: state.datas + action.payload };
        }
        case SOCKETCONNECTED: {
            return { sockets: action.payload };
        }
        default:
            return state;
    }
}

export default numberingTest;

import socketio from "socket.io-client"
const GETSOCKET = "Socket/GETSOCKET" as const;



export const getSocket = (socket: any) => ({
    type: GETSOCKET,
    payload: socket
});



type CounterAction =
    | ReturnType<typeof getSocket>


type CounterState = {
    socket: any,

};


const initialState: CounterState = {
    socket: socketio(`${process.env.REACT_APP_API_URL}`),

};

function Socket(
    state: CounterState = initialState,
    action: CounterAction
): CounterState {
    switch (action.type) {
        case GETSOCKET:
            return { socket: action.payload };
        default:
            return state;
    }
}

export default Socket;
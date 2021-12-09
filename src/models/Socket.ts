import socketio from 'socket.io-client';

const GETSOCKET = 'Socket/GETSOCKET' as const;
const LOGOUTSOCKET = 'Socket/LOGOUTSOCKET' as const;

export const getSocket = (sockets: any) => ({
    type: GETSOCKET,
    payload: sockets,
});
export const getSessionLOGOUT = () => ({
    type: LOGOUTSOCKET,
});
// const getDataSocket = () => {
//     try {
//         const sockets = socketio(`${process.env.REACT_APP_API_URL}`);
//         console.log(sockets);
//         return sockets;
//     } catch (error) {
//         console.log(error);
//     }
// };

type SocketAction = ReturnType<typeof getSocket> | ReturnType<typeof getSessionLOGOUT>;

type SocketState = {
    socket: any;
};

const initialState: SocketState = {
    socket: {},
};

function Socket(state: SocketState = initialState, action: SocketAction): SocketState {
    switch (action.type) {
        case GETSOCKET:
            return { socket: action.payload };
        case LOGOUTSOCKET:
            return { socket: initialState };
        default:
            return state;
    }
}

export default Socket;

import socketio from 'socket.io-client';

const GETSOCKET = 'Socket/GETSOCKET' as const;

export const getSocket = (socket: any) => ({
    type: GETSOCKET,
    payload: socket,
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

type SocketAction = ReturnType<typeof getSocket>;

type SocketState = {
    socket: any;
};

const initialState: SocketState = {
    socket: socketio(`${process.env.REACT_APP_API_URL}`),
};

function Socket(state: SocketState = initialState, action: SocketAction): SocketState {
    switch (action.type) {
        case GETSOCKET:
            return { socket: action.payload };
        default:
            return state;
    }
}

export default Socket;

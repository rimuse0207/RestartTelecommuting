import React, { useEffect, useRef, useState } from 'react';
import { DecryptKey } from '../../config';
import { useSelector } from 'react-redux';
import { RootState } from '../../models/index';

type ConnectedPeopleShowProps = {
    socket: any;
};

const ConnectedPeopleShow = ({ socket }: ConnectedPeopleShowProps) => {
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const checkedCheck = useRef<any>('null');
    const [connectNow, setConnectNow] = useState([]);
    const [checkBoxBelong, setCheckBoxBelong] = useState<any>([]);

    useEffect(() => {
        socket.emit('getConnectedPeople', {});
        socket.on('getConnectedPeople', (data: any) => {
            console.log(data.data);
            setConnectNow(data.data);
        });
    }, [socket]);

    const handleChanges = (
        e: React.ChangeEvent<HTMLInputElement>,
        data: { name: string; team: string; connect_socket_id: string; company: string; connect_id: string }
    ) => {
        if (e.target.checked) {
            const checked = [{ name: data.name, socketsID: data.connect_socket_id, id: data.connect_id }];
            setCheckBoxBelong(checkBoxBelong.concat(checked));
        } else {
            setCheckBoxBelong(checkBoxBelong.filter((user: { id: string }) => user.id !== data.connect_id));
        }
    };

    const handleClicks = () => {
        socket.emit('VideoTeleCall', {
            checkBoxBelong,
            senderId: DecryptKey(InfomationState.id),
            senderName: DecryptKey(InfomationState.name),
        });
        window.open(`https://192.168.2.241/${DecryptKey(InfomationState.id).split('@')[0]}`);
    };

    return (
        <div style={{ width: '80%', margin: '0 auto', height: '100%' }}>
            <div>
                <div>
                    <div>
                        <ul>
                            {connectNow.map(
                                (
                                    list: { name: string; team: string; connect_socket_id: string; company: string; connect_id: string },
                                    i
                                ) => {
                                    return (
                                        <li key={list.connect_socket_id}>
                                            <input
                                                ref={checkedCheck}
                                                className="CheckedChecked"
                                                type="checkbox"
                                                onChange={e => handleChanges(e, list)}
                                                readOnly
                                            />
                                            <span>{list.name}</span>
                                            <span>{list.team}</span>
                                            <span>{list.company}</span>
                                        </li>
                                    );
                                }
                            )}
                        </ul>
                    </div>
                </div>
                <div>
                    <button onClick={handleClicks}>초대하기</button>
                </div>
            </div>
        </div>
    );
};

export default ConnectedPeopleShow;

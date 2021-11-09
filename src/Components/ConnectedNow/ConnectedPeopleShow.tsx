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
                        <h2>DHKS</h2>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                            <thead>
                                <tr>
                                    <th style={{ border: 'none' }}></th>
                                    <th style={{ border: 'none' }}>이름</th>
                                    <th style={{ border: 'none' }}>부서</th>
                                    <th style={{ border: 'none' }}>직위</th>
                                </tr>
                            </thead>
                            <tbody>
                                {connectNow
                                    .filter((item: { company: string }) => item.company.includes('DHKS'))
                                    .map(
                                        (
                                            list: {
                                                name: string;
                                                team: string;
                                                connect_socket_id: string;
                                                company: string;
                                                connect_id: string;
                                                position: string;
                                            },
                                            i
                                        ) => {
                                            return (
                                                <tr key={list.connect_socket_id}>
                                                    <td>
                                                        <input
                                                            ref={checkedCheck}
                                                            className="CheckedChecked"
                                                            type="checkbox"
                                                            onChange={e => handleChanges(e, list)}
                                                            readOnly
                                                        />
                                                    </td>
                                                    <td>{list.name}</td>
                                                    <td>{list.team}팀</td>
                                                    <td>{list.position}</td>
                                                </tr>
                                            );
                                        }
                                    )}
                            </tbody>
                        </table>
                    </div>
                    <div style={{ marginTop: '50px' }}>
                        <h2>EXICON</h2>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                            <thead>
                                <tr>
                                    <th style={{ border: 'none' }}></th>
                                    <th style={{ border: 'none' }}>이름</th>
                                    <th style={{ border: 'none' }}>부서</th>
                                    <th style={{ border: 'none' }}>직위</th>
                                </tr>
                            </thead>
                            <tbody>
                                {connectNow
                                    .filter((item: { company: string }) => item.company.includes('EXICON'))
                                    .map(
                                        (
                                            list: {
                                                name: string;
                                                team: string;
                                                connect_socket_id: string;
                                                company: string;
                                                connect_id: string;
                                                position: string;
                                            },
                                            i
                                        ) => {
                                            return (
                                                <tr key={list.connect_socket_id}>
                                                    <td>
                                                        <input
                                                            ref={checkedCheck}
                                                            className="CheckedChecked"
                                                            type="checkbox"
                                                            onChange={e => handleChanges(e, list)}
                                                            readOnly
                                                        />
                                                    </td>
                                                    <td>{list.name}</td>
                                                    <td>{list.team}팀</td>
                                                    <td>{list.position}</td>
                                                </tr>
                                            );
                                        }
                                    )}
                            </tbody>
                        </table>
                    </div>
                    <div style={{ marginTop: '50px' }}>
                        <h2>YIKC</h2>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                            <thead>
                                <tr>
                                    <th style={{ border: 'none' }}></th>
                                    <th style={{ border: 'none' }}>이름</th>
                                    <th style={{ border: 'none' }}>부서</th>
                                    <th style={{ border: 'none' }}>직위</th>
                                </tr>
                            </thead>
                            <tbody>
                                {connectNow
                                    .filter((item: { company: string }) => item.company.includes('YIKC'))
                                    .map(
                                        (
                                            list: {
                                                name: string;
                                                team: string;
                                                connect_socket_id: string;
                                                company: string;
                                                connect_id: string;
                                                position: string;
                                            },
                                            i
                                        ) => {
                                            return (
                                                <tr key={list.connect_socket_id}>
                                                    <td>
                                                        <input
                                                            ref={checkedCheck}
                                                            className="CheckedChecked"
                                                            type="checkbox"
                                                            onChange={e => handleChanges(e, list)}
                                                            readOnly
                                                        />
                                                    </td>
                                                    <td>{list.name}</td>
                                                    <td>{list.team}팀</td>
                                                    <td>{list.position}</td>
                                                </tr>
                                            );
                                        }
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div style={{ marginTop: '50px', margin: '50px auto', width: '40%' }}>
                    <button style={{ width: '100%', height: '40px', fontWeight: 'bolder', fontSize: '1.1em' }} onClick={handleClicks}>
                        호출
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConnectedPeopleShow;

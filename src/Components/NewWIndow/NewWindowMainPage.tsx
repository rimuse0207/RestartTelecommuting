import React from 'react';

const NewWindowMainPage = ({ match }: any) => {
    return (
        <div>
            <div>
                <div
                    style={{
                        width: '80%',
                        margin: '0 auto',
                        marginTop: '100px',
                        height: '70vh',
                        border: '1px solid black',
                        borderRadius: '10px',
                    }}
                >
                    <div style={{ padding: '30px' }}>
                        <div style={{ marginBottom: '30px' }}>
                            <h1>{match.params.key2}님이 화상회의에 호출 하였습니다.</h1>
                        </div>
                        <div>
                            <h2>화상 회의에 참여를 위해서는</h2>
                        </div>
                        <div>
                            <h2>하단의 버튼을 클릭해 주세요.</h2>
                            <div style={{ marginTop: '30px' }}>
                                {match.params.key1.split('@')[1] === 'dhk.co.kr' ? (
                                    <a href={`https://ecomet11.disco.co.jp/${match.params.key1.split('@')[0]}`}>
                                        <button style={{ width: '50%', fontSize: '1.5em', fontWeight: 'bolder', height: '50px' }}>
                                            화상 회의에 참가
                                        </button>
                                    </a>
                                ) : (
                                    <a href={`https://meet.jit.si/${match.params.key1.split('@')[0]}`}>
                                        <button style={{ width: '50%', fontSize: '1.5em', fontWeight: 'bolder', height: '50px' }}>
                                            화상 회의에 참가
                                        </button>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default NewWindowMainPage;

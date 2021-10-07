import React from 'react';
import moment from 'moment';
type TeleSelectClickModalProps = {
    clicksTitle: string;
    clicksData: any | null;
    modalClose: () => void;
};

const TeleSelectClickModal = ({ clicksTitle, clicksData, modalClose }: TeleSelectClickModalProps) => {
    console.log(clicksData);
    const handleDataClick = () => {
        modalClose();
    };
    return (
        <div>
            <div>
                <table style={{ fontWeight: 'bolder', width: '100%' }}>
                    <thead>
                        <tr>
                            <th style={{ width: '150px' }}>구분</th>
                            <th>재택근무 조회</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ textAlign: 'center' }}>이름</td>
                            <td style={{ padding: '15px' }}>{clicksData.name}</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' }}>재택일자</td>
                            <td style={{ padding: '15px' }}>{moment(clicksData.day).format('YYYY년 MM월 DD일')}</td>
                        </tr>

                        <tr>
                            <td style={{ textAlign: 'center' }}></td>
                            <td style={{ padding: '15px' }}>{clicksData.equipment}</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' }}></td>
                            <td style={{ padding: '15px' }}>{clicksData.filename}</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' }}></td>
                            <td style={{ padding: '15px' }}>{clicksData.ownership}</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' }}>업무 일지</td>
                            <td style={{ padding: '15px' }}><pre>{clicksData.work}</pre></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style={{ width: '100%', textAlign: 'end', paddingRight: '30px', marginTop: '30px' }}>
                {clicksData.approve === 0 ? (
                    <button className="TeamLeaderAcceptDesc" onClick={handleDataClick}>
                        승인하기
                    </button>
                ) : (
                    '승인 완료.'
                )}
            </div>
        </div>
    );
};

export default TeleSelectClickModal;

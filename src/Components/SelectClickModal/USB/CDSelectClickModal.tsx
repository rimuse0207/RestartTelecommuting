import React from 'react';
import moment from 'moment';
type SelectClickModalProps = {
    clicksTitle: string;
    clicksData: any | null;
    modalClose: () => void;
};

const SelectClickModal = ({ clicksTitle, clicksData, modalClose }: SelectClickModalProps) => {
    const handleDataClick = () => {
        modalClose();
    };
    return (
        <div>
            <div>
                <table style={{ fontWeight: 'bolder', width: '100%' }}>
                    <thead>
                        <tr>
                            <th style={{ maxWidth: '150px' }}>구분</th>
                            <th>USB/CD 신청 조회</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ textAlign: 'center' }}>이름</td>
                            <td style={{ padding: '15px' }}>{clicksData.name}</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' }}>사용일자</td>
                            <td style={{ padding: '15px' }}>{moment(clicksData.workdate).format('YYYY년 MM월 DD일')}</td>
                        </tr>

                        <tr>
                            <td style={{ textAlign: 'center' }}>장비</td>
                            <td style={{ padding: '15px' }}>{clicksData.equipment}</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' }}>파일명</td>
                            <td style={{ padding: '15px' }}>{clicksData.filename}</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' }}>USB소유</td>
                            <td style={{ padding: '15px' }}>{clicksData.ownership}</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' }}>사용사유</td>
                            <td style={{ padding: '15px' }}>{clicksData.text}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style={{ width: '100%', textAlign: 'end', paddingRight: '30px', marginTop: '30px' }}>
                {clicksData.leadercheck === 0 ? (
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

export default SelectClickModal;

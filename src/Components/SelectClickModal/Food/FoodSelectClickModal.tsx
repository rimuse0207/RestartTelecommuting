import React from 'react';
import moment from 'moment';
type FoodSelectClickModalProps = {
    clicksTitle: string;
    clicksData: any | null;
    modalClose: () => void;
};

const FoodSelectClickModal = ({ clicksTitle, clicksData, modalClose }: FoodSelectClickModalProps) => {
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
                            <th>식대정산 조회</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ textAlign: 'center' }}>이름</td>
                            <td style={{ padding: '15px' }}>{clicksData.name}</td>
                        </tr>

                        <tr>
                            <td style={{ textAlign: 'center' }}>팀명</td>
                            <td style={{ padding: '15px' }}>{clicksData.department}</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' }}>식대 일자</td>
                            <td style={{ padding: '15px' }}>{moment(clicksData.dates).format('YYYY년 MM월 DD일')}</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' }}>구분</td>
                            <td style={{ padding: '15px' }}>{clicksData.division}</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' }}>장소</td>
                            <td style={{ padding: '15px' }}>{clicksData.place}</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' }}>위치</td>
                            <td style={{ padding: '15px' }}>{clicksData.location}</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' }}>식사 금액</td>
                            <td style={{ padding: '15px' }}>{clicksData.spending}원</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' }}>정산 금액</td>
                            <td style={{ padding: '15px' }}>{clicksData.calculate}원</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' }}>비고</td>
                            <td style={{ padding: '15px' }}></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style={{ width: '100%', textAlign: 'end', paddingRight: '30px', marginTop: '30px' }}>
                {clicksData.approve !== 0 ? (
                    <button className="TeamLeaderAcceptDesc" onClick={handleDataClick}>
                        닫기
                    </button>
                ) : (
                    '승인 완료.'
                )}
            </div>
        </div>
    );
};

export default FoodSelectClickModal;

import React from 'react';
import moment from 'moment';

type PersonalApplyProps = {
    startDate: string | null;
};

const PersonalApply = ({ startDate }: PersonalApplyProps) => {
    return (
        <div>
            <h2>{startDate ? moment(startDate).format('YYYY년 MM월 DD일 ').toString() : '날짜를 선택해 주세요.'} </h2>
            <div>
                <div>신청 현황 조회</div>
                <div>
                    이름: 유성재 <span>사원</span>
                </div>
                <div>팀: 경영지원</div>
                <div></div>
            </div>
        </div>
    );
};

export default PersonalApply;

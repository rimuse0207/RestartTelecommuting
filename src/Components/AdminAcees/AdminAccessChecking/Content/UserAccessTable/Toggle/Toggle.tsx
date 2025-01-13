import { useState } from 'react';
import styled from 'styled-components';
import { UserAccess_Table_State_Types } from '../UserAccessTable';
import { Axios_Get_Moduls, Axios_Post_Moduls } from '../../../../../API/indexs';

const ToggleContainer = styled.div`
    cursor: pointer;
    position: relative;
    width: fit-content;
    cursor: pointer;

    > .toggle-container {
        width: 50px;
        height: 24px;
        border-radius: 30px;
        background-color: rgb(233, 233, 234);
    }
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
    > .toggle--checked {
        background-color: rgb(0, 200, 102);
        transition: 0.5s;
    }

    > .toggle-circle {
        position: absolute;
        top: 1px;
        left: 1px;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background-color: rgb(255, 254, 255);
        transition: 0.5s;
        //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
    }
    > .toggle--checked {
        left: 27px;
        transition: 0.5s;
    }
`;

type TogglePropsTypes = {
    isOn: Boolean;
    Select_Data: UserAccess_Table_State_Types;
    Select_Menu: String;
    Getting_UserAccessTable_Data_Axios_Func: () => void;
};

const Toggle = ({ isOn, Select_Data, Select_Menu, Getting_UserAccessTable_Data_Axios_Func }: TogglePropsTypes) => {
    const toggleHandler = async () => {
        // isOn의 상태를 변경하는 메소드를 구현
        // Change_Room_Info_State();
        const Changed_UserAccessTable_Data_Axios = await Axios_Post_Moduls('/users/Changed_UserAccessTable_Data_Axios', {
            Select_Data,
            Select_Menu,
        });
        if (Changed_UserAccessTable_Data_Axios) {
            Getting_UserAccessTable_Data_Axios_Func();
        }
    };

    return (
        <div>
            <ToggleContainer
                // 클릭하면 토글이 켜진 상태(isOn)를 boolean 타입으로 변경하는 메소드가 실행
                onClick={toggleHandler}
            >
                {/* 아래에 div 엘리먼트 2개가 있다. 각각의 클래스를 'toggle-container', 'toggle-circle' 로 지정 */}
                {/* Toggle Switch가 ON인 상태일 경우에만 toggle--checked 클래스를 div 엘리먼트 2개에 모두 추가. 조건부 스타일링을 활용*/}
                <div className={`toggle-container ${isOn ? 'toggle--checked' : null}`} />
                <div className={`toggle-circle ${isOn ? 'toggle--checked' : null}`} />
            </ToggleContainer>
            {/* Desc 컴포넌트를 활용*/}
            {/* Toggle Switch가 ON인 상태일 경우에 Desc 컴포넌트 내부의 텍스트를 'Toggle Switch ON'으로, 그렇지 않은 경우 'Toggle Switch OFF'. 조건부 렌더링을 활용. */}
            {isOn === false ? <div className="OFF"></div> : <div className="ON"></div>}
        </div>
    );
};

export default Toggle;

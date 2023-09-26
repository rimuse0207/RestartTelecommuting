const NAV_ACCESS_DATA_GET = 'NAV_ACCESS_DATA_GET/NAV_ACCESS_DATA_GET_REDUX' as const;
const NAV_ACCESS_RESET_GET = 'NAV_ACCESS_RESET_GET/NAV_ACCESS_RESET_GET_REDUX' as const;

export type Nav_AccessTokenTypes = {
    id: string;
    indexs: number;
    Nav_TeamLeaderCalendarAccess: number;
    Nav_TeamLeaderTeleAccess: number;
    Nav_TeamLeaderOTAccess: number;
    Nav_TeamLeaderBusinessAccess: number;
    Nav_TeamLeaderBusinessExcelAccess: number;
    Nav_TeamLeaderMonthOTAccess: number;
    Nav_TeamLeaderFoodAccess: number;
    TeleLeaderAccess: number;
    BeforeOTLeaderAccess: number;
    AfterOTLeaderAccess: number;
    FoodLeaderAccess: number;
    USBApplyLeaderAccess: number;
    BusinessAccess: number;
    BusinessAdminAccess: number;
    CSM_Master_Access: number;
    PersonAdminAccess: number;
};

export const NavDataGetting = (data: Nav_AccessTokenTypes) => ({
    type: NAV_ACCESS_DATA_GET,
    payload: data,
});

export const NavResetGetting = () => ({
    type: NAV_ACCESS_RESET_GET,
});

type Nav_AccessTokenAction = ReturnType<typeof NavDataGetting> | ReturnType<typeof NavResetGetting>;

const initialState: Nav_AccessTokenTypes = {
    id: '',
    indexs: 0,
    Nav_TeamLeaderCalendarAccess: 0,
    Nav_TeamLeaderTeleAccess: 0,
    Nav_TeamLeaderOTAccess: 0,
    Nav_TeamLeaderBusinessAccess: 0,
    Nav_TeamLeaderBusinessExcelAccess: 0,
    Nav_TeamLeaderMonthOTAccess: 0,
    Nav_TeamLeaderFoodAccess: 0,
    TeleLeaderAccess: 0,
    BeforeOTLeaderAccess: 0,
    AfterOTLeaderAccess: 0,
    FoodLeaderAccess: 0,
    USBApplyLeaderAccess: 0,
    BusinessAccess: 0,
    BusinessAdminAccess: 0,
    CSM_Master_Access: 0,
    PersonAdminAccess: 0,
};

export default function Nav_AccessTokens(state: Nav_AccessTokenTypes = initialState, action: Nav_AccessTokenAction): Nav_AccessTokenTypes {
    switch (action.type) {
        case NAV_ACCESS_DATA_GET:
            return action.payload;
        case NAV_ACCESS_RESET_GET:
            return initialState;
        default:
            return state;
    }
}

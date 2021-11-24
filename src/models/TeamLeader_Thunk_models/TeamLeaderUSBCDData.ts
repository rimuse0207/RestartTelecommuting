import axios, { AxiosError } from 'axios';
import { DecryptKey } from '../../config';
import moment from 'moment';
import { RootState } from '../../models/index';
import { createAsyncAction, createReducer } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

interface USBCDDataTypes {
    applydate: string;
    email: string;
    equipment: string;
    filename: string;
    leadercheck: number;
    name: string;
    number: number;
    ownership: string;
    team: string;
    text: string;
    workdate: string;
}

const TeamLeader_GET_USBCDData_GET = 'TeamLeader_USBCDData/TeamLeader_GET_USBCDData_GET';
const TeamLeader_GET_USBCDData_SUCCESS = 'TeamLeader_USBCDData/TeamLeader_GET_USBCDData_SUCCESS';
const TeamLeader_GET_USBCDData_ERROR = 'TeamLeader_USBCDData/TeamLeader_GET_USBCDData_ERROR';
const TeamLeader_USBCDData_Show_FALSE = 'TeamLeader_USBCDData/TeamLeader_USBCDData_Show_FALSE';
const TeamLeader_USBCDData_Show_TRUE = 'TeamLeader_USBCDData/TeamLeader_USBCDData_Show_TRUE';

const TeamLeader_getUSBCDDataAsync = createAsyncAction(
    TeamLeader_GET_USBCDData_GET,
    TeamLeader_GET_USBCDData_SUCCESS,
    TeamLeader_GET_USBCDData_ERROR
)<undefined, USBCDDataTypes, AxiosError>();

const getDataUSBCDApply = async (getMoment: {}, InfomationState: { id: string; team: string; name: string }) => {
    // try {
    //     const dataget = await axios.post(`${process.env.REACT_APP_API_URL}/USB_app_server/TeamLeader_Data_get_USBApply`, {
    //         id: DecryptKey(InfomationState.id),
    //         team: InfomationState.team,
    //         name: DecryptKey(InfomationState.name),
    //         selectDate: moment(getMoment).format('YYYY-MM'),
    //     });

    //     return dataget.data.data;
    // } catch (error) {
    //     console.log(error);
    // }

    try {
        const USBdataget = await axios.get(`${process.env.REACT_APP_API_URL}/USB_app_server/TeamLeader_Data_get_USBApply`, {
            params: {
                selectDate: moment(getMoment).format('YYYY-MM'),
            },
            headers: {
                Authorization: sessionStorage.getItem('DHKS_TOKEN'),
            },
        });

        return USBdataget.data.data;
    } catch (error) {
        console.log(error);
    }
};
const actions = {
    TeamLeader_GET_USBCDData_GET,
    TeamLeader_GET_USBCDData_SUCCESS,
    TeamLeader_GET_USBCDData_ERROR,
    TeamLeader_USBCDData_Show_FALSE,
    TeamLeader_USBCDData_Show_TRUE,
};
// type GithubAction = ActionType<typeof GET_FoodData_GET> | ActionType<typeof GET_FoodData_SUCCESS> | ActionType<typeof GET_FoodData_ERROR> | ActionType<any>
type GithubAction = ActionType<typeof actions> | ActionType<any>;

type GithubState = {
    TeamLeader_USBCDDatas: {
        loading: boolean;
        error: Error | null;
        data: USBCDDataTypes | any;
        dataChecked: boolean;
    };
};

export function TeamLeader_getUSBCDThunk(
    getMoment: {},
    InfomationState: { id: string; team: string; name: string }
): ThunkAction<void, RootState, null, GithubAction> {
    return async dispatch => {
        const { request, success, failure } = TeamLeader_getUSBCDDataAsync;
        dispatch(request());
        try {
            const userProfile = await getDataUSBCDApply(getMoment, InfomationState);
            if (userProfile) {
                dispatch(success(userProfile));
            }
        } catch (e: any) {
            dispatch(failure(e));
        }
    };
}
export const USBCDDataShowCheckedFalse = () => ({
    type: TeamLeader_USBCDData_Show_FALSE,
});
export const USBCDDataShowCheckedTrue = () => ({
    type: TeamLeader_USBCDData_Show_TRUE,
});

const initialState: GithubState = {
    TeamLeader_USBCDDatas: {
        loading: false,
        error: null,
        data: [],
        dataChecked: false,
    },
};

const TeamLeaderUSBCDDataGetting = createReducer<GithubState, GithubAction>(initialState, {
    [TeamLeader_GET_USBCDData_GET]: state => ({
        ...state,
        TeamLeader_USBCDDatas: {
            loading: true,
            error: null,
            data: [],
            dataChecked: false,
        },
    }),
    [TeamLeader_GET_USBCDData_SUCCESS]: (state, action) => ({
        ...state,
        TeamLeader_USBCDDatas: {
            loading: false,
            error: null,
            data: action.payload,
            dataChecked: true,
        },
    }),
    [TeamLeader_GET_USBCDData_ERROR]: (state, action) => ({
        ...state,
        TeamLeader_USBCDDatas: {
            loading: false,
            error: action.payload,
            data: [],
            dataChecked: false,
        },
    }),
    [TeamLeader_USBCDData_Show_FALSE]: state => ({
        ...state,
        TeamLeader_USBCDDatas: {
            ...state.TeamLeader_USBCDDatas,
            dataChecked: false,
        },
    }),
    [TeamLeader_USBCDData_Show_TRUE]: state => ({
        ...state,
        TeamLeader_USBCDDatas: {
            ...state.TeamLeader_USBCDDatas,
            dataChecked: true,
        },
    }),
});

export default TeamLeaderUSBCDDataGetting;

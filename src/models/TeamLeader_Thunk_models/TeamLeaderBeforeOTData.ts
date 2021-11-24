import axios, { AxiosError } from 'axios';
import { DecryptKey } from '../../config';
import moment from 'moment';
import { RootState } from '../../models/index';
import { createAsyncAction, createReducer } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

interface BeforeOTDataTypes {
    indexs: number;
    dates: string;
    division: string;
    spending: number;
    calculate: number;
    place: string;
    location: string;
    etc: string;
    name: string;
    department: string;
    id: string;
    months: string;
}

const GET_TeamLeader_BEFOREOTData_GET = 'TeamLeader_BEFOREOTData/GET_TeamLeader_BEFOREOTData_GET';
const GET_TeamLeader_BEFOREOTData_SUCCESS = 'TeamLeader_BEFOREOTData/GET_TeamLeader_BEFOREOTData_SUCCESS';
const GET_TeamLeader_BEFOREOTData_ERROR = 'TeamLeader_BEFOREOTData/GET_TeamLeader_BEFOREOTData_ERROR';
const TeamLeader_BEFOREOTData_Show_FALSE = 'TeamLeader_BEFOREOTData/TeamLeader_BEFOREOTData_Show_FALSE';
const TeamLeader_BEFOREOTData_Show_TRUE = 'TeamLeader_BEFOREOTData/TeamLeader_BEFOREOTData_Show_TRUE';

const getTeamLeaderBeforeOTDataAsync = createAsyncAction(
    GET_TeamLeader_BEFOREOTData_GET,
    GET_TeamLeader_BEFOREOTData_SUCCESS,
    GET_TeamLeader_BEFOREOTData_ERROR
)<undefined, BeforeOTDataTypes, AxiosError>();

const getTemLeader_DataBeforeOTApply = async (getMoment: {}, InfomationState: { id: string; team: string; name: string }) => {
    try {
        // const dataget = await axios.post(`${process.env.REACT_APP_API_URL}/OT_app_server/TeamLeader_BeforeOT_get_data`, {
        //     id: DecryptKey(InfomationState.id),
        //     team: InfomationState.team,
        //     name: DecryptKey(InfomationState.name),
        //     selectDate: moment(getMoment).format('YYYY-MM'),
        // });
        const BeforeOTdataget = await axios.get(`${process.env.REACT_APP_API_URL}/OT_app_server/TeamLeader_BeforeOT_get_data`, {
            params: {
                selectDate: moment(getMoment).format('YYYY-MM'),
            },
            headers: {
                Authorization: sessionStorage.getItem('DHKS_TOKEN'),
            },
        });
        return BeforeOTdataget.data.data;
    } catch (error) {
        console.log(error);
    }
};
const actions = {
    GET_TeamLeader_BEFOREOTData_GET,
    GET_TeamLeader_BEFOREOTData_SUCCESS,
    GET_TeamLeader_BEFOREOTData_ERROR,
    TeamLeader_BEFOREOTData_Show_FALSE,
    TeamLeader_BEFOREOTData_Show_TRUE,
};

type GithubAction = ActionType<typeof actions> | ActionType<any>;

type GithubState = {
    TeamLeader_BeforeOTDatas: {
        loading: boolean;
        error: Error | null;
        data: BeforeOTDataTypes | any;
        dataChecked: boolean;
    };
};

export function getTeamLeaderBEFOREOTdataThunk(
    getMoment: {},
    InfomationState: { id: string; team: string; name: string }
): ThunkAction<void, RootState, null, GithubAction> {
    return async dispatch => {
        const { request, success, failure } = getTeamLeaderBeforeOTDataAsync;
        dispatch(request());
        try {
            const userProfile = await getTemLeader_DataBeforeOTApply(getMoment, InfomationState);
            if (userProfile) {
                dispatch(success(userProfile));
            }
        } catch (e: any) {
            dispatch(failure(e));
        }
    };
}
export const TeamLeader_BeforeOTDataShowCheckedFalse = () => ({
    type: TeamLeader_BEFOREOTData_Show_FALSE,
});
export const TeamLeader_BeforeOTShowCheckedTrue = () => ({
    type: TeamLeader_BEFOREOTData_Show_TRUE,
});

const initialState: GithubState = {
    TeamLeader_BeforeOTDatas: {
        loading: false,
        error: null,
        data: [],
        dataChecked: false,
    },
};

const TeamLeaderBeforeOTData = createReducer<GithubState, GithubAction>(initialState, {
    [GET_TeamLeader_BEFOREOTData_GET]: state => ({
        ...state,
        TeamLeader_BeforeOTDatas: {
            loading: true,
            error: null,
            data: [],
            dataChecked: false,
        },
    }),
    [GET_TeamLeader_BEFOREOTData_SUCCESS]: (state, action) => ({
        ...state,
        TeamLeader_BeforeOTDatas: {
            loading: false,
            error: null,
            data: action.payload,
            dataChecked: true,
        },
    }),
    [GET_TeamLeader_BEFOREOTData_ERROR]: (state, action) => ({
        ...state,
        TeamLeader_BeforeOTDatas: {
            loading: false,
            error: action.payload,
            data: [],
            dataChecked: false,
        },
    }),
    [TeamLeader_BEFOREOTData_Show_FALSE]: state => ({
        ...state,
        TeamLeader_BeforeOTDatas: {
            ...state.TeamLeader_BeforeOTDatas,
            dataChecked: false,
        },
    }),
    [TeamLeader_BEFOREOTData_Show_TRUE]: state => ({
        ...state,
        TeamLeader_BeforeOTDatas: {
            ...state.TeamLeader_BeforeOTDatas,
            dataChecked: true,
        },
    }),
});

export default TeamLeaderBeforeOTData;

import axios, { AxiosError } from 'axios';
import { DecryptKey } from '../../config';
import moment from 'moment';
import { RootState } from '../../models/index';
import { createAsyncAction, createReducer } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

interface AfterOTDataTypes {
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

const GET_TeamLeader_AFTEROTData_GET = 'TeamLeader_AFTEROTData/GET_TeamLeader_AFTEROTData_GET';
const GET_TeamLeader_AFTEROTData_SUCCESS = 'TeamLeader_AFTEROTData/GET_TeamLeader_AFTEROTData_SUCCESS';
const GET_TeamLeader_AFTEROTData_ERROR = 'TeamLeader_AFTEROTData/GET_TeamLeader_AFTEROTData_ERROR';
const TeamLeader_AFTEROTData_Show_FALSE = 'TeamLeader_AFTEROTData/TeamLeader_FoodData_Show_FALSE';
const TeamLeader_AFTEROTData_Show_TRUE = 'TeamLeader_AFTEROTData/TeamLeader_FoodData_Show_TRUE';

const getTeamLeaderAfterOTDataAsync = createAsyncAction(GET_TeamLeader_AFTEROTData_GET, GET_TeamLeader_AFTEROTData_SUCCESS, GET_TeamLeader_AFTEROTData_ERROR)<
    undefined,
    AfterOTDataTypes,
    AxiosError
>();

const getTeamLeaderDataAfterOTApply = async (getMoment: {}, InfomationState: { id: string; team: string; name: string }) => {
    try {
        const dataget = await axios.post(`${process.env.REACT_APP_API_URL}/OT_app_server/TeamLeader_AfterOT_get_data`, {
            id: DecryptKey(InfomationState.id),
            team: InfomationState.team,
            name: DecryptKey(InfomationState.name),
            selectDate: moment(getMoment).format('YYYY-MM'),
        });
        console.log(dataget);
        return dataget.data.data;
    } catch (error) {
        console.log(error);
    }
};
const actions = { GET_TeamLeader_AFTEROTData_GET, GET_TeamLeader_AFTEROTData_SUCCESS, GET_TeamLeader_AFTEROTData_ERROR, TeamLeader_AFTEROTData_Show_FALSE, TeamLeader_AFTEROTData_Show_TRUE };

type GithubAction = ActionType<typeof actions> | ActionType<any>;

type GithubState = {
    TeamLeader_AfterOTDatas: {
        loading: boolean;
        error: Error | null;
        data: AfterOTDataTypes | any;
        dataChecked: boolean;
    };
};

export function getTeamLeaderAFTEROTdataThunk(
    getMoment: {},
    InfomationState: { id: string; team: string; name: string }
): ThunkAction<void, RootState, null, GithubAction> {
    return async dispatch => {
        const { request, success, failure } = getTeamLeaderAfterOTDataAsync;
        dispatch(request());
        try {
            const userProfile = await getTeamLeaderDataAfterOTApply(getMoment, InfomationState);
            if (userProfile) {
                dispatch(success(userProfile));
            }
        } catch (e: any) {
            dispatch(failure(e));
        }
    };
}
export const TeamLeaderAfterOTDataShowCheckedFalse = () => ({
    type: TeamLeader_AFTEROTData_Show_FALSE,
});
export const TeamLeaderAfterOTShowCheckedTrue = () => ({
    type: TeamLeader_AFTEROTData_Show_TRUE,
});

const initialState: GithubState = {
    TeamLeader_AfterOTDatas: {
        loading: false,
        error: null,
        data: [],
        dataChecked: false,
    },
};

const TeamLeaderAfterOTData = createReducer<GithubState, GithubAction>(initialState, {
    [GET_TeamLeader_AFTEROTData_GET]: state => ({
        ...state,
        TeamLeader_AfterOTDatas: {
            loading: true,
            error: null,
            data: [],
            dataChecked: false,
        },
    }),
    [GET_TeamLeader_AFTEROTData_SUCCESS]: (state, action) => ({
        ...state,
        TeamLeader_AfterOTDatas: {
            loading: false,
            error: null,
            data: action.payload,
            dataChecked: true,
        },
    }),
    [GET_TeamLeader_AFTEROTData_ERROR]: (state, action) => ({
        ...state,
        TeamLeader_AfterOTDatas: {
            loading: false,
            error: action.payload,
            data: [],
            dataChecked: false,
        },
    }),
    [TeamLeader_AFTEROTData_Show_FALSE]: state => ({
        ...state,
        TeamLeader_AfterOTDatas: {
            ...state.TeamLeader_AfterOTDatas,
            dataChecked: false,
        },
    }),
    [TeamLeader_AFTEROTData_Show_TRUE]: state => ({
        ...state,
        TeamLeader_AfterOTDatas: {
            ...state.TeamLeader_AfterOTDatas,
            dataChecked: true,
        },
    }),
});

export default TeamLeaderAfterOTData;

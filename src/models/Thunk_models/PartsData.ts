import axios, { AxiosError } from 'axios';
import { DecryptKey } from '../../config';
import moment from 'moment';
import { RootState } from '../../models/index';
import { createAsyncAction, createReducer } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

interface SalesDataTypes {
    indexs: number;
    writer: string;
    wirte_date: string;
    write_auto_date: string;
    check_date: string;
    partdesc: string;
    describes: string;
    comment: string;
    colorCheck: number;
    CheckName: string;
}

const GET_SalesData_GET = 'SalesData/GET_SalesData_GET';
const GET_SalesData_SUCCESS = 'SalesData/GET_SalesData_SUCCESS';
const GET_SalesData_ERROR = 'SalesData/GET_SalesData_ERROR';
const SalesData_Show_FALSE = 'SalesData/SalesData_Show_FALSE';
const SalesData_Show_TRUE = 'SalesData/SalesData_Show_TRUE';

const getSalesDataAsync = createAsyncAction(GET_SalesData_GET, GET_SalesData_SUCCESS, GET_SalesData_ERROR)<
    undefined,
    SalesDataTypes,
    AxiosError
>();

const getDataSalesApply = async (getMoment: {}, InfomationState: { id: string; team: string; name: string }) => {
    try {
        // const dataget = await axios.post(`${process.env.REACT_APP_API_URL}/sales_server/dataSales`, {
        //     id: DecryptKey(InfomationState.id),
        //     team: InfomationState.team,
        //     name: DecryptKey(InfomationState.name),
        //     selectDate: moment(getMoment).format('YYYY-MM'),
        // });
        const PartsPersondataget = await axios.get(`${process.env.REACT_APP_API_URL}/sales_server/dataSales`, {
            params: {
                selectDate: moment(getMoment).format('YYYY-MM'),
            },
            headers: {
                Authorization: sessionStorage.getItem('DHKS_TOKEN'),
            },
        });

        return PartsPersondataget.data.data;
    } catch (error) {
        console.log(error);
    }
};
const actions = { GET_SalesData_GET, GET_SalesData_SUCCESS, GET_SalesData_ERROR, SalesData_Show_TRUE, SalesData_Show_FALSE };
// type GithubAction = ActionType<typeof GET_FoodData_GET> | ActionType<typeof GET_FoodData_SUCCESS> | ActionType<typeof GET_FoodData_ERROR> | ActionType<any>
type GithubAction = ActionType<typeof actions> | ActionType<any>;

type GithubState = {
    PartsDatas: {
        loading: boolean;
        error: Error | null;
        data: SalesDataTypes | any;
        dataChecked: boolean;
    };
};

export function getPartsdataThunk(
    getMoment: {},
    InfomationState: { id: string; team: string; name: string }
): ThunkAction<void, RootState, null, GithubAction> {
    return async dispatch => {
        const { request, success, failure } = getSalesDataAsync;
        dispatch(request());
        try {
            const userProfile = await getDataSalesApply(getMoment, InfomationState);
            if (userProfile) {
                dispatch(success(userProfile));
            }
        } catch (e: any) {
            dispatch(failure(e));
        }
    };
}
export const PartsDataShowCheckedFalse = () => ({
    type: SalesData_Show_FALSE,
});
export const PartsDataShowCheckedTrue = () => ({
    type: SalesData_Show_TRUE,
});

const initialState: GithubState = {
    PartsDatas: {
        loading: false,
        error: null,
        data: [],
        dataChecked: false,
    },
};

const PartsDataGetting = createReducer<GithubState, GithubAction>(initialState, {
    [GET_SalesData_GET]: state => ({
        ...state,
        PartsDatas: {
            loading: true,
            error: null,
            data: [],
            dataChecked: false,
        },
    }),
    [GET_SalesData_SUCCESS]: (state, action) => ({
        ...state,
        PartsDatas: {
            loading: false,
            error: null,
            data: action.payload,
            dataChecked: true,
        },
    }),
    [GET_SalesData_ERROR]: (state, action) => ({
        ...state,
        PartsDatas: {
            loading: false,
            error: action.payload,
            data: [],
            dataChecked: false,
        },
    }),
    [SalesData_Show_FALSE]: state => ({
        ...state,
        PartsDatas: {
            ...state.PartsDatas,
            dataChecked: false,
        },
    }),
    [SalesData_Show_TRUE]: state => ({
        ...state,
        PartsDatas: {
            ...state.PartsDatas,
            dataChecked: true,
        },
    }),
});

export default PartsDataGetting;

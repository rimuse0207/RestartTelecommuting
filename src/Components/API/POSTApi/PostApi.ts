import { request } from '../indexs';

export const NothingPost = (RequestURL: string) => {
    return request.post(RequestURL);
};

export const OneParamsPost = (RequestURL: string, FristParamasData: any) => {
    return request.post(`${process.env.REACT_APP_API_URL}${RequestURL}`, {
        params: FristParamasData,
    });
};

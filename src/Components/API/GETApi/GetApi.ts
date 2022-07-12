import { request } from '../indexs';

export const NothingGet = (RequestURL: string) => {
    return request.get(RequestURL);
};

export const OneParamsGet = (RequestURL: string, FristParamasData: any) => {
    return request.get(RequestURL, {
        params: FristParamasData,
    });
};

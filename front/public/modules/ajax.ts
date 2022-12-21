import {ImgPostData, RequestAnswer} from "../common/types";
import {APIurl} from "../common/consts";

const REQUEST_TYPE = {
    GET: 'GET',
    POST: 'POST'
};

const csrfHeader = "X-XSRF-Token";

export type requestParams = {
    url: string;
    data?: object;
    method?: string;
};

type FetchParams = {
    method: string,
    body: string | FormData,
    headers?: HeadersInit,
    mode?: RequestMode,
    credentials?: RequestCredentials,
}

export class Ajax {
    get(params: requestParams): Promise<void | RequestAnswer> {
        const parameters: requestParams = params;
        parameters.method = REQUEST_TYPE.GET;
        return this.#ajax(parameters);
    }

    post(params: requestParams): Promise<void | RequestAnswer> {
        const parameters: requestParams = params;
        parameters.method = REQUEST_TYPE.POST;
        return this.#ajax(parameters);
    }

    #ajax(params: requestParams): Promise<void | RequestAnswer> {
        const url = new URL(APIurl + (params.url || '/'));
        if (params.data !== undefined){
            Object.keys(params.data).forEach(key => {
                if ((params.data as any)[key] === undefined) {
                    delete (params.data as any)[key];
                }
            });
        }

        if (params.method == REQUEST_TYPE.GET){
            url.search = new URLSearchParams({...params.data}).toString();
        }

        const requestHeaders: HeadersInit = new Headers();
        const csrf = this.#getCsrfCookie();
        if (csrf !== null){
            requestHeaders.set(csrfHeader, csrf);
        }
        requestHeaders.set('Content-Type', 'application/json');

        const fetchParams: object = {
            method: params.method,
            body: params.method == REQUEST_TYPE.POST ? JSON.stringify(params.data) : null,
            headers: requestHeaders,
            mode: 'cors',
            credentials: 'include',
        };

        const response = fetch(url, fetchParams)
            .then((response) => {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1){
                    return {status: response.status, response: response.json()};
                }
                return {status: response.status, response: undefined};
            })
            .then((response) => {
                const result: RequestAnswer = {
                    status: response.status,
                    response: response.response,
                }
                if (response.status === 401) {
                    window.sessionStorage.clear();
                }
                return result;
            })
            .catch((error) => {
                console.warn(error);
            });
        return response!;
    }

    postFile(requestParams: ImgPostData): Promise<void | RequestAnswer> {
        const url = APIurl + (requestParams.url || '/');
        const formData = new FormData();
        formData.append('file', requestParams.body);

        const requestHeaders: HeadersInit = new Headers();
        const csrf = this.#getCsrfCookie();
        if (csrf !== null){
            requestHeaders.set(csrfHeader, csrf);
        }

        const fetchParams: FetchParams = {
            body: formData,
            mode: 'cors',
            method: REQUEST_TYPE.POST,
            credentials: 'include',
            // https://muffinman.io/blog/uploading-files-using-fetch-multipart-form-data/
            headers: requestHeaders,
        };

        let status = 0;
        return fetch(url, fetchParams)
            .then((response) => {
                status = response.status;
                return response.json();
            })
            .then((response) => {
                const result: RequestAnswer = {
                    status: status,
                    response: response,
                }
                return result;
            })
            .catch((error) => {
                console.warn(error);
            });
    }

    #getCsrfCookie(){
        const cookieArr = document.cookie.split(";");

        for (let i = 0; i < cookieArr.length; i++) {
            const cookiePair = cookieArr[i].split("=");
            if ('_csrf' === cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);
            }
        }

        return null;
    }
}

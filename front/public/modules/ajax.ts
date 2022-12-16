import {ImgPostData, RequestAnswer} from "../common/types";
import {APIurl} from "../common/consts";

const REQUEST_TYPE = {
    GET: 'GET',
    POST: 'POST'
};

const csrfHeader = "CSRFHeader";

export type requestParams = {
    url: string;
    data?: object;
    method?: string;
};

export class Ajax {
    #csrf :string;
    constructor() {
        if (window.sessionStorage.getItem('token') !== null) {
            this.#csrf = window.sessionStorage.getItem('token')!;
        }else{
            this.#csrf = "";
        }
    }

    /**
     * Устанавливает CSRF-токен
     */
    setCsrf(csrf:string){
        this.#csrf = csrf;
        window.sessionStorage.setItem('token', csrf);
    }

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
                // @ts-ignore
                if (params.data[key] === undefined) {
                    // @ts-ignore
                    delete params.data[key];
                }
            });
        }

        if (params.method == REQUEST_TYPE.GET){
            url.search = new URLSearchParams({...params.data}).toString();
        }

        let fetchParams: object = {
            method: params.method,
            body: params.method == REQUEST_TYPE.POST ? JSON.stringify(params.data) : null,
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'include',
        };

        if (this.#csrf !== ''){
            // @ts-ignore
            fetchParams.headers[csrfHeader] = this.#csrf;
        }

        let status: number = 0;

        const response = fetch(url, fetchParams)
            .then((response) => {
                status = response.status;
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1){
                    return response.json();
                }
                return status;
            })
            .then((response) => {
                const result: RequestAnswer = {
                    status: status,
                    response: response,
                }
                if (status === 401) {
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
        const fetchParams: object = {
            body: formData,
            mode: 'cors',
            method: REQUEST_TYPE.POST,
            credentials: 'include',
            // https://muffinman.io/blog/uploading-files-using-fetch-multipart-form-data/
            // headers: {
            //   'Content-Type': 'multipart/form-data',
            // },
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
}

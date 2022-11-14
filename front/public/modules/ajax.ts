const APIurl = "http://127.0.0.1:8080/api/v1";
//const APIurl = "http://95.163.213.142:8080/api/v1";

const REQUEST_TYPE = {
    GET: 'GET',
    POST: 'POST'
};

export type requestParams = {
    url: string;
    body?: string;
    data?: object;
    method?: string;
};

export default class Ajax {
    static get(params: requestParams) {
        const parameters: requestParams = params;
        parameters.method = REQUEST_TYPE.GET;
        return Ajax.#ajax(params);
    }

    static post(params: requestParams) {
        const parameters: requestParams = params;
        parameters.method = REQUEST_TYPE.POST;
        console.log(parameters);
        return Ajax.#ajax(parameters);
    }

    static #ajax(params: requestParams) {
        const url = new URL(APIurl + (params.url || '/'));
        url.search = new URLSearchParams(JSON.stringify(params.body)).toString();

        const fetchParams: object = {
            method: params.method,
            body: JSON.stringify(params.data),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'include',
        };
        let status = 0;

        return fetch(url, fetchParams)
            .then((response) => {
                status = response.status;
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1){
                    return response.json();
                }
                return status;
            }).then((response) => {
                return {
                    status,
                    response,
                };
            })
            .catch((error) => {
                console.warn(error);
            });
    }
}



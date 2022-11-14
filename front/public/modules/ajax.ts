const APIurl = "http://127.0.0.1:8080/api/v1";
//const APIurl = "http://95.163.213.142:8080/api/v1";

const REQUEST_TYPE = {
    GET: 'GET',
    POST: 'POST'
};

export class Ajax {
    get({
        url,
        data
    }: any) {
        return this.#ajax({
            method: REQUEST_TYPE.GET,
            crossDomain: true,
            url,
            data
        })
    }

    post({
        url,
        body
    }: any) {
        return this.#ajax({
            method: REQUEST_TYPE.POST,
            url,
            crossDomain: true,
            body
        })
    }

    #ajax(requestParams: any) {
        const url = new URL(APIurl + (requestParams.url || '/'));
        url.search = new URLSearchParams(requestParams.data).toString();

        const fetchParams = {
            method: requestParams.method,
            body: JSON.stringify(requestParams.body),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'include',
        };
        let status = 0;
        // @ts-expect-error TS(2345): Argument of type '{ method: any; body: string; hea... Remove this comment to see the full error message
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



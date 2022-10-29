const APIurl = "http://127.0.0.1:8080/api/v1";
//const APIurl = "http://95.163.213.142:8080/api/v1";

const REQUEST_TYPE = {
    GET: 'GET',
    POST: 'POST'
};

class Ajax {
    get({url}) {
        return this.#ajax({
            method: REQUEST_TYPE.GET,
            crossDomain: true,
            url
        })
    }

    post({url, body}) {
        return this.#ajax({
            method: REQUEST_TYPE.POST,
            url,
            crossDomain: true,
            body
        })
    }

    #ajax(requestParams) {
        const url = APIurl + (requestParams.url || '/');
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
        return fetch(url, fetchParams)
            .then((response) => {
                status = response.status;
                if (fetchParams.method === REQUEST_TYPE.POST) {
                    return status;
                }
                return response.json();
            })
            .then((response) => {
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

export default Ajax


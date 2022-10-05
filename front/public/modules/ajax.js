const APIurl = "http://127.0.0.1:8080/api/v1";

const REQUEST_TYPE = {
    GET: 'GET',
    POST: 'POST'
};

class Ajax {
    get({url, callback}) {
        this._ajax({
            method: REQUEST_TYPE.GET,
            crossDomain: true,
            url,
            callback,
        })
    }

    post({url, body, callback}) {
        this._ajax({
            method: REQUEST_TYPE.POST,
            url,
            crossDomain: true,
            body,
            callback
        })
    }

    _ajax(requestParams) {
        const url = APIurl + (requestParams.url || '/');
        const fetchParams = {
            body: JSON.stringify(requestParams.body),
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
            },
            method: requestParams.method,
        };


        let status = 0;
        return fetch(url, fetchParams)
            .then((response) => {
                status = response.status;
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

window.ajax = new Ajax();


const APIurl = "http://127.0.0.1:8080/api/v1";
//const APIurl = "http://95.163.213.142:8080/api/v1";

const REQUEST_TYPE = {
    GET: 'GET',
    POST: 'POST'
};

class Ajax {
    get({url}) {
        return this._ajax({
            method: REQUEST_TYPE.GET,
            crossDomain: true,
            url
        })
    }

    post({url, body}) {
        return this._ajax({
            method: REQUEST_TYPE.POST,
            url,
            crossDomain: true,
            body
        })
    }

    _ajax(requestParams) {
        const url = APIurl + (requestParams.url || '/');
        const fetchParams = {
            body: JSON.stringify(requestParams.body),
            mode: 'cors',
            credentials: 'include',
            method: requestParams.method,
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

window.ajax = new Ajax();


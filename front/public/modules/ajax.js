const APIurl = "http://127.0.0.1:8080/api/v1";
//const APIurl = "http://95.163.213.142:8080/api/v1";

const REQUEST_TYPE = {
    GET: 'GET',
    POST: 'POST'
};

export default class Ajax {
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

     async #ajax(requestParams) {
        const url = APIurl + (requestParams.url || '/');
        const fetchParams = {
            method: requestParams.method,
            body: JSON.stringify(requestParams.body),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'no-cors',
            credentials: 'include',
        };

        let status = 0;
        const response = await fetch(url, fetchParams)

        const unMarshal = async (response) => {
            status = response.status;
            if (fetchParams.method === REQUEST_TYPE.POST) {
                return status;
            }
            return response.json();
        }

        return await unMarshal(response)
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


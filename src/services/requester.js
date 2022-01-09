// import { getData } from '../services/authService.js'

function request(method, url, data) {
    let options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        }
    };
    // const token = getData().token;


    if(data) {
        options['body'] = JSON.stringify(data);
    }

    if(token) {
        options.headers['X-Authorization'] = token;
    }


    return fetch(url, options)
        .then((res) => {
                if(res.status == 204) {
                    return res;
                } else {
                    return res.json();
                }
            }
        );
}

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const del = request.bind(null, 'DELETE');
export const patch = request.bind(null, 'PATCH');
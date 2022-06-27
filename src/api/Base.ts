export enum EMethods {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE',
}

export interface IRequestOptions {
    timeout?: number;
    method?: EMethods;
    data?: any;
    headers?: Record<string, string>;
    retries?: number;
    file?: boolean;
}
/**
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */
function queryStringify(data: { [key: string]: any }) {
    const array: string[] = [];
    Object.keys(data).forEach((key) => {
        const param = data[key];
        if (Array.isArray(param)) {
            array.push(`${key}=${param.join(',')}`);
        } else if (typeof param === 'object') {
            array.push(`${key}=${param}`);
        } else if (typeof param === 'boolean') {
            array.push(`${key}=${Boolean(param)}`);
        } else {
            array.push(`${key}=${param}`);
        }
    });
    return `?${array.join('&')}`;
}

export class Base {
    public  get (url: string, options: IRequestOptions) {
        return this.request(url, { ...options, method: EMethods.GET }, options.timeout).catch((err) => console.log(err));
    }

    public post (url: string, options: IRequestOptions) {
        return this.request(url, { ...options, method: EMethods.POST }, options.timeout);
    }

    public put (url: string, options: IRequestOptions) {
        return this.request(url, { ...options, method: EMethods.PUT }, options.timeout);
    }

    public delete  (url: string, options: IRequestOptions) {
        return this.request(url, { ...options, method: EMethods.DELETE }, options.timeout);
    }

    private request (url: string, options: IRequestOptions, timeout = 5000) {
        const host = `${process.env.API_ENDPOINT}/`;
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            if (options.method === EMethods.GET && options.data) {
                xhr.open(options.method, host + url + queryStringify(options.data), true);
            } else {
                xhr.open(options.method, host + url, true);
            }

            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.withCredentials = true;
            xhr.onabort = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            xhr.onerror = () => {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            };

            if (options.headers) {
                Object.keys(options.headers).forEach((key) => {
                    xhr.setRequestHeader(key, options.headers[key]);
                });
            }
            else if (!options.file){
                xhr.setRequestHeader('Content-Type', 'application/json');
            }

            if (options.data) {
                if (options.file) {
                    xhr.send(options.data as unknown as FormData);
                }
                else {
                    xhr.send(JSON.stringify(options.data));
                }
            } else {
                xhr.send();
            }
        });
    }
}
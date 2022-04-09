enum EMethods  {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE',
};

export interface IRequestOptions{
    timeout: number,
    method: EMethods,
    data?: any,
    headers?: {[key:string]:string},
    retries?: number,
}
/**
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */
function queryStringify(data: {[key:string]:any}) {
    const array:string[] = [];
    Object.keys(data).forEach(key => {
        const param = data[key];
        if (Array.isArray(param)) {
            array.push(`${key  }=${  param.join(',')}`);
        } else if (typeof param === 'object') {
            array.push(`${key  }=${  param}`)
        } else if (typeof param === 'boolean') {
            array.push(`${key  }=${  Boolean(param)}`)
        } else {
            array.push(`${key  }=${  param}`)
        }
    }
    )
    return `?${array.join('&')}`;
}

export class BaseService {
    get = (url:string, options:IRequestOptions) => this.request(url, {...options, method: EMethods.GET}, options.timeout);

    post = (url:string, options:IRequestOptions) => this.request(url, {...options, method: EMethods.POST}, options.timeout);

    put = (url:string, options:IRequestOptions) => this.request(url, {...options, method: EMethods.PUT}, options.timeout);

    delete = (url:string, options:IRequestOptions) => this.request(url, {...options, method: EMethods.DELETE}, options.timeout);

    request = (url:string, options: IRequestOptions, timeout = 5000) => new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        if (options.method === EMethods.GET && options.data){
            xhr.open(options.method, url+queryStringify(options.data),true);
        } else {
            xhr.open(options.method, url, true);
        }

        xhr.onload = function() {
            resolve(xhr);
        };

        xhr.onabort = reject;
        xhr.onerror = reject;

        xhr.timeout = timeout;
        xhr.ontimeout = reject;

        xhr.onerror = () => {
            reject({
                'status': xhr.status,
                'statusText': xhr.statusText,
                'description': 'load error'
            });
        };

        if (options.headers) {
            Object.keys(options.headers).forEach(key => {
                xhr.setRequestHeader(key, options.headers[key]);
            });
        }
        else{
            xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        }

        if (options.data) {
            xhr.send(JSON.stringify(options.data));
        } else {
            xhr.send()
        }
    });
}

function fetchWithRetry(url:string, options:IRequestOptions): Promise<any> {
    const {retries} = options;
    function onError(err: any){
        const triesLeft = retries!--;
        if (!triesLeft){
            throw err;
        }
        return fetchWithRetry(url, {...options, retries: triesLeft});
    }

    return fetch(url, options).catch(onError);
}
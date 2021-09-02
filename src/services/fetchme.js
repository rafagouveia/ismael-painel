import * as utils from "./utils"

const defaults = {
    baseUrl: '',
    headers: {}
};


const combineUrl = (baseUrl, url) => {
    if(baseUrl === '' || null || undefined){
        return url
    }
    return baseUrl + url;
};

class Fetchme {
    constructor(configs){
        this.defaults = defaults;

        const methods = {
            params: ['get', 'delete', 'head', 'options'],
            body: ['post', 'patch', 'put']
        };
        utils.forEach(methods.params, (method) => {
            Fetchme.prototype[method] = (url, config) => {
                console.log(config)
                return this.instance(url, { method: method, ...config})
            }
        });


    }
    instance = (url, config) =>  {
        console.log(config)
        return  fetch(combineUrl(this.defaults.baseUrl, url), {...this.defaults, ...config})
    };
    create = (params: {baseUrl: '', headers: {} }) => {
        this.defaults.baseUrl = params.baseUrl;
        this.defaults.headers = params.headers
    };
}


const methods = {
    params: ['get', 'delete', 'head', 'options'],
    body: ['post', 'patch', 'put']
};
utils.forEach(methods.body, (method) => {
    Fetchme.prototype[method] = function (url, config) {
        return "estou triste " + method
    }
});

export default new Fetchme();

import { kase } from 'kase';

import { Server } from 'api/Server';

import { NetworkRequestFailedError } from "./Error";
import { HTTPContentType, HTTPHeader, HTTPHeaderKey } from "./HTTPHeader";
import { HTTPMethod } from "./HTTPMethod";
import { HTTPResponse } from "./HTTPResponse";

export class HTTPRequest {

    constructor () {
        this.get = this.get.bind(this);
        this.post = this.post.bind(this);
        this.put = this.put.bind(this);
        this.delete = this.delete.bind(this);
        this._headerBuilder = this._headerBuilder.bind(this);
        this._queryBuilder = this._queryBuilder.bind(this);
        this._convertResponseToCamelCase = this._convertResponseToCamelCase.bind(this);
        this._convertBodyToSnakeCase = this._convertBodyToSnakeCase.bind(this);
    }

    /**
     * Make the HTTP `GET` request.
     * 
     * Header example:
     * 
     * ```
     * { token: "Auth Token", ... }
     * ```
     * 
     * Query example:
     * 
     * ```
     * { type: "churn_rate", startDate: "2022-12-06", endDate: "2022-12-07", ... }
     * ```
     * @param {string} path Endpoint
     * @param {Map<string, any>} header Header's map object
     * @param {Map<string, any>} query Query string's map object
     * @returns Promise
     */
    get(path, header={}, query={}) {
        path = `${Server.BaseURL}/${path}/${this._queryBuilder(query)}`;

        const reqHeader = this._headerBuilder({
            ...header,
            method: HTTPMethod.Get
        });

        return fetch(path, reqHeader)
            .catch(error => {
                throw new NetworkRequestFailedError({error});
            })
            .then((response) => HTTPResponse.handleResponse(response))
            .then(jsonBody => this._convertResponseToCamelCase(jsonBody))
            .catch(error => {
                throw error;
            });
    }

    /**
     * Make the HTTP `POST` request.
     * 
     * Header example:
     * 
     * ```
     * { token: "Auth Token", ... }
     * ```
     * 
     * Body example:
     * 
     * ```
     * { type: "churn_rate", startDate: "2022-12-06", endDate: "2022-12-07", value: "10.5", ... }
     * ```
     * @param {string} path Endpoint
     * @param {Map<string, any>} header Header's map object
     * @param {Map<string, any>} query Query string's map object
     * @returns Promise
     */
    post(path, header={}, body) {
        path = `${Server.BaseURL}/${path}/}`;

        const reqHeader = this._headerBuilder({
            ...header,
            method: HTTPMethod.Post,
            body: JSON.stringify(this._convertBodyToSnakeCase(body))
        });

        return fetch(path, reqHeader)
            .catch(error => {
                throw new NetworkRequestFailedError({error});
            })
            .then((response) => HTTPResponse.handleResponse(response))
            .then(jsonBody => this._convertResponseToCamelCase(jsonBody))
            .catch(error => {
                throw error;
            });
    }

    /**
     * Make the HTTP `PUT` request.
     * 
     * Header example:
     * 
     * ```
     * { token: "Auth Token", ... }
     * ```
     * 
     * Body example:
     * 
     * ```
     * { type: "churn_rate", startDate: "2022-12-06", endDate: "2022-12-07", value: "10.5", ... }
     * ```
     * @param {string} path Endpoint
     * @param {Map<string, any>} header Header's map object
     * @param {Map<string, any>} query Query string's map object
     * @returns Promise
     */
    put(path, header={}, body) {
        path = `${Server.BaseURL}/${path}/}`;

        const reqHeader = this._headerBuilder({
            ...header,
            method: HTTPMethod.Put,
            body: JSON.stringify(this._convertBodyToSnakeCase(body))
        });

        return fetch(path, reqHeader)
            .catch(error => {
                throw new NetworkRequestFailedError({error});
            })
            .then((response) => HTTPResponse.handleResponse(response))
            .then(jsonBody => this._convertResponseToCamelCase(jsonBody))
            .catch(error => {
                throw error;
            });
    }

    /**
     * Make the HTTP `DELETE` request.
     * 
     * Header example:
     * 
     * ```
     * { token: "Auth Token", ... }
     * ```
     * @param {string} path Endpoint
     * @param {Map<string, any>} header Header's map object
     * @returns Promise
     */
    delete(path, header={}) {
        path = `${Server.BaseURL}/${path}/}`;

        const reqHeader = this._headerBuilder({
            ...header,
            method: HTTPMethod.Delete
        });

        return fetch(path, reqHeader)
            .catch(error => {
                throw new NetworkRequestFailedError({error});
            })
            .then((response) => HTTPResponse.handleResponse(response))
            .then(jsonBody => this._convertResponseToCamelCase(jsonBody))
            .catch(error => {
                throw error;
            });
    }

    /**
     * Build request's header based on that `header` dictionary.
     * 
     * Header example:
     * 
     * ```
     * { contentType: "application/json", basicAuth: { username: "username", password: "password" }, token: "token", ... }
     * ```
     * 
     * @param {Map<string, any>} header Header's map object
     * @returns Object
     */
    _headerBuilder(header={}) {
        return {
            [HTTPHeaderKey.ContentType]: header.contentType ? header.contentType : HTTPContentType.ApplicationJson,
            [HTTPHeaderKey.Authorization]: header.basicAuth
                ? HTTPHeader.getBasicAuthBase64String(header.basicAuth.username, header.basicAuth.password)
                : header.token
                ? HTTPHeader.getAuthorizationTokenString(header.token)
                : undefined,
            ...header.customHeaders,
        };
    }

    /**
     * Build query parameters based on that `query` dictionary.
     * 
     * Query example:
     * 
     * ```
     * { type: "churn_rate", startDate: "2022-12-06", endDate: "2022-12-07", ... }
     * ```
     * @param {Map<string, any>} query Query string's map object
     * @returns String
     */
    _queryBuilder(query={}) {
        const keys = Object.keys(query);
        const queryValues = keys.filter(key => query[key] !== undefined)
            .map(key => {
                const queryValue = query[key];
                const snakeCaseKey = kase(key, 'snake');

                if (Array.isArray(queryValue)) return `${snakeCaseKey}=${queryValue.join(',')}`;
                if (queryValue === true) return `${snakeCaseKey}=${'True'}`;
                if (queryValue === false) return `${snakeCaseKey}=${'False'}`;

                return `${snakeCaseKey}=${queryValue.toString()}`;
            });

        return queryValues.join('&');
    }

    /**
     * A function to convert `Response` data into camel case style.
     * 
     * @param {Object} obj Response data
     * @returns Object
     */
    _convertResponseToCamelCase(obj) {
        if (!obj) return obj;
        if (Array.isArray(obj)) return obj.map(item => this._convertResponseToCamelCase(item));
        if (typeof obj !== 'object' || obj === null) return obj;

        return Object.keys(obj).reduce((accum, key) => {
            return Object.assign(accum, {
                [kase(key, 'camel')]: this._convertResponseToCamelCase(obj[key]),
            });
        });
    }

    /**
     * A function to convert `Request` body into snake case style.
     * 
     * @param {Object} obj Request body
     * @returns Object
     */
    _convertBodyToSnakeCase(obj) {
        if (!obj) return obj;
        if (Array.isArray(obj)) return obj.map(item => this._convertBodyToSnakeCase(item));
        if (typeof obj !== 'object' || obj === null) return obj;

        return Object.keys(obj).reduce((accum, key) => {
            return Object.assign(accum, { [kase(key, 'snake')]: this._convertBodyToSnakeCase(obj[key]) });
        });
    }
}

import { NetworkRequestFailedError } from "./Error";
import { HTTPContentType, HTTPHeader, HTTPHeaderKey } from "./HTTPHeader";
import { HTTPMethod } from "./HTTPMethod";
import { HTTPResponse } from "./HTTPResponse";

export class HTTPRequest {

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
    headerBuilder(header) {
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
     * { type: "churn_rate", start_date: "2022-12-06", end_date: "2022-12-07", ... }
     * ```
     * @param {Map<string, any>} query Query string's map object
     * @returns String
     */
    queryBuilder(query) {
        const keys = Object.keys(query);
        const queryValues = keys.filter(key => query[key] !== undefined)
            .map(key => {
                const queryValue = query[key];
                if (queryValue instanceof Array) return `${key}=${queryValue.join(',')}`;
                if (queryValue === true) return `${key}=${'True'}`;
                if (queryValue === false) return `${key}=${'False'}`;
                return `${key}=${queryValue.toString()}`;
            });

        return queryValues.join('&');
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
     * { type: "churn_rate", start_date: "2022-12-06", end_date: "2022-12-07", ... }
     * ```
     * @param {string} path Endpoint
     * @param {Map<string, any>} header Header's map object
     * @param {Map<string, any>} query Query string's map object
     * @returns Promise
     */
    get(path, header={}, query={}) {
        path = path + this.queryBuilder(query)

        const reqHeader = this.headerBuilder({
            ...header,
            method: HTTPMethod.Get
        })

        return fetch(path, reqHeader)
            .catch(error => {
                throw new NetworkRequestFailedError({error});
            })
            .then((response) => HTTPResponse.handleResponse(response))
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
     * { type: "churn_rate", start_date: "2022-12-06", end_date: "2022-12-07", value: "10.5", ... }
     * ```
     * @param {string} path Endpoint
     * @param {Map<string, any>} header Header's map object
     * @param {Map<string, any>} query Query string's map object
     * @returns Promise
     */
    post(path, header={}, body={}) {
        const reqHeader = this.headerBuilder({
            ...header,
            method: HTTPMethod.Post,
            body: JSON.stringify(body)
        })

        return fetch(path, reqHeader)
            .catch(error => {
                throw new NetworkRequestFailedError({error});
            })
            .then((response) => HTTPResponse.handleResponse(response))
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
     * { type: "churn_rate", start_date: "2022-12-06", end_date: "2022-12-07", value: "10.5", ... }
     * ```
     * @param {string} path Endpoint
     * @param {Map<string, any>} header Header's map object
     * @param {Map<string, any>} query Query string's map object
     * @returns Promise
     */
    put(path, header={}, body={}) {
        const reqHeader = this.headerBuilder({
            ...header,
            method: HTTPMethod.Put,
            body: JSON.stringify(body)
        })

        return fetch(path, reqHeader)
            .catch(error => {
                throw new NetworkRequestFailedError({error});
            })
            .then((response) => HTTPResponse.handleResponse(response))
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
        const reqHeader = this.headerBuilder({
            ...header,
            method: HTTPMethod.Delete
        })

        return fetch(path, reqHeader)
            .catch(error => {
                throw new NetworkRequestFailedError({error});
            })
            .then((response) => HTTPResponse.handleResponse(response))
            .catch(error => {
                throw error;
            });
    }
}

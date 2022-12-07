import * as base64 from 'base-64';

/**
 * Keys of HTTP Header object on a HTTP Request.
 * Not all keys are listed here since there are too many, we only add keys
 * which are being used in this module.
 */
export const HTTPHeaderKey = {
    Authorization: 'Authorization',
    ContentType: 'Content-Type'
}

/**
 * HTTP Content type. Associated by content type of HTTP request.
 * Not all content type are listed here since there are too many, we only add content types
 * which are being used in this module.
 */
export const HTTPContentType = {
    ApplicationJson: 'application/json',
    TextPlain: 'text/plain'
}

/**
 * Helper class containing methods that can be used when constructing a HTTP Header
 */
export class HTTPHeader {

    /**
     * Get basic authentication header using `base64` algorithm to encode username and password.
     * @param {String} username Username
     * @param {String} password Password
     * @returns String
     */
    static getBasicAuthBase64String(username, password) {
        return 'Basic ' + base64.encode(username + ':' + password);
    }

    /**
     * Get authorization token's string header.
     * @param {String} token User's auth token
     * @returns String
     */
    static getAuthorizationTokenString(token) {
        return 'Token ' + token;
    }
}

import {
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    NotFoundError,
    UnauthorizedError,
    UnknownError,
} from './Error';

export class HTTPResponse {
    /**
     * A function to handle response from the request.
     * 
     * When the request is success, the promise will be resolved and it contains response body in JSON format.
     * 
     * Otherwise, the promise will be rejected and it contains a specific `Error` instance with some details.
     * 
     * @param {Response} response - Response from the request
     * @return {Promise} Promise
     */
    static handleResponse(response) {
        return new Promise((resolve, reject) => {
            const statusCode = response.status;

            // Client's requests succeed.
            if (statusCode >= 200 && statusCode < 300) {
                // Request success without content.
                if (statusCode === 204) {
                    return resolve({});
                }

                // Request success with content.
                return response.json().then(jsonBody => resolve(jsonBody));
            }

            // Bad requests, request's payload sent by Client might be incorrect.
            else if (statusCode === 400) {
                return response.json().then(jsonBody => reject(new BadRequestError({detail: jsonBody})));
            }

            // Endpoint doesn't exists.
            else if (statusCode === 404) {
                return response.json().then(jsonBody => reject(new NotFoundError({detail: jsonBody})));
            }

            // Client's is not allowed to use the endpoint.
            else if (statusCode === 403) {
                return response.json().then(jsonBody => reject(new ForbiddenError({detail: jsonBody})));
            }

            // Client's is not authenticated.
            else if (statusCode === 401) {
                return response.json().then(jsonBody => reject(new UnauthorizedError({detail: jsonBody})));
            }

            // Backend failure, Client's requests can't be procceed.
            else if (statusCode === 500) {
                return response.json().then(jsonBody => reject(new InternalServerError({detail: jsonBody})));
            }

            // Unknown error
            else {
                return response.json().catch(e => e).then(jsonBody => {
                    reject(
                        new UnknownError({
                            detail: {response, detail: jsonBody},
                        }),
                    );
                });
            }
        });
    }
}

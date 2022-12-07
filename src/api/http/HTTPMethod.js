/**
 *  HTTP Request methods to indicate the desired action to be performed for a given resource
 */
export const HTTPMethod = {
    /**
     * The GET method requests a representation of the specified resource.
     * Requests using GET should only retrieve data.
     */
    Get: 'GET',

    /**
     * The POST method is used to submit an entity to the specified resource,
     * often causing a change in state or side effects on the server
     */
    Post: 'POST',

    /** The PUT method replaces all current representations of the target resource with the request payload. */
    Put: 'PUT',

    /** The DELETE method deletes the specified resource. */
    Delete: 'DELETE'
}

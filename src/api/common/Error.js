export class UnauthorizedError extends Error {
    /**
     * Construct `UnauthorizedError`.
     * @param {Object} details Error's detail
     */
     constructor(details={}) {
        const {message, detail} = details;

        super(message);

        this.name = "UnauthorizedError";
        this.detail = detail;
    }
}

export class ForbiddenError extends Error {
    /**
     * Construct `ForbiddenError`.
     * @param {Object} details Error's detail
     */
    constructor(details={}) {
        const {message, detail} = details;

        super(message);

        this.name = "ForbiddenError";
        this.detail = detail;
    }
}

export class NotFoundError extends Error {
    /**
     * Construct `NotFoundError`.
     * @param {Object} details Error's detail
     */
    constructor(details={}) {
        const {message, detail} = details;

        super(message);

        this.name = "NotFoundError";
        this.detail = detail;
    }
}

export class InternalServerError extends Error {
    /**
     * Construct `InternalServerError`.
     * @param {Object} details Error's detail
     */
    constructor(details={}) {
        const {message, detail} = details;

        super(message);

        this.name = "InternalServerError";
        this.detail = detail;
    }
}

export class BadRequestError extends Error {
    /**
     * Construct `BadRequestError`.
     * @param {Object} details Error's detail
     */
    constructor(details={}) {
        const {message, detail} = details;

        super(message);

        this.name = "BadRequestError";
        this.detail = detail;
    }
}

export class UnknownError extends Error {
    /**
     * Construct `UnknownError`.
     * @param {Object} details Error's detail
     */
    constructor(details={}) {
        const {message, detail} = details;

        super(message);

        this.name = "UnknownError";
        this.detail = detail;
    }
}

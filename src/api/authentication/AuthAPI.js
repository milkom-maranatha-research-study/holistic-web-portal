import { HTTPRequest } from "api/http";

class AuthAPI extends HTTPRequest {

    constructor () {
        super();

        this.path = 'auth/';

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.logoutAll = this.logoutAll.bind(this);
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = AuthAPI.getInstance();
        }
        return this.instance;
    }

    /**
     * Login to the system.
     * 
     * Response data example:
     * ```
     * {
     *   expiry: "2022-12-07T08:50:53.058338Z",
     *   token: "ed07690c910aa774fd0c5bb93cb4705c6522dee0415322436011edc113e9cb87",
     *   user: {
     *      id: 1,
     *      username: "username",
     *      email: "username@mail.com",
     *      firstName: "First name",
     *      lastName: "Last name",
     *      isActive: false,
     *      dateJoined: "2022-11-15T08:58:17Z"
     *   }
     * }
     * ```
     * @param {string} username Username.
     * @param {string} password Password.
     * @returns Object
     */
    login(username, password) {
        const path = `${this.path}/login/`;
        const header = {basicAuth: {username, password}}

        return this.post(path, header);
    }

    /**
     * Logout from the system.
     * @param {string} token User's auth token.
     * @returns Object
     */
    logout(token) {
        const path = `${this.path}/logout/`;
        const header = {token}

        return this.post(path, header);
    }

    /**
     * Invalidate all auth `token` belonging to the User from the system.
     * @param {string} token User's auth token.
     * @returns Object
     */
    logoutAll(token) {
        const path = `${this.path}/logout/`;
        const header = {token}

        return this.post(path, header);
    }
}

const authApi = AuthAPI.getInstance()

export default authApi;

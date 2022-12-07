import { HTTPRequest } from "api/http";

class AccountAPI extends HTTPRequest {

    constructor () {
        super();

        this.path = 'accounts/';

        this.getAccount = this.getAccount.bind(this);
        this.createAccount = this.createAccount.bind(this);
        this.updateAccount = this.updateAccount.bind(this);
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = AccountAPI.getInstance();
        }
        return this.instance;
    }

    /**
     * Get profile's account belonging to the User with that `token`.
     * 
     * Response data example:
     * ```
     * {
     *   id: 1,
     *   username: "username",
     *   email: "username@mail.com",
     *   firstName: "First name",
     *   lastName: "Last name",
     *   isActive: false,
     *   dateJoined: "2022-11-15T08:58:17Z"
     * }
     * ```
     * @param {string} token User's auth token.
     * @returns Object
     */
    getAccount(token) {
        const path = `${this.path}/me/`;
        const header = {token};

        return this.get(path, header);
    }

    /**
     * Create a new account for that `user`.
     * 
     * User data example:
     * ```
     * {
     *   username: "username",
     *   email: "email",
     *   password: "password",
     *   firstName: "First Name",
     *   lastName: "Last Name"
     * }
     * ```
     * 
     * Response data example:
     * ```
     * {
     *   id: 1,
     *   username: "username",
     *   email: "username@mail.com",
     *   firstName: "First name",
     *   lastName: "Last name",
     *   isActive: false,
     *   dateJoined: "2022-11-15T08:58:17Z"
     * }
     * ```
     * @param {object} user User information.
     * @returns Object
     */
    createAccount(user) {
        const header = {};

        return this.post(this.path, header, user);
    }

    /**
     * Update user's account information with that `user` object.
     * 
     * User data example:
     * ```
     * {
     *   email: "email",
     *   firstName: "First Name",
     *   lastName: "Last Name"
     * }
     * ```
     * 
     * Response data example:
     * ```
     * {
     *   id: 1,
     *   username: "username",
     *   email: "username@mail.com",
     *   firstName: "First name",
     *   lastName: "Last name",
     *   isActive: false,
     *   dateJoined: "2022-11-15T08:58:17Z"
     * }
     * ```
     * @param {object} user User information.
     * @returns Object
     */
    updateAccount(token, user) {
        const path = `${this.path}/me/`;
        const header = {token};

        return this.put(path, header, user);
    }

    /**
     * Update user's account information with that `user` object.
     * 
     * Response data example:
     * ```
     * {
     *   id: 1,
     *   username: "username",
     *   email: "username@mail.com",
     *   firstName: "First name",
     *   lastName: "Last name",
     *   isActive: false,
     *   dateJoined: "2022-11-15T08:58:17Z"
     * }
     * ```
     * @param {String} oldPassword User old password.
     * @param {String} newPassword User new password.
     * @returns Object
     */
    changePassword(token, oldPassword, newPassword) {
        const path = `${this.path}/me/`;
        const header = {token};

        return this.put(path, header, {oldPassword, newPassword});
    }
}

const accountApi = AccountAPI.getInstance();

export default accountApi;

import { HTTPRequest } from "api/http";

export class OrganizationAPI extends HTTPRequest {

    constructor () {
        super();

        this.getOrganizations = this.getOrganizations.bind(this);
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new OrganizationAPI();
        }
        return this.instance;
    }

    /**
     * Get organizations.
     * 
     * Response data example:
     * ```
     * [
     *  {
     *      "id": 1,
     *      "name": "Organization 1"
     *  },
     *  {
     *      "id": 2,
     *      "name": "Organization 2"
     *  }
     * ]
     * ```
     * @returns Array
     */
    getOrganizations(token) {
        const path = 'organizations/';
        const header = {token};

        return this.get(path, header);
    }
}

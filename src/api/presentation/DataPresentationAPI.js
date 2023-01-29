import { HTTPRequest } from "api/http";

export class DataPresentationAPI extends HTTPRequest {

    constructor () {
        super();

        this.getTotalTherapists = this.getTotalTherapists.bind(this);
        this.getTherapistRates = this.getTherapistRates.bind(this);
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new DataPresentationAPI();
        }
        return this.instance;
    }

    /**
     * Get total active/non-active therapists.
     * 
     * Response data example:
     * ```
     * [
     *  {
     *      "periodType": "yearly",
     *      "organization": null,
     *      "startDate": "2018-01-01",
     *      "endDate": "2018-12-31",
     *      "isActive": true,
     *      "value": 18
     *  },
     *  {
     *      "periodType": "yearly",
     *      "organization": null,
     *      "startDate": "2019-01-01",
     *      "endDate": "2019-12-31",
     *      "isActive": true,
     *      "value": 67
     *  }
     * ]
     * ```
     * @param {Map<string, any>} query Query string's map object
     * @returns Array
     */
    getTotalTherapists(token, query={}) {
        const path = 'total-therapists/';
        const header = {token};
        const {
            periodAfter,
            periodBefore,
            organization,
            nicedayOnly,
            periodType,
            isActive
        } = query

        return this.get(
            path,
            header,
            {
                periodAfter,
                periodBefore,
                organization,
                nicedayOnly,
                periodType,
                isActive
            }
        );
    }

    /**
     * Get churn/retention rates active therapists.
     * 
     * Response data example:
     * ```
     * [
     *  {
     *      "periodType": "yearly",
     *      "organization": null,
     *      "startDate": "2018-01-01",
     *      "endDate": "2018-12-31",
     *      "type": "retention_rate",
     *      "value": 0.0
     *  },
     *  {
     *      "periodType": "yearly",
     *      "organization": null,
     *      "startDate": "2019-01-01",
     *      "endDate": "2019-12-31",
     *      "type": "retention_rate",
     *      "value": 0.98
     *  }
     * ]
     * ```
     * @param {Map<string, any>} query Query string's map object
     * @returns Array
     */
    getTherapistRates(token, query={}) {
        const path = 'rates/';
        const header = {token};
        const {
            periodAfter,
            periodBefore,
            organization,
            nicedayOnly,
            periodType,
            type
        } = query

        return this.get(
            path,
            header,
            {
                periodAfter,
                periodBefore,
                organization,
                nicedayOnly,
                periodType,
                type
            }
        );
    }
}

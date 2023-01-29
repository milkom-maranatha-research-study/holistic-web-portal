import { DataPresentationAPI } from "api/presentation/DataPresentationAPI";
import moment from 'moment';


const api = DataPresentationAPI.getInstance();


export async function getTherapistRateMap(token) {
    const therapistRates = await fetchTherapistRates(token);
    console.log("therapistRates", therapistRates[0]);

    const years = getAvailableYears(therapistRates);
    console.log("Years", years);

    const retentionMap = getRetentionRateMap(years, therapistRates);
    console.log("Therapist's retention rate map", retentionMap);

    const churnMap = getChurnRateMap(years, therapistRates);
    console.log("Therapist's churn rate map", churnMap);

    return {years, retentionMap, churnMap};
};

async function fetchTherapistRates(token) {
    console.log("Fetching monthly therapist' rates from BE...");

    const query = {periodType: 'monthly', nicedayOnly: true};
    const therapistRates = await api.getTherapistRates(token, query)
        .then(response => {
            return response.map((item) => ({
                ...item,
                startDate: moment(item.startDate, "YYYY/MM/DD"),
                endDate: moment(item.endDate, "YYYY/MM/DD")
            }));
        });

    return therapistRates;
}

function getAvailableYears(therapistRates) {
    console.log("Extracting available years...");

    const yearSet = {};
    therapistRates.map((item) => item.startDate.year())
        .forEach(item => yearSet[item] = item);

    return Object.entries(yearSet).map(item => item[0]);
}

function getRetentionRateMap(years, therapistRates) {
    console.log("Filtering therapist's rates...");
    const retentionRates = therapistRates.filter((item) => item.type === "retention_rate");

    console.log("Converting therapist's retention rates into a map...");
    const map = {};

    years.forEach((year) => {
      map[year] = retentionRates
        .filter((item) => item.startDate.year() >= year && item.endDate.year() <= year)
        .sort((item1, item2) => item1.endDate.toDate() - item2.endDate.toDate());  // sort ascending
    });

    return map;
}

function getChurnRateMap(years, therapistRates) {
    console.log("Filtering therapist's churn rates...");
    const churnRates = therapistRates.filter((item) => item.type === "churn_rate");

    console.log("Converting therapist's churn rates into a map...");
    const map = {};

    years.forEach((year) => {
      map[year] = churnRates
        .filter((item) => item.startDate.year() >= year && item.endDate.year() <= year)
        .sort((item1, item2) => item1.endDate.toDate() - item2.endDate.toDate());  // sort ascending
    });

    return map;
}

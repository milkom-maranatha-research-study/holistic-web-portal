import { DataPresentationAPI } from "api/presentation/DataPresentationAPI";
import moment from 'moment';


const api = DataPresentationAPI.getInstance();


export async function getOverviewTotalTherapist(token) {
    const totalTherapists = await fetchOverviewTotalTheratpist(token);
    console.log("Overview totalTherapists", totalTherapists);

    const actives = totalTherapists.filter((item) => item.isActive);
    const inactives = totalTherapists.filter((item) => !item.isActive);
    console.log("Overview actives", actives);
    console.log("Overview inactives", inactives);

    return {
        active: actives.length > 0 ? actives[0] : null,
        inactive: inactives.length > 0 ? inactives[0] : null
    };
}

async function fetchOverviewTotalTheratpist(token) {
    console.log("Fetching overview total therapist from BE...");

    const query = {periodType: 'alltime', nicedayOnly: true};
    const totalTherapists = await api.getTotalTherapists(token, query)
        .then(response => {
            return response
                .map((item) => ({
                    ...item,
                    startDate: moment(item.startDate, "YYYY/MM/DD"),
                    endDate: moment(item.endDate, "YYYY/MM/DD")
                }))
                .sort((item1, item2) => item2.endDate.toDate() - item1.endDate.toDate());  // sort descending
        });

    return totalTherapists;
}


export async function getTotalTherapistMap(token) {
    const totalTherapists = await fetchMonthlyTotalTherapists(token);
    console.log("totalTherapists", totalTherapists);

    const years = getAvailableYears(totalTherapists);
    console.log("Years", years);

    const activeMap = getActiveTherapistMap(years, totalTherapists);
    console.log("Active therapist map", activeMap);

    const inactiveMap = getInactiveTherapistMap(years, totalTherapists);
    console.log("Inactive therapist map", inactiveMap);

    return {years, activeMap, inactiveMap};
};

async function fetchMonthlyTotalTherapists(token) {
    console.log("Fetching monthly total therapist from BE...");

    const query = {periodType: 'monthly', nicedayOnly: true};
    const totalTherapists = await api.getTotalTherapists(token, query)
        .then(response => {
            return response.map((item) => ({
                ...item,
                startDate: moment(item.startDate, "YYYY/MM/DD"),
                endDate: moment(item.endDate, "YYYY/MM/DD")
            }));
        });

    return totalTherapists;
}

function getAvailableYears(totalTherapists) {
    console.log("Extracting available years...");

    const yearSet = {};
    totalTherapists.map((item) => item.startDate.year())
        .forEach(item => yearSet[item] = item);

    return Object.entries(yearSet).map(item => item[0]);
}

function getActiveTherapistMap(years, totalTherapists) {
    console.log("Filtering total active therapists...");
    const activeTherapists = totalTherapists.filter((item) => item.isActive);

    console.log("Converting total active therapists into a map...");
    const map = {};

    years.forEach((year) => {
      map[year] = activeTherapists
        .filter((item) => item.startDate.year() >= year && item.endDate.year() <= year)
        .sort((item1, item2) => item1.endDate.toDate() - item2.endDate.toDate());  // sort ascending
    });

    return map;
}

function getInactiveTherapistMap(years, totalTherapists) {
    console.log("Filtering total inactive therapists...");
    const inactiveTherapists = totalTherapists.filter((item) => !item.isActive);

    console.log("Converting total inactive therapists into a map...");
    const map = {};

    years.forEach((year) => {
      map[year] = inactiveTherapists
        .filter((item) => item.startDate.year() >= year && item.endDate.year() <= year)
        .sort((item1, item2) => item1.endDate.toDate() - item2.endDate.toDate());  // sort ascending
    });

    return map;
}

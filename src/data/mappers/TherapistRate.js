
export function toMonthlyValues(therapistRates) {
    const monthlyMap = {
        0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0,
        6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0
    };

    therapistRates.forEach((item) => {
        monthlyMap[item.startDate.month()] = item.value
    });

    return Object.entries(monthlyMap).map(item => item[1]);
}

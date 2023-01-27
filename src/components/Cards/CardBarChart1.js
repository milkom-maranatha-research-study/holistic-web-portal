import React, {useState} from "react";
import Chart from "chart.js";

import dataTotal from '../../data/be_total_therapists.json'
import './drop.css'

import moment from 'moment';


export default function CardBarChart1() {
  // Data preparations
  const appDataTotal = React.useMemo(() => {
    console.log("Fetching data total therapist by app...");
    return dataTotal.filter((item) => !item.organization_id && item.period_type === "monthly");
  }, []);

  // Extracts available years
  const years = React.useMemo(() => {
    console.log("Fetching available years...");

    const yearSet = {};

    appDataTotal.map((item) => moment(item.start_date, "YYYY/MM/DD").year())
      .forEach(item => yearSet[item] = item);

    return Object.entries(yearSet).map(item => item[0]);
  }, [appDataTotal]);

  console.log(years);

  // Active Ther
  const appTotalActiveThers = React.useMemo(() => {
    console.log("Fetching total active therapists...");

    return appDataTotal
      .filter((item) => item.type === "active")
      .map((item) => ({
        ...item,
        start_date: moment(item.start_date, "YYYY/MM/DD"),
        end_date: moment(item.end_date, "YYYY/MM/DD")
      }));
  }, [appDataTotal]);

  const totalActiveTherMap = React.useMemo(() => {
    console.log("Converting total active therapists into a map...");

    const map = {};

    years.forEach((year) => {
      map[year] = appTotalActiveThers
        .filter((item) => item.start_date.year() >= year && item.end_date.year() <= year)
        .sort((item1, item2) => item1.end_date.toDate() - item2.end_date.toDate());  // sort ascending
    });

    return map;
  }, [years, appTotalActiveThers]);

  console.log(totalActiveTherMap);

  // Inactive Ther
  const appTotalInactiveThers = React.useMemo(() => {
    console.log("Fetching total inactive therapists...");

    return appDataTotal
      .filter((item) => item.type === "inactive")
      .map((item) => ({
        ...item,
        start_date: moment(item.start_date, "YYYY/MM/DD"),
        end_date: moment(item.end_date, "YYYY/MM/DD")
      }));
  }, [appDataTotal]);

  const totalInactiveTherMap = React.useMemo(() => {
    console.log("Converting total inactive therapists into a map...");

    const map = {};

    years.forEach((year) => {
      map[year] = appTotalInactiveThers
        .filter((item) => item.start_date.year() >= year && item.end_date.year() <= year)
        .sort((item1, item2) => item1.end_date.toDate() - item2.end_date.toDate());  // sort ascending
    });
    return map;
  }, [years, appTotalInactiveThers]);

  // View States
  const [isOpen, setOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(years[years.length - 1]);
  const [selectedActiveThers, setSelectedActiveTher] = useState(
    totalActiveTherMap[selectedYear].map((item) => item.value)
  );
  const [selectedInactiveThers, setSelectedInactiveTher] = useState(
    totalInactiveTherMap[selectedYear].map((item) => item.value)
  );

  // View Actions
  const getMonthlyMap = React.useCallback(() => ({
    0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0,
    6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0
  }), [])
  const toggleDropdown = React.useCallback(() => setOpen(!isOpen), [isOpen]);
  const selectYear = React.useCallback((year) => {
    setOpen(!isOpen);

    setSelectedYear(year);

    let monthlyMap = getMonthlyMap();
    totalActiveTherMap[year].forEach((item) => {
      monthlyMap[item.start_date.month()] = item.value
    });
    setSelectedActiveTher(Object.entries(monthlyMap).map(item => item[1]));

    monthlyMap = getMonthlyMap();
    totalInactiveTherMap[year].forEach((item) => {
      monthlyMap[item.start_date.month()] = item.value
    });
    setSelectedInactiveTher(Object.entries(monthlyMap).map(item => item[1]));

  }, [totalActiveTherMap, totalInactiveTherMap, isOpen, getMonthlyMap]);


  React.useEffect(() => {
    let config = {
      type: "bar",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: 'Active Therapist',
            backgroundColor: "#ed64a6",
            borderColor: "#ed64a6",
            data: selectedActiveThers,
            fill: false,
            barThickness: 8,
          },
          {
            label: 'Inactive Therapist',
            fill: false,
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: selectedInactiveThers,
            barThickness: 8,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Orders Chart",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: [
            {
              display: false,
              scaleLabel: {
                display: true,
                labelString: "Month",
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
              },
              gridLines: {
                borderDash: [2],
                drawBorder: false,
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.2)",
                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };

    // Reset bar-chart
    if (window.myBar !== undefined) {
      window.myBar.destroy();
    }

    let ctx = document.getElementById("bar-chart").getContext("2d");
    window.myBar = new Chart(ctx, config);
  }, [selectedActiveThers, selectedInactiveThers]);

  const yearItemViews = years.map((year) => {
    return (
      <div className="dropdown-item" key={year} onClick={() => selectYear(year)}>
        {year}
      </div>
    )
  })

  return (
    <>
      {/* Dropdown Tahun */}
      <div className="py-5">
        <div className='dropdown'>
          <div className='dropdown-header' onClick={toggleDropdown}>
            Selected Year : {selectedYear}
            <i className={`fa fa-chevron-right icon ${isOpen && "open"}`}></i>
          </div>
          <div className={`dropdown-body ${isOpen && 'open'}`}>
            {yearItemViews}
          </div>
        </div>
      </div>

      <div className="flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Bar Chart
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
           
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="bar-chart"></canvas>
          </div>
        </div>
      </div>
   
    </>
  );
}

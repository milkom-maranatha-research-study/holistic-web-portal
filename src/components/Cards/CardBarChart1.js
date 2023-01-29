import React, {useState} from "react";
import Chart from "chart.js";

import { getTotalTherapistMap } from "data/TotalTherapist"; 
import { toMonthlyValues } from "data/mappers/TotalTherapist";
import './drop.css';

export default function CardBarChart1() {

  // View States
  const [isYearPopUpOpen, setIsYearPopUpOpen] = useState(false);
  const [years, setYears] = useState([]);
  const [activeMap, setActiveMap] = useState({});
  const [inactiveMap, setInactiveMap] = useState({});

  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedActiveThers, setSelectedActiveThers] = useState(null);
  const [selectedInactiveThers, setSelectedInactiveThers] = useState(null);

  // View Actions
  const toggleDropdown = React.useCallback(() => (
    setIsYearPopUpOpen(!isYearPopUpOpen)
  ), [isYearPopUpOpen]);

  const selectYear = React.useCallback((year) => {
    setIsYearPopUpOpen(!isYearPopUpOpen);
    setSelectedYear(year);

    setSelectedActiveThers(toMonthlyValues(activeMap[year]));
    setSelectedInactiveThers(toMonthlyValues(inactiveMap[year]));
  }, [activeMap, inactiveMap, isYearPopUpOpen]);

  // Data preparations
  const token = React.useMemo(() => localStorage.getItem('token'), []);

  React.useMemo(() => {
    getTotalTherapistMap(token).then(map => {
      const {years, activeMap, inactiveMap} = map;
      const latestYear = years[years.length - 1];

      setYears(years);
      setActiveMap(activeMap);
      setInactiveMap(inactiveMap);

      setSelectedYear(latestYear);
      setSelectedActiveThers(toMonthlyValues(activeMap[latestYear]));
      setSelectedInactiveThers(toMonthlyValues(inactiveMap[latestYear]));
    });
  }, [token]);

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
            {selectedYear ? `Selected Year : ${selectedYear}` : 'Select Year'}
            <i className={`fa fa-chevron-right icon ${isYearPopUpOpen && "open"}`}></i>
          </div>
          <div className={`dropdown-body ${isYearPopUpOpen && 'open'}`}>
            {yearItemViews}
          </div>
        </div>
      </div>

      <div className="flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Active & Inactive Therapists Bar Chart
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

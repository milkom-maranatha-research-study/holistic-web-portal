import React, {useState}  from "react";
import Chart from "chart.js";

import dataRate from '../../data/be_therapists_rates.json';
import './drop.css'

import moment from 'moment';

export default function CardBarChart2() {
  // Data preparations
  // Extracts unique years
  const appDataRate = dataRate.filter((item) => !item.organization_id);

  const yearSet = {};
  appDataRate.map((item) => moment(item.start_date, "YYYY/MM/DD").year())
    .forEach(item => yearSet[item] = item);

  const years = Object.entries(yearSet).map(item => item[0])
  console.log(years);

  // Retention Rate
  const appRetentionRates = appDataRate
    .filter((item) => item.type === "retention_rate" && item.period_type === "monthly")
    .map((item) => ({
      ...item,
      start_date: moment(item.start_date, "YYYY/MM/DD"),
      end_date: moment(item.end_date, "YYYY/MM/DD")
    }));

  const retentionRateMap = {};
  years.forEach((year) => {
    retentionRateMap[year] = appRetentionRates
      .filter((item) => item.start_date.year() >= year && item.end_date.year() <= year)
      .sort((item1, item2) => item1.end_date.toDate() - item2.end_date.toDate())  // sort ascending
      .map((item) => item.value);
  })
  console.log(retentionRateMap);

  // Churn Rate
  const appChurnRates = appDataRate
  .filter((item) => item.type === "churn_rate" && item.period_type === "monthly")
  .map((item) => ({
    ...item,
    start_date: moment(item.start_date, "YYYY/MM/DD"),
    end_date: moment(item.end_date, "YYYY/MM/DD")
  }));

  const churnRateMap = {};
  years.forEach((year) => {
    churnRateMap[year] = appChurnRates
      .filter((item) => item.start_date.year() >= year && item.end_date.year() <= year)
      .sort((item1, item2) => item1.end_date.toDate() - item2.end_date.toDate())  // sort ascending
      .map((item) => item.value);
  })

  // View States
  const [isOpen, setOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(years[years.length - 1]);

  // View Actions
  const toggleDropdown = () => setOpen(!isOpen);
  const selectYear = (year) => {
    setSelectedYear(year);
    toggleDropdown();
  }
  
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
        ],
        datasets: [
          {
            label: 'Retention Rate',
            backgroundColor: "#ed64a6",
            borderColor: "#ed64a6",
            data: retentionRateMap[years[4]],  // TODO: Pass selected YEAR HERE!!!
            fill: false,
            barThickness: 8,
          },
          {
            label: 'Churn Rate',
            fill: false,
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: churnRateMap[years[4]],  // TODO: Pass selected YEAR HERE!!!,
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
    let ctx = document.getElementById("bar-chart").getContext("2d");
    window.myBar = new Chart(ctx, config);
  }, [selectedYear]);

  const yearItemViews = years.map((year) => {
    return (
      <div className="dropdown-item" onClick={() => selectYear(year)}>
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
            Selected Year: {selectedYear}
            <i className={`fa fa-chevron-right icon ${isOpen && "open"}`}></i>
          </div>
          <div className={`dropdown-body ${isOpen && 'open'}`}>
            {yearItemViews}
          </div>
        </div>
      </div>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
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

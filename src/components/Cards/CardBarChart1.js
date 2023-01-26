import React,{useState} from "react";
import Chart from "chart.js";
import dataTotal from '../../data/be_total_therapists.json'
import './drop.css'

import moment from 'moment';


export default function CardBarChart1() {
  // Data preparations
  // Extracts unique years
  const appDataTotal = dataTotal.filter((item) => !item.organization_id);

  const yearSet = {};
  appDataTotal.map((item) => moment(item.start_date, "YYYY/MM/DD").year())
    .forEach(item => yearSet[item] = item);

  const years = Object.entries(yearSet).map(item => item[0])
  console.log(years);

  // Active Ther
  const appTotalActiveThers = appDataTotal
    .filter((item) => item.type === "active" && item.period_type === "monthly")
    .map((item) => ({
      ...item,
      start_date: moment(item.start_date, "YYYY/MM/DD"),
      end_date: moment(item.end_date, "YYYY/MM/DD")
    }));

  const totalActiveTherMap = {};
  years.forEach((year) => {
    totalActiveTherMap[year] = appTotalActiveThers
      .filter((item) => item.start_date.year() >= year && item.end_date.year() <= year + 1)
      .sort((item1, item2) => item1.end_date.toDate() - item2.end_date.toDate())  // sort ascending
      .map((item) => item.value);
  })
  console.log(totalActiveTherMap);

  // Inactive Ther
  const appTotalInactiveThers = appDataTotal
  .filter((item) => item.type === "inactive" && item.period_type === "monthly")
  .map((item) => ({
    ...item,
    start_date: moment(item.start_date, "YYYY/MM/DD"),
    end_date: moment(item.end_date, "YYYY/MM/DD")
  }));

  const totalInactiveTherMap = {};
  years.forEach((year) => {
    totalInactiveTherMap[year] = appTotalInactiveThers
      .filter((item) => item.start_date.year() >= year && item.end_date.year() <= year + 1)
      .sort((item1, item2) => item1.end_date.toDate() - item2.end_date.toDate())  // sort ascending
      .map((item) => item.value);
  })

  const [isOpen, setOpen] = useState(false);
  
  const toggleDropdown = () => setOpen(!isOpen);
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
            label: 'Active Therapist',
            backgroundColor: "#ed64a6",
            borderColor: "#ed64a6",
            data: totalActiveTherMap[years[4]],  // TODO: Pass selected YEAR HERE!!!
            fill: false,
            barThickness: 8,
          },
          {
            label: 'Inactive Therapist',
            fill: false,
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: totalInactiveTherMap[years[4]],  // TODO: Pass selected YEAR HERE!!!
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
  }, []);

  return (
    <>
    {/* Dropdown Tahun */}
    <div className="py-5">
      <div className='dropdown'>
        <div className='dropdown-header' onClick={toggleDropdown}>
          Select Year
          <i className={`fa fa-chevron-right icon ${isOpen && "open"}`}></i>
        </div>
        <div className={`dropdown-body ${isOpen && 'open'}`}>
          {/* TODO: RENDER `years` to the DROPDOWN???*/}
          <div className="dropdown-item">
              2019
            </div>
            <div className="dropdown-item">
              2018
            </div>
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

import React, {useState} from "react";
import dataTotal from '../../data/be_total_therapists.json'
import Moment from 'react-moment';
import moment from 'moment';

// components

import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {

  

  // dataTotal.forEach(item => {
  //   if (item.period_type === "alltime") {
  //    totalTerapis += item.value;
  //   }
  // });
  // let appDataTotalActive = dataTotal.filter((item) => item.period === "alltime")
  // .map((item) => ({...item, end_date: moment(item.end_date, "DD/MM/YYYY").toDate()}))
  // .sort((item1, item2) => item2.end_date - item1.end_date)
  
  // console.log(appDataTotalActive[0].end_date.toString())
  console.log(dataTotal[0])
  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap mx-auto">
              <div className="w-1/4 px-4">
                <CardStats
                  statSubtitle="TOTAL ACTIVE TERAPHISTS"
                  statTitle="{appDataTotalActive}"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

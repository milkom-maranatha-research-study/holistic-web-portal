import React, {useState} from "react";
import dataTotal from '../../data/be_total_therapists.json'
import moment from 'moment';

// components

import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {
  
  let appDataTotalActive = dataTotal
    .filter((item) => !item.organization_id && item.type === "active" && item.period_type === "alltime")
    .map((item) => ({...item, end_date: moment(item.end_date, "YYYY/MM/DD").toDate()}))
    .sort((item1, item2) => item2.end_date - item1.end_date)

  console.log(appDataTotalActive[0])
  console.log(dataTotal[0].organization_id)
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

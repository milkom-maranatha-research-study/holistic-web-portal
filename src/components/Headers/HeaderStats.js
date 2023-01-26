import React, {useState} from "react";
import dataTotal from '../../data/be_total_therapists.json'
import moment from 'moment';

// components

import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {
  
  const appDataTotalActive = dataTotal
    .filter((item) => !item.organization_id && item.type === "active" && item.period_type === "alltime")
    .map((item) => ({
      ...item,
      start_date: moment(item.end_date, "YYYY/MM/DD").toDate(),
      end_date: moment(item.end_date, "YYYY/MM/DD").toDate()
    }))
    .sort((item1, item2) => item2.end_date - item1.end_date);

  const appDataTotalInactive = dataTotal
    .filter((item) => !item.organization_id && item.type === "inactive" && item.period_type === "alltime")
    .map((item) => ({
      ...item,
      start_date: moment(item.end_date, "YYYY/MM/DD").toDate(),
      end_date: moment(item.end_date, "YYYY/MM/DD").toDate()
    }))
    .sort((item1, item2) => item2.end_date - item1.end_date);

  const recentTotalActiveTher = appDataTotalActive[0].value;
  const recentTotalInactiveTher = appDataTotalInactive[0].value;

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
                  statTitle={recentTotalActiveTher}
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

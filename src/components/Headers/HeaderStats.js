import React, {useState} from "react";

import { getOverviewTotalTherapist } from "data/TotalTherapist";
import moment from "moment";

// components

import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {

  // Data preparations
  const token = React.useMemo(() => localStorage.getItem('token'), []);

  const [totalActive, setTotalActive] = useState(null);
  const [totalInactive, setTotalInactive] = useState(null);
  
  React.useMemo(() => {
    getOverviewTotalTherapist(token).then(map => {
      const {active, inactive} = map;

      setTotalActive(active);
      setTotalInactive(inactive);
    });
  }, [token]);

  return (
    <>
      {/* Header */}
      <div className="bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-1/2 lg:w-1/2 xl:w-1/2 px-4">
                <CardStats
                  statSubtitle="TOTAL ACTIVE TERAPHISTS"
                  statTitle={totalActive?.value.toString()}
                  statLastUpdated={"Last synchronized at " + totalActive?.endDate.format('D MMM, YYYY')}
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
              <div className="w-1/2 lg:w-1/2 xl:w-1/2 px-4">
                <CardStats
                  statSubtitle="TOTAL INACTIVE TERAPHISTS"
                  statTitle={totalInactive?.value.toString()}
                  statLastUpdated={"Last synchronized at " + totalInactive?.endDate.format('D MMM, YYYY')}
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

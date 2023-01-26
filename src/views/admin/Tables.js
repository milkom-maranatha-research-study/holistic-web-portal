import React, {useEffect,useState} from "react";

// components

import CardBarChart2 from "components/Cards/CardBarChart2";
import { AccountAPI } from "api/authentication/AccountAPI";
import { AuthAPI } from "api/authentication/AuthAPI";
import { DataPresentationAPI } from "api/presentation/DataPresentationAPI";
import { data } from "autoprefixer";

// const authApi = AuthAPI.getInstance();

export default function Tables(props) {
  // const [token, setToken] = useState(localStorage.getItem('token'));
  // const [therapistsData, setTherapistsData] = useState([]);
  // // const token = useSelector(state => state.auth.token); // assuming you have token in your auth state
  
  // useEffect(() => {
  //   const api = DataPresentationAPI.getInstance();
  //   api.getTotalTherapists(token, {
  //       periodAfter: "2019-01-01",
  //       periodBefore: "2019-12-31",
  //       isActive: true
  //   })
  //     .then(data => {setTherapistsData(data);
  //     console.log('token 2',token);})
  //     .catch(error => console.log(error))
  // }, [token]);

  // function logout() {
  //   if (!token) {
  //     alert("Please login first!");
  //     return;
  //   }
  //   authApi.logout(token)
  //      .then(response => {
  //         console.log(response);
  //         console.log(token)
  //         setToken(null);
  //         props.history.push('/');
  //      })
  //      .catch(err => console.error(err));
  // }
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-1/2 mb-12 xl:mb-0 px-4">
        <CardBarChart2/>
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="text-center mt-6">
              <button
                className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                // onClick={() => logout()}
              >
                Sign Out
              </button>

            </div>
      </div>
    </>
  );
}

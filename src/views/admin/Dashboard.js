import React, {useEffect,useState} from "react";

import CardBarChart1 from "components/Cards/CardBarChart1";
import { AccountAPI } from "api/authentication/AccountAPI";
import { AuthAPI } from "api/authentication/AuthAPI";
import { DataPresentationAPI } from "api/presentation/DataPresentationAPI";
import { data } from "autoprefixer";


// const authApi = AuthAPI.getInstance();

export default function Dashboard(props) {
  const [id, setId] = useState(localStorage.getItem('id'));
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

   function logout() {
    if (!id) {
      alert("Please login first!");
      return;
    }
    alert('Are you sure you want to sign out?');
    setId(null);
    props.history.push('/');
  }
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-1/2 mb-12 xl:mb-0 px-4">
        <CardBarChart1/>
        </div>
      </div>
    </>
  );
}

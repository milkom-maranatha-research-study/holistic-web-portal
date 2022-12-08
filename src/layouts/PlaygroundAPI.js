import React, { useState } from "react";
import { AccountAPI } from "api/authentication/AccountAPI";
import { AuthAPI } from "api/authentication/AuthAPI";

const authApi = AuthAPI.getInstance();
const accountApi = AccountAPI.getInstance();

export default function PlaygroundAPI() {
  const [token, setToken] = useState(null);

  function login() {
    authApi.login("panji", "Test@12345")
       .then(response => {
          console.log(response.expiry);
          console.log(response.token);
          console.log(response.user);

          setToken(response.token);
       })
       .catch(err => console.error(err));
  }

  function getAccount() {
    accountApi.getAccount(token)
       .then(response => console.log(response))
       .catch(err => console.error(err));  
  }

  function logout() {
    authApi.logout()
       .then(response => {
          console.log(response);

          setToken(null);
       })
       .catch(err => console.error(err));
  }

  return (
    <>
      {/* <Navbar transparent /> */}
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-400"
          >
            <div className="text-center mt-6">
              <button
                className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => login()}
              >
                Sign In
              </button>
            </div>
            <div className="text-center mt-6">
              <button
                className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => getAccount()}
              >
                View Profile
              </button>
            </div>
            <div className="text-center mt-6">
              <button
                className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => logout()}
              >
                Sign Out
              </button>
            </div>
          </div>
          {/* <FooterSmall absolute /> */}
        </section>
      </main>
    </>
  );
}

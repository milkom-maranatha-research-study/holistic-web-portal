import React, {useState} from "react";
import { AuthAPI } from "api/authentication/AuthAPI";


const authApi = AuthAPI.getInstance();

export default function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (isLoggingIn) {
      return;
    }

    setIsLoggingIn(true);

    authApi.login(username, password)
      .then(response => {
        console.log(response.expiry);
        console.log(response.token);
        console.log(response.user);
        
        // store the user in localStorage
        localStorage.setItem('user', response.user);
        localStorage.setItem('token', response.token)

        props.history.push('/admin/Dashboard');

        setIsLoggingIn(true);
      })
      .catch(err => {
        console.error(err);

        props.history.push('/');
        window.alert("Invalid Username or Password!");

        setIsLoggingIn(false);
      });
  }

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-10">
                <form className="py-4" onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Username
                    </label>
                    <input
                    id="username"
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Username"
                      value={username} onChange={event => setUsername(event.target.value)}
                      required
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      id="password"
                      value={password} onChange={event => setPassword(event.target.value)}
                      required
                    />
                  </div>

                  <div className="text-center mt-6">
                    <input
                      className="cursor-pointer bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                      value="Sign in"
                    />
                     
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

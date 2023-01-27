import React, {useState} from "react";
import { createPopper } from "@popperjs/core";
import { Redirect } from "react-router";

const UserDropdown = ({onclick}) => {
  const [id, setId] = useState(localStorage.getItem('id'));
  const [redirect, setRedirect] = useState(false);
 
  
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  if(redirect){
    return <Redirect to={{ pathname: '/' }} />;
  };
const logout= ()=> {
    if (!id) {
      alert("Please login first!");
      return;
    }
    alert('Are you sure you want to sign out?');
    setRedirect(true);
    setId(null);
  }
  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-10 h-10 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={require("assets/img/user.png").default}
            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          href=""
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={logout}
        >
          Sign Out
        </a>
      </div>
    </>
  );
};

export default UserDropdown;

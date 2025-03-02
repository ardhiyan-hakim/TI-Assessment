import "/public/assets/components/Header.scss";

import { useState } from "react";
import { FaMagnifyingGlass, FaBell } from "react-icons/fa6";
import { MdArrowDropDown } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
export default function Header() {
  const [searchInput, setSearchInput] = useState("");

  return (
    <header>
      <div className="logo-container">
        <div>
          <a href="/">
            <b>LOGO</b>
          </a>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Property"
            className="search-input"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <FaMagnifyingGlass />
        </div>
      </div>
      <div className="profile-container">
        <ul>
          <li>
            <IoMdMail color="white" />
          </li>
          <li>
            <FaBell color="white" />
          </li>
          {false ? (
            <li>
              <button type="button" onClick={()=>{}}>
                Logout
              </button>
            </li>
          ) : (
            <li>
              <button type="button">
                <a href="http:/login">Login</a>
              </button>
            </li>
          )}
          <li className="profile-picture">
            <img src="/public/assets/profile.webp" alt="profile" />
            <MdArrowDropDown color="white" />
          </li>
        </ul>
      </div>
    </header>
  );
}

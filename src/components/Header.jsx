import { useState } from "react";
import { FaMagnifyingGlass, FaBell } from "react-icons/fa6";

export default function Header() {
  const [searchInput, setSearchInput] = useState("");

  return (
    <header>
      <div className="logo-container">
        <div>LOGO</div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Property"
            className="search-input"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <hr />
          <FaMagnifyingGlass />
        </div>
      </div>
      <div className="profile-container">
        <ul>
          <li>
            <a href="#">Profile</a>
          </li>
          <li>
            <FaBell />
          </li>
          <li className="profile-picture"></li>
        </ul>
      </div>
    </header>
  );
}

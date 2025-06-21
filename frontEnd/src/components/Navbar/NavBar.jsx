import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { CiBellOn } from "react-icons/ci";

import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="nav-bar">
      <ul>
        <li>
          <button type="button" className="menu-button">
            <IoSettingsOutline size={20} />
          </button>
        </li>
        <li>
          <button type="button" className="menu-button">
            <CiBellOn size={20} />
          </button>
        </li>
        <li>
          <button type="button" className="menu-button">
            <CgProfile size={20} />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;

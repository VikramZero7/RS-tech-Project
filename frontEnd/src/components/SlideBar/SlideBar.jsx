import { useState } from "react";
import { menuItem } from "../../assets/assets";
import { Link } from "react-router-dom";

import "./SlideBar.css";

const SlideBar = () => {
  const [menu, setMenu] = useState("Dashboard");
  return (
    <div>
      <div className="logo-container">
        <h1 className="text-primary">RS-TECH</h1>
      </div>
      <ul className="slidebar-menu">
        {menuItem.map((eachItem) => {
          const Icons = eachItem.icon;
          return (
            <Link to={`/${eachItem.path}`} key={eachItem.id} className="link">
              <li
                className={`slidebar-menu-li ${
                  menu === eachItem.menuText ? "isActive" : ""
                }`}
                onClick={() => setMenu(eachItem.menuText)}
              >
                <Icons size={20} />
                {eachItem.menuText}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default SlideBar;

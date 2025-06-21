import { CiSearch, CiCirclePlus } from "react-icons/ci";
import EmployeeTable from "./EmployeeTable/EmployeeTable";
import { Link } from "react-router-dom";
import "./Employee.css";
import { useState } from "react";

const Employee = () => {
  const [search, setSeach] = useState();
  return (
    <div>
      <div className="employee-container">
        <h1>Employee</h1>
        <div className="employee-serchAdd-container">
          <div className="input-container">
            <CiSearch size={25} />
            <input
              type="search"
              placeholder="Search"
              onChange={(e) => setSeach(e.target.value)}
            />
          </div>
          <Link to="/empform" className="link">
            <div className="add-empolyee-container">
              <CiCirclePlus size={25} className="icon" />
              <button>Add New Employee</button>
            </div>
          </Link>
        </div>
      </div>
      <EmployeeTable search={search} />
    </div>
  );
};

export default Employee;

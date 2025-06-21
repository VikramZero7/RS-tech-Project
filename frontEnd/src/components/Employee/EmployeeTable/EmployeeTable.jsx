import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router-dom";
import { MdRemoveRedEye, MdOutlineDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

import axios from "axios";
import "./EmployeeTable.css";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const EmployeeTable = ({ search }) => {
  const [empList, setEmpList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchallEmpoyee = async () => {
      try {
        const url =
          search && search.trim() !== ""
            ? `${backendUrl}/api/employee/all?search_q=${search}`
            : `${backendUrl}/api/employee/all`;
        const response = await axios.get(url);
        setEmpList(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchallEmpoyee();
  }, [search]);

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/employee/delete/${id}`);
      setEmpList((prev) => prev.filter((emp) => emp.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="employee-table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Employee Id</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Project</th>
            <th>Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {empList.map((eachlist) => (
            <tr key={eachlist.id}>
              <td className="profile-con">
                <img
                  src={eachlist.profileImage}
                  className="profile"
                  alt="profile"
                />
                {eachlist.name}
              </td>
              <td>{eachlist.employeeId}</td>
              <td>{eachlist.department}</td>
              <td>{eachlist.designation}</td>
              <td>{eachlist.project}</td>
              <td>{eachlist.type}</td>
              <td>{eachlist.status}</td>
              <td className="editable-container">
                <MdRemoveRedEye
                  size={24}
                  onClick={() => navigate(`/viewemployee/${eachlist.id}`)}
                />
                <FaRegEdit
                  size={24}
                  onClick={() => navigate(`/empform/edit`, { state: eachlist })}
                />
                <Popup
                  modal
                  trigger={
                    <button type="button" className="icon-button">
                      <MdOutlineDeleteOutline size={24} />
                    </button>
                  }
                >
                  {(close) => (
                    <div className="delete-container">
                      <h3>Are You Sure ?</h3>
                      <div className="delete-bdn">
                        <button
                        type="button"
                        className="trigger-button cancelbutton"
                        onClick={() => close()}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteEmployee(eachlist.id)}
                        className="trigger-button deleteButton"
                      >
                        Delete
                      </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {empList.length === 0 && (
        <div className="no-record-container">
          <h3>No Records</h3>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;

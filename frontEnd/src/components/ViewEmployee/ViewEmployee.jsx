import { FaChevronLeft, FaCamera } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import "./ViewEmployee.css";
import { useEffect, useState } from "react";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ViewEmployee = () => {
  const [viewData, setViewData] = useState();

  const navigator = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const getView = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/employee/view/${id}`
        );
        setViewData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getView();
  }, [id]);
  const viewDetails = viewData?.[0] || {};

  return (
    <div>
      <div className="employee-form-heading">
        <FaChevronLeft size={32} onClick={() => navigator("/employee")} />
        <h1>View Employee</h1>
      </div>
      <div className="personal-info-container">
        <div className="employee-info">
          <IoPerson size={18} />
          <h2>Personal Information</h2>
        </div>
        <hr />
      </div>
      <div className="view-container">
        <div className="photo-upload-container">
          <img src={viewDetails.profileImage} />
        </div>
      </div>
      <div className="info-contain-view">
        <div className="info-container">
          <p>Name</p>
          <h3>{viewDetails.name}</h3>
        </div>
        <div className="info-container">
          <p>Employee Id</p>
          <h3>{viewDetails.employeeId}</h3>
        </div>
      </div>
      <div className="info-contain-view">
        <div className="info-container">
          <p>Department</p>
          <h3>{viewDetails.department}</h3>
        </div>
        <div className="info-container">
          <p>Designation</p>
          <h3>{viewDetails.designation}</h3>
        </div>
      </div>
      <div className="info-contain-view">
        <div className="info-container">
          <p>Project</p>
          <h3>{viewDetails.project}</h3>
        </div>
        <div className="info-container">
          <p>Type</p>
          <h3>{viewDetails.type}</h3>
        </div>
      </div>
      <div className="info-contain-view">
        <div className="info-container">
          <p>Status</p>
          <h3>{viewDetails.status}</h3>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;

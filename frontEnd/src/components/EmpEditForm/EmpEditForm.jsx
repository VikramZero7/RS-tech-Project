import { useEffect, useState } from "react";
import { FaChevronLeft, FaCamera } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./EmpEditForm.css";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const EmpEditForm = () => {
  const [preview, setPreview] = useState(null);
  const { register, handleSubmit, watch, reset, setValue } = useForm();
  const location = useLocation();
  const navigator = useNavigate();
  const editData = location.state;

  // Pre-fill form on mount
  useEffect(() => {
    if (editData) {
      reset(editData);
      setPreview(editData.profileImage);
    }
  }, [editData, reset]);

  const formWatch = watch();
  const isEmpty = Object.values(formWatch).every((val) => !val);

  const submitForm = async (data) => {
    const formData = new FormData();

    // Only add profileImage if a new one is selected
    if (data.profileImage?.[0]) {
      formData.append("profileImage", data.profileImage[0]);
    }
    formData.append("name", data.name);
    formData.append("employeeId", data.employeeId);
    formData.append("department", data.department);
    formData.append("designation", data.designation);
    formData.append("project", data.project);
    formData.append("type", data.type);
    formData.append("status", data.status);

    try {
      const res = await axios.put(
        `${backendUrl}/api/employee/edit/${editData.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Success:", res.data);
      navigator("/employee");
      reset();
      setPreview(null);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
    }
  };

  const cancelButton = () => {
    if (isEmpty) {
      navigator("/employee");
    } else {
      reset({
        name: "",
        employeeId: "",
        department: "",
        designation: "",
        project: "",
        type: "",
        status: "",
        profileImage: null,
      });
      setPreview(null);
    }
  };

  return (
    <div>
      <div className="employee-form-heading">
        <FaChevronLeft size={32} onClick={() => navigator("/employee")} />
        <h1>Edit Employee</h1>
      </div>

      <div className="personal-info-container">
        <div className="employee-info">
          <IoPerson size={18} />
          <h2>Personal Information</h2>
        </div>
        <hr />

        <form onSubmit={handleSubmit(submitForm)}>
          <label htmlFor="profileInput" className="photo-upload-container">
            {preview ? (
              <img src={preview} alt="Preview" />
            ) : (
              <FaCamera size={24} />
            )}
          </label>

          <input
            id="profileInput"
            type="file"
            accept="image/*"
            hidden
            ref={(el) => {
              if (el) {
                el.onchange = (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setValue("profileImage", e.target.files);
                    setPreview(URL.createObjectURL(file));
                  }
                };
              }
            }}
          />

          <div className="form-con">
            <div className="form-input-conatiner">
              <label>Name*</label>
              <input
                type="text"
                placeholder="Enter Name"
                {...register("name", { required: "name is required" })}
              />
            </div>
            <div className="form-input-conatiner">
              <label>Employee Id*</label>
              <input
                type="text"
                placeholder="Enter Employee Id"
                {...register("employeeId", {
                  required: "employeeId is required",
                })}
              />
            </div>
            <div className="form-input-conatiner">
              <label>Department*</label>
              <select
                {...register("department", {
                  required: "department is required",
                })}
              >
                <option value="">-- Select Department--</option>
                <option value="UI/UX design">UI/UX design</option>
                <option value="Web">Web</option>
                <option value="Mobile">Mobile</option>
              </select>
            </div>
            <div className="form-input-conatiner">
              <label>Designation*</label>
              <select
                {...register("designation", {
                  required: "designation is required",
                })}
              >
                <option value="">-- Select Designation--</option>
                <option value="UI/UX designer">UI/UX designer</option>
                <option value="Web Developer">Web Developer</option>
                <option value="Mobile Developer">Mobile Developer</option>
              </select>
            </div>
            <div className="form-input-conatiner">
              <label>Project*</label>
              <input
                type="text"
                placeholder="Enter Project"
                {...register("project", { required: "project is required" })}
              />
            </div>
            <div className="form-input-conatiner">
              <label>Type*</label>
              <select {...register("type", { required: "type is required" })}>
                <option value="">-- Select Type--</option>
                <option value="Office">Office</option>
                <option value="WFH">WFH</option>
                <option value="Hybird">Hybird</option>
              </select>
            </div>
            <div className="form-input-conatiner">
              <label>Status*</label>
              <input
                type="text"
                placeholder="Enter Status"
                {...register("status", { required: "status is required" })}
              />
            </div>
          </div>

          <div className="form-button-container">
            <button
              onClick={cancelButton}
              type="button"
              className="form-buttons cancel-button"
            >
              Cancel
            </button>
            <button type="submit" className="form-buttons sumbit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmpEditForm;

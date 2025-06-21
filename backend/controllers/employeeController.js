const db = require("../utils/db");

const addEmployee = (req, res) => {
  const { name, employeeId, department, designation, project, type, status } =
    req.body;
  const imageUrl = req.file?.path || null;
  const addQuery = `
       INSERT INTO employees (name, employeeId, department, designation, project, type, status,profileImage)
       Values (?,?,?,?,?,?,?,?);
    `;

  const values = [
    name,
    employeeId,
    department,
    designation,
    project,
    type,
    status,
    imageUrl,
  ];
  db.execute(addQuery, values, (err, result) => {
    if (err) {
      console.log(`DB Error ${err.message}`);
      return res.status(500).json({ message: "Server Error" });
    }
    res.status(201).json({ message: "Employee Added", employeeId: result });
  });
};

const getAllEmployees = (req, res) => {
  const { search_q } = req.query;

  let query = "SELECT * FROM employees";
  let params = [];

  if (search_q !== undefined && search_q.trim() !== "") {
    query = "SELECT * FROM employees WHERE name = ?";
    params = [search_q.trim()];
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

const updateEmployee = (req, res) => {
  const { name, employeeId, department, designation, project, type, status } =
    req.body;
  const { id } = req.params;
  const imageUrl = req.file?.path;

  // 1. First, get existing profileImage if no new one is uploaded
  const getQuery = `SELECT profileImage FROM employees WHERE id = ?`;
  db.execute(getQuery, [id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });

    if (results.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const existingImage = results[0].profileImage;
    const finalImage = imageUrl || existingImage;

    const updateQuery = `
      UPDATE employees SET 
        name = ?, 
        employeeId = ?, 
        department = ?, 
        designation = ?, 
        project = ?, 
        type = ?, 
        status = ?, 
        profileImage = ?
      WHERE id = ?
    `;

    const values = [
      name,
      employeeId,
      department,
      designation,
      project,
      type,
      status,
      finalImage,
      id,
    ];

    db.execute(updateQuery, values, (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      res.status(200).json({
        message: "Employee Updated Successfully",
        employeeId: id,
      });
    });
  });
};

const viewEmployee = (req, res) => {
  const { id } = req.params;
  const viewEmployeeQuery = `SELECT * FROM employees WHERE id = ?`;
  db.execute(viewEmployeeQuery, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(201).json(result);
  });
};

const deleteEmployee = (req, res) => {
  const { id } = req.params;
  const deleteQuery = `
    DELETE FROM employees WHERE id = ?
  `;
  db.execute(deleteQuery, [id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error deleting employee", error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  });
};

module.exports = {
  addEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  viewEmployee,
};

const db = require("../utils/db");


// Api add
const addEmployee = async (req, res) => {
  const { name, employeeId, department, designation, project, type, status } = req.body;
  const imageUrl = req.file?.path || null;

  const addQuery = `
    INSERT INTO employees (name, employeeId, department, designation, project, type, status, profileImage)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
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

  try {
    const [result] = await db.execute(addQuery, values);
    res.status(201).json({
      message: "Employee Added",
      insertedId: result.insertId,
    });
  } catch (err) {
    console.log(`DB Error: ${err.message}`);
    res.status(500).json({ message: err.message  });
  }
};

//Api getAll

const getAllEmployees = async (req, res) => {
  const { search_q } = req.query;

  let query = "SELECT * FROM employees";
  let params = [];

  if (search_q !== undefined && search_q.trim() !== "") {
    query = "SELECT * FROM employees WHERE name LIKE ?";
    params = [`%${search_q.trim()}%`]; 
  }

  try {
    const [results] = await db.execute(query, params);
    res.status(200).json(results); 
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Database error" });
  }
};

//Api Update

const updateEmployee = async (req, res) => {
  const { name, employeeId, department, designation, project, type, status } = req.body;
  const { id } = req.params;
  const imageUrl = req.file?.path;

  const getQuery = `SELECT profileImage FROM employees WHERE id = ?`;

  let existingImage;

  try {
    const [results] = await db.execute(getQuery, [id]);

    if (results.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    existingImage = results[0].profileImage;
  } catch (error) {
     res.status(500).json({ message: error.message });
    
  }

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

  try {
    const [rows] = await db.execute(updateQuery, values);
    res.status(200).json({
      message: "Employee Updated Successfully",
      employeeId: id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// API get1

const viewEmployee = async (req, res) => {
  const { id } = req.params;
  const viewEmployeeQuery = `SELECT * FROM employees WHERE id = ?`;

  try {
    const [results] = await db.execute(viewEmployeeQuery, [id]);

    if (results.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(results[0]); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Api Delte
const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  const deleteQuery = `DELETE FROM employees WHERE id = ?`;

  try {
    const [result] = await db.execute(deleteQuery, [id])
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting employee",
      error: error.message,
    });
  }
};

module.exports = {
  addEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  viewEmployee,
};

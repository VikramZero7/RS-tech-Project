const express = require("express");
const router = express.Router();
const {
  addEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  viewEmployee,
} = require("../controllers/employeeController");
const multer = require("multer");
const { storage } = require("../utils/cloudinary");
const upload = multer({ storage });

router.post("/add", upload.single("profileImage"), addEmployee);
router.get("/all", getAllEmployees);
router.put("/edit/:id", upload.single("profileImage"), updateEmployee);
router.delete("/delete/:id", deleteEmployee);
router.get("/view/:id", viewEmployee);

module.exports = router;

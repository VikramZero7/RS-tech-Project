const express = require("express");
const cors = require("cors");
const employeeRoute = require("./routes/employeeRoute");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "https://rs-tech-project-front77.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/employee", employeeRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

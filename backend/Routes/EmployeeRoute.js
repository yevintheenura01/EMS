// routes/employeeRoutes.js
const express = require("express");
const router = express.Router();
const employeeController = require("../Controllers/EmployeeController");

// Add Employee
router.post("/", employeeController.addEmployee);

// Get all Employees
router.get("/", employeeController.getEmployees);

// Get a single Employee by ID
router.get("/:id", employeeController.getEmployeeById);

// Update an Employee by ID
router.put("/:id", employeeController.updateEmployee);

// Delete an Employee by ID
router.delete("/:id", employeeController.deleteEmployee);

// Count employees
router.get("/count", employeeController.getEmployeeCount);


module.exports = router;

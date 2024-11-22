const Employee = require("../Model/EmployeeModel");

// Create a new employee
const addEmployee = async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save(); // Save the new employee

    const employeeCount = await Employee.countDocuments();
    res.status(201).json({
      message: "Employee created successfully",
      count: employeeCount, // Return updated count
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating employee",
      error: error.message,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    const employeeCount = await Employee.countDocuments(); // Update the employee count after deletion
    res.status(200).json({
      message: "Employee deleted successfully",
      count: employeeCount, // Return updated count
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting employee",
      error: error.message,
    });
  }
};


const getEmployeeCount = async (req, res) => {
  try {
      const employeeCount = await Employee.countDocuments();
      res.status(200).json({ count: employeeCount });
  } catch (error) {
      console.error("Error fetching employee count:", error);
      res.status(500).json({ message: "Error fetching employee count" });
  }
};

// Get all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error: error.message });
  }
};

// Get an employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employee", error: error.message });
  }
};

// Update an employee by ID
const updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: "Error updating employee", error: error.message });
  }
};

exports.getEmployeeCount = getEmployeeCount;
exports.addEmployee = addEmployee;
exports.getEmployees = getEmployees;
exports.getEmployeeById = getEmployeeById;
exports.updateEmployee = updateEmployee;
exports.deleteEmployee = deleteEmployee;

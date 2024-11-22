const Department = require("../Model/DepartmentModel");

// Create a new Department
const addDepartment = async (req, res) => {
  try {
    const newDepartment = new Department(req.body);
    await newDepartment.save(); // Save the new employee

    const departmentCount = await Department.countDocuments();
    res.status(201).json({
      message: "Department created successfully",
      count: departmentCount, // Return updated count
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating department",
      error: error.message,
    });
  }
};

// Delete an Department by ID
const deleteDepartment = async (req, res) => {
  try {
    const deletedDepartment = await Department.findByIdAndDelete(req.params.id);
    if (!deletedDepartment) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const departmentCount = await Department.countDocuments();
res.status(200).json({
  message: "Department deleted successfully",
  count: departmentCount, // Return updated count
});
  } catch (error) {
    res.status(500).json({ message: "Error deleting department", error: error.message });
  }
};

const getDepartmentCount = async (req, res) => {
  try {
      const departmentCount = await Department.countDocuments();
      res.status(200).json({ count: departmentCount });
  } catch (error) {
      console.error("Error fetching department count:", error);
      res.status(500).json({ message: "Error fetching department count" });
  }
};

// Get all departments
const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error: error.message });
  }
};

// Get an employee by ID
const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employee", error: error.message });
  }
};

// Update an employee by ID
const updateDepartment = async (req, res) => {
  try {
    const updatedDepartment = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedDepartment) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: "Error updating department", error: error.message });
  }
};

exports.getDepartmentCount = getDepartmentCount;
exports.addDepartment = addDepartment;
exports.getDepartments = getDepartments;
exports.getDepartmentById = getDepartmentById;
exports.updateDepartment = updateDepartment;
exports.deleteDepartment = deleteDepartment;

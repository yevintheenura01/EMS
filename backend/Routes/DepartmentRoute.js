const express = require('express');
const router = express.Router();
const departmentController = require('../Controllers/DepartmentController');

// Get all Departments
router.get('/', departmentController.getDepartments);

// Add Department
router.post('/', departmentController.addDepartment);

// Get a single Department by ID
router.get('/:id', departmentController.getDepartmentById);

// Update a Department by ID
router.put('/:id', departmentController.updateDepartment);

// Delete a Department by ID
router.delete('/:id', departmentController.deleteDepartment);

// Count departments
router.get('/count', departmentController.getDepartmentCount);

module.exports = router;
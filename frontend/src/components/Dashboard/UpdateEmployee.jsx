import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateEmployee = () => {
  const { id } = useParams(); // Get employee ID from URL params
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address: "",
    hireDate: "",
    position: "",
    department: "",
    nic: "",
  });

  const [error, setError] = useState("");

  // Fetch employee details on component mount
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/emp/${id}`);
        if (response.data) {
          setEmployee({
            firstName: response.data.data.firstName || "",
            lastName: response.data.data.lastName || "",
            email: response.data.data.email || "",
            contact: response.data.data.contact || "",
            address: response.data.data.address || "",
            hireDate: response.data.data.hireDate || "",
            position: response.data.data.position || "",
            department: response.data.data.department || "",
            nic: response.data.data.nic || "",
          });
        }
      } catch (error) {
        console.error("Error fetching employee details:", error);
        setError("Failed to load employee details.");
      }
    };

    fetchEmployee();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Submit updated employee details
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/emp/${id}`, employee);
      alert("Employee updated successfully!");
      navigate("/empDashboard"); // Redirect to the employees list page
    } catch (error) {
      console.error("Error updating employee:", error);
      setError("Failed to update employee. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Update Employee</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            value={employee.firstName}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={employee.lastName}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        {/* Contact */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Contact</label>
          <input
            type="text"
            name="contact"
            value={employee.contact}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={employee.address}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        {/* Hire Date */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Hire Date</label>
          <input
            type="date"
            name="hireDate"
            value={employee.hireDate.split("T")[0]} // Format date for the input
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        {/* Position */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Position</label>
          <input
            type="text"
            name="position"
            value={employee.position}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        {/* Department */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Department</label>
          <input
            type="text"
            name="department"
            value={employee.department}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        {/* NIC */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">NIC</label>
          <input
            type="text"
            name="nic"
            value={employee.nic}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployee;

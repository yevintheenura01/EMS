import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address: "",
  hireDate: "",
  position: "",
  department: "",
  nic: "",
};

const AddEmployee = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the API call to add the employee
      const response = await axios.post("http://localhost:5000/emp", formData);

      // Check if the response is successful
      if (response.status === 201) {
        alert("Employee added successfully!");

        // Update the employee count in localStorage if count is provided
        if (response.data.count !== undefined) {
          localStorage.setItem("employeeCount", response.data.count);
        }

        // Navigate to the employee dashboard
        navigate("/empDashboard");
      } else {
        throw new Error("Unexpected response from the server.");
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Failed to add employee. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Add Employee</h2>
      {error && <p className="text-red-500 mb-4">{error.message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="date"
            name="hireDate"
            value={formData.hireDate}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={formData.position}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="nic"
            placeholder="NIC"
            value={formData.nic}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;

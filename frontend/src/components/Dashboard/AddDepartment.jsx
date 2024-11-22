import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialState = {
  code: "",
  name: "",
  manager: "",
};

const AddDepartment = () => {
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
      const response = await axios.post("http://localhost:5000/dep", formData);
  
      // Check if the response is successful
      if (response.status === 201) {
        alert("Department added successfully!");
  
        // Update the employee count in localStorage if count is provided
        if (response.data.count !== undefined) {
          localStorage.setItem("departmentCount", response.data.count);
        }
  
        // Navigate to the employee dashboard
        navigate("/empDashboard");
      } else {
        throw new Error("Unexpected response from the server.");
      }
    } catch (error) {
      console.error("Error adding department:", error);
      alert("Failed to add department. Please try again.");
    }
  };


  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Add Department</h2>
      {error && <p className="text-red-500 mb-4">{error.message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="code"
            placeholder="Code"
            value={formData.code}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="manager"
            placeholder="Manager"
            value={formData.manager}
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

export default AddDepartment;
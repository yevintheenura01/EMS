import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RegisterImg from "./register.jpg";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      policy: e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Post data to the backend
      const response = await axios.post(
        "http://localhost:5000/reg",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response from server:", response.data);

      if (response.status === 200) {
        const { userID } = response.data;
        if (userID) {
          localStorage.setItem("userID", userID);
          alert("Registration successful!");
          navigate("/login");
        } else {
          alert("Registration failed: No userID returned from server.");
        }
      }
    } catch (error) {
      if (error.response) {
        alert(`Registration failed: ${error.response.data.message}`);
      } else {
        alert("Registration failed due to network error.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="w-full max-w-4xl h-4/5 bg-white shadow-md rounded-3xl flex">
        {/* Left Side with Image */}
        <div className="w-1/2 hidden md:block">
          <img
            src={RegisterImg} // Replace with your image URL
            alt="Register Illustration"
            className="h-full w-full object-cover rounded-l-3xl"
          />
        </div>

        {/* Right Side with Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-black">
            Register
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 text-left">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg text-white bg-black focus:outline-none focus:border-gray-500"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4 text-left">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg text-white bg-black focus:outline-none focus:border-gray-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4 text-left">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg text-white bg-black focus:outline-none focus:border-gray-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="mb-4 text-left">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg text-white bg-black focus:outline-none focus:border-gray-500"
                placeholder="Confirm your password"
                required
              />
            </div>
            
            
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-gray-700 text-white font-bold py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

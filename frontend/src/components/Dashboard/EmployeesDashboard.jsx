import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeesDashboard = () => {
  const [activeTab, setActiveTab] = useState("employees");
  const [username, setUsername] = useState("");

  const [employeeCount, setEmployeeCount] = useState(() => {
    // Initialize from localStorage if available
    const storedCount = localStorage.getItem("employeeCount");
    return storedCount ? parseInt(storedCount, 10) : 0;
  });

  const [departmentCount, setDepartmentCount] = useState(() => {
    // Initialize from localStorage if available
    const storedCount = localStorage.getItem("departmentCount");
    return storedCount ? parseInt(storedCount, 10) : 0;
  });

  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [emploading, setEmpLoading] = useState(false);
  const [deploading, setDepLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const userID = localStorage.getItem("userID");
        if (!userID) {
          console.error("No userID found in localStorage.");
          return;
        }
        const response = await axios.get(`http://localhost:5000/reg/${userID}`);
        setUsername(response.data.name);
        localStorage.setItem("username", response.data.name);
      } catch (error) {
        console.error("Error fetching username:", error);
        setError("Failed to fetch username");
      }
    };

    const fetchEmployees = async () => {
      try {
        setEmpLoading(true);
        const response = await axios.get("http://localhost:5000/emp");
        setEmployees(response.data); // Assuming response.data is an array of employee objects
      } catch (error) {
        console.error("Error fetching employees:", error);
        setError("Failed to fetch employees");
      } finally {
        setEmpLoading(false);
      }
    };

    const fetchDepartments = async () => {
      try {
        setDepLoading(true);
        const response = await axios.get("http://localhost:5000/dep");
        setDepartments(response.data); // Assuming response.data is an array of department objects
      } catch (error) {
        console.error("Error fetching departments:", error);
        setError("Failed to fetch departments");
      } finally {
        setDepLoading(false);
      }
    };

    const fetchCounts = async () => {
      try {
        const empResponse = await axios.get("http://localhost:5000/emp/count");
        const depResponse = await axios.get("http://localhost:5000/dep/count");

        const empCount = empResponse.data.count || 0;
        const depCount = depResponse.data.count || 0;

        setEmployeeCount(empCount);
        setDepartmentCount(depCount);
        localStorage.setItem("employeeCount", empCount);
        localStorage.setItem("departmentCount", depCount);
      } catch (err) {
        // console.error("Error fetching counts:", err.response ? err.response.data : err.message);
        // setError("Failed to fetch counts");
      }
    };

    fetchCounts();

    fetchUsername();
    fetchEmployees();
    fetchDepartments();
  }, []);

  const handleTabClick = (tab) => setActiveTab(tab);

  const handleLogout = () => {
    localStorage.removeItem("userID"); // Remove only the userID key
    navigate("/login"); // Redirect to the login page
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/emp/${id}`);
      setEmployees((prev) => prev.filter((employee) => employee._id !== id));
      setEmployeeCount(response.data.count);
      localStorage.setItem("employeeCount", response.data.count); // Save new count
      alert("Employee deleted successfully");
    } catch (error) {
      console.error("Error deleting employee:", error);
      setError("Failed to delete employee");
    }
  };

  const handleDepDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/dep/${id}`);
      setDepartments((prev) =>
        prev.filter((department) => department._id !== id)
      );
      setDepartmentCount(response.data.count);
      localStorage.setItem("departmentCount", response.data.count); // Save new count
      alert("Department deleted successfully");
    } catch (error) {
      console.error("Error deleting department:", error);
      setError("Failed to delete department");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-center py-4">Dashboard</h1>
          <div className="mt-4">
            <button
              className={`w-full text-left px-4 py-2 hover:bg-gray-700 ${
                activeTab === "employees" ? "bg-gray-700" : ""
              }`}
              onClick={() => handleTabClick("employees")}
            >
              Employees
            </button>
            <button
              className={`w-full text-left px-4 py-2 hover:bg-gray-700 ${
                activeTab === "department" ? "bg-gray-700" : ""
              }`}
              onClick={() => handleTabClick("department")}
            >
              Department
            </button>
          </div>
        </div>
        <div className="p-4 border-t border-gray-700">
          <p className="text-center">{username || "Loading..."}</p>
          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 mt-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="bg-gray-200 p-4 mb-4 text-center">
          <h1 className="text-3xl font-bold">Welcome, {username || "User"}!</h1>
          <div className="mt-4">
            <p className="text-xl">Employees: {employeeCount}</p>
            <p className="text-xl">Departments: {departmentCount}</p>
          </div>
        </div>
        {activeTab === "employees" && (
          <div>
            <h2 className="text-3xl font-bold mb-4">Employees</h2>
            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                placeholder="Search employees..."
                className="border p-2 rounded w-1/2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => navigate("/addEmployee")}
              >
                Add Employee
              </button>
            </div>
            {/* Employee Details Table */}
            <div className="overflow-x-auto">
              {emploading ? (
                <p>Loading...</p>
              ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
              ) : employees.length > 0 ? (
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="px-6 py-4 border border-gray-300 text-center">
                        First Name
                      </th>
                      <th className="px-6 py-4 border border-gray-300 text-center">
                        Last Name
                      </th>
                      <th className="px-6 py-4 border border-gray-300 text-center">
                        Email
                      </th>
                      <th className="px-6 py-4 border border-gray-300 text-center">
                        Position
                      </th>
                      <th className="px-6 py-4 border border-gray-300 text-center">
                        Department
                      </th>
                      <th className="px-6 py-4 border border-gray-300 text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees
                      .filter((employee) =>
                        employee.firstName
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                      )
                      .map((employee) => (
                        <tr key={employee._id} className="hover:bg-gray-100">
                          <td className="px-6 py-4 border border-gray-300 text-center">
                            {employee.firstName}
                          </td>
                          <td className="px-6 py-4 border border-gray-300 text-center">
                            {employee.lastName}
                          </td>
                          <td className="px-6 py-4 border border-gray-300 text-center">
                            {employee.email}
                          </td>
                          <td className="px-6 py-4 border border-gray-300 text-center">
                            {employee.position}
                          </td>
                          <td className="px-6 py-4 border border-gray-300 text-center">
                            {employee.department}
                          </td>
                          <td className="px-6 py-4 border border-gray-300 text-center">
                            <div className="flex justify-center space-x-2">
                              <button
                                className="bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded"
                                onClick={() =>
                                  navigate(`/updateEmployee/${employee._id}`)
                                }
                              >
                                Update
                              </button>
                              <button
                                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                                onClick={() => handleDelete(employee._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <p>No employees found.</p>
              )}
            </div>
          </div>
        )}
        {activeTab === "department" && (
          <div>
            <h2 className="text-3xl font-bold mb-4">Departments</h2>
            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                placeholder="Search departments..."
                className="border p-2 rounded w-1/2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => navigate("/addDepartment")}
              >
                Add Department
              </button>
            </div>
            {/* Department Details Table */}
            <div className="overflow-x-auto">
              {deploading ? (
                <p>Loading...</p>
              ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
              ) : departments.length > 0 ? (
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="px-6 py-4 border border-gray-300 text-center">
                        Department Code
                      </th>
                      <th className="px-6 py-4 border border-gray-300 text-center">
                        Department Name
                      </th>
                      <th className="px-6 py-4 border border-gray-300 text-center">
                        Manager
                      </th>
                      <th className="px-6 py-4 border border-gray-300 text-center">
                        Update
                      </th>
                      <th className="px-6 py-4 border border-gray-300 text-center">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {departments
                      .filter((department) =>
                        department.name
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                      )
                      .map((department) => (
                        <tr key={department._id} className="hover:bg-gray-100">
                          <td className="px-6 py-4 border border-gray-300 text-center">
                            {department.code}
                          </td>
                          <td className="px-6 py-4 border border-gray-300 text-center">
                            {department.name}
                          </td>
                          <td className="px-6 py-4 border border-gray-300 text-center">
                            {department.manager}
                          </td>
                          <td className="px-6 py-4 border border-gray-300 text-center">
                            <button
                              className="bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded"
                              onClick={() =>
                                navigate(`/updateDepartment/${department._id}`)
                              }
                            >
                              Update
                            </button>
                          </td>
                          <td className="px-6 py-4 border border-gray-300 text-center">
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                              onClick={() => handleDepDelete(department._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <p>No departments found.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeesDashboard;

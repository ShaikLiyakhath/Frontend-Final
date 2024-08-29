/*import React, { useState } from "react";
import "../Styles/RegisterPage.css";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [customerType, setCustomerType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      username,
      password,
      email,
      phoneNo,
      customerType,
    });
  };

  return (
    <div className="register-container">
      <h2>Create an Account</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label>
          Username <span className="required">*</span>
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>
          Password <span className="required">*</span>
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>
          Email <span className="required">*</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>
          Phone Number <span className="required">*</span>
        </label>
        <input
          type="text"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          required
        />

        <label>
          Customer Type <span className="required">*</span>
        </label>
        <select
          value={customerType}
          onChange={(e) => setCustomerType(e.target.value)}
          required
        >
          <option value="">Select Customer Type</option>
          <option value="personal">Personal</option>
          <option value="business">Business</option>
          <option value="enterprise">Enterprise</option>
          <option value="government">Government</option>
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;*/



///the opp:
import React, { useState } from 'react';
import '../Styles/RegisterPage.css';

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
    customerType: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    
    // Validate password
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    if (!passwordRegex.test(formData.password)) {
      formErrors.password = "Password must be 8-15 characters long, include letters, numbers, and special characters.";
    }

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org)$/;
    if (!emailRegex.test(formData.email)) {
      formErrors.email = "Invalid email address. Must end with .com or .org.";
    }

    // Validate phone number (optional but must be exactly 10 digits if provided)
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      formErrors.phone = "Phone number must be exactly 10 digits.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Mapping customerType to numeric value
      const customerTypeMap = {
        'Personal': 1,
        'Business': 2,
        'Enterprise': 3,
        'Government': 4
      };

      const submissionData = {
        ...formData,
        customerType: customerTypeMap[formData.customerType],  // Convert customerType to numeric value
      };

      // Process the form data (e.g., send to backend)
      console.log(submissionData);
      alert("Registration successful!");
    } else {
      alert("Please fix the errors in the form.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
          
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number (optional)"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="error-text">{errors.phone}</p>}
          
          <select
            name="customerType"
            value={formData.customerType}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Customer Type
            </option>
            <option value="Personal">Personal</option>
            <option value="Business">Business</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Government">Government</option>
          </select>
          
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        
      </div>
    </div>
  );
}

export default RegisterPage;



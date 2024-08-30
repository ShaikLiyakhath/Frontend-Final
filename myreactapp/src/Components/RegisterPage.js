
// import React, { useState } from 'react';
// import '../Styles/RegisterPage.css';

// function RegisterPage() {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     email: '',
//     phone: '',
//     customerType: '',
//   });
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const validateForm = () => {
//     let formErrors = {};
    
//     // Validate password
//     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
//     if (!passwordRegex.test(formData.password)) {
//       formErrors.password = "Password must be 8-15 characters long, include letters, numbers, and special characters.";
//     }

//     // Validate email
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org)$/;
//     if (!emailRegex.test(formData.email)) {
//       formErrors.email = "Invalid email address. Must end with .com or .org.";
//     }

//     // Validate phone number (optional but must be exactly 10 digits if provided)
//     if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
//       formErrors.phone = "Phone number must be exactly 10 digits.";
//     }

//     setErrors(formErrors);
//     return Object.keys(formErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       // Mapping customerType to numeric value
//       const customerTypeMap = {
//         'Personal': 1,
//         'Business': 2,
//         'Enterprise': 3,
//         'Government': 4
//       };

//       const submissionData = {
//         ...formData,
//         customerType: customerTypeMap[formData.customerType],  // Convert customerType to numeric value
//       };

  
    

//   //     // Process the form data (e.g., send to backend)
//   //     console.log(submissionData);
//   //     alert("Registration successful!");
//   //   } else {
//   //     alert("Please fix the errors in the form.");
//   //   }
//   // };

//   return (
//     <div className="register-container">
//       <div className="register-box">
        
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           {errors.password && <p className="error-text">{errors.password}</p>}
          
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           {errors.email && <p className="error-text">{errors.email}</p>}
          
//           <input
//             type="tel"
//             name="phone"
//             placeholder="Phone Number (optional)"
//             value={formData.phone}
//             onChange={handleChange}
//           />
//           {errors.phone && <p className="error-text">{errors.phone}</p>}
          
//           <select
//             name="customerType"
//             value={formData.customerType}
//             onChange={handleChange}
//             required
//           >
//             <option value="" disabled>
//               Customer Type
//             </option>
//             <option value="Personal">Personal</option>
//             <option value="Business">Business</option>
//             <option value="Enterprise">Enterprise</option>
//             <option value="Government">Government</option>
//           </select>
          
//           <button type="submit" className="register-button">
//             Register
//           </button>
//         </form>
        
//       </div>
//     </div>
//   );
// }


// export default RegisterPage;

  

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      setIsSubmitting(true); // Show loading indicator or disable button
  
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
  
      // Debugging logs
      console.log("Submission Data:", submissionData);
      console.log("Username:", submissionData.username);
      console.log("Password:", submissionData.password);

      const queryString = new URLSearchParams(submissionData).toString();
  
      try {
        const response = await fetch(`http://localhost:7777/user/register?${queryString}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
        const text = await response.text(); // Get raw response text
        console.log("Raw Response Text:", text);
  
        try {
          const result = JSON.parse(text); // Attempt to parse JSON
  
          if (response.ok) {
            alert("Registration successful!");
            // Optionally, handle success (e.g., redirect to another page)
          } else {
            alert("Failed to register: " + (result.message || 'Registration failed'));
          }
        } catch (jsonError) {
          alert("Failed to parse JSON response: " + jsonError.message);
        }
      } catch (error) {
        alert(`Error: ${error.message}`);
      } finally {
        setIsSubmitting(false); // Re-enable button or hide loading indicator
      }
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
          
          <button type="submit" className="register-button" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;

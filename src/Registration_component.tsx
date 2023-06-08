import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Home_component from "./Home";
import './Registration.css'

interface RegisterFormData {
  name: string;
  age: string;
  email: string;
  password: string;
}

function Registration_component() {
  const [RegisterFormData, setRegisterFormData] = useState<RegisterFormData>({
    name: "",
    age: "",
    email: "",
    password: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterFormData({ ...RegisterFormData, [name]: value });
  };

  const registerUser = (RegisterFormData: RegisterFormData) => {
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    users.push(RegisterFormData);
    localStorage.setItem('users', JSON.stringify(users));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm(RegisterFormData)) {
      return;
    }

    // send form data to server here
    // ...

    // show success message
    registerUser(RegisterFormData)
    setShowSuccessMessage(true);
  };

  const validateForm = (RegisterFormData: RegisterFormData): boolean => {
    let isValid = true;

    if (RegisterFormData.name.trim() === '') {
      alert('Name is required');
      isValid = false;
    }

    if (RegisterFormData.age.trim() === '') {
      alert('Age is required');
      isValid = false;
    }

    if (isNaN(Number(RegisterFormData.age))) {
      alert('Age must be a number');
      isValid = false;
    }

    if (RegisterFormData.email.trim() === '') {
      alert('Email is required');
      isValid = false;
    }

    // Email validation using a simple regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(RegisterFormData.email)) {
      alert('Invalid email format');
      isValid = false;
    }

    if (RegisterFormData.password.trim() === '') {
      alert('Password is required');
      isValid = false;
    }

    // All validations passed, submit the form
    console.log('Form submitted');
    return isValid;
  };

  if (showSuccessMessage) {
    return <Home_component currentUser={RegisterFormData} />;
  }

  return (
    <>
      <div className="container">
      <button ><span>&larr;</span>go back</button>
        <form onSubmit={handleSubmit} className="Registration-form">
          <h2><u>Register Here...</u></h2>
          <div>
             <label className="Registration-label" htmlFor="first-name">Name:</label>
             <input type="text" className="Registration-fields" id="name" name="name" required value={RegisterFormData.name} onChange={handleInputChange} />
      </div>
      <div>
        <label className="Registration-label" htmlFor="age">Age:</label>
        <input type="text" className="Registration-fields" id="age" name="age" required value={RegisterFormData.age} onChange={handleInputChange} />
      </div>
      <div>
        <label className="Registration-label" htmlFor="email">E-Mail:</label>
        <input type="text" className="Registration-fields" id="email" name="email" required value={RegisterFormData.email} onChange={handleInputChange} />
      </div>
      <div>
        <label className="Registration-label" htmlFor="password">Password:</label>
        <input type="password" className="Registration-fields" id="password" name="password" required value={RegisterFormData.password} onChange={handleInputChange} />
      </div>

      <div>
        <button type="submit" className="Registration-Button">Register</button>
      </div>
    </form>
    
  </div>
</>);}export default Registration_component;

          

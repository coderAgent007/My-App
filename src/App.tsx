import React, { useState } from 'react';
import './App.css';
import Registration_component from './Registration_component';
import Home_component from './Home';

interface FormData {
  
  email: string;
  password: string;
}
interface RegisterFormData {
  name: string;
  age: string;
  email: string;
  password: string;
}

function App() {
  const [registrationComponent, setRegistrationComponent] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [currentUser, setCurrentUser] = useState<RegisterFormData | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const loginUser = (username: string, password: string) => {
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const foundUser = users.find((user: FormData) => user.email === username && user.password === password);

    if (foundUser) {
      console.log('Login successful');
      setCurrentUser(foundUser);
      
      setShowSuccessMessage(true);
    } else {
      alert('Invalid username or password');
      setShowSuccessMessage(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm(formData)) {
      return;
    }

    // send form data to server here
    // ...

    // show success message
    setShowSuccessMessage(true);
    loginUser(formData.email, formData.password);
  };

  const validateForm = (formData: FormData): boolean => {
    let isValid = true;

    if (formData.email.trim() === '') {
      alert('Email is required');
      isValid = false;
    }

    // Email validation using a simple regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Invalid email format');
      isValid = false;
    }

    if (formData.password.trim() === '') {
      alert('Password is required');
      isValid = false;
    }

    // All validations passed, submit the form
    console.log('Form submitted');
    return isValid;
  };

  if (showSuccessMessage && currentUser) {
    
    //return <Registration_component />;
    return <Home_component currentUser={currentUser} />;
  }

  if (registrationComponent) {
    return <Registration_component />;
  }

  return (
    <div className='container'>
      <div className="login-box">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="Student-label" htmlFor="email">Username (Email)</label>
            <input type="text" className="Student-form" id="email" name="email" required value={formData.email} onChange={handleInputChange} />
          </div>
          <div>
            <label className="Student-label" htmlFor="password">Password:</label>
            <input type="password" className="Student-form" id="password" name="password" required value={formData.password} onChange={handleInputChange} />
          </div>
          <div>
            <button type="submit" className="Student-Button">Log In</button>
            <button type="button" className="Student-Button" onClick={() => setRegistrationComponent(true)}>Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;

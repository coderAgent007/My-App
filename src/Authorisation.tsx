import React,{ useState } from "react";
const registerUser = (formData: any) => {
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));
  };


  const loginUser = (username: string, password: string) => {
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const foundUser = users.find((user: any) => user.username === username && user.password === password);
    if (foundUser) {
        // User authenticated
        alert('Login successful');
    } else {
        // Invalid credentials
        alert('Invalid username or password');
    }
};
    



import React, { useState } from "react";
import App from "./App";
import './Home.css'

interface HomeFormData {
  name: string;
  age: string;
  email: string;
  password: string;
}

interface HomeProps {
  currentUser: HomeFormData;
}

function Home_component({ currentUser }: HomeProps) {
  const [showClick, setShowClick] = useState(false);

  if (showClick) {
    return <App />;
  }

  return (
    <div className="body">
      <h3 className="sentence">Here is Your Details...</h3>
      <div>
        <h3>Name: {currentUser.name}</h3>
        <h3>Age: {currentUser.age}</h3>
        <h3>Email: {currentUser.email}</h3>
      </div>
      <button className="button" onClick={() => setShowClick(true)}>Log out</button>
    </div>
  );
}

export default Home_component;
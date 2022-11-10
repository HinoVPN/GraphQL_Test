import React from 'react';
import logo from './logo.svg';
import './App.css';
import AllUser from './AllUser';
import Routing from './NavBar';


function App() {
  return (
    <div className="App">
      <div>
        <h2>My first Apollo app 🚀</h2>
        <br/>
          <Routing />
          {/* <AllUser /> */}
      </div>
    </div>
  );
}

export default App;

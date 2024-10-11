import { useState } from 'react';
import logonavbar from "./assets/book.png"
import datajson from "./assets/data.json"
function App() {
  let userIndex="U0001";
  console.log(datajson);
  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{
          backgroundColor: '#F66B6B',
          padding: '1rem 1.5rem',
        }}
      >
        <div className="container-fluid d-flex align-items-center">
          
          <a
            className="navbar-brand d-flex align-items-center"
            href="#"
            style={{ color: 'white', fontWeight: 'bold' }}
          >
            <img
              src={logonavbar}
              alt="Logo"
              width="50" 
              height="50"
              className="d-inline-block align-text-top me-2"
            />
            <span
              style={{
                fontSize: 'calc(12px + 1vw)',
              }}
            >
              LKOMP LIBRARY
            </span>
          </a>
        </div>
      </nav>
        
    </>
  );
}

export default App;

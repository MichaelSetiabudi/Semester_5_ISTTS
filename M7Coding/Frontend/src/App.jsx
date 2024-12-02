import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormsList from "./pages/Dashboard";
import CreateForm from "./pages/createForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormsList />} />
        <Route path="/newForm" element={<CreateForm />} />
      </Routes>
    </Router>
  );
};

export default App;

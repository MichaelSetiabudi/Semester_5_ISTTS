import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormsList from "./pages/Dashboard";
import CreateForm from "./pages/createForm";
import  ViewForm  from './pages/ViewForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormsList />} />
        <Route path="/newForm" element={<CreateForm />} />
        <Route path="/view/:id" element={<ViewForm />} />
      </Routes>
    </Router>
  );
};

export default App;

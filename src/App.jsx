import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserInputForm from "./Components/UserInputForm";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserInputForm />} />

        <Route path="/edit/:id" element={<UserInputForm />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;

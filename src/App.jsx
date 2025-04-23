import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersDataList from "./Components/UsersDataList";
import UserInputForm from "./Components/UserInputForm";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UsersDataList />} />

        <Route path="/add" element={<UserInputForm />} />

        <Route path="/edit/:id" element={<UserInputForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

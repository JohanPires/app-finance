import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./page/homepage/homepage";
import AddForm from "./page/addForm/addForm";
import Login from "./page/login/login";
import Register from "./page/register/register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/addForm" element={<AddForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

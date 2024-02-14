import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employee_List from "./components/Employee_List";
import Emp_Create from "./components/Emp_Create";
import Emp_Details from "./components/Emp_Details";

function App() {
  return (
    <div className="App">
      <h1>React JS CRUD Operation</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Employee_List />}></Route>
          <Route path="/employee/create" element={<Emp_Create />}></Route>
          <Route path="/employee/details/:empid" element={<Emp_Details />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

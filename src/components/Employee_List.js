import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Employee_List = () => {
  const [empData, setEmpData] = useState(null);
  const navigate = useNavigate();

  const LoadDetails = (id) => {
    navigate("/employee/details/" + id);
  };

  const LoadUpdate = (id) => {
    navigate("/employee/update/" + id);
  };

  const deleteFunction = (id) => {
    if (window.confirm("Do you want to delete ?")) {
      fetch("http://localhost:8001/associate/" +id, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Deleted Successfully!");
          navigate("/");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  useEffect(() => {
    fetch("http://localhost:8001/associate")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setEmpData(resp);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Employee List</h2>
        </div>
        <div className="card-body">
          <div className="divbtn">
            <Link to="employee/create" className="btn btn-info">
              Add New(+)
            </Link>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr className="bg-warning">
                <td>ID</td>
                <td>Name</td>
                <td>Email</td>
                <td>Mobile</td>
                <td>Action</td>
              </tr>

              {empData &&
                empData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.mobile}</td>
                    <td>
                      <a
                        onClick={() => {
                          deleteFunction(item.id);
                        }}
                        className="btn btn-danger"
                      >
                        Delete
                      </a>
                      <a
                        onClick={() => {
                          LoadDetails(item.id);
                        }}
                        className="btn btn-success"
                      >
                        Details
                      </a>
                    </td>
                  </tr>
                ))}
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employee_List;

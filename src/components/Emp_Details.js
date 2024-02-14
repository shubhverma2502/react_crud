import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Emp_Details = () => {
  const { empid } = useParams();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [empdata, setEmpdata] = useState({});
  const [active, setActive] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleUpdateClick = (e) => {
    e.preventDefault();
    const empData = { name, email, mobile, active };

    fetch("http://localhost:8001/associate/" + empid, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empData),
    })
      .then((res) => {
        alert("Updated Successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetch("http://localhost:8001/associate/" + empid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setId(resp.id);
        setName(resp.name);
        setEmail(resp.email);
        setMobile(resp.mobile);
        setActive(resp.active);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleUpdateClick}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2 style={{ textAlign: "center" }}>Associate Overview</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>ID</label>
                      <input
                        value={id}
                        disabled="disabled"
                        className="form-control"
                        placeholder="Enter your Id"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        placeholder="Enter Your Name"
                        required
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        placeholder="Entr Your Email"
                        required
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Mobile</label>
                      <input
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="form-control"
                        placeholder="Enter Your Mobile Number"
                        required
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-check">
                      <input
                        checked={active}
                        onChange={(e) => setActive(e.target.checked)}
                        type="checkbox"
                        className="form-check-input"
                      ></input>
                      <label className="form-check-label">Is Active</label>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      {/* <button
                        className="btn btn-success"
                        style={{ marginTop: "5px", float: "right" }}
                        onClick={editMode ? handleUpdateClick : handleEditClick}
                      >
                        {editMode ? "Save" : "Edit"}
                      </button> */}
                      <button
                        className="btn btn-success"
                        type="submit"
                        style={{ marginTop: "5px", float: "right" }}
                      >
                        Save
                      </button>
                      <Link
                        to="/"
                        className="btn btn-danger"
                        style={{ marginTop: "5px", float: "right" }}
                      >
                        Back To List
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Emp_Details;

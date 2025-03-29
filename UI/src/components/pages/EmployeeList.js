import React, { useState, useEffect } from "react";
import Employee from "./Employee";
import axios from "axios";

export default function EmployeeList() {
  const [employeeList, setEmployeeList] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);

  useEffect(() => {
    refreshEmployeeList();
  }, []);

  const employeeAPI = (
    url = "https://localhost:5001/api/Employee/"
    // url = "https://localhost:44319/api/Employee/"
  ) => {
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url, newRecord),
      update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
      delete: (id) => axios.delete(url + id),
    };
  };

  function refreshEmployeeList() {
    employeeAPI()
      .fetchAll()
      .then((res) => setEmployeeList(res.data))
      .catch((err) => console.log(err));
  }

  const addOrEdit = (formData, onSuccess) => {
    if (formData.get("employeeId") == "0")
      employeeAPI()
        .create(formData)
        .then((res) => {
          onSuccess();
          refreshEmployeeList();
        })
        .catch((err) => console.log(err));
    else
      employeeAPI()
        .update(formData.get("employeeId"), formData)
        .then((res) => {
          onSuccess();
          refreshEmployeeList();
        })
        .catch((err) => console.log(err));
  };

  const showRecordDetails = (data) => {
    setRecordForEdit(data);
  };

  const onDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sur to delete this record?"))
      employeeAPI()
        .delete(id)
        .then((res) => refreshEmployeeList())
        .catch((err) => console.log(err));
  };

  const imageCard = (data) => (
    <div
      className="card mrg"
      onClick={() => {
        showRecordDetails(data);
      }}
    >
      <img src={data.imageSrc} className="card-img-top  whimg" />
      <div className="card-body">
        <h5>Name: {data.employeeName}</h5>
        <span>Occupation: {data.occupation}</span>
        <br />
        <button
          className="btn1 btn btn-light delete-button"
          onClick={(e) => onDelete(e, parseInt(data.employeeId))}
        >
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="row">
      <div className="col-md-12">
        <div class="jumbotron jumbotron-fluid py-4">
          <div class="container text-center">
            <h1 class="display-4">Employee Register</h1>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <Employee addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
      </div>
      <div className="col-md-8">
        <h1>Employee List</h1>
        <table>
          <tbody style={{ textAlign: "center" }}>
            {[...Array(Math.ceil(employeeList.length / 3))].map((e, i) => (
              <tr key={i}>
                <td>{imageCard(employeeList[3 * i])}</td>
                <td>
                  {employeeList[3 * i + 1]
                    ? imageCard(employeeList[3 * i + 1])
                    : null}
                </td>
                <td>
                  {employeeList[3 * i + 2]
                    ? imageCard(employeeList[3 * i + 2])
                    : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

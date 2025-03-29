import { useState, useEffect } from "react";
import axios from "axios";
const HomePage = () => {
  const [employeeList, setEmployeeList] = useState([]);
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
  const imageCard = (data) => (
    <div className="card mrg">
      <div className="card-body">
        <h5>Name: {data.employeeName}</h5>
        <span>Occupation: {data.occupation}</span>
        <br />
      </div>
    </div>
  );
  return (
    <div
      style={{
        marginLeft: "20%",
        marginRight: "20%",
      }}
    >
      <h1>HomePage</h1>
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
  );
};
export default HomePage;

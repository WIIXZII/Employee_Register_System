// import React from "react";

// const CategoryPage = () => {
//   return (
//     <div>
//       <h1>Hello Category Page</h1>
//     </div>
//   );
// };

// export default CategoryPage;
import { useState, useEffect } from "react";
import axios from "axios";
const CategoryPage = () => {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    refreshCategoryList();
  }, []);
  const categoryAPI = (
    url = "https://localhost:5001/api/Category/"
    // url = "https://localhost:44319/api/Employee/"
  ) => {
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url, newRecord),
      update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
      delete: (id) => axios.delete(url + id),
    };
  };
  function refreshCategoryList() {
    categoryAPI()
      .fetchAll()
      .then((res) => setCategoryList(res.data))
      .catch((err) => console.log(err));
  }
  const imageCard = (data) => (
    <div className="card mrg">
      <div className="card-body">
        <h5>Name: {data.categoryName}</h5>
        <h5>Status: {data.status}</h5>
        <h5>Created At: {data.createdAt}</h5>
        <span>Description : {data.description}</span>
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
      <h1>CategoryPage</h1>
      <table>
        <tbody style={{ textAlign: "center" }}>
          {[...Array(Math.ceil(categoryList.length / 3))].map((e, i) => (
            <tr key={i}>
              <td>{imageCard(categoryList[3 * i])}</td>
              <td>
                {categoryList[3 * i + 1]
                  ? imageCard(categoryList[3 * i + 1])
                  : null}
              </td>
              <td>
                {categoryList[3 * i + 2]
                  ? imageCard(categoryList[3 * i + 2])
                  : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default CategoryPage;

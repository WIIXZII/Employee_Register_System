import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductInputData from "./ProductInputData";

export default function Product() {
  const [productList, setProductList] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);

  useEffect(() => {
    refreshProductList();
  }, []);

  const productAPI = (
    url = "https://localhost:5001/api/Product/"
    // url = "https://localhost:44319/api/Employee/"
  ) => {
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url, newRecord),
      update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
      delete: (id) => axios.delete(url + id),
    };
  };

  function refreshProductList() {
    productAPI()
      .fetchAll()
      .then((res) => setProductList(res.data))
      .catch((err) => console.log(err));
  }

  const addOrEdit = (formData, onSuccess) => {
    if (formData.get("id") == "0")
      productAPI()
        .create(formData)
        .then((res) => {
          onSuccess();
          refreshProductList();
        })
        .catch((err) => console.log(err));
    else
      productAPI()
        .update(formData.get("id"), formData)
        .then((res) => {
          onSuccess();
          refreshProductList();
        })
        .catch((err) => console.log(err));
  };

  const showRecordDetails = (data) => {
    setRecordForEdit(data);
  };

  const onDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sur to delete this record?"))
      productAPI()
        .delete(id)
        .then((res) => refreshProductList())
        .catch((err) => console.log(err));
  };

  const imageCard = (data) => (
    <div
      className="card mrg"
      onClick={() => {
        showRecordDetails(data);
      }}
    >
      <img
        src={data.imageSrc}
        className="card-img-top"
        style={{ width: "220px", height: "220px" }}
      />
      <div className="card-body">
        <p>ID: {data.id}</p>
        <h5>productName: {data.productName}</h5>
        <span>productImages: {data.productImages}</span>
        <br />
        <span>price: {data.price}</span>
        <br />
        <span>stockQuantity: {data.stockQuantity}</span>
        <br />
        <span>createdAt: {data.createdAt}</span>
        <br />
        <br />
        <button
          className="btn1 btn btn-light delete-button"
          onClick={(e) => onDelete(e, parseInt(data.id))}
        >
          Delete
        </button>
      </div>
    </div>
  );
  return (
    <div className="row">
      <div className="col-md-4">
        <ProductInputData addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
      </div>
      <div className="col-md-8">
        <h1>Product List</h1>
        <table>
          <tbody style={{ textAlign: "center" }}>
            {[...Array(Math.ceil(productList.length / 3))].map((e, i) => (
              <tr key={i}>
                <td>{imageCard(productList[3 * i])}</td>
                <td>
                  {productList[3 * i + 1]
                    ? imageCard(productList[3 * i + 1])
                    : null}
                </td>
                <td>
                  {productList[3 * i + 2]
                    ? imageCard(productList[3 * i + 2])
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

import React, { useState, useEffect } from "react";

const defaultImageSrc = "./img/noProfilepic.jpg";

const initialFieldValues = {
  id: 0,
  productName: "",
  productImages: "",
  price: 0,
  stockQuantity: 0,
  createdAt: "2025/10/10",
  imageSrc: defaultImageSrc,
  imageFile: null,
};

export default function ProductInputData(props) {
  const { addOrEdit, recordForEdit } = props;
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (recordForEdit != null) setValues(recordForEdit);
  }, [recordForEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...values,
        imageFile: null,
        imageSrc: defaultImageSrc,
      });
    }
  };

  const validate = () => {
    let temp = {};
    temp.productName = values.productName == "" ? false : true;
    temp.imageSrc = values.imageSrc == defaultImageSrc ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x == true);
  };

  const resetForm = () => {
    setValues(initialFieldValues);
    document.getElementById("image-uploader").value = null;
    setErrors();
  };

  const handleFromSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append("id", values.id);
      formData.append("productName", values.productName);
      formData.append("productImages", values.productImages);
      formData.append("price", values.price);
      formData.append("stockQuantity", values.stockQuantity);
      formData.append("createdAt", values.createdAt);
      formData.append("imageFile", values.imageFile);
      addOrEdit(formData, resetForm);
    }
  };

  const applyErrorClass = (field) =>
    (field = errors && errors[field] == false ? " invalid-field" : "");
  return (
    <>
      <div className="container text-center">
        <p className="lead">Register here</p>
      </div>
      <form autoComplete="off" noValidate onSubmit={handleFromSubmit}>
        <div className="card card-bkgd">
          <div className="card-body">
            <div className="form-group">
              <img src={values.imageSrc} className="card-img-top img-crop" />
              <input
                type="file"
                accept="image/*"
                className={"form-control-file" + applyErrorClass("imageSrc")}
                onChange={showPreview}
                id="image-uploader"
              />
            </div>
            <div className="form-group">
              <input
                className={"form-control" + applyErrorClass("productName")}
                placeholder="Product Name"
                name="productName"
                value={values.productName}
                onChange={handleInputChange}
              />
              <input
                className={"form-control mrg-top" + applyErrorClass("price")}
                placeholder="Price"
                name="price"
                value={values.price}
                onChange={handleInputChange}
              />
              <input
                className={
                  "form-control mrg-top" + applyErrorClass("stockQuantity")
                }
                placeholder="stockQuantity"
                name="stockQuantity"
                value={values.stockQuantity}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group text-center">
              <button type="submit" className="btn btn2 btn-light">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

import { useFormik, Field, ErrorMessage, FormikProvider } from "formik";
import { useEffect, useState } from "react";
import { mixed, object, string } from "yup";
import AxiosInstnace from "../../utils/Axios/Axiox";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = object({
  productName: string().min(2).max(15).required(),
  productPrice: string().min(2).max(25).required(),
  productStock: string().min(1).max(15).required(),
  file: mixed()
    .required()
    .test("file size ", "to big", (value) => value && value.size < 2020 * 2020)
    .test(
      "file type",
      "invalid",
      (value) => value && ["image/png", "image/jpeg","image/jpg"].includes(value.type)
    ),
});

function ProductCreate() {
  const handleSubmit = async (data) => {
    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("productPrice", data.productPrice);
    formData.append("productStock", data.productStock);
    formData.append("productImage", data.file);

    // const formDataObject = {};
    // formData.forEach((value, key) => {
    //   formDataObject[key] = value;
    // });
    // console.log(formDataObject);
    const response = await AxiosInstnace.post("/product/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Make sure to set the content type
      },
    });
    toast.success("product  created succesfully")

    console.log(response);
  };



  const formik = useFormik({
    initialValues: {
      productName: "",
      productPrice: "",
      productStock: "",
      file: "",
    },
    validationSchema: schema,
    onSubmit(values) {
    
      handleSubmit(values);
    },
  });

  return (
    <>

      <FormikProvider value={formik}>
        <ToastContainer/>
        <h1>Create Product</h1>
        <label  htmlFor="productName">product Name</label>
        <Field  name="productName" />
        <ErrorMessage name="productName" />
        <br/>
        <br />
        <label  htmlFor="productPrice">price</label>
        <Field name="productPrice" />
        <ErrorMessage name="productPrice" />
        <br />
        <br />
        <label htmlFor="productStock">stock</label>
        <Field name="productStock" />
        <ErrorMessage name="productStock" />

        <input
          type="file"
          name="file"
          onChange={(e) => formik.setFieldValue("file", e.target.files[0])}
        />
        <ErrorMessage name="file" />
        <br />
        <button type="submit" onClick={formik.handleSubmit}>
          Add
        </button>
      </FormikProvider>
    </>
  );
}

export default ProductCreate;

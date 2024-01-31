import React from "react";
import { FormikProvider, Field, ErrorMessage, useFormik } from "formik";
import { object, string } from "yup";
import AxiosInstnace from "../../../utils/Axios/Axiox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const schema = object({
  name: string().min(2).max(15).required(),
  email: string().email().min(2).max(25).required(),
  password: string().min(2).max(15).required(),
});
function Create() {
  const navigate = useNavigate();
  const handleCall = async (data) => {
    return await AxiosInstnace.post("/admin/register", data);
  };
  const handleSubmit = async (data) => {
    try {
      const response = await handleCall(data);
      console.log(response)
      toast.success(response?.data?.message);
      navigate("/adminDashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit(values) {
      handleSubmit(values);
      
    },
  });

  return (
    <FormikProvider value={formik}>
      <ToastContainer />
      <h1 >Create User</h1>
      <label htmlFor="name">Name</label>
      <Field name="name" className=" rounded-sm"/>
      <ErrorMessage name="name" />
      <br />
      <br />
      <label htmlFor="email">email</label>
      <Field name="email" />
      <ErrorMessage name="email" />
      <br />
      <br />
      <label htmlFor="password">password</label>
      <Field name="password" />
      <ErrorMessage name="password" />
      <br />
      <br />
      <button onClick={formik.handleSubmit}>create</button>
      
    </FormikProvider>
  );
}

export default Create;

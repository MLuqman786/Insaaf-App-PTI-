import React, { useEffect } from "react";
import { FormikProvider, useFormik, ErrorMessage, Field } from "formik";
import { object, string } from "yup";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AxiosInstnace from "../../../utils/Axios/Axiox";
import { useParams } from "react-router-dom";


const schema = object({
  name: string().min(2).max(15).required(),
  email: string().email().min(2).max(25).required(),
  password: string().min(2).max(15).required(),
});


function Edit() {
    const navigate =useNavigate()
const{admin_id}=useParams()
const fetchData=async()=>{
    try {
        const response =  await AxiosInstnace.get("/admin/"+admin_id)
        delete(response.data.response.password)
        formik.setValues(response.data.response)
       
        
    } catch (error) {
        console.log(error)
    }
}
const updateAdmin= async(data)=>{
try {
    const response = await AxiosInstnace.put(`/admin/${admin_id}`,data)
    toast.success(response.data.message)
    // navigate("/adminDashboard")
    
} catch (error) {
    toast.error(error.response.data.message)
    // console.log(error)
}
}

    const formik = useFormik({
      initialValues: {
        name: "",       
        email: "",
        password: "",
      },
      validationSchema: schema,
      onSubmit(values) {updateAdmin(values)
        console.log(values)
      },
    });
    
    useEffect(()=>{
        fetchData()
    },[admin_id])
  return (
    <>
      <FormikProvider value={formik}>
        <ToastContainer />  
        <h1>Create User</h1>
        <label htmlFor="name">Name</label>
        <Field name="name" />
        <ErrorMessage name="name" />
        <br />
        <label htmlFor="email">email</label>
        <Field name="email" />
        <ErrorMessage name="email" />
        <br />
        <label htmlFor="password">password</label>
        <Field name="password" />
        <ErrorMessage name="password" />
        <br />
        <button onClick={formik.handleSubmit}>update</button>
        <button onClick={()=>navigate("/adminDashboard")}>Admins</button>
      </FormikProvider>
    </>
  );
}

export default Edit;

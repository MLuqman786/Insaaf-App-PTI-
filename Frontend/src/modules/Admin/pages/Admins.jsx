import React, { useEffect, useState } from 'react'
import AxiosInstnace from '../../../utils/Axios/Axiox'
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
function Admins() {
const navigate = useNavigate()
    const [admins,setAdmins]=useState([])
    const axios = async()=>{
        try {
            const response= await AxiosInstnace.get("/admin")
            setAdmins(response.data)
            

        } catch (error) {
            console.log(error)
        }
    }
    const deleteAdmin = async(admin_id)=>{
     const a = prompt("Are you sure you want to delte")
     if(a=="yes"){
       const response= await AxiosInstnace.delete(`/admin/${admin_id}`)
       toast.success(response.data.message)
      
     }
     
    }


  useEffect(()=>{
    axios()
    
  },[])
  return (
    <>
<h1>Admins</h1>
<ToastContainer/>
<table>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
        {admins.map((admin, index) => (
          <tr key={index}>
            <td>{admin.id}</td>
            <td>{admin.name}</td>
            <td>{admin.email}</td>
            <td>
              <button
                onClick={()=>navigate("admins/" + admin.id +"/edit")}
              >
                edit
              </button>
              <button
                onClick={()=>deleteAdmin(admin.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </table>
    </>
  )
}

export default Admins
import React, { useEffect, useState } from 'react'
import AxiosInstnace from '../../utils/Axios/Axiox'

function ShowProduct() {
    const [data,setData]=useState([])
    const fetchData=async()=>{
       const response =  await AxiosInstnace.get("/product/getall")
console.log(response.data.products.imagePath)
        setData(response.data.products)
    }
useEffect(()=>{
    fetchData()
},[])
  return (
    <>
        <table>
            <tr>
                <th>product Name</th>
                <th>product price</th>
                <th>product stock</th>
                <th>product image</th>
            </tr>
    {data.map((product,index)=>{
         return(
            <>
         <tr key={index}>
                <td>{product.productName}</td>
                <td>{product.productPrice}</td>
                <td>{product.productStock}</td>
                <td><img width="120px" height={"100px"} src={`http://localhost:3301/productImage/${product.imagePath}`}  /></td>
            </tr>
            </>
            )
    })}
   
    </table>
    </>
  )
}

export default ShowProduct
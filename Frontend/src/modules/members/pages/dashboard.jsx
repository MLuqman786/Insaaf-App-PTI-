import React, { useEffect, useState } from "react";
import AxiosInstnace from "../../../utils/Axios/Axiox";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function MemberDashboard() {
  const [info, setinfo] = useState([]);
  const { id } = useParams();

  const showMember = async () => {
    return await AxiosInstnace.get(`/members/${id}`);
  };

  const handleSubmit = async () => {
    try {
      const response = await showMember();
      setinfo([response.data.response]);
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [id]);

  return (
    <>
      <div className="max-w-5xl mx-auto mt-10">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-2 px-4 border-b">Profile Picture</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">CNIC</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Phone Number</th>
              <th className="py-2 px-4 border-b">Email</th>
            </tr>
          </thead>
          <tbody>
            {info.map((e, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="py-3 px-4 border-b text-center">
                  <img
                    src={e.picture}
                    alt="Profile"
                    className="rounded-xl h-20 w-20 md:h-20 md:w-20 object-cover border-2 border-gray-200 mx-auto"
                  />
                </td>
                <td className="py-3 px-4 border-b text-center">{e.name}</td>
                <td className="py-3 px-4 border-b text-center">{e.cnic}</td>
                <td className="py-3 px-4 border-b text-center">{e.address}</td>
                <td className="py-3 px-4 border-b text-center">{e.phoneNo}</td>
                <td className="py-3 px-4 border-b text-center">{e.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MemberDashboard;

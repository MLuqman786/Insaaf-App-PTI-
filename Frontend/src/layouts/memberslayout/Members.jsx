import React from "react";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import SideBar from "../../modules/members/components/sideBar";

function MembersLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
  <div className="col-span-12">
    <Navbar />
  </div>
  <div className="flex flex-1 ">
    <div className="sticky top-0 z-10 h-screen overflow-y-auto bg-gray-800 text-white">
      <SideBar />
    </div>
    <div className=" ml-2 flex-grow">
      <Outlet />
    </div>
  </div>
  <div>
    <Footer />
  </div>
</div>


  );
}

export default MembersLayout;

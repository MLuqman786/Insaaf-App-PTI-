import { Route, Routes } from "react-router-dom";
import HomeLayout from "../layouts/Homelayout/Home";
import Home from "../pages/home/Home";
import News from "../pages/news/news";
import Events from "../pages/events/Events";
import SocialActivity from "../pages/socialActivity/SocialActivity";
import Donate from "../pages/Donate/Donate";
import Login from "../pages/AdminLogin/Login";



import Create from "../modules/Admin/pages/create";
import Admins from "../modules/Admin/pages/Admins";
import Edit from "../modules/Admin/pages/edit";
import AdminLayout from "../layouts/Admin/Admin";
import ProductCreate from "../modules/products/create";
import ShowProduct from "../modules/products/showproduct";
import MembersLayout from "../layouts/memberslayout/Members";
import MemberDashboard from "../modules/members/pages/dashboard";
import MemberEvents from "../modules/members/pages/events";
import Membernews from "../modules/members/pages/news";
import MemberSocialActivity from "../modules/members/pages/socialActivity";
import PollingStations from "../modules/members/pages/pollingStations";

function Routing() {
  return (
    <>
     
      <Routes>
        <Route path="/" element={<HomeLayout/>}> 
        <Route path="/" element={<Home />}/>
        <Route path="/news" element={<News />}/>
        <Route path="/events" element={<Events/>}/>
        <Route path="/socialActivity" element={<SocialActivity/>}/>
        <Route path="/donate" element={<Donate/>}/>
        <Route path="/login" element={<Login />}/>
      </Route>
        

        <Route path="/adminDashboard" element={<AdminLayout/>}>
        <Route  path="" element={<Admins/>}/>
        <Route  path="admins/:admin_id/edit" element={<Edit/>}/>
        </Route>

        <Route path="/membersLayout/:id" element={<MembersLayout/>}> 
        <Route  index element={<MemberDashboard/>}/>
        <Route  path="membersEvents" element={<MemberEvents/>}/>
        <Route  path="membersNews" element={<Membernews/>}/>
        <Route  path="membersSocialActivity" element={<MemberSocialActivity/>}/>
        <Route  path="pollingStations" element={<PollingStations/>}/>
        </Route>



       <Route  path="/productCreate" element={<ProductCreate/>} />
        <Route  path="/login/admins/signup" element={<Create/>}/>
        <Route path="/products" element={<ShowProduct/>}/>
      </Routes>
     
    </>
  );
}

export default Routing;

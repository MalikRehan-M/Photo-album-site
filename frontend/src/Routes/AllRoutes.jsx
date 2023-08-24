import { Routes, Route } from "react-router-dom";
import Gallery from "../Components/Gallery";
import Addpost from "../Components/Addpost";
import Dashboard from "../Components/Dashboard";
import Addalbum from "../Components/Addalbum";
import Createalbum from "../Components/Createalbum";
function AllRoutes() {
  
  return (
    <Routes>
      <Route path="/home" element={<Gallery />} />
      <Route path="/addpost" element={<Addpost />} />
      <Route path="/createalbum" element={<Createalbum/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/addalbum" element={<Addalbum/>} />
    </Routes>
  );
}

export default AllRoutes;

import { Routes, Route } from "react-router-dom";
import Gallery from "../Components/Gallery";
import Addpost from "../Components/Addpost";
import Dashboard from "../Components/Dashboard";
import Addalbum from "../Components/Addalbum";
import Createalbum from "../Components/Createalbum";
import PrivateRoute from "./PrivateRoute";
import DashboardData from "../Components/DashboardData";
function AllRoutes() {
  return (
    <Routes>
      <Route path="/authentication" element={<Dashboard />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardData />
          </PrivateRoute>
        }
      />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Gallery />
          </PrivateRoute>
        }
      />
      <Route
        path="/addpost"
        element={
          <PrivateRoute>
            <Addpost />
          </PrivateRoute>
        }
      />
      <Route
        path="/createalbum"
        element={
          <PrivateRoute>
            <Createalbum />
          </PrivateRoute>
        }
      />
      <Route
        path="/addimagetoalbum"
        element={
          <PrivateRoute>
            <Addalbum />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default AllRoutes;

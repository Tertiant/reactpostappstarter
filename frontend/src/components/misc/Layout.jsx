import { Outlet, useLocation } from "react-router-dom";
import {HeaderSimple} from "./HeaderSimple";


const Layout = () => {

 return ( 
  <div>
    <HeaderSimple/>
    <main>
      <Outlet />
    </main>
  </div>
)
};

export default Layout;

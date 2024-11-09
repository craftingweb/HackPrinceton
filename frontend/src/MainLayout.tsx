import { Outlet } from "react-router-dom";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
 

function MainLayout() {
  return (
    <div className="bg-teal-50 h-full">
      <div className="max-w-[1280px] w-full mx-auto h-full ">
        <Header />
        <div>
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;

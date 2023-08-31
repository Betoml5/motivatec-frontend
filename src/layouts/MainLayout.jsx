import { Outlet } from "react-router-dom";

const MainLayout = () => {

  

  return (
    <div>
      <header className="header">
        <h1>TecNM Campus Region Carbonifera </h1>
      </header>
      <section className="form">
        
      </section>
      <Outlet />
    </div>
  );
};

export default MainLayout;

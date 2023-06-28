import React from "react";
import { Outlet } from "react-router-dom";

const Layout = React.memo(() => {
  return (
    <div style={{ flex: "auto" }}>
      <Outlet />
    </div>
  );
});

export default Layout;

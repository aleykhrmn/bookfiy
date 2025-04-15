import React from "react";

const Layout = ({ children }) => {
  return (
      <div className="flex-1 flex flex-col">
        <main className="p-4 flex-1 bg-gray-100">{children}</main>
      </div>
    
  );
};

export default Layout;

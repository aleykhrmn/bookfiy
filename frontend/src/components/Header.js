import React from "react";

const Header = () => {
  return (
    <header
      className="bg-blue-600 text-black p-4 flex justify-center items-center"
      style={{
        backgroundColor: "#630005",
        color: "white",
        borderBottom: "2px solid white", // Fixed the border style
        height: "70px",
        display: "flex",
        justifyContent: "center", // Horizontally center the content
        alignItems: "center", // Vertically center the content
      }}
    >
      <h1 className="text-1xl font-bold">Bookify</h1>
    </header>
  );
};

export default Header;
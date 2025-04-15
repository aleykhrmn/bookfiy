import React from "react";
import { useNavigate  } from "react-router-dom"; // Import useHistory from react-router-dom

const Sidebar = () => {
  const navigate  = useNavigate (); // Initialize useHistory hook

  return (
    <div style={{ display: "flex" }}>
      <aside
        style={{
          width: "200px",
          backgroundColor: "#630005",
          color: "white",
          borderRight: "2px solid white",
          height: "86vh",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <button
            className="sidebar-button"
            style={{
              padding: "12px 20px",
              borderRadius: "4px",
              backgroundColor: "#B5B8BD",
              color: "#000",
              fontSize: "16px",
              fontWeight: "bold",
              border: "none",
              transition: "background-color 0.3s, transform 0.2s",
              cursor: "pointer", // Butonun tıklanabilir olduğunu belirtir
            }}
            onClick={() => navigate('/home')} // Add onClick event to navigate to home page
          >
            ANA SAYFA
          </button>
          <button
            className="sidebar-button"
            style={{
              padding: "12px 20px",
              borderRadius: "4px",
              backgroundColor: "#B5B8BD",
              color: "#000",
              fontSize: "16px",
              fontWeight: "bold",
              border: "none",
              transition: "background-color 0.3s, transform 0.2s",
              cursor: "pointer",
            }}
            onClick={() => navigate('/books')} // Add onClick event to navigate to books page
          >
            KİTAPLAR
          </button>
          <button
            className="sidebar-button"
            style={{
              padding: "12px 20px",
              borderRadius: "4px",
              backgroundColor: "#B5B8BD",
              color: "#000",
              fontSize: "16px",
              fontWeight: "bold",
              border: "none",
              transition: "background-color 0.3s, transform 0.2s",
              cursor: "pointer",
            }}
            onClick={() => navigate('/favorites')} // Add onClick event to navigate to favorites page
          >
            FAVORİLERİM
          </button>
          <button
            className="sidebar-button"
            style={{
              padding: "12px 20px",
              borderRadius: "4px",
              backgroundColor: "#B5B8BD",
              color: "#000",
              fontSize: "16px",
              fontWeight: "bold",
              border: "none",
              transition: "background-color 0.3s, transform 0.2s",
              cursor: "pointer",
            }}
            onClick={() => navigate('/okunanlar')}
          >
            OKUNANLAR
          </button>
          <button
            className="sidebar-button"
            style={{
              padding: "12px 20px",
              borderRadius: "4px",
              backgroundColor: "#B5B8BD",
              color: "#000",
              fontSize: "16px",
              fontWeight: "bold",
              border: "none",
              transition: "background-color 0.3s, transform 0.2s",
              cursor: "pointer",
            }}
            onClick={() => navigate('/okuyacaklarım')}
          >
            OKUYACAKLARIM
          </button>
        </div>
        <button
          className="sidebar-button"
          style={{
            padding: "12px 20px",
            borderRadius: "4px",
            backgroundColor: "#B5B8BD",
            color: "#000",
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            transition: "background-color 0.3s, transform 0.2s",
            cursor: "pointer",
          }}
        >
          Ayarlar
        </button>
      </aside>
      {/* Kitaplar butonuna basılınca mesaj burada gösterilecek */}
      <div style={{ marginLeft: "20px", padding: "1rem", fontSize: "18px", zIndex: 1 }}>
      </div>
    </div>
  );
};

export default Sidebar;

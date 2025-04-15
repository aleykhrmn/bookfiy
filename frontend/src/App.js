import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Anasayfa from "./pages/Anasayfa";
import Books from "./pages/books"; // Import Books page
import Favorites from "./pages/favorites";
import Okunanlar from "./pages/okunanlar";
import Okuyacaklarım from "./pages/okuyacaklarım";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router components

function App() {
  return (
    <Router>
      <div className="App" style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Header />
        <div className="main-content" style={{ display: "flex", flex: 1, marginTop: 0 }}>
          <div style={{ width: "235px" }}>
            <Sidebar />
          </div>
          <div style={{ flex: 1, marginTop: 0 }}>
            <Routes>
              <Route path="/" element={<Anasayfa />} /> {/* Default route for home page */}
              <Route path="/home" element={<Anasayfa />} /> {/* Define route for home page */}
              <Route path="/books" element={<Books />} /> {/* Define route for books page */}
              <Route path="/okunanlar" element={<Okunanlar />} />
              <Route path="/okuyacaklarım" element={<Okuyacaklarım />} />
              <Route path="/favorites" element={<Favorites />} />
              {/* Add other routes here */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
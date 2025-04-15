import React, { useEffect, useState, useRef } from "react";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    description: "",
    category_id: "",
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    fetchBooks();
    fetchCategories(); // Kategorileri getir
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:8000/books");
      const data = await response.json();
      console.log("Fetched books:", data); // Gelen veriyi kontrol et
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const toggleFavorite = async (bookId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/books/${bookId}/toggle_favorite`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      setBooks(
        books.map((book) =>
          book.id === bookId ? { ...book, favorite: data.favorite } : book
        )
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const toggleReadStatus = async (bookId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/books/${bookId}/toggle_read_status`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      setBooks(
        books.map((book) =>
          book.id === bookId
            ? { ...book, okundu_durumu: data.okundu_durumu }
            : book
        )
      );
    } catch (error) {
      console.error("Error toggling read status:", error);
    }
  };

  const formRef = useRef(null);

  const handleOutsideClick = (e) => {
    // Eğer tıklanan alan formun dışındaysa formu kapat
    if (formRef.current && !formRef.current.contains(e.target)) {
      setShowForm(false);
    }
  };

  useEffect(() => {
    if (showForm) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showForm]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8000/categories"); // Kategoriler endpoint'i
      const data = await response.json();
      setCategories(data); // Kategorileri state'e ata
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const deleteBook = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:8000/books/${bookId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setBooks(books.filter((book) => book.id !== bookId));
      } else {
        console.error("Error deleting book:", await response.json());
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });
      const data = await response.json();
      setBooks([...books, data]);
      setShowForm(false);
      setNewBook({
        title: "",
        author: "",
        description: "",
        category_id: "",
      });
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div
      style={{
        height: "90vh",
        backgroundColor: "#6F7667",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Align items to the center
        alignItems: "center",
        gap: "1rem", // Add some space between the images
        paddingLeft: "1rem", // Add some padding to the left
      }}
    >
      <button
  style={{
    marginTop: "1rem",
    padding: "1rem 1.5rem", // Padding biraz küçültüldü
    borderRadius: "10px", // Köşeler biraz daha az yuvarlatıldı
    border: "none",
    backgroundColor: "#29979e", // Turuncu renk
    color: "white",
    fontSize: "1.2rem", // Yazı boyutu biraz küçültüldü
    fontWeight: "bold", // Yazı kalınlaştırıldı
    cursor: "pointer",
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2)", // Gölge biraz azaltıldı
    transition: "background-color 0.3s ease", // Hover animasyonu için geçiş efekti
  }}
  onMouseOver={(e) => (e.target.style.backgroundColor = "#FB8C00")} // Hover rengi (daha koyu turuncu)
  onMouseOut={(e) => (e.target.style.backgroundColor = "#FF9800")} // Normal rengi
  onClick={() => setShowForm(!showForm)}
>
  {showForm ? "Cancel" : "Add Book"}
</button>

      {showForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#f0f8ff",
              padding: "3rem",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              width: "500px",
              maxWidth: "90%",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                color: "#333",
                marginBottom: "1rem",
              }}
            >
              Add a New Book
            </h2>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={newBook.title}
                onChange={handleInputChange}
                required
                style={{
                  padding: "0.8rem",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  fontSize: "1rem",
                }}
              />
              <input
                type="text"
                name="author"
                placeholder="Author"
                value={newBook.author}
                onChange={handleInputChange}
                required
                style={{
                  padding: "0.8rem",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  fontSize: "1rem",
                }}
              />
              <textarea
                name="description"
                placeholder="Description"
                value={newBook.description}
                onChange={handleInputChange}
                required
                style={{
                  padding: "0.8rem",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  fontSize: "1rem",
                  resize: "none",
                  height: "100px",
                }}
              />
              <select
                name="category_id"
                value={newBook.category_id}
                onChange={handleInputChange}
                required
                style={{
                  padding: "0.8rem",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  fontSize: "1rem",
                }}
              >
                <option value="" disabled>
                  Select a Category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                style={{
                  padding: "1rem 1.5rem", // Butonu büyütmek için padding artırıldı
                  borderRadius: "12px", // Daha yuvarlak köşeler
                  border: "none",
                  backgroundColor: "#007BFF", // Daha canlı bir mavi renk
                  color: "white",
                  fontSize: "1.2rem", // Yazı boyutu büyütüldü
                  fontWeight: "bold", // Yazı kalınlaştırıldı
                  cursor: "pointer",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Hafif gölge eklendi
                  transition: "background-color 0.3s ease", // Hover animasyonu için geçiş efekti
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#0056b3")
                } // Hover rengi
                onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")} // Normal rengi
              >
                Add Book
              </button>
            </form>
            <button
              onClick={() => setShowForm(false)}
              style={{
                marginTop: "1rem",
                padding: "0.8rem",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#f44336",
                color: "white",
                fontSize: "1rem",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div
        style={{
          display: "inline-block", // Ensure the div wraps tightly around the table
          overflow: "auto", // Enable scrolling for the table
          padding: 0, // Remove padding
          margin: 0, // Remove margin
          marginBottom: "1rem",
        }}
      >
        <table
          className="table-auto border-collapse w-full text-xs"
          style={{
            backgroundColor: "#F3F4F6",
            margin: "0 auto", // Center the table horizontally
            width: "80%", // Adjust table width
          }}
        >
          <thead style={{ backgroundColor: "#F3F4F6" }}>
            <tr style={{ height: "50px" }}>
              <th
                className="px-1 py-3 text-center align-middle"
                style={{
                  minWidth: "80px",
                  maxWidth: "150px",
                  whiteSpace: "nowrap",
                  fontSize: "10px",
                }}
              >
                STATUS
              </th>
              <th
                className="px-1 py-3 text-center align-middle"
                style={{
                  minWidth: "80px",
                  maxWidth: "150px",
                  whiteSpace: "nowrap",
                  fontSize: "10px",
                }}
              >
                Title
              </th>
              <th
                className="px-1 py-3 text-center align-middle"
                style={{
                  minWidth: "80px",
                  maxWidth: "150px",
                  whiteSpace: "nowrap",
                  fontSize: "10px",
                }}
              >
                Author
              </th>
              <th
                className="px-1 py-3 text-center align-middle"
                style={{
                  minWidth: "80px",
                  maxWidth: "150px",
                  whiteSpace: "nowrap",
                  fontSize: "10px",
                }}
              >
                Category
              </th>
              <th
                className="px-1 py-3 text-center align-middle"
                style={{
                  Width: "300px",
                  whiteSpace: "nowrap",
                  fontSize: "10px",
                }}
              >
                Description
              </th>
              <th
                className="px-1 py-3 text-center align-middle"
                style={{
                  minWidth: "80px", // Increased the minimum width
                  whiteSpace: "nowrap",
                  fontSize: "10px",
                }}
              >
                Sil
              </th>
              <th
                className="px-1 py-3 text-center align-middle"
                style={{
                  minWidth: "100px",
                  whiteSpace: "nowrap",
                  fontSize: "10px",
                }}
              >
                Okudu mu?
              </th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: "#ffffff" }}>
            {books.map((book) => (
              <tr
                key={book.id}
                style={{
                  height: "50px",
                  borderTop: "1px solid #d3d3d3", // Satır altına çizgi eklendi
                }}
              >
                <td
                  className="px-1 py-2 text-center align-middle"
                  style={{
                    maxWidth: "150px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: "10px",
                  }}
                >
                  <button
                    onClick={() => toggleFavorite(book.id)}
                    style={{
                      backgroundColor: book.favorite ? "gold" : "transparent",
                      color: book.favorite ? "black" : "gray",
                      border: "1px solid #d3d3d3",
                      borderRadius: "4px",
                      padding: "5px 10px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    {book.favorite ? "⭐" : "☆"}
                  </button>
                </td>
                <td
                  className="px-1 py-2 text-center align-middle"
                  style={{
                    maxWidth: "150px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: "10px",
                  }}
                >
                  {book.title}
                </td>
                <td
                  className="px-1 py-2 text-center align-middle"
                  style={{
                    maxWidth: "150px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: "10px",
                  }}
                >
                  {book.author}
                </td>
                <td
                  className="px-1 py-2 text-center align-middle"
                  style={{
                    maxWidth: "150px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: "10px",
                  }}
                >
                  {book.category_id}
                </td>
                <td
                  className="px-1 py-2 text-center align-middle"
                  style={{
                    maxWidth: "400px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: "10px",
                  }}
                >
                  {book.description}
                </td>
                <td
                  className="px-1 py-2 text-center align-middle"
                  style={{
                    maxWidth: "150px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: "10px",
                  }}
                >
                  <button
                    onClick={() => deleteBook(book.id)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "1px solid #d3d3d3",
                      borderRadius: "4px",
                      padding: "5px 10px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Sil
                  </button>
                </td>
                <td
                  className="px-1 py-2 text-center align-middle"
                  style={{
                    maxWidth: "400px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: "10px",
                  }}
                >
                  <button
                    onClick={() => toggleReadStatus(book.id)}
                    style={{
                      backgroundColor: book.okundu_durumu ? "green" : "white",
                      color: book.okundu_durumu ? "white" : "black",
                      border: "1px solid #d3d3d3",
                      borderRadius: "4px",
                      padding: "5px 10px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    {book.okundu_durumu ? "Okundu" : "Okunmadı"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Books;

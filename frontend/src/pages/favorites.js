import React, { useEffect, useState } from "react";

const Favorites = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:8000/books"); // Updated endpoint
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const toggleFavorite = async (bookId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/books/${bookId}/favorites`,
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

  return (
    <div
      style={{
        height: "90vh",
        backgroundColor: "#6F7667",
        margin: 0,
        padding: 0,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Center content horizontally
        justifyContent: "center", // Center content vertically
      }}
    >
      <h1 style={{ color: "white" }}>Favorilerim</h1>
      <div
        style={{
          maxHeight: "500px", // Set a maximum height for the table container
          overflowY: "auto", // Enable vertical scrolling
          width: "80%", // Match the table width
        }}
      >
        <table
          className="table-auto border-collapse w-full text-xs"
          style={{
            border: "1px solid #d3d3d3",
            backgroundColor: "#F3F4F6",
            width: "100%", // Adjust table width to fit the container
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
                ID
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
            </tr>
          </thead>
          <tbody style={{ backgroundColor: "#ffffff" }}>
            {books
              .filter((book) => book.favorite) // Filter books to show only favorites
              .map((book) => (
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
                        backgroundColor: book.favorite ? "green" : "transparent",
                        color: book.favorite ? "white" : "black",
                        border: "1px solid #d3d3d3",
                        borderRadius: "4px",
                        padding: "5px 10px",
                        cursor: "pointer",
                      }}
                    >
                      favori
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
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Favorites;
import React, { useEffect, useState } from "react";
import axios from "axios";

const Okunanlar = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // API'den okundu_durumu true olan kitapları çek
    axios
      .get("http://localhost:8000/books") // Backend API URL'sini kontrol edin
      .then((response) => {
        // Sadece okundu_durumu true olan kitapları filtrele
        const readBooks = response.data.filter((book) => book.okudu_durumu === true);

        // LocalStorage'dan oyları yükle
        const storedRatings = JSON.parse(localStorage.getItem("bookRatings")) || {};
        const booksWithRatings = readBooks.map((book) => ({
          ...book,
          rating: storedRatings[book.id] || 0, // Eğer oy yoksa varsayılan olarak 0
        }));

        setBooks(booksWithRatings);
      })
      .catch((error) => {
        console.error("Kitaplar yüklenirken hata oluştu:", error);
      });
  }, []);

  const handleRating = (bookId, rating) => {
    // Kitap için oy verme işlemi
    const updatedBooks = books.map((book) =>
      book.id === bookId ? { ...book, rating } : book
    );
    setBooks(updatedBooks);

    // LocalStorage'a oyları kaydet
    const storedRatings = JSON.parse(localStorage.getItem("bookRatings")) || {};
    storedRatings[bookId] = rating;
    localStorage.setItem("bookRatings", JSON.stringify(storedRatings));

    // Backend'e oy gönderme
    axios
      .post(`http://localhost:8000/books/${bookId}/rate`, { rating })
      .then((response) => {
        console.log("Oy başarıyla gönderildi:", response.data);
      })
      .catch((error) => {
        console.error("Oy gönderilirken hata oluştu:", error);
      });
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
        justifyContent: "center", // Center content vertically
        alignItems: "center", // Center content horizontally
        gap: "1rem",
      }}
    >
      <h1 style={{ color: "white" }}>Okunan Kitaplar</h1>
      {books.length > 0 ? (
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
              backgroundColor: "#F3F4F6",
              margin: "0 auto", // Center the table horizontally
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
                  Description
                </th>
                <th
                  className="px-1 py-3 text-center align-middle"
                  style={{
                    minWidth: "100px",
                    maxWidth: "150px",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                  }}
                >
                  Rating
                </th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: "#ffffff" }}>
              {books.map((book) => (
                <tr
                  key={book.id}
                  style={{
                    height: "50px",
                    borderTop: "1px solid #d3d3d3",
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
                    {book.id}
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
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => handleRating(book.id, star)}
                        style={{
                          cursor: "pointer",
                          color: book.rating >= star ? "gold" : "gray",
                          fontSize: "14px",
                          marginRight: "2px",
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ color: "white" }}>Henüz okunan kitap yok.</p>
      )}
    </div>
  );
};

export default Okunanlar;
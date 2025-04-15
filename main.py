import subprocess
import psycopg2
import time
import os
from fastapi import FastAPI, HTTPException  # HTTPException ithal edildi
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# CORS ayarları
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# PostgreSQL veritabanı bağlantısı
def connect_to_db():
    try:
        # PostgreSQL veritabanına bağlan
        conn = psycopg2.connect(
            database="Bookify",  
            user="postgres",  
            host="localhost",
            password="2813", 
            port=5432
        )

        # Cursor oluştur
        cursor = conn.cursor()

        # Bağlantının başarılı olduğunu göster
        print("Bağlantı başarılı!")

        # Örnek bir sorgu çalıştır
        cursor.execute("SELECT version();")
        version = cursor.fetchone()
        print("PostgreSQL Version:", version)

        return conn, cursor

    except Exception as e:
        print("Bağlantı hatası:", e)
        
class Book(BaseModel):
    title: str
    author: str
    description: str
    category_id: int

@app.post("/books")
def add_book(book: Book):
    conn, cursor = connect_to_db()
    cursor.execute(
        "INSERT INTO books (title, author, description, category_id) VALUES (%s, %s, %s, %s) RETURNING id, favorite;",
        (book.title, book.author, book.description, book.category_id)
    )
    new_book = cursor.fetchone()
    conn.commit()
    cursor.close()
    conn.close()
    return {"id": new_book[0], "title": book.title, "author": book.author, "description": book.description, "category_id": book.category_id, "favorite": new_book[1]}

@app.get("/books/read")
def get_read_books():
    conn, cursor = connect_to_db()
    cursor.execute("SELECT id, title, author, description, category_id FROM books WHERE okundu_durumu = true;")
    books = cursor.fetchall()
    cursor.close()
    conn.close()
    return [{"id": book[0], "title": book[1], "author": book[2], "description": book[3], "category_id": book[4]} for book in books]

@app.get("/books")
def get_books():
    print("Kitaplar getiriliyor...")
    conn, cursor = connect_to_db()
    cursor.execute("SELECT id, title, author, description, category_id, favorite, okundu_durumu FROM books;")
    books = cursor.fetchall()
    cursor.close()
    conn.close()
    return [{"id": book[0], "title": book[1],  "author": book[2], "description": book[3], "category_id": book[4], "favorite": book[5], "okudu_durumu": book[6]} for book in books]  # favorite alanı book[5]

@app.get("/categories")
def get_categories():
    conn, cursor = connect_to_db()
    cursor.execute("SELECT id, name FROM categories;")  # Kategoriler tablosundan id ve isim alınır
    categories = cursor.fetchall()
    cursor.close()
    conn.close()
    return [{"id": category[0], "name": category[1]} for category in categories]

@app.delete("/books/{book_id}")
def delete_book(book_id: int):
    conn, cursor = connect_to_db()
    cursor.execute("DELETE FROM books WHERE id = %s RETURNING id;", (book_id,))
    deleted_book = cursor.fetchone()
    conn.commit()
    cursor.close()
    conn.close()
    if not deleted_book:
        raise HTTPException(status_code=404, detail="Book not found")
    return {"id": deleted_book[0], "message": "Book deleted successfully"}

@app.post("/books/{book_id}/toggle_read_status")
def toggle_read_status(book_id: int):
    conn, cursor = connect_to_db()
    cursor.execute("SELECT okundu_durumu FROM books WHERE id = %s;", (book_id,))
    book = cursor.fetchone()
    if book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    
    new_read_status = not book[0]
    cursor.execute("UPDATE books SET okundu_durumu = %s WHERE id = %s;", (new_read_status, book_id))
    conn.commit()
    cursor.close()
    conn.close()
    return {"id": book_id, "okundu_durumu": new_read_status}

@app.post("/books/{book_id}/toggle_favorite")
def toggle_favorite(book_id: int):
    conn, cursor = connect_to_db()
    cursor.execute("SELECT favorite FROM books WHERE id = %s;", (book_id,))
    book = cursor.fetchone()
    if book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    
    new_favorite_status = not book[0]
    cursor.execute("UPDATE books SET favorite = %s WHERE id = %s;", (new_favorite_status, book_id))
    conn.commit()
    cursor.close()
    conn.close()
    return {"id": book_id, "favorite": new_favorite_status}

@app.get("/books/favorites")
def get_favorite_books():
    conn, cursor = connect_to_db()
    cursor.execute("SELECT id, title, author, description, category_id FROM books WHERE favorite = true;")
    books = cursor.fetchall()
    cursor.close()
    conn.close()
    return [{"id": book[0], "title": book[1], "author": book[2], "description": book[3], "category_id": book[4]} for book in books]

# Frontend'i başlatma (npm start)
def start_frontend():
    print("React frontend'i başlatılıyor...")
    # 'frontend' dizinine gitmek için os.chdir kullanma
    os.chdir("frontend")  # 'frontend' React projelerinizin bulunduğu dizin
    # npm'in tam yolunu belirterek subprocess kullanma
    npm_path = r"C:\Program Files\nodejs\npm.cmd"  # npm'in tam yolu (Windows için)
    subprocess.Popen([npm_path, "start"])

# Ana fonksiyon
def main():
    # Veritabanı bağlantısını kontrol et
    connect_to_db()

    # Backend'i başlatma kodları (örneğin, FastAPI veya Flask çalıştırılabilir)
    print("Backend çalıştırılıyor...")
    subprocess.Popen(["uvicorn", "main:app", "--reload"])  # FastAPI örneği
    
    # Frontend'i başlat
    start_frontend()

    # Bu satırdaki time.sleep, frontend'in başlatılmasını beklemek içindir.
    # Gerçek projede bu bekleme yerine daha uygun bir yöntem seçilebilir.
    time.sleep(5)

if __name__ == "__main__":
    main()
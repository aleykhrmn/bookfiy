import psycopg2

# PostgreSQL bağlantısı
conn = psycopg2.connect(
    database="Bookify",
    user="postgres",
    password="2813",
    host="localhost",
    port="5432"
)

cur = conn.cursor()

# Kullanıcıları ekleyelim
cur.execute("""
INSERT INTO users (username, email, password_hash, role) VALUES 
('admin', 'admin@example.com', 'hashed_password1', 'admin'),
('user1', 'user1@example.com', 'hashed_password2', 'user'),
('user2', 'user2@example.com', 'hashed_password3', 'user')
ON CONFLICT (email) DO NOTHING;
""")

# Kategorileri ekleyelim
cur.execute("""
INSERT INTO categories (name) VALUES 
('Roman'),
('Bilim Kurgu'),
('Kişisel Gelişim')
ON CONFLICT (name) DO NOTHING;
""")



# Kullanıcıların kitap okuma durumlarını ekleyelim
cur.execute("""
ALTER TABLE user_books ADD CONSTRAINT unique_user_book UNIQUE (user_id, book_id);
""")  # UNIQUE constraint ekledik

cur.execute("""
INSERT INTO user_books (user_id, book_id, status) VALUES 
((SELECT id FROM users WHERE username='user1'), (SELECT id FROM books WHERE title='1984'), 'reading'),
((SELECT id FROM users WHERE username='user2'), (SELECT id FROM books WHERE title='Savaş ve Barış'), 'not_read')
ON CONFLICT (user_id, book_id) DO NOTHING;
""")

# Değişiklikleri kaydet
conn.commit()

# Bağlantıyı kapat
cur.close()
conn.close()

print("Veriler başarıyla eklendi! 🚀")

import psycopg2

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

    # Bağlantıyı kapat
    cursor.close()
    conn.close()
    print("Bağlantı kapatıldı.")

except Exception as e:
    print("Bağlantı hatası:", e)
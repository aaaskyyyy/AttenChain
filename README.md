# AttenChain: Blockchain-Based Attendance System

## 📖 Latar Belakang

Proses absensi pada kegiatan seminar, pelatihan, maupun perkuliahan masih banyak dilakukan menggunakan metode konvensional atau sistem terpusat (centralized). Pendekatan tersebut memiliki beberapa kelemahan, seperti risiko manipulasi data kehadiran, perubahan data tanpa jejak audit, serta rendahnya jaminan integritas informasi.

AttenChain dikembangkan sebagai aplikasi absensi berbasis **Blockchain** untuk mendemonstrasikan bagaimana teknologi blockchain dapat dimanfaatkan dalam menjaga keaslian dan integritas data kehadiran. Setiap data absensi disimpan dalam bentuk blok yang saling terhubung menggunakan hash kriptografi sehingga setiap perubahan yang tidak sah dapat dideteksi oleh sistem.

---

# 🎯 Tujuan

AttenChain dikembangkan dengan tujuan untuk:

* Membangun sistem absensi digital yang aman dan transparan.
* Mengimplementasikan konsep blockchain pada proses pencatatan kehadiran.
* Menjamin integritas data absensi melalui mekanisme hashing dan validasi rantai blok.
* Menyediakan simulasi deteksi manipulasi data blockchain sebagai media pembelajaran.
* Menunjukkan penerapan teknologi blockchain menggunakan JavaScript dan Node.js.

---

# 🛠 Teknologi yang Digunakan

| Teknologi  | Fungsi                              |
| ---------- | ----------------------------------- |
| Node.js    | Runtime JavaScript                  |
| Express.js | Web Server dan REST API             |
| CryptoJS   | Pembuatan SHA-256 Hash              |
| HTML5      | Antarmuka pengguna                  |
| CSS3       | Desain antarmuka                    |
| JavaScript | Logika frontend                     |
| CORS       | Komunikasi antara client dan server |

---

# ⭐ Keunggulan Sistem

* Implementasi blockchain sederhana dan mudah dipahami.
* Data absensi disimpan dalam bentuk rantai blok (Blockchain).
* Setiap blok memiliki hash unik yang saling terhubung.
* Mampu mendeteksi manipulasi data melalui validasi blockchain.
* Mendukung simulasi serangan (tampering) terhadap data.
* Memiliki mekanisme pemulihan (Self-Healing) menggunakan snapshot blockchain.
* Antarmuka web sederhana sehingga mudah digunakan sebagai media demonstrasi maupun pembelajaran.

---

# ⛓️ Fitur Blockchain

AttenChain mengimplementasikan beberapa konsep utama blockchain, antara lain:

* **Genesis Block** sebagai blok pertama pada blockchain.
* **SHA-256 Hash** untuk menghasilkan identitas unik setiap blok.
* **Previous Hash** sebagai penghubung antarblok.
* **Blockchain Validation** untuk memverifikasi keaslian seluruh rantai blok.
* **Tamper Detection** untuk mendeteksi perubahan data secara ilegal.
* **Self-Healing Mechanism** untuk memulihkan blockchain menggunakan snapshot yang valid.
* **Immutable Record Simulation**, yaitu simulasi bahwa data yang telah tercatat tidak dapat diubah tanpa merusak keseluruhan rantai blok.

---

# 🔄 Alur Kerja Sistem

1. Panitia melakukan login ke dalam sistem.
2. Panitia menentukan nama acara yang sedang berlangsung.
3. Peserta mengisi data kehadiran berupa nama dan NIM.
4. Server membentuk blok baru yang berisi data absensi.
5. Setiap blok dihitung nilai hash menggunakan algoritma SHA-256.
6. Blok baru dihubungkan dengan blok sebelumnya melalui nilai *previous hash*.
7. Blockchain diperbarui dengan blok yang baru ditambahkan.
8. Sistem melakukan validasi untuk memastikan integritas blockchain.
9. Administrator dapat melihat seluruh isi blockchain melalui halaman monitoring.
10. Sistem menyediakan simulasi manipulasi data untuk menunjukkan proses deteksi perubahan ilegal.
11. Apabila blockchain mengalami manipulasi, fitur **Self-Healing** dapat mengembalikan kondisi blockchain ke snapshot terakhir yang valid.

---

# 📂 Struktur Proyek

```text
attenchain-app/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── blockchain.js
├── server.js
├── package.json
└── README.md
```

---

# ▶️ Cara Menjalankan

## 1. Install dependency

```bash
npm install
```

## 2. Jalankan aplikasi

```bash
npm start
```

atau

```bash
node server.js
```

## 3. Buka browser

```
http://localhost:5000
```

---

# 📌 API Endpoint

| Method | Endpoint          | Fungsi                     |
| ------ | ----------------- | -------------------------- |
| GET    | `/api/acara`      | Melihat nama acara aktif   |
| POST   | `/api/acara`      | Mengubah nama acara        |
| POST   | `/api/login`      | Login panitia              |
| POST   | `/api/absensi`    | Menambahkan data absensi   |
| GET    | `/api/blockchain` | Melihat seluruh blockchain |
| POST   | `/api/manipulasi` | Simulasi manipulasi data   |
| POST   | `/api/pulihkan`   | Memulihkan blockchain      |

---

# 📖 Kesimpulan

AttenChain merupakan implementasi sederhana teknologi blockchain pada sistem absensi digital. Dengan memanfaatkan mekanisme hashing, keterkaitan antarblok (*previous hash*), validasi blockchain, serta fitur deteksi dan pemulihan manipulasi, aplikasi ini menunjukkan bagaimana blockchain dapat meningkatkan integritas dan transparansi data. Meskipun masih bersifat prototipe dan menyimpan blockchain di memori lokal, AttenChain dapat menjadi media pembelajaran yang efektif untuk memahami prinsip dasar blockchain serta penerapannya pada sistem informasi.

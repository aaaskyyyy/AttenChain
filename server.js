const express = require('express');
const cors = require('cors');
const path = require('path');
const { Blockchain } = require('./blockchain');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const attenChain = new Blockchain();

// Variabel untuk menyimpan nama acara secara dinamis di server
let namaAcaraSekarang = "Seminar Nasional Teknologi 2026";

// 1. Endpoint mengambil nama acara aktif saat ini
app.get('/api/acara', (req, res) => {
    res.json({ acara: namaAcaraSekarang });
});

// 2. Endpoint mengubah nama acara (Akses khusus Panitia)
app.post('/api/acara', (req, res) => {
    const { namaAcaraBaru } = req.body;
    if (!namaAcaraBaru) {
        return res.status(400).json({ message: 'Nama acara baru tidak boleh kosong!' });
    }
    namaAcaraSekarang = namaAcaraBaru;
    res.json({ message: 'Nama acara berhasil diperbarui!' });
});

// 3. Endpoint melihat seluruh isi blockchain absensi
app.get('/api/blockchain', (req, res) => {
    res.json({
        chain: attenChain.chain,
        isValid: attenChain.isChainValid()
    });
});

// 4. Endpoint input kehadiran (Otomatis memakai namaAcaraSekarang dari server)
app.post('/api/absensi', (req, res) => {
    const { nama, nim } = req.body;
    if (!nama || !nim) {
        return res.status(400).json({ message: 'Nama dan NIM wajib diisi!' });
    }

    attenChain.addBlock({ nama, nim, acara: namaAcaraSekarang });
    res.json({ message: 'Kehadiran berhasil dikunci ke dalam Blockchain!' });
});

// 5. Endpoint simulasi hacker
app.post('/api/manipulasi', (req, res) => {
    const { index, namaPalsu } = req.body;
    if (attenChain.chain[index]) {
        attenChain.chain[index].data.nama = namaPalsu;
        res.json({ message: `Data blok ke-${index} berhasil diubah secara ilegal!` });
    } else {
        res.status(400).json({ message: 'Blok tidak ditemukan' });
    }
});

// Endpoint untuk memulihkan data blockchain yang rusak
app.post('/api/pulihkan', (req, res) => {
    const berhasil = attenChain.pulihkanRantai();
    if (berhasil) {
        res.json({ message: 'Sistem Self-Healing aktif! Data manipulasi berhasil dibuang dan dipulihkan dari snapshot yang sah.' });
    } else {
        res.status(500).json({ message: 'Gagal melakukan pemulihan data.' });
    }
});

// Endpoint untuk proses login panitia
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    // Akun admin tiruan untuk kebutuhan demo tugas
    if (username === 'admin' && password === 'admin123') {
        res.json({ success: true, message: 'Login berhasil!' });
    } else {
        res.status(401).json({ success: false, message: 'Username atau password salah!' });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server AttenChain aktif di http://localhost:${PORT}`);
});
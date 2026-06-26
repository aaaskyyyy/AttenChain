const crypto = require('crypto');

// Fungsi eksternal untuk menghitung hash objek blok
// Pendekatan ini aman dari risiko hilangnya metode class saat proses deep-clone JSON
function hitungHashBlok(block) {
    return crypto
        .createHash('sha256')
        .update(block.index + block.timestamp + JSON.stringify(block.data) + block.previousHash)
        .digest('hex');
}

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return hitungHashBlok(this);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        // Membuat salinan bayangan yang aman di memori untuk cadangan pemulihan
        this.shadowChain = JSON.parse(JSON.stringify(this.chain));
    }

    createGenesisBlock() {
        return new Block(0, "29/05/2026, 00:00:00", { info: "Genesis Block - AttenChain" }, "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(data) {
        const index = this.chain.length;
        // Menggunakan format waktu lokal Indonesia
        const timestamp = new Date().toLocaleString("id-ID");
        const previousBlock = this.getLatestBlock();
        
        const newBlock = new Block(index, timestamp, data, previousBlock.hash);
        this.chain.push(newBlock);

        // Jika blok baru yang ditambahkan valid, perbarui rantai bayangan cadangan
        if (this.isChainValid()) {
            this.shadowChain = JSON.parse(JSON.stringify(this.chain));
        }
    }

    // Mekanisme pemulihan data mandiri dengan menimpa data rusak memakai snapshot yang sah
    pulihkanRantai() {
        this.chain = JSON.parse(JSON.stringify(this.shadowChain));
        return true;
    }

    isChainValid() {
        // Validasi khusus untuk Blok 0 (Genesis Block)
        const genesisBlock = this.chain[0];
        if (genesisBlock.hash !== hitungHashBlok(genesisBlock)) {
            return false;
        }

        // Perulangan untuk memeriksa Blok 1 hingga blok terakhir secara berantai
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // Validasi integritas data internal blok itu sendiri
            if (currentBlock.hash !== hitungHashBlok(currentBlock)) {
                return false;
            }

            // Validasi keterikatan kriptografi dengan blok sebelumnya
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

module.exports = { Block, Blockchain };
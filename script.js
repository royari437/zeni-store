// 1. DATABASE HARGA (Sesuaikan dengan list kamu)
const daftarHarga = {
    "Canva Pro": {
        "1 Bulan": 4000,
        "3 Bulan": 10000,
        "1 Tahun": 22000,
        "Lifetime": 28000
    },
    "Viu Premium": {
        "1 Bulan (private)": 5000,
        "3 Bulan (private)": 9000,
        "6 Bulan (private)": 12000,
        "1 Tahun (private)": 15000
    },
    "Netflix": {
        "1P1U (Sharing)": 33000,
        "Semi Private": 38000,
        "Private": 115000
    },
    "YouTube Premium": {
        "FamPlan 1 Bulan": 7000,
        "IndPlan 1 Bulan": 12000
    },
    "Spotify": {
        "Individual 1 Bulan": 25000,
        "Family 1 Bulan": 24000
    }
};

const appSelect = document.getElementById('appType');
const variantSelect = document.getElementById('appVariant');
const priceInput = document.getElementById('displayPrice');

// 2. LOGIKA PILIHAN OTOMATIS
appSelect.addEventListener('change', function() {
    const pilihanApp = this.value;
    variantSelect.innerHTML = '<option value="">Pilih Variasi...</option>';
    priceInput.value = '';

    if (pilihanApp && daftarHarga[pilihanApp]) {
        // Ambil daftar variasi dari database
        const variasi = Object.keys(daftarHarga[pilihanApp]);
        variasi.forEach(v => {
            variantSelect.innerHTML += `<option value="${v}">${v}</option>`;
        });
    }
});

variantSelect.addEventListener('change', function() {
    const app = appSelect.value;
    const variant = this.value;
    if (app && variant) {
        priceInput.value = "Rp " + daftarHarga[app][variant].toLocaleString();
    }
});

// 3. LOGIKA SIMPAN DATA (Sama seperti sebelumnya)
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nama = document.getElementById('buyerName').value;
    const app = appSelect.value;
    const variant = variantSelect.value;
    const harga = priceInput.value;

    const dataBaru = { nama, aplikasi: `${app} (${variant})`, harga, waktu: new Date().toLocaleString() };

    let dataLama = JSON.parse(localStorage.getItem('pesanan')) || [];
    dataLama.push(dataBaru);
    localStorage.setItem('pesanan', JSON.stringify(dataLama));

    tampilkanData();
    
    // Link WA
    const pesan = `Halo Zeni Store!\nNama: ${nama}\nOrder: ${app} - ${variant}\nTotal: ${harga}`;
    window.open(`https://wa.me/6285777388195?text=${encodeURIComponent(pesan)}`, '_blank');
    this.reset();
});

function tampilkanData() {
    const data = JSON.parse(localStorage.getItem('pesanan')) || [];
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = '';
    data.forEach(item => {
        orderList.innerHTML += `<tr><td>${item.nama}</td><td>${item.aplikasi}</td><td>${item.harga}</td><td>${item.waktu}</td></tr>`;
    });
}

function hapusSemua() {
    if(confirm("Hapus semua rekap?")) { localStorage.removeItem('pesanan'); tampilkanData(); }
}

tampilkanData();
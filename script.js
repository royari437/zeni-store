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
    "YouTube Premium": {
        "IndPlan 1 Bulan": 12000,
        "IndPlan 2 Bulan": 20000,
        "IndPlan 3 Bulan": 28000,
        "FamPlan 1 Bulan": 7000,
        "FamPlan 2 Bulan": 14000,
        "FamPlan 3 Bulan": 20000
    },
    "Netflix": {
        "1P1U (Sharing)": 33000,
        "Semi Private": 38000,
        "Private": 115000
    },
    "Spotify": {
        "Individual 1 Bulan": 25000,
        "Individual 2 Bulan": 40000,
        "Individual 3 Bulan": 52000,
        "Individual 4 Bulan": 60000,
        "Family 1 Bulan": 24000,
        "Family 2 Bulan": 38000,
        "Family 3 Bulan": 50000
    }
};

// GANTI DENGAN URL GOOGLE APPS SCRIPT KAMU
const scriptURL = 'https://script.google.com/macros/s/AKfycbyah4LVttV3UEwbpivNwcEcJxdQ6mnwwyby-QPkTyDiyWNPdrNdRc5n886WcIPWQXW3lA/exec';

const appSelect = document.getElementById('appType');
const variantSelect = document.getElementById('appVariant');
const priceInput = document.getElementById('displayPrice');
const orderForm = document.getElementById('orderForm');

// 2. LOGIKA PILIHAN OTOMATIS
appSelect.addEventListener('change', function() {
    const pilihanApp = this.value;
    variantSelect.innerHTML = '<option value="">Pilih Variasi...</option>';
    priceInput.value = '';
    if (pilihanApp && daftarHarga[pilihanApp]) {
        Object.keys(daftarHarga[pilihanApp]).forEach(v => {
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

// 3. LOGIKA KIRIM DATA
orderForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Animasi Loading pada Tombol
    const btn = this.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = "Mengirim...";
    btn.disabled = true;

    const nama = document.getElementById('buyerName').value;
    const app = appSelect.value;
    const variant = variantSelect.value;
    const harga = priceInput.value;
    const waktu = new Date().toLocaleString('id-ID');

    const dataBaru = { nama, aplikasi: `${app} (${variant})`, harga, waktu };

    fetch(scriptURL, { method: 'POST', body: JSON.stringify(dataBaru) })
    .then(response => {
        alert("Pesanan Berhasil Tercatat!");
        
        // Buka WhatsApp
        const pesan = `Halo Zeni Store!\nNama: ${nama}\nOrder: ${app} - ${variant}\nTotal: ${harga}`;
        window.open(`https://wa.me/6285777388195?text=${encodeURIComponent(pesan)}`, '_blank');
        
        orderForm.reset();
        priceInput.value = '';
    })
    .catch(error => {
        console.error('Error!', error.message);
        alert("Gagal mengirim data, tapi silakan lanjut ke WA.");
    })
    .finally(() => {
        btn.innerText = originalText;
        btn.disabled = false;
    });
});
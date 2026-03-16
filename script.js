// 1. DATABASE HARGA
const daftarHarga = {
    "Canva Pro": {
        "1 Bulan (Invite)": 4000,
        "3 Bulan (Invite)": 10000,
        "1 Tahun (Invite)": 22000,
        "Lifetime (Edu)": 28000
    },
    "Viu Premium": {
        "1 Bulan (Private)": 5000,
        "3 Bulan (Private)": 9000,
        "6 Bulan (Private)": 12000,
        "1 Tahun (Private)": 15000
    },
    "YouTube Premium": {
        "IndPlan 1 Bulan": 12000,
        "IndPlan 2 Bulan": 20000,
        "IndPlan 3 Bulan": 28000,
        "FamPlan 1 Bulan": 7000,
        "FamPlan 2 Bulan": 14000,
        "FamPlan 3 Bulan": 20000
    },
    "Netflix Premium": {
        "1P1U (Sharing)": 33000,
        "Semi Private": 38000,
        "Private (1 Akun)": 115000
    },
    "Spotify Premium": {
        "Individual 1 Bulan": 25000,
        "Individual 2 Bulan": 40000,
        "Individual 3 Bulan": 52000,
        "Individual 4 Bulan": 60000,
        "Family 1 Bulan": 24000,
        "Family 2 Bulan": 38000,
        "Family 3 Bulan": 50000
    },
    "Vidio Platinum": {
        "Mobile (Sharing)": 20000,
        "Mobile (Private)": 30000,
        "All Device (Sharing)": 25000,
        "All Device (Private)": 45000,
        "TV Only (1 Tahun)": 18000
    },
    "WeTV Premium": {
        "1 Bulan (Sharing)": 13000,
        "2 Bulan (Sharing)": 22000,
        "3 Bulan (Sharing)": 28000,
        "1 Bulan (Private)": 30000
    },
    "Drakor ID": {
        "1 Bulan (Sharing)": 13000,
        "3 Bulan (Sharing)": 20000,
        "6 Bulan (Sharing)": 25000,
        "1 Tahun (Sharing)": 28000
    },
    "ChatGPT Plus": {
        "Sharing": 18000,
        "Private Invite (No Gar)": 12000,
        "Private Invite (Full Gar)": 22000,
        "Private Individu": 40000
    },
    "Gemini AI + GDrive": {
        "1 Bulan (FamPlan)": 8000,
        "1 Tahun (FamPlan)": 20000,
        "1 Bulan (Private)": 13000,
        "1 Tahun (Private)": 28000
    },
    "CapCut Pro": {
        "7 Hari (Full Gar)": 7000,
        "14 Hari (Full Gar)": 12000,
        "35 Hari (Full Gar)": 18000,
        "35 Hari (No Gar)": 13000,
        "35 Hari (Private No Gar)": 15000
    },
    "Duolingo Super": {
        "1 Minggu (FamMember)": 10000,
        "1 Minggu (Individu)": 12000,
        "1 Minggu (FamHead)": 18000
    },
    "Get Contact": {
        "Jasa Cek 1x": 2000,
        "1 Bulan Premium": 16000
    }
};

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
        window.open(`https://wa.me/628980009650?text=${encodeURIComponent(pesan)}`, '_blank');
        
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

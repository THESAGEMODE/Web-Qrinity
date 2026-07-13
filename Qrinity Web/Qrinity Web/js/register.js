// Definisi fungsi Toast Qrinity
window.Qrinity = window.Qrinity || {};
window.Qrinity.toast = function(message, type = 'success') {
    const toast = document.createElement('div');
    toast.textContent = message;
    
    toast.style.position = 'fixed';
    toast.style.bottom = '30px';
    toast.style.right = '30px';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '8px';
    toast.style.color = '#fff';
    toast.style.fontFamily = "'Poppins', sans-serif";
    toast.style.fontSize = '14px';
    toast.style.fontWeight = '500';
    toast.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
    toast.style.zIndex = '9999';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s ease';

    if (type === 'danger') {
        toast.style.background = '#EF4444'; // Merah
    } else {
        toast.style.background = '#10B981'; // Hijau
    }

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 10);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

/* Fitur Show / Hide Password */
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", function () {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
        
        if (type === "text") {
            this.style.color = "#5C33E3";
        } else {
            this.style.color = "#9CA3AF";
        }
    });
}

/* Validasi Form Register */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullname = document.getElementById('fullname').value.trim();
        const restaurantName = document.getElementById('restaurantName').value.trim();
        const email = document.getElementById('email').value.trim();
        const pw = document.getElementById('password').value;
        
        if (!fullname) {
            return window.Qrinity.toast('Nama lengkap wajib diisi', 'danger');
        }

        if (!restaurantName) {
            return window.Qrinity.toast('Nama restoran wajib diisi', 'danger');
        }

        if (!email || !/.+@.+\..+/.test(email)) {
            return window.Qrinity.toast('Silakan masukkan email yang valid', 'danger');
        }
        
        if (pw.length < 6) {
            return window.Qrinity.toast('Password minimal 6 karakter', 'danger');
        }
        
        window.Qrinity.toast('Pendaftaran berhasil! Mengalihkan...', 'success');
        
        const btn = form.querySelector('.submit-btn');
        btn.innerHTML = `<span>Loading...</span>`;
        btn.style.opacity = "0.7";
        btn.style.pointerEvents = "none";

        // Simulasi Redirect ke halaman dashboard atau login
        setTimeout(() => {
            window.location.href = 'login.html'; 
        }, 1500);
    });
});
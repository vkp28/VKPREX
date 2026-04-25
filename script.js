let isSignUp = false;

function openAuth() { document.getElementById('authModal').classList.remove('hidden'); }
function closeModal() { document.getElementById('authModal').classList.add('hidden'); }

function toggleAuthMode() {
    isSignUp = !isSignUp;
    document.getElementById('authTitle').innerText = isSignUp ? "Sign Up" : "Login";
    document.getElementById('authName').classList.toggle('hidden', !isSignUp);
    document.getElementById('toggleText').innerText = isSignUp ? "Have account? Login" : "Create Account";
}

document.getElementById('authForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('authEmail').value;
    const pass = document.getElementById('authPass').value;

    if (isSignUp) {
        localStorage.setItem(email, JSON.stringify({ email, pass }));
        alert("Account Created."); toggleAuthMode();
    } else {
        const user = JSON.parse(localStorage.getItem(email));
        if (user && user.pass === pass) {
            closeModal();
            document.getElementById('landingPage').classList.add('hidden');
            document.getElementById('dashboard').classList.remove('hidden');
            loadPanel();
        } else { alert("Error: Access Denied"); }
    }
});

function loadPanel() {
    document.getElementById('sidebar').innerHTML = `
        <div class="space-y-4">
            <div class="p-5 bg-white/5 rounded-2xl border border-white/5 font-black uppercase text-[10px] tracking-widest text-purple-400">Node Management</div>
            <div class="p-5 bg-white/5 rounded-2xl border border-white/5 font-black uppercase text-[10px] tracking-widest text-gray-500">File Browser</div>
            <div class="p-5 bg-white/5 rounded-2xl border border-white/5 font-black uppercase text-[10px] tracking-widest text-gray-500">Databases</div>
        </div>
    `;
    document.getElementById('panelView').innerHTML = `
        <div class="opacity-10 text-center">
            <i class="fas fa-satellite-dish text-[10rem] mb-10"></i>
            <h2 class="text-4xl font-black uppercase italic tracking-[0.8em]">Secure Link Established</h2>
        </div>
    `;
}

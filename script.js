let isSignUp = false;
const panels = {
    game: { url: "GP.VKP-REX.CLOUD", sidebar: ["Terminal", "Files", "Databases", "Backups"] },
    web: { url: "WEB.VKP-REX.CLOUD", sidebar: ["Domain DNS", "SSL Certs", "FTP Users", "Cron"] }
};

function openAuth() { document.getElementById('authModal').classList.remove('hidden'); }
function closeModal() { document.getElementById('authModal').classList.add('hidden'); }

function toggleAuthMode() {
    isSignUp = !isSignUp;
    document.getElementById('authTitle').innerText = isSignUp ? "Sign Up" : "Login";
    document.getElementById('authName').classList.toggle('hidden', !isSignUp);
}

document.getElementById('authForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('authEmail').value;
    const pass = document.getElementById('authPass').value;

    if (isSignUp) {
        localStorage.setItem(email, JSON.stringify({ email, pass }));
        alert("Registration Successful.");
        toggleAuthMode();
    } else {
        const user = JSON.parse(localStorage.getItem(email));
        if (user && user.pass === pass) {
            closeModal();
            document.getElementById('landingPage').style.display = 'none';
            document.getElementById('dashboard').classList.remove('hidden');
            switchTab('game');
        } else { alert("Login failed."); }
    }
});

function switchTab(type) {
    document.querySelectorAll('.mac-tab').forEach(b => b.classList.remove('active'));
    document.getElementById(`tab-${type}`).classList.add('active');
    
    const data = panels[type];
    document.getElementById('panelUrl').innerText = data.url;
    
    document.getElementById('sidebar').innerHTML = data.sidebar.map(item => `
        <div class="sidebar-item flex justify-between items-center group">
            <span class="text-[10px] font-black uppercase tracking-widest">${item}</span>
            <i class="fas fa-chevron-right text-[8px] opacity-20 group-hover:opacity-100 transition"></i>
        </div>`).join('');
    
    document.getElementById('panelView').innerHTML = `
        <div class="flex flex-col items-center opacity-20">
            <i class="fas fa-microchip text-6xl mb-6"></i>
            <h3 class="text-xl font-black uppercase italic tracking-[0.4em]">Initializing Node</h3>
            <p class="text-[10px] mt-2 uppercase tracking-widest">Connection Stable</p>
        </div>
    `;
}

let isSignUp = true;

const panels = {
    game: { url: "gp.vkprex.cloud", sidebar: ["Real-Time Console", "Mods Installer", "Plugin Installer", "Config Editor"], content: `<img src="game-panel.png" class="w-full h-full object-cover">` },
    web: { url: "smartweb.vkprex.cloud", sidebar: ["File Manager", "Database Manager", "SSL & Security", "1-Click Installer"], content: `<img src="web-panel.png" class="w-full h-full object-cover">` },
    vps: { url: "vps.vkprex.cloud", sidebar: ["OS Reinstallation", "SSH Keys", "Monitoring", "Firewall"], content: `<img src="vps-panel.png" class="w-full h-full object-cover">` },
    reseller: { url: "reseller.vkprex.cloud", sidebar: ["Home Panel", "Manage Clients", "Panel Settings"], content: `<img src="reseller-panel.png" class="w-full h-full object-cover">` }
};

function toggleModal() { document.getElementById('loginModal').classList.toggle('hidden'); }

function toggleAuthMode() {
    isSignUp = !isSignUp;
    document.getElementById('modalTitle').innerText = isSignUp ? "Sign Up" : "Welcome Back";
    document.getElementById('submitBtn').innerText = isSignUp ? "Create Account" : "Login";
    document.getElementById('toggleBtn').innerText = isSignUp ? "Switch to Login" : "Switch to Sign Up";
}

document.getElementById('authForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    if (isSignUp) {
        localStorage.setItem(`vkp_rex_${email}`, pass);
        alert("Account Created!"); toggleAuthMode();
    } else {
        if (localStorage.getItem(`vkp_rex_${email}`) === pass) {
            localStorage.setItem('rex_session', 'active');
            localStorage.setItem('rex_email', email);
            enterDashboard(email);
        } else { alert("Incorrect details!"); }
    }
});

function switchTab(type) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active-tab'));
    document.getElementById(`tab-${type}`).classList.add('active-tab');
    const data = panels[type];
    document.getElementById('urlBar').innerText = data.url;
    document.getElementById('panelView').innerHTML = data.content;
    document.getElementById('sidebar').innerHTML = data.sidebar.map(item => `<div class="sidebar-item"><span>${item}</span><i class="fas fa-chevron-right text-[10px]"></i></div>`).join('');
}

function enterDashboard(email) {
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('landingPage').classList.add('hidden');
    switchTab('game');
}

function logout() { localStorage.clear(); location.reload(); }

window.onload = () => { if (localStorage.getItem('rex_session') === 'active') enterDashboard(localStorage.getItem('rex_email')); };

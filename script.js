let isSignUp = true;
const panels = {
    game: {
        url: "gp.vkprex.cloud",
        sidebar: ["Real-Time Console", "Mods Installer", "Plugin Installer", "Player Manager", "Config Editor", "Version Changer"],
        content: "<h1>Console Output</h1><div class='bg-black p-4 rounded text-green-400 font-mono text-sm mt-4'>[14:02:11 INFO]: Starting VKP.REX Minecraft Server...<br>[14:02:15 INFO]: Loaded 45 plugins.<br>[14:02:16 INFO]: Done! Type 'help' for info.</div>"
    },
    web: {
        url: "smartweb.vkprex.cloud",
        sidebar: ["Panel Overview", "File Manager", "Database Manager", "SSL & Security", "1-Click Installer", "DNS Zone Editor"],
        content: "<h1>cPanel Dashboard</h1><div class='grid grid-cols-2 gap-4 mt-6'><div class='glass p-4 rounded-xl'>SSL Status: <span class='text-green-500'>Active</span></div><div class='glass p-4 rounded-xl'>Disk Usage: 14%</div></div>"
    },
    vps: {
        url: "vps.vkprex.cloud",
        sidebar: ["Panel Overview", "OS Reinstallation", "SSH Keys & Access", "Real-time Monitoring", "Advanced Firewall", "Rescue Mode"],
        content: "<h1>VPS Management</h1><p class='text-gray-400'>Select OS to reinstall: Ubuntu 22.04 LTS, Debian 11, CentOS 9...</p>"
    },
    reseller: {
        url: "reseller.vkprex.cloud",
        sidebar: ["Dashboard Overview", "Home Panel", "Manage Clients", "Account Settings", "Activity Logs", "Panel Settings"],
        content: "<h1>Reseller Node</h1><p class='text-gray-400'>Managing 4 active client instances...</p>"
    }
};

function switchTab(type) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active-tab'));
    document.getElementById(`tab-${type}`).classList.add('active-tab');

    const data = panels[type];
    document.getElementById('urlBar').innerText = data.url;
    document.getElementById('panelView').innerHTML = data.content;

    // Build sidebar
    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = data.sidebar.map(item => `
        <div class="sidebar-item">
            <span>${item}</span>
            <i class="fa-solid fa-chevron-right text-[10px]"></i>
        </div>
    `).join('');
}

// Keep the previous Login/Signup functions, but update 'enterDashboard'
function enterDashboard(email) {
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('landingPage').classList.add('hidden');
    document.getElementById('userDisplay').innerText = email;
    switchTab('game'); // Default tab
}

// --- Rest of Login/Logout Logic remains the same ---
function toggleModal() { document.getElementById('loginModal').classList.toggle('hidden'); }
function toggleAuthMode() { isSignUp = !isSignUp; /* ... update text logic ... */ }

document.getElementById('authForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    if (isSignUp) {
        localStorage.setItem(`vkp_rex_user_${email}`, pass);
        alert("Account Created!");
        toggleAuthMode();
    } else {
        if (localStorage.getItem(`vkp_rex_user_${email}`) === pass) {
            localStorage.setItem('rex_session', 'active');
            localStorage.setItem('rex_user_email', email);
            enterDashboard(email);
        } else { alert("Wrong password!"); }
    }
});

function logout() { localStorage.clear(); location.reload(); }

window.onload = () => {
    const session = localStorage.getItem('rex_session');
    if (session === 'active') enterDashboard(localStorage.getItem('rex_user_email'));
};

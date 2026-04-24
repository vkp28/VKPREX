const panels = {
    game: { url: "gp.vkp-rex.cloud", img: "gaming-panel.png", sidebar: ["Terminal", "File System", "Instance Stats", "Automation"] },
    web: { url: "web.vkp-rex.cloud", img: "web-panel.png", sidebar: ["Deployment", "SSL Engine", "SQL Clusters", "CDN"] }
};

let isSignUp = false;

function openAuth() { document.getElementById('authModal').classList.remove('hidden'); }
function closeModal() { document.getElementById('authModal').classList.add('hidden'); }

function toggleAuthMode() {
    isSignUp = !isSignUp;
    document.getElementById('authTitle').innerText = isSignUp ? "Create Identity" : "Login";
    document.getElementById('authName').classList.toggle('hidden', !isSignUp);
}

document.getElementById('authForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('authName').value;
    const email = document.getElementById('authEmail').value;
    const pass = document.getElementById('authPass').value;

    if (isSignUp) {
        localStorage.setItem(email, JSON.stringify({ name, email, pass }));
        alert("Identity Logged. Please Sign In.");
        toggleAuthMode();
    } else {
        const user = JSON.parse(localStorage.getItem(email));
        if (user && user.pass === pass) {
            closeModal();
            document.getElementById('landingPage').classList.add('hidden');
            document.getElementById('dashboard').classList.remove('hidden');
            switchTab('game');
        } else {
            alert("Verification Failed.");
        }
    }
});

function switchTab(type) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active-tab'));
    document.getElementById(`tab-${type}`).classList.add('active-tab');
    const data = panels[type];
    document.getElementById('sidebar').innerHTML = data.sidebar.map(item => `
        <div class="sidebar-item">
            <span class="text-[11px] font-black uppercase tracking-widest">${item}</span>
            <div class="w-1.5 h-1.5 rounded-full bg-purple-500/20"></div>
        </div>`).join('');
    
    document.getElementById('panelView').innerHTML = `
        <div id="scrollContainer" class="h-full overflow-y-auto scroll-smooth">
            <div class="bg-[#0d0721] p-4 flex items-center gap-4 sticky top-0 z-50 border-b border-white/5">
                <div class="flex gap-1.5"><div class="w-2.5 h-2.5 rounded-full bg-red-500/50"></div><div class="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div><div class="w-2.5 h-2.5 rounded-full bg-green-500/50"></div></div>
                <div class="flex-1 bg-black/60 text-purple-400 text-[9px] py-2 rounded-lg text-center font-mono tracking-widest uppercase">${data.url}</div>
            </div>
            <img src="${data.img}" class="w-full" onerror="this.src='https://via.placeholder.com/1200x800/0a0518/8b5cf6?text=SYSTEM+BOOTING...'">
            <div id="mapReveal" class="p-20 opacity-0 translate-y-10 transition-all duration-1000 bg-[#06030e]">
                <h3 class="text-center text-4xl font-black mb-16 uppercase italic tracking-tighter">Network Backbone</h3>
                <div class="relative max-w-4xl mx-auto">
                    <img src="global-panel.png" class="w-full opacity-40 grayscale contrast-125 rounded-3xl border border-purple-500/10">
                    <div class="dot" style="top: 35%; left: 20%;"></div><div class="dot" style="top: 30%; left: 50%;"></div><div class="dot" style="top: 50%; left: 80%;"></div>
                </div>
            </div>
            <div class="h-40"></div>
        </div>
    `;

    const container = document.getElementById('scrollContainer');
    container.addEventListener('scroll', () => {
        const map = document.getElementById('mapReveal');
        if (container.scrollTop > 100 && map) map.classList.add('opacity-100', 'translate-y-0');
    });
}

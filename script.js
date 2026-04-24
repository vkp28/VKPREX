const panels = {
    game: { url: "gp.ateex.cloud", img: "gaming-panel.png", sidebar: ["Console", "Mods", "Players", "Files"] },
    web: { url: "smartweb.ateex.cloud", img: "web-panel.png", sidebar: ["cPanel", "File Manager", "SQL", "SSL"] },
    vps: { url: "vps.alarex.org", img: "vps-panel.png", sidebar: ["Overview", "OS Install", "SSH", "Firewall"] },
    reseller: { url: "panel.ateex.cloud", img: "reseller-panel.png", sidebar: ["Clients", "Home", "Settings", "Logs"] }
};

function toggleModal() { document.getElementById('loginModal').classList.toggle('hidden'); }

document.getElementById('authForm').addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('landingPage').classList.add('hidden');
    switchTab('game');
});

function switchTab(type) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active-tab'));
    document.getElementById(`tab-${type}`).classList.add('active-tab');
    
    const data = panels[type];
    document.getElementById('sidebar').innerHTML = data.sidebar.map(item => `
        <div class="sidebar-item"><span>${item}</span><i class="fas fa-chevron-right text-[10px]"></i></div>
    `).join('');

    document.getElementById('panelView').innerHTML = `
        <div id="scrollBox" class="flex flex-col h-full bg-[#0d0d0d] overflow-y-auto">
            <div class="bg-[#1a1a1a] p-3 flex items-center gap-4 border-b border-white/5 sticky top-0 z-50">
                <div class="flex gap-2 ml-2">
                    <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div class="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <div class="flex-1 bg-black/40 text-gray-500 text-[10px] py-1.5 rounded-md text-center font-mono border border-white/5">${data.url}</div>
                <div class="w-12"></div>
            </div>

            <div class="relative w-full">
                <img src="${data.img}" class="w-full object-cover object-top" onerror="this.src='https://via.placeholder.com/1200x600/111/333?text=Panel+Image+Missing'">
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0d0d0d] p-8">
                    <h3 class="text-2xl font-black uppercase text-white tracking-tighter">${data.sidebar[0]}</h3>
                </div>
            </div>

            <div id="mapReveal" class="map-container opacity-0 translate-y-10 transition-all duration-700">
                <div class="text-center mb-10">
                    <h2 class="text-3xl font-black uppercase text-white">GLOBAL PRESENCE, <span class="text-indigo-500">LOCAL PERFORMANCE</span></h2>
                    <p class="text-gray-500 text-sm mt-2">Ultra-low latency network nodes across the globe.</p>
                </div>
                <div class="relative w-full max-w-5xl mx-auto px-4">
                    <img src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=2000&auto=format&fit=crop" 
                         class="world-map rounded-3xl border border-white/5" alt="Network Map">
                    
                    <div class="dot" style="top: 35%; left: 20%;"></div> <div class="dot" style="top: 30%; left: 48%;"></div> <div class="dot" style="top: 45%; left: 75%;"></div> <div class="dot" style="top: 70%; left: 85%;"></div> <div class="dot" style="top: 65%; left: 25%;"></div> </div>
            </div>
            <div class="h-20"></div> </div>
    `;

    const scrollBox = document.getElementById('scrollBox');
    const mapReveal = document.getElementById('mapReveal');
    scrollBox.addEventListener('scroll', () => {
        if (scrollBox.scrollTop > 100) {
            mapReveal.classList.remove('opacity-0', 'translate-y-10');
            mapReveal.classList.add('opacity-100', 'translate-y-0');
        }
    });
}

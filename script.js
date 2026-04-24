const panels = {
    game: { url: "gp.ateex.cloud", img: "gaming-panel.png", sidebar: ["Console", "File Manager", "Schedules", "Users", "Backups"] },
    web: { url: "web.ateex.cloud", img: "web-panel.png", sidebar: ["Account Info", "MySQL", "SSL Certificates", "DNS"] }
};

// Function to switch from Landing Page to Dashboard
function login() {
    const landing = document.getElementById('landingPage');
    const dash = document.getElementById('dashboard');
    
    if (landing && dash) {
        landing.classList.add('hidden');
        dash.classList.remove('hidden');
        switchTab('game');
    }
}

function switchTab(type) {
    // Update Tab UI
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active-tab'));
    const activeBtn = document.getElementById(`tab-${type}`);
    if (activeBtn) activeBtn.classList.add('active-tab');

    const data = panels[type];
    
    // Update Sidebar
    document.getElementById('sidebar').innerHTML = data.sidebar.map(item => 
        `<div class="sidebar-item"><span>${item}</span><i class="fas fa-chevron-right text-[10px]"></i></div>`
    ).join('');

    // Update Main View
    document.getElementById('panelView').innerHTML = `
        <div id="scrollContainer" class="h-full overflow-y-auto bg-black scroll-smooth">
            <div class="bg-[#121212] p-3 flex items-center gap-4 sticky top-0 z-50 border-b border-white/5">
                <div class="flex gap-2 ml-2">
                    <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div class="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <div class="flex-1 bg-black/40 text-gray-500 text-[10px] py-1.5 rounded-md text-center font-mono border border-white/5">
                    ${data.url}
                </div>
                <div class="w-12"></div>
            </div>

            <div class="relative w-full">
                <img src="${data.img}" class="w-full opacity-90" onerror="this.src='https://via.placeholder.com/1200x800/111/333?text=Panel+Image+Missing'">
            </div>

            <div id="mapReveal" class="p-20 opacity-0 translate-y-10 transition-all duration-1000 border-t border-white/5">
                <h3 class="text-center text-3xl font-black mb-12 uppercase italic tracking-tighter">
                    GLOBAL PRESENCE, <span class="text-indigo-600">LOCAL PERFORMANCE</span>
                </h3>
                <div class="relative max-w-5xl mx-auto">
                    <img src="global-panel.png" class="w-full opacity-70 rounded-3xl shadow-2xl border border-white/5" alt="Network Map">
                    
                    <div class="dot" style="top: 38%; left: 19%;"></div>
                    <div class="dot" style="top: 35%; left: 48%;"></div>
                    <div class="dot" style="top: 48%; left: 78%;"></div>
                </div>
            </div>
            <div class="h-32"></div>
        </div>
    `;

    // Scroll Logic for Map Reveal
    const container = document.getElementById('scrollContainer');
    container.addEventListener('scroll', () => {
        const map = document.getElementById('mapReveal');
        if (container.scrollTop > 120 && map) {
            map.classList.add('opacity-100', 'translate-y-0');
        }
    });
}

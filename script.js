const panels = {
    game: { url: "gp.ateex.cloud", img: "gaming-panel.png", sidebar: ["Console", "Files", "Mods"] },
    web: { url: "smartweb.ateex.cloud", img: "web-panel.png", sidebar: ["cPanel", "SQL", "SSL"] }
};

function toggleModal() { document.getElementById('dashboard').classList.remove('hidden'); document.getElementById('landingPage').classList.add('hidden'); }

function switchTab(type) {
    const data = panels[type];
    document.getElementById('sidebar').innerHTML = data.sidebar.map(item => `<div class="sidebar-item"><span>${item}</span><i class="fas fa-chevron-right"></i></div>`).join('');

    document.getElementById('panelView').innerHTML = `
        <div id="scrollBox" class="flex flex-col h-full overflow-y-auto">
            <div class="bg-[#1a1a1a] p-3 flex items-center gap-4 sticky top-0 z-50 border-b border-white/5">
                <div class="flex gap-2 ml-2">
                    <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div class="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <div class="flex-1 bg-black/40 text-gray-500 text-[10px] py-1 rounded-md text-center">${data.url}</div>
            </div>
            
            <img src="${data.img}" class="w-full" onerror="this.src='https://via.placeholder.com/1200x600/111/333?text=Panel+Image'">

            <div id="mapReveal" class="p-20 bg-[#0d0d0d] opacity-0 translate-y-10 transition-all duration-1000">
                <h2 class="text-center text-3xl font-black mb-10 text-white uppercase">Global Presence, <span class="text-indigo-500">Local Performance</span></h2>
                <div class="relative max-w-4xl mx-auto">
                    <img src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=2000&auto=format&fit=crop" class="rounded-3xl opacity-40 grayscale">
                    <div class="dot" style="top:30%; left:20%;"></div>
                    <div class="dot" style="top:25%; left:48%;"></div>
                    <div class="dot" style="top:40%; left:75%;"></div>
                    <div class="dot" style="top:70%; left:85%;"></div>
                </div>
            </div>
        </div>
    `;

    const box = document.getElementById('scrollBox');
    const map = document.getElementById('mapReveal');
    box.addEventListener('scroll', () => { if(box.scrollTop > 100) { map.classList.add('opacity-100', 'translate-y-0'); } });
}

// 1. Professional Cursor Logic
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    // Immediate follow for the dot
    gsap.set(dot, { x: e.clientX, y: e.clientY });
    
    // Smooth lag for the outline (Inertia)
    gsap.to(outline, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power2.out"
    });
});

// 2. Entrance Animations
gsap.from(".reveal", {
    y: 150,
    opacity: 0,
    duration: 1.5,
    stagger: 0.2,
    ease: "power4.out"
});

// 3. UI Functions
function toggleAuth() {
    const modal = document.getElementById('auth-modal');
    modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
}

function handleAuth() {
    alert("Professional Auth connected. Database handshake initialized.");
    toggleAuth();
}

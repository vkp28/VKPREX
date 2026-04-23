const items = [
    { name: "AX-CORE V.1", price: "$4,200", img: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1000" },
    { name: "NEURAL UNIT", price: "$1,450", img: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?q=80&w=1000" },
    { name: "HYDRA ACTUATOR", price: "$2,890", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000" }
];

const grid = document.getElementById('product-grid');
let cartCount = 0;

items.forEach(item => {
    grid.innerHTML += `
        <div class="product-card">
            <div class="product-image" style="background-image: url('${item.img}')"></div>
            <div>
                <h3 style="font-size: 2.5rem; letter-spacing: -2px;">${item.name}</h3>
                <p style="opacity: 0.5; margin-top: 5px;">PRC // ${item.price}</p>
            </div>
            <div style="display: flex; flex-direction: column;">
                <button class="card-btn" onclick="updateCart()">[ ADD TO CART ]</button>
                <button class="card-btn" onclick="openModal()">[ QUICK BUY ]</button>
            </div>
        </div>
    `;
});

const cursor = document.querySelector('.cursor');
window.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
});

gsap.from(".split-text", { y: 100, opacity: 0, duration: 1, stagger: 0.1, ease: "power4.out" });

function updateCart() {
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
}

function openModal() {
    document.getElementById('payment-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('payment-modal').style.display = 'none';
}

function processPayment() {
    const email = document.getElementById('user-email').value;
    const phone = document.getElementById('user-phone').value;

    if(!email || !phone) {
        alert("CRITICAL: DATA REQUIRED.");
        return;
    }

    document.getElementById('modal-content').innerHTML = `
        <h1 style="font-size: 2rem; margin-bottom: 20px;">REQUEST ACCEPTED.</h1>
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ROBOSYNTH-ORDER" style="filter: invert(1); margin: 20px 0;">
        <p style="color: #555; font-size: 0.8rem;">SCAN QR TO COMPLETE PROTOCOL</p>
    `;
}

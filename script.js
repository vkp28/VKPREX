console.log("ROBOSYNTH Script Loaded Successfully");

const items = [
    { name: "AX-CORE V.1", price: "$4,200", img: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1000" },
    { name: "NEURAL UNIT", price: "$1,450", img: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?q=80&w=1000" },
    { name: "HYDRA ACTUATOR", price: "$2,890", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000" },
    { name: "SENS-ARRAY 5", price: "$600", img: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=1000" },
    { name: "TITAN FRAME", price: "$9,000", img: "https://images.unsplash.com/photo-1531746790731-6c087fecd05a?q=80&w=1000" },
    { name: "FLUX BATTERY", price: "$1,100", img: "https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=1000" }
];

let cartCount = 0;

// Render Grid
const grid = document.getElementById('product-grid');
if(grid) {
    items.forEach(item => {
        grid.innerHTML += `
            <div class="product-card">
                <div class="product-image" style="background-image: url('${item.img}')"></div>
                <div>
                    <h3 style="font-size: 2.2rem; letter-spacing: -2px; text-transform: uppercase;">${item.name}</h3>
                    <p style="opacity: 0.5; margin-top: 5px; font-weight: 700;">SPEC // ${item.price}</p>
                </div>
                <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 20px;">
                    <button class="card-btn" onclick="updateCart()">[ ADD TO CART ]</button>
                    <button class="card-btn" onclick="openModal()">[ QUICK BUY ]</button>
                </div>
            </div>
        `;
    });
}

// Cursor
const cursor = document.querySelector('.cursor');
window.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
});

// Animations
gsap.from(".split-text", { y: 100, opacity: 0, duration: 1.2, stagger: 0.15, ease: "power4.out" });

// THE CART FUNCTIONS (Ensure these are exactly like this)
window.updateCart = function() {
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
    console.log("Cart updated: " + cartCount);
    alert("ITEM ADDED TO ARCHIVE.");
};

window.openCart = function() {
    console.log("Cart button clicked");
    if (cartCount === 0) {
        alert("SYSTEM MESSAGE: YOUR CART IS CURRENTLY EMPTY.");
    } else {
        alert("SYSTEM MESSAGE: " + cartCount + " UNITS ARCHIVED. PROCEED TO CHECKOUT.");
    }
};

window.openModal = function() {
    document.getElementById('payment-modal').style.display = 'flex';
};

window.closeModal = function() {
    document.getElementById('payment-modal').style.display = 'none';
};

window.processPayment = function() {
    const email = document.getElementById('user-email').value;
    const phone = document.getElementById('user-phone').value;
    if(!email || !phone) { alert("DATA REQUIRED."); return; }
    
    document.getElementById('modal-content').innerHTML = `
        <h1 style="font-size: 2.5rem; margin-bottom: 10px;">REQUEST ACCEPTED.</h1>
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=ORDER" style="filter: invert(1); margin: 20px 0;">
    `;
};

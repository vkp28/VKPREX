// CHECK FOR EXISTING SESSION ON LOAD
window.onload = () => {
    if (localStorage.getItem('vkp_session') === 'active') {
        showDashboard();
    }
}

function openAuth() {
    document.getElementById('authModal').classList.remove('hidden');
}

// LOGIN LOGIC
document.getElementById('authForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // In a real app, you'd verify credentials here. For this demo, we authorize immediately.
    localStorage.setItem('vkp_session', 'active');
    showDashboard();
});

function showDashboard() {
    document.getElementById('landingPage').classList.add('hidden');
    document.getElementById('authModal').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
}

function logout() {
    localStorage.removeItem('vkp_session');
    location.reload();
}

// SEARCH FILTER
function filterServices() {
    let input = document.getElementById('gameSearch').value.toLowerCase();
    let cards = document.getElementsByClassName('plan-card');
    for (let card of cards) {
        let name = card.getAttribute('data-name');
        card.style.display = name.includes(input) ? "block" : "none";
    }
}

// CHECKOUT ENGINE
function openCheckout(name, price) {
    const tax = price * 0.18;
    const total = price + tax;
    
    document.getElementById('checkPlanName').innerText = name;
    document.getElementById('checkBase').innerText = "₹" + price;
    document.getElementById('checkTax').innerText = "₹" + tax.toFixed(2);
    document.getElementById('checkTotal').innerText = "₹" + total.toFixed(2);
    
    // Generate dynamic QR based on price
    document.getElementById('qrCode').src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=UPI://PAY/VKPREX?AM=${total}`;
    document.getElementById('finalAmount').innerText = "PAY ₹" + total.toFixed(2);
    
    document.getElementById('checkoutModal').classList.remove('hidden');
}

function closeCheckout() {
    document.getElementById('checkoutModal').classList.add('hidden');
}

function proceedToPay() {
    document.getElementById('checkoutModal').classList.add('hidden');
    document.getElementById('paymentModal').classList.remove('hidden');
}

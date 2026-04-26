let currentCurrency = 'INR';
let globalTotal = "";

// Currency Logic
const btn = document.getElementById('currencyBtn');
const menu = document.getElementById('currencyMenu');

if (btn) {
    btn.onclick = function(e) {
        e.stopPropagation();
        menu.classList.toggle('hidden');
    };
}

document.onclick = function() {
    if(menu) menu.classList.add('hidden');
};

function changeCurrency(label, rate, symbol) {
    currentCurrency = label;
    document.getElementById('currentText').innerText = label;
    document.getElementById('currentFlag').innerText = symbol;
    
    document.querySelectorAll('.price-display').forEach(p => {
        const base = parseFloat(p.getAttribute('data-base'));
        p.innerText = label === 'USD' ? symbol + (base * 0.012).toFixed(2) + "/mo" : symbol + base + "/mo";
    });
}

// Custom Cursor Logic
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    
    outline.animate({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`
    }, { duration: 500, fill: "forwards" });
});

// Checkout Logic
function openCheckout(name, priceINR) {
    let sym = currentCurrency === 'USD' ? "$" : "₹";
    let base = currentCurrency === 'USD' ? (priceINR * 0.012) : priceINR;
    let tax = base * 0.18;
    globalTotal = sym + (base + tax).toFixed(2);

    document.getElementById('checkPlanName').innerText = name;
    document.getElementById('checkBase').innerText = sym + base.toFixed(2);
    document.getElementById('checkTax').innerText = sym + tax.toFixed(2);
    document.getElementById('checkTotal').innerText = globalTotal;
    document.getElementById('checkoutModal').classList.remove('hidden');
}

function proceedToPay() {
    const nameInput = document.getElementById('custName').value;
    const phoneInput = document.getElementById('custPhone').value;

    if(!nameInput || !phoneInput) {
        alert("Please fill in your Name and Contact Number.");
        return;
    }

    document.getElementById('checkoutModal').classList.add('hidden');
    document.getElementById('finalPayAmount').innerText = globalTotal;
    document.getElementById('paymentModal').classList.remove('hidden');
}

function closeCheckout() { document.getElementById('checkoutModal').classList.add('hidden'); }
function openAuth() { document.getElementById('authModal').classList.remove('hidden'); }
function scrollToSolutions() { document.getElementById('solutions-grid').scrollIntoView({ behavior: 'smooth' }); }

document.getElementById('authForm').onsubmit = function(e) {
    e.preventDefault();
    document.getElementById('landingPage').style.display = 'none';
    document.getElementById('authModal').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    window.scrollTo(0,0);
};

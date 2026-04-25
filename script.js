let currentCurrency = 'INR';

// CURRENCY LOGIC
const btn = document.getElementById('currencyBtn');
const menu = document.getElementById('currencyMenu');

btn.onclick = function(e) {
    e.stopPropagation();
    menu.classList.toggle('hidden');
};

document.onclick = function() {
    menu.classList.add('hidden');
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

// CHECKOUT & PAYMENT FLOW
let globalTotal = "";

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
    document.getElementById('checkoutModal').classList.add('hidden');
    document.getElementById('finalPayAmount').innerText = globalTotal;
    document.getElementById('paymentModal').classList.remove('hidden');
}

function closeCheckout() { document.getElementById('checkoutModal').classList.add('hidden'); }

// NAV
function openAuth() { document.getElementById('authModal').classList.remove('hidden'); }
function scrollToSolutions() { document.getElementById('solutions-grid').scrollIntoView({ behavior: 'smooth' }); }

document.getElementById('authForm').onsubmit = function(e) {
    e.preventDefault();
    document.getElementById('landingPage').style.display = 'none';
    document.getElementById('authModal').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    window.scrollTo(0,0);
};

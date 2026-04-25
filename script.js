let currentCurrency = 'INR';
const exchangeRate = 83; // 1 USD = 83 INR

// CURRENCY LOGIC
function setCurrency(type) {
    currentCurrency = type;
    document.getElementById('currentText').innerText = type;
    document.getElementById('currentFlag').innerText = (type === 'USD') ? '$' : '₹';

    const prices = document.querySelectorAll('.price-display');
    prices.forEach(el => {
        const baseINR = parseFloat(el.getAttribute('data-base'));
        if (type === 'USD') {
            el.innerText = `$${(baseINR / exchangeRate).toFixed(2)}/mo`;
        } else {
            el.innerText = `₹${baseINR}/mo`;
        }
    });
}

// NAVIGATION & AUTH
function scrollToSolutions() { document.getElementById('solutions-grid').scrollIntoView({ behavior: 'smooth' }); }
function openAuth() { document.getElementById('authModal').classList.remove('hidden'); }

document.getElementById('authForm').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('payName').value = document.getElementById('authName').value;
    document.getElementById('landingPage').classList.add('hidden');
    document.getElementById('authModal').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    window.scrollTo(0, 0);
});

// STORE SEARCH
function filterServices() {
    let input = document.getElementById('gameSearch').value.toLowerCase();
    let cards = document.getElementsByClassName('plan-card');
    for (let card of cards) {
        card.style.display = card.getAttribute('data-name').includes(input) ? "block" : "none";
    }
}

// CHECKOUT LOGIC
function openCheckout(name, priceINR) {
    let sym = (currentCurrency === 'USD') ? "$" : "₹";
    let base = (currentCurrency === 'USD') ? (priceINR / exchangeRate) : priceINR;
    let tax = base * 0.18;
    
    document.getElementById('checkPlanName').innerText = name;
    document.getElementById('checkBase').innerText = sym + base.toFixed(2);
    document.getElementById('checkTax').innerText = sym + tax.toFixed(2);
    document.getElementById('checkTotal').innerText = sym + (base + tax).toFixed(2);
    document.getElementById('checkoutModal').classList.remove('hidden');
}

function closeCheckout() { document.getElementById('checkoutModal').classList.add('hidden'); }
function proceedToPay() { document.getElementById('checkoutModal').classList.add('hidden'); document.getElementById('paymentModal').classList.remove('hidden'); }

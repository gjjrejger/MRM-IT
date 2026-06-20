// ====================== MRM INVENTORY & ORDER MANAGEMENT SYSTEM ======================
// Final Script - Fully Updated & Clean

// ==================== UTILITY FUNCTIONS ====================

function getCurrentDate() {
    return new Date().toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function updateDates() {
    document.querySelectorAll('.current-date').forEach(el => {
        if (el) el.textContent = getCurrentDate();
    });
}

// ==================== NOTIFICATIONS ====================

function showNotification(message, type = "success") {
    const notif = document.createElement('div');
    notif.style.position = "fixed";
    notif.style.bottom = "20px";
    notif.style.right = "20px";
    notif.style.padding = "15px 20px";
    notif.style.borderRadius = "8px";
    notif.style.color = "white";
    notif.style.zIndex = "10000";
    notif.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
    notif.style.minWidth = "260px";

    notif.style.backgroundColor = type === "success" ? "#00a651" : "#e74c3c";
    notif.textContent = message;
    document.body.appendChild(notif);

    setTimeout(() => {
        notif.style.transition = "opacity 0.5s";
        notif.style.opacity = "0";
        setTimeout(() => notif.remove(), 500);
    }, 4000);
}

// ==================== AUTHENTICATION ====================

function loginUser(username, password) {
    if (username && password) {
        const user = {
            name: "Administrator",
            role: "Admin",
            loggedIn: true
        };
        localStorage.setItem('mrmUser', JSON.stringify(user));
        showNotification("Login Successful! Welcome to MRM System", "success");
        
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 800);
        return true;
    }
    showNotification("Please enter username and password", "error");
    return false;
}

function checkAuth() {
    const user = localStorage.getItem('mrmUser');
    if (!user && !window.location.pathname.includes('login.html')) {
        window.location.href = "login.html";
    }
}

function logout() {
    localStorage.removeItem('mrmUser');
    showNotification("Logged out successfully", "success");
    setTimeout(() => {
        window.location.href = "login.html";
    }, 1000);
}

// ==================== INVENTORY SEARCH ====================

function filterInventory() {
    const input = document.getElementById('inventory-search');
    if (!input) return;

    const filter = input.value.toLowerCase();
    const rows = document.querySelectorAll('#inventory-table tbody tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? '' : 'none';
    });
}

// ==================== QUICK ACTIONS ====================

function placeOrder() {
    showNotification("✅ Order request submitted successfully!", "success");
}

function addNewItem() {
    showNotification("✅ Add New Item form opened", "success");
}

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', function() {
    updateDates();
    checkAuth();

    // Login Form Handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            loginUser(username, password);
        });
    }

    // Highlight active sidebar link
    const currentPage = window.location.pathname.split("/").pop() || "dashboard.html";
    document.querySelectorAll('.sidebar nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    console.log("%c✅ MRM Inventory & Order Management System Loaded Successfully", 
                "color: #003087; font-weight: bold; font-size: 14px;");
});
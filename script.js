// ====================== MRM IT SYSTEM - GLOBAL SCRIPT ======================

// ==================== UTILITY FUNCTIONS ====================

// Get current date
function getCurrentDate() {
  return new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Update all date displays
function updateAllDates() {
  document.querySelectorAll('.current-date, #current-date').forEach(el => {
    if (el) el.textContent = getCurrentDate();
  });
}

// Fake User Authentication
let currentUser = null;

function loginUser(username, password) {
  if (username && password) {
    currentUser = {
      name: username.toLowerCase() === "admin" ? "Administrator" : "Production Manager",
      role: username.toLowerCase() === "admin" ? "Admin" : "Supervisor",
      lastLogin: new Date().toLocaleTimeString()
    };
    localStorage.setItem('mrmUser', JSON.stringify(currentUser));
    showNotification("Login Successful! Welcome to MRM System", "success");
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 800);
    return true;
  }
  showNotification("Invalid username or password", "error");
  return false;
}

function logout() {
  localStorage.removeItem('mrmUser');
  showNotification("Logged out successfully", "success");
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1000);
}

function checkAuth() {
  const user = localStorage.getItem('mrmUser');
  if (!user && !window.location.pathname.includes('login.html')) {
    window.location.href = "login.html";
  }
}

// ==================== NOTIFICATIONS ====================

function showNotification(message, type = "success") {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.style.position = "fixed";
  notification.style.bottom = "20px";
  notification.style.right = "20px";
  notification.style.padding = "15px 20px";
  notification.style.borderRadius = "8px";
  notification.style.color = "white";
  notification.style.zIndex = "10000";
  notification.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
  notification.style.minWidth = "280px";

  notification.style.backgroundColor = type === "success" ? "#00a651" : "#e74c3c";
  notification.innerHTML = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transition = "opacity 0.5s";
    notification.style.opacity = "0";
    setTimeout(() => notification.remove(), 500);
  }, 4000);
}

// ==================== PRODUCT VERIFICATION ====================

function verifyProduct() {
  const codeInput = document.getElementById('product-code');
  const resultDiv = document.getElementById('verification-result');
  
  if (!codeInput || !resultDiv) return;

  const code = codeInput.value.trim();

  if (!code) {
    resultDiv.innerHTML = `<p style="color:#e74c3c; font-weight:bold;">⚠️ Please enter a product code</p>`;
    return;
  }

  resultDiv.innerHTML = `<p class="verifying">🔍 Verifying on Blockchain...</p>`;

  setTimeout(() => {
    if (code.length >= 6) {
      resultDiv.innerHTML = `
        <div class="success-result">
          <h2>✅ AUTHENTIC PRODUCT</h2>
          <p><strong>Code:</strong> ${code}</p>
          <p><strong>Product:</strong> MRM Genuine Roofing Sheet</p>
          <p><strong>Batch No:</strong> MRM-${Math.floor(Math.random()*90000)+10000}</p>
          <p><strong>Manufactured:</strong> March 2026</p>
          <p><strong>Status:</strong> <span style="color:#00a651;">Verified on Blockchain</span></p>
        </div>
      `;

      // Add to recent verifications if table exists
      addToRecentVerifications(code);
    } else {
      resultDiv.innerHTML = `
        <div class="error-result">
          <h2>❌ VERIFICATION FAILED</h2>
          <p>This product code is invalid or counterfeit.</p>
          <p>Please contact MRM support immediately.</p>
        </div>
      `;
    }
  }, 1400);
}

// Add verified product to recent table
function addToRecentVerifications(code) {
  const tbody = document.querySelector('#verification-table tbody');
  if (!tbody) return;

  const row = document.createElement('tr');
  row.innerHTML = `
    <td><strong>${code}</strong></td>
    <td>MRM Roofing Sheet</td>
    <td><span class="status genuine">✅ Genuine</span></td>
    <td>Just now</td>
  `;
  tbody.insertBefore(row, tbody.firstChild);

  // Keep only 5 recent records
  if (tbody.children.length > 5) {
    tbody.removeChild(tbody.lastChild);
  }
}

// ==================== INVENTORY FILTER ====================

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

// ==================== DASHBOARD LIVE UPDATES ====================

function simulateLiveDashboard() {
  setInterval(() => {
    const efficiencyElements = document.querySelectorAll('.kpi-card h2');
    if (efficiencyElements.length > 0) {
      efficiencyElements.forEach(el => {
        if (el.textContent.includes('%')) {
          let value = parseInt(el.textContent);
          value = Math.min(98, value + Math.floor(Math.random() * 2));
          el.textContent = value + '%';
        }
      });
    }
  }, 10000);
}

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', function() {
  updateAllDates();
  checkAuth();
  simulateLiveDashboard();

  // Login Form
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
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

  console.log("%c✅ MRM IT System - JavaScript Loaded Successfully", "color: #003087; font-size: 14px; font-weight: bold");
});
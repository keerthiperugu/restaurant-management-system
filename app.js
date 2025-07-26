document.addEventListener("DOMContentLoaded", function () {
  // --- Search Icon 1 ---
  const searchicon1 = document.querySelector('#searchicon1');
  const search1 = document.querySelector('#searchinput1');
  if (searchicon1 && search1) {
    searchicon1.addEventListener('click', function () {
      search1.style.display = 'flex';
      searchicon1.style.display = 'none';
    });
  }

  // --- Search Icon 2 ---
  const searchicon2 = document.querySelector('#searchicon2');
  const search2 = document.querySelector('#searchinput2');
  if (searchicon2 && search2) {
    searchicon2.addEventListener('click', function () {
      search2.style.display = 'flex';
      searchicon2.style.display = 'none';
    });
  }

  // --- Hamburger menu toggle ---
  const bar = document.querySelector('.fa-bars');
  const cross = document.querySelector('#hdcross');
  const headerbar = document.querySelector('.headerbar');

  if (bar && cross && headerbar) {
    bar.addEventListener('click', function () {
      setTimeout(() => {
        cross.style.display = 'block';
      }, 200);
      headerbar.style.right = '0%';
    });

    cross.addEventListener('click', function () {
      cross.style.display = 'none';
      headerbar.style.right = '-100%';
    });
  }

  // --- Menu Ordering ---
  const menu = [
    { name: "Paneer Pakora", price: 120 },
    { name: "Samosa", price: 80 },
    { name: "Pani Puri", price: 60 },
    { name: "Chicken Noodles", price: 150 },
  ];

  const menuSelect = document.getElementById('menu-item');
  const qtyInput = document.getElementById('qty');
  const addOrderBtn = document.getElementById('addOrderBtn');
  const orderTableBody = document.querySelector('#orderTable tbody');
  const totalBillSpan = document.getElementById('totalBill');

  const order = [];

  // Populate menu options
  menu.forEach((item, idx) => {
    const opt = document.createElement('option');
    opt.value = idx;
    opt.textContent = `${item.name} - ₹${item.price}`;
    menuSelect.appendChild(opt);
  });

  if (addOrderBtn) {
    addOrderBtn.addEventListener('click', () => {
      const idx = parseInt(menuSelect.value);
      const qty = parseInt(qtyInput.value);

      if (!qty || qty < 1 || isNaN(idx)) return;

      const selected = menu[idx];
      const exist = order.find(o => o.name === selected.name);

      if (exist) {
        exist.qty += qty;
        exist.total = exist.qty * exist.price;
      } else {
        order.push({
          name: selected.name,
          price: selected.price,
          qty,
          total: qty * selected.price
        });
      }
      renderOrderTable();
    });
  }

  function renderOrderTable() {
    orderTableBody.innerHTML = '';
    let sum = 0;

    order.forEach(o => {
      sum += o.total;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${o.name}</td>
        <td>${o.qty}</td>
        <td>₹${o.price}</td>
        <td>₹${o.total}</td>
      `;
      orderTableBody.appendChild(tr);
    });

    if (totalBillSpan) {
      totalBillSpan.textContent = sum;
    }
  }

  // --- Login Modal ---
  const loginModal = document.getElementById('loginModal');
  window.onload = function () {
    if (loginModal) {
      loginModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  };

  window.login = function () {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (user === "keerthi" && pass === "1234") {
      enableSite();
    } else {
      alert("Invalid credentials. Try username: keerthi, password: 1234");
    }
  };

  function enableSite() {
    if (loginModal) {
      loginModal.style.display = "none";
    }
    document.body.style.overflow = "auto";
  }
});

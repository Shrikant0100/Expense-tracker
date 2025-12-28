const form = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalAmountEl = document.getElementById('total-amount');

const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const monthLabel = document.getElementById('month-label');

let currentMonth = new Date();

// Format: YYYY-MM (e.g., 2025-08)
function getMonthKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

let expenses = [];

function updateMonthLabel() {
  const options = { year: 'numeric', month: 'long' };
  monthLabel.textContent = currentMonth.toLocaleDateString(undefined, options);
}

function loadExpenses() {
  const key = `expenses-${getMonthKey(currentMonth)}`;
  const saved = localStorage.getItem(key);
  expenses = saved ? JSON.parse(saved) : [];
  renderExpenses();
}

function saveExpenses() {
  const key = `expenses-${getMonthKey(currentMonth)}`;
  localStorage.setItem(key, JSON.stringify(expenses));
}

function renderExpenses() {
  expenseList.innerHTML = '';
  let total = 0;

  expenses.forEach(({ date, name, amount }, index) => {
    const tr = document.createElement('tr');

    // Date input field for each record
    const dateTd = document.createElement('td');
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.value = date || new Date().toISOString().split('T')[0];
    dateInput.addEventListener('change', (e) => {
      expenses[index].date = e.target.value;
      saveExpenses();
    });
    dateTd.appendChild(dateInput);
    dateTd.setAttribute('data-label', 'Date');

    // Name
    const nameTd = document.createElement('td');
    nameTd.textContent = name;
    nameTd.setAttribute('data-label', 'Expense');

    // Amount
    const amountTd = document.createElement('td');
    amountTd.textContent = amount.toFixed(2);
    amountTd.setAttribute('data-label', 'Amount (₹)');
    amountTd.style.textAlign = 'right';

    // Delete button
    const deleteTd = document.createElement('td');
    deleteTd.setAttribute('data-label', 'Action');
    deleteTd.style.textAlign = 'center';

    const delBtn = document.createElement('button');
    delBtn.textContent = '🗑️';
    delBtn.className = 'delete-btn';
    delBtn.addEventListener('click', () => {
      const confirmed = window.confirm(
        `Are you sure you want to delete this expense?\n\n${name} - ₹${amount.toFixed(2)}`
      );
      if (!confirmed) return;
      expenses.splice(index, 1);
      saveExpenses();
      renderExpenses();
    });
    deleteTd.appendChild(delBtn);

    // Append all columns
    tr.appendChild(dateTd);
    tr.appendChild(nameTd);
    tr.appendChild(amountTd);
    tr.appendChild(deleteTd);

    expenseList.appendChild(tr);
    total += amount;
  });

  totalAmountEl.textContent = total.toFixed(2);
  totalAmountEl.style.textAlign = 'right';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nameInput = document.getElementById('expense-name');
  const amountInput = document.getElementById('expense-amount');

  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const today = new Date().toISOString().split('T')[0]; // default current date

  if (name && !isNaN(amount) && amount >= 0) {
    expenses.push({ date: today, name, amount });
    saveExpenses();
    renderExpenses();
    nameInput.value = '';
    amountInput.value = '';
    nameInput.focus();
  }
});

// Month navigation
prevMonthBtn.addEventListener('click', () => {
  currentMonth.setMonth(currentMonth.getMonth() - 1);
  updateMonthLabel();
  loadExpenses();
});

nextMonthBtn.addEventListener('click', () => {
  currentMonth.setMonth(currentMonth.getMonth() + 1);
  updateMonthLabel();
  loadExpenses();
});

// On page load
window.onload = () => {
  updateMonthLabel();
  loadExpenses();
  registerServiceWorker();
};

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('sw.js')
      .then(() => console.log('Service Worker Registered'))
      .catch((err) => console.error('Service Worker Failed:', err));
  }
}

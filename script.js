let total = 0;
const orderPrice = 40;
const hourly = 120;
const goal = 30000;

// загрузка данных
let shifts = JSON.parse(localStorage.getItem("shifts")) || [];
total = JSON.parse(localStorage.getItem("total")) || 0;

updateUI();

function addShift() {
  let orders = document.getElementById("orders").value;

  if (!orders) return;

  let income = (orders * orderPrice) + (7 * hourly);

  total += income;

  shifts.push({
    orders: orders,
    income: income
  });

  saveData();
  updateUI();

  document.getElementById("orders").value = "";
}

function updateUI() {
  document.getElementById("total").innerText = total;
  document.getElementById("left").innerText = goal - total;

  let list = document.getElementById("list");
  list.innerHTML = "<h2>Смены</h2>";

  shifts.forEach((s, i) => {
    let div = document.createElement("div");
    div.innerHTML = `🚴 Смена ${i + 1}: ${s.orders} заказов → ${s.income} ₽`;
    list.appendChild(div);
  });
}

function saveData() {
  localStorage.setItem("shifts", JSON.stringify(shifts));
  localStorage.setItem("total", JSON.stringify(total));
}

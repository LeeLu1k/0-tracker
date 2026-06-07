const orderPrice = 40;
const hourly = 120;
const goal = 30000;

let shifts = JSON.parse(localStorage.getItem("shifts")) || [];
let total = JSON.parse(localStorage.getItem("total")) || 0;

update();

function addShift() {
  let orders = document.getElementById("orders").value;
  if (!orders) return;

  let income = (orders * orderPrice) + (7 * hourly);

  total += income;

  shifts.push({
    orders: orders,
    income: income
  });

  save();
  update();

  document.getElementById("orders").value = "";
}

function update() {
  document.getElementById("total").innerText = total;
  document.getElementById("left").innerText = goal - total;

  let percent = (total / goal) * 100;
  if (percent > 100) percent = 100;

  document.getElementById("progress").style.width = percent + "%";

  let list = document.getElementById("list");
  list.innerHTML = "";

  shifts.forEach((s, i) => {
    let div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `🚴 Смена ${i + 1}: ${s.orders} заказов → ${s.income} ₽`;
    list.appendChild(div);
  });
}

function save() {
  localStorage.setItem("shifts", JSON.stringify(shifts));
  localStorage.setItem("total", JSON.stringify(total));
}

function resetData() {
  if (!confirm("Сбросить все данные?")) return;

  shifts = [];
  total = 0;

  save();
  update();
}

const hourRate = 120;
const orderRate = 40;
const goal = 30000;

let shifts = JSON.parse(localStorage.getItem("shifts")) || [];
let total = JSON.parse(localStorage.getItem("total")) || 0;

update();

function addShift() {
  let date = document.getElementById("date").value;
  let hours = +document.getElementById("hours").value;
  let orders = +document.getElementById("orders").value;

  if (!date || !hours || !orders) return;

  let income = (hours * hourRate) + (orders * orderRate);

  let shift = {
    date,
    hours,
    orders,
    income
  };

  shifts.push(shift);
  total += income;

  save();
  update();

  document.getElementById("date").value = "";
  document.getElementById("hours").value = "";
  document.getElementById("orders").value = "";
}

function update() {
  document.getElementById("total").innerText = total;
  document.getElementById("left").innerText = goal - total;

  let percent = (total / goal) * 100;
  if (percent > 100) percent = 100;

  document.getElementById("progress").style.width = percent + "%";

  let history = document.getElementById("history");
  history.innerHTML = "";

  shifts.slice().reverse().forEach(s => {
    let div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      📅 ${s.date}<br>
      ⏱ ${s.hours} часов | 🚴 ${s.orders} заказов<br>
      💰 +${s.income} ₽
    `;
    history.appendChild(div);
  });
}

function save() {
  localStorage.setItem("shifts", JSON.stringify(shifts));
  localStorage.setItem("total", JSON.stringify(total));
}

function resetAll() {
  if (!confirm("Удалить ВСЁ? Это нельзя вернуть")) return;

  localStorage.clear();
  shifts = [];
  total = 0;

  update();
}

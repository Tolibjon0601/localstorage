import { getData, getSingleData } from "./service.js";

let box = document.querySelector(".box");
let container = document.querySelector(".container");

const saveState = (key, data) => {
  const value = JSON.stringify(data);
  localStorage.setItem(key, value);
};

const getState = (key) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
};

const renderLocalData = () => {
  const data = getState("product");
  container.innerHTML = data.map(
    (item) => `
    <div class="item">
      <img width="200" src="${item.url}" alt="img" />
      <button data-id="${item.id}" class="delete">delete</button>
    </div>`
  ).join('');
};

const render = async () => {
  const data = await getData();
  box.innerHTML = data.map(
    (item) => `
    <div class="item">
      <img width="400" src="${item.url}" alt="img" />
      <h2>${item.title}</h2>
      <button data-id="${item.id}" class="add">add</button>
    </div>`
  ).join('');
};

render();

box.addEventListener("click", async (e) => {
  if (e.target.classList.contains("add")) {
    const data = await getSingleData(e.target.dataset.id);
    const oldData = getState("product");
    const el = oldData.find((item) => item.id == e.target.dataset.id);
    if (!el) {
      saveState("product", [...oldData, data]);
      renderLocalData();
    }
  }
});

container.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const id = e.target.dataset.id;
    let data = getState("product");
    data = data.filter((item) => item.id != id);
    saveState("product", data);
    renderLocalData();
  }
});

renderLocalData();

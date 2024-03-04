// @ts-ignore
const table = document.getElementById("table");
// @ts-ignore
const modal = document.getElementById("modal");
// @ts-ignore
const inputs = document.querySelectorAll("input");
// @ts-ignore
let count = 0;

window.addEventListener("click", (e) => {
  // @ts-ignore
  if (e.target.matches(".btn-warning")) {
    // @ts-ignore
    let data = e.target.parentElement.parentElement.children;
    fillData(data);
    modal.classList.toggle("translate");
  }

  // @ts-ignore
  if (e.target.matches(".btn-danger")) {
  modal.classList.toggle("translate");
  count=0
  }
});

// @ts-ignore
const fillData = (data) => {
  for (let index of inputs) {
    index.value = data[count].textContent;
    console.log(index);
    count += 1;
  }
};
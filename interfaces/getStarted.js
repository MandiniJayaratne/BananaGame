function createBanana() {
  const banana = document.createElement("div");
  banana.textContent = "🍌";
  banana.classList.add("banana");

  banana.style.left = Math.random() * window.innerWidth + "px";

  document.body.appendChild(banana);

  banana.addEventListener("animationend", () => {
    banana.remove();
  });
}

function bananaShower() {
  const interval = setInterval(createBanana, 200);

  setTimeout(() => clearInterval(interval), 5000);
}

window.onload = bananaShower;

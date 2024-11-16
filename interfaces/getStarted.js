function createBanana() {
  const banana = document.createElement("div");
  banana.textContent = "🍌";
  banana.classList.add("banana");

  // Randomize initial position
  banana.style.left = Math.random() * window.innerWidth + "px";

  // Append to the body
  document.body.appendChild(banana);

  // Remove the banana after animation ends
  banana.addEventListener("animationend", () => {
    banana.remove();
  });
}

// Generate bananas continuously for a few seconds
function bananaShower() {
  const interval = setInterval(createBanana, 200); // every200

  // Stop the shower after 5 seconds
  setTimeout(() => clearInterval(interval), 5000);
}

// Trigger the banana shower on page load
window.onload = bananaShower;

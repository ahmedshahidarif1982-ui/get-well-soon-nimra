const messages = {
  bandage: "🩹 Magic bandage applied! +1000 imaginary healing powers activated! ✨💗",
  teddy: "🧸 Teddy delivery complete! One giant virtual hug for Nimra! 🤗💗",
  candy: "🍭 Sweetness delivered! One candy and absolutely no permission to be sad today 😤💕",
  chocolate: "🍫 Chocolate has entered the chat. This is officially a better day now. 😌💗"
};

const itemMessage = document.getElementById("itemMessage");
const modal = document.getElementById("surpriseModal");
const surpriseBtn = document.getElementById("surpriseBtn");
const closeModalBtn = document.getElementById("closeModal");
const okayBtn = document.getElementById("okayBtn");

document.querySelectorAll(".care-card").forEach(card => {
  card.addEventListener("click", () => {
    const type = card.dataset.item;
    itemMessage.textContent = messages[type];

    itemMessage.animate(
      [
        { transform: "scale(.95)", opacity: .2 },
        { transform: "scale(1.03)", opacity: 1 },
        { transform: "scale(1)", opacity: 1 }
      ],
      { duration: 400, easing: "ease-out" }
    );

    burst();
  });
});

function openSurprise() {
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  burst(12);
}

function closeSurprise() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

surpriseBtn.addEventListener("click", openSurprise);
closeModalBtn.addEventListener("click", closeSurprise);
okayBtn.addEventListener("click", closeSurprise);

modal.addEventListener("click", (event) => {
  if (event.target === modal) closeSurprise();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeSurprise();
});

let score = 0;
let gameTimer = null;

const gameArea = document.getElementById("heartGame");
const scoreEl = document.getElementById("score");
const startGameBtn = document.getElementById("startGameBtn");

function startGame() {
  clearInterval(gameTimer);
  score = 0;
  scoreEl.textContent = score;
  gameArea.innerHTML = "";

  startGameBtn.textContent = "Game running... catch them! 💗";
  startGameBtn.disabled = true;
  startGameBtn.style.opacity = ".75";

  gameTimer = setInterval(() => {
    spawnHeart();
  }, 650);

  // Give the player a few seconds of fun, but let the game finish naturally.
  setTimeout(() => {
    if (gameTimer) {
      clearInterval(gameTimer);
      gameTimer = null;
      startGameBtn.disabled = false;
      startGameBtn.style.opacity = "1";
      startGameBtn.textContent = "Play again 💕";

      if (score < 10) {
        const note = document.createElement("div");
        note.className = "game-placeholder";
        note.innerHTML = `You collected ${score} happy heart${score === 1 ? "" : "s"}! 💗<br>Try again?`;
        gameArea.appendChild(note);
      }
    }
  }, 12000);
}

function spawnHeart() {
  const heart = document.createElement("button");
  heart.className = "game-heart";
  heart.type = "button";
  heart.textContent = ["💗", "💕", "💖", "💓", "🌸"][Math.floor(Math.random() * 5)];

  heart.style.left = Math.random() * 88 + "%";
  heart.style.top = "-10px";

  heart.addEventListener("click", () => {
    score++;
    scoreEl.textContent = score;
    heart.remove();
    burst(5);

    if (score >= 10) {
      clearInterval(gameTimer);
      gameTimer = null;
      startGameBtn.disabled = false;
      startGameBtn.style.opacity = "1";
      startGameBtn.textContent = "Play again 💕";

      setTimeout(() => {
        alert(
          "🎉 YOU DID IT! 🎉\n\n" +
          "Nimra collected 10 happy hearts!\n\n" +
          "May Allah grant her complete shifa. Ameen 🤲🏻💗"
        );
        burst(18);
      }, 120);
    }
  });

  gameArea.appendChild(heart);
  setTimeout(() => heart.remove(), 3500);
}

startGameBtn.addEventListener("click", startGame);

function burst(count = 7) {
  const layer = document.getElementById("confetti");
  const icons = ["💗", "✨", "🌸", "💕", "🦋"];

  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.className = "confetti";
    el.textContent = icons[Math.floor(Math.random() * icons.length)];
    el.style.setProperty("--x", `${(Math.random() - .5) * 280}px`);
    el.style.setProperty("--y", `${-80 - Math.random() * 230}px`);
    layer.appendChild(el);

    el.addEventListener("animationend", () => el.remove());
  }
}

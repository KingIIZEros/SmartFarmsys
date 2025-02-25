document.addEventListener("DOMContentLoaded", function () {
  const menu = document.getElementById("menu");
  const menuButton = document.getElementById("checkbox2");
  createExamplePlant();
  menuButton.addEventListener("click", () => {
    if (menu.classList.contains("hidden")) {
      menu.classList.remove("hidden");
      menu.style.animation = "circleExpand 1s forwards";
      menuButton.disabled = true;
      setTimeout(() => {
        menuButton.disabled = false;
      }, 500); // Delay to ensure the expand animation completes
    } else {
      menu.style.animation = "circleCollapse 1s forwards";
      menuButton.disabled = true;
      setTimeout(() => {
        menu.classList.add("hidden");
        menuButton.disabled = false;
      }, 1000); // Delay to ensure the collapse animation completes
    }
  });
});

function createExamplePlant() {
  const menu = document.getElementById("menu");
  menu.className = "menu hidden";
  menu.innerHTML = `
    <div class="input">
      <button class="value">Public profile</button>
      <button class="value">Account</button>
      <button class="value">Appearance</button>
      <button class="value">Accessibility</button>
      <button class="value">Notifications</button>
    </div>`;
}

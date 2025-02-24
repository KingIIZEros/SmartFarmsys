document.addEventListener("DOMContentLoaded", function () {
  const headElement = document.getElementById("Head");
  const navbarElement = document.getElementById("navbar");
  const descriptionElement = document.getElementById("description");
  const bgElement = document.getElementById("bg");
  setTimeout(() => {
    headElement.classList.add("visible");
    setTimeout(() => {
      headElement.classList.add("move-to-top");
      setTimeout(() => {
        navbarElement.classList.remove("hidden");
        bgElement.classList.remove("h-screen");
        bgElement.classList.add("bg-img-short");
      }, 2000); // Delay to ensure the move-to-top animation completes
    }, 1500); // Delay to ensure the fade-in effect completes
  }, 100); // Delay to ensure the transition effect
});

function createExamplePlant() {
  const plant = document.getElementById("Plant");
  plant.className =
    "grid grid-cols-1 md:grid-cols-3 justify-items-center bottom-10 w-full h-7/12 md:h-1/4 p-8 fadeIn";
  plant.innerHTML = `<div class="bg-amber-50 img-corn bg-cover bg-center rounded-xl h-96 w-3/4 slide-up"></div>
          <div
            class="bg-amber-50 img-rice bg-cover bg-center rounded-xl h-96 w-3/4 slide-up"
          ></div>
          <div
            class="bg-amber-50 img-plant1 bg-cover bg-center rounded-xl h-96 w-3/4 slide-up"
          ></div>`;
}

let area = [];

async function fetchData() {
  console.log("Fetching data from:", "http://localhost:3000/smtf/areafarm");
  try {
    const response = await fetch("http://localhost:3000/smtf/areafarm");
    if (!response.ok)
      throw new Error("Network response was not ok " + response.statusText);

    const data = await response.json();
    area = data.area;
    console.log("Data fetched successfully:", area);

    document.getElementById("loading").classList.add("hidden");
    document.getElementById("management").classList.remove("hidden");
    document.getElementById("navbar").classList.remove("hidden");

    renderArea();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchData);
document
  .getElementById("searchInput")
  .addEventListener("input", debounce(searchArea, 300));

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

async function searchArea() {
  const search = document.getElementById("searchInput").value.trim();
  let url = "http://localhost:3000/smtf/areafarm";
  if (search) url += `?search=${encodeURIComponent(search)}`;

  console.log("Fetching data from:", url);

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Search Results:", data);
    area = data.area;
    renderArea();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function formatNumber(value) {
  return isNaN(value) ? "0" : parseFloat(value).toFixed(2);
}

function renderArea() {
  const grid = document.getElementById("AreaGrid");
  grid.innerHTML = "";
  if (!area || area.length === 0) {
    grid.innerHTML =
      '<div class="col-span-full text-center text-gray-500">No area available</div>';
    return;
  }

  area.forEach((a) => {
    const card = createArea(a);
    grid.appendChild(card);
  });
}

function createArea(a) {
  const card = document.createElement("div");
  card.href = "#";
  card.className = "bg-white rounded-lg shadow-md cursor-pointer";

  const areaId = a.id_Dashbord || "Unknown Area";
  const areaZone = a.Plantation_area || "Unknown Area";
  const areaPest = formatNumber(a.Pest_pressure);
  const areaSoil = a.Soil_type || "Unknown Area";
  const areaRain = formatNumber(a.Rainfall);
  const areaSize = formatNumber(a.size);
  const areaUrban = formatNumber(a.Urban_area_proximity);
  const areaCrop = formatNumber(a.Crop_density);

  card.innerHTML = `
      <div id="${areaId}" class="p-4 rounded-lg">
        <h2 class="text-sm sm:text-lg xl:text-xl font-semibold mb-2">${areaZone} (ID: ${areaId})</h2>
        <div class="flex flex-wrap bg-white p-2 gap-2">
          <div class="bg-green-300 border border-gray-200 rounded-lg text-[12px] sm:text-sm"><span class="mx-2">Size: ${areaSize} m²</span></div>
          <div class="bg-green-300 border border-gray-200 rounded-lg text-[12px] sm:text-sm"><span class="mx-2">Soil type: ${areaSoil}</span></div>
          <div class="bg-green-300 border border-gray-200 rounded-lg text-[12px] sm:text-sm"><span class="mx-2">Rainfall: ${areaRain} mm</span></div>
          <div class="bg-green-300 border border-gray-200 rounded-lg text-[12px] sm:text-sm"><span class="mx-2">Crop density: ${areaCrop} plants/m²</span></div>
          <div class="bg-green-300 border border-gray-200 rounded-lg text-[12px] sm:text-sm"><span class="mx-2">Pest pressure: ${areaPest}</span></div>
        </div>
      </div>`;

  card.addEventListener("click", (event) => {
    event.preventDefault();
    openUpdateModal(a);
  });

  return card;
}

async function updateArea(farmData) {
  try {
    const response = await fetch(
      `http://localhost:3000/smtf/areafarm/${farmData.id_Dashbord}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(farmData),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Update Result:", data);
    alert("✅ ข้อมูลฟาร์มถูกอัปเดตเรียบร้อยแล้ว!");
    location.reload();
  } catch (error) {
    console.error("❌ Error updating area:", error);
    alert("❌ เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
  }
}

function openUpdateModal(a) {
  const updateForm = document.getElementById("updateForm");
  updateForm.id_Dashbord.value = a.id_Dashbord;
  updateForm.Rainfall.value = a.Rainfall;
  updateForm.Urban_area_proximity.value = a.Urban_area_proximity;
  updateForm.size.value = a.size;
  updateForm.Pest_pressure.value = a.Pest_pressure;
  updateForm.Crop_density.value = a.Crop_density;
  modalUpdate.style.display = "flex";
}

const modalUpdate = document.getElementById("updateModal");
const closeModalUpdate = document.getElementById("closeModalUpdate");
const updateForm = document.getElementById("updateForm");

// ปิด Modal
closeModalUpdate.addEventListener("click", () => {
  modalUpdate.style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target === modalUpdate) {
    modalUpdate.style.display = "none";
  }
});

// ส่งฟอร์มสำหรับอัปเดตข้อมูล
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const confirmUpdate = confirm(
    "คุณยืนยันที่จะอัปเดตข้อมูลใช่ไหม!!\nกด OK เพื่อยืนยัน"
  );
  if (!confirmUpdate) return;

  const formData = new FormData(updateForm);
  let updatedFarm = {};

  formData.forEach((value, key) => {
    updatedFarm[key] = isNaN(value) ? value : parseFloat(value);
  });

  if (!updatedFarm.id_Dashbord) {
    alert("❌ กรุณาระบุ ID ของพื้นที่ที่ต้องการอัปเดต");
    return;
  }

  updateArea(updatedFarm);
  console.log("📌 ข้อมูลฟาร์มที่อัปเดต:", updatedFarm);

  modalUpdate.style.display = "none";
  updateForm.reset();
});

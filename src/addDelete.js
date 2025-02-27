// Add new area
async function addNewArea(newFarm) {
  try {
    const response = await fetch("http://localhost:3000/smtf/areafarm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFarm),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Insert Result:", data);
    alert("✅ ข้อมูลพื้นที่ถูกบันทึกเรียบร้อยแล้ว!");
    location.reload();
  } catch (error) {
    console.error("❌ Error adding area:", error);
    alert("❌ เกิดข้อผิดพลาดในการบันทึกข้อมูล");
  }
}

// add modal
const modal = document.getElementById("addModal");
const openModalBtn = document.getElementById("addData");
const closeModalBtn = document.getElementById("closeModalBtn");
const addForm = document.getElementById("addForm");

// เปิด
openModalBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

// ปิด
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const confirmSave = confirm(
    "คุณยืนยันที่จะเพิ่มข้อมูลใช่ไหม!!\nกด OK เพื่อยืนยัน"
  );
  if (!confirmSave) return;

  const formData = new FormData(addForm);
  const newFarm = {};

  formData.forEach((value, key) => {
    newFarm[key] = isNaN(value) ? value : parseFloat(value);
  });

  addNewArea(newFarm);
  console.log("📌 ข้อมูลฟาร์มที่บันทึก:", newFarm);
  modal.style.display = "none";

  addForm.reset();
});

// delete area
async function deleteArea(id_Dashbord) {
  try {
    const response = await fetch(
      `http://localhost:3000/smtf/areafarm/${id_Dashbord}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Delete Result:", data);
    alert("✅ ข้อมูลพื้นที่ถูกลบเรียบร้อยแล้ว!");
    location.reload();
  } catch (error) {
    console.error("❌ Error deleting area:", error);
    alert("❌ เกิดข้อผิดพลาดในการลบข้อมูล");
  }
}

// delete Modal
const modaldelete = document.getElementById("deleteModal");
const openModaldelete = document.getElementById("deleteData");
const closeModaldelete = document.getElementById("closeModaldelete");
const deleteForm = document.getElementById("deleteForm");

// เปิด Modal
openModaldelete.addEventListener("click", () => {
  modaldelete.style.display = "flex";
});

// ปิด Modal
closeModaldelete.addEventListener("click", () => {
  modaldelete.style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target === modaldelete) {
    modaldelete.style.display = "none";
  }
});

// ลบข้อมูล
deleteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const confirmDelete = confirm(
    "คุณยืนยันที่จะลบข้อมูลใช่ไหม!!\nกด OK เพื่อยืนยัน"
  );
  if (!confirmDelete) return;

  const formData = new FormData(deleteForm);
  let deleteFarm = {}; // แก้จาก const เป็น let

  formData.forEach((value, key) => {
    deleteFarm[key] = isNaN(value) ? value : parseFloat(value);
  });

  if (!deleteFarm.id_Dashbord) {
    alert("❌ กรุณาระบุ ID ของพื้นที่ที่ต้องการลบ");
    return;
  }

  deleteArea(deleteFarm.id_Dashbord);
  console.log("📌 ข้อมูลฟาร์มที่ลบ:", deleteFarm);

  modaldelete.style.display = "none";
  deleteForm.reset();
});


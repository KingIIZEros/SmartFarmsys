const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/areafarm", (req, res) => {
    const search = req.query.search;
    let sql = `
            SELECT farm.id_Dashbord, farm.Rainfall, farm.Urban_area_proximity, 
                   farm.size, farm.Pest_pressure, farm.Crop_density, 
                   area.Plantation_area, area.Soil_type 
            FROM farm 
            LEFT JOIN area ON farm.id_area = area.id_area
        `;

    let params = [];

    if (search) {
      sql += " WHERE farm.id_Dashbord LIKE ?";
      params.push(`${search}%`);
    }

    db.query(sql, params, (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res
          .status(500)
          .json({ success: false, message: "Database query error" });
      }
      res.json({ success: true, area: results });
    });
  });

  router.post("/areafarm", (req, res) => {
    const {
      Rainfall,
      Urban_area_proximity,
      size,
      Pest_pressure,
      Crop_density,
      id_area,
    } = req.body;

    const sql = `
    INSERT INTO farm (Rainfall, Urban_area_proximity, size, Pest_pressure, Crop_density, id_area)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

    db.query(
      sql,
      [
        Rainfall,
        Urban_area_proximity,
        size,
        Pest_pressure,
        Crop_density,
        id_area,
      ],
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res
            .status(500)
            .json({ success: false, message: "Database insert error" });
        }
        res.json({
          success: true,
          message: "New farm data inserted",
          insertedId: result.insertId,
        });
      }
    );
  });

  router.delete("/areafarm/:id_Dashbord", (req, res) => {
    const { id_Dashbord } = req.params;

    const sql = "DELETE FROM farm WHERE id_Dashbord = ?";

    db.query(sql, [id_Dashbord], (err, result) => {
      if (err) {
        console.error("เกิดข้อผิดพลาดในการลบข้อมูล:", err);
        return res
          .status(500)
          .json({ message: "ลบข้อมูลไม่สำเร็จ", error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "ไม่พบข้อมูลที่ต้องการลบ" });
      }
      res.json({ message: "ลบข้อมูลสำเร็จ", deletedId: id_Dashbord });
    });
  });

  router.put("/areafarm/:id_Dashbord", (req, res) => {
    const { id_Dashbord } = req.params;
    const {
      Rainfall,
      Urban_area_proximity,
      size,
      Pest_pressure,
      Crop_density,
    } = req.body;

    if (
      !id_Dashbord ||
      !Rainfall ||
      !Urban_area_proximity ||
      !size ||
      !Pest_pressure ||
      !Crop_density
    ) {
      return res.status(400).json({ message: "❌ ข้อมูลไม่ครบถ้วน" });
    }

    const sql = `UPDATE farm 
                 SET Rainfall = ?, Urban_area_proximity = ?, size = ?, Pest_pressure = ?, Crop_density = ?
                 WHERE id_Dashbord = ?`;

    const values = [
      Rainfall,
      Urban_area_proximity,
      size,
      Pest_pressure,
      Crop_density,
      id_Dashbord,
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("❌ เกิดข้อผิดพลาดในการอัปเดตข้อมูล:", err);
        return res
          .status(500)
          .json({ message: "❌ อัปเดตข้อมูลไม่สำเร็จ", error: err });
      }
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "❌ ไม่พบข้อมูลที่ต้องการอัปเดต" });
      }
      res.json({ message: "✅ อัปเดตข้อมูลสำเร็จ", updatedId: id_Dashbord });
    });
  });

  return router;
};

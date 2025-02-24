const express = require("express");

const router = express.Router();

// Define your routes
router.get("/", (req, res) => {
  res.send("Welcome to the Veterinary Clinic!");
});

// Export a function that accepts the db connection
module.exports = (db) => {
  router.get("/regions", (req, res) => {
    db.query("SELECT * FROM regions", (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error querying the database");
        return;
      }
      res.json({ success: true, doctors: results });
    });
  });
  return router; // Return the router instance
};

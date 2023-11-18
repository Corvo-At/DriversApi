const { Router } = require("express");
const router = Router();
const { driverData } = require("../controllers/getAllDrivers");
const { driverDetail } = require("../handlers/detailDriver");
const { driverDetailByName } = require("../handlers/nameDriver");

router.get("/drivers", driverData);
router.get("/drivers/:id", driverDetail);
router.get("/drivers/name", driverDetailByName);

module.exports = router;

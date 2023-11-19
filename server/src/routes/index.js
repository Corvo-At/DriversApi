const { Router } = require("express");
const { getAllDriversHandler } = require("../handlers/getAllDriverHandler");
const { driverDetail } = require("../handlers/detailDriver");
const { driverDetailByName } = require("../handlers/nameDriver");
const { createTeamHandler,} = require ("../handlers/createDbTeamHandler")
const { getAllTeamsHandlerDb,} = require ("../handlers/createDbTeamHandler")
const createDriverHandler= require("../handlers/createDriverHandler");
const router = Router();

router.get("/drivers", getAllDriversHandler);
router.get("/drivers/detail/:id", driverDetail);
router.get("/drivers/name", driverDetailByName);
router.get("/drivers/teams",getAllTeamsHandlerDb);
router.post("/drivers/all",createTeamHandler);
router.post("/drivers/create", createDriverHandler);



module.exports = router;


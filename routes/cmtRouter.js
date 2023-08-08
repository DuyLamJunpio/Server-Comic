var express = require("express");
var router = express.Router();
var nyContrl = require("../controllers/CmtController");

router.get("/listCmt/:id", nyContrl.getCmt);
router.post("/addCmt", nyContrl.addCmt);
router.put("/editCmt/:id",nyContrl.authToken, nyContrl.editCmt);
router.delete("/deleteCmt/:id",nyContrl.authToken, nyContrl.deleteSp);

module.exports = router;

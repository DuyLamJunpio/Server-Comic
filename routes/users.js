var express = require("express");
var router = express.Router();
var userCtl = require("../controllers/UserController");
router.post("/login", userCtl.userLogin);
router.get("/detailUser/:id", userCtl.getDetailUser);
router.get("/list", userCtl.authToken, userCtl.getListUser);

module.exports = router;

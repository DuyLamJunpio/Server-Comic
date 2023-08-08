var express = require("express");
var router = express.Router();
var nyContrl = require("../controllers/ComicController");

router.get("/listComic", nyContrl.getListComic);
router.get("/detailComic/:id", nyContrl.getDetailComic);
router.get("/getChapter/:id", nyContrl.getChapter);
router.post("/addComic", nyContrl.addComicWithChapterAndImages);
router.put("/editComic/:id", nyContrl.editSp);
router.delete("/deleteComic/:id", nyContrl.deleteSp);

module.exports = router;

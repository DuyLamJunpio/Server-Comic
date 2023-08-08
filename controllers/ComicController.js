const myMD = require("../model/spModel");
var objReturn = {
  status: 1,
  msg: "OK",
};
exports.getListComic = async (req, res, next) => {
  let listComic = [];
  try {
    console.log("getList");
    listComic = await myMD.comicModel.find().sort({ _id: -1 });
    objReturn.data = listComic;
  } catch (error) {
    objReturn.status = 0;
    objReturn.msg = error.message;
  }
  res.json(objReturn);
};

exports.getDetailComic = async (req, res, next) => {
  let cm = [];
  try {
    cm = await myMD.comicModel.findById(req.params.id);
    objReturn.data = cm;
  } catch (error) {
    objReturn.status = 0;
    objReturn.msg = error.message;
  }
  res.json(objReturn);
};

exports.getChapter = async (req, res, next) => {
  let cm = {};
  try {
    cm = await myMD.chapterModel.findById(req.params.id);
    objReturn.data = cm;
  } catch (error) {
    objReturn.status = 0;
    objReturn.msg = error.message;
  }
  res.json(objReturn);
};

// exports.getListCat = async (req, res, next) => {
//   let listCat = [];
//   try {
//     listCat = await myMD.catModel.find();
//     objReturn.data = listCat;
//   } catch (error) {
//     objReturn.status = 0;
//     objReturn.msg = error.message;
//   }
//   res.json(objReturn);
// };

exports.addComicWithChapterAndImages = async (req, res, next) => {
  const { title, author, avatar, content, date, chapters } = req.body;

  try {
    // Tạo một truyện mới
    const newComic = new myMD.comicModel({
      title: title,
      author: author,
      avatar: avatar,
      content: content,
      date: date,
      chapters: []
    });

    // Lưu truyện mới vào cơ sở dữ liệu
    const savedComic = await newComic.save();

    // Thêm các chương và ảnh vào truyện
    for (const chapterData of chapters) {
      const newChapter = new myMD.chapterModel({
        number: chapterData.number,
        images: []
      });

      for (const imageUrl of chapterData.images) {
        newChapter.images.push(imageUrl);
      }

      // Lưu chương mới vào cơ sở dữ liệu
      const savedChapter = await newChapter.save();

      // Thêm chương vào truyện
      savedComic.chapters.push(savedChapter._id);
    }

    // Lưu truyện sau khi đã thêm các chương và ảnh
    await savedComic.save();

    res.json({
      status: 1,
      msg: 'Thêm truyện mới cùng với các chương và ảnh thành công'
    });
  } catch (error) {
    console.error(error);
    res.json({
      status: 0,
      msg: 'Có lỗi xảy ra khi thêm truyện mới cùng với các chương và ảnh'
    });
  }
};



exports.editSp = async (req, res, next) => {
  delete objReturn.data;
  const { name, img, content, price, idCat } = req.body;
  let obj = new myMD.spModel();
  obj._id = req.params.id;
  obj.name = name;
  obj.img = img;
  obj.content = content;
  obj.price = price;
  obj.idCat = idCat;
  try {
    objReturn.data = undefined;
    await myMD.spModel.findByIdAndUpdate(req.params.id, { $set: obj });
  } catch (error) {
    objReturn.status = 0;
    objReturn.msg = error.message;
  }
  res.json(objReturn);
};

exports.deleteSp = async (req, res, next) => {
  try {
    objReturn.data = undefined;
    await myMD.comicModel.deleteOne({ _id: req.params.id });
  } catch (error) {
    objReturn.status = 0;
    objReturn.msg = error.message;
  }
  res.json(objReturn);
};

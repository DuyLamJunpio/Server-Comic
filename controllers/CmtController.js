const myMD = require("../model/spModel");
var jwt = require("jsonwebtoken");
var dotenv = require("dotenv");
dotenv.config();

var objReturn = {
  status: 1,
  msg: "OK",
};

exports.getCmt = async (req, res, next) => {
  try {
    const comicId = req.params.id;

    const comments = await myMD.commentModel.find({ comic: comicId }).sort({ _id: -1 });

    objReturn.status = 1;
    objReturn.data = comments;
  } catch (error) {
    objReturn.status = 0;
    objReturn.msg = error.message;
  }

  res.json(objReturn);
};


exports.addCmt = async (req, res, next) => {
  const { text, user, comic, time } = req.body;

  try {
    const newComment = new myMD.commentModel({
      text: text,
      user: user,
      comic: comic,
      time: time
    });

    await newComment.save();

    objReturn.status = 1;
    objReturn.data = newComment;
  } catch (error) {
    objReturn.status = 0;
    objReturn.msg = error.message;
  }

  res.json(objReturn);
};


exports.editCmt = async (req, res, next) => {
  delete objReturn.data;
  const { text, user, comic, time } = req.body;
  let obj = new myMD.commentModel();
  obj._id = req.params.id;
  obj.text = text;
  obj.user = user;
  obj.comic = comic;
  obj.time = time;
  try {
    objReturn.data = undefined;
    await myMD.commentModel.findByIdAndUpdate(req.params.id, { $set: obj });
  } catch (error) {
    objReturn.status = 0;
    objReturn.msg = error.message;
  }
  res.json(objReturn);
};

exports.deleteSp = async (req, res, next) => {
  try {
    objReturn.data = undefined;
    await myMD.commentModel.deleteOne({ _id: req.params.id });
  } catch (error) {
    objReturn.status = 0;
    objReturn.msg = error.message;
  }
  res.json(objReturn);
};

exports.authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  if (!token) res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    console.log("err ", err);
    console.log("data ", data);
    if (err) res.sendStatus(403);
    if (data) next();
  });
};



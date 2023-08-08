const myMD = require("../model/spModel");
var jwt = require("jsonwebtoken");
var dotenv = require("dotenv");
dotenv.config();

exports.getDetailUser = async (req, res, next) => {
  let objReturn = {
    status: 1,
    msg: "OK",
  };
  let cm = {};
  try {
    cm = await myMD.userModel.findById(req.params.id);
    objReturn.data = cm;
  } catch (error) {
    objReturn.status = 0;
    objReturn.msg = error.message;
  }
  res.json(objReturn);
};

exports.userLogin = async (req, res, next) => {
  let objReturn = {
    status: 1,
    msg: "OK",
  };
  try {
    let objU = await myMD.userModel.findOne({ username: req.body.username });
    if (objU != null) {
      if (req.body.password == objU.password) {
        let user = {
          username: objU.username,
          password: objU.password,
        };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "31536000s",
        });
        objReturn.data = { accessToken , objU};
      } else {
        objReturn.msg = "sai pass";
      }
    } else {
      objReturn.msg = "ko tồn tại";
    }
  } catch (error) {
    objReturn.status = 0;
    objReturn.msg = error.message;
  }
  res.json(objReturn);
};

exports.getListUser = async (req, res, next) => {
  let objReturn = {
    status: 1,
    msg: "OK",
  };
  let listUser = [];
  try {
    listUser = await myMD.userModel.find();
    objReturn.data = listUser;
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

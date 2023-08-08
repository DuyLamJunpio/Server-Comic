var db = require("./db");

const chapterSchema = new db.mongoose.Schema({
  number: { type: Number, required: true },
  images: [{ type: String, required: true }],
}, { collection: "Chapters" });

const comicSchema = new db.mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  avatar: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String, required: true },
  chapters: [{ type: db.mongoose.Schema.Types.ObjectId, ref: 'Chapters' }],
}, { collection: "Comics" });

const userSchema = new db.mongoose.Schema(
  {
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    img: { type: String, required: false },
  },
  { collection: "Users" }
);

const commentSchema = new db.mongoose.Schema({
  text: { type: String, required: true },
  user: { type: db.mongoose.Schema.Types.ObjectId, ref: 'Users' },
  comic: { type: db.mongoose.Schema.Types.ObjectId, ref: 'Comics' },
  time: { type: String, required: true }
}, { collection: "Comments" });


const userModel = db.mongoose.model('Users', userSchema);
const commentModel = db.mongoose.model('Comments', commentSchema);
let comicModel = db.mongoose.model("comicModel", comicSchema);
let chapterModel = db.mongoose.model("chapterModel", chapterSchema);
module.exports = { userModel, commentModel, chapterModel, comicModel };

const mongoose = require("mongoose");
const forumSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 10, maxlength: 100 },
  doc: { type: Date },
  forumbody: { type: String, required: true, minlength: 50, maxlength: 500 },
  author: { type: String, required: true, minlength: 5, maxlength: 50 },
});
module.exports = mongoose.model("Forum", forumSchema);

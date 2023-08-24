const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  text: String,
  // You can add more fields like user, timestamp, etc. as needed
});
const imageSchema = mongoose.Schema({
  filename: String,
  title: String,
  caption: String,
  comments: [commentSchema], // Array of comments for each image
});

const albumSchema = new mongoose.Schema({
  albumTitle: String,
  images: [imageSchema], // Array of images with comments
});
const Image = mongoose.model("Image", imageSchema);

module.exports = { Image };
module.exports = mongoose.model("Album", albumSchema);

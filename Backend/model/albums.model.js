const mongoose = require('mongoose');


const imageSchema = mongoose.Schema({
  filename: String,
  title: String,
  caption: String,
  comments:[]
  // album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' } // Reference to the Album model
});

const albumSchema =  mongoose.Schema({
  albumTitle: String,
  images: [imageSchema] // Reference to the Image model
});

const Image = mongoose.model("images", imageSchema);
const Album = mongoose.model("albums", albumSchema);

module.exports = { Image, Album };

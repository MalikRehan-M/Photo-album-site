// routes/albumRoutes.js
const express = require("express");
const albumRouter = express.Router();
const {Album} = require("../model/albums.model");



albumRouter.get("/", async (req, res) => {
  try {
    const albums = await Album.find();
    res.json(albums);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch albums" });
  }
});

albumRouter.post("/add-comment/:albumId/:imageIndex", async (req, res) => {
  try {
    const { albumId, imageIndex } = req.params;
    const { comment } = req.body;

    const album = await Album.findById(albumId);

    if (!album) {
      return res.status(404).json({ error: "Album not found" });
    }
    // console.log(imageIndex)

    const image = album.images[imageIndex];

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    image.comments.push(comment);
    await album.save();

    res.json(album);
  } catch (error) {
    res.status(500).json({ error: "Unable to add comment" });
  }
});
albumRouter.post("/add-imagetoalbum/:albumId", async (req, res) => {
  try {
    const { albumId } = req.params;
    const  image  = req.body;
    console.log(req.body)
    const album = await Album.findById(albumId);

    if (!album) {
      return res.status(404).json({ error: "Album not found" });
    }
    album.images.push(image)
  
    await album.save();

    res.json(album);
  } catch (error) {
    res.status(500).json({ error: "Unable to add comment" });
  }
});


albumRouter.post("/add", async (req, res) => {
    try {
      const { albumTitle ,images} = req.body;
  
      const album = new Album({ albumTitle,images});
      await album.save();
  
      res.json(album);
    } catch (error) {
      res.status(500).json({ error: "Unable to create album" });
    }
  });
  
  module.exports = {albumRouter};

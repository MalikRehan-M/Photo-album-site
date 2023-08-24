// routes/albumRoutes.js
const express = require("express");
const albumRouter = express.Router();
const Album = require("../model/albums.model");

// Add a comment to an image within an album
albumRouter.post("/:albumId/images/:imageId/comments", async (req, res) => {
  try {
    const { albumId, imageId } = req.params;
    const { text } = req.body;

    const album = await Album.findById(albumId);

    if (!album) {
      return res.status(404).json({ error: "Album not found" });
    }

    const image = album.images.id(imageId);

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    image.comments.push({ text });
    await album.save();

    res.json(image.comments);
  } catch (error) {
    res.status(500).json({ error: "Unable to add comment" });
  }
});

// Get comments for a specific image within an album
albumRouter.get("/:albumId/images/:imageId/comments", async (req, res) => {
  try {
    const { albumId, imageId } = req.params;

    const album = await Album.findById(albumId);

    if (!album) {
      return res.status(404).json({ error: "Album not found" });
    }

    const image = album.images.id(imageId);

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.json(image.comments);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch comments" });
  }
});

// Add more routes as needed, e.g., for updating and deleting comments
albumRouter.post("/", async (req, res) => {
    try {
      const { albumTitle } = req.body;
  
      const album = new Album({ albumTitle });
      await album.save();
  
      res.json(album);
    } catch (error) {
      res.status(500).json({ error: "Unable to create album" });
    }
  });
  
  // Update an existing album's title
  albumRouter.put("/:albumId", async (req, res) => {
    try {
      const { albumId } = req.params;
      const { albumTitle } = req.body;
  
      const album = await Album.findByIdAndUpdate(albumId, { albumTitle }, { new: true });
  
      if (!album) {
        return res.status(404).json({ error: "Album not found" });
      }
  
      res.json(album);
    } catch (error) {
      res.status(500).json({ error: "Unable to update album" });
    }
  });
  
  // Delete an album
  albumRouter.delete("/:albumId", async (req, res) => {
    try {
      const { albumId } = req.params;
  
      const album = await Album.findByIdAndRemove(albumId);
  
      if (!album) {
        return res.status(404).json({ error: "Album not found" });
      }
  
      res.json({ message: "Album deleted" });
    } catch (error) {
      res.status(500).json({ error: "Unable to delete album" });
    }
  });
  albumRouter.post("/:albumId/images", async (req, res) => {
    try {
      const { albumId } = req.params;
      const { filename, title, caption } = req.body;
  
      const album = await Album.findById(albumId);
  
      if (!album) {
        return res.status(404).json({ error: "Album not found" });
      }
  
      const newImage = { filename, title, caption };
      album.images.push(newImage);
      await album.save();
  
      res.json(newImage);
    } catch (error) {
      res.status(500).json({ error: "Unable to add image" });
    }
  });
  
  // Update an existing image within an album
  albumRouter.put("/:albumId/images/:imageId", async (req, res) => {
    try {
      const { albumId, imageId } = req.params;
      const { filename, title, caption } = req.body;
  
      const album = await Album.findById(albumId);
  
      if (!album) {
        return res.status(404).json({ error: "Album not found" });
      }
  
      const image = album.images.id(imageId);
  
      if (!image) {
        return res.status(404).json({ error: "Image not found" });
      }
  
      image.set({ filename, title, caption });
      await album.save();
  
      res.json(image);
    } catch (error) {
      res.status(500).json({ error: "Unable to update image" });
    }
  });
  
  module.exports = {albumRouter};

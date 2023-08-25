const express = require("express");
const imageRouter = express.Router();
const {Image }= require("../model/albums.model");
const mongoose = require("mongoose");

// Add a new image
imageRouter.post("/add", async (req, res) => {
  try {
    const { filename, title, caption } = req.body;

    const image = new Image({ filename, title, caption,comments:[] });
    await image.save();

    res.json(image);
  } catch (error) {
    res.status(500).json({ error: "Unable to add image" });
  }
});

// Get all images
imageRouter.get("/", async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch images" });
  }
});

// Get a specific image by ID
imageRouter.get("/:imageId", async (req, res) => {
  const { imageId } = req.params;

  try {
    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.json(image);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch image" });
  }
});

// Update an existing image
imageRouter.put("/:imageId", async (req, res) => {
  const { imageId } = req.params;
  const { filename, title, caption } = req.body;

  try {
    const image = await Image.findByIdAndUpdate(
      imageId,
      { filename, title, caption },
      { new: true }
    );

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.json(image);
  } catch (error) {
    res.status(500).json({ error: "Unable to update image" });
  }
});

// Delete an image by ID
imageRouter.delete("/:imageId", async (req, res) => {
  const { imageId } = req.params;

  try {
    const image = await Image.findByIdAndRemove(imageId);

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.json({ message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete image" });
  }
});

module.exports = {imageRouter};

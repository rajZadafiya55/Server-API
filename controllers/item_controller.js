const ITEM = require("../models/itemModel");
const cloudinary = require("cloudinary").v2;
const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();

app.use(fileUpload());

cloudinary.config({
  cloud_name: "dsrk7genk",
  api_key: "812371659762263",
  api_secret: "E3YB8OudKtOrjyQFYDIsPRIFelw",
});

exports.item = {
  get: async (req, res) => {
    try {
      const item = await ITEM.find({});
      if (item.length > 0) {
        return res.status(200).json({
          isSuccess: true,
          message: "All items data",
          data: item,
        });
      } else {
        return res.ststus(400).json({
          message: "items are not found !",
        });
      }
    } catch (error) {
      return res.json({ data: error, message: "Request failed !" });
    }
  },
  getById: async (req, res) => {
    const id = req.params.id;
    try {
      const item = await ITEM.findById({ _id: id });
      if (item) {
        return res.status(200).json({
          isSuccess: true,
          message: "Item find Successfully.",
          data: item,
        });
      } else {
        return res.status(400).json({
          isSuccess: false,
          message: "Item not found!!",
          data: item,
        });
      }
    } catch (error) {
      return res.json({ data: error, message: "Request failed !" });
    }
  },
  add: async (req, res) => {
    try {
      console.log("name", req.file.path);
      const file = req.file.path;
      cloudinary.uploader.upload(file, async (err, result) => {
        console.log("result", result);
        if (err) {
          console.error("Upload Error:", err.url);
          return res
            .status(500)
            .json({ isSuccess: false, message: "Image upload failed!" });
        }
        try {
          const { name, price, category } = req.body;
          if (!(name && price && category)) {
            return res
              .status(400)
              .json({ isSuccess: false, message: "All input is required." });
          }
          const itemObj = {
            name: name,
            price: price,
            category: category,
            imagename: result.secure_url,
          };
          const item = await ITEM.create(itemObj);
          return res.status(200).json({
            isSuccess: true,
            message: "Item created successfully",
            data: item,
          });
        } catch (error) {
          console.error("Database Error:", error);
          return res.status(500).json({
            isSuccess: false,
            message: "Database error while creating item!",
          });
        }
      });
    } catch (error) {
      console.error("Server Error:", error);
      return res.status(500).json({ data: error, message: "Request failed!" });
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;
    try {
      if (!id) {
        return res.json({
          message: "Id not found",
          isSuccess: false,
        });
      } else {
        const item = await ITEM.findByIdAndDelete({ _id: id });
        if (item) {
          return res.json({
            message: "Item Deleted !",
            isSuccess: true,
          });
        } else {
          return res.json({
            message: `cannot delete data with id=${id}. `,
            isSuccess: false,
          });
        }
      }
    } catch (error) {
      return res.json({ data: error, message: "Request failed !" });
    }
  },
  edit: async (req, res) => {
    try {
      let { name, price, category } = req.body;
      const itemid = req.params.id;
      if (req.file) {
        const file = req.file.path;

        cloudinary.uploader.upload(file, async (err, result) => {
          if (err) {
            console.error("Upload Error:", err.url);
            return res.status(500).json({ isSuccess: false, message: "Image upload failed!" });
          }
          let updatedItem = await ITEM.findByIdAndUpdate(
            { _id: itemid },
            {
              $set: {
                name: name,
                category: category,
                price: price,
                imagename: result.secure_url,
              },
            },
            { new: true }
          );

          if (!updatedItem) {
            return res.status(404).json({
              message: "Item not found",
            });
          }

          return res.status(200).json({
            isSuccess: true,
            message: "Item updated successfully",
            data: updatedItem,
          });
        });
      } else {
        let updatedItem = await ITEM.findByIdAndUpdate(
          { _id: itemid },
          {
            $set: {
              name: name,
              category: category,
              price: price,
            },
          },
          { new: true }
        );

        if (!updatedItem) {
          return res.status(404).json({
            message: "Item not found",
          });
        }

        return res.status(200).json({
          isSuccess: true,
          message: "Item updated successfully",
          data: updatedItem,
        });
      }
    } catch (error) {
      return res.json({ data: error, message: "Request failed !" });
    }
  },
};

const express = require("express");
const router = express.Router();
const db = require("../data/userModel");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const users = await db.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "We could not get the users right now" });
    }
  })
  .post(async (req, res) => {
    const { name, imageUrl, email } = req.body;
    if (!name || !imageUrl || !email)
      return res.status(400).json({
        error: "Your new user must have a name and imageUrl and email"
      });
    try {
      const newUserId = await db.addUser(req.body);
      const newUser = await db.findBy({ id: newUserId[0] });
      res.status(201).json(newUser);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Sorry we couldn't add a user at this time" });
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const user = await db.findBy({ id: req.params.id }).first();
      res.status(200).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Sorry we couldn't get that user right now" });
    }
  })
  .delete(async (req, res) => {
    try {
      const deleted = await db.deleteUser({ id: req.params.id });
      if (deleted === 0)
        return res
          .status(404)
          .json({ error: "There is no project at that id to delete" });
      const users = await db.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "We couldn't delete a project right now" });
    }
  })
  .put(async (req, res) => {
    const { name, imageSource, email } = req.body;
    if (!name || !imageSource || !email)
      return res.status(400).json({
        error: "Your new user must have a name and imageSource and email"
      });
    try {
      const updated = await db.updateUser({ id: req.params.id }, req.body);
      if (updated === 0) {
        return res
          .status(404)
          .json({ error: "There is no project at that id to update" });
      }
      const user = await db.findBy({ id: req.params.id }).first();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "We couldn't update a user right now" });
    }
  });

module.exports = router;

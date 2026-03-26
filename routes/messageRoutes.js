const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// Send Message
router.post("/messages", async (req, res) => {
  try {

    const { username, sender, text } = req.body;

    const message = new Message({
      username,
      sender,
      text
    });

    await message.save();

    res.json(message);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get Messages
router.get("/messages", async (req, res) => {

  try {

    const messages = await Message.find().sort({ createdAt: 1 });

    res.json(messages);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});

module.exports = router;

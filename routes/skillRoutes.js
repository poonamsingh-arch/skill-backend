const express = require("express");
const router = express.Router();
const Skill = require("../models/Skill");
const auth = require("../middleware/auth");

// MATCH FIRST
router.get("/match/:skillName", async (req, res) => {
  const learners = await Skill.find({ name: req.params.skillName, type: "learn" });
  const teachers = await Skill.find({ name: req.params.skillName, type: "teach" });

  res.json({ learners, teachers });
});

// CREATE
router.post("/", auth, async (req, res) => {
  const skill = new Skill({
    ...req.body,
    userId: req.user.id
  });

  await skill.save();
  res.json(skill);
});

// READ
router.get("/", async (req, res) => {
  const skills = await Skill.find();
  res.json(skills);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
  name: String,
  type: String,
  userId: String
});

module.exports = mongoose.model("Skill", SkillSchema);
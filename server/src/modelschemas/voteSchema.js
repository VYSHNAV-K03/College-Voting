const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  candidateId: { type: String, required: true },
});

module.exports = mongoose.model("Vote", voteSchema);

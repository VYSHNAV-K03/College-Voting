const express = require("express");
const voteSchema = require("../modelschemas/voteSchema");
const router = express.Router();

// Route to check if student has already voted
router.post("/check-status", async (req, res) => {
  const { studentId } = req.body;
  try {
    const vote = await voteSchema.findOne({ studentId });
    if (vote) return res.json({ voted: true });
    res.json({ voted: false });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Route to cast vote
router.post("/cast", async (req, res) => {
  const { studentId, candidateId } = req.body;
  console.log({ studentId, candidateId});
  
  try {
    const existingVote = await voteSchema.findOne({ studentId });
    console.log(existingVote);
    
    if (existingVote) {
      return res.status(400).json({ message: "You have already voted!" });
    }

    const newVote = new voteSchema({ studentId, candidateId });
    await newVote.save();

    res.status(200).json({ message: "Vote cast successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

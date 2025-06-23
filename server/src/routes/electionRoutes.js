const express = require("express");
const router = express.Router();
const Election = require("../modelschemas/electionSchema");
const Authenticate = require("../middleware/authenticate");

// Middleware to auto-update election status
const updateElectionStatus = async () => {
  try {
    const now = new Date();
    console.log("Updating elections at:", now);

    const endedResult = await Election.updateMany(
      { endDate: { $lte: now }, status: { $ne: "ended" } },
      { $set: { status: "ended" } }
    );
    console.log("Elections set to ended:", endedResult.modifiedCount);

    const ongoingResult = await Election.updateMany(
      { startDate: { $lte: now }, endDate: { $gt: now }, status: { $ne: "ongoing" } },
      { $set: { status: "ongoing" } }
    );
    console.log("Elections set to ongoing:", ongoingResult.modifiedCount);
  } catch (error) {
    console.error("Error updating election status:", error);
  }
};

// Create Election
router.post("/create", Authenticate, async (req, res) => {
  try {
    const { title, startDate, endDate } = req.body;
    if (!title || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const election = new Election({ title, startDate, endDate });
    await election.save();
    res.status(201).json({ message: "Election created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get All Elections (Auto-updates status before returning)
router.get("/all", async (req, res) => {
  try {
    await updateElectionStatus(); // Auto-update election statuses
    const elections = await Election.find();
    console.log(elections.reverse());
    
    res.json(elections);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Start or End Election Manually
router.put("/update/:id", Authenticate, async (req, res) => {
  try {
    const { status } = req.body;
    if (!["upcoming", "ongoing", "ended"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    await Election.findByIdAndUpdate(req.params.id, { status });
    res.json({ message: "Election status updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

const mongoose = require("mongoose");

const electionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ["upcoming", "ongoing", "ended"], default: "upcoming" }
});

// Auto-update election status before fetching
// electionSchema.pre("find", function (next) {
//   const now = new Date();
//   this.updateMany({ endDate: { $lte: now }, status: { $ne: "ended" } }, { status: "ended" });
//   this.updateMany({ startDate: { $lte: now }, endDate: { $gt: now }, status: { $ne: "ongoing" } }, { status: "ongoing" });
//   next();
// });


module.exports = mongoose.model("Election", electionSchema);

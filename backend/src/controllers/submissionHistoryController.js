import mongoose from 'mongoose';
import Submission from '../models/Submission.js';

export const getUserSubmission = async (req, res) => {
  try {
    console.log("Received userId:", req.user.userId);

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.user.userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const userId = new mongoose.Types.ObjectId(req.user.userId);

    const submissions = await Submission.find({ user: userId })
      .populate('problem', 'title')
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json(submissions);
  } catch (err) {
    console.error("❌ Error fetching submissions:", err);
    res.status(500).json({ error: err.message });
  }
};

import User from '../models/User.js';

// GET /api/leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    const topUsers = await User.aggregate([
      {
        $project: {
          username: 1,
          email: 1,
          solvedCount: { $size: "$solvedProblems" }
        }
      },
      { $sort: { solvedCount: -1 } },
      { $limit: 10 }
    ]);

    res.status(200).json(topUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

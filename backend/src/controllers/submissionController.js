import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Problem from '../models/Problem.js';
import Submission from '../models/Submission.js';

// Needed because we use ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Judge logic
export const submitSolution = async (req, res) => {
  try {
    const { problemId, code, language } = req.body;
    const userId = req.user.userId;

    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ message: 'Problem not found' });

    let verdict = 'Accepted';
    let actualOutput = '';
    const expectedOutput = problem.testCases.map(tc => tc.expectedOutput).join('\n');

    // Write the code to a file
    const filename = `submission-${Date.now()}.${language === 'python' ? 'py' : 'js'}`;
    const filepath = path.join(__dirname, '..', 'temp', filename);
    fs.writeFileSync(filepath, code);

    // Run code
    const inputStr = problem.testCases.map(tc => tc.input).join('\n');

    const runCommand = language === 'python'
  ? `python ${filepath}` // 
  : `node ${filepath}`;

    exec(runCommand, { input: inputStr, timeout: 5000 }, async (error, stdout, stderr) => {
      if (error || stderr) {
        verdict = 'Error';
        actualOutput = stderr || error.message;
      } else {
        actualOutput = stdout.trim();
        if (actualOutput !== expectedOutput.trim()) {
          verdict = 'Wrong Answer';
        }
      }

      // Save submission
      const submission = new Submission({
        user: userId,
        problem: problemId,
        code,
        language,
        verdict,
        output: actualOutput,
        expectedOutput
      });

      await submission.save();
      if (verdict === 'Accepted') {
        await User.findByIdAndUpdate(userId, {
          $addToSet: { solvedProblems: problemId }
        });
      }
      fs.unlinkSync(filepath); // cleanup temp file

      res.status(200).json({
        verdict,
        output: actualOutput,
        expectedOutput
      });
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

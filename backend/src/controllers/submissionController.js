import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Problem from '../models/Problem.js';
import Submission from '../models/Submission.js';
import User from '../models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const submitSolution = async (req, res) => {
  try {
    const { problemId, code, language } = req.body;
    const userId = req.user.userId;

    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    const filename = `submission-${Date.now()}.${language === 'python' ? 'py' : 'js'}`;
    const filepath = path.join(__dirname, '..', 'temp', filename);
    fs.writeFileSync(filepath, code);

    const expectedOutputs = [];
    const actualOutputs = [];
    let verdict = 'Accepted';

    for (const testCase of problem.testCases) {
      const runCommand = language === 'python' ? 'python' : 'node';
      const child = spawn(runCommand, [filepath]);

      let output = '';
      let errorOutput = '';

      child.stdout.on('data', data => {
        output += data.toString();
      });

      child.stderr.on('data', data => {
        errorOutput += data.toString();
      });

      // Write test case input
      child.stdin.write(testCase.input);
      child.stdin.end();

      const exitCode = await new Promise(resolve => {
        child.on('close', code => resolve(code));
      });

      const normalizedActual = output.replace(/\r\n/g, '\n').trim();
      const normalizedExpected = testCase.expectedOutput.replace(/\r\n/g, '\n').trim();

      expectedOutputs.push(normalizedExpected);
      actualOutputs.push(normalizedActual);

      if (exitCode !== 0 || errorOutput || normalizedActual !== normalizedExpected) {
        verdict = 'Wrong Answer';
        break; // stop on first failure (or remove this to run all test cases regardless)
      }
    }

    // Save submission
    const submission = new Submission({
      user: userId,
      problem: problemId,
      code,
      language,
      verdict,
      output: actualOutputs.join('\n'),
      expectedOutput: expectedOutputs.join('\n')
    });

    await submission.save();
    fs.unlinkSync(filepath);

    if (verdict === 'Accepted') {
      await User.findByIdAndUpdate(userId, {
        $addToSet: { solvedProblems: problemId }
      });
    }

    res.status(200).json({
      verdict,
      output: actualOutputs.join('\n'),
      expectedOutput: expectedOutputs.join('\n')
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

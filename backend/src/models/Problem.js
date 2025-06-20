import mongoose from 'mongoose';

const testCaseSchema = new mongoose.Schema({
  input: String,
  expectedOutput: String
});

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Easy'
  },
  tags: [String],
  testCases: [testCaseSchema]
});

const Problem = mongoose.model('Problem', problemSchema);
export default Problem;

import mongoose from "mongoose"


const submissionSchema = new mongoose.Schema({
  
     user: {
       type:mongoose.Schema.Types.ObjectId,
       ref:'User',
       required: true
     },
     problem :{
         type:mongoose.Schema.Types.ObjectId,
         ref:'Problem',
         required:true
     },
     code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    enum: ['python', 'javascript','java','c++','Go'], 
    required: true,
  },
  verdict: {
    type: String,
    enum: ['Pending', 'Accepted', 'Wrong Answer', 'Error'],
    default: 'Pending',
  },
  output: String,
  expectedOutput: String,
  runtime: String,
}, { timestamps: true });

const Submission = mongoose.model('Submission', submissionSchema);
export default Submission;
